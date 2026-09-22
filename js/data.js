// Section and Subject static configuration
window.SECTIONS = {
  informatique: {
    id: "informatique",
    name: "Informatique",
    providedBy: "Adem Gaoua (2ème national)",
    color: "var(--color-informatique)",
    colorDark: "var(--color-informatique-dark)",
    bgColor: "var(--bg-informatique)",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`,
    subjects: [
      { id: "programmation", name: "Programmation (Python)", icon: "🐍" },
      { id: "maths", name: "Mathématiques", icon: "📐" },
      { id: "physique", name: "Physique", icon: "⚛️" },
      { id: "sti", name: "STI", icon: "⚙️" },
      { id: "anglais", name: "Anglais", icon: "🇬🇧" },
      { id: "francais", name: "Français", icon: "🇫🇷" },
      { id: "philosophie", name: "Philosophie", icon: "💭" },
      { id: "espagnol", name: "Espagnol", icon: "🇪🇸" },
      { id: "arabe", name: "Arabe", icon: "🇸🇾" }
    ]
  },
  science: {
    id: "science",
    name: "Sciences Expérimentales",
    providedBy: "Molka Louhichi (1ère nationale) / Loujayne Derouich / Eya Labassi",
    color: "var(--color-science)",
    colorDark: "var(--color-science-dark)",
    bgColor: "var(--bg-science)",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><path d="M12 11v6"></path><path d="M9 14h6"></path></svg>`,
    subjects: [
      { id: "svt", name: "SVT ", icon: "🌿" },
      { id: "mathssvt", name: "Mathématiques", icon: "📐" },
      { id: "physiquesvt", name: "Physique", icon: "⚛️" },
      { id: "chimiesvt", name: "Chimie", icon: "🧪" },
      { id: "francais", name: "Français", icon: "🇫🇷" },
      { id: "anglais", name: "Anglais", icon: "🇬🇧" },
      { id: "philosophie", name: "Philosophie", icon: "💭" },
      { id: "arabe", name: "Arabe", icon: "🇸🇾" },
      { id: "espagnol", name: "Espagnol", icon: "🇪🇸" },
      { id: "info", name: "Informatique", icon: "🐍" }
    ]
  },
  technique: {
    id: "technique",
    name: "Technique",
    providedBy: "Ghassen Ghazouani / Youssef Mokni",
    color: "var(--color-technique)",
    colorDark: "var(--color-technique-dark)",
    bgColor: "var(--bg-technique)",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>`,
    subjects: [
      { id: "elect", name: "Electrique", icon: "⚙️" },
      { id: "mec", name: "Mécanique", icon: "⚙️" },
      { id: "mathssvt", name: "Mathématiques", icon: "📐" },
      { id: "physiquetech", name: "Physique", icon: "⚛️" },
      { id: "chimiesvt", name: "Chimie", icon: "🧪" },
      { id: "francais", name: "Français", icon: "🇫🇷" },
      { id: "anglais", name: "Anglais", icon: "🇬🇧" },
      { id: "philosophie", name: "Philosophie", icon: "💭" },
      { id: "arabe", name: "Arabe", icon: "🇸🇾" },
      { id: "espagnol", name: "Espagnol", icon: "🇪🇸" },
      { id: "info", name: "Informatique", icon: "🐍" }
    ]
  },
  math: {
    id: "math",
    name: "Mathématiques",
    providedBy: "Nour Hajjem / Ranim Daagi / Ilef Saidi",
    color: "var(--color-math)",
    colorDark: "var(--color-math-dark)",
    bgColor: "var(--bg-math)",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="2" x2="22" y2="6"></line><line x1="22" y1="2" x2="18" y2="6"></line><rect x="2" y="14" width="8" height="8" rx="1"></rect><path d="M16 14h6"></path><path d="M16 18h6"></path><path d="M16 22h6"></path><line x1="2" y1="6" x2="10" y2="6"></line><line x1="6" y1="2" x2="6" y2="10"></line></svg>`,
    subjects: [
      { id: "mathsM", name: "Mathématiques ", icon: "📐" },
      { id: "svtmath", name: "Science", icon: "🌿" },
      { id: "physiquesvt", name: "Physique", icon: "⚛️" },
      { id: "chimiesvt", name: "Chimie", icon: "🧪" },
      { id: "francais", name: "Français", icon: "🇫🇷" },
      { id: "anglais", name: "Anglais", icon: "🇬🇧" },
      { id: "philosophie", name: "Philosophie", icon: "💭" },
      { id: "arabe", name: "Arabe", icon: "🇸🇾" },
      { id: "espagnol", name: "Espagnol", icon: "🇪🇸" },
      { id: "allemand", name: "Allemand", icon: "🇩🇪" },
      { id: "italien", name: "Italien", icon: "🇮🇹" },
      { id: "musique", name: "Musique", icon: "🎵" },
      { id: "info", name: "Informatique", icon: "🐍" }
    ]
  },
  lettre: {
    id: "lettre",
    name: "Lettres et Langues",
    providedBy: "inaam weili / nour faidi / esra benjeddou",
    color: "var(--color-lettre)",
    colorDark: "var(--color-lettre-dark)",
    bgColor: "var(--bg-lettre)",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg>`,
    subjects: [
      { id: "philo", name: "Philosophie", icon: "💭" },
      { id: "arab", name: "Arabe", icon: "🇸🇾" },
      { id: "isl", name: "تفكير إسلامي", icon: "🕌" },
      { id: "fr", name: "Français", icon: "🇫🇷" },
      { id: "anglais", name: "Anglais", icon: "🇬🇧" },
      { id: "espagnol", name: "Espagnol", icon: "🇪🇸" },
      { id: "histoire_geolettre", name: "Histoire-Géographie", icon: "🗺️" }
    ]
  },
  economie: {
    id: "economie",
    name: "Économie et Gestion",
    providedBy: "Adam kouki (1èr national) / Abrar Boussenna / omar bejaoui",
    color: "var(--color-economie)",
    colorDark: "var(--color-economie-dark)",
    bgColor: "var(--bg-economie)",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`,
    subjects: [
      { id: "economie", name: "Économie ", icon: "📊" },
      { id: "gestion", name: "Gestion", icon: "💼" },
      { id: "mathseco", name: "Mathématiques ", icon: "📐" },
      { id: "francais", name: "Français", icon: "🇫🇷" },
      { id: "anglais", name: "Anglais", icon: "🇬🇧" },
      { id: "philosophie", name: "Philosophie", icon: "💭" },
      { id: "arabe", name: "Arabe", icon: "🇸🇾" },
      { id: "espagnol", name: "Espagnol", icon: "🇪🇸" },
      { id: "allemand", name: "Allemand", icon: "🇩🇪" },
      { id: "italien", name: "Italien", icon: "🇮🇹" },
      { id: "histoire", name: "Histoire", icon: "📜" },
      { id: "geographie", name: "Géographie", icon: "🌍" },
      { id: "infoeco", name: "Informatique", icon: "🐍" }
    ]
  }
};

