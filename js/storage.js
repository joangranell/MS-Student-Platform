/**
 * storage.js — Multi-Profile, Theme, Study Plan & Spaced Repetition Persistence
 * Key: 'ms_student_platform_v1'
 */

const STORAGE_KEY = 'ms_student_platform_v1';

const AVATAR_COLORS = [
  '#0078d4', '#107c41', '#d97706', '#8b5cf6', '#ec4899', '#0891b2'
];

function getInitials(name) {
  const parts = String(name || 'MS').trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function ensureProfileFields(p) {
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

function createDefaultStore() {
  const defaultProfile = ensureProfileFields({
    id: 'prof_default',
    name: 'Usuario Demo',
    avatar: 'UD',
    color: '#0078d4',
    targetCert: 'AZ-900',
    hasConfiguredPlan: false,
    createdAt: new Date().toISOString()
  });

  return {
    theme: 'light',
    activeProfileId: defaultProfile.id,
    profiles: [defaultProfile]
  };
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
      parsed.profiles = parsed.profiles.map(ensureProfileFields);
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

  createProfile(name, targetCert = 'DP-600') {
    const cleanName = String(name || '').trim() || 'Nuevo Estudiante';
    const store = this.loadStore();
    const color = AVATAR_COLORS[store.profiles.length % AVATAR_COLORS.length];

    const newProfile = ensureProfileFields({
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

  updateQuestionAdaptiveState(profile, qItem) {
    const qId = qItem.questionId;
    if (!profile.questionMastery[qId]) {
      profile.questionMastery[qId] = {
        box: 0,
        consecutiveHits: 0,
        totalHits: 0,
        totalFails: 0,
        lastSeen: null
      };
    }

    const m = profile.questionMastery[qId];
    m.lastSeen = new Date().toISOString();

    if (qItem.isCorrect) {
      m.consecutiveHits += 1;
      m.totalHits += 1;
      m.box = Math.min(3, m.consecutiveHits);

      if (m.consecutiveHits >= 2) {
        profile.failedQuestionIds = profile.failedQuestionIds.filter((id) => id !== qId);
      }
      if (!profile.masteredIds.includes(qId) && m.box >= 2) {
        profile.masteredIds.push(qId);
      }
    } else {
      m.consecutiveHits = 0;
      m.totalFails += 1;
      m.box = 0;
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
      this.updateQuestionAdaptiveState(profile, qItem);
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
    const parsed = JSON.parse(jsonString);
    if (!parsed || !Array.isArray(parsed.profiles) || parsed.profiles.length === 0) {
      throw new Error('El archivo JSON no tiene un formato de perfiles válido.');
    }
    this.saveStore(parsed);
    return this.getActiveProfile();
  }
};
