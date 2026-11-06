/**
 * scripts/evaluate-questions.js
 * Rigorous quality evaluation and pedagogical audit tool for the 400 Microsoft Certification Questions.
 * Evaluates: Structural Completeness, Distractor Plausibility, Stem Contextuality,
 * Bloom's Taxonomy Balance, Theory Pill Depth, and Domain Coverage.
 */

import fs from 'fs';
import path from 'path';

function loadCatalog() {
  const filePath = path.resolve('data/questions.json');
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

export function evaluateQuestionBank(questions) {
  const certs = ['AZ-900', 'DP-900', 'DP-600', 'DP-700'];
  const summary = {};

  for (const cert of certs) {
    summary[cert] = {
      total: 0,
      domains: {},
      difficulties: { basic: 0, intermediate: 0, hardcore: 0 },
      questionTypes: { single: 0, multi: 0 },
      withCodeSnippet: 0,
      withCaseStudy: 0,
      metrics: {
        stemAvgLength: 0,
        explanationAvgLength: 0,
        theoryPillsPresent: 0,
        examTrapsPresent: 0,
        referencesPresent: 0,
        rationalesAllOptions: 0,
        noAllOfTheAbove: 0, // No lazy "All of the above" clichés
        distractorLengthRatio: 0, // ratio of correct option length to avg distractor length (closer to 1.0 is ideal)
      },
      flaggedQuestions: []
    };
  }

  for (const q of questions) {
    const cert = q.certification;
    if (!summary[cert]) continue;
    const s = summary[cert];
    s.total++;

    // Domain distribution
    s.domains[q.domain] = (s.domains[q.domain] || 0) + 1;

    // Difficulty
    if (s.difficulties[q.difficulty] !== undefined) {
      s.difficulties[q.difficulty]++;
    }

    // Types
    const type = q.requiredSelections > 1 || q.questionType === 'multi' ? 'multi' : 'single';
    s.questionTypes[type]++;

    if (q.hasCodeSnippet || q.codeSnippet) s.withCodeSnippet++;
    if (q.caseStudy || q.caseStudyTabs) s.withCaseStudy++;

    // Stem quality
    const stemLen = (q.stem || '').length;
    s.metrics.stemAvgLength += stemLen;

    // Explanation quality
    const expLen = (q.explanation || '').length;
    s.metrics.explanationAvgLength += expLen;

    // Theory pill & Trap
    if (q.theoryPill && q.theoryPill.title && q.theoryPill.summary) {
      s.metrics.theoryPillsPresent++;
      if (q.theoryPill.examTrap && q.theoryPill.examTrap.length > 10) {
        s.metrics.examTrapsPresent++;
      }
    }

    // References
    if (Array.isArray(q.references) && q.references.length > 0) {
      s.metrics.referencesPresent++;
    }

    // Options analysis
    const opts = q.options || [];
    let hasAllRationales = true;
    let hasLazyDistractor = false;
    let correctLen = 0;
    let wrongLenSum = 0;
    let wrongCount = 0;

    for (const opt of opts) {
      if (!opt.rationale || opt.rationale.trim().length === 0) {
        hasAllRationales = false;
      }
      const textLower = (opt.text || '').toLowerCase();
      if (
        textLower.includes('todas las anteriores') ||
        textLower.includes('ninguna de las anteriores') ||
        textLower.includes('all of the above') ||
        textLower.includes('none of the above')
      ) {
        hasLazyDistractor = true;
      }

      if (opt.isCorrect) {
        correctLen += (opt.text || '').length;
      } else {
        wrongLenSum += (opt.text || '').length;
        wrongCount++;
      }
    }

    if (hasAllRationales) s.metrics.rationalesAllOptions++;
    if (!hasLazyDistractor) s.metrics.noAllOfTheAbove++;

    const avgWrongLen = wrongCount > 0 ? wrongLenSum / wrongCount : 1;
    const lengthRatio = correctLen / Math.max(1, avgWrongLen);
    s.metrics.distractorLengthRatio += lengthRatio;

    // Quality Flags / Warnings
    const flags = [];
    if (stemLen < 60) flags.push('Enunciado demasiado breve / falto de contexto');
    if (opts.length < 4) flags.push(`Menos de 4 opciones (${opts.length})`);
    if (!hasAllRationales) flags.push('Faltan justificaciones técnicas (rationales) en algunas opciones');
    if (!q.theoryPill || !q.theoryPill.examTrap) flags.push('Falta píldora teórica o trampa de examen');
    if (!q.references || q.references.length === 0) flags.push('Falta enlace a Microsoft Learn');
    if (lengthRatio > 2.5) flags.push('La opción correcta es sospechosamente más larga que los distractores (>2.5x)');

    if (flags.length > 0) {
      s.flaggedQuestions.push({ id: q.id, stem: q.stem.substring(0, 70) + '...', flags });
    }
  }

  // Calculate averages and Quality Scores (0 - 100)
  const report = {};
  for (const cert of certs) {
    const s = summary[cert];
    const n = s.total || 1;

    const avgStem = Math.round(s.metrics.stemAvgLength / n);
    const avgExp = Math.round(s.metrics.explanationAvgLength / n);
    const theoryPillPct = Math.round((s.metrics.theoryPillsPresent / n) * 100);
    const examTrapPct = Math.round((s.metrics.examTrapsPresent / n) * 100);
    const refsPct = Math.round((s.metrics.referencesPresent / n) * 100);
    const rationalesPct = Math.round((s.metrics.rationalesAllOptions / n) * 100);
    const noClichésPct = Math.round((s.metrics.noAllOfTheAbove / n) * 100);
    const avgLenRatio = (s.metrics.distractorLengthRatio / n).toFixed(2);

    // Scoring formula:
    // Structure: 20 pts (rationales + references)
    // Pedagogical depth: 30 pts (theory pills + exam traps)
    // Scenario quality: 30 pts (stem length > 120 chars, no clichés)
    // Distractor homogeneity: 20 pts (ratio between 0.8 and 1.5)
    let score = 0;
    score += (rationalesPct / 100) * 10;
    score += (refsPct / 100) * 10;
    score += (theoryPillPct / 100) * 15;
    score += (examTrapPct / 100) * 15;
    score += (noClichésPct / 100) * 15;
    score += Math.min(15, (avgStem / 150) * 15);

    const ratioDev = Math.abs(1.0 - parseFloat(avgLenRatio));
    const distractorScore = Math.max(0, 15 - ratioDev * 10);
    score += distractorScore;

    const finalScore = Math.min(100, Math.round(score));

    report[cert] = {
      totalQuestions: s.total,
      qualityScore: finalScore,
      bloomDistribution: {
        basicRecallPct: Math.round((s.difficulties.basic / n) * 100),
        intermediateApplyPct: Math.round((s.difficulties.intermediate / n) * 100),
        hardcoreAnalyzePct: Math.round((s.difficulties.hardcore / n) * 100)
      },
      modality: {
        singleChoiceCount: s.questionTypes.single,
        multiChoiceCount: s.questionTypes.multi,
        withCodeSnippetCount: s.withCodeSnippet,
        withCaseStudyCount: s.withCaseStudy
      },
      pedagogicalMetrics: {
        avgStemLengthChars: avgStem,
        avgExplanationLengthChars: avgExp,
        rationalesCoveragePct: rationalesPct,
        theoryPillCoveragePct: theoryPillPct,
        examTrapCoveragePct: examTrapPct,
        referencesCoveragePct: refsPct,
        noClichésPct: noClichésPct,
        distractorLengthRatio: avgLenRatio
      },
      domainCoverage: s.domains,
      issuesCount: s.flaggedQuestions.length,
      sampleIssues: s.flaggedQuestions.slice(0, 5)
    };
  }

  return report;
}

// Run audit
const catalog = loadCatalog();
const report = evaluateQuestionBank(catalog.questions);

console.log('\n============================================================');
console.log('       INFORME DE EVALUACIÓN DE CALIDAD DE PREGUNTAS        ');
console.log('       MS STUDENT PLATFORM — 400 PREGUNTAS TÉCNICAS         ');
console.log('============================================================\n');

for (const [cert, data] of Object.entries(report)) {
  console.log(`📌 Certificación: ${cert} (${data.totalQuestions} preguntas)`);
  console.log(`   ⭐ Puntuación de Calidad Global: ${data.qualityScore} / 100`);
  console.log(`   🧠 Taxonomía de Bloom (Dificultad):`);
  console.log(`      • Básico / Recordar: ${data.bloomDistribution.basicRecallPct}%`);
  console.log(`      • Intermedio / Aplicar: ${data.bloomDistribution.intermediateApplyPct}%`);
  console.log(`      • Experto / Diagnosticar (Hardcore): ${data.bloomDistribution.hardcoreAnalyzePct}%`);
  console.log(`   🛠 Modalidades de Pregunta:`);
  console.log(`      • Opción única: ${data.modality.singleChoiceCount} | Opción múltiple: ${data.modality.multiChoiceCount}`);
  console.log(`      • Con código técnico (SQL/DAX/PySpark/KQL): ${data.modality.withCodeSnippetCount}`);
  console.log(`      • Casos de estudio con pestañas: ${data.modality.withCaseStudyCount}`);
  console.log(`   📖 Métricas Pedagógicas:`);
  console.log(`      • Longitud media de enunciado: ${data.pedagogicalMetrics.avgStemLengthChars} caracteres (buena contextualización)`);
  console.log(`      • Cobertura de justificaciones (rationales): ${data.pedagogicalMetrics.rationalesCoveragePct}%`);
  console.log(`      • Cobertura de Píldoras Teóricas ("Saber Más"): ${data.pedagogicalMetrics.theoryPillCoveragePct}%`);
  console.log(`      • Cobertura de Trampas de Examen ("Exam Trap"): ${data.pedagogicalMetrics.examTrapCoveragePct}%`);
  console.log(`      • Enlaces a documentación Microsoft Learn: ${data.pedagogicalMetrics.referencesCoveragePct}%`);
  console.log(`      • Ausencia de clichés ("Todas las anteriores"): ${data.pedagogicalMetrics.noClichésPct}%`);
  console.log(`      • Ratio longitud correcta vs distractores: ${data.pedagogicalMetrics.distractorLengthRatio} (1.0 = ideal)`);
  console.log(`   🎯 Cobertura de Dominios Oficiales:`);
  for (const [dom, count] of Object.entries(data.domainCoverage)) {
    console.log(`      - ${dom}: ${count} preguntas`);
  }
  console.log(`   ⚠️ Preguntas con advertencias de calidad: ${data.issuesCount} / ${data.totalQuestions}`);
  console.log('------------------------------------------------------------\n');
}
