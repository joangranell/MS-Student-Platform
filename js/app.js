/**
 * app.js — Main Controller for MS Student Platform SPA (v3: Login Screen, Theme Toggle, Target Cert Onboarding & Study Plan)
 */

import { AppState } from './state.js';
import { StorageManager } from './storage.js';
import { ExamEngine } from './examEngine.js';
import { UI, formatTimeMMSS, escapeHtml } from './ui.js';

async function loadQuestionsRepository() {
  const modularFiles = [
    './data/az900.json',
    './data/dp900.json',
    './data/dp600.json',
    './data/dp700.json',
    './data/questions.json'
  ];

  const mergedMap = new Map();
  let metaLoaded = null;

  for (const url of modularFiles) {
    try {
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) continue;
      const data = await res.json();
      if (data.meta && !metaLoaded) {
        metaLoaded = data.meta;
      }
      if (Array.isArray(data.questions)) {
        for (const q of data.questions) {
          if (q && q.id && !mergedMap.has(q.id)) {
            mergedMap.set(q.id, q);
          }
        }
      }
    } catch (e) {
      // Ignore individual missing module if another succeeded
    }
  }

  AppState.catalogMeta = metaLoaded || {};
  AppState.allQuestions = Array.from(mergedMap.values());

  if (AppState.allQuestions.length === 0) {
    throw new Error('No se pudieron cargar los archivos JSON de preguntas.');
  }
}

function refreshLoginScreen() {
  UI.renderLoginScreen(
    StorageManager.getAllProfiles(),
    AppState.manageProfilesMode
  );
}

function refreshDashboard() {
  const activeProfile = StorageManager.getActiveProfile();
  const eligible = ExamEngine.filterQuestions(
    AppState.allQuestions,
    AppState.config,
    activeProfile
  );
  UI.renderDashboard(AppState, activeProfile, eligible);
}

/**
 * Logs into the platform with the chosen profile ID.
 * If the profile hasn't confirmed its Target Certification Study Plan yet, opens the onboarding selector.
 */
function loginWithProfile(profileId, forceAskTargetCert = false) {
  const profile = StorageManager.setActiveProfile(profileId);
  AppState.isLoggedIn = true;
  AppState.config.certification = profile.targetCert || 'DP-600';
  AppState.config.selectedDomain = 'ALL';

  UI.showView('dashboard');
  refreshDashboard();

  if (!profile.hasConfiguredPlan || forceAskTargetCert) {
    UI.openTargetCertModal(profile);
  }
}

function stopSessionTimer() {
  if (AppState.session.timerIntervalId) {
    clearInterval(AppState.session.timerIntervalId);
    AppState.session.timerIntervalId = null;
  }
}

function startSessionTimer() {
  stopSessionTimer();
  const timerEl = document.getElementById('vue-timer-display');

  AppState.session.timerIntervalId = setInterval(() => {
    if (!AppState.session.active) {
      stopSessionTimer();
      return;
    }

    if (AppState.session.mode === 'exam') {
      AppState.session.remainingSeconds -= 1;
      if (timerEl) {
        timerEl.textContent = `⏱ Tiempo Restante: ${formatTimeMMSS(AppState.session.remainingSeconds)}`;
        timerEl.classList.toggle('warning', AppState.session.remainingSeconds <= 180);
      }
      if (AppState.session.remainingSeconds <= 0) {
        stopSessionTimer();
        finalizeExamSession();
      }
    } else {
      const elapsed = Math.floor((Date.now() - AppState.session.startTimeMs) / 1000);
      if (timerEl) {
        timerEl.textContent = `⏱ Tiempo Estudio: ${formatTimeMMSS(elapsed)}`;
        timerEl.classList.remove('warning');
      }
    }
  }, 1000);
}

