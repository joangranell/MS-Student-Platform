/**
 * build-en-catalog.js — English Question Catalog Builder
 * Compiles all available English certification JSON files in data/en/ into data/en/questions.json
 */

const fs = require('fs');
const path = require('path');

const enDir = path.resolve(process.cwd(), 'data/en');
if (!fs.existsSync(enDir)) {
  console.log('No data/en directory found.');
  process.exit(0);
}

const jsonFiles = fs.readdirSync(enDir)
  .filter(f => f.endsWith('.json') && f !== 'questions.json')
  .sort();

let allEnQuestions = [];
const certCounts = {};

for (const file of jsonFiles) {
  const filePath = path.join(enDir, file);
  try {
    const raw = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (raw && Array.isArray(raw.questions)) {
      certCounts[raw.certification || file] = raw.questions.length;
      allEnQuestions = allEnQuestions.concat(raw.questions);
    }
  } catch (err) {
    console.error(`Error reading ${file}:`, err.message);
  }
}

const targetPath = path.join(enDir, 'questions.json');
const catalogData = {
  meta: {
    catalogVersion: '3.3.0',
    lastUpdated: '2026-11-09',
    language: 'en (English)',
    totalQuestions: allEnQuestions.length,
    certifications: certCounts
  },
  questions: allEnQuestions
};

fs.writeFileSync(targetPath, JSON.stringify(catalogData, null, 2), 'utf8');
console.log(`✅ Successfully generated data/en/questions.json (${allEnQuestions.length} English questions across ${Object.keys(certCounts).length} certifications).`);
