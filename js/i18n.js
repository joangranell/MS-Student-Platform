/**
 * i18n.js — Internationalization Module for MS Student Platform
 * Provides seamless English and Spanish translations for all UI components,
 * study plans, dashboards, Pearson VUE exam simulator, results, and cheat sheets.
 */

import { StorageManager } from './storage.js';

export const TRANSLATIONS = {
  es: {
    // Header & Brand
    brandSubtitle: "Simulador de Certificaciones Microsoft",
    installApp: "Instalar App",
    lightMode: "Modo Claro",
    darkMode: "Modo Oscuro",
    cheatSheet: "Hoja de Trucos",
    switchProfile: "Cambiar de perfil o cerrar sesión",
    plan: "Plan:",
    langLabel: "ES",
    langName: "Español",
    langTooltip: "Cambiar idioma a Inglés (English)",

    // Legal & Login
    legalNoticeTitle: "Aviso Legal y de No Afiliación:",
    legalNoticeBody: "MS Student Platform es un simulador educativo independiente de código abierto creado para autoestudio. No está afiliado, avalado ni respaldado por Microsoft Corporation ni por Pearson VUE. Las preguntas son ejercicios didácticos basados en la documentación pública de Microsoft Learn.",
    heroBadge: "Simulador Independiente de Estudio • Estilo Pearson VUE",
    heroTitle: "¿Quién va a estudiar hoy?",
    heroSubtitle: "Selecciona tu perfil para cargar tu plan de estudio personalizado, tu historial de simulaciones y tu sistema de repetición adaptativa.",
    existingProfiles: "👥 Perfiles Existentes",
    manageProfiles: "🛠️ Ver perfiles (Renombrar / Eliminar)",
    exitManageProfiles: "⬅️ Volver a selección",
    exportProgress: "📥 Exportar Progreso (JSON)",
    importProgress: "📤 Importar Progreso",
    createNewProfile: "➕ Crear Perfil Nuevo",
    studentName: "Nombre del Estudiante",
    studentNamePlaceholder: "Ej: Ana García, Carlos...",
    targetCert: "Certificación Objetivo",
    avatarColor: "Color del Avatar",
    createAndStart: "Crear Perfil y Comenzar",
    confirmDeleteProfile: "¿Estás seguro de que deseas eliminar este perfil? Se perderán todas sus estadísticas de estudio.",
    profileRenamed: "Perfil renombrado correctamente.",
    enterNewName: "Introduce el nuevo nombre para este perfil:",

    // Changelog
    versionHistoryTitle: "Historial de Novedades y Actualizaciones",
    version: "Versión",
    certs: "Certificaciones",
    type: "Tipo",
    description: "Descripción de Cambios",
    status: "Estado",
    active: "✓ Activo",

    // Dashboard & Roadmap
    studyPlanTitle: "Tu Plan de Estudio",
    studyPlanSubtitle: "Progreso consolidado y avance por fases",
    phase1Title: "Fase 1: Cimientos",
    phase1Desc: "Conceptos fundamentales y preguntas de nivel básico.",
    phase2Title: "Fase 2: Intermedio",
    phase2Desc: "Configuración de servicios, flujos de trabajo y arquitectura.",
    phase3Title: "Fase 3: Examen Real",
    phase3Desc: "Casos prácticos complejos, código y simulaciones completas.",
    phaseComplete: "¡Fase completada!",
    phaseLocked: "Bloqueada hasta alcanzar el 80% en la fase anterior.",
    dueReviewsTitle: "Repasos Pendientes Hoy",
    startReviewBtn: "Comenzar Repaso",
    noDueReviews: "¡Al día! No tienes repasos pendientes hoy.",
    sessionConfigurator: "Configurador de Sesión",
    mode: "Modo",
    guidedStudy: "Modo Estudio Guiado (Feedback Inmediato)",
    pearsonVueExam: "Simulador Oficial Pearson VUE (Con Tiempo)",
    submode: "Enfoque / Submodo",
    submodeAdaptive: "Repetición Adaptativa Inteligente (Prioriza Fallos y Temas Débiles)",
    submodeAllStudy: "Estudio General (Todos los niveles)",
    submodeBasic: "Lo Básico (Fundamentos y Conceptos)",
    submodeHardcore: "Lo Más Difícil (Arquitectura, Código y Casos)",
    submodeDomain: "Por Dominio Temático (Skills Measured)",
    submodeTopic: "Por Tecnología / Tema de MS Learn",
    submodeCode: "Preguntas de Código (SQL / DAX / KQL / PySpark)",
    submodeFailed: "Clínica de Fallos (Preguntas Falladas)",
    domain: "Dominio Temático",
    allDomains: "Todos los dominios",
    topic: "Tecnología / Tema",
    allTopics: "Todos los temas",
    questionCount: "Cantidad de Preguntas",
    startSessionBtn: "🚀 Comenzar Sesión",
    metricsAndHistory: "Métricas & Historial de Simulaciones",
    filterCert: "Filtrar por certificación:",
    allCerts: "Todas",
    targetCertLabel: "Objetivo",
    totalSessions: "Sesiones Realizadas",
    averageScore: "Puntuación Media",
    passedRate: "Tasa de Aprobado",
    studyStreak: "Racha de Estudio",
    days: "días",
    noHistoryYet: "Aún no has realizado ninguna simulación con este perfil. ¡Comienza una sesión para ver tus métricas!",

    // Exam / Pearson VUE Simulator
    question: "Pregunta",
    of: "de",
    timeRemaining: "Tiempo Restante",
    markForReview: "Marcar para revisión",
    marked: "Marcada",
    strikethrough: "Tachar",
    singleSelectInstruction: "Selecciona UNA sola respuesta correcta:",
    multiSelectInstruction: "Selecciona {count} respuestas correctas:",
    previousBtn: "◀ Anterior",
    nextBtn: "Siguiente ▶",
    checkAnswerBtn: "🔍 Comprobar Respuesta",
    submitExamBtn: "Finalizar Examen",
    reviewQuestionsModal: "Revisar Lista de Preguntas",
    modalReviewTitle: "Resumen de Preguntas del Examen",
    modalReviewSubtitle: "Revisa el estado de tus respuestas antes de finalizar la entrega.",
    all: "Todas",
    unanswered: "Sin responder",
    markedOnly: "Solo marcadas",
    finishAndGrade: "Confirmar y Entregar Examen",
    returnToExam: "Volver a las Preguntas",
    caseStudy: "Estudio de Caso",
    overviewTab: "Visión General",
    requirementsTab: "Requisitos",
    environmentTab: "Entorno Técnico",

    // Feedback & Theory
    detailedExplanation: "Explicación Detallada",
    theoryPill: "Píldora Teórica",
    keyPoints: "Puntos Clave",
    examTrap: "Trampa de Examen",
    officialReferences: "Referencias Oficiales en Microsoft Learn",
    reportIssue: "Reportar sugerencia o errata",
    yourAnswerCorrect: "¡Respuesta Correcta!",
    yourAnswerIncorrect: "Respuesta Incorrecta",

    // Results Screen
    examResults: "Resumen de Resultados",
    scaledScore: "Puntuación Escalada (100 - 1000)",
    passingScoreIs: "Puntuación de corte: 700 / 1000",
    passedMsg: "¡ENHORABUENA! HAS SUPERADO LA SIMULACIÓN",
    failedMsg: "NO SUPERADO — SE REQUIERE REPASO ADAPTATIVO",
    correctAnswers: "Aciertos",
    incorrectAnswers: "Fallos",
    accuracy: "Precisión",
    duration: "Tiempo Invertido",
    reviewAllQuestionsBtn: "📋 Revisar Todas las Preguntas",
    reviewFailedQuestionsBtn: "⚠️ Revisar Solo Falladas",
    backToDashboardBtn: "🏠 Volver al Panel",
    newSessionSameCertBtn: "🔄 Nueva Sesión",

    // Cheat Sheet
    cheatSheetTitle: "Hoja de Trucos & Repaso Rápido 24h",
    cheatSheetSubtitle: "Fichas técnicas, trampas oficiales y conceptos críticos para repasar antes del examen.",
    searchPlaceholder: "Buscar por término, concepto o servicio...",
    onlyTraps: "Solo trampas de examen",
    onlyFavs: "Solo favoritos",
    expandAll: "Expandir todo",
    collapseAll: "Colapsar todo",
    backToPanelBtn: "⬅ Volver al Panel",
    noCheatCardsFound: "No se encontraron fichas que coincidan con los filtros aplicados.",

    // Target Certification & Study Plan Modal
    targetCertModalTitle: "Configura el Plan de Estudio para {name}",
    targetCertModalSubtitle: "¿Qué certificación de Microsoft quieres preparar como objetivo principal? Prepararemos tu ruta de estudio en 4 Fases Progresivas:",
    trackAll: "Todas",
    trackData: "Datos y BI",
    trackAi: "IA y Copilot",
    trackCloud: "Cloud y Seguridad",
    searchCertPlaceholder: "Buscar por código, tecnología o rol (ej: Fabric, Copilot, SQL, Sentinel)...",
    levelFundamentals: "Fundamentos",
    levelAssociate: "Associate",
    recommendedBadge: "⭐ Ideal para empezar",
    selectedLabel: "Seleccionado:",
    generatePlanBtn: "🗺️ Generar Mi Plan de Estudio Personalizado",
    noCertsMatchSearch: "No se encontraron certificaciones que coincidan con la búsqueda.",
  },

  en: {
    // Header & Brand
    brandSubtitle: "Microsoft Certification Simulator",
    installApp: "Install App",
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
    cheatSheet: "Cheat Sheet",
    switchProfile: "Switch profile or log out",
    plan: "Plan:",
    langLabel: "EN",
    langName: "English",
    langTooltip: "Switch language to Spanish (Español)",

    // Legal & Login
    legalNoticeTitle: "Legal Notice & Non-Affiliation:",
    legalNoticeBody: "MS Student Platform is an independent, open-source educational simulator designed for self-study. It is not affiliated with, endorsed by, or sponsored by Microsoft Corporation or Pearson VUE. All practice questions are instructional exercises based on public Microsoft Learn documentation.",
    heroBadge: "Independent Study Simulator • Pearson VUE Style",
    heroTitle: "Who is studying today?",
    heroSubtitle: "Select your profile to load your personalized study plan, simulation history, and adaptive spaced repetition system.",
    existingProfiles: "👥 Existing Profiles",
    manageProfiles: "🛠️ Manage Profiles (Rename / Delete)",
    exitManageProfiles: "⬅️ Back to selection",
    exportProgress: "📥 Export Progress (JSON)",
    importProgress: "📤 Import Progress",
    createNewProfile: "➕ Create New Profile",
    studentName: "Student Name",
    studentNamePlaceholder: "E.g.: Alex Smith, Jordan...",
    targetCert: "Target Certification",
    avatarColor: "Avatar Color",
    createAndStart: "Create Profile & Start",
    confirmDeleteProfile: "Are you sure you want to delete this profile? All its study statistics and mastery data will be permanently removed.",
    profileRenamed: "Profile renamed successfully.",
    enterNewName: "Enter the new name for this profile:",

    // Changelog
    versionHistoryTitle: "Version History & Updates",
    version: "Version",
    certs: "Certifications",
    type: "Type",
    description: "Change Description",
    status: "Status",
    active: "✓ Active",

    // Dashboard & Roadmap
    studyPlanTitle: "Your Study Plan",
    studyPlanSubtitle: "Consolidated mastery progress and phase milestones",
    phase1Title: "Phase 1: Foundations",
    phase1Desc: "Core concepts, architecture essentials, and basic-tier questions.",
    phase2Title: "Phase 2: Intermediate",
    phase2Desc: "Service configuration, hands-on workflows, and technical parameters.",
    phase3Title: "Phase 3: Real Exam",
    phase3Desc: "Complex case studies, code troubleshooting, and hardcore scenarios.",
    phaseComplete: "Phase completed!",
    phaseLocked: "Locked until reaching 80% mastery in the previous phase.",
    dueReviewsTitle: "Reviews Due Today",
    startReviewBtn: "Start Review",
    noDueReviews: "All caught up! You have no pending spaced repetition reviews today.",
    sessionConfigurator: "Session Configurator",
    mode: "Mode",
    guidedStudy: "Guided Study Mode (Immediate Feedback)",
    pearsonVueExam: "Official Pearson VUE Simulator (Timed Exam)",
    submode: "Focus / Submode",
    submodeAdaptive: "Smart Adaptive Repetition (Prioritizes Weak Topics & Missed Items)",
    submodeAllStudy: "General Study (All Difficulty Levels)",
    submodeBasic: "The Basics (Core Fundamentals & Concepts)",
    submodeHardcore: "Hardcore (Architecture, Code & Complex Scenarios)",
    submodeDomain: "By Domain (Skills Measured)",
    submodeTopic: "By Technology / MS Learn Topic",
    submodeCode: "Code Questions (SQL / DAX / KQL / PySpark)",
    submodeFailed: "Missed Questions Clinic (Retry Errors)",
    domain: "Knowledge Domain",
    allDomains: "All domains",
    topic: "Technology / Topic",
    allTopics: "All topics",
    questionCount: "Number of Questions",
    startSessionBtn: "🚀 Start Session",
    metricsAndHistory: "Metrics & Simulation History",
    filterCert: "Filter by certification:",
    allCerts: "All",
    targetCertLabel: "Target",
    totalSessions: "Completed Sessions",
    averageScore: "Average Score",
    passedRate: "Passing Rate",
    studyStreak: "Study Streak",
    days: "days",
    noHistoryYet: "No simulations recorded for this profile yet. Start a session to see your performance metrics!",

    // Exam / Pearson VUE Simulator
    question: "Question",
    of: "of",
    timeRemaining: "Time Remaining",
    markForReview: "Mark for review",
    marked: "Marked",
    strikethrough: "Strikethrough",
    singleSelectInstruction: "Select ONE correct answer:",
    multiSelectInstruction: "Select {count} correct answers:",
    previousBtn: "◀ Previous",
    nextBtn: "Next ▶",
    checkAnswerBtn: "🔍 Check Answer",
    submitExamBtn: "Submit Exam",
    reviewQuestionsModal: "Review Question List",
    modalReviewTitle: "Exam Question Overview",
    modalReviewSubtitle: "Review the status of your answers before final grading.",
    all: "All",
    unanswered: "Unanswered",
    markedOnly: "Marked only",
    finishAndGrade: "Confirm & Submit Exam",
    returnToExam: "Return to Questions",
    caseStudy: "Case Study",
    overviewTab: "Overview",
    requirementsTab: "Requirements",
    environmentTab: "Technical Environment",

    // Feedback & Theory
    detailedExplanation: "Detailed Explanation",
    theoryPill: "Theory Pill",
    keyPoints: "Key Points",
    examTrap: "Exam Trap",
    officialReferences: "Official Microsoft Learn References",
    reportIssue: "Report erratum or suggestion",
    yourAnswerCorrect: "Correct Answer!",
    yourAnswerIncorrect: "Incorrect Answer",

    // Results Screen
    examResults: "Results Summary",
    scaledScore: "Scaled Score (100 - 1000)",
    passingScoreIs: "Passing threshold: 700 / 1000",
    passedMsg: "CONGRATULATIONS! YOU PASSED THE SIMULATION",
    failedMsg: "FAILED — ADAPTIVE SPACED REVIEW RECOMMENDED",
    correctAnswers: "Correct",
    incorrectAnswers: "Incorrect",
    accuracy: "Accuracy",
    duration: "Time Spent",
    reviewAllQuestionsBtn: "📋 Review All Questions",
    reviewFailedQuestionsBtn: "⚠️ Review Missed Items Only",
    backToDashboardBtn: "🏠 Back to Dashboard",
    newSessionSameCertBtn: "🔄 New Session",

    // Cheat Sheet
    cheatSheetTitle: "Cheat Sheet & 24h Fast Review",
    cheatSheetSubtitle: "Technical fact sheets, official exam traps, and critical concepts to review before test day.",
    searchPlaceholder: "Search by term, concept or service...",
    onlyTraps: "Exam traps only",
    onlyFavs: "Favorites only",
    expandAll: "Expand all",
    collapseAll: "Collapse all",
    backToPanelBtn: "⬅ Back to Dashboard",
    noCheatCardsFound: "No fact sheets found matching the selected filters.",

    // Target Certification & Study Plan Modal
    targetCertModalTitle: "Set Up the Study Plan for {name}",
    targetCertModalSubtitle: "Which Microsoft certification do you want to prepare as your primary target? We will tailor your study path in 4 Progressive Phases:",
    trackAll: "All",
    trackData: "Data and BI",
    trackAi: "AI and Copilot",
    trackCloud: "Cloud and Security",
    searchCertPlaceholder: "Search by code, technology, or role (e.g. Fabric, Copilot, SQL, Sentinel)...",
    levelFundamentals: "Fundamentals",
    levelAssociate: "Associate",
    recommendedBadge: "⭐ Recommended to start",
    selectedLabel: "Selected:",
    generatePlanBtn: "🗺️ Generate My Custom Study Plan",
    noCertsMatchSearch: "No certifications match your search query.",
  }
};

