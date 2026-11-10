import React, { useState, useEffect } from 'react';
import {
  Lock,
  Clock,
  Heart,
  Sparkles,
  KeyRound,
  Music,
  Volume2,
  VolumeX,
  Eye,
} from 'lucide-react';
import {
  calculateThailandCountdown,
  validateUnlockPasscode,
  THAI_LOVE_PHRASES,
  ThailandCountdown,
} from '../utils/thaiTime.ts';
import { soundEngine } from '../utils/audio.ts';

interface BirthdayLockScreenProps {
  onUnlock: () => void;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const BirthdayLockScreen: React.FC<BirthdayLockScreenProps> = ({
  onUnlock,
  isMusicPlaying,
  onToggleMusic,
  isMuted,
  onToggleMute,
}) => {
  const [countdown, setCountdown] = useState<ThailandCountdown>(calculateThailandCountdown());
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');
  const [showKeyModal, setShowKeyModal] = useState(false);

  // Update countdown every second based on Thailand time
  useEffect(() => {
    const timer = setInterval(() => {
      const updated = calculateThailandCountdown();
      setCountdown(updated);
      if (updated.isUnlocked) {
        onUnlock();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [onUnlock]);

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateUnlockPasscode(passcode)) {
      soundEngine.playSparkleSound();
      soundEngine.playCelebrationFanfare();
      onUnlock();
    } else {
      soundEngine.playPopSound();
      setPasscodeError('รหัสผ่านไม่ถูกต้อง (Hint: ลองใช้ "BB13" หรือ "TALHA")');
    }
  };

  const handleTimeFullAutoStart = () => {
    soundEngine.playSparkleSound();
    onUnlock();
  };

  return (
    <div className="min-h-screen bg-[#08020d] text-white flex flex-col justify-between p-4 sm:p-6 relative overflow-hidden select-none">
      {/* Background Romantic Ambient Radial Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-rose-900/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Bar with Thailand Time Badge & Audio */}
      <header className="relative z-10 max-w-5xl mx-auto w-full flex items-center justify-between py-2 border-b border-rose-900/30">
        <div className="flex items-center gap-2">
          <span className="text-xl">🇹🇭</span>
          <div>
            <span className="text-[11px] uppercase tracking-wider text-amber-300 font-bold block">
              เวลาประเทศไทย • Thailand Time (ICT / UTC+7)
            </span>
            <span className="text-xs text-rose-200/90 font-mono">
              {countdown.thailandCurrentFormatted}
            </span>
          </div>
        </div>

        {/* Audio Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleMusic}
            aria-label={isMusicPlaying ? 'Pause birthday music' : 'Play birthday music'}
            className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition cursor-pointer border ${
              isMusicPlaying
                ? 'bg-rose-600/30 text-rose-200 border-rose-500/50'
                : 'bg-stone-900/60 text-stone-300 border-stone-800 hover:bg-rose-900/20'
            }`}
          >
            <Music className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden sm:inline">{isMusicPlaying ? 'เปิดเพลง' : 'ฟังเพลง'}</span>
          </button>

          <button
            onClick={onToggleMute}
            aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
            className="p-2 rounded-full bg-stone-900/60 border border-stone-800 text-stone-300 hover:text-white cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Main Countdown Center */}
      <main className="relative z-10 max-w-3xl mx-auto w-full text-center my-auto py-8">
        {/* Lock Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/80 border border-rose-500/40 text-amber-300 text-xs font-semibold mb-6 shadow-lg shadow-rose-950/60">
          <Lock className="w-3.5 h-3.5 text-amber-400" />
          <span>รอเปิดในวันเกิด วันที่ 13 ตามเวลาประเทศไทย (ICT)</span>
        </div>

        {/* Thai & English Greeting Title */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight drop-shadow-md">
          {THAI_LOVE_PHRASES.happyBirthday}
        </h1>
        <h2 className="font-serif text-2xl sm:text-4xl text-rose-300 font-bold mt-1">
          Happy Birthday, <span className="text-gold-gradient">My Sweet Wifey BB</span>
        </h2>

        {/* Devotion Subtitle */}
        <p className="mt-3 text-sm sm:text-base text-rose-200/90 max-w-xl mx-auto font-light">
          {THAI_LOVE_PHRASES.loveYouMost} • {THAI_LOVE_PHRASES.talhasQueen}
        </p>
        <p className="text-xs text-amber-300/80 mt-1 font-serif italic">
          “ตัลฮาเตรียมความรักและเค้กวันเกิด 3D สุดพิเศษไว้ให้บีบีแล้วนะ”
        </p>

        {/* Big Live Countdown Cards (Bangkok Time) */}
        <div className="mt-8 mb-8 grid grid-cols-4 gap-2 sm:gap-4 max-w-lg mx-auto">
          {/* Days */}
          <div className="bg-[#190723]/90 border border-rose-600/40 rounded-2xl p-3 sm:p-5 shadow-xl shadow-rose-950/70">
            <span className="font-serif text-3xl sm:text-5xl font-black text-amber-300 block">
              {countdown.days}
            </span>
            <span className="text-[10px] sm:text-xs text-rose-300 uppercase tracking-widest font-semibold block mt-1">
              วัน (Days)
            </span>
          </div>

          {/* Hours */}
          <div className="bg-[#190723]/90 border border-rose-600/40 rounded-2xl p-3 sm:p-5 shadow-xl shadow-rose-950/70">
            <span className="font-serif text-3xl sm:text-5xl font-black text-amber-300 block">
              {String(countdown.hours).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs text-rose-300 uppercase tracking-widest font-semibold block mt-1">
              ชั่วโมง (Hrs)
            </span>
          </div>

          {/* Minutes */}
          <div className="bg-[#190723]/90 border border-rose-600/40 rounded-2xl p-3 sm:p-5 shadow-xl shadow-rose-950/70">
            <span className="font-serif text-3xl sm:text-5xl font-black text-amber-300 block">
              {String(countdown.minutes).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs text-rose-300 uppercase tracking-widest font-semibold block mt-1">
              นาที (Mins)
            </span>
          </div>

          {/* Seconds */}
          <div className="bg-[#190723]/90 border border-rose-600/40 rounded-2xl p-3 sm:p-5 shadow-xl shadow-rose-950/70">
            <span className="font-serif text-3xl sm:text-5xl font-black text-rose-400 block animate-pulse">
              {String(countdown.seconds).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs text-rose-300 uppercase tracking-widest font-semibold block mt-1">
              วินาที (Secs)
            </span>
          </div>
        </div>

        {/* Target Time Callout */}
        <div className="bg-[#14061d] border border-amber-500/30 rounded-2xl p-4 max-w-md mx-auto mb-6 shadow-md text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs text-amber-300 font-semibold mb-1">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>เป้าหมายการเปิดเว็บไซต์ (Birthday Target)</span>
          </div>
          <p className="text-sm font-serif font-bold text-rose-100">
            {countdown.targetThailandFormatted}
          </p>
          <p className="text-[11px] text-stone-400 mt-1">
            (คำนวณตามเวลาประเทศไทย กรุงเทพฯ UTC+7 โดยเฉพาะ ไม่ใช่เวลาปากีสถาน)
          </p>
        </div>

        {/* Action Buttons: Auto-start simulation, Passcode, and Preview */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleTimeFullAutoStart}
            data-testid="simulate-time-full-btn"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-rose-600 to-pink-600 hover:brightness-110 text-white text-xs font-bold shadow-lg shadow-rose-950/70 flex items-center justify-center gap-2 transition cursor-pointer border border-amber-300/50"
          >
            <Sparkles className="w-4 h-4 text-yellow-200" />
            <span>🎉 จำลองเวลาครบ 00:00 น. เริ่มอัตโนมัติ (Simulate Time Full)</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playPopSound();
              setShowKeyModal(true);
            }}
            data-testid="enter-passcode-btn"
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-rose-200 text-xs font-semibold border border-rose-500/30 flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <KeyRound className="w-4 h-4 text-amber-300" />
            <span>ใส่รหัสผ่านลับ (Secret Passcode)</span>
          </button>

          <button
            onClick={handleTimeFullAutoStart}
            data-testid="preview-now-btn"
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-stone-900/60 hover:bg-stone-800 text-stone-300 hover:text-white text-xs font-medium border border-stone-800 flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <Eye className="w-4 h-4 text-amber-400" />
            <span>ดูตัวอย่าง (Preview)</span>
          </button>
        </div>
      </main>

      {/* Secret Passcode Modal */}
      {showKeyModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-[#180724] border border-amber-500/50 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative text-center">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-400/40 mx-auto flex items-center justify-center mb-3">
              <KeyRound className="w-6 h-6 text-amber-300" />
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
              ปลดล็อคด้วยรหัสผ่านลับ
            </h3>
            <p className="text-xs text-rose-200/80 mt-1 mb-4">
              Enter Talha’s secret passcode to open the full 3D birthday celebration right now!
            </p>

            <form onSubmit={handlePasscodeSubmit} className="space-y-3">
              <input
                type="text"
                autoFocus
                placeholder="ใส่รหัสผ่าน (เช่น BB13 หรือ TALHA)"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setPasscodeError('');
                }}
                className="w-full bg-[#250b33] border border-rose-600/50 rounded-xl px-4 py-2.5 text-sm text-center text-amber-200 placeholder-rose-400/40 focus:outline-none focus:border-amber-400 font-bold uppercase tracking-widest"
              />

              {passcodeError && (
                <p className="text-xs text-red-400 font-medium">{passcodeError}</p>
              )}

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowKeyModal(false)}
                  className="flex-1 py-2 rounded-xl bg-stone-800 text-stone-300 text-xs font-semibold cursor-pointer"
                >
                  ยกเลิก (Cancel)
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-amber-500 text-white text-xs font-semibold shadow transition cursor-pointer"
                >
                  ปลดล็อค (Unlock)
                </button>
              </div>
            </form>

            <div className="mt-4 pt-3 border-t border-rose-900/40 text-[11px] text-stone-400">
              💡 Hint: พิมพ์ <span className="text-amber-300 font-bold">BB13</span> หรือ <span className="text-amber-300 font-bold">TALHA</span>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 text-center py-3 text-xs text-rose-300/60 border-t border-rose-900/30">
        <p className="font-serif">
          BB ♥ TALHA • {THAI_LOVE_PHRASES.fromTalha} • วันที่ 13 พฤศจิกายน
        </p>
      </footer>
    </div>
  );
};
