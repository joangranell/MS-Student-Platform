/**
 * state.js — Central Runtime State for MS Student Platform SPA (v3 Login + Study Plan + Theme)
 */

export const AppState = {
  // Loaded from modular JSON files (data/dp900.json, data/dp600.json, data/dp700.json)
  catalogMeta: null,
  allQuestions: [],

  // Login & Profile Management State
  isLoggedIn: false,
  manageProfilesMode: false,

  // Dashboard Configurator State
  config: {
    certification: 'AZ-900',    // 'AZ-900' | 'DP-900' | 'DP-600' | 'DP-700' (default matches profile.targetCert)
    mode: 'exam',               // 'exam' | 'study'
    subMode: 'adaptive',        // 'adaptive' | 'all_study' | 'basic' | 'hardcore' | 'domain' | 'code' | 'failed' | 'topic'
    selectedDomain: 'ALL',      // Specific domain name or 'ALL'
    selectedTopicIcon: 'ALL',   // Specific topicIcon or 'ALL'
    questionCount: 10           // 5 | 10 | 25 | 45 | 'ALL'
  },

  // Active Test Session State
  session: {
    active: false,
    certification: 'AZ-900',
    mode: 'exam',
    subMode: 'adaptive',
    questions: [],
    currentIndex: 0,
    activeCaseTab: 'overview',
    answers: {},
    strikethroughs: {},
    markedForReview: new Set(),
    revealedInStudy: new Set(),
    startTimeMs: 0,
    remainingSeconds: 0,
    timerIntervalId: null
  },

  // Last Finished Result (for Results & Review View)
  lastResult: null,
  reviewFilter: 'ALL',

  // Cheat Sheet / 24h Express Review State
  cheatsheet: {
    certification: 'ALL',       // 'ALL' | 'AZ-900' | 'DP-900' | 'DP-600' | 'DP-700'
    searchQuery: '',
    selectedDomain: 'ALL',
    onlyTraps: false,
    onlyFavs: false,
    expandedAll: true
  }
};
