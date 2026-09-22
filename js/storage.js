// Supabase Project Credentials
const SUPABASE_URL = "https://bxlevcepxkrjffbhfrmw.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_QTNt88IeM4wA-oSQqVas6A_nCZs_alz";

// Initialize Supabase Client (Rename to avoid name collision with CDN global variable 'supabase')
let supabaseClient = null;
if (window.supabase) {
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} else {
  console.error("Supabase CDN failed to load. Supabase will not be initialized.");
}

// Expose Simulated Cloud Storage API globally, powered by Supabase
window.StorageAPI = {
  // Check if Supabase client is active
  isSupabaseActive() {
    return supabaseClient !== null;
  },

  // 1. PROFILE MANAGEMENT (Student login/registration)
  async getProfile(id) {
    if (!supabaseClient) return null;
    const { data, error } = await supabaseClient
      .from('profiles')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error("Error fetching profile:", error);
      throw error;
    }
    return data;
  },

  async createProfile(id, name) {
    if (!supabaseClient) return null;
    const { data, error } = await supabaseClient
      .from('profiles')
      .insert([{ id, name }])
      .select()
      .single();

    if (error) {
      console.error("Error creating profile:", error);
      throw error;
    }
    return data;
  },

  // 2. STATIC FILES EXPLORER
  // Get preloaded files count for welcome stats
  async getStudentFilesCount() {
    const preloads = window.PRELOADED_FILES || [];
    return preloads.length;
  },

  // Get static files filtered by section and subject
  async getFiles(sectionId, subjectId) {
    const preloads = window.PRELOADED_FILES || [];
    
    return preloads.filter(file => 
      file.section === sectionId && 
      file.subject === subjectId
    );
  },

  // No custom uploading or deleting allowed in read-only mode
  async uploadFile(fileData) {
    console.warn("Uploads are disabled in static document mode.");
    return null;
  },

  async deleteFile(id) {
    console.warn("Deletions are disabled in static document mode.");
    return false;
  },

  // 3. PROGRESS TRACKING (progress table in Supabase)
  async loadStudentProgress() {
    if (!supabaseClient) return {};
    const studentId = localStorage.getItem("edu_student_id");
    if (!studentId) return {};

    const { data, error } = await supabaseClient
      .from('progress')
      .select('*')
      .eq('student_id', studentId);

    if (error) {
      console.error("Error loading student progress from Supabase:", error);
      return {};
    }

    const map = {};
    data.forEach(row => {
      map[row.subject_id] = row.completed_chapters;
    });
    return map;
  },

  async updateSubjectProgress(subjectId, completedChapters) {
    if (!supabaseClient) return;
    const studentId = localStorage.getItem("edu_student_id");
    if (!studentId) return;

    const { error } = await supabaseClient
      .from('progress')
      .upsert({
        student_id: studentId,
        subject_id: subjectId,
        completed_chapters: completedChapters,
        updated_at: new Date().toISOString()
      }, { onConflict: 'student_id,subject_id' });

    if (error) {
      console.error("Error saving subject progress to Supabase:", error);
    }
  },

  // Calculate percentage of progress for a subject (using local progress map)
  getSubjectProgress(subjectId, totalChapters, progressMap) {
    if (!totalChapters || totalChapters.length === 0) return 0;
    const completed = progressMap[subjectId] || [];
    const validCompleted = completed.filter(ch => totalChapters.includes(ch));
    return Math.round((validCompleted.length / totalChapters.length) * 100);
  },

  // Calculate overall section progress (using local progress map)
  getSectionProgress(sectionSubjects, allChapters, progressMap) {
    if (!sectionSubjects || sectionSubjects.length === 0) return 0;
    let totalChaptersCount = 0;
    let completedChaptersCount = 0;

    sectionSubjects.forEach(subject => {
      const chapters = allChapters[subject.id] || [];
      totalChaptersCount += chapters.length;
      const completed = progressMap[subject.id] || [];
      completedChaptersCount += completed.filter(ch => chapters.includes(ch)).length;
    });

    if (totalChaptersCount === 0) return 0;
    return Math.round((completedChaptersCount / totalChaptersCount) * 100);
  }
};
