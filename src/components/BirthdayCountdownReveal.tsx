import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Crown, ArrowRight } from 'lucide-react';
import { soundEngine } from '../utils/audio.ts';

interface BirthdayCountdownRevealProps {
  onDismiss: () => void;
}

export const BirthdayCountdownReveal: React.FC<BirthdayCountdownRevealProps> = ({ onDismiss }) => {
  const [secondsRemaining, setSecondsRemaining] = useState(6);

  useEffect(() => {
    // 1. Play grand audio celebrations immediately
    soundEngine.playCelebrationFanfare();
    soundEngine.playSparkleSound();
    soundEngine.startMusic();

    // 2. Continuous multi-stage fireworks confetti celebration
    const confettiInterval = setInterval(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 65,
        origin: { x: 0, y: 0.65 },
        colors: ['#f43f5e', '#fbbf24', '#ec4899', '#ffffff'],
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 65,
        origin: { x: 1, y: 0.65 },
        colors: ['#e11d48', '#f59e0b', '#fbcfe8', '#fde047'],
      });
    }, 500);

    // 3. Countdown timer to automatically transition to 3D cake
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          clearInterval(confettiInterval);
          onDismiss();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(confettiInterval);
      clearInterval(timer);
    };
  }, [onDismiss]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a020f]/95 backdrop-blur-md text-white select-none overflow-hidden animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Happy Birthday BB Grand Celebration"
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-radial from-rose-900/30 via-black/80 to-black pointer-events-none" />

      <div className="relative z-10 max-w-2xl w-full text-center p-6 sm:p-10 bg-[#160520] border-2 border-amber-400/80 rounded-3xl shadow-2xl shadow-rose-950/90">
        {/* Crown Icon */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-amber-300 p-1 shadow-2xl mb-4 animate-bounce">
          <div className="w-full h-full rounded-full bg-[#130619] flex items-center justify-center">
            <Crown className="w-8 h-8 sm:w-10 sm:h-10 text-amber-300" />
          </div>
        </div>

        {/* Milestone Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950 border border-amber-400/60 text-amber-300 text-xs font-bold uppercase tracking-widest mb-4 shadow-md">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>เวลาครบกำหนดแล้ว! 13 พฤศจิกายน (TIME IS FULL)</span>
          <Sparkles className="w-4 h-4 text-amber-300" />
        </div>

        {/* Giant Main Birthday Greetings */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-300 to-rose-400 drop-shadow-xl leading-none">
          HAPPY BIRTHDAY, BB!
        </h1>

        <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-rose-300 mt-2 sm:mt-3">
          สุขสันต์วันเกิดนะที่รัก BB! 🎉
        </h2>

        {/* Romantic Devotion */}
        <div className="mt-4 p-4 rounded-2xl bg-rose-950/40 border border-rose-800/40 max-w-lg mx-auto">
          <p className="text-sm sm:text-base text-rose-100 font-serif italic">
            “เมื่อนาฬิกาบอกเวลาของวันที่ 13 หัวใจของตัลฮาก็มีแต่บีบีคนเดียว รักบีบีที่สุดในโลกนะเจ้าหญิงของตัลฮา”
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-amber-300 font-semibold mt-2">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>Forever yours, Talha (ตัลฮา)</span>
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          </div>
        </div>

        {/* Progress bar & Enter Button */}
        <div className="mt-8 space-y-3">
          <button
            onClick={() => {
              soundEngine.playSparkleSound();
              onDismiss();
            }}
            data-testid="enter-celebration-btn"
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-bold text-sm tracking-wide shadow-2xl shadow-rose-900/80 transition-all transform active:scale-95 cursor-pointer inline-flex items-center justify-center gap-2 border border-amber-300/60"
          >
            <span>เข้าสู่ปราสาทวันเกิด 3D ของบีบี (Enter 3D Birthday Palace)</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>

          <p className="text-xs text-rose-300/70 font-mono">
            กำลังเปิดระบบอัตโนมัติใน {secondsRemaining} วินาที... (Starting automatically)
          </p>
        </div>
      </div>
    </div>
  );
};
