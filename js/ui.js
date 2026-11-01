/**
 * ui.js — DOM Renderer for MS Student Platform (v3: Login Screen, Theme Toggle, Study Plan Roadmap, Pearson VUE)
 */

import { CERT_BADGE_SVGS, TOPIC_ICON_METADATA, getTopicMeta } from './icons.js';

export function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function formatTimeMMSS(totalSeconds) {
  const sec = Math.max(0, Math.floor(totalSeconds));
  const hrs = Math.floor(sec / 3600);
  const mins = Math.floor((sec % 3600) / 60);
  const remSec = sec % 60;
  if (hrs > 0) {
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(remSec).padStart(2, '0')}`;
  }
  return `${String(mins).padStart(2, '0')}:${String(remSec).padStart(2, '0')}`;
}

export function getReportIssueUrl(qId, cert, domain = '') {
  const repo = 'https://github.com/joangranell/MS-Student-Platform/issues/new';
  const title = `[Reporte de error] Pregunta ${qId} (${cert})`;
  const body = `### Pregunta ID: ${qId}
### Certificación: ${cert}
### Dominio: ${domain}
### Versión del catálogo: 3.1.0

**Descripción del error:**
(Por favor, indica qué parte consideras incorrecta o confusa: enunciado, opciones, justificación técnica o enlace roto)`;
  return `${repo}?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
}