function startSessionWithPool(pool, mode, subMode, certificationLabel) {
  if (!pool || pool.length === 0) {
    alert('No hay preguntas disponibles con los filtros seleccionados.');
    return;
  }

  const activeProfile = StorageManager.getActiveProfile();
  const isAdaptive = mode === 'study' && subMode === 'adaptive';

  const sessionQuestions = ExamEngine.buildSessionQuestions(
    pool,
    AppState.config.questionCount,
    isAdaptive,
    activeProfile
  );

  const allocatedSeconds = sessionQuestions.length * 105;

  AppState.session = {
    active: true,
    certification: certificationLabel || AppState.config.certification,
    mode,
    subMode,
    questions: sessionQuestions,
    currentIndex: 0,
    activeCaseTab: 'overview',
    answers: {},
    strikethroughs: {},
    markedForReview: new Set(),
    revealedInStudy: new Set(),
    startTimeMs: Date.now(),
    remainingSeconds: allocatedSeconds,
    timerIntervalId: null
  };

  const timerEl = document.getElementById('vue-timer-display');
  if (timerEl) {
    timerEl.textContent =
      mode === 'exam'
        ? `⏱ Tiempo Restante: ${formatTimeMMSS(allocatedSeconds)}`
        : '⏱ Tiempo Estudio: 00:00';
    timerEl.classList.remove('warning');
  }

  UI.showView('exam');
  UI.renderExamQuestion(AppState.session, activeProfile);
  startSessionTimer();
}

function finalizeExamSession() {
  stopSessionTimer();
  AppState.session.active = false;

  document.getElementById('modal-review-grid')?.classList.add('hidden');
  document.getElementById('drawer-learn-more')?.classList.add('hidden');

  const result = ExamEngine.evaluateSession(AppState.session);
  AppState.lastResult = result;

  AppState.reviewFilter = result.wrongCount + result.unansweredCount > 0 ? 'FAILED' : 'ALL';

  StorageManager.recordAttemptResult(result);

  UI.showView('results');
  UI.renderResultsView(result, AppState.reviewFilter);
}

function toggleOptionStrikethrough(questionId, optionId) {
  if (!AppState.session.strikethroughs[questionId]) {
    AppState.session.strikethroughs[questionId] = new Set();
  }
  const set = AppState.session.strikethroughs[questionId];
  if (set.has(optionId)) {
    set.delete(optionId);
  } else {
    set.add(optionId);
  }
  UI.renderExamQuestion(AppState.session, StorageManager.getActiveProfile());
}

async function queryLiveMsLearnMcp(action, query) {
  const container = document.getElementById('mcp-live-results-container');
  if (!container) return;

  container.innerHTML = `
    <div style="padding:0.85rem; color:var(--ms-blue-light); font-size:0.85rem;">
      ⏳ Consultando en tiempo real el servidor MCP de Microsoft Learn (<code>https://learn.microsoft.com/api/mcp</code>)...
    </div>
  `;

  try {
    const res = await fetch(
      `/api/mslearn?action=${encodeURIComponent(action)}&q=${encodeURIComponent(query)}`
    );
    const payload = await res.json();
    if (!payload.ok) {
      throw new Error(payload.error || 'Error en la respuesta del MCP');
    }

    const results = payload.data?.results || [];
    if (results.length === 0) {
      container.innerHTML = `
        <div class="mcp-result-card">
          No se encontraron resultados directos para <strong>${escapeHtml(query)}</strong>. Prueba con otros términos en inglés o español.
        </div>
      `;
      return;
    }

    if (action === 'code') {
      container.innerHTML = results
        .slice(0, 5)
        .map(
          (item) => `
          <div class="mcp-result-card">
            <h4>💻 [${escapeHtml(item.language || 'Code')}] ${escapeHtml(item.description)}</h4>
            <div class="code-snippet-block" style="margin:0.45rem 0;">
              <pre>${escapeHtml(item.codeSnippet || '')}</pre>
            </div>
            <a href="${escapeHtml(item.link)}" target="_blank" rel="noopener noreferrer" class="ms-learn-link-item">
              🔗 Ver ejemplo completo en Microsoft Learn ↗
            </a>
          </div>
        `
        )
        .join('');
    } else {
      container.innerHTML = results
        .slice(0, 5)
        .map(
          (item) => `
          <div class="mcp-result-card">
            <h4>📘 ${escapeHtml(item.title)}</h4>
            <div class="mcp-excerpt">${escapeHtml((item.content || '').slice(0, 900))}</div>
            <a href="${escapeHtml(item.contentUrl)}" target="_blank" rel="noopener noreferrer" class="ms-learn-link-item">
              🔗 Abrir artículo oficial en Microsoft Learn ↗
            </a>
          </div>
        `
        )
        .join('');
    }
  } catch (err) {
    container.innerHTML = `
      <div class="mcp-result-card" style="border-color:var(--danger);">
        <strong>Aviso:</strong> Para usar la consulta en vivo al MCP asegúrate de haber iniciado la app mediante <code>node server.js</code> o <code>iniciar-plataforma.bat</code> (${escapeHtml(err.message)}).
      </div>
    `;
  }
}

