import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getThailandDate,
  calculateThailandCountdown,
  validateUnlockPasscode,
  isCountdownComplete,
  THAI_LOVE_PHRASES,
} from './thaiTime.ts';

test('getThailandDate returns a valid Date with UTC+7 adjustment', () => {
  const utcDate = new Date(Date.UTC(2026, 10, 10, 17, 0, 0)); // 17:00 UTC
  const thaiDate = getThailandDate(utcDate);
  // 17:00 UTC + 7 hours = 00:00 next day (Nov 11)
  assert.equal(thaiDate.getDate(), 11);
  assert.equal(thaiDate.getHours(), 0);
});

test('calculateThailandCountdown unlocks when date is the 13th in Thailand', () => {
  const on13thUtc = new Date(Date.UTC(2026, 10, 12, 18, 0, 0)); // Nov 13, 01:00 AM ICT
  const countdown = calculateThailandCountdown(on13thUtc);
  assert.equal(countdown.isUnlocked, true);
  assert.equal(countdown.days, 0);
  assert.equal(countdown.hours, 0);
});

test('calculateThailandCountdown counts down when before the 13th in Thailand', () => {
  const on11thUtc = new Date(Date.UTC(2026, 10, 10, 18, 0, 0)); // Nov 11, 01:00 AM ICT
  const countdown = calculateThailandCountdown(on11thUtc);
  assert.equal(countdown.isUnlocked, false);
  assert.ok(countdown.days >= 1);
});

test('validateUnlockPasscode accepts valid secret codes', () => {
  assert.equal(validateUnlockPasscode('bb13'), true);
  assert.equal(validateUnlockPasscode('TALHA'), true);
  assert.equal(validateUnlockPasscode('wrongcode'), false);
});

test('isCountdownComplete detects when countdown reaches zero', () => {
  const completeCountdown: any = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isUnlocked: true,
  };
  const incompleteCountdown: any = {
    days: 1,
    hours: 5,
    minutes: 20,
    seconds: 10,
    isUnlocked: false,
  };
  assert.equal(isCountdownComplete(completeCountdown), true);
  assert.equal(isCountdownComplete(incompleteCountdown), false);
});

test('THAI_LOVE_PHRASES has expected Thai strings', () => {
  assert.ok(THAI_LOVE_PHRASES.happyBirthday.includes('สุขสันต์วันเกิด'));
  assert.ok(THAI_LOVE_PHRASES.loveYouMost.includes('รักบีบี'));
  assert.ok(THAI_LOVE_PHRASES.timeIsFullCelebration.includes('ถึงเวลาแห่งความสุข'));
});
