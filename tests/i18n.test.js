/**
 * tests/i18n.test.js
 * Unit test suite for I18n translation system
 */

import test from 'node:test';
import assert from 'node:assert/strict';

// Mock localStorage for headless Node.js test environment
const memoryStore = {};
global.localStorage = {
  getItem: (k) => memoryStore[k] || null,
  setItem: (k, v) => { memoryStore[k] = String(v); },
  removeItem: (k) => { delete memoryStore[k]; },
  clear: () => { Object.keys(memoryStore).forEach(k => delete memoryStore[k]); }
};

import { I18n, TRANSLATIONS } from '../js/i18n.js';

test('I18n: default translation returns Spanish', () => {
  I18n.setLang('es');
  assert.equal(I18n.getLang(), 'es');
  assert.equal(I18n.t('lightMode'), 'Modo Claro');
  assert.equal(I18n.t('cheatSheet'), 'Hoja de Trucos');
});

test('I18n: switching to English returns English text', () => {
  I18n.setLang('en');
  assert.equal(I18n.getLang(), 'en');
  assert.equal(I18n.t('lightMode'), 'Light Mode');
  assert.equal(I18n.t('cheatSheet'), 'Cheat Sheet');
  assert.equal(I18n.t('studentName'), 'Student Name');
});

test('I18n: parameter replacement works properly', () => {
  I18n.setLang('es');
  assert.equal(
    I18n.t('multiSelectInstruction', { count: '2' }),
    'Selecciona 2 respuestas correctas:'
  );

  I18n.setLang('en');
  assert.equal(
    I18n.t('multiSelectInstruction', { count: '3' }),
    'Select 3 correct answers:'
  );
});

test('I18n: toggleLang flips between es and en', () => {
  I18n.setLang('es');
  const next = I18n.toggleLang();
  assert.equal(next, 'en');
  assert.equal(I18n.getLang(), 'en');

  const back = I18n.toggleLang();
  assert.equal(back, 'es');
  assert.equal(I18n.getLang(), 'es');
});

test('I18n: fallback to key when not found', () => {
  assert.equal(I18n.t('nonExistentKey123'), 'nonExistentKey123');
});

test('I18n: target cert modal translations exist in ES and EN', () => {
  I18n.setLang('es');
  assert.equal(I18n.t('trackData'), 'Datos y BI');
  assert.equal(I18n.t('trackAi'), 'IA y Copilot');
  assert.equal(I18n.t('levelFundamentals'), 'Fundamentos');
  assert.equal(I18n.t('levelAssociate'), 'Associate');
  assert.equal(I18n.t('targetCertModalTitle', { name: 'Lucía' }), 'Configura el Plan de Estudio para Lucía');

  I18n.setLang('en');
  assert.equal(I18n.t('trackData'), 'Data and BI');
  assert.equal(I18n.t('trackAi'), 'AI and Copilot');
  assert.equal(I18n.t('levelFundamentals'), 'Fundamentals');
  assert.equal(I18n.t('levelAssociate'), 'Associate');
  assert.equal(I18n.t('targetCertModalTitle', { name: 'Lucía' }), 'Set Up the Study Plan for Lucía');
});
