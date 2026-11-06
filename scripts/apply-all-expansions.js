/**
 * scripts/apply-all-expansions.js
 * Merges all new questions into data/dp900.json, data/dp600.json, and data/dp700.json
 * Reaches exactly 100 questions per certification (AZ-900: 100, DP-900: 100, DP-600: 100, DP-700: 100 = 400 total).
 */

import fs from 'fs';
import path from 'path';

import { dp900Questions } from './generate-expansion.js';
import { dp600Questions } from './questions-dp600-expansion.js';
import { dp600QuestionsPart2 } from './build-expansion-dp600.js';
import { dp600QuestionsPart3 } from './build-expansion-dp600-part3.js';
import { dp600QuestionsPart4 } from './build-expansion-dp600-part4.js';
import { dp700QuestionsPart1 } from './build-expansion-dp700-part1.js';
import { dp700QuestionsPart2 } from './build-expansion-dp700-part2.js';

function mergeQuestions(filePath, newQuestions, expectedTotal) {
  const fullPath = path.resolve(filePath);
  const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));

  const existingMap = new Map();
  for (const q of data.questions) {
    existingMap.set(q.id, q);
  }

  let added = 0;
  for (const q of newQuestions) {
    if (!existingMap.has(q.id)) {
      data.questions.push(q);
      existingMap.set(q.id, q);
      added++;
    }
  }

  // Update metadata
  if (!data.metadata) data.metadata = {};
  data.metadata.lastReviewed = '2026-11-02';

  fs.writeFileSync(fullPath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`Updated ${filePath}: +${added} questions (Total: ${data.questions.length}/${expectedTotal})`);
}

console.log('--- Applying Expansions to Reach 100 Questions per Certification ---');

// 1. DP-900
mergeQuestions('data/dp900.json', dp900Questions, 100);

// 2. DP-600
const allDp600 = [
  ...dp600Questions,
  ...dp600QuestionsPart2,
  ...dp600QuestionsPart3,
  ...dp600QuestionsPart4
];
mergeQuestions('data/dp600.json', allDp600, 100);

// 3. DP-700
const allDp700 = [
  ...dp700QuestionsPart1,
  ...dp700QuestionsPart2
];
mergeQuestions('data/dp700.json', allDp700, 100);

console.log('All modular JSON files updated successfully.');