function bindEvents() {
  // 0. Dark / Light Theme Toggle
  document.getElementById('btn-theme-toggle')?.addEventListener('click', () => {
    const current = StorageManager.getTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    StorageManager.setTheme(next);
    UI.applyTheme(next);
  });

  // 1. Header Navigation & Switching Back to Login Screen
  document.getElementById('brand-home-link')?.addEventListener('click', () => {
    if (AppState.session.active) {
      if (!confirm('¿Salir de la sesión actual? Se perderá el intento en curso.')) {
        return;
      }
      stopSessionTimer();
      AppState.session.active = false;
    }
    if (AppState.isLoggedIn) {
      UI.showView('dashboard');
      refreshDashboard();
    } else {
      UI.showView('login');
      refreshLoginScreen();
    }
  });

  document.getElementById('btn-open-profiles')?.addEventListener('click', () => {
    if (AppState.session.active) {
      if (!confirm('¿Cambiar de perfil? Se cerrará el test en curso.')) return;
      stopSessionTimer();
      AppState.session.active = false;
    }
    AppState.isLoggedIn = false;
    AppState.manageProfilesMode = false;
    UI.showView('login');
    refreshLoginScreen();
  });

  // 1.1 Login / Start Screen Events (#view-login)
  document.getElementById('btn-toggle-manage-profiles')?.addEventListener('click', () => {
    AppState.manageProfilesMode = !AppState.manageProfilesMode;
    refreshLoginScreen();
  });

  document.getElementById('login-profiles-list')?.addEventListener('click', (e) => {
    // Save renamed profile
    const saveBtn = e.target.closest('[data-save-profile]');
    if (saveBtn) {
      e.stopPropagation();
      const profId = saveBtn.getAttribute('data-save-profile');
      const nameInput = document.querySelector(`[data-rename-input="${profId}"]`);
      const certSelect = document.querySelector(`[data-cert-input="${profId}"]`);
      StorageManager.updateProfile(profId, {
        name: nameInput?.value || 'Estudiante',
        targetCert: certSelect?.value || 'DP-600'
      });
      refreshLoginScreen();
      return;
    }

    // Delete profile from login manager
    const delBtn = e.target.closest('[data-login-delete-profile]');
    if (delBtn) {
      e.stopPropagation();
      const profId = delBtn.getAttribute('data-login-delete-profile');
      if (confirm('¿Seguro que deseas eliminar este perfil y todo su progreso?')) {
        try {
          StorageManager.deleteProfile(profId);
          refreshLoginScreen();
        } catch (err) {
          alert(err.message);
        }
      }
      return;
    }

    // Normal click: Log in as selected profile
    const loginCard = e.target.closest('[data-login-profile]');
    if (loginCard && !AppState.manageProfilesMode) {
      const profId = loginCard.getAttribute('data-login-profile');
      loginWithProfile(profId, false);
    }
  });

  // Create new profile from Login Screen
  document.getElementById('form-login-create-profile')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('input-login-new-name');
    const name = nameInput?.value.trim();
    if (!name) return;

    const created = StorageManager.createProfile(name, 'DP-600');
    if (nameInput) nameInput.value = '';
    // Log in immediately and open the Target Certification & Study Plan onboarding!
    loginWithProfile(created.id, true);
  });

  // Backup Export / Import on Login Screen
  document.getElementById('btn-export-profiles')?.addEventListener('click', () => {
    const jsonStr = StorageManager.exportStoreJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ms-student-profiles-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });

  document.getElementById('input-import-profiles')?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        StorageManager.importStoreJSON(String(reader.result));
        refreshLoginScreen();
        alert('Perfiles e historial importados correctamente.');
      } catch (err) {
        alert('Error al importar JSON: ' + err.message);
      }
    };
    reader.readAsText(file);
  });

  // 1.2 Target Certification & Study Plan Onboarding Modal Events (#modal-target-cert)
  document.getElementById('onboarding-cert-cards')?.addEventListener('click', (e) => {
    const card = e.target.closest('[data-select-onboarding-cert]');
    if (!card) return;
    const code = card.getAttribute('data-select-onboarding-cert');
    const modal = document.getElementById('modal-target-cert');
    if (modal) modal.setAttribute('data-selected-cert', code);

    document.querySelectorAll('#onboarding-cert-cards .cert-card').forEach((c) => {
      c.classList.toggle('selected', c.getAttribute('data-select-onboarding-cert') === code);
    });
  });

  document.getElementById('btn-confirm-target-cert')?.addEventListener('click', () => {
    const modal = document.getElementById('modal-target-cert');
    const chosenCert = modal?.getAttribute('data-selected-cert') || 'DP-600';
    const active = StorageManager.getActiveProfile();

    StorageManager.updateProfile(active.id, {
      targetCert: chosenCert,
      hasConfiguredPlan: true
    });

    AppState.config.certification = chosenCert;
    AppState.config.selectedDomain = 'ALL';
    modal?.classList.add('hidden');
    refreshDashboard();
  });

  document.getElementById('btn-close-target-cert-modal')?.addEventListener('click', () => {
    document.getElementById('modal-target-cert')?.classList.add('hidden');
  });

  // 2. Dashboard Study Plan & Configurator Events
  document.getElementById('study-plan-container')?.addEventListener('click', (e) => {
    if (e.target.closest('#btn-change-target-cert')) {
      UI.openTargetCertModal(StorageManager.getActiveProfile());
      return;
    }

    const phaseBtn = e.target.closest('[data-launch-plan-phase]');
    if (phaseBtn) {
      const phase = phaseBtn.getAttribute('data-launch-plan-phase');
      const activeProfile = StorageManager.getActiveProfile();
      const targetCert = activeProfile.targetCert || 'DP-600';
      const certPool = AppState.allQuestions.filter((q) => q.certification === targetCert);

      if (phase === 'basic') {
        const pool = certPool.filter((q) => q.difficulty === 'basic');
        startSessionWithPool(pool, 'study', 'basic', `${targetCert} • FASE 1 (CIMIENTOS)`);
      } else if (phase === 'adaptive') {
        startSessionWithPool(certPool, 'study', 'adaptive', `${targetCert} • FASE 2 (CONSOLIDACIÓN)`);
      } else if (phase === 'hardcore') {
        const pool = certPool.filter((q) => q.difficulty === 'hardcore' || q.hasCodeSnippet);
        startSessionWithPool(pool, 'study', 'hardcore', `${targetCert} • FASE 3 (NIVEL EXPERTO)`);
      } else if (phase === 'exam') {
        AppState.config.questionCount = Math.min(certPool.length, 45);
        startSessionWithPool(certPool, 'exam', 'all_study', `${targetCert} • SIMULACRO OFICIAL`);
      }
    }
  });

  document.querySelectorAll('#view-dashboard .cert-card').forEach((card) => {
    card.addEventListener('click', () => {
      AppState.config.certification = card.getAttribute('data-cert') || 'ALL';
      AppState.config.selectedDomain = 'ALL';
      refreshDashboard();
    });
  });

  document.querySelectorAll('.mode-box').forEach((box) => {
    box.addEventListener('click', () => {
      AppState.config.mode = box.getAttribute('data-mode') || 'exam';
      refreshDashboard();
    });
  });

  document.querySelectorAll('.submode-item').forEach((item) => {
    item.addEventListener('click', () => {
      AppState.config.subMode = item.getAttribute('data-submode') || 'adaptive';
      refreshDashboard();
    });
  });

  document.getElementById('domain-select')?.addEventListener('change', (e) => {
    AppState.config.selectedDomain = e.target.value;
    refreshDashboard();
  });

  document.querySelectorAll('.count-pill').forEach((pill) => {
    pill.addEventListener('click', () => {
      const val = pill.getAttribute('data-count');
      AppState.config.questionCount = val === 'ALL' ? 'ALL' : Number(val);
      refreshDashboard();
    });
  });

  document.getElementById('btn-start-session')?.addEventListener('click', () => {
    const activeProfile = StorageManager.getActiveProfile();
    const eligible = ExamEngine.filterQuestions(
      AppState.allQuestions,
      AppState.config,
      activeProfile
    );
    startSessionWithPool(
      eligible,
      AppState.config.mode,
      AppState.config.subMode,
      AppState.config.certification
    );
  });

  document.getElementById('btn-launch-failed-test')?.addEventListener('click', () => {
    const activeProfile = StorageManager.getActiveProfile();
    const targetCert = activeProfile.targetCert || AppState.config.certification || 'DP-600';
    const failedIds = activeProfile.failedQuestionIds || [];
    const failedPool = AppState.allQuestions.filter((q) => {
      const matchCert = targetCert === 'ALL' || q.certification === targetCert;
      return matchCert && failedIds.includes(q.id);
    });
    startSessionWithPool(failedPool, 'study', 'failed', `${targetCert} • CLÍNICA DE FALLOS`);
  });

  document.getElementById('knowledge-heatmap-grid')?.addEventListener('click', (e) => {
    const drillBtn = e.target.closest('[data-drill-topic]');
    if (!drillBtn) return;
    const topicIcon = drillBtn.getAttribute('data-drill-topic');
    const pool = AppState.allQuestions.filter((q) => {
      const certMatch =
        AppState.config.certification === 'ALL' ||
        q.certification === AppState.config.certification;
      return certMatch && (q.topicIcon || 'fabric') === topicIcon;
    });
    startSessionWithPool(pool, 'study', 'adaptive', `${AppState.config.certification} (${topicIcon.toUpperCase()})`);
  });

  document.getElementById('btn-clear-history')?.addEventListener('click', () => {
    if (confirm('¿Seguro que deseas borrar el historial y estadísticas de este perfil?')) {
      StorageManager.clearActiveProfileHistory();
      refreshDashboard();
    }
  });

  // 3. Pearson VUE Exam / Study View Events
  document.getElementById('vue-case-tabs-bar')?.addEventListener('click', (e) => {
    const tabBtn = e.target.closest('[data-case-tab]');
    if (!tabBtn) return;
    AppState.session.activeCaseTab = tabBtn.getAttribute('data-case-tab') || 'overview';
    UI.renderExamQuestion(AppState.session, StorageManager.getActiveProfile());
  });

  const optionsContainer = document.getElementById('vue-options-container');
  optionsContainer?.addEventListener('click', (e) => {
    const currentQ = AppState.session.questions[AppState.session.currentIndex];
    if (!currentQ) return;

    const strikeBtn = e.target.closest('[data-strike-option]');
    if (strikeBtn) {
      e.stopPropagation();
      const optId = strikeBtn.getAttribute('data-strike-option');
      toggleOptionStrikethrough(currentQ.id, optId);
      return;
    }

    if (
      AppState.session.mode === 'study' &&
      AppState.session.revealedInStudy.has(currentQ.id)
    ) {
      return;
    }

    const row = e.target.closest('[data-option-id]');
    if (!row) return;

    const optId = row.getAttribute('data-option-id');
    const isMulti =
      currentQ.questionType === 'multi' ||
      (currentQ.requiredSelections && currentQ.requiredSelections > 1);
    const maxRequired = currentQ.requiredSelections || 1;

    if (isMulti) {
      const currentArr = Array.isArray(AppState.session.answers[currentQ.id])
        ? [...AppState.session.answers[currentQ.id]]
        : [];

      const existingIdx = currentArr.indexOf(optId);
      if (existingIdx !== -1) {
        currentArr.splice(existingIdx, 1);
      } else {
        if (currentArr.length >= maxRequired) {
          alert(
            `Aviso Pearson VUE: En esta pregunta debes seleccionar exactamente ${maxRequired} opciones. Desmarca una opción antes de elegir otra.`
          );
          return;
        }
        currentArr.push(optId);
      }
      AppState.session.answers[currentQ.id] = currentArr;
    } else {
      AppState.session.answers[currentQ.id] = [optId];
    }

    UI.renderExamQuestion(AppState.session, StorageManager.getActiveProfile());
  });

  optionsContainer?.addEventListener('contextmenu', (e) => {
    const row = e.target.closest('[data-option-id]');
    if (!row) return;
    e.preventDefault();
    const currentQ = AppState.session.questions[AppState.session.currentIndex];
    if (!currentQ) return;
    const optId = row.getAttribute('data-option-id');
    toggleOptionStrikethrough(currentQ.id, optId);
  });

  document.getElementById('vue-mark-review-checkbox')?.addEventListener('change', (e) => {
    const currentQ = AppState.session.questions[AppState.session.currentIndex];
    if (!currentQ) return;
    if (e.target.checked) {
      AppState.session.markedForReview.add(currentQ.id);
    } else {
      AppState.session.markedForReview.delete(currentQ.id);
    }
  });

  document.getElementById('vue-bookmark-btn')?.addEventListener('click', () => {
    const currentQ = AppState.session.questions[AppState.session.currentIndex];
    if (!currentQ) return;
    StorageManager.toggleBookmark(currentQ.id);
    UI.renderExamQuestion(AppState.session, StorageManager.getActiveProfile());
  });

  document.getElementById('vue-btn-saber-mas-top')?.addEventListener('click', () => {
    const currentQ = AppState.session.questions[AppState.session.currentIndex];
    if (currentQ) UI.openTheoryDrawer(currentQ);
  });

  document.getElementById('vue-btn-check-study')?.addEventListener('click', () => {
    const currentQ = AppState.session.questions[AppState.session.currentIndex];
    if (!currentQ) return;
    AppState.session.revealedInStudy.add(currentQ.id);
    UI.renderExamQuestion(AppState.session, StorageManager.getActiveProfile());
  });

  document.getElementById('vue-btn-prev')?.addEventListener('click', () => {
    if (AppState.session.currentIndex > 0) {
      AppState.session.currentIndex -= 1;
      AppState.session.activeCaseTab = 'overview';
      UI.renderExamQuestion(AppState.session, StorageManager.getActiveProfile());
    }
  });

  document.getElementById('vue-btn-next')?.addEventListener('click', () => {
    const total = AppState.session.questions.length;
    if (AppState.session.currentIndex < total - 1) {
      AppState.session.currentIndex += 1;
      AppState.session.activeCaseTab = 'overview';
      UI.renderExamQuestion(AppState.session, StorageManager.getActiveProfile());
    } else {
      UI.renderReviewModal(AppState.session);
    }
  });

  document.getElementById('vue-btn-review-grid')?.addEventListener('click', () => {
    UI.renderReviewModal(AppState.session);
  });

  document.getElementById('btn-close-review-modal')?.addEventListener('click', () => {
    document.getElementById('modal-review-grid')?.classList.add('hidden');
  });

  document.getElementById('review-grid-cells')?.addEventListener('click', (e) => {
    const cell = e.target.closest('[data-jump-index]');
    if (!cell) return;
    const idx = Number(cell.getAttribute('data-jump-index'));
    AppState.session.currentIndex = idx;
    AppState.session.activeCaseTab = 'overview';
    document.getElementById('modal-review-grid')?.classList.add('hidden');
    UI.renderExamQuestion(AppState.session, StorageManager.getActiveProfile());
  });

  document.getElementById('vue-btn-finish-now')?.addEventListener('click', () => {
    UI.renderReviewModal(AppState.session);
  });

  document.getElementById('btn-confirm-finish-exam')?.addEventListener('click', () => {
    finalizeExamSession();
  });

  document.getElementById('vue-btn-abort')?.addEventListener('click', () => {
    if (confirm('¿Deseas abandonar el test actual y regresar al Dashboard?')) {
      stopSessionTimer();
      AppState.session.active = false;
      UI.showView('dashboard');
      refreshDashboard();
    }
  });

  // 4. "📚 Saber más" Theory & Live MS Learn Drawer Events
  document.body.addEventListener('click', (e) => {
    const openTheoryBtn = e.target.closest('[data-open-theory]');
    if (openTheoryBtn) {
      e.stopPropagation();
      const qId = openTheoryBtn.getAttribute('data-open-theory');
      const q =
        AppState.allQuestions.find((item) => item.id === qId) ||
        AppState.session.questions.find((item) => item.id === qId);
      if (q) {
        UI.openTheoryDrawer(q);
      }
      return;
    }

    if (e.target.id === 'btn-close-theory-drawer' || e.target.id === 'drawer-learn-more') {
      document.getElementById('drawer-learn-more')?.classList.add('hidden');
      return;
    }

    if (e.target.id === 'btn-mcp-live-docs') {
      const qVal = document.getElementById('mcp-live-query-input')?.value.trim();
      if (qVal) queryLiveMsLearnMcp('search', qVal);
      return;
    }

    if (e.target.id === 'btn-mcp-live-code') {
      const qVal = document.getElementById('mcp-live-query-input')?.value.trim();
      if (qVal) queryLiveMsLearnMcp('code', qVal);
      return;
    }
  });

  // 5. Results & Review Screen Events
  document.querySelectorAll('.review-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      AppState.reviewFilter = tab.getAttribute('data-review-filter') || 'ALL';
      if (AppState.lastResult) {
        UI.renderResultsView(AppState.lastResult, AppState.reviewFilter);
      }
    });
  });

  document.getElementById('results-review-accordion')?.addEventListener('click', (e) => {
    if (e.target.closest('[data-open-theory]')) return;
    const header = e.target.closest('[data-toggle-review]');
    if (!header) return;
    const qId = header.getAttribute('data-toggle-review');
    const body = document.getElementById(`review-body-${qId}`);
    if (body) {
      body.classList.toggle('hidden');
    }
  });

  document.getElementById('btn-expand-all-review')?.addEventListener('click', () => {
    document.querySelectorAll('#results-review-accordion .review-item-body').forEach((el) => {
      el.classList.remove('hidden');
    });
  });

  document.getElementById('btn-repeat-attempt-failed')?.addEventListener('click', () => {
    if (!AppState.lastResult) return;
    const failedIds = AppState.lastResult.questionDetails
      .filter((d) => !d.isCorrect)
      .map((d) => d.questionId);
    const pool = AppState.allQuestions.filter((q) => failedIds.includes(q.id));
    startSessionWithPool(pool, 'study', 'failed', AppState.lastResult.certification);
  });

  document.getElementById('btn-results-open-cheatsheet')?.addEventListener('click', () => {
    if (AppState.lastResult && AppState.lastResult.certification) {
      AppState.cheatsheet.certification = AppState.lastResult.certification;
      AppState.cheatsheet.selectedDomain = 'ALL';
    }
    openCheatSheet();
  });

  document.getElementById('btn-back-dashboard')?.addEventListener('click', () => {
    UI.showView('dashboard');
    refreshDashboard();
  });

  // 6. "⚡ Hoja de Trucos & Repaso 24h" (Cheat Sheet) Events
  function openCheatSheet() {
    UI.showView('cheatsheet');
    UI.renderCheatSheet(
      AppState.allQuestions,
      AppState.cheatsheet,
      StorageManager.getActiveProfile()
    );
  }

  document.getElementById('btn-header-cheatsheet')?.addEventListener('click', () => {
    openCheatSheet();
  });

  document.getElementById('btn-dashboard-cheatsheet')?.addEventListener('click', () => {
    const activeProfile = StorageManager.getActiveProfile();
    if (activeProfile && activeProfile.targetCert && AppState.cheatsheet.certification === 'ALL') {
      AppState.cheatsheet.certification = activeProfile.targetCert;
      AppState.cheatsheet.selectedDomain = 'ALL';
    }
    openCheatSheet();
  });

  document.getElementById('btn-cheatsheet-back')?.addEventListener('click', () => {
    UI.showView('dashboard');
    refreshDashboard();
  });

  document.querySelectorAll('#cheatsheet-cert-pills [data-cs-cert]').forEach((btn) => {
    btn.addEventListener('click', () => {
      AppState.cheatsheet.certification = btn.getAttribute('data-cs-cert') || 'ALL';
      AppState.cheatsheet.selectedDomain = 'ALL';
      UI.renderCheatSheet(
        AppState.allQuestions,
        AppState.cheatsheet,
        StorageManager.getActiveProfile()
      );
    });
  });

  let cheatSearchTimer = null;
  document.getElementById('input-cheatsheet-search')?.addEventListener('input', (e) => {
    clearTimeout(cheatSearchTimer);
    cheatSearchTimer = setTimeout(() => {
      AppState.cheatsheet.searchQuery = e.target.value;
      UI.renderCheatSheet(
        AppState.allQuestions,
        AppState.cheatsheet,
        StorageManager.getActiveProfile()
      );
    }, 120);
  });

  document.getElementById('btn-cheatsheet-clear-search')?.addEventListener('click', () => {
    AppState.cheatsheet.searchQuery = '';
    const input = document.getElementById('input-cheatsheet-search');
    if (input) input.value = '';
    UI.renderCheatSheet(
      AppState.allQuestions,
      AppState.cheatsheet,
      StorageManager.getActiveProfile()
    );
  });

  document.getElementById('select-cheatsheet-domain')?.addEventListener('change', (e) => {
    AppState.cheatsheet.selectedDomain = e.target.value;
    UI.renderCheatSheet(
      AppState.allQuestions,
      AppState.cheatsheet,
      StorageManager.getActiveProfile()
    );
  });

  document.getElementById('check-cheatsheet-only-traps')?.addEventListener('change', (e) => {
    AppState.cheatsheet.onlyTraps = e.target.checked;
    UI.renderCheatSheet(
      AppState.allQuestions,
      AppState.cheatsheet,
      StorageManager.getActiveProfile()
    );
  });

  document.getElementById('check-cheatsheet-only-favs')?.addEventListener('change', (e) => {
    AppState.cheatsheet.onlyFavs = e.target.checked;
    UI.renderCheatSheet(
      AppState.allQuestions,
      AppState.cheatsheet,
      StorageManager.getActiveProfile()
    );
  });

  document.getElementById('btn-cheatsheet-reset-filters')?.addEventListener('click', () => {
    AppState.cheatsheet.certification = 'ALL';
    AppState.cheatsheet.searchQuery = '';
    AppState.cheatsheet.selectedDomain = 'ALL';
    AppState.cheatsheet.onlyTraps = false;
    AppState.cheatsheet.onlyFavs = false;
    UI.renderCheatSheet(
      AppState.allQuestions,
      AppState.cheatsheet,
      StorageManager.getActiveProfile()
    );
  });

  document.getElementById('btn-cheatsheet-toggle-all')?.addEventListener('click', () => {
    AppState.cheatsheet.expandedAll = !AppState.cheatsheet.expandedAll;
    document.querySelectorAll('.cheatsheet-card').forEach((card) => {
      card.classList.toggle('collapsed', !AppState.cheatsheet.expandedAll);
    });
  });

  document.getElementById('cheatsheet-cards-grid')?.addEventListener('click', (e) => {
    const bookmarkBtn = e.target.closest('[data-cs-bookmark]');
    if (!bookmarkBtn) return;
    const qId = bookmarkBtn.getAttribute('data-cs-bookmark');
    const isNowBookmarked = StorageManager.toggleBookmark(qId);
    bookmarkBtn.classList.toggle('active', isNowBookmarked);
    bookmarkBtn.textContent = isNowBookmarked ? '⭐' : '☆';
    bookmarkBtn.title = isNowBookmarked
      ? 'Quitar de preguntas favoritas'
      : 'Marcar como favorita';
  });
}

