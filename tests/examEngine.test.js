/**
 * tests/examEngine.test.js
 * Unit test suite for ExamEngine and Leitner Spaced Repetition (Node.js native test runner: node:test)
 */

import test from 'node:test';
import assert from 'node:assert/strict';

import { ExamEngine, shuffleArray } from '../js/examEngine.js';
import {
  LEITNER_INTERVALS_DAYS,
  calculateNextReview,
  migrateProfileToV2,
  getStudyStreak,
  getMasteredThisWeekCount
} from '../js/storage.js';

test('ExamEngine.calculateScaledScore: calculates Microsoft 100-1000 scaled score correctly', () => {
  // Edge cases
  assert.equal(ExamEngine.calculateScaledScore(0, 0), 100, '0/0 should default to 100');
  assert.equal(ExamEngine.calculateScaledScore(0, 50), 100, '0% accuracy should give 100 points');
  assert.equal(ExamEngine.calculateScaledScore(50, 50), 1000, '100% accuracy should give 1000 points');

  // Passing threshold (70% = 700 points)
  assert.equal(ExamEngine.calculateScaledScore(35, 50), 700, '70% accuracy should give exactly 700 points');
  assert.equal(ExamEngine.calculateScaledScore(7, 10), 700, '7/10 should give 700 points');

  // Below 70%
  const scoreBelow = ExamEngine.calculateScaledScore(17.5, 50); // 35%
  assert.equal(scoreBelow, 400, '35% accuracy should scale to 400 points');

  // Above 70%
  const scoreAbove = ExamEngine.calculateScaledScore(42.5, 50); // 85% -> 700 + (0.15/0.30)*300 = 850
  assert.equal(scoreAbove, 850, '85% accuracy should scale to 850 points');
});

test('shuffleArray: preserves length, items and handles boundary conditions', () => {
  const original = ['A', 'B', 'C', 'D', 'E'];
  const shuffled = shuffleArray(original);

  assert.equal(shuffled.length, original.length, 'Length must be preserved');
  for (const item of original) {
    assert.ok(shuffled.includes(item), `Item ${item} must be present`);
  }

  // Empty and single-item
  assert.deepEqual(shuffleArray([]), []);
  assert.deepEqual(shuffleArray([42]), [42]);
});

test('ExamEngine.filterQuestions: enforces strict certification isolation', () => {
  const mockQuestions = [
    { id: 'AZ-1', certification: 'AZ-900', difficulty: 'basic', domain: 'D1' },
    { id: 'AZ-2', certification: 'AZ-900', difficulty: 'hardcore', domain: 'D2' },
    { id: 'DP6-1', certification: 'DP-600', difficulty: 'basic', domain: 'D1' },
    { id: 'DP6-2', certification: 'DP-600', difficulty: 'hardcore', domain: 'D2', hasCodeSnippet: true },
    { id: 'DP7-1', certification: 'DP-700', difficulty: 'basic', domain: 'D1' }
  ];

  const profile = { targetCert: 'DP-600' };

  // Strict DP-600 isolation
  const dp600Only = ExamEngine.filterQuestions(
    mockQuestions,
    { certification: 'DP-600', mode: 'exam' },
    profile
  );
  assert.equal(dp600Only.length, 2);
  assert.ok(dp600Only.every(q => q.certification === 'DP-600'), 'Never mix non-DP-600 questions');

  // Strict AZ-900 isolation
  const az900Only = ExamEngine.filterQuestions(
    mockQuestions,
    { certification: 'AZ-900', mode: 'exam' },
    profile
  );
  assert.equal(az900Only.length, 2);
  assert.ok(az900Only.every(q => q.certification === 'AZ-900'), 'AZ-900 filter must contain AZ-900 questions only');

  // Filter by code questions
  const codeOnly = ExamEngine.filterQuestions(
    mockQuestions,
    { certification: 'DP-600', mode: 'study', subMode: 'code' },
    profile
  );
  assert.equal(codeOnly.length, 1);
  assert.equal(codeOnly[0].id, 'DP6-2');
});

test('ExamEngine.buildSessionQuestions: formats options, letters and required selections', () => {
  const pool = [
    {
      id: 'Q1',
      stem: 'Pregunta de prueba',
      options: [
        { id: 'opt1', text: 'Respuesta 1', isCorrect: true },
        { id: 'opt2', text: 'Respuesta 2', isCorrect: false },
        { id: 'opt3', text: 'Respuesta 3', isCorrect: false }
      ]
    }
  ];

  const sessionQuestions = ExamEngine.buildSessionQuestions(pool, 1, false, null);
  assert.equal(sessionQuestions.length, 1);
  const q = sessionQuestions[0];
  assert.equal(q.questionType, 'single');
  assert.equal(q.requiredSelections, 1);
  assert.equal(q.shuffledOptions.length, 3);
  assert.ok(['A', 'B', 'C'].includes(q.shuffledOptions[0].letter));
});

