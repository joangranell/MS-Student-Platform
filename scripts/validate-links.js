/**
 * validate-links.js — Automated Microsoft Learn Link Health Checker
 *
 * Verifies that all references and documentation URLs in questions.json respond
 * with HTTP 200/3xx. Designed for GitHub Actions CI without external npm dependencies.
 */

const fs = require('fs');
const path = require('path');

const catalogPath = path.resolve(process.cwd(), 'data/questions.json');
if (!fs.existsSync(catalogPath)) {
  console.error('[ERROR] data/questions.json does not exist. Run scripts/build-catalog.js first.');
  process.exit(1);
}

const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
const questions = catalog.questions || [];

// Collect and deduplicate all URLs
const urlMap = new Map(); // url -> Array of question IDs where it appears

questions.forEach((q) => {
  if (Array.isArray(q.references)) {
    q.references.forEach((ref) => {
      if (ref && ref.url && ref.url.startsWith('http')) {
        const list = urlMap.get(ref.url) || [];
        list.push(q.id);
        urlMap.set(ref.url, list);
      }
    });
  }
});

const uniqueUrls = Array.from(urlMap.keys());
console.log(`\n--- Validating ${uniqueUrls.length} unique Microsoft Learn URLs across ${questions.length} questions ---`);

const CONCURRENCY = 5;
const TIMEOUT_MS = 10000;

async function checkUrl(url) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; MSStudentPlatformValidator/1.0; +https://github.com/joangranell/MS-Student-Platform)'
      },
      signal: controller.signal,
      redirect: 'follow'
    });
    clearTimeout(timeoutId);
    return { url, status: res.status, ok: res.status >= 200 && res.status < 400 };
  } catch (err) {
    clearTimeout(timeoutId);
    return { url, status: 0, ok: false, error: err.name === 'AbortError' ? 'Timeout' : err.message };
  }
}

async function validateAll() {
  let index = 0;
  const results = [];
  let brokenCount = 0;
  let okCount = 0;

  async function worker() {
    while (index < uniqueUrls.length) {
      const currentIndex = index++;
      const url = uniqueUrls[currentIndex];
      const res = await checkUrl(url);
      results.push(res);

      if (res.ok) {
        okCount++;
        process.stdout.write('.');
      } else {
        brokenCount++;
        process.stdout.write('X');
      }
    }
  }

  // Sample or full check depending on CLI arg
  const isSample = process.argv.includes('--sample');
  if (isSample) {
    uniqueUrls.splice(15); // Check first 15 for fast verification
    console.log(`(Running fast sample check on 15 URLs)`);
  }

  const workers = Array.from({ length: Math.min(CONCURRENCY, uniqueUrls.length) }, () => worker());
  await Promise.all(workers);

  console.log('\n\n--- Link Validation Results ---');
  console.log(`  Total URLs checked : ${results.length}`);
  console.log(`  Valid (200-399)    : ${okCount}`);
  console.log(`  Broken or Timeout  : ${brokenCount}`);

  if (brokenCount > 0) {
    console.log('\n⚠️ Issues detected:');
    results.filter(r => !r.ok).forEach(r => {
      const qIds = urlMap.get(r.url) || [];
      console.log(`  • [Status ${r.status || r.error}] ${r.url} (Used in: ${qIds.slice(0, 3).join(', ')}${qIds.length > 3 ? '...' : ''})`);
    });
  } else {
    console.log('\n✅ All checked URLs responded successfully!');
  }

  // Non-blocking for CI as specified in requirements
  if (process.argv.includes('--strict') && brokenCount > 0) {
    process.exit(1);
  }
}

validateAll().catch((err) => {
  console.error('Fatal validation error:', err);
  process.exit(0);
});