export function getReportTheoryPillUrl(pillTitle, cert) {
  const repo = 'https://github.com/joangranell/MS-Student-Platform/issues/new';
  const title = `[Reporte de error] Ficha teórica: ${pillTitle} (${cert})`;
  const body = `### Ficha Teórica: ${pillTitle}
### Certificación: ${cert}
### Versión del catálogo: 3.1.0

**Descripción del error:**
(Por favor, indica qué concepto, trampa de examen o resumen requiere corrección)`;
  return `${repo}?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
}

const SUBMODE_LABELS = {
  adaptive: 'Repetición Adaptativa Inteligente (Prioriza Fallos y Temas Débiles)',
  all_study: 'Estudio General (Todos los niveles)',
  basic: 'Lo Básico (Fundamentos y Conceptos)',
  hardcore: 'Lo Más Difícil (Arquitectura, Código y Casos)',
  domain: 'Por Dominio Temático (Skills Measured)',
  topic: 'Por Tecnología / Tema de MS Learn',
  code: 'Preguntas de código (SQL / DAX / KQL / PySpark)',
  failed: 'Clínica de Fallos (Preguntas Falladas)'
};

const DIFF_LABELS = {
  basic: 'Nivel Básico',
  intermediate: 'Nivel Intermedio',
  hardcore: 'Nivel Examen Real / Hardcore'
};

const CERT_DESCRIPTIONS = {
  'AZ-900': {
    title: 'Microsoft Azure Fundamentals',
    role: 'Fundamentos de Cloud Computing, Arquitectura, Servicios y Gobernanza en Azure',
    focus: 'Cloud Concepts (IaaS/PaaS/SaaS), Compute, Networking, Storage, Entra ID, Cost Management, Policy y Monitor.'
  },
  'DP-900': {
    title: 'Microsoft Azure Data Fundamentals',
    role: 'Fundamentos de Datos Relacionales, NoSQL y Analítica en Azure',
    focus: 'ACID/OLTP, Azure SQL, Cosmos DB, Azure Storage y conceptos de Analytics.'
  },
  'DP-600': {
    title: 'Implementing Analytics Solutions Using Microsoft Fabric',
    role: 'Fabric Analytics Engineer Associate',
    focus: 'Lakehouses, Data Warehouses, Modelos Semánticos Direct Lake, DAX, XMLA y Gobernanza.'
  },
  'DP-700': {
    title: 'Implementing Data Engineering Solutions Using Microsoft Fabric',
    role: 'Fabric Data Engineer Associate',
    focus: 'Ingesta Batch/Streaming, Eventstreams, Eventhouse (KQL), PySpark, Delta Lake y Optimización.'
  }
};

export const UI = {
  /**
   * Applies Dark or Light mode to <html> and updates the toggle button
   */
  applyTheme(theme) {
    const htmlEl = document.documentElement;
    if (theme === 'light') {
      htmlEl.classList.remove('dark');
      htmlEl.classList.add('light');
    } else {
      htmlEl.classList.remove('light');
      htmlEl.classList.add('dark');
    }

    const btn = document.getElementById('btn-theme-toggle');
    if (btn) {
      btn.innerHTML =
        theme === 'light'
          ? '🌙 <span>Modo Oscuro</span>'
          : '☀️ <span>Modo Claro</span>';
    }
  },

  /**
   * Switches between the primary SPA views: 'login' | 'dashboard' | 'exam' | 'results' | 'cheatsheet'
   */
  showView(viewName) {
    const views = {
      login: document.getElementById('view-login'),
      dashboard: document.getElementById('view-dashboard'),
      exam: document.getElementById('view-exam'),
      results: document.getElementById('view-results'),
      cheatsheet: document.getElementById('view-cheatsheet')
    };

    Object.entries(views).forEach(([key, el]) => {
      if (!el) return;
      if (key === viewName) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    });

    // Show/hide top header profile switcher based on whether user is on login view
    const profileTrigger = document.getElementById('btn-open-profiles');
    if (profileTrigger) {
      profileTrigger.classList.toggle('hidden', viewName === 'login');
    }

    // Show/hide top header Cheat Sheet button (hidden during active Pearson VUE exam and login)
    const headerCheatBtn = document.getElementById('btn-header-cheatsheet');
    if (headerCheatBtn) {
      headerCheatBtn.classList.toggle('hidden', viewName === 'login' || viewName === 'exam');
      headerCheatBtn.classList.toggle('active', viewName === 'cheatsheet');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  /**
   * Renders the Start / Login Screen (#view-login) with Profile Selector, Create Profile, and "Ver perfiles" Manager
   */
  renderLoginScreen(profiles, manageMode = false) {
    const listContainer = document.getElementById('login-profiles-list');
    const toggleManageBtn = document.getElementById('btn-toggle-manage-profiles');
    if (!listContainer) return;

    if (toggleManageBtn) {
      toggleManageBtn.textContent = manageMode
        ? '✓ Volver a Selección de Perfil'
        : '🛠️ Ver perfiles (Renombrar / Eliminar)';
      toggleManageBtn.className = manageMode ? 'btn btn-primary btn-sm' : 'btn btn-secondary btn-sm';
    }

    listContainer.innerHTML = profiles
      .map((p) => {
        const attempts = (p.history || []).length;
        const mastered = (p.masteredIds || []).length;
        const planTag = p.hasConfiguredPlan
          ? `Plan activo: ${p.targetCert}`
          : `Sin plan aún (${p.targetCert})`;

        if (manageMode) {
          return `
            <div class="login-profile-card" style="cursor:default;">
              <div class="login-edit-row">
                <span class="avatar-circle" style="background-color:${escapeHtml(p.color || '#0078d4')}">
                  ${escapeHtml(p.avatar)}
                </span>
                <input
                  type="text"
                  class="form-input"
                  style="flex:1; min-width:140px;"
                  value="${escapeHtml(p.name)}"
                  data-rename-input="${escapeHtml(p.id)}"
                  maxlength="32"
                />
                <select class="form-select" style="width:auto;" data-cert-input="${escapeHtml(p.id)}">
                  <option value="AZ-900" ${p.targetCert === 'AZ-900' ? 'selected' : ''}>AZ-900</option>
                  <option value="DP-900" ${p.targetCert === 'DP-900' ? 'selected' : ''}>DP-900</option>
                  <option value="DP-600" ${p.targetCert === 'DP-600' ? 'selected' : ''}>DP-600</option>
                  <option value="DP-700" ${p.targetCert === 'DP-700' ? 'selected' : ''}>DP-700</option>
                </select>
                <button type="button" class="btn btn-primary btn-sm" data-save-profile="${escapeHtml(p.id)}">
                  💾 Guardar
                </button>
                ${
                  profiles.length > 1
                    ? `<button type="button" class="btn btn-danger-outline btn-sm" data-login-delete-profile="${escapeHtml(p.id)}" title="Eliminar este perfil">
                         🗑️ Eliminar
                       </button>`
                    : ''
                }
              </div>
            </div>
          `;
        }

        return `
          <div class="login-profile-card" data-login-profile="${escapeHtml(p.id)}">
            <div class="login-profile-left">
              <span class="avatar-circle lg" style="background-color:${escapeHtml(p.color || '#0078d4')}">
                ${escapeHtml(p.avatar)}
              </span>
              <div>
                <div style="font-size:1.02rem; font-weight:700; color:var(--text-primary);">
                  ${escapeHtml(p.name)}
                </div>
                <div style="font-size:0.8rem; color:var(--text-secondary); margin-top:0.15rem;">
                  🎯 <strong>${escapeHtml(planTag)}</strong> • ${attempts} tests • ${mastered} dominadas
                </div>
              </div>
            </div>
            <span class="btn btn-primary btn-sm">Entrar →</span>
          </div>
        `;
      })
      .join('');
  },

  /**
   * Opens the Target Certification & Study Plan Onboarding Modal when a profile logs in
   */
  openTargetCertModal(profile) {
    const modal = document.getElementById('modal-target-cert');
    const nameSpan = document.getElementById('onboarding-profile-name');
    const cardsContainer = document.getElementById('onboarding-cert-cards');
    if (!modal || !cardsContainer) return;

    if (nameSpan) nameSpan.textContent = profile.name;

    const currentTarget = profile.targetCert || 'DP-600';

    cardsContainer.innerHTML = ['AZ-900', 'DP-900', 'DP-600', 'DP-700']
      .map((code) => {
        const info = CERT_DESCRIPTIONS[code];
        const isSelected = currentTarget === code;
        return `
          <div class="cert-card ${isSelected ? 'selected' : ''}" data-select-onboarding-cert="${code}">
            <div class="cert-card-header-with-logo">
              <div class="cert-shield-wrap">${CERT_BADGE_SVGS[code]}</div>
              <div>
                <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.2rem;">
                  <span class="cert-code-badge ${code.toLowerCase().replace('-', '')}">${code}</span>
                  <span style="font-size:0.75rem; color:var(--text-secondary);">${escapeHtml(info.role)}</span>
                </div>
                <div class="cert-title">${escapeHtml(info.title)}</div>
                <div class="cert-desc" style="margin-top:0.25rem;">${escapeHtml(info.focus)}</div>
              </div>
            </div>
          </div>
        `;
      })
      .join('');

    modal.setAttribute('data-selected-cert', currentTarget);
    modal.classList.remove('hidden');
  },

  renderHeaderProfile(profile) {
    const avatarEl = document.getElementById('header-profile-avatar');
    const nameEl = document.getElementById('header-profile-name');
    const roleEl = document.getElementById('header-profile-role');

    if (avatarEl) {
      avatarEl.textContent = profile.avatar || 'MS';
      avatarEl.style.backgroundColor = profile.color || '#0078d4';
    }
    if (nameEl) nameEl.textContent = profile.name;
    if (roleEl) roleEl.textContent = `Plan: ${profile.targetCert || 'DP-600'} (Cambiar perfil)`;
  },

  /**
   * Renders the Personalized 4-Phase Study Plan Roadmap on the Dashboard
   */
  renderStudyPlanRoadmap(state, activeProfile) {
    const container = document.getElementById('study-plan-container');
    if (!container) return;

    const targetCert = activeProfile.targetCert || 'DP-600';
    const certInfo = CERT_DESCRIPTIONS[targetCert] || CERT_DESCRIPTIONS['DP-600'];
    const certQuestions = state.allQuestions.filter((q) => q.certification === targetCert);
    const masteredSet = new Set(activeProfile.masteredIds || []);
    const masteryMap = activeProfile.questionMastery || {};

    // Calculate phase metrics for the profile's target certification
    const basicPool = certQuestions.filter((q) => q.difficulty === 'basic');
    const basicDone = basicPool.filter((q) => masteredSet.has(q.id) || (masteryMap[q.id]?.totalHits > 0)).length;
    const basicPct = basicPool.length > 0 ? Math.round((basicDone / basicPool.length) * 100) : 0;

    const interPool = certQuestions.filter((q) => q.difficulty === 'intermediate');
    const interDone = interPool.filter((q) => masteredSet.has(q.id) || (masteryMap[q.id]?.totalHits > 0)).length;
    const interPct = interPool.length > 0 ? Math.round((interDone / interPool.length) * 100) : 0;

    const hardPool = certQuestions.filter((q) => q.difficulty === 'hardcore' || q.hasCodeSnippet);
    const hardDone = hardPool.filter((q) => masteredSet.has(q.id) || (masteryMap[q.id]?.totalHits > 0)).length;
    const hardPct = hardPool.length > 0 ? Math.round((hardDone / hardPool.length) * 100) : 0;

    const certExams = (activeProfile.history || []).filter(
      (h) => h.certification === targetCert && h.mode === 'exam'
    );
    const bestExamScore =
      certExams.length > 0 ? Math.max(...certExams.map((e) => e.scaledScore || 0)) : 0;
    const examPct = Math.min(100, Math.round((bestExamScore / 700) * 100));

    const overallAnswered = certQuestions.filter((q) => masteryMap[q.id]?.totalHits > 0).length;
    const overallPct =
      certQuestions.length > 0 ? Math.round((overallAnswered / certQuestions.length) * 100) : 0;

    container.innerHTML = `
      <div class="study-plan-card">
        <div class="study-plan-top">
          <div style="display:flex; align-items:center; gap:0.9rem;">
            <div class="cert-shield-wrap">${CERT_BADGE_SVGS[targetCert] || ''}</div>
            <div>
              <div style="display:flex; align-items:center; gap:0.55rem; flex-wrap:wrap;">
                <span class="badge">🎯 Plan de Estudio Personalizado</span>
                <span style="font-size:0.8rem; color:var(--text-secondary);">
                  Progreso Global en ${escapeHtml(targetCert)}: <strong>${overallPct}% (${overallAnswered}/${certQuestions.length} preguntas superadas)</strong>
                </span>
              </div>
              <h2 style="font-size:1.18rem; margin-top:0.25rem; color:var(--text-primary);">
                Ruta de Estudio hacia ${escapeHtml(targetCert)}: ${escapeHtml(certInfo.title)}
              </h2>
            </div>
          </div>

          <button type="button" class="btn btn-secondary btn-sm" id="btn-change-target-cert">
            🎯 Cambiar Certificado Objetivo
          </button>
        </div>

        <div class="study-phases-grid">
          <!-- Fase 1 -->
          <div class="study-phase-box ${basicPct >= 80 ? 'completed-phase' : ''}">
            <div>
              <span class="study-phase-num">Fase 1 • Cimientos</span>
              <div class="study-phase-title">🟢 Fundamentos y Conceptos</div>
              <p class="study-phase-desc">
                Domina la arquitectura base y definiciones clave de ${escapeHtml(targetCert)} (${basicDone}/${basicPool.length} superadas).
              </p>
            </div>
            <div>
              <div class="progress-track" style="margin-bottom:0.55rem;">
                <div class="progress-fill" style="width:${basicPct}%;"></div>
              </div>
              <button type="button" class="heatmap-drill-btn" data-launch-plan-phase="basic">
                ▶ Entrenar Fase 1 (${basicPct}%)
              </button>
            </div>
          </div>

          <!-- Fase 2 -->
          <div class="study-phase-box ${interPct >= 80 ? 'completed-phase' : ''}">
            <div>
              <span class="study-phase-num">Fase 2 • consolidación</span>
              <div class="study-phase-title">🔄 Estudio Adaptativo por Dominios</div>
              <p class="study-phase-desc">
                Repetición inteligente centrada en tus bloques más flojos (${interDone}/${interPool.length} intermedias).
              </p>
            </div>
            <div>
              <div class="progress-track" style="margin-bottom:0.55rem;">
                <div class="progress-fill" style="width:${interPct}%;"></div>
              </div>
              <button type="button" class="heatmap-drill-btn" data-launch-plan-phase="adaptive">
                ▶ Entrenar Fase 2 (${interPct}%)
              </button>
            </div>
          </div>

          <!-- Fase 3 -->
          <div class="study-phase-box ${hardPct >= 80 ? 'completed-phase' : ''}">
            <div>
              <span class="study-phase-num">Fase 3 • Nivel Experto</span>
              <div class="study-phase-title">🔴 Casos de Estudio y Código</div>
              <p class="study-phase-desc">
                Escenarios complejos, pestañas Pearson VUE y sintaxis técnica (${hardDone}/${hardPool.length} avanzadas).
              </p>
            </div>
            <div>
              <div class="progress-track" style="margin-bottom:0.55rem;">
                <div class="progress-fill" style="width:${hardPct}%;"></div>
              </div>
              <button type="button" class="heatmap-drill-btn" data-launch-plan-phase="hardcore">
                ▶ Entrenar Fase 3 (${hardPct}%)
              </button>
            </div>
          </div>

          <!-- Fase 4 -->
          <div class="study-phase-box ${bestExamScore >= 700 ? 'completed-phase' : ''}">
            <div>
              <span class="study-phase-num">Fase 4 • Validación Final</span>
              <div class="study-phase-title">🏛️ Simulacro Modo Examen</div>
              <p class="study-phase-desc">
                Examen cronometrado sin ayudas. Mejor marca actual: <strong>${bestExamScore > 0 ? `${bestExamScore}/1000 pts` : 'Sin intentos'}</strong> (Meta: 700).
              </p>
            </div>
            <div>
              <div class="progress-track" style="margin-bottom:0.55rem;">
                <div class="progress-fill" style="width:${examPct}%; background-color:${bestExamScore >= 700 ? 'var(--success)' : 'var(--ms-blue)'};"></div>
              </div>
              <button type="button" class="heatmap-drill-btn" data-launch-plan-phase="exam">
                ▶ Lanzar Simulacro ${escapeHtml(targetCert)}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderDashboard(state, activeProfile, eligibleQuestions) {
    this.renderHeaderProfile(activeProfile);
    this.renderStudyPlanRoadmap(state, activeProfile);

    // 1. Hero KPIs — strictly focused on the student's target certification
    const targetCert = activeProfile.targetCert || 'DP-600';
    const targetCertQuestions = state.allQuestions.filter((q) => q.certification === targetCert);
    const targetCertQIds = new Set(targetCertQuestions.map((q) => q.id));

    const certHistory = (activeProfile.history || []).filter((h) => h.certification === targetCert);
    const totalAttempts = certHistory.length;
    const passedAttempts = certHistory.filter((h) => h.passed).length;
    const avgScore =
      totalAttempts > 0
        ? Math.round(certHistory.reduce((acc, h) => acc + (h.scaledScore || 0), 0) / totalAttempts)
        : 0;
    const failedCount = (activeProfile.failedQuestionIds || []).filter((id) => targetCertQIds.has(id)).length;
    const masteredCount = (activeProfile.masteredIds || []).filter((id) => targetCertQIds.has(id)).length;

    const welcomeName = document.getElementById('hero-profile-name');
    if (welcomeName) welcomeName.textContent = activeProfile.name;

    const kpiAttempts = document.getElementById('kpi-attempts');
    const kpiAvgScore = document.getElementById('kpi-avg-score');
    const kpiPassRate = document.getElementById('kpi-pass-rate');
    const kpiFailedBank = document.getElementById('kpi-failed-bank');
    const kpiMasteredBank = document.getElementById('kpi-mastered-bank');

    if (kpiAttempts) kpiAttempts.textContent = String(totalAttempts);
    if (kpiAvgScore) kpiAvgScore.textContent = totalAttempts > 0 ? `${avgScore} / 1000` : '—';
    if (kpiPassRate) {
      kpiPassRate.textContent =
        totalAttempts > 0 ? `${Math.round((passedAttempts / totalAttempts) * 100)}%` : '—';
    }
    if (kpiFailedBank) kpiFailedBank.textContent = String(failedCount);
    if (kpiMasteredBank) kpiMasteredBank.textContent = String(masteredCount);

    // 2. Certification Cards + Official Shield Logos + Metadata
    const certCounts = {
      'AZ-900': state.allQuestions.filter((q) => q.certification === 'AZ-900').length,
      'DP-900': state.allQuestions.filter((q) => q.certification === 'DP-900').length,
      'DP-600': state.allQuestions.filter((q) => q.certification === 'DP-600').length,
      'DP-700': state.allQuestions.filter((q) => q.certification === 'DP-700').length
    };

    document.querySelectorAll('#view-dashboard .cert-card').forEach((card) => {
      const certCode = card.getAttribute('data-cert');
      card.classList.toggle('selected', certCode === state.config.certification);

      const countSpan = card.querySelector('.cert-q-count');
      if (countSpan && certCounts[certCode] !== undefined) {
        const isTarget = certCode === targetCert;
        countSpan.innerHTML = isTarget
          ? `<strong style="color:var(--ms-blue-light);">${certCounts[certCode]} preg. (🎯 Tu Objetivo)</strong>`
          : `${certCounts[certCode]} preguntas`;
      }

      const shieldSlot = card.querySelector('.cert-shield-wrap');
      if (shieldSlot && CERT_BADGE_SVGS[certCode] && !shieldSlot.innerHTML.trim()) {
        shieldSlot.innerHTML = CERT_BADGE_SVGS[certCode];
      }

      const meta = state.catalogMeta?.certificationMetadata?.[certCode] || {
        idioma: 'es (Español)',
        skillsOutlineVersion: 'Guía 2025/2026',
        lastReviewed: '2026-11-01'
      };

      let metaBadges = card.querySelector('.cert-meta-badges');
      if (!metaBadges) {
        metaBadges = document.createElement('div');
        metaBadges.className = 'cert-meta-badges';
        card.querySelector('.cert-card-header-with-logo > div')?.appendChild(metaBadges);
      }
      if (metaBadges) {
        metaBadges.innerHTML = `
          <span class="cert-meta-tag">🌐 ${escapeHtml(meta.idioma || 'es')}</span>
          <span class="cert-meta-tag">📅 ${escapeHtml(meta.skillsOutlineVersion || '2025/2026')}</span>
          <span class="cert-meta-tag">✓ Rev: ${escapeHtml(meta.lastReviewed || '2026-11-01')}</span>
        `;
      }
    });

    // 3. Mode Switch (Exam vs Study)
    document.querySelectorAll('.mode-box').forEach((box) => {
      const m = box.getAttribute('data-mode');
      box.classList.toggle('selected', m === state.config.mode);
    });

    const submodesWrap = document.getElementById('study-submodes-wrap');
    if (submodesWrap) {
      submodesWrap.classList.toggle('hidden', state.config.mode !== 'study');
    }

    // 4. Study Sub-modes
    document.querySelectorAll('.submode-item').forEach((item) => {
      const sm = item.getAttribute('data-submode');
      item.classList.toggle('selected', sm === state.config.subMode);
    });

    // 5. Domain Selector (when subMode === 'domain')
    const domainWrap = document.getElementById('domain-select-wrap');
    const domainSelect = document.getElementById('domain-select');
    if (domainWrap && domainSelect) {
      const showDomain = state.config.mode === 'study' && state.config.subMode === 'domain';
      domainWrap.classList.toggle('hidden', !showDomain);

      if (showDomain) {
        const relevantQuestions = state.allQuestions.filter((q) => q.certification === state.config.certification);

        const uniqueDomains = [...new Set(relevantQuestions.map((q) => q.domain))];
        domainSelect.innerHTML = `<option value="ALL">Todos los dominios (${relevantQuestions.length} preg.)</option>`;
        uniqueDomains.forEach((dom) => {
          const c = relevantQuestions.filter((q) => q.domain === dom).length;
          const selectedAttr = state.config.selectedDomain === dom ? 'selected' : '';
          domainSelect.innerHTML += `<option value="${escapeHtml(dom)}" ${selectedAttr}>${escapeHtml(dom)} (${c} preg.)</option>`;
        });
      }
    }

    // 6. Question Count Pills
    document.querySelectorAll('.count-pill').forEach((pill) => {
      const val = pill.getAttribute('data-count');
      pill.classList.toggle('selected', String(state.config.questionCount) === String(val));
    });

    // 7. Eligible questions counter & Start button
    const matchCountEl = document.getElementById('eligible-questions-count');
    if (matchCountEl) {
      matchCountEl.textContent = String(eligibleQuestions.length);
    }

    const startBtn = document.getElementById('btn-start-session');
    if (startBtn) {
      startBtn.disabled = eligibleQuestions.length === 0;
      startBtn.textContent =
        state.config.mode === 'exam'
          ? '🚀 Iniciar Modo Examen'
          : state.config.subMode === 'adaptive'
          ? '🧠 Iniciar Repaso Inteligente'
          : '📘 Iniciar Sesión en Modo Estudio';
    }

    // 8. Failed Questions Clinic Widget
    const failedBadge = document.getElementById('failed-clinic-count');
    const btnFailedQuick = document.getElementById('btn-launch-failed-test');
    if (failedBadge) failedBadge.textContent = `${failedCount} por consolidar`;
    if (btnFailedQuick) {
      btnFailedQuick.disabled = failedCount === 0;
    }

    // 9. Knowledge Heatmap by MS Learn Technology Icon
    this.renderKnowledgeHeatmap(state, activeProfile);

    // 10. Domain Mastery Progress Bars
    this.renderDomainMastery(activeProfile, state.config.certification);

    // 11. History List
    this.renderHistoryList(activeProfile);
  },

  renderKnowledgeHeatmap(state, activeProfile) {
    const grid = document.getElementById('knowledge-heatmap-grid');
    if (!grid) return;

    const relevantPool =
      state.config.certification === 'ALL'
        ? state.allQuestions
        : state.allQuestions.filter((q) => q.certification === state.config.certification);

    const topicStats = activeProfile.topicStats || {};

    const cardsHtml = Object.entries(TOPIC_ICON_METADATA)
      .map(([iconKey, meta]) => {
        const poolCount = relevantPool.filter((q) => (q.topicIcon || 'fabric') === iconKey).length;
        if (poolCount === 0) return '';

        const stat = topicStats[iconKey] || { hit: 0, total: 0, fails: 0 };
        const pct = stat.total > 0 ? Math.round((stat.hit / stat.total) * 100) : null;

        let cardStatusClass = '';
        let barColor = 'var(--ms-blue)';
        let statusText = 'Sin evaluar aún';

        if (pct !== null) {
          if (pct < 70) {
            cardStatusClass = 'weak-spot';
            barColor = 'var(--danger)';
            statusText = `⚠ Punto débil (${pct}%)`;
          } else {
            cardStatusClass = 'strong-spot';
            barColor = 'var(--success)';
            statusText = `✓ Dominado (${pct}%)`;
          }
        }

        return `
          <div class="heatmap-card ${cardStatusClass}">
            <div class="heatmap-top">
              <span class="topic-icon-box">${meta.svg}</span>
              <div>
                <div class="heatmap-title">${escapeHtml(meta.label)}</div>
                <div style="font-size:0.71rem; color:var(--text-secondary);">${poolCount} preguntas en banco</div>
              </div>
            </div>
            <div class="heatmap-stats-row">
              <span>${statusText}</span>
              <span>${stat.hit}/${stat.total} aciertos</span>
            </div>
            <div class="progress-track">
              <div class="progress-fill" style="width:${pct !== null ? pct : 0}%; background-color:${barColor};"></div>
            </div>
            <button type="button" class="heatmap-drill-btn" data-drill-topic="${escapeHtml(iconKey)}">
              ⚡ Entrenar este tema (${poolCount})
            </button>
          </div>
        `;
      })
      .filter(Boolean)
      .join('');

    grid.innerHTML =
      cardsHtml ||
      `<p style="font-size:0.84rem; color:var(--text-secondary);">Cargando mapa de tecnologías...</p>`;
  },

  renderDomainMastery(activeProfile, selectedCert) {
    const container = document.getElementById('domain-mastery-list');
    if (!container) return;

    const statsObj = activeProfile.domainStats || {};
    let entries = Object.values(statsObj);

    if (selectedCert && selectedCert !== 'ALL') {
      entries = entries.filter((e) => e.certification === selectedCert);
    }

    if (entries.length === 0) {
      container.innerHTML = `
        <p style="font-size: 0.84rem; color: var(--text-secondary);">
          Completa tu primer test para visualizar tu porcentaje de dominio por cada bloque temático (Skills Measured) de Microsoft.
        </p>
      `;
      return;
    }

    container.innerHTML = entries
      .map((item) => {
        const pct = item.total > 0 ? Math.round((item.hit / item.total) * 100) : 0;
        const barColor =
          pct >= 70 ? 'var(--success)' : pct >= 50 ? 'var(--warning)' : 'var(--danger)';
        return `
          <div class="domain-progress-item">
            <div class="domain-progress-header">
              <span><strong>[${escapeHtml(item.certification)}]</strong> ${escapeHtml(item.domain)}</span>
              <span style="font-weight:700;">${pct}% (${item.hit}/${item.total})</span>
            </div>
            <div class="progress-track">
              <div class="progress-fill" style="width:${pct}%; background-color:${barColor};"></div>
            </div>
          </div>
        `;
      })
      .join('');
  },

  renderHistoryList(activeProfile) {
    const container = document.getElementById('history-list-container');
    if (!container) return;

    const history = activeProfile.history || [];
    if (history.length === 0) {
      container.innerHTML = `
        <p style="font-size: 0.84rem; color: var(--text-secondary);">
          Aún no hay simulaciones registradas para el perfil <strong>${escapeHtml(activeProfile.name)}</strong>.
        </p>
      `;
      return;
    }

    container.innerHTML = history
      .slice(0, 12)
      .map((h) => {
        const dateStr = new Date(h.date).toLocaleString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
        const modeLabel =
          h.mode === 'exam'
            ? 'Modo Examen'
            : `Estudio (${SUBMODE_LABELS[h.subMode] || 'Adaptativo'})`;

        return `
          <div class="history-item">
            <div class="history-meta">
              <span class="history-title">[${escapeHtml(h.certification)}] ${escapeHtml(modeLabel)}</span>
              <span class="history-sub">${dateStr} • ${h.correctCount}/${h.totalQuestions} aciertos (${h.percentage}%)</span>
            </div>
            <span class="score-pill ${h.passed ? 'pass' : 'fail'}">
              ${h.scaledScore} pts (${h.passed ? 'PASS' : 'FAIL'})
            </span>
          </div>
        `;
      })
      .join('');
  },

  renderExamQuestion(session, activeProfile) {
    const q = session.questions[session.currentIndex];
    if (!q) return;

    const total = session.questions.length;
    const currentNum = session.currentIndex + 1;

    const titleEl = document.getElementById('vue-exam-title-text');
    const modeTagEl = document.getElementById('vue-mode-tag');
    const counterEl = document.getElementById('vue-question-counter');
    const candidateEl = document.getElementById('vue-candidate-name');

    if (titleEl) {
      titleEl.textContent = `${q.certification} — Microsoft Certification Simulator`;
    }
    if (modeTagEl) {
      modeTagEl.textContent =
        session.mode === 'exam'
          ? 'MODO EXAMEN (SIMULACRO)'
          : `ESTUDIO: ${SUBMODE_LABELS[session.subMode] || 'GUIADO'}`;
    }
    if (counterEl) {
      counterEl.textContent = `Pregunta ${currentNum} de ${total}`;
    }
    if (candidateEl) {
      candidateEl.textContent = `Candidato: ${activeProfile.name}`;
    }

    const reviewCheckbox = document.getElementById('vue-mark-review-checkbox');
    if (reviewCheckbox) {
      reviewCheckbox.checked = session.markedForReview.has(q.id);
    }

    const bookmarkBtn = document.getElementById('vue-bookmark-btn');
    if (bookmarkBtn) {
      const isBookmarked = (activeProfile.bookmarkedIds || []).includes(q.id);
      bookmarkBtn.classList.toggle('active', isBookmarked);
      bookmarkBtn.textContent = isBookmarked ? '★ En Favoritas' : '☆ Guardar Favorita';
    }

    const saberMasTopBtn = document.getElementById('vue-btn-saber-mas-top');
    if (saberMasTopBtn) {
      saberMasTopBtn.classList.toggle('hidden', session.mode === 'exam');
    }

    const reportErrorTopBtn = document.getElementById('vue-btn-report-error-top');
    if (reportErrorTopBtn) {
      reportErrorTopBtn.onclick = () => {
        window.open(getReportIssueUrl(q.id, q.certification, q.domain), '_blank');
      };
    }

    const metaRow = document.getElementById('vue-question-meta');
    if (metaRow) {
      const diffClass = `diff-${q.difficulty || 'intermediate'}`;
      const topicMeta = getTopicMeta(q.topicIcon);
      const mastery = activeProfile.questionMastery?.[q.id];
      const boxBadge = mastery
        ? `<span class="q-meta-pill" style="color:${mastery.box === 0 ? 'var(--danger)' : 'var(--success)'};">
             Caja Repetición: ${mastery.box}/3 (${mastery.consecutiveHits} seguidas)
           </span>`
        : `<span class="q-meta-pill">Nueva para tu perfil</span>`;

      metaRow.innerHTML = `
        <span class="q-meta-pill" style="display:inline-flex; align-items:center; gap:0.4rem;">
          ${topicMeta.svg}
          <strong>${escapeHtml(q.topic || topicMeta.label)}</strong>
        </span>
        <span class="q-meta-pill">${escapeHtml(q.id)}</span>
        <span class="q-meta-pill">Dominio: ${escapeHtml(q.domain)}</span>
        <span class="q-meta-pill ${diffClass}">${DIFF_LABELS[q.difficulty] || q.difficulty}</span>
        ${boxBadge}
      `;
    }

    const caseBox = document.getElementById('vue-case-study-box');
    const caseTabsBar = document.getElementById('vue-case-tabs-bar');
    const caseText = document.getElementById('vue-case-study-text');

    if (caseBox && caseText) {
      if (q.caseStudyTabs && typeof q.caseStudyTabs === 'object') {
        caseBox.classList.remove('hidden');
        const activeTab = session.activeCaseTab || 'overview';
        if (caseTabsBar) {
          caseTabsBar.classList.remove('hidden');
          caseTabsBar.innerHTML = `
            <button type="button" class="case-tab-btn ${activeTab === 'overview' ? 'active' : ''}" data-case-tab="overview">
              📋 Visión General
            </button>
            <button type="button" class="case-tab-btn ${activeTab === 'environment' ? 'active' : ''}" data-case-tab="environment">
              🏗️ Entorno Actual
            </button>
            <button type="button" class="case-tab-btn ${activeTab === 'requirements' ? 'active' : ''}" data-case-tab="requirements">
              🎯 Requisitos Técnicos y de Negocio
            </button>
          `;
        }
        caseText.textContent =
          q.caseStudyTabs[activeTab] ||
          q.caseStudyTabs.overview ||
          q.caseStudy ||
          '';
      } else if (q.caseStudy) {
        caseBox.classList.remove('hidden');
        if (caseTabsBar) caseTabsBar.classList.add('hidden');
        caseText.textContent = q.caseStudy;
      } else {
        caseBox.classList.add('hidden');
        if (caseTabsBar) caseTabsBar.classList.add('hidden');
        caseText.textContent = '';
      }
    }

    const stemEl = document.getElementById('vue-question-stem');
    if (stemEl) {
      stemEl.textContent = q.stem;
    }

    const multiBanner = document.getElementById('vue-multi-select-banner');
    const rawAns = session.answers[q.id];
    const selectedIds = Array.isArray(rawAns) ? rawAns : rawAns ? [rawAns] : [];
    const isMulti = q.questionType === 'multi' || (q.requiredSelections && q.requiredSelections > 1);
    const reqCount = q.requiredSelections || 1;

    if (multiBanner) {
      if (isMulti) {
        multiBanner.classList.remove('hidden');
        multiBanner.innerHTML = `
          <span><strong>☑ Pregunta de Selección Múltiple (Pearson VUE):</strong> Debes seleccionar exactamente <strong>${reqCount} opciones</strong>. Cada respuesta correcta presenta parte de la solución o una solución completa.</span>
          <span class="badge">Marcadas: ${selectedIds.length} de ${reqCount}</span>
        `;
      } else {
        multiBanner.classList.add('hidden');
      }
    }

    const codeBox = document.getElementById('vue-code-box');
    const codeLang = document.getElementById('vue-code-lang');
    const codeContent = document.getElementById('vue-code-content');
    if (codeBox && codeLang && codeContent) {
      if (q.codeSnippet) {
        codeBox.classList.remove('hidden');
        codeLang.textContent = q.codeLanguage || 'Código / Consulta';
        codeContent.textContent = q.codeSnippet;
      } else {
        codeBox.classList.add('hidden');
        codeContent.textContent = '';
      }
    }

    const optionsContainer = document.getElementById('vue-options-container');
    const strikes = session.strikethroughs[q.id] || new Set();
    const isRevealed = session.mode === 'study' && session.revealedInStudy.has(q.id);

    if (optionsContainer) {
      optionsContainer.innerHTML = q.shuffledOptions
        .map((opt) => {
          const isSelected = selectedIds.includes(opt.id);
          const isStruck = strikes.has(opt.id);

          let rowClasses = ['option-row'];
          if (isSelected) rowClasses.push('selected');
          if (isStruck) rowClasses.push('strikethrough');

          if (isRevealed) {
            rowClasses.push('locked');
            if (opt.isCorrect) {
              rowClasses.push('correct-reveal');
            } else if (isSelected && !opt.isCorrect) {
              rowClasses.push('wrong-reveal');
            }
          }

          const indicatorShape = isMulti ? 'checkbox' : 'radio';
          const indicatorSymbol = isSelected ? (isMulti ? '✓' : '●') : '';

          const rationaleHtml =
            isRevealed && opt.rationale
              ? `<div class="option-rationale">
                   <strong>${opt.isCorrect ? '✓ Por qué es correcta:' : '✗ Por qué es incorrecta:'}</strong>
                   ${escapeHtml(opt.rationale)}
                 </div>`
              : '';

          return `
            <div class="${rowClasses.join(' ')}" data-option-id="${escapeHtml(opt.id)}">
              <div class="option-left">
                <span class="vue-selector-indicator ${indicatorShape}">${indicatorSymbol}</span>
                <span class="option-letter">${escapeHtml(opt.letter)}</span>
                <div class="option-body">
                  <div class="option-text">${escapeHtml(opt.text)}</div>
                  ${rationaleHtml}
                </div>
              </div>
              <button type="button" class="strike-btn" data-strike-option="${escapeHtml(opt.id)}" title="Tachar opción descartada (o clic derecho)">
                ${isStruck ? 'Restaurar' : 'Tachar'}
              </button>
            </div>
          `;
        })
        .join('');
    }

    const feedbackContainer = document.getElementById('vue-study-feedback');
    if (feedbackContainer) {
      if (isRevealed) {
        const correctOpts = q.shuffledOptions.filter((o) => o.isCorrect);
        const isHit =
          selectedIds.length === correctOpts.length &&
          correctOpts.every((co) => selectedIds.includes(co.id));
        const correctLetters = correctOpts.map((o) => o.letter).join(', ');

        const refsHtml = (q.references || [])
          .map(
            (ref) => `
            <a href="${escapeHtml(ref.url)}" target="_blank" rel="noopener noreferrer" class="ms-learn-link-item">
              🔗 ${escapeHtml(ref.title)} ↗
            </a>
          `
          )
          .join('');

        feedbackContainer.className = `study-feedback-panel ${isHit ? 'is-correct' : 'is-wrong'}`;
        feedbackContainer.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem; margin-bottom:0.65rem;">
            <div class="feedback-heading" style="margin-bottom:0;">
              ${
                isHit
                  ? '✅ ¡Respuesta Correcta! (+1 en consolidación de este tema)'
                  : `❌ Respuesta Incorrecta — Opción correcta: ${escapeHtml(correctLetters)} (Añadida a repetición prioritaria)`
              }
            </div>
            <button type="button" class="btn btn-primary btn-sm" data-open-theory="${escapeHtml(q.id)}">
              📚 Saber más (Teoría y MS Learn en Vivo)
            </button>
          </div>
          <div class="feedback-explanation">${escapeHtml(q.explanation)}</div>
          ${
            refsHtml
              ? `<div class="ms-learn-links">
                   <span class="ms-learn-links-title">Documentación de Referencia en Microsoft Learn:</span>
                   ${refsHtml}
                 </div>`
              : ''
          }
        `;
        feedbackContainer.classList.remove('hidden');
      } else {
        feedbackContainer.classList.add('hidden');
        feedbackContainer.innerHTML = '';
      }
    }

    const prevBtn = document.getElementById('vue-btn-prev');
    const nextBtn = document.getElementById('vue-btn-next');
    const checkStudyBtn = document.getElementById('vue-btn-check-study');

    if (prevBtn) prevBtn.disabled = session.currentIndex === 0;
    if (nextBtn) {
      nextBtn.textContent =
        session.currentIndex === total - 1 ? 'Ir a Revisión Final →' : 'Siguiente →';
    }
    if (checkStudyBtn) {
      if (session.mode === 'study') {
        checkStudyBtn.classList.remove('hidden');
        checkStudyBtn.textContent = isRevealed ? '✓ Explicación Mostrada' : '💡 Comprobar Respuesta';
        checkStudyBtn.disabled = isRevealed || selectedIds.length === 0;
      } else {
        checkStudyBtn.classList.add('hidden');
      }
    }
  },

  openTheoryDrawer(q) {
    const drawer = document.getElementById('drawer-learn-more');
    const body = document.getElementById('drawer-learn-more-body');
    if (!drawer || !body || !q) return;

    const topicMeta = getTopicMeta(q.topicIcon);
    const pill = q.theoryPill || {
      title: `${q.topic || q.domain} (${q.certification})`,
      summary: q.explanation,
      keyPoints: [
        `Dominio: ${q.domain}`,
        `Revisa cómo interactúan las opciones de configuración y rendimiento en ${q.certification}.`
      ],
      examTrap: 'Presta especial atención a los requisitos del enunciado (latencia, coste, mínimo privilegio o cero duplicación de datos).',
      searchQuery: `${q.certification} ${q.topic || q.domain} Microsoft Fabric Azure`
    };

    const keyPointsHtml = (pill.keyPoints || [])
      .map((pt) => `<li>${escapeHtml(pt)}</li>`)
      .join('');

    const refsHtml = (q.references || [])
      .map(
        (ref) => `
        <a href="${escapeHtml(ref.url)}" target="_blank" rel="noopener noreferrer" class="ms-learn-link-item">
          📘 ${escapeHtml(ref.title)} ↗
        </a>
      `
      )
      .join('');

    const isLocalServer = ['localhost', '127.0.0.1'].includes(window.location.hostname);

    const mcpSectionHtml = isLocalServer
      ? `
      <div class="mcp-live-box">
        <div style="font-weight:700; font-size:0.95rem; margin-bottom:0.35rem; display:flex; align-items:center; gap:0.5rem;">
          <span>🌐 Consulta en Vivo a Microsoft Learn (MCP Server)</span>
        </div>
        <p style="font-size:0.8rem; color:var(--text-secondary); margin-bottom:0.75rem;">
          Conecta en tiempo real con <code>https://learn.microsoft.com/api/mcp</code> para ampliar la teoría o buscar ejemplos de código sin salir del simulador:
        </p>
        <div style="display:flex; gap:0.5rem; flex-wrap:wrap; margin-bottom:0.65rem;">
          <input
            type="text"
            id="mcp-live-query-input"
            class="form-input"
            style="flex:1; min-width:220px;"
            value="${escapeHtml(pill.searchQuery || `${q.certification} ${q.topic || q.domain}`)}"
          />
          <button type="button" class="btn btn-primary btn-sm" id="btn-mcp-live-docs">
            🔍 Buscar Teoría MS Learn
          </button>
          <button type="button" class="btn btn-secondary btn-sm" id="btn-mcp-live-code">
            💻 Buscar Código en MS Learn
          </button>
        </div>
        <div id="mcp-live-results-container"></div>
      </div>
      `
      : `
      <div class="mcp-offline-box">
        <div style="font-weight:700; font-size:0.92rem; margin-bottom:0.35rem; display:flex; align-items:center; gap:0.5rem;">
          <span>🌐 Consulta en Microsoft Learn</span>
        </div>
        <p style="font-size:0.82rem; color:var(--text-secondary); margin-bottom:0.6rem;">
          ℹ️ La consulta interactiva en vivo mediante el servidor MCP está disponible en ejecución local (iniciando <code>node server.js</code>).
        </p>
        <p style="font-size:0.82rem; color:var(--text-secondary); margin-bottom:0.8rem;">
          En este entorno estático, puedes consultar directamente la documentación y ejemplos con los siguientes enlaces directos:
        </p>
        <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
          <a href="https://learn.microsoft.com/es-es/search/?terms=${encodeURIComponent(q.certification + ' ' + (q.topic || q.domain))}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
            🔍 Buscar "${escapeHtml(q.topic || q.domain)}" en Microsoft Learn ↗
          </a>
          <a href="https://learn.microsoft.com/es-es/samples/browse/?expanded=azure&term=${encodeURIComponent(q.certification)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
            💻 Explorar ejemplos de código ↗
          </a>
        </div>
      </div>
      `;

    body.innerHTML = `
      <div class="theory-pill-card">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:0.75rem; margin-bottom:0.75rem;">
          <div style="display:flex; align-items:center; gap:0.75rem;">
            <span class="topic-icon-box">${topicMeta.svg}</span>
            <div>
              <span class="badge">${escapeHtml(q.certification)} • ${escapeHtml(q.domain)}</span>
              <h3 style="font-size:1.12rem; margin-top:0.25rem;">${escapeHtml(pill.title)}</h3>
            </div>
          </div>
          <a href="${getReportTheoryPillUrl(pill.title, q.certification)}" target="_blank" rel="noopener noreferrer" class="btn-report-error" title="Reportar errata o sugerencia de mejora">
            ⚠️ Reportar error
          </a>
        </div>

        <p style="font-size:0.92rem; line-height:1.6;">
          ${escapeHtml(pill.summary)}
        </p>

        ${
          keyPointsHtml
            ? `<div style="margin-top:0.9rem;">
                 <div style="font-size:0.76rem; text-transform:uppercase; color:var(--ms-blue-light); font-weight:700;">
                   Conceptos Clave para el Examen:
                 </div>
                 <ul class="theory-key-points">${keyPointsHtml}</ul>
               </div>`
            : ''
        }

        ${
          pill.examTrap
            ? `<div class="exam-trap-box">
                 <strong>⚠️ Trampa Frecuente en Examen:</strong><br/>
                 ${escapeHtml(pill.examTrap)}
               </div>`
            : ''
        }

        ${
          refsHtml
            ? `<div class="ms-learn-links" style="margin-top:1rem;">
                 <span class="ms-learn-links-title">Enlaces Directos a Microsoft Learn:</span>
                 ${refsHtml}
               </div>`
            : ''
        }
      </div>

      ${mcpSectionHtml}
    `;

    drawer.classList.remove('hidden');
  },

  renderReviewModal(session) {
    const modal = document.getElementById('modal-review-grid');
    const grid = document.getElementById('review-grid-cells');
    const summaryText = document.getElementById('review-modal-summary');
    if (!modal || !grid) return;

    const total = session.questions.length;
    const answeredCount = session.questions.filter((q) => {
      const a = session.answers[q.id];
      return Array.isArray(a) ? a.length > 0 : Boolean(a);
    }).length;
    const unansweredCount = total - answeredCount;
    const flaggedCount = session.markedForReview.size;

    if (summaryText) {
      summaryText.textContent = `Respondidas: ${answeredCount} de ${total} | Sin responder: ${unansweredCount} | Marcadas para revisión: ${flaggedCount}`;
    }

    grid.innerHTML = session.questions
      .map((q, idx) => {
        const rawAns = session.answers[q.id];
        const selectedIds = Array.isArray(rawAns) ? rawAns : rawAns ? [rawAns] : [];
        const selectedOpts = q.shuffledOptions.filter((o) => selectedIds.includes(o.id));
        const isFlagged = session.markedForReview.has(q.id);

        const classes = ['review-cell', selectedOpts.length > 0 ? 'answered' : 'unanswered'];
        if (isFlagged) classes.push('flagged');

        const letters = selectedOpts.map((o) => o.letter).join(', ');

        return `
          <button type="button" class="${classes.join(' ')}" data-jump-index="${idx}">
            <div style="display:flex; justify-content:space-between; width:100%; font-weight:700;">
              <span>Pregunta ${idx + 1}</span>
              <span>${isFlagged ? '🚩' : ''}</span>
            </div>
            <span style="font-size:0.74rem; color:var(--text-secondary);">
              ${selectedOpts.length > 0 ? `Marcada: ${letters}` : '⚠ Sin contestar'}
            </span>
          </button>
        `;
      })
      .join('');

    modal.classList.remove('hidden');
  },

  renderResultsView(result, reviewFilter = 'ALL') {
    const banner = document.getElementById('results-summary-banner');
    const scoreCircle = document.getElementById('results-score-circle');
    const scaledNum = document.getElementById('results-scaled-number');
    const statusBadge = document.getElementById('results-pass-status');
    const subtitleEl = document.getElementById('results-subtitle-meta');
    const breakdownContainer = document.getElementById('results-domain-breakdown');
    const repeatFailedBtn = document.getElementById('btn-repeat-attempt-failed');

    if (banner) {
      banner.className = `results-banner ${result.passed ? 'pass-border' : 'fail-border'}`;
    }
    if (scoreCircle) {
      scoreCircle.className = `scaled-score-circle ${result.passed ? 'pass' : 'fail'}`;
    }
    if (scaledNum) {
      scaledNum.textContent = String(result.scaledScore);
    }
    if (statusBadge) {
      statusBadge.className = `score-pill ${result.passed ? 'pass' : 'fail'}`;
      statusBadge.textContent = result.passed
        ? `✓ APROBADO (${result.percentage}% — Supera el 70% / 700 pts)`
        : `✗ NO SUPERADO (${result.percentage}% — Mínimo requerido: 70% / 700 pts)`;
    }
    if (subtitleEl) {
      subtitleEl.textContent = `Aciertos: ${result.correctCount} | Fallos: ${result.wrongCount} | En blanco: ${result.unansweredCount} | Tiempo: ${formatTimeMMSS(result.durationSeconds)}`;
    }

    const certMetaContainer = document.getElementById('results-cert-meta');
    if (certMetaContainer) {
      certMetaContainer.innerHTML = `
        <span class="cert-meta-tag"><strong>Certificación:</strong> ${escapeHtml(result.certification)}</span>
        <span class="cert-meta-tag">🌐 Idioma: Español (es)</span>
        <span class="cert-meta-tag">📅 Guía de habilidades: 2025/2026</span>
        <span class="cert-meta-tag">✓ Revisado: 2026-11-01</span>
      `;
    }

    const failedInThisAttempt = result.questionDetails.filter((d) => !d.isCorrect);
    if (repeatFailedBtn) {
      repeatFailedBtn.disabled = failedInThisAttempt.length === 0;
      repeatFailedBtn.textContent = `🔁 Repetir las ${failedInThisAttempt.length} preguntas falladas de este test`;
    }

    if (breakdownContainer) {
      breakdownContainer.innerHTML = result.domainBreakdown
        .map((dom) => {
          const pct = dom.total > 0 ? Math.round((dom.hit / dom.total) * 100) : 0;
          const color = pct >= 70 ? 'var(--success)' : pct >= 50 ? 'var(--warning)' : 'var(--danger)';
          return `
            <div class="domain-progress-item">
              <div class="domain-progress-header">
                <span>${escapeHtml(dom.domain)}</span>
                <strong>${pct}% (${dom.hit}/${dom.total})</strong>
              </div>
              <div class="progress-track">
                <div class="progress-fill" style="width:${pct}%; background-color:${color};"></div>
              </div>
            </div>
          `;
        })
        .join('');
    }

    const counts = {
      ALL: result.questionDetails.length,
      FAILED: result.questionDetails.filter((q) => !q.isCorrect).length,
      PASSED: result.questionDetails.filter((q) => q.isCorrect).length,
      FLAGGED: result.questionDetails.filter((q) => q.wasFlagged).length
    };

    document.querySelectorAll('.review-tab').forEach((tab) => {
      const f = tab.getAttribute('data-review-filter');
      tab.classList.toggle('active', f === reviewFilter);
      const countSpan = tab.querySelector('.tab-count');
      if (countSpan && counts[f] !== undefined) {
        countSpan.textContent = `(${counts[f]})`;
      }
    });

    const accordion = document.getElementById('results-review-accordion');
    if (!accordion) return;

    const filteredDetails = result.questionDetails.filter((item) => {
      if (reviewFilter === 'FAILED') return !item.isCorrect;
      if (reviewFilter === 'PASSED') return item.isCorrect;
      if (reviewFilter === 'FLAGGED') return item.wasFlagged;
      return true;
    });

    if (filteredDetails.length === 0) {
      accordion.innerHTML = `
        <div class="panel-card" style="text-align:center; color:var(--text-secondary);">
          No hay preguntas en esta categoría de filtro.
        </div>
      `;
      return;
    }

    accordion.innerHTML = filteredDetails
      .map((item) => {
        const autoExpand = !item.isCorrect && reviewFilter === 'FAILED';
        const statusIcon = item.isCorrect ? '✅' : '❌';
        const topicMeta = getTopicMeta(item.topicIcon);

        const userAnswerText =
          item.markedOptions && item.markedOptions.length > 0
            ? item.markedOptions.map((o) => `Opción ${o.letter}: ${o.text}`).join(' | ')
            : 'Sin responder (En blanco)';

        const correctAnswerText = (item.correctOptions || [])
          .map((o) => `Opción ${o.letter}: ${o.text}`)
          .join(' | ');

        const optionsBreakdownHtml = item.shuffledOptions
          .map((opt) => {
            const isUserChoice = (item.markedOptions || []).some((m) => m.id === opt.id);
            const badge = opt.isCorrect
              ? '<span class="score-pill pass" style="font-size:0.7rem;">✓ Correcta</span>'
              : isUserChoice
              ? '<span class="score-pill fail" style="font-size:0.7rem;">✗ Tu elección</span>'
              : '';

            return `
              <div style="padding:0.65rem 0.85rem; background:var(--bg-primary); border:1px solid var(--border-subtle); border-radius:4px; margin-bottom:0.45rem;">
                <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem;">
                  <strong>${escapeHtml(opt.letter)}. ${escapeHtml(opt.text)}</strong>
                  ${badge}
                </div>
                ${
                  opt.rationale
                    ? `<div style="font-size:0.8rem; color:var(--text-secondary); margin-top:0.35rem;">
                         ${escapeHtml(opt.rationale)}
                       </div>`
                    : ''
                }
              </div>
            `;
          })
          .join('');

        const refsHtml = (item.references || [])
          .map(
            (ref) => `
            <a href="${escapeHtml(ref.url)}" target="_blank" rel="noopener noreferrer" class="ms-learn-link-item">
              📘 ${escapeHtml(ref.title)} ↗
            </a>
          `
          )
          .join('');

        return `
          <div class="review-item ${item.isCorrect ? 'passed-item' : 'failed-item'}">
            <div class="review-item-header" data-toggle-review="${escapeHtml(item.questionId)}">
              <div class="review-item-title">
                <span>${statusIcon}</span>
                <span style="display:inline-flex; align-items:center;">${topicMeta.svg}</span>
                <span><strong>#${item.index} [${escapeHtml(item.certification)}]</strong> ${escapeHtml(item.stem.substring(0, 105))}${item.stem.length > 105 ? '...' : ''}</span>
              </div>
              <div style="display:flex; align-items:center; gap:0.6rem; flex-shrink:0;">
                ${item.wasFlagged ? '<span title="Marcada para revisión">🚩</span>' : ''}
                <span class="q-meta-pill">${escapeHtml(item.topic || item.domain)}</span>
                <span style="font-size:0.8rem; color:var(--ms-blue-light); font-weight:600;">Ver detalle ▾</span>
              </div>
            </div>

            <div class="review-item-body ${autoExpand ? '' : 'hidden'}" id="review-body-${escapeHtml(item.questionId)}">
              <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
                <span class="q-meta-pill">Dominio: ${escapeHtml(item.domain)}</span>
                <div style="display:flex; gap:0.5rem; align-items:center;">
                  <button type="button" class="btn btn-primary btn-sm" data-open-theory="${escapeHtml(item.questionId)}">
                    📚 Saber más sobre este tema
                  </button>
                  <a href="${getReportIssueUrl(item.questionId, item.certification, item.domain)}" target="_blank" rel="noopener noreferrer" class="btn-report-error" title="Reportar errata en esta pregunta">
                    ⚠️ Reportar error
                  </a>
                </div>
              </div>

              <div style="font-size:0.96rem; font-weight:500; line-height:1.55;">
                ${escapeHtml(item.stem)}
              </div>
              ${
                item.codeSnippet
                  ? `<div class="code-snippet-block">
                       <div class="code-snippet-header">${escapeHtml(item.codeLanguage)}</div>
                       <pre>${escapeHtml(item.codeSnippet)}</pre>
                     </div>`
                  : ''
              }

              <div class="answer-comparison-grid">
                <div class="comparison-box ${item.isCorrect ? 'user-correct' : 'user-wrong'}">
                  <span class="comparison-label">Tu Respuesta Marcada</span>
                  <div style="font-size:0.88rem;">${escapeHtml(userAnswerText)}</div>
                </div>
                <div class="comparison-box correct-box">
                  <span class="comparison-label">Respuesta Correcta</span>
                  <div style="font-size:0.88rem;">${escapeHtml(correctAnswerText)}</div>
                </div>
              </div>

              <div>
                <div style="font-size:0.78rem; text-transform:uppercase; color:var(--text-secondary); font-weight:700; margin-bottom:0.45rem;">
                  Desglose de Opciones (Orden barajado en tu test):
                </div>
                ${optionsBreakdownHtml}
              </div>

              <div class="study-feedback-panel ${item.isCorrect ? 'is-correct' : 'is-wrong'}" style="margin-top:0;">
                <div class="feedback-heading">📖 Explicación Teórica</div>
                <div class="feedback-explanation">${escapeHtml(item.explanation)}</div>
                ${
                  refsHtml
                    ? `<div class="ms-learn-links">
                         <span class="ms-learn-links-title">Enlaces de Referencia a Microsoft Learn:</span>
                         ${refsHtml}
                       </div>`
                    : ''
                }
              </div>
            </div>
          </div>
        `;
      })
      .join('');
  },

  /**
   * Renders the 24h Express Review & Cheat Sheet View (#view-cheatsheet)
   */
  renderCheatSheet(questions, filters, profile) {
    const grid = document.getElementById('cheatsheet-cards-grid');
    const emptyState = document.getElementById('cheatsheet-empty-state');
    const counterBadge = document.getElementById('cheatsheet-count-badge');
    const domainSelect = document.getElementById('select-cheatsheet-domain');
    const searchInput = document.getElementById('input-cheatsheet-search');
    const clearSearchBtn = document.getElementById('btn-cheatsheet-clear-search');
    const checkOnlyTraps = document.getElementById('check-cheatsheet-only-traps');
    const checkOnlyFavs = document.getElementById('check-cheatsheet-only-favs');
    if (!grid) return;

    // 1. Sync controls with filter state
    if (searchInput && searchInput.value !== (filters.searchQuery || '')) {
      searchInput.value = filters.searchQuery || '';
    }
    if (clearSearchBtn) {
      clearSearchBtn.classList.toggle('hidden', !(filters.searchQuery && filters.searchQuery.trim()));
    }
    if (checkOnlyTraps) {
      checkOnlyTraps.checked = Boolean(filters.onlyTraps);
    }
    if (checkOnlyFavs) {
      checkOnlyFavs.checked = Boolean(filters.onlyFavs);
    }

    // Update active certification button
    document.querySelectorAll('#cheatsheet-cert-pills [data-cs-cert]').forEach((btn) => {
      const c = btn.getAttribute('data-cs-cert');
      btn.classList.toggle('selected', c === filters.certification);
    });

    // 2. Populate Domain Select dropdown dynamically based on selected certification
    if (domainSelect) {
      const prevDomain = filters.selectedDomain || 'ALL';
      const certPool = questions.filter(
        (q) => filters.certification === 'ALL' || q.certification === filters.certification
      );
      const uniqueDomains = Array.from(new Set(certPool.map((q) => q.domain).filter(Boolean))).sort();

      domainSelect.innerHTML = `
        <option value="ALL">Todos los dominios (${uniqueDomains.length} dominios)</option>
        ${uniqueDomains
          .map(
            (dom) =>
              `<option value="${escapeHtml(dom)}" ${dom === prevDomain ? 'selected' : ''}>${escapeHtml(dom)}</option>`
          )
          .join('')}
      `;
    }

    // 3. Filter questions
    const qClean = (filters.searchQuery || '').trim().toLowerCase();
    const filtered = questions.filter((q) => {
      // Certification
      if (filters.certification !== 'ALL' && q.certification !== filters.certification) {
        return false;
      }
      // Domain
      if (filters.selectedDomain !== 'ALL' && q.domain !== filters.selectedDomain) {
        return false;
      }
      // Only Traps
      if (filters.onlyTraps) {
        if (!q.theoryPill || !q.theoryPill.examTrap || !q.theoryPill.examTrap.trim()) {
          return false;
        }
      }
      // Only Favs
      if (filters.onlyFavs) {
        const favs = profile ? profile.bookmarkedIds || [] : [];
        if (!favs.includes(q.id)) {
          return false;
        }
      }
      // Search Query
      if (qClean) {
        const pill = q.theoryPill || {};
        const blob = [
          q.id,
          q.certification,
          q.domain,
          q.topic,
          pill.title || '',
          pill.summary || '',
          (pill.keyPoints || []).join(' '),
          pill.examTrap || '',
          (q.tags || []).join(' '),
          q.stem || ''
        ]
          .join(' ')
          .toLowerCase();

        if (!blob.includes(qClean)) {
          return false;
        }
      }
      return true;
    });

    // 4. Update count badge
    if (counterBadge) {
      counterBadge.innerHTML = `Mostrando <strong>${filtered.length}</strong> de ${questions.length} píldoras teóricas`;
    }

    // 5. Handle empty state
    if (filtered.length === 0) {
      grid.innerHTML = '';
      grid.classList.add('hidden');
      if (emptyState) emptyState.classList.remove('hidden');
      return;
    }

    grid.classList.remove('hidden');
    if (emptyState) emptyState.classList.add('hidden');

    // 6. Render Cards
    const bookmarkedSet = new Set(profile ? profile.bookmarkedIds || [] : []);

    grid.innerHTML = filtered
      .map((q) => {
        const topicMeta = getTopicMeta(q.topicIcon);
        const pill = q.theoryPill || {
          title: q.topic || q.stem,
          summary: q.explanation || '',
          keyPoints: [],
          examTrap: ''
        };
        const certCode = (q.certification || 'DP-600').toLowerCase().replace('-', '');
        const isFav = bookmarkedSet.has(q.id);

        const keyPointsList = (pill.keyPoints || [])
          .map((pt) => `<li>${escapeHtml(pt)}</li>`)
          .join('');

        const refItem = q.references && q.references[0] ? q.references[0] : null;

        return `
          <div class="cheatsheet-card" data-cs-id="${escapeHtml(q.id)}">
            <div class="cheatsheet-card-top">
              <div class="cheatsheet-card-badges">
                <span class="cert-code-badge ${certCode}">${escapeHtml(q.certification)}</span>
                <span class="topic-meta-tag">
                  ${topicMeta.svg}
                  <span>${escapeHtml(q.topic || q.domain)}</span>
                </span>
              </div>
              <button
                type="button"
                class="btn-cheat-bookmark ${isFav ? 'active' : ''}"
                data-cs-bookmark="${escapeHtml(q.id)}"
                title="${isFav ? 'Quitar de preguntas favoritas' : 'Marcar como favorita'}"
              >
                ${isFav ? '⭐' : '☆'}
              </button>
            </div>

            <div class="cheatsheet-card-title-row">
              <h3>${escapeHtml(pill.title || q.topic || 'Concepto Clave')}</h3>
            </div>

            <div class="cheatsheet-card-domain">
              Dominio: <strong>${escapeHtml(q.domain)}</strong>
            </div>

            <p class="cheatsheet-card-summary">
              ${escapeHtml(pill.summary || q.explanation || '')}
            </p>

            ${
              keyPointsList
                ? `
              <div class="cheatsheet-keypoints-box">
                <div class="cheatsheet-section-title">📌 Conceptos Clave para el Examen:</div>
                <ul class="cheatsheet-keypoints-list">
                  ${keyPointsList}
                </ul>
              </div>
            `
                : ''
            }

            ${
              pill.examTrap
                ? `
              <div class="cheatsheet-exam-trap">
                <div class="exam-trap-header">⚠️ Trampa Frecuente en Examen:</div>
                <div class="exam-trap-body">${escapeHtml(pill.examTrap)}</div>
              </div>
            `
                : ''
            }

            <div class="cheatsheet-card-footer">
              ${
                refItem
                  ? `
                <a href="${escapeHtml(refItem.url)}" target="_blank" rel="noopener noreferrer" class="cheatsheet-ref-link" title="${escapeHtml(refItem.title)}">
                  📘 ${escapeHtml(refItem.title)} ↗
                </a>
              `
                  : '<span></span>'
              }
              <div style="display:flex; gap:0.4rem; align-items:center;">
                <a href="${getReportTheoryPillUrl(pill.title || q.topic, q.certification)}" target="_blank" rel="noopener noreferrer" class="btn-report-error" title="Reportar errata">
                  ⚠️ Reportar
                </a>
                <button
                  type="button"
                  class="btn btn-primary btn-sm cheatsheet-learn-btn"
                  data-open-theory="${escapeHtml(q.id)}"
                >
                  📚 Saber más
                </button>
              </div>
            </div>
          </div>
        `;
      })
      .join('');
  }
};