test('ExamEngine.computeAdaptivePriority: prioritizes failed and overdue items over mastered items', () => {
  const now = new Date();
  const past = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString();
  const future = new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000).toISOString();

  const profile = {
    failedQuestionIds: ['Q-FAILED'],
    questionMastery: {
      'Q-FAILED': { box: 0, fails: 3, lastSeen: past, nextReview: past },
      'Q-OVERDUE': { box: 1, fails: 0, lastSeen: past, nextReview: past },
      'Q-MASTERED': { box: 4, fails: 0, lastSeen: now.toISOString(), nextReview: future }
    },
    topicStats: {}
  };

  const pFailed = ExamEngine.computeAdaptivePriority({ id: 'Q-FAILED', topicIcon: 'fabric' }, profile);
  const pOverdue = ExamEngine.computeAdaptivePriority({ id: 'Q-OVERDUE', topicIcon: 'fabric' }, profile);
  const pMastered = ExamEngine.computeAdaptivePriority({ id: 'Q-MASTERED', topicIcon: 'fabric' }, profile);

  assert.ok(pFailed > pOverdue, 'Failed Box 0 question must have higher priority than overdue Box 1');
  assert.ok(pOverdue > pMastered, 'Overdue question must have higher priority than future mastered question');
});

test('calculateNextReview & LEITNER_INTERVALS_DAYS: calculates correct intervals', () => {
  assert.equal(LEITNER_INTERVALS_DAYS[0], 0, 'Box 0 is 0 days');
  assert.equal(LEITNER_INTERVALS_DAYS[1], 1, 'Box 1 is 1 day');
  assert.equal(LEITNER_INTERVALS_DAYS[2], 3, 'Box 2 is 3 days');
  assert.equal(LEITNER_INTERVALS_DAYS[3], 7, 'Box 3 is 7 days');
  assert.equal(LEITNER_INTERVALS_DAYS[4], 21, 'Box 4 is 21 days');

  const baseDate = new Date('2026-11-01T12:00:00.000Z');
  const reviewBox1 = calculateNextReview(1, baseDate);
  const reviewBox4 = calculateNextReview(4, baseDate);

  assert.equal(new Date(reviewBox1).toISOString(), '2026-11-02T12:00:00.000Z', 'Box 1 should be next day');
  assert.equal(new Date(reviewBox4).toISOString(), '2026-11-22T12:00:00.000Z', 'Box 4 should be 21 days later');
});

test('migrateProfileToV2: migrates legacy schema to v2 without data loss', () => {
  const legacyProfile = {
    id: 'user_legacy',
    name: 'Ana García',
    targetCert: 'DP-600',
    questionMastery: {
      'DP600-001': {
        box: 3,
        totalHits: 4,
        consecutiveHits: 3,
        lastSeen: '2026-10-20T10:00:00.000Z'
      },
      'DP600-002': {
        box: 1,
        totalFails: 1,
        totalHits: 1,
        lastSeen: '2026-10-25T10:00:00.000Z'
      }
    }
  };

  const migrated = migrateProfileToV2(legacyProfile);

  // Box 3 with >= 3 consecutive hits should promote to Box 4 (mastered)
  assert.equal(migrated.questionMastery['DP600-001'].box, 4);
  assert.ok(migrated.masteredIds.includes('DP600-001'), 'Mastered question should be in masteredIds');
  assert.ok(migrated.questionMastery['DP600-001'].nextReview, 'nextReview must be populated');

  // Box 1 must have valid streak, nextReview and attempts
  const m2 = migrated.questionMastery['DP600-002'];
  assert.equal(m2.box, 1);
  assert.equal(m2.attempts, 2);
  assert.ok(m2.nextReview);
});

test('ExamEngine.evaluateSession: evaluates results and identifies rush questions', () => {
  const session = {
    certification: 'DP-600',
    mode: 'exam',
    questions: [
      {
        id: 'Q1',
        domain: 'Arquitectura Fabric',
        shuffledOptions: [
          { id: 'optA', text: 'Correcta', isCorrect: true },
          { id: 'optB', text: 'Incorrecta', isCorrect: false }
        ]
      },
      {
        id: 'Q2',
        domain: 'Seguridad',
        shuffledOptions: [
          { id: 'optC', text: 'Correcta', isCorrect: true },
          { id: 'optD', text: 'Incorrecta', isCorrect: false }
        ]
      }
    ],
    answers: {
      'Q1': ['optA'], // Correct, time = 40s
      'Q2': ['optD']  // Wrong, time = 8s -> rush question!
    },
    timeSpent: {
      'Q1': 40,
      'Q2': 8
    },
    confidences: {}
  };

  const result = ExamEngine.evaluateSession(session);

  assert.equal(result.totalQuestions, 2);
  assert.equal(result.correctCount, 1);
  assert.equal(result.wrongCount, 1);
  assert.equal(result.scaledScore, ExamEngine.calculateScaledScore(1, 2));

  // Domain breakdown
  const domFabric = result.domainBreakdown.find(d => d.domain === 'Arquitectura Fabric');
  const domSec = result.domainBreakdown.find(d => d.domain === 'Seguridad');
  assert.ok(domFabric, 'Domain breakdown should contain Arquitectura Fabric');
  assert.equal(domFabric.percentage, 100);
  assert.equal(domSec.percentage, 0);

  // Rush questions warning
  assert.equal(result.rushQuestions.length, 1);
  assert.equal(result.rushQuestions[0].questionId, 'Q2');
  assert.equal(result.rushQuestions[0].secondsSpent, 8);
});
