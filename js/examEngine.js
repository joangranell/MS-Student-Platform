/**
 * examEngine.js — Adaptive Spaced Repetition, Pearson VUE Single/Multi Choice & Scoring Engine
 */

const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

export function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const ExamEngine = {
  /**
   * Filters the master question pool according to Dashboard configuration & active profile
   */
  filterQuestions(allQuestions, config, activeProfile) {
    return allQuestions.filter((q) => {
      // 1. Certification filter
      if (config.certification !== 'ALL' && q.certification !== config.certification) {
        return false;
      }

      // 2. If mode is 'exam', include all difficulties and domains for realistic Pearson VUE mix
      if (config.mode === 'exam') {
        return true;
      }

      // 3. Study Mode sub-classifications
      switch (config.subMode) {
        case 'basic':
          return q.difficulty === 'basic';

        case 'hardcore':
          return q.difficulty === 'hardcore' || q.difficulty === 'intermediate';

        case 'domain':
          if (config.selectedDomain && config.selectedDomain !== 'ALL') {
            return q.domain === config.selectedDomain;
          }
          return true;

        case 'topic':
          if (config.selectedTopicIcon && config.selectedTopicIcon !== 'ALL') {
            return (q.topicIcon || 'fabric') === config.selectedTopicIcon;
          }
          return true;

        case 'code':
          return Boolean(q.hasCodeSnippet || q.codeSnippet);

        case 'failed': {
          const failedIds = activeProfile?.failedQuestionIds || [];
          return failedIds.includes(q.id);
        }

        case 'adaptive':
        case 'all_study':
        default:
          return true;
      }
    });
  },

  /**
   * Computes an Adaptive Priority Score for a question based on the user's profile:
   * - Failed questions in Box 0 get highest weight (+110)
   * - Consolidating questions in Box 1 get high weight (+65)
   * - Questions belonging to a weak topic (<70% hit rate) get (+45)
   * - Unseen questions get (+30)
   * - Mastered questions (Box 3) get (+5)
   */
  computeAdaptivePriority(q, activeProfile) {
    if (!activeProfile) return Math.random() * 20;

    const masteryMap = activeProfile.questionMastery || {};
    const topicStats = activeProfile.topicStats || {};
    const failedIds = activeProfile.failedQuestionIds || [];

    let weight = 0;
    const m = masteryMap[q.id];

    if (failedIds.includes(q.id) || (m && m.box === 0 && m.totalFails > 0)) {
      weight += 110 + (m ? m.totalFails * 10 : 0);
    } else if (m && m.box === 1) {
      weight += 65;
    } else if (!m) {
      weight += 30; // Unseen question
    } else if (m.box === 2) {
      weight += 15;
    } else {
      weight += 5; // Box 3 mastered
    }

    // Topic weakness boost: if user struggles with this topicIcon, pull more questions from this topic!
    const tStat = topicStats[q.topicIcon || 'fabric'];
    if (tStat && tStat.total > 0) {
      const topicAccuracy = tStat.hit / tStat.total;
      if (topicAccuracy < 0.5) {
        weight += 50;
      } else if (topicAccuracy < 0.75) {
        weight += 30;
      }
    }

    // Add random jitter (0..18) so order isn't deterministic
    return weight + Math.random() * 18;
  },

  /**
   * Builds a session from a pool of eligible questions.
   * If subMode === 'adaptive' (and mode === 'study'), prioritizes weak/failed topics automatically!
   */
  buildSessionQuestions(eligibleQuestions, requestedCount, isAdaptive = false, activeProfile = null) {
    let orderedPool;
    if (isAdaptive && activeProfile) {
      orderedPool = [...eligibleQuestions].sort(
        (a, b) =>
          this.computeAdaptivePriority(b, activeProfile) -
          this.computeAdaptivePriority(a, activeProfile)
      );
    } else {
      orderedPool = shuffleArray(eligibleQuestions);
    }

    const limit =
      requestedCount === 'ALL'
        ? orderedPool.length
        : Math.min(Number(requestedCount) || 10, orderedPool.length);

    const selectedQuestions = orderedPool.slice(0, limit);

    return selectedQuestions.map((q) => {
      const shuffledOptions = shuffleArray(q.options).map((opt, idx) => ({
        ...opt,
        letter: OPTION_LETTERS[idx] || String(idx + 1)
      }));

      const correctCount = shuffledOptions.filter((o) => o.isCorrect).length;
      const requiredSelections = q.requiredSelections || Math.max(1, correctCount);
      const questionType = requiredSelections > 1 || q.questionType === 'multi' ? 'multi' : 'single';

      return {
        ...q,
        questionType,
        requiredSelections,
        shuffledOptions
      };
    });
  },

  /**
   * Evaluates whether a single question's selected option IDs match all correct options
   */
  isQuestionCorrect(q, selectedIdsArray) {
    const selected = Array.isArray(selectedIdsArray)
      ? selectedIdsArray
      : selectedIdsArray
      ? [selectedIdsArray]
      : [];

    const correctOpts = q.shuffledOptions.filter((o) => o.isCorrect);
    if (selected.length !== correctOpts.length) return false;
    return correctOpts.every((cOpt) => selected.includes(cOpt.id));
  },

  /**
   * Converts raw accuracy (0..1) into Microsoft Official Scaled Score (100..1000)
   * Passing threshold: 70% === 700 points
   */
  calculateScaledScore(correctCount, totalCount) {
    if (!totalCount || totalCount <= 0) return 100;
    const ratio = correctCount / totalCount;
    if (ratio <= 0) return 100;
    if (ratio >= 1) return 1000;

    if (ratio < 0.7) {
      return Math.round(100 + (ratio / 0.7) * 600);
    } else {
      return Math.round(700 + ((ratio - 0.7) / 0.3) * 300);
    }
  },

  /**
   * Evaluates an active session and produces the full Result & Review payload
   */
  evaluateSession(session) {
    const totalQuestions = session.questions.length;
    let correctCount = 0;
    let wrongCount = 0;
    let unansweredCount = 0;

    const domainBreakdown = {};

    const questionDetails = session.questions.map((q, idx) => {
      const rawAns = session.answers[q.id];
      const selectedIds = Array.isArray(rawAns)
        ? rawAns
        : rawAns
        ? [rawAns]
        : [];

      const markedOptions = q.shuffledOptions.filter((o) => selectedIds.includes(o.id));
      const correctOptions = q.shuffledOptions.filter((o) => o.isCorrect);

      const isAnswered = markedOptions.length > 0;
      const isCorrect = this.isQuestionCorrect(q, selectedIds);

      if (!isAnswered) {
        unansweredCount += 1;
      } else if (isCorrect) {
        correctCount += 1;
      } else {
        wrongCount += 1;
      }

      if (!domainBreakdown[q.domain]) {
        domainBreakdown[q.domain] = {
          domain: q.domain,
          certification: q.certification,
          hit: 0,
          total: 0
        };
      }
      domainBreakdown[q.domain].total += 1;
      if (isCorrect) {
        domainBreakdown[q.domain].hit += 1;
      }

      return {
        index: idx + 1,
        questionId: q.id,
        certification: q.certification,
        domain: q.domain,
        topic: q.topic || q.domain,
        topicIcon: q.topicIcon || 'fabric',
        tags: q.tags || [],
        difficulty: q.difficulty,
        questionType: q.questionType || 'single',
        requiredSelections: q.requiredSelections || 1,
        stem: q.stem,
        caseStudy: q.caseStudy || null,
        caseStudyTabs: q.caseStudyTabs || null,
        codeSnippet: q.codeSnippet || null,
        codeLanguage: q.codeLanguage || 'SQL / Code',
        shuffledOptions: q.shuffledOptions,
        markedOptions,
        correctOptions,
        isAnswered,
        isCorrect,
        wasFlagged: session.markedForReview.has(q.id),
        explanation: q.explanation,
        theoryPill: q.theoryPill || null,
        references: q.references || []
      };
    });

    const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    const scaledScore = this.calculateScaledScore(correctCount, totalQuestions);
    const passed = percentage >= 70;
    const durationSeconds = Math.max(1, Math.round((Date.now() - session.startTimeMs) / 1000));

    return {
      certification: session.certification,
      mode: session.mode,
      subMode: session.subMode,
      totalQuestions,
      correctCount,
      wrongCount,
      unansweredCount,
      percentage,
      scaledScore,
      passed,
      durationSeconds,
      domainBreakdown: Object.values(domainBreakdown),
      questionDetails
    };
  }
};
