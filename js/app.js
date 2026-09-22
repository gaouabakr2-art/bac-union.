// Global references from window scope
const SECTIONS = window.SECTIONS;
const DEFAULT_CHAPTERS = window.DEFAULT_CHAPTERS;
const StorageAPI = window.StorageAPI;

// Application State (User Profiles & Personal Progress)
let studentId = null;
let studentName = null;
let studentProgress = {}; // Loaded dynamically from Supabase

let currentSectionId = null;
let activeSubject = null; // Currently selected subject object
let activeFolder = "Tous"; // "Tous", "Cours", "Exercices", "Résumés"
let globalSearchQuery = "";

// Initialize App
document.addEventListener("DOMContentLoaded", async () => {
  initTheme();
  renderHomeSections(); // Immediate instant render of section cards
  setupEventListeners();
  setupSubjectWorkspaceEvents();
  setupMotivationCarousel();
  setupDuaaCarousel();
  setupModalOverlayEvents();
  
  // Check login state and sync progress asynchronously
  await checkLoginState();
});

// Check if student is already logged in
async function checkLoginState() {
  const savedId = localStorage.getItem("edu_student_id");
  const savedName = localStorage.getItem("edu_student_name");
  
  const loginOverlay = document.getElementById("login-overlay");
  
  if (savedId && savedName) {
    studentId = savedId;
    studentName = savedName;
    
    // Hide login modal
    if (loginOverlay) loginOverlay.style.display = "none";
    
    // Update Header and Welcome Banner UI
    updateUserSessionUI();
    renderHomeSections(); // Render immediately with local state
    
    // Load student's personalized progress from Supabase in background
    try {
      studentProgress = await StorageAPI.loadStudentProgress();
    } catch (e) {
      console.error("Failed to load progress from Supabase, fallback to empty", e);
      studentProgress = {};
    }
    
    // Update section cards and global stats after Supabase response
    renderHomeSections();
    updateGlobalStats();
  } else {
    // Show login overlay
    if (loginOverlay) loginOverlay.style.display = "flex";
    renderHomeSections();
  }
}

// Update UI headers to reflect student session
function updateUserSessionUI() {
  const headerName = document.getElementById("header-student-name");
  const welcomeName = document.getElementById("welcome-student-name");
  const logoutBtn = document.getElementById("btn-logout");
  
  if (headerName) headerName.textContent = studentName;
  if (welcomeName) welcomeName.textContent = studentName;
  if (logoutBtn) logoutBtn.style.display = "flex";
}

// Handle login submission
async function handleLoginSubmit() {
  const nameInput = document.getElementById("login-name-input");
  const idInput = document.getElementById("login-id-input");
  const errorMsg = document.getElementById("login-error-msg");
  
  if (!nameInput || !idInput) return;
  
  const name = nameInput.value.trim();
  const rawId = idInput.value.trim().toLowerCase(); // lowercase for consistent match
  
  if (!name || !rawId) {
    if (errorMsg) {
      errorMsg.textContent = "Veuillez remplir tous les champs.";
      errorMsg.style.display = "block";
    }
    return;
  }
  
  if (errorMsg) errorMsg.style.display = "none";
  
  // Connect/register student in Supabase (with resilient fallback)
  try {
    let profile = null;
    try {
      profile = await StorageAPI.getProfile(rawId);
      if (!profile) {
        profile = await StorageAPI.createProfile(rawId, name);
      }
    } catch (e) {
      console.warn("Supabase profile sync notice, using local session profile:", e);
      profile = { id: rawId, name: name };
    }
    
    // Save to local storage
    localStorage.setItem("edu_student_id", profile.id);
    localStorage.setItem("edu_student_name", profile.name);
    
    // Set active state variables
    studentId = profile.id;
    studentName = profile.name;
    
    // Hide login modal
    const loginOverlay = document.getElementById("login-overlay");
    if (loginOverlay) loginOverlay.style.display = "none";
    
    // Update UI and load data
    updateUserSessionUI();
    try {
      studentProgress = await StorageAPI.loadStudentProgress();
    } catch (e) {
      studentProgress = {};
    }
    
    renderHomeSections();
    updateGlobalStats();
    
  } catch (err) {
    console.error("Login failed:", err);
    if (errorMsg) {
      errorMsg.textContent = "Erreur de connexion.";
      errorMsg.style.display = "block";
    }
  }
}