// Default static lessons/chapters to track progress
window.DEFAULT_CHAPTERS = {
  programmation: [
    "Les fichiers texte et binaire",
    " Les algorithmes de tri",
    " La récursivité",
    " Les algorithmes récurrents",
    "Les algorithmes arithmétiques",
    " Les algorithmes d'approximation et d'optimisation",
    "Les interfaces Graphiques (Qt-Designer)"
  ],
  maths: [
    "Nombres complexes",
    "Limites et continuité des fonctions",
    "Dérivabilité et étude de fonctions",
    "Fonctions exponentielles et logarithmes",
    "Calcul intégral et primitives",
    "Probabilités et statistiques",
    "Suites réelles",
    "matrice"
  ],
  physique: [
    "LE CONDENSATEUR",
    "LE DIPOLE RC",
    "LA BOBINE",
    "LE DIPOLE RL",
    "CIRCUIT RLC SERIE : LES OSCILLATIONS LIBRES AMORTIES",
    "CIRCUIT LC SERIE : LES OSCILLATIONS LIBRES NON AMORTIES",
    "ENTRETIEN DES OSCILLATIONS",
    "LES OSCILLATIONS ELECTRIQUES FORCEES",
    "LES FILTRES",
    "PRODUCTION DE SIGNAUX PERIODIQUES NON SINUSOÏDAUX",
    "CONVERSION DES SIGNAUX",
    "INTERACTION ONDE-MATIERE",
    "ONDES MECANIQUES PROGRESSIVES",
    "TRANSMISSION D'UN SIGNAL",
    "Le Spectre Atomique ",
    "PHYSIQUE ATOMIQUE ET NUCLEAIRE"
  ],
  chimie: [
    "MESURE D'UNE QUANTITE DE LA MATIERE",
    "PILE ELECTROCHIMIQUE - PILE DANIELL",
    "L' ELECTROLYSE",
    "LES ALCOOLS"
  ],
  sti: [
    "HTML",
    "CSS",
    "JAVA",
    "PHP",
    "Base de données"
  ],
  svt: [
    "La reproduction humaine et santé- chapitre 1 : La fonction reproductrice chez l'homme",
    "Reproduction humaine et santé : Chapitre 2 : La fonction reproductrice chez la femme",
    "Reproduction humaine et santé : Chapitre 3 : La procréation",
    " Génétique : Chapitre 1 : Le brassage de l'information génétique (Dihybridisme)",
    "Génétique : Chapitre 2 : Génétique humaine",
    "L'évolution biologique",
    "Neurophysiologie - Chapitre 1 : Le tissu nerveux",
    "Neurophysiologie_02_Etude d'une réaction motrice : Le réflexe myotatique",
    "Neurophysiologie 03_Le fonctionnement du muscle squelettique",
    "Neurophysiologie 04_La régulation de la pression artérielle",
    "L'immunité 01_Le soi et le non soi",
    "L'immunité 02_Les acteurs de l'immunité spécifique",
    "L'immunité 04_Le dysfonctionnement du système immunitaire",
    "L'immunité 03_Le déroulement de la réponse immunitaire spécifique"
  ],
  anglais: [
    "Grammar rules",
    "Passive Voice and Active Voice",
    "Reported Speech & Conditional sentences",
    " Art Shows and Holidaying",
    "Reading comprehension & Essay writing skills",
    "Education Matters",
    " Creative, Inventive Minds",
    "Life Issues"
  ],
  francais: [
    "Souvenirs et nostalgie",
    "Histoires d'amour",
    "Liberté, j'écris ton nom...",
    "Guerre et paix",
    "L'homme et la science",
    "procédès d'écriture",
    "Grammaire"
  ],
  philosophie: [
    "الإنية و الغيرية",
    "الخصوصية و الكونية",
    " العلم بين الحقيقة والنمذجة",
    "الدولة",
    "الأخلاق: الخير و السعادة "
  ],
  arabe: [
    "في التفكير العلمي",
    "في الفن و الأدب",
    "في حوار الحضارات",
    "في الفكر و الفن",
    "اللغة"
  ],
  espagnol: [
    "Tiempos del pasado (Indefinido, Imperfecto, )",
    "El subjuntivo en oraciones subordinadas",
    "Vocabulario",
    "Comprensión de lecture y expresión écrite"
  ],
  histoire_geo: [
    "Le monde en 1945 et la Guerre Froide",
    "La décolonisation et l'émergence du Tiers-Monde",
    "La mondialisation: acteurs, flux et débats",
    "Les dynamiques territoriales de l'Union Européenne",
    "Géographie: Les puissances économiques mondiales (USA, Chine)"
  ],
  histoire: [
    "الحرب العالمية الأولى والعلائق الدولية 🌎",
    "الحرب العالمية الثانية 🌎",
    "الحرب الباردة والقطبية الثنائية 🇷🇺🇺🇸",
    "استقلال المستعمرات وبناء الدولة الوطنية 🇹🇳",
    "تونس في العشرينات والثلاثينات",
    "مصطلحات ومفاهيم تاريخية"
  ],
  geographie: [
    "المجال العالمي: مجال متفاوت ومترابط",
    "تركيبة المجال العالمي والتباينات المجالية",
    "الأدفاق التجارية والمالية العالمية",
    "الميغالوبوليس والاتحاد الأوروبي",
    "القفزة الاقتصادية البرازيلية (المظاهر والعوامل)"
  ],
  histoire_geolettre: [
    "Le monde en 1945 et la Guerre Froide",
    "La décolonisation et l'émergence du Tiers-Monde",
    "La mondialisation: acteurs, flux et débats",
    "Les dynamiques territoriales de l'Union Européenne",
    "Géographie: Les puissances économiques mondiales (USA, Chine)"
  ],
  economie: [
    "Les fondements de l'économie de marché",
    "Régulation macroéconomique et politiques budgétaires",
    "L'inflation, le chômage et la croissance",
    "Le commerce international et la mondialisation financière",
    "Le rôle économique de l'État"
  ],
  gestion: [
    "Le bilan comptable et le compte de résultat",
    "Analyse financière (SIG et CAF)",
    "Gestion prévisionnelle et budgets",
    "Le calcul des coûts et rentabilité (Seuil de rentabilité)",
    "Gestion des ressources humaines et paie"
  ],
  mathssvt: [
    "Produit scalaire - Produit vectoriel dans l'espace",
    "Equations de droites, de plans et de sphères",
    "Nombres complexes",
    "Limites et continuité des fonctions",
    "Dérivabilité et étude de fonctions",
    "Fonctions exponentielles et logarithmes",
    "Calcul intégral et primitives",
    "Probabilités et statistiques",
    "Suites réelles",
    "matrice"
  ],
  physiquesvt: [
    "LE CONDENSATEUR",
    "LE DIPOLE RC",
    "LA BOBINE",
    "LE DIPOLE RL",
    "CIRCUIT RLC SERIE : LES OSCILLATIONS LIBRES AMORTIES",
    "CIRCUIT LC SERIE : LES OSCILLATIONS LIBRES NON AMORTIES",
    "ENTRETIEN DES OSCILLATIONS",
    "LES OSCILLATIONS ELECTRIQUES FORCEES",
    "PRODUCTION DE SIGNAUX PERIODIQUES NON SINUSOÏDAUX",
    "INTERACTION ONDE-MATIERE",
    "ONDES MECANIQUES PROGRESSIVES",
    "Le Spectre Atomique ",
    "PHYSIQUE ATOMIQUE ET NUCLEAIRE"
  ],
  chimiesvt: [
    "La cinétique chimique ",
    "Equilibre chimique",
    "Classification des acides et des bases",
    "pH des solutions aqueuses",
    "Variation du pH au cours d'une réaction entre un acide et une base",
    "Les Amides",
    "Les piles électrochimiques"
  ],
  physiquetech: [
    "LE CONDENSATEUR",
    "LE DIPOLE RC",
    "LA BOBINE",
    "LE DIPOLE RL",
    "CIRCUIT RLC SERIE : LES OSCILLATIONS LIBRES AMORTIES",
    "CIRCUIT LC SERIE : LES OSCILLATIONS LIBRES NON AMORTIES",
    "ENTRETIEN DES OSCILLATIONS",
    "Les Filtres",
    "LES OSCILLATIONS ELECTRIQUES FORCEES",
    "PRODUCTION DE SIGNAUX PERIODIQUES NON SINUSOÏDAUX",
    "INTERACTION ONDE-MATIERE",
    "ONDES MECANIQUES PROGRESSIVES"
  ],
  elect: [
    "ELECTRIQUE:Séquence n°1 _ Les Sources d'interruption",
    "ELECTRIQUE:Séquence n°2 _ Le Timer 0",
    "ELECTRIQUE:Séquence n°3 _ Le Convertisseur Analogique Numérique",
    "ELECTRIQUE:Bis : Circuits Combinatoires",
    "ELECTRIQUE:Logique Séquentielle : Compteur Décompteur",
    "ELECTRIQUE:Amplificateurs Linéaires Intégrés",
    "ELECTRIQUE:Séquence n°3 _ Hacheur Série ( Module PWM = MLI)",
    "ELECTRIQUE:Systèmes Triphasés Équilibrés",
    "ELECTRIQUE:Moteurs Asynchrones Triphasés"
  ],
  mec: [
    "MECANIQUE: Lecture D'un Dessin D'ensemble",
    "MECANIQUE:TOLÉRANCES DIMENSIONNELLES",
    "MECANIQUE:Cotation Fonctionnelle",
    "MECANIQUE:TOLÉRANCES GÉOMÉTRIQUES",
    "MECANIQUE:Représentation d'un produit fini",
    "MECANIQUE:La Fonction Assemblage",
    "MECANIQUE:Guidage en rotation",
    "MECANIQUE:Les Accouplements_Les Embrayages",
    "MECANIQUE: Transformation des mouvements",
    "MECANIQUE:RDM_Flexion Plane simple et composée",
    "MECANIQUE:RDM_torsion Simple",
    "MECANIQUE:RDM_Sollicitations composées",
    "MECANIQUE:Obtention des Pièces",
    "MECANIQUE:Les machines thermiques"
  ],
  info: [
    "Les structures de données et de contrôle",
    "Les tableaux",
    " Les sous programmes",
    " Les algorithmes de tri",
    " Méthodes de recherche",
    "L'interface Graphique QtDesigner"
  ],
  svtmath: [
    " La reproduction humaine et santé-chapitre 1 : La fonction reproductrice chez l'homme",
    "Reproduction humaine Chapitre 2 : La fonction reproductrice chez la femme",
    " La génétique humaine",
    "Neurophysiologie - Chapitre 1 : Le tissu nerveux",
    "Neurophysiologie chapitre 2 : Réflexe moteur à point de départ cutané"
  ],
  mathsM: [
    "Produit scalaire - Produit vectoriel dans l'espace",
    "Equations de droites, de plans et de sphères",
    "Nombres complexes",
    "Limites et continuité des fonctions",
    "Dérivabilité et étude de fonctions",
    "Fonctions exponentielles et logarithmes",
    "Calcul intégral et primitives",
    "Probabilités et statistiques",
    "Suites réelles",
    "Isométries du plan",
    "Déplacement -Antidéplacement",
    "Similitudes",
    "Géométrie dans l'espace",
    "Conique"
  ],
  economie_study: [
    "Les fondements de l'économie de marché",
    "Régulation macroéconomique et politiques budgétaires",
    "L'inflation, le chômage et la croissance",
    "Le commerce international et la mondialisation financière",
    "Le rôle économique de l'État"
  ],
  gestion_study: [
    "Le bilan comptable et le compte de résultat",
    "Analyse financière (SIG et CAF)",
    "Gestion prévisionnelle et budgets",
    "Le calcul des coûts et rentabilité (Seuil de rentabilité)",
    "Gestion des ressources humaines et paie"
  ],
  gestion: [
    "Module d'evaluation consolidation",
    "Gestion de l'approvisionnement",
    "La gestion de production",
    "La gestion commerciale",
    "La gestion des ressources humaines",
    " La Gestion Financière"
  ],
  economie: [
    "Le comportement et l’équilibre du consommateur",
    "Le comportement et l’équilibre du producteur",
    "La croissance économique et le développement durable",
    " Les grands déséquilibres macroéconomiques et le rôle de l'Etat",
    "Méthodologie de la dissertation économique"
  ],
  histoire_geo: [
    "تاريخ:العالم المعاصر من 1914-1945|| القسم الأول: من الحرب الأولى إلى الحرب الثانية|| الدرس الأول : الحرب العالمية الأولى",
    "تاريخ:الحرب العالمية الثانية",
    "تاريخ: تونس في نهاية الحرب العالمية الأولى إلى الحرب العالمية الثانية || الدرس الأول: تونس في العشرينات",
    "تاريخ:تونس في الثلاثينات",
    "تاريخ: تونس أثناء الحرب العالمية الثانية",
    "تاريخ:العلاقات الدولية من الحرب الباردة إلى إنهيار الإتحاد السوفياتي",
    "تاريخ:استقلال المستعمرات وبروز العالم الثالث",
    "تاريخ:تونس من 1945 إلى 1956 المسيرة نحو الإستقلال",
    "تاريخ:تونس من 1956 إلى 1987|| الدرس الأول: بناء الدولة الوطنية و تحديث المجتمع",
    "جغرافيا:الأدفاق التجارية",
    "جغرافيا:الأدفاق الماليّة",
    "جغرافيا:المجال العالمي التفاوت في التقدّم والتركيبة",
    "جغرافيا: الإتحاد الأوروبي القوة الإنتاجية",
    "جغرافيا:الإتحاد الأوروبي المكانة العالمية",
    "جغرافيا: الاقطاب الاقتصادية المتحكمة in المجال العالمي",
    "جغرافيا:الإتحاد الأوروبي الميغالوبوليس",
    "جغرافيا:الإتحاد الأوروبي دعائم القوة (البناء الأوروبي المشترك)",
    "جغرافيا:الإتحاد الأوروبي دعائم القوة (الدعائم البشرية و الهيكلية)",
    "جغرافيا:الإتحاد الأوروبي دعائم القوة (مزايا المجال و السعي إلى التحكم فيه",
    "جغرافيا:القفزة الاقتصادية البرازيلية",
    "جغرافيا:دعائم القفزة الإقتصادية",
    "جغرافيا:التباينات الاجتماعية و المجالية"
  ],
  infoeco: [
    "Les bases de données relationnelles",
    "Récapitulatif instructions python",
    "Analyse des données (Pandas de python)",
    "Base de données",
    "Microsoft Access"
  ],
  histoire_geolettre: [
    " تاريخ: القسم الأول: من الحرب الأولى إلى الحرب الثانية",
    " تاريخ:أزمة الثلاثينات",
    " تاريخ: تونس في نهاية الحرب العالمية الأولى إلى الحرب العالمية الثانية || الدرس الأول: تونس في العشرينات",
    " تاريخ:تونس في الثلاثينات",
    "تاريخ: تونس أثناء الحرب العالمية الثانية",
    "تاريخ:العلاقات الدولية من الحرب الباردة إلى إنهيار الإتحاد السوفياتي",
    " تاريخ: الثورة البلشفية و نشأة الإتحاد السوفياتي",
    " تاريخ: تحرر الشعوب المستعمرة || الدرس الأول: استقلال المستعمرات وبروز العالم الثالث",
    " تاريخ:إستقلال الجزائر",
    " تاريخ:الحرب العالمية الثانية",
    " تاريخ:القضية الفلسطينية",
    " تاريخ: تونس من 1956 إلى 1987|| الدرس الأول: بناء الدولة الوطنية ",
    " تاريخ:تونس من 1945 إلى 1956 المسيرة نحو الإستقلال",
    "جغرافيا:الأدفاق التجارية",
    "جغرافيا:الأدفاق الماليّة",
    "جغرافيا:المجال العالمي التفاوت في التقدّم والتركيبة",
    "جغرافيا: الإتحاد الأوروبي القوة الإنتاجية",
    "جغرافيا:الإتحاد الأوروبي المكانة العالمية",
    "جغرافيا: الاقطاب الاقتصادية المتحكمة",
    "جغرافيا:الإتحاد الأوروبي الميغالوبوليس",
    "جغرافيا:الإتحاد الأوروبي دعائم القوة (البناء الأوروبي المشترك)",
    "جغرافيا:الإتحاد الأوروبي دعائم القوة (الدعائم البشرية و الهيكلية)",
    "جغرافيا:الإتحاد الأوروبي دعائم القوة (مزايا المجال و السعي إلى التحكم فيه",
    "جغرافيا:القفزة الاقتصادية البرازيلية",
    "جغرافيا:دعائم القفزة الإقتصادية",
    "جغرافيا:التباينات الاجتماعية و المجالية"
  ],
  arab: [
    "شعر الحماسة في القرنين الثالث والرابع للهجرة",
    "الإمتاع والمؤانسة و المقابسات للتوحيدي",
    " المنزع العقلي في الأدب العربي القديم، وخاصة عند الجاحظ ",
    "من أشكال القصّ في الأدب العربي القديم,",
    "المسرحية",
    "حدّث أبو هريرة "
  ],
  fr: [
    "Partage",
    "L'ENGAGEMENT EN LITTERATURE",
    "L'appel de la modernité",
    "A la lumière de la raison",
    "Poésie"
  ],
  infol: [
    "Microsoft Excel",
    "Nouvelles technologies & Internet",
    "Pensée logique",
    "Production numérique"
  ],
  isl: [
    "التوحيد و تحرير الإنسان",
    "الحرية والقدر",
    " التوحيد و الحرية",
    "التوحيد و الكونية",
    "الغيب والشهادة",
    "الإنسان ووعي الزّمن",
    " الإبداع والقيم",
    " الإعجاز التشريعي",
    "فلسفة التشريع"
  ],
  philo: [
    "باب الإنساني entre الوحدة و الكثرة",
    "الإنية و الغيرية ",
    " التواصل و الأنظمة الرمزية",
    "الخصوصية و الكونية",
    "العلم بين الحقيقة والنمذجة",
    "العمل بين النجاعة و العدالة",
    " الدولة",
    "الاخلاق الخير والسعادة",
    "الفن بين الحقيقة و الجمال"
  ],
  mathseco: [
    "Limites et continuité des fonctions",
    "Dérivabilité et étude de fonctions",
    "Fonctions exponentielles et logarithmes",
    "Calcul intégral et primitives",
    "Probabilités et statistiques",
    "Suites réelles",
    "Graphes",
    "Graphes Probabilistes ",
    "matrice"
  ],
   histoire: [
    "تاريخ:العالم المعاصر من 1914-1945|| القسم الأول: من الحرب الأولى إلى الحرب الثانية|| الدرس الأول : الحرب العالمية الأولى",
    "تاريخ:الحرب العالمية الثانية",
    "تاريخ: تونس في نهاية الحرب العالمية الأولى إلى الحرب العالمية الثانية || الدرس الأول: تونس في العشرينات",
    "تاريخ:تونس في الثلاثينات",
    "تاريخ: تونس أثناء الحرب العالمية الثانية",
    "تاريخ:العلاقات الدولية من الحرب الباردة إلى إنهيار الإتحاد السوفياتي",
    "تاريخ:استقلال المستعمرات وبروز العالم الثالث",
    "تاريخ:تونس من 1945 إلى 1956 المسيرة نحو الإستقلال",
    "تاريخ:تونس من 1956 إلى 1987|| الدرس الأول: بناء الدولة الوطنية و تحديث المجتمع",
    "جغرافيا:الأدفاق التجارية",
    "جغرافيا:الأدفاق الماليّة",
    "جغرافيا:المجال العالمي التفاوت في التقدّم والتركيبة",
    "جغرافيا: الإتحاد الأوروبي القوة الإنتاجية",
    "جغرافيا:الإتحاد الأوروبي المكانة العالمية",
    "جغرافيا: الاقطاب الاقتصادية المتحكمة in المجال العالمي",
    "جغرافيا:الإتحاد الأوروبي الميغالوبوليس",
    "جغرافيا:الإتحاد الأوروبي دعائم القوة (البناء الأوروبي المشترك)",
    "جغرافيا:الإتحاد الأوروبي دعائم القوة (الدعائم البشرية و الهيكلية)",
    "جغرافيا:الإتحاد الأوروبي دعائم القوة (مزايا المجال و السعي إلى التحكم فيه",
    "جغرافيا:القفزة الاقتصادية البرازيلية",
    "جغرافيا:دعائم القفزة الإقتصادية",
    "جغرافيا:التباينات الاجتماعية و المجالية"
  ],
 geographie: [

    "جغرافيا:الأدفاق التجارية",
    "جغرافيا:الأدفاق الماليّة",
    "جغرافيا:المجال العالمي التفاوت في التقدّم والتركيبة",
    "جغرافيا: الإتحاد الأوروبي القوة الإنتاجية",
    "جغرافيا:الإتحاد الأوروبي المكانة العالمية",
    "جغرافيا: الاقطاب الاقتصادية المتحكمة in المجال العالمي",
    "جغرافيا:الإتحاد الأوروبي الميغالوبوليس",
    "جغرافيا:الإتحاد الأوروبي دعائم القوة (البناء الأوروبي المشترك)",
    "جغرافيا:الإتحاد الأوروبي دعائم القوة (الدعائم البشرية و الهيكلية)",
    "جغرافيا:الإتحاد الأوروبي دعائم القوة (مزايا المجال و السعي إلى التحكم فيه",
    "جغرافيا:القفزة الاقتصادية البرازيلية",
    "جغرافيا:دعائم القفزة الإقتصادية",
    "جغرافيا:التباينات الاجتماعية و المجالية"
  ]
};
