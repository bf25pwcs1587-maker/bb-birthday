/**
 * Thailand Time (ICT / Indochina Time = UTC+7) Utilities
 * Calculates accurate Bangkok timezone dates and countdowns.
 */

export interface ThailandCountdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isUnlocked: boolean;
  thailandCurrentFormatted: string;
  targetThailandFormatted: string;
}

/**
 * Converts any Date (or current time) to Thailand Time (UTC+7).
 */
export function getThailandDate(date: Date = new Date()): Date {
  // Use UTC timestamp + 7 hours (420 minutes)
  const utcMs = date.getTime() + date.getTimezoneOffset() * 60000;
  const thailandOffsetMs = 7 * 60 * 60 * 1000;
  return new Date(utcMs + thailandOffsetMs);
}

/**
 * Calculates countdown to the next 13th at 00:00:00 Thailand Time (UTC+7).
 */
export function calculateThailandCountdown(now: Date = new Date()): ThailandCountdown {
  const thaiNow = getThailandDate(now);

  const thaiYear = thaiNow.getFullYear();
  const thaiMonth = thaiNow.getMonth();
  const thaiDay = thaiNow.getDate();

  // If today is the 13th or later in the current month in Thailand,
  // we check if it is actively the birthday (day === 13)
  const isBirthdayToday = thaiDay === 13;

  // Target: the 13th of the current month at 00:00:00 Thailand time
  let targetYear = thaiYear;
  let targetMonth = thaiMonth;

  if (thaiDay > 13) {
    // Already past the 13th for this month, target next month's 13th
    targetMonth += 1;
    if (targetMonth > 11) {
      targetMonth = 0;
      targetYear += 1;
    }
  }

  // Create target date in Thailand time representation
  const targetDateThai = new Date(targetYear, targetMonth, 13, 0, 0, 0, 0);

  // Time difference in milliseconds
  const diffMs = targetDateThai.getTime() - thaiNow.getTime();

  const isUnlocked = isBirthdayToday || diffMs <= 0;

  const totalSec = Math.max(0, Math.floor(diffMs / 1000));
  const days = Math.floor(totalSec / 86400);
  const hours = Math.floor((totalSec % 86400) / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;

  // Format strings
  const thaiTimeStr = thaiNow.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const monthNamesThai = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม',
  ];

  const thaiDateFormatted = `${thaiDay} ${monthNamesThai[thaiMonth]} (ICT, UTC+7) • ${thaiTimeStr}`;
  const targetFormatted = `13 ${monthNamesThai[targetMonth]} 00:00 น. (เวลาประเทศไทย)`;

  return {
    days: isUnlocked ? 0 : days,
    hours: isUnlocked ? 0 : hours,
    minutes: isUnlocked ? 0 : minutes,
    seconds: isUnlocked ? 0 : seconds,
    isUnlocked,
    thailandCurrentFormatted: thaiDateFormatted,
    targetThailandFormatted: targetFormatted,
  };
}

/**
 * Validates unlock passcode for previewing before the 13th.
 */
export function validateUnlockPasscode(code: string): boolean {
  const normalized = (code || '').trim().toUpperCase();
  const validCodes = ['BB13', 'TALHA', 'TALHABB', 'BBTALHA', 'LOVE13', 'THAI13'];
  return validCodes.includes(normalized);
}

/**
 * Checks if the countdown has reached zero / time is full.
 */
export function isCountdownComplete(countdown: ThailandCountdown): boolean {
  return countdown.isUnlocked && countdown.days === 0 && countdown.hours === 0 && countdown.minutes === 0 && countdown.seconds === 0;
}

/**
 * Key Thai Romantic Phrases with Phonetics & Meanings
 */
export const THAI_LOVE_PHRASES = {
  happyBirthday: 'สุขสันต์วันเกิดนะที่รัก', // Suk San Wan Kerd Na Tee Rak
  loveYouMost: 'รักบีบีที่สุดในโลก', // Rak BB tee sut nai lok
  talhasQueen: 'เจ้าหญิงของตัลฮา', // Jao ying khong Talha
  foreverTogether: 'รักเธอตลอดไป', // Rak ter talot pai
  countdownTitle: 'นับถอยหลังสู่วันเกิดของบีบี', // Countdown to BB's birthday
  lockNotice: 'เว็บไซต์ของขวัญนี้จะเปิดอัตโนมัติในวันที่ 13 ตามเวลาประเทศไทย', // Will open automatically on 13th Thai time
  wishYouJoy: 'ขอให้มีความสุขมากๆ สุขภาพแข็งแรงนะคนดี', // Wishing you immense joy and good health
  fromTalha: 'ด้วยรักจากตัลฮา', // With love from Talha
  timeIsFullCelebration: 'ถึงเวลาแห่งความสุขแล้ว! สุขสันต์วันเกิดนะที่รัก BB!', // Time is full celebration
};