// Handle log out
function handleLogout() {
  localStorage.removeItem("edu_student_id");
  localStorage.removeItem("edu_student_name");
  
  studentId = null;
  studentName = null;
  studentProgress = {};
  
  // Reset login inputs
  const nameInput = document.getElementById("login-name-input");
  const idInput = document.getElementById("login-id-input");
  if (nameInput) nameInput.value = "";
  if (idInput) idInput.value = "";
  
  // Show login overlay
  const loginOverlay = document.getElementById("login-overlay");
  if (loginOverlay) loginOverlay.style.display = "flex";
  
  // Update header UI
  const headerName = document.getElementById("header-student-name");
  const logoutBtn = document.getElementById("btn-logout");
  if (headerName) headerName.textContent = "Mon Espace";
  if (logoutBtn) logoutBtn.style.display = "none";
  
  // Reset view to home page
  navigateToHome();
}

// Theme Toggle System
function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeToggleUI(savedTheme);
}

function updateThemeToggleUI(theme) {
  const sunIcon = document.querySelector(".sun-icon");
  const moonIcon = document.querySelector(".moon-icon");
  if (!sunIcon || !moonIcon) return;
  if (theme === "dark") {
    // Show Sun icon in dark mode (click to switch to light)
    sunIcon.style.display = "block";
    moonIcon.style.display = "none";
  } else {
    // Show Moon icon in light mode (click to switch to dark)
    sunIcon.style.display = "none";
    moonIcon.style.display = "block";
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeToggleUI(newTheme);
}

// Global Dashboard Metrics
async function updateGlobalStats() {
  if (!studentId) return;

  // Update Total Progress
  let totalChapters = 0;
  let completedChapters = 0;

  Object.keys(DEFAULT_CHAPTERS).forEach(subId => {
    const total = DEFAULT_CHAPTERS[subId].length;
    totalChapters += total;
    const completed = (studentProgress[subId] || []).length;
    completedChapters += completed;
  });

  const totalProgressPercent = totalChapters > 0 ? Math.round((completedChapters / totalChapters) * 100) : 0;
  const totalProgressStat = document.getElementById("total-progress-stat");
  if (totalProgressStat) {
    totalProgressStat.textContent = `${totalProgressPercent}%`;
  }

  // Update Total File Count (Static files count)
  try {
    const count = await StorageAPI.getStudentFilesCount();
    const totalFilesStat = document.getElementById("total-files-stat");
    if (totalFilesStat) {
      totalFilesStat.textContent = count;
    }
  } catch (err) {
    console.error("Failed to load files count", err);
  }
}

// 1. RENDER HOME VIEW
function renderHomeSections() {
  const grid = document.getElementById("sections-grid");
  if (!grid) return;
  grid.innerHTML = "";

  Object.values(SECTIONS).forEach(sec => {
    const card = document.createElement("div");
    card.className = "section-card";
    card.style.setProperty("--accent-color", sec.color);
    card.style.setProperty("--bg-accent", sec.bgColor);
    
    // Calculate total section progress
    const progress = StorageAPI.getSectionProgress(sec.subjects, DEFAULT_CHAPTERS, studentProgress);

    // Note: The credit lines (providedBy) are HIDDEN on homepage cards per user request
    card.innerHTML = `
      <div class="section-card-icon">${sec.icon}</div>
      <h3>${sec.name}</h3>
      <p>Accédez aux leçons, résumés et fiches pratiques de cette filière.</p>
      <div class="section-card-stats">
        <div class="section-card-stat">
          <strong>${sec.subjects.length}</strong>
          <span>Matières</span>
        </div>
        <div class="section-card-stat">
          <strong>${progress}%</strong>
          <span>Progression</span>
        </div>
      </div>
    `;

    card.addEventListener("click", () => {
      navigateToSection(sec.id);
    });

    grid.appendChild(card);
  });
}

// Navigation between views
function navigateToSection(sectionId) {
  currentSectionId = sectionId;
  activeSubject = null;

  const homeView = document.getElementById("home-view");
  const sectionView = document.getElementById("section-view");
  const subjectView = document.getElementById("subject-view");

  homeView.classList.remove("active");
  subjectView.classList.remove("active");
  sectionView.classList.add("active");

  // Renders the Section Subjects Grid
  renderSidebarNav("sidebar-section-list");
  renderSectionBanner();
  renderSectionSubjects();
  
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function navigateToHome() {
  currentSectionId = null;
  activeSubject = null;

  const homeView = document.getElementById("home-view");
  const sectionView = document.getElementById("section-view");
  const subjectView = document.getElementById("subject-view");

  sectionView.classList.remove("active");
  subjectView.classList.remove("active");
  homeView.classList.add("active");

  renderHomeSections();
  updateGlobalStats();
  
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function navigateToSubject(subject) {
  activeSubject = subject;
  
  const homeView = document.getElementById("home-view");
  const sectionView = document.getElementById("section-view");
  const subjectView = document.getElementById("subject-view");

  homeView.classList.remove("active");
  sectionView.classList.remove("active");
  subjectView.classList.add("active");

  // Reset document explorer variables
  activeFolder = "Tous";
  const folderTabs = document.querySelectorAll("#subject-folder-tabs .folder-tab");
  folderTabs.forEach(t => {
    t.classList.remove("active");
    if (t.dataset.folder === "Tous") t.classList.add("active");
  });

  // Render Sidebar, Subject details, Checklist, Files & Subject Specific Advice
  renderSidebarNav("sidebar-subject-section-list");
  renderSubjectBanner();
  renderSubjectChapters();
  renderSubjectFiles();
  renderSubjectSpecificAdvice();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Render subject specific advice block (e.g. for Gestion in Economie)
function renderSubjectSpecificAdvice() {
  const container = document.getElementById("subject-specific-advice-container");
  if (!container) return;

  if (currentSectionId === "economie" && activeSubject && activeSubject.id === "gestion") {
    container.style.display = "block";
    container.innerHTML = `
      <div class="dashboard-block" style="border-top: 5px solid var(--accent-color);">
        <h2 class="block-title" style="margin-bottom: 0.3rem;">Conseil Spécial pour la Gestion 💡</h2>
        <p class="block-subtitle" style="margin-bottom: 1.2rem;">Recommandation exclusive partagée par une ancienne majeure de section.</p>
        
        <div class="tip-box" style="flex: 1; max-width: 100%; margin: 0;">
          <div class="tip-user">
            <span class="tip-avatar">👩‍🎓</span>
            <div>
              <h4 class="tip-user-name">Abrar Boussenna</h4>
              <span class="tip-user-meta">Major de Section (Économie & Gestion)</span>
            </div>
          </div>
          <p class="tip-text" style="display: block; -webkit-line-clamp: unset; overflow: visible;">
            "Pour la Gestion, la maîtrise des tableaux comptables (bilans, SIG, CAF) et des calculs de rentabilité nécessite une rigueur absolue. Refaites les exercices types jusqu'à ce que chaque formule et mécanisme devienne automatique. La précision dans la présentation des calculs fait souvent la différence au Bac !"
          </p>
        </div>
      </div>
    `;

    // Click on advice box opens the 70% scale popup modal
    const box = container.querySelector(".tip-box");
    if (box) {
      box.addEventListener("click", () => {
        const modal = document.getElementById("advice-modal");
        const modalUser = document.getElementById("advice-modal-user");
        const modalText = document.getElementById("advice-modal-text");
        
        if (modal && modalUser && modalText) {
          modalUser.innerHTML = box.querySelector(".tip-user").innerHTML;
          modalText.textContent = box.querySelector(".tip-text").textContent;
          modal.style.display = "flex";
        }
      });
    }
  } else {
    container.style.display = "none";
    container.innerHTML = "";
  }
}

// 2. RENDER SIDEBAR LIST
function renderSidebarNav(containerId) {
  const sidebarNav = document.getElementById(containerId);
  if (!sidebarNav) return;
  sidebarNav.innerHTML = "";

  Object.values(SECTIONS).forEach(sec => {
    const btn = document.createElement("button");
    btn.className = `sidebar-nav-item ${sec.id === currentSectionId ? 'active' : ''}`;
    btn.style.setProperty("--accent-color", sec.color);
    btn.style.setProperty("--bg-accent", sec.bgColor);
    btn.innerHTML = `
      <span style="font-size: 1.2rem; margin-right: 6px;">🎓</span>
      ${sec.name}
    `;
    btn.addEventListener("click", () => {
      navigateToSection(sec.id);
    });
    sidebarNav.appendChild(btn);
  });
}

// 3. RENDER BANNER IN SECTION VIEW
function renderSectionBanner() {
  const sec = SECTIONS[currentSectionId];
  if (!sec) return;

  const banner = document.getElementById("section-banner-theme");
  const badge = document.getElementById("section-badge-name");
  const title = document.getElementById("section-title-heading");
  const provided = document.getElementById("section-banner-provided-by");
  const progressText = document.getElementById("section-progress-text");
  const progressFill = document.getElementById("section-progress-fill");

  if (banner) {
    banner.style.setProperty("--accent-color", sec.color);
    banner.style.setProperty("--bg-accent", sec.bgColor);
  }
  if (badge) badge.textContent = `Filière`;
  if (title) title.textContent = sec.name;
  
  // Note: Student name credits are displayed ONLY here after clicking on the section
  if (provided) {
    provided.textContent = sec.providedBy ? `Documents de : ${sec.providedBy}` : "";
  }

  const progress = StorageAPI.getSectionProgress(sec.subjects, DEFAULT_CHAPTERS, studentProgress);
  if (progressText) progressText.textContent = `${progress}%`;
  if (progressFill) progressFill.style.width = `${progress}%`;
}

// 4. RENDER SUBJECTS GRID (SECTION VIEW)
function renderSectionSubjects() {
  const sec = SECTIONS[currentSectionId];
  if (!sec) return;

  const grid = document.getElementById("subjects-grid");
  if (!grid) return;
  grid.innerHTML = "";

  sec.subjects.forEach(subject => {
    const card = document.createElement("div");
    card.className = "subject-card";
    card.style.setProperty("--accent-color", sec.color);
    card.style.setProperty("--bg-accent", sec.bgColor);

    const chapters = DEFAULT_CHAPTERS[subject.id] || [];
    const progress = StorageAPI.getSubjectProgress(subject.id, chapters, studentProgress);

    card.innerHTML = `
      <div class="subject-card-header">
        <div class="subject-emoji">${subject.icon}</div>
        <div class="subject-name">${subject.name}</div>
      </div>
      <div class="subject-card-progress">
        <div class="subject-progress-lbl">
          <span>Progression</span>
          <span>${progress}%</span>
        </div>
        <div class="progress-bar-container">
          <div class="progress-bar-fill" style="width: ${progress}%"></div>
        </div>
      </div>
    `;

    // Click subject card -> Go to Subject View
    card.addEventListener("click", () => {
      navigateToSubject(subject);
    });

    grid.appendChild(card);
  });
}

// 5. RENDER SUBJECT DETAILS PAGE (SUBJECT VIEW)
function renderSubjectBanner() {
  const sec = SECTIONS[currentSectionId];
  if (!sec || !activeSubject) return;

  const banner = document.getElementById("subject-banner-theme");
  const badge = document.getElementById("subject-badge-section-name");
  const title = document.getElementById("subject-title-heading");
  const progressText = document.getElementById("subject-progress-text");
  const progressFill = document.getElementById("subject-progress-fill");

  if (banner) {
    banner.style.setProperty("--accent-color", sec.color);
    banner.style.setProperty("--bg-accent", sec.bgColor);
  }
  if (badge) badge.textContent = sec.name;
  if (title) {
    title.innerHTML = `<span id="subject-title-emoji">${activeSubject.icon}</span> ${activeSubject.name}`;
  }

  const chapters = DEFAULT_CHAPTERS[activeSubject.id] || [];
  const progress = StorageAPI.getSubjectProgress(activeSubject.id, chapters, studentProgress);
  if (progressText) progressText.textContent = `${progress}%`;
  if (progressFill) progressFill.style.width = `${progress}%`;
}

// 6. RENDER INLINE CHAPTERS CHECKLIST
function renderSubjectChapters() {
  const listContainer = document.getElementById("subject-chapters-list");
  if (!listContainer || !activeSubject) return;

  listContainer.innerHTML = "";
  const chapters = DEFAULT_CHAPTERS[activeSubject.id] || [];
  
  if (!studentProgress[activeSubject.id]) {
    studentProgress[activeSubject.id] = [];
  }
  const completed = studentProgress[activeSubject.id];

  if (chapters.length === 0) {
    listContainer.innerHTML = `<li class="no-files-placeholder"><h4>Aucun chapitre enregistré</h4><p>Pas de chapitre défini pour cette matière.</p></li>`;
    return;
  }

  chapters.forEach(chapter => {
    const isCompleted = completed.includes(chapter);
    const li = document.createElement("li");
    li.className = `chapter-item ${isCompleted ? 'completed' : ''}`;
    
    li.innerHTML = `
      <input type="checkbox" ${isCompleted ? 'checked' : ''} id="ch-${chapter.replace(/\s+/g, '-')}">
      <label class="chapter-label" for="ch-${chapter.replace(/\s+/g, '-')}">${chapter}</label>
    `;

    // Toggle checklist and update Supabase
    li.addEventListener("click", async () => {
      const index = completed.indexOf(chapter);
      if (index > -1) {
        completed.splice(index, 1);
      } else {
        completed.push(chapter);
      }
      
      // Update locally
      renderSubjectChapters();
      renderSubjectBanner();
      
      // Save asynchronously to Supabase
      try {
        await StorageAPI.updateSubjectProgress(activeSubject.id, completed);
      } catch (err) {
        console.error("Failed to sync progress to Supabase:", err);
      }
      
      updateGlobalStats();
    });

    listContainer.appendChild(li);
  });
}

// 7. RENDER SUBJECT PRIVATE DOCUMENTS EXPLORER (Static Only)
async function renderSubjectFiles() {
  const grid = document.getElementById("subject-files-grid");
  const countLabel = document.getElementById("subject-file-count");
  const pathLabel = document.getElementById("subject-path-label");

  if (!grid || !activeSubject) return;

  // Set Explorer path label
  pathLabel.textContent = `Dossier: ${activeFolder}`;

  try {
    let files = await StorageAPI.getFiles(currentSectionId, activeSubject.id);
    
    // Apply Folder Filter
    if (activeFolder !== "Tous") {
      files = files.filter(f => f.folder === activeFolder);
    }

    // Apply Search Query Filter
    if (globalSearchQuery.trim() !== "") {
      const q = globalSearchQuery.toLowerCase().trim();
      files = files.filter(f => f.name.toLowerCase().includes(q));
    }

    // Update count label
    if (countLabel) {
      countLabel.textContent = `${files.length} document(s)`;
    }

    // Clear grid
    grid.innerHTML = "";

    if (files.length === 0) {
      grid.innerHTML = `
        <div class="no-files-placeholder">
          <div class="placeholder-icon">📭</div>
          <h4>Aucun document disponible</h4>
          <p>Les fiches de révisions apparaîtront ici.</p>
        </div>
      `;
      return;
    }

    const downloadedList = getDownloadedFiles();

    files.forEach(file => {
      const isDownloaded = downloadedList.includes(file.id);
      const card = document.createElement("div");
      card.className = `file-card ${isDownloaded ? 'downloaded' : ''}`;
      
      const sec = SECTIONS[currentSectionId];
      if (sec) {
        card.style.setProperty("--accent-color", sec.color);
        card.style.setProperty("--bg-accent", sec.bgColor);
      }

      // Preview thumbnail/badge
      let previewHTML = "";
      if (file.type && file.type.startsWith("image/")) {
        previewHTML = `<div class="pdf-thumb">🖼️</div>`;
      } else {
        previewHTML = `<div class="pdf-thumb">📄</div>`;
      }

      const sizeFormatted = formatFileSize(file.size);
      
      // Card inner HTML with download button + preview overlay click trigger
      card.innerHTML = `
        <div class="file-card-click-trigger" style="cursor:pointer; display:flex; flex-direction:column; gap:0.4rem;">
          <div class="file-card-preview">
            <span class="downloaded-badge" style="display: ${isDownloaded ? 'flex' : 'none'};">✓ Téléchargé</span>
            ${previewHTML}
          </div>
          <div class="file-card-details">
            <span class="file-name" title="${file.name}">${file.name}</span>
            <div class="file-meta">
              <span class="file-folder-tag">${file.folder}</span>
              <span>${sizeFormatted}</span>
            </div>
          </div>
        </div>
        <div class="file-actions" style="margin-top:0.4rem;">
          <button class="file-action-btn show-btn" style="color:var(--color-primary); font-weight:700;">
            👁️ Afficher
          </button>
          <a class="file-action-btn download-btn ${isDownloaded ? 'downloaded' : ''}" href="${file.downloadUrl || file.content}" target="_blank" rel="noopener noreferrer">
            ${isDownloaded ? '✓ Téléchargé' : '📥 Télécharger'}
          </a>
        </div>
      `;

      const markAsDownloaded = () => {
        markFileDownloaded(file.id);
        card.classList.add("downloaded");
        const badge = card.querySelector(".downloaded-badge");
        if (badge) badge.style.display = "flex";
        const dlBtn = card.querySelector(".download-btn");
        if (dlBtn) {
          dlBtn.classList.add("downloaded");
          dlBtn.innerHTML = "✓ Téléchargé";
        }
      };

      // Open PDF viewer inside an iframe on clicking show or the card itself
      const openViewer = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        markAsDownloaded();

        const pdfOverlay = document.getElementById("pdf-viewer-overlay");
        const pdfIframe = document.getElementById("pdf-viewer-iframe");
        const pdfTitle = document.getElementById("pdf-viewer-title");
        const pdfOpenDriveBtn = document.getElementById("pdf-open-drive-btn");
        
        if (pdfOverlay && pdfIframe && pdfTitle) {
          pdfIframe.src = file.previewUrl || file.content;
          pdfTitle.textContent = file.name;
          if (pdfOpenDriveBtn) {
            pdfOpenDriveBtn.href = file.viewUrl || file.downloadUrl || file.content;
          }
          pdfOverlay.style.display = "flex";
        }
      };

      card.querySelector(".download-btn").addEventListener("click", markAsDownloaded);
      card.querySelector(".show-btn").addEventListener("click", openViewer);
      card.querySelector(".file-card-click-trigger").addEventListener("click", openViewer);

      grid.appendChild(card);
    });

  } catch (err) {
    console.error("Error loading subject files", err);
    grid.innerHTML = `<div class="no-files-placeholder"><h4>Une erreur est survenue lors du chargement des fichiers.</h4></div>`;
  }
}

// Format readable file size
function formatFileSize(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['O', 'Ko', 'Mo', 'Go'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

// Downloaded files state tracking helpers
function getDownloadedFiles() {
  try {
    return JSON.parse(localStorage.getItem("edu_downloaded_files") || "[]");
  } catch (e) {
    return [];
  }
}

function markFileDownloaded(fileId) {
  try {
    const list = getDownloadedFiles();
    if (!list.includes(fileId)) {
      list.push(fileId);
      localStorage.setItem("edu_downloaded_files", JSON.stringify(list));
    }
  } catch (e) {
    console.error("Error saving downloaded file state", e);
  }
}

// 9. SETUP EVENT LISTENERS (GLOBAL)
function setupEventListeners() {
  // Theme toggle
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  // Header Logo click (go home)
  const headerLogo = document.getElementById("btn-header-logo");
  if (headerLogo) {
    headerLogo.addEventListener("click", navigateToHome);
  }

  // Back to home button
  const backHomeBtn = document.getElementById("btn-back-home");
  if (backHomeBtn) {
    backHomeBtn.addEventListener("click", navigateToHome);
  }

  // Back to section button from Subject details view
  const backToSectionBtn = document.getElementById("btn-back-to-section");
  if (backToSectionBtn) {
    backToSectionBtn.addEventListener("click", () => {
      if (currentSectionId) navigateToSection(currentSectionId);
      else navigateToHome();
    });
  }

  // Global Search filter
  const searchInput = document.getElementById("global-search");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      globalSearchQuery = e.target.value;
      if (activeSubject) {
        renderSubjectFiles();
      }
    });
  }

  // Login triggers
  const btnLoginSubmit = document.getElementById("btn-login-submit");
  const loginNameInput = document.getElementById("login-name-input");
  const loginIdInput = document.getElementById("login-id-input");

  if (btnLoginSubmit) {
    btnLoginSubmit.addEventListener("click", handleLoginSubmit);
  }
  if (loginNameInput) {
    loginNameInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") handleLoginSubmit();
    });
  }
  if (loginIdInput) {
    loginIdInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") handleLoginSubmit();
    });
  }

  // Bind Enter key in login forms
  const nameInput = document.getElementById("login-name-input");
  const idInput = document.getElementById("login-id-input");
  [nameInput, idInput].forEach(inp => {
    if (inp) {
      inp.addEventListener("keypress", (e) => {
        if (e.key === "Enter") handleLoginSubmit();
      });
    }
  });

  // Logout trigger
  const btnLogout = document.getElementById("btn-logout");
  if (btnLogout) {
    btnLogout.addEventListener("click", handleLogout);
  }
}

