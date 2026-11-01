/**
 * build-catalog.js — Unified Question Catalog Builder & CI Verification Tool
 *
 * Usage:
 *   node scripts/build-catalog.js         # Builds and updates data/questions.json
 *   node scripts/build-catalog.js --check # Verifies in CI that data/questions.json is in sync
 */

const fs = require('fs');
const path = require('path');

const isCheckOnly = process.argv.includes('--check');

const certFiles = [
  { cert: 'AZ-900', file: 'data/az900.json' },
  { cert: 'DP-900', file: 'data/dp900.json' },
  { cert: 'DP-600', file: 'data/dp600.json' },
  { cert: 'DP-700', file: 'data/dp700.json' }
];

let allQuestions = [];
const certCounts = {};
const certMetadata = {};
let errors = 0;
const seenIds = new Set();

for (const { cert, file } of certFiles) {
  const filePath = path.resolve(process.cwd(), file);
  if (!fs.existsSync(filePath)) {
    console.error(`[ERROR] File not found: ${file}`);
    errors++;
    continue;
  }

  let content;
  try {
    content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (err) {
    console.error(`[ERROR] Failed to parse JSON in ${file}: ${err.message}`);
    errors++;
    continue;
  }

  certCounts[cert] = content.questions ? content.questions.length : 0;
  certMetadata[cert] = content.metadata || {
    lastReviewed: '2026-11-01',
    skillsOutlineVersion: '2025/2026',
    idioma: 'es (Español)'
  };

  if (!Array.isArray(content.questions) || content.questions.length === 0) {
    console.error(`[ERROR] ${file} has no questions array!`);
    errors++;
    continue;
  }

  for (let idx = 0; idx < content.questions.length; idx++) {
    const q = content.questions[idx];

    // Check unique ID
    if (!q.id) {
      console.error(`[ERROR] Question at index ${idx} in ${file} has no ID`);
      errors++;
    } else if (seenIds.has(q.id)) {
      console.error(`[ERROR] Duplicate question ID detected: ${q.id} in ${file}`);
      errors++;
    } else {
      seenIds.add(q.id);
    }

    // Check certification matches
    if (q.certification !== cert) {
      console.error(`[ERROR] Question ${q.id} certification mismatch: expected ${cert}, got ${q.certification}`);
      errors++;
    }

    // Check domain and stem
    if (!q.domain || typeof q.domain !== 'string') {
      console.error(`[ERROR] Question ${q.id} missing domain`);
      errors++;
    }
    if (!q.stem || typeof q.stem !== 'string' || q.stem.trim().length === 0) {
      console.error(`[ERROR] Question ${q.id} missing stem`);
      errors++;
    }

    // Check options
    if (!Array.isArray(q.options) || q.options.length < 2) {
      console.error(`[ERROR] Question ${q.id} has fewer than 2 options`);
      errors++;
    } else {
      const correctOpts = q.options.filter(o => o.isCorrect === true);
      const reqSel = q.requiredSelections || 1;
      if (correctOpts.length === 0) {
        console.error(`[ERROR] Question ${q.id} has no correct option marked!`);
        errors++;
      }
      if (correctOpts.length !== reqSel) {
        console.error(`[ERROR] Question ${q.id}: isCorrect count (${correctOpts.length}) does not match requiredSelections (${reqSel})`);
        errors++;
      }
      // Check every option has id and text
      q.options.forEach((opt, oIdx) => {
        if (!opt.id || !opt.text) {
          console.error(`[ERROR] Question ${q.id} option at [${oIdx}] missing id or text`);
          errors++;
        }
      });
    }

    // Check explanation & theoryPill
    if (!q.explanation || typeof q.explanation !== 'string') {
      console.error(`[ERROR] Question ${q.id} missing explanation`);
      errors++;
    }
    if (!q.theoryPill || !q.theoryPill.title || !q.theoryPill.summary || !q.theoryPill.examTrap) {
      console.error(`[ERROR] Question ${q.id} missing complete theoryPill (title, summary, examTrap)`);
      errors++;
    }

    // Check references
    if (!Array.isArray(q.references) || q.references.length === 0) {
      console.error(`[ERROR] Question ${q.id} missing references`);
      errors++;
    }
  }

  allQuestions = allQuestions.concat(content.questions);
}

console.log('--- Question Catalog Summary ---');
console.log(`  AZ-900: ${certCounts['AZ-900'] || 0} questions`);
console.log(`  DP-900: ${certCounts['DP-900'] || 0} questions`);
console.log(`  DP-600: ${certCounts['DP-600'] || 0} questions`);
console.log(`  DP-700: ${certCounts['DP-700'] || 0} questions`);
console.log(`  TOTAL : ${allQuestions.length} questions`);

if (errors > 0) {
  console.error(`\n❌ Integrity validation failed with ${errors} error(s).`);
  process.exit(1);
}

const targetPath = path.resolve(process.cwd(), 'data/questions.json');

const catalogData = {
  meta: {
    catalogVersion: '3.1.0',
    lastUpdated: '2026-11-01',
    totalQuestions: allQuestions.length,
    certifications: certCounts,
    certificationMetadata: certMetadata
  },
  questions: allQuestions
};

const newJsonString = JSON.stringify(catalogData, null, 2);

if (isCheckOnly) {
  if (!fs.existsSync(targetPath)) {
    console.error(`\n❌ --check failed: ${targetPath} does not exist.`);
    process.exit(1);
  }
  const existingJsonString = fs.readFileSync(targetPath, 'utf8');
  let existingObj;
  try {
    existingObj = JSON.parse(existingJsonString);
  } catch (err) {
    console.error(`\n❌ --check failed: data/questions.json contains invalid JSON: ${err.message}`);
    process.exit(1);
  }

  // Compare questions length and IDs
  if (existingObj.questions.length !== allQuestions.length) {
    console.error(`\n❌ --check failed: data/questions.json count (${existingObj.questions.length}) does not match source files (${allQuestions.length}). Run 'node scripts/build-catalog.js' to update.`);
    process.exit(1);
  }

  const existingIds = existingObj.questions.map(q => q.id).join(',');
  const builtIds = allQuestions.map(q => q.id).join(',');
  if (existingIds !== builtIds) {
    console.error(`\n❌ --check failed: Question IDs in data/questions.json are out of sync with source files. Run 'node scripts/build-catalog.js'.`);
    process.exit(1);
  }

  console.log('\n✅ --check passed: data/questions.json is 100% in sync with modular certification files.');
} else {
  fs.writeFileSync(targetPath, newJsonString, 'utf8');
  console.log(`\n✅ Successfully generated data/questions.json (${allQuestions.length} questions).`);
}