async function initApp() {
  // 1. Apply persisted Dark/Light theme
  UI.applyTheme(StorageManager.getTheme());

  // 2. Bind all UI events
  bindEvents();

  // 3. Show Initial Login / Profile Selection Screen
  UI.showView('login');
  refreshLoginScreen();

  // 4. Load 100-question modular repository
  try {
    await loadQuestionsRepository();
  } catch (err) {
    console.error('Error inicializando el repositorio de preguntas:', err);
  }

  // 5. Register PWA Service Worker for Offline Exam Support
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch((err) => {
      console.warn('Service Worker registration skipped:', err);
    });
  }

  // 6. Handle Native PWA Installation Prompt
  let deferredInstallPrompt = null;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    const installBtn = document.getElementById('btn-pwa-install');
    if (installBtn) installBtn.classList.remove('hidden');
  });

  document.getElementById('btn-pwa-install')?.addEventListener('click', async () => {
    if (deferredInstallPrompt) {
      deferredInstallPrompt.prompt();
      const choice = await deferredInstallPrompt.userChoice;
      if (choice && choice.outcome === 'accepted') {
        document.getElementById('btn-pwa-install')?.classList.add('hidden');
      }
      deferredInstallPrompt = null;
    } else {
      alert(
        'Para instalar MS Student Platform como app en tu teléfono:\n\n' +
        '• En Android (Chrome/Edge): Pulsa los tres puntos del navegador (⋮) y selecciona "Instalar aplicación" o "Añadir a pantalla principal".\n\n' +
        '• En iPhone/iPad (Safari): Pulsa el botón Compartir (el icono ⬆) y selecciona "Añadir a pantalla de inicio".\n\n' +
        'Una vez instalada, funcionará sin conexión a internet como una app nativa.'
      );
    }
  });

  window.addEventListener('appinstalled', () => {
    document.getElementById('btn-pwa-install')?.classList.add('hidden');
    deferredInstallPrompt = null;
  });
}

document.addEventListener('DOMContentLoaded', initApp);