// 10. SETUP SUBJECT WORKSPACE SPECIFIC EVENTS
function setupSubjectWorkspaceEvents() {
  // Subject folders filter tabs
  const folderTabs = document.querySelectorAll("#subject-folder-tabs .folder-tab");
  folderTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      folderTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      activeFolder = tab.dataset.folder;
      renderSubjectFiles();
    });
  });
}

// 11. SETUP ALUMNI ADVICE CAROUSEL SCROLLING (Auto sliding)
function setupMotivationCarousel() {
  const container = document.getElementById("tips-scroll-container");
  const scrollLeftBtn = document.getElementById("btn-scroll-left");
  const scrollRightBtn = document.getElementById("btn-scroll-right");
  const viewport = document.querySelector(".carousel-viewport");

  if (!container || !scrollLeftBtn || !scrollRightBtn || !viewport) return;

  let currentIndex = 0;
  let autoPlayInterval = null;

  // Calculate how many cards can fit in viewport
  function getVisibleCardsCount() {
    const width = window.innerWidth;
    if (width <= 768) return 1;
    if (width <= 1024) return 2;
    return 3;
  }

  function updateCarousel() {
    const cards = container.querySelectorAll(".tip-box");
    if (cards.length === 0) return;
    
    const visibleCards = getVisibleCardsCount();
    const totalCards = cards.length;
    const maxIndex = Math.max(0, totalCards - visibleCards);
    
    // Clamp
    if (currentIndex > maxIndex) currentIndex = 0;
    if (currentIndex < 0) currentIndex = maxIndex;

    // Get width of a card (including margins) with viewport width fallback
    const card = cards[0];
    const cardStyle = window.getComputedStyle(card);
    const cardMarginLeft = parseFloat(cardStyle.marginLeft) || 0;
    const cardMarginRight = parseFloat(cardStyle.marginRight) || 0;
    let cardWidth = card.getBoundingClientRect().width + cardMarginLeft + cardMarginRight;

    if (!cardWidth || cardWidth <= 10) {
      cardWidth = viewport.clientWidth / visibleCards;
    }

    // Apply transform translation
    container.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

    // Adjust arrow opacities
    scrollLeftBtn.style.opacity = currentIndex === 0 ? "0.3" : "1";
    scrollRightBtn.style.opacity = currentIndex === maxIndex ? "0.3" : "1";
  }

  scrollLeftBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    currentIndex--;
    updateCarousel();
    resetAutoPlay();
  });

  scrollRightBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    currentIndex++;
    updateCarousel();
    resetAutoPlay();
  });

  function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
      const cards = container.querySelectorAll(".tip-box");
      const visibleCards = getVisibleCardsCount();
      const maxIndex = Math.max(0, cards.length - visibleCards);
      
      if (currentIndex >= maxIndex) {
        currentIndex = 0;
      } else {
        currentIndex++;
      }
      updateCarousel();
    }, 3500);
  }

  function stopAutoPlay() {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
  }

  function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
  }

  // Hover states to pause auto scrolling
  viewport.addEventListener("mouseenter", stopAutoPlay);
  viewport.addEventListener("mouseleave", startAutoPlay);

  window.addEventListener("resize", updateCarousel);

  // Initialize carousel position & auto play
  updateCarousel();
  startAutoPlay();
}