export const I18n = {
  currentLang: 'es',

  init() {
    try {
      const stored = StorageManager.getLanguage();
      this.currentLang = stored === 'en' ? 'en' : 'es';
    } catch {
      this.currentLang = 'es';
    }
    this.applyToDOM();
    return this.currentLang;
  },

  getLang() {
    return this.currentLang;
  },

  setLang(lang) {
    this.currentLang = lang === 'en' ? 'en' : 'es';
    try {
      StorageManager.setLanguage(this.currentLang);
    } catch (e) {
      // ignore
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = this.currentLang;
      this.applyToDOM();
    }
    return this.currentLang;
  },

  toggleLang() {
    return this.setLang(this.currentLang === 'es' ? 'en' : 'es');
  },

  t(key, params = {}) {
    const dict = TRANSLATIONS[this.currentLang] || TRANSLATIONS.es;
    let text = dict[key] ?? TRANSLATIONS.es[key] ?? key;
    if (params && typeof params === 'object') {
      for (const [k, v] of Object.entries(params)) {
        text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
      }
    }
    return text;
  },

  applyToDOM() {
    if (typeof document === 'undefined') return;

    // Translate text content
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (key) {
        el.textContent = this.t(key);
      }
    });

    // Translate placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (key) {
        el.setAttribute('placeholder', this.t(key));
      }
    });

    // Translate titles / tooltips
    document.querySelectorAll('[data-i18n-title]').forEach((el) => {
      const key = el.getAttribute('data-i18n-title');
      if (key) {
        el.setAttribute('title', this.t(key));
      }
    });

    // Update language toggle button in header
    const langBtn = document.getElementById('btn-lang-toggle');
    if (langBtn) {
      const isEn = this.currentLang === 'en';
      langBtn.innerHTML = isEn
        ? '<span style="font-size:1rem;">🇬🇧</span> <span>EN</span>'
        : '<span style="font-size:1rem;">🇪🇸</span> <span>ES</span>';
      langBtn.title = isEn
        ? 'Switch to Spanish (Español)'
        : 'Cambiar idioma a Inglés (English)';
    }
  }
};
