import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateDaysUntil13th,
  validateWish,
  getThirteenReasons,
  getDefaultMemories,
  getDefaultCoupons,
} from './birthdayLogic.ts';

test('calculateDaysUntil13th correctly identifies celebration day on the 13th', () => {
  const on13th = new Date(2026, 10, 13, 14, 0, 0); // November 13th
  const result = calculateDaysUntil13th(on13th);
  assert.equal(result.isCelebrationDay, true);
  assert.equal(result.days, 0);
});

test('calculateDaysUntil13th calculates remaining days before the 13th', () => {
  const on10th = new Date(2026, 10, 10, 0, 0, 0); // November 10th
  const result = calculateDaysUntil13th(on10th);
  assert.equal(result.isCelebrationDay, false);
  assert.equal(result.days, 3);
});

test('validateWish provides romantic fallback when input is empty', () => {
  const result = validateWish('   ');
  assert.equal(result.isValid, true);
  assert.ok(result.cleaned.includes('Talha'));
});

test('validateWish enforces character length limit', () => {
  const longWish = 'A'.repeat(300);
  const result = validateWish(longWish);
  assert.equal(result.isValid, false);
  assert.equal(result.cleaned.length, 280);
});

test('getThirteenReasons returns exactly 13 unique items', () => {
  const reasons = getThirteenReasons();
  assert.equal(reasons.length, 13);
  const ids = new Set(reasons.map((r) => r.id));
  assert.equal(ids.size, 13);
  assert.equal(reasons[12].title, 'You Are Talha’s Forever Blessing');
});

test('getDefaultMemories and coupons return valid arrays', () => {
  const memories = getDefaultMemories();
  assert.ok(memories.length >= 5);
  const coupons = getDefaultCoupons();
  assert.equal(coupons.length, 4);
});