// 12. SETUP DUAA CAROUSEL SCROLLING (Auto sliding)
function setupDuaaCarousel() {
  const container = document.getElementById("duaa-scroll-container");
  const scrollLeftBtn = document.getElementById("btn-duaa-scroll-left");
  const scrollRightBtn = document.getElementById("btn-duaa-scroll-right");
  
  if (!container || !scrollLeftBtn || !scrollRightBtn) return;

  const viewport = container.closest(".carousel-viewport");
  if (!viewport) return;

  let currentIndex = 0;
  let autoPlayInterval = null;

  function getVisibleCardsCount() {
    const width = window.innerWidth;
    if (width <= 768) return 1;
    if (width <= 1024) return 2;
    return 3;
  }

  function updateCarousel() {
    const cards = container.querySelectorAll(".duaa-box");
    if (cards.length === 0) return;
    
    const visibleCards = getVisibleCardsCount();
    const totalCards = cards.length;
    const maxIndex = Math.max(0, totalCards - visibleCards);
    
    if (currentIndex > maxIndex) currentIndex = 0;
    if (currentIndex < 0) currentIndex = maxIndex;

    const card = cards[0];
    const cardStyle = window.getComputedStyle(card);
    const cardMarginLeft = parseFloat(cardStyle.marginLeft) || 0;
    const cardMarginRight = parseFloat(cardStyle.marginRight) || 0;
    let cardWidth = card.getBoundingClientRect().width + cardMarginLeft + cardMarginRight;

    if (!cardWidth || cardWidth <= 10) {
      cardWidth = viewport.clientWidth / visibleCards;
    }

    container.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

    scrollLeftBtn.style.opacity = currentIndex === 0 ? "0.3" : "1";
    scrollRightBtn.style.opacity = currentIndex === maxIndex ? "0.3" : "1";
  }

  scrollLeftBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    currentIndex--;
    updateCarousel();
    resetAutoPlay();
  });

  scrollRightBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    currentIndex++;
    updateCarousel();
    resetAutoPlay();
  });

  function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
      const cards = container.querySelectorAll(".duaa-box");
      const visibleCards = getVisibleCardsCount();
      const maxIndex = Math.max(0, cards.length - visibleCards);
      
      if (currentIndex >= maxIndex) {
        currentIndex = 0;
      } else {
        currentIndex++;
      }
      updateCarousel();
    }, 4000);
  }

  function stopAutoPlay() {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
  }

  function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
  }

  viewport.addEventListener("mouseenter", stopAutoPlay);
  viewport.addEventListener("mouseleave", startAutoPlay);

  window.addEventListener("resize", updateCarousel);

  updateCarousel();
  startAutoPlay();
}

