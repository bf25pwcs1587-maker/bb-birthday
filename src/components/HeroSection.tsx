import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Flame, Wind, RotateCcw } from 'lucide-react';
import { soundEngine } from '../utils/audio.ts';
import { validateWish } from '../utils/birthdayLogic.ts';

interface HeroSectionProps {
  candlesBlown: boolean;
  onBlowCandles: (wish: string) => void;
  onRelightCandles: () => void;
  savedWish: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  candlesBlown,
  onBlowCandles,
  onRelightCandles,
  savedWish,
}) => {
  const [wishInput, setWishInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const triggerConfettiBlast = () => {
    // 3-stage romantic confetti celebration
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#fb7185', '#f59e0b', '#fbbf24', '#ffffff'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#e11d48', '#fbcfe8', '#fde047'],
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#be123c', '#fda4af', '#fef08a'],
      });
    }, 250);
  };

  const handleBlowOut = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateWish(wishInput);
    if (!result.isValid) {
      setErrorMsg(result.message);
      return;
    }
    setErrorMsg('');

    // Audio effects
    soundEngine.playCandleBlowSound();
    setTimeout(() => {
      soundEngine.playCelebrationFanfare();
      soundEngine.playSparkleSound();
    }, 400);

    // Confetti
    triggerConfettiBlast();

    // Notify parent
    onBlowCandles(result.cleaned);
  };

  const handleRelight = () => {
    soundEngine.playPopSound();
    onRelightCandles();
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-between pt-20 pb-36 px-4 pointer-events-none z-10"
    >
      {/* Top Hero Text */}
      <div className="max-w-3xl mx-auto text-center pointer-events-auto mt-2 sm:mt-6 bg-[#0b0510]/60 backdrop-blur-[4px] rounded-3xl p-4 sm:p-6 border border-rose-900/30">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/80 border border-rose-500/40 shadow-lg shadow-rose-950/50 mb-3 backdrop-blur-md">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
          <span className="text-[11px] sm:text-xs uppercase tracking-widest font-semibold text-rose-200">
            🇹🇭 สุขสันต์วันเกิด • 13th Birthday Celebration (Thailand Time)
          </span>
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-lg leading-tight">
          Happy Birthday, <span className="text-rose-gradient">My Beloved BB</span>
        </h1>
        <p className="font-serif text-lg sm:text-xl text-amber-200 font-bold mt-1">
          สุขสันต์วันเกิดนะที่รัก • รักบีบีที่สุดในโลก
        </p>

        <p className="mt-2 text-xs sm:text-sm text-rose-200/90 max-w-xl mx-auto font-light">
          To the Queen of my heart, Talha’s forever home, and the most radiant soul in the universe.
        </p>
      </div>

      {/* Middle Spacer for 3D Cake Viewport */}
      <div className="flex-1 min-h-[220px] sm:min-h-[280px]" />

      {/* Interactive Birthday Wish & Candle Control Card */}
      <div className="max-w-lg w-full mx-auto pointer-events-auto mb-2">
        {!candlesBlown ? (
          <div className="bg-[#14081c]/90 border border-rose-500/40 rounded-2xl p-5 sm:p-6 shadow-2xl shadow-rose-950/80 backdrop-blur-md">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400 animate-bounce" />
                <h2 className="font-serif text-lg font-bold text-amber-200">
                  อธิษฐานวันเกิด (Make a Birthday Wish, BB)
                </h2>
              </div>
              <span className="text-xs text-rose-300/80 bg-rose-900/40 px-2.5 py-1 rounded-full border border-rose-700/40">
                13 เล่ม (Lit)
              </span>
            </div>

            <p className="text-xs text-rose-200/80 mb-4">
              หลับตาลง อธิษฐานสิ่งที่ปรารถนาที่สุดในหัวใจ แล้วเป่าเทียนทั้ง 13 เล่มได้เลยนะคนดี!
            </p>

            <form onSubmit={handleBlowOut} className="space-y-3">
              <label htmlFor="bb-wish-input" className="sr-only">
                Your Birthday Wish
              </label>
              <input
                id="bb-wish-input"
                type="text"
                value={wishInput}
                onChange={(e) => setWishInput(e.target.value)}
                placeholder="พิมพ์คำอธิษฐานส่งถึงดวงดาวนะที่รัก... (Whisper your wish)"
                className="w-full bg-[#1e0a29] border border-rose-600/40 rounded-xl px-4 py-2.5 text-sm text-rose-100 placeholder-rose-400/40 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition"
              />

              {errorMsg && (
                <p className="text-xs text-red-400">{errorMsg}</p>
              )}

              <button
                type="submit"
                className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-medium text-sm tracking-wide shadow-lg shadow-rose-900/60 transition-all transform active:scale-98 cursor-pointer flex items-center justify-center gap-2 border border-rose-400/30"
              >
                <Wind className="w-4 h-4 text-white" />
                <span>เป่าเทียน 13 เล่ม & อธิษฐาน (Blow Out Candles)</span>
                <Sparkles className="w-4 h-4 text-amber-200" />
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-[#14081c]/95 border border-amber-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl shadow-rose-950/90 backdrop-blur-md text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center mb-3">
              <Sparkles className="w-6 h-6 text-amber-300" />
            </div>

            <h2 className="font-serif text-xl sm:text-2xl font-bold text-amber-200">
              สุขสันต์วันเกิดนะ เจ้าหญิงของตัลฮา! ✨
            </h2>

            <p className="text-xs text-rose-300/90 mt-1 mb-4 italic font-serif">
              “ขอให้ทุกความปรารถนาและทุกคำอธิษฐานของบีบีกลายเป็นความจริงนะครับ”
            </p>

            <div className="bg-rose-950/50 border border-rose-800/40 rounded-xl p-3.5 mb-4 text-left">
              <span className="text-[11px] uppercase tracking-wider text-amber-300 font-semibold block mb-1">
                คำอธิษฐานของบีบี (BB’s Birthday Wish)
              </span>
              <p className="text-sm text-rose-100 font-medium italic">
                “{savedWish || 'Health, boundless joy, and endless love with Talha forever.'}”
              </p>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={handleRelight}
                className="px-4 py-2 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-rose-200 text-xs font-medium border border-rose-700/30 transition flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-rose-400" />
                จุดเทียนอีกครั้ง (Relight 13 Candles)
              </button>
              <button
                onClick={() => {
                  soundEngine.playSparkleSound();
                  triggerConfettiBlast();
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-amber-500 text-white text-xs font-medium shadow-md transition flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                จุดพลุฉลองอีก!
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
