import fs from 'fs';
import path from 'path';

import { dp700Batch3 } from './build-expansion-dp700-batch3.js';
import { dp700Batch4 } from './build-expansion-dp700-batch4.js';

const dp700Path = path.resolve('data/dp700.json');
const dp700 = JSON.parse(fs.readFileSync(dp700Path, 'utf8'));
console.log('Current DP-700 questions:', dp700.questions.length);

const existingIds = new Set(dp700.questions.map(q => q.id));
const toAdd = [...dp700Batch3, ...dp700Batch4];
let added = 0;
for (const q of toAdd) {
  if (!existingIds.has(q.id)) {
    dp700.questions.push(q);
    existingIds.add(q.id);
    added++;
  } else {
    console.warn('Duplicate ID skipped:', q.id);
  }
}

if (!dp700.metadata) dp700.metadata = {};
dp700.metadata.lastReviewed = '2026-11-03';

fs.writeFileSync(dp700Path, JSON.stringify(dp700, null, 2) + '\n', 'utf8');
console.log(`Added ${added} questions. Total DP-700 questions: ${dp700.questions.length}/120`);