// 12. SETUP MODAL OVERLAY ACTIONS (Advices & PDF viewer)
function setupModalOverlayEvents() {
  // Alumnus Advice popup trigger
  const container = document.getElementById("tips-scroll-container");
  if (container) {
    const cards = container.querySelectorAll(".tip-box");
    cards.forEach(box => {
      box.addEventListener("click", () => {
        const modal = document.getElementById("advice-modal");
        const modalUser = document.getElementById("advice-modal-user");
        const modalText = document.getElementById("advice-modal-text");
        
        if (modal && modalUser && modalText) {
          modalUser.innerHTML = box.querySelector(".tip-user").innerHTML;
          modalText.textContent = box.querySelector(".tip-text").textContent;
          modal.style.display = "flex";
        }
      });
    });
  }

  // Duaa card popup trigger
  const duaaContainer = document.getElementById("duaa-scroll-container");
  if (duaaContainer) {
    const duaaCards = duaaContainer.querySelectorAll(".duaa-box");
    duaaCards.forEach(box => {
      box.addEventListener("click", () => {
        const modal = document.getElementById("advice-modal");
        const modalUser = document.getElementById("advice-modal-user");
        const modalText = document.getElementById("advice-modal-text");
        
        if (modal && modalUser && modalText) {
          const headerHTML = box.querySelector(".duaa-header") ? box.querySelector(".duaa-header").innerHTML : "🤲 Ad-Duaa";
          const arabicText = box.querySelector(".duaa-arabic") ? box.querySelector(".duaa-arabic").textContent : "";
          const transText = box.querySelector(".duaa-trans") ? box.querySelector(".duaa-trans").textContent : "";
          const meaningText = box.querySelector(".duaa-meaning") ? box.querySelector(".duaa-meaning").textContent : "";
          
          modalUser.innerHTML = `<div style="display:flex; align-items:center; gap:0.6rem; font-size:1.2rem; font-weight:800; color:var(--text-primary);">${headerHTML}</div>`;
          modalText.innerHTML = `
            <div style="direction:rtl; font-size:1.45rem; font-weight:700; color:var(--color-primary); line-height:1.7; margin-bottom:1rem; font-family:'Outfit', sans-serif;">${arabicText}</div>
            ${transText ? `<div style="font-size:1rem; font-style:italic; color:var(--text-secondary); margin-bottom:0.8rem;">${transText}</div>` : ''}
            ${meaningText ? `<div style="font-size:0.95rem; color:var(--text-primary); line-height:1.5;">${meaningText}</div>` : ''}
          `;
          modal.style.display = "flex";
        }
      });
    });
  }

  // Close Advice Modal
  const closeAdvice = document.getElementById("btn-close-advice");
  const adviceModal = document.getElementById("advice-modal");
  if (closeAdvice && adviceModal) {
    closeAdvice.addEventListener("click", () => {
      adviceModal.style.display = "none";
    });
    adviceModal.addEventListener("click", (e) => {
      if (e.target === adviceModal) {
        adviceModal.style.display = "none";
      }
    });
  }

  // Close PDF Modal (with frame src cleanup)
  const closePdf = document.getElementById("btn-close-pdf");
  const pdfOverlay = document.getElementById("pdf-viewer-overlay");
  const pdfIframe = document.getElementById("pdf-viewer-iframe");
  
  if (closePdf && pdfOverlay && pdfIframe) {
    const closeViewer = () => {
      pdfOverlay.style.display = "none";
      pdfIframe.src = ""; // Clear src to stop resource consumption
    };
    
    closePdf.addEventListener("click", closeViewer);
    pdfOverlay.addEventListener("click", (e) => {
      if (e.target === pdfOverlay) {
        closeViewer();
      }
    });
  }
}
