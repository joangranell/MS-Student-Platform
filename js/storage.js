/**
 * storage.js — Multi-Profile, Theme, Study Plan & Spaced Repetition (Leitner v2)
 * Key: 'ms_student_platform_v1' (with internal schemaVersion: 2)
 */

export const STORAGE_KEY = 'ms_student_platform_v1';

export const LEITNER_INTERVALS_DAYS = {
  0: 0,   // Inmediato / Misma sesión
  1: 1,   // 1 día
  2: 3,   // 3 días
  3: 7,   // 7 días
  4: 21   // 21 días (Dominada)
};

export function calculateNextReview(box, fromDate = new Date()) {
  const days = LEITNER_INTERVALS_DAYS[box] ?? 0;
  const d = new Date(fromDate);
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

const AVATAR_COLORS = [
  '#0078d4', '#107c41', '#d97706', '#8b5cf6', '#ec4899', '#0891b2'
];

function getInitials(name) {
  const parts = String(name || 'MS').trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function ensureProfileFields(p) {
  if (!p.failedQuestionIds) p.failedQuestionIds = [];
  if (!p.bookmarkedIds) p.bookmarkedIds = [];
  if (!p.masteredIds) p.masteredIds = [];
  if (!p.domainStats) p.domainStats = {};
  if (!p.topicStats) p.topicStats = {};
  if (!p.questionMastery) p.questionMastery = {};
  if (!p.history) p.history = [];
  if (p.hasConfiguredPlan === undefined) p.hasConfiguredPlan = false;
  return p;
}

export function migrateProfileToV2(p) {
  ensureProfileFields(p);
  const nowIso = new Date().toISOString();

  for (const qId of Object.keys(p.questionMastery)) {
    const m = p.questionMastery[qId];
    if (typeof m.box !== 'number') m.box = 0;
    if (m.box > 4) m.box = 4;
    // Map legacy box 3 with consistent hits to box 4 (mastered)
    if (m.box === 3 && ((m.consecutiveHits || 0) >= 3 || (m.totalHits || 0) >= 3)) {
      m.box = 4;
    }
    if (!m.lastSeen) m.lastSeen = nowIso;
    if (m.streak === undefined) m.streak = m.consecutiveHits || 0;
    if (m.attempts === undefined) m.attempts = (m.totalHits || 0) + (m.totalFails || 0) || 1;
    if (m.hits === undefined) m.hits = m.totalHits || 0;
    if (m.fails === undefined) m.fails = m.totalFails || 0;
    if (m.avgSeconds === undefined) m.avgSeconds = 45;
    if (m.lastConfidence === undefined) m.lastConfidence = null;
    if (!m.nextReview) {
      m.nextReview = calculateNextReview(m.box, new Date(m.lastSeen));
    }
  }

  // Ensure masteredIds contains all questions with box >= 4
  for (const qId of Object.keys(p.questionMastery)) {
    if (p.questionMastery[qId].box >= 4 && !p.masteredIds.includes(qId)) {
      p.masteredIds.push(qId);
    }
  }

  return p;
}

export function createDefaultStore() {
  const defaultProfile = migrateProfileToV2({
    id: 'prof_default',
    name: 'Usuario Demo',
    avatar: 'UD',
    color: '#0078d4',
    targetCert: 'AZ-900',
    hasConfiguredPlan: false,
    createdAt: new Date().toISOString()
  });

  return {
    schemaVersion: 2,
    theme: 'light',
    activeProfileId: defaultProfile.id,
    profiles: [defaultProfile]
  };
}

export function getStudyStreak(profile) {
  if (!profile || !profile.history || profile.history.length === 0) return 0;
  const days = new Set();
  for (const h of profile.history) {
    if (h.date) {
      const d = new Date(h.date).toLocaleDateString('en-CA');
      days.add(d);
    }
  }
  const today = new Date();
  let streak = 0;
  let check = new Date(today);

  let checkStr = check.toLocaleDateString('en-CA');
  if (!days.has(checkStr)) {
    check.setDate(check.getDate() - 1);
    checkStr = check.toLocaleDateString('en-CA');
    if (!days.has(checkStr)) {
      return 0;
    }
  }

  while (days.has(checkStr)) {
    streak++;
    check.setDate(check.getDate() - 1);
    checkStr = check.toLocaleDateString('en-CA');
  }
  return streak;
}

export function getMasteredThisWeekCount(profile) {
  if (!profile || !profile.questionMastery) return 0;
  const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  let count = 0;
  for (const qId of Object.keys(profile.questionMastery)) {
    const m = profile.questionMastery[qId];
    if (m && m.box >= 4 && m.lastSeen && new Date(m.lastSeen).getTime() >= oneWeekAgo) {
      count++;
    }
  }
  return count;
}

export function getDueReviewQuestions(profile, allQuestions, targetCert) {
  if (!profile || !allQuestions) return [];
  const now = new Date().toISOString();
  const effectiveCert = targetCert || profile.targetCert || 'AZ-900';
  const certQuestions = allQuestions.filter(q => q.certification === effectiveCert);

  return certQuestions.filter(q => {
    const m = profile.questionMastery?.[q.id];
    if (!m) return true; // Unseen questions are candidate for initial study
    if (m.box === 0) return true; // Box 0 due immediately
    return m.nextReview <= now; // Interval elapsed
  });
}

export const StorageManager = {
  loadStore() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        const initial = createDefaultStore();
        this.saveStore(initial);
        return initial;
      }
      const parsed = JSON.parse(raw);
      if (!parsed.profiles || !Array.isArray(parsed.profiles) || parsed.profiles.length === 0) {
        const initial = createDefaultStore();
        this.saveStore(initial);
        return initial;
      }
      if (!parsed.theme) parsed.theme = 'light';

      // Migrate to schemaVersion 2 if missing or outdated
      if (!parsed.schemaVersion || parsed.schemaVersion < 2) {
        parsed.profiles = parsed.profiles.map(migrateProfileToV2);
        parsed.schemaVersion = 2;
        this.saveStore(parsed);
      } else {
        parsed.profiles = parsed.profiles.map(ensureProfileFields);
      }

      // Auto-migrate legacy default profile name if present
      let migrated = false;
      parsed.profiles.forEach((p) => {
        if (p.id === 'prof_default' && (p.name === 'Candidato Microsoft' || !p.name)) {
          p.name = 'Usuario Demo';
          p.avatar = 'UD';
          migrated = true;
        }
      });
      if (migrated) {
        this.saveStore(parsed);
      }

      return parsed;
    } catch (err) {
      console.error('Error loading localStorage, resetting store:', err);
      const initial = createDefaultStore();
      this.saveStore(initial);
      return initial;
    }
  },

  saveStore(store) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    } catch (err) {
      console.error('Error saving to localStorage:', err);
      // Warning for private browsing quota limit
      if (err.name === 'QuotaExceededError' || err.code === 22) {
        alert('Aviso de almacenamiento: El espacio local de tu navegador (localStorage) está lleno o en modo privado estricto. Se recomienda exportar tu progreso.');
      }
    }
  },

  getTheme() {
    const store = this.loadStore();
    return store.theme === 'dark' ? 'dark' : 'light';
  },

  setTheme(theme) {
    const store = this.loadStore();
    store.theme = theme === 'dark' ? 'dark' : 'light';
    this.saveStore(store);
    return store.theme;
  },

  getAllProfiles() {
    const store = this.loadStore();
    return store.profiles;
  },

  getActiveProfile() {
    const store = this.loadStore();
    const prof =
      store.profiles.find((p) => p.id === store.activeProfileId) ||
      store.profiles[0];
    return ensureProfileFields(prof);
  },

  setActiveProfile(profileId) {
    const store = this.loadStore();
    const exists = store.profiles.some((p) => p.id === profileId);
    if (exists) {
      store.activeProfileId = profileId;
      this.saveStore(store);
    }
    return this.getActiveProfile();
  },

  createProfile(name, targetCert = 'AZ-900') {
    const cleanName = String(name || '').trim() || 'Nuevo Estudiante';
    const store = this.loadStore();
    const color = AVATAR_COLORS[store.profiles.length % AVATAR_COLORS.length];

    const newProfile = migrateProfileToV2({
      id: 'prof_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      name: cleanName,
      avatar: getInitials(cleanName),
      color,
      targetCert,
      hasConfiguredPlan: false,
      createdAt: new Date().toISOString()
    });

    store.profiles.push(newProfile);
    store.activeProfileId = newProfile.id;
    this.saveStore(store);
    return newProfile;
  },

  updateProfile(profileId, updates = {}) {
    const store = this.loadStore();
    const profile = store.profiles.find((p) => p.id === profileId);
    if (!profile) return null;

    if (updates.name !== undefined) {
      const cleanName = String(updates.name).trim();
      if (cleanName) {
        profile.name = cleanName;
        profile.avatar = getInitials(cleanName);
      }
    }
    if (updates.targetCert !== undefined) {
      profile.targetCert = updates.targetCert;
    }
    if (updates.hasConfiguredPlan !== undefined) {
      profile.hasConfiguredPlan = Boolean(updates.hasConfiguredPlan);
    }

    this.saveStore(store);
    return ensureProfileFields(profile);
  },

  deleteProfile(profileId) {
    const store = this.loadStore();
    if (store.profiles.length <= 1) {
      throw new Error('Debe existir al menos un perfil en la plataforma.');
    }
    store.profiles = store.profiles.filter((p) => p.id !== profileId);
    if (store.activeProfileId === profileId) {
      store.activeProfileId = store.profiles[0].id;
    }
    this.saveStore(store);
    return this.getActiveProfile();
  },

  toggleBookmark(questionId) {
    const store = this.loadStore();
    const profile = ensureProfileFields(
      store.profiles.find((p) => p.id === store.activeProfileId) || store.profiles[0]
    );

    const idx = profile.bookmarkedIds.indexOf(questionId);
    let isBookmarked = false;
    if (idx === -1) {
      profile.bookmarkedIds.push(questionId);
      isBookmarked = true;
    } else {
      profile.bookmarkedIds.splice(idx, 1);
      isBookmarked = false;
    }
    this.saveStore(store);
    return isBookmarked;
  },

  updateQuestionAdaptiveState(profile, qItem, confidence = null, secondsSpent = 0) {
    const qId = qItem.questionId;
    if (!profile.questionMastery[qId]) {
      profile.questionMastery[qId] = {
        box: 0,
        streak: 0,
        attempts: 0,
        hits: 0,
        fails: 0,
        avgSeconds: 45,
        lastSeen: null,
        nextReview: calculateNextReview(0),
        lastConfidence: null
      };
    }

    const m = profile.questionMastery[qId];
    m.lastSeen = new Date().toISOString();
    m.attempts = (m.attempts || 0) + 1;
    m.lastConfidence = confidence;

    if (secondsSpent > 0) {
      const prevTotal = (m.avgSeconds || 45) * (m.attempts - 1);
      m.avgSeconds = Math.round((prevTotal + secondsSpent) / m.attempts);
    }

    if (qItem.isCorrect) {
      m.hits = (m.hits || 0) + 1;
      m.streak = (m.streak || 0) + 1;

      // Pedagogical rule: if the question was guessed, correct answer does NOT increase box
      if (confidence === 'guessed') {
        m.nextReview = calculateNextReview(m.box);
      } else {
        m.box = Math.min(4, (m.box || 0) + 1);
        m.nextReview = calculateNextReview(m.box);
      }

      if (m.box >= 1) {
        profile.failedQuestionIds = profile.failedQuestionIds.filter((id) => id !== qId);
      }
      if (m.box >= 4 && !profile.masteredIds.includes(qId)) {
        profile.masteredIds.push(qId);
      }
    } else {
      m.fails = (m.fails || 0) + 1;
      m.streak = 0;
      m.box = 0;
      m.nextReview = calculateNextReview(0); // Due immediately

      if (!profile.failedQuestionIds.includes(qId)) {
        profile.failedQuestionIds.push(qId);
      }
      profile.masteredIds = profile.masteredIds.filter((id) => id !== qId);
    }

    const iconKey = qItem.topicIcon || 'fabric';
    if (!profile.topicStats[iconKey]) {
      profile.topicStats[iconKey] = {
        topicIcon: iconKey,
        hit: 0,
        total: 0,
        fails: 0
      };
    }
    profile.topicStats[iconKey].total += 1;
    if (qItem.isCorrect) {
      profile.topicStats[iconKey].hit += 1;
    } else {
      profile.topicStats[iconKey].fails += 1;
    }

    const domKey = `${qItem.certification}::${qItem.domain}`;
    if (!profile.domainStats[domKey]) {
      profile.domainStats[domKey] = {
        certification: qItem.certification,
        domain: qItem.domain,
        hit: 0,
        total: 0
      };
    }
    profile.domainStats[domKey].total += 1;
    if (qItem.isCorrect) {
      profile.domainStats[domKey].hit += 1;
    }
  },

  recordAttemptResult(resultSummary) {
    const store = this.loadStore();
    const profile = ensureProfileFields(
      store.profiles.find((p) => p.id === store.activeProfileId) || store.profiles[0]
    );

    resultSummary.questionDetails.forEach((qItem) => {
      this.updateQuestionAdaptiveState(
        profile,
        qItem,
        qItem.confidence || null,
        qItem.secondsSpent || 0
      );
    });

    const historyEntry = {
      attemptId: 'att_' + Date.now(),
      date: new Date().toISOString(),
      certification: resultSummary.certification,
      mode: resultSummary.mode,
      subMode: resultSummary.subMode,
      totalQuestions: resultSummary.totalQuestions,
      correctCount: resultSummary.correctCount,
      wrongCount: resultSummary.wrongCount,
      unansweredCount: resultSummary.unansweredCount,
      percentage: resultSummary.percentage,
      scaledScore: resultSummary.scaledScore,
      passed: resultSummary.passed,
      durationSeconds: resultSummary.durationSeconds
    };

    profile.history.unshift(historyEntry);
    if (profile.history.length > 50) {
      profile.history = profile.history.slice(0, 50);
    }

    this.saveStore(store);
    return profile;
  },

  clearActiveProfileHistory() {
    const store = this.loadStore();
    const profile = ensureProfileFields(
      store.profiles.find((p) => p.id === store.activeProfileId) || store.profiles[0]
    );
    profile.history = [];
    profile.domainStats = {};
    profile.topicStats = {};
    profile.questionMastery = {};
    profile.failedQuestionIds = [];
    profile.masteredIds = [];
    this.saveStore(store);
    return profile;
  },

  exportStoreJSON() {
    const store = this.loadStore();
    return JSON.stringify(store, null, 2);
  },

  importStoreJSON(jsonString) {
    let parsed;
    try {
      parsed = JSON.parse(jsonString);
    } catch (e) {
      throw new Error('El archivo seleccionado no es un JSON válido.');
    }
    if (!parsed || !Array.isArray(parsed.profiles) || parsed.profiles.length === 0) {
      throw new Error('El archivo no contiene un formato de perfiles válido de MS Student Platform.');
    }
    // Migrate all imported profiles to schemaVersion 2
    parsed.profiles = parsed.profiles.map(migrateProfileToV2);
    parsed.schemaVersion = 2;
    this.saveStore(parsed);
    return this.getActiveProfile();
  }
};
