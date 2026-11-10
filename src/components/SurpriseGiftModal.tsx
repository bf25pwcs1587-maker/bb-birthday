import React, { useState } from 'react';
import { X, Gift, Sparkles, Heart, CheckCircle2, Ticket } from 'lucide-react';
import confetti from 'canvas-confetti';
import { getDefaultCoupons } from '../utils/birthdayLogic.ts';
import { soundEngine } from '../utils/audio.ts';

interface SurpriseGiftModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SurpriseGiftModal: React.FC<SurpriseGiftModalProps> = ({ isOpen, onClose }) => {
  const [isOpened, setIsOpened] = useState(false);
  const coupons = getDefaultCoupons();

  if (!isOpen) return null;

  const handleOpenGift = () => {
    soundEngine.playSparkleSound();
    soundEngine.playCelebrationFanfare();
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#fbbf24', '#f43f5e', '#ec4899', '#ffffff'],
    });
    setIsOpened(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Birthday Surprise Gift Box"
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#180824] border-2 border-amber-500/50 rounded-3xl p-6 sm:p-10 shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Close gift box"
          className="absolute top-3 right-3 p-2 rounded-full bg-stone-900/80 text-rose-300 hover:text-white cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {!isOpened ? (
          /* Wrapped Gift View */
          <div className="text-center py-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Special Delivery for BB</span>
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl font-extrabold text-white mb-2">
              A Birthday Surprise From Talha
            </h3>
            <p className="text-xs sm:text-sm text-rose-200/80 max-w-md mx-auto mb-8 font-light">
              Tied with love, gratitude, and eternal devotion on this 13th. Touch the golden ribbon to unwrap!
            </p>

            {/* Interactive 3D Gift Box Graphic */}
            <button
              onClick={handleOpenGift}
              className="group relative mx-auto w-44 h-44 sm:w-52 sm:h-52 bg-gradient-to-tr from-rose-700 via-pink-600 to-rose-900 rounded-3xl shadow-2xl shadow-rose-900/90 border-2 border-amber-400/60 p-4 flex flex-col items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300"
              aria-label="Unwrap birthday gift box"
            >
              {/* Golden Silk Ribbons */}
              <div className="absolute inset-x-0 h-8 top-1/2 -translate-y-1/2 bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 shadow-md border-y border-amber-300" />
              <div className="absolute inset-y-0 w-8 left-1/2 -translate-x-1/2 bg-gradient-to-b from-amber-400 via-yellow-200 to-amber-500 shadow-md border-x border-amber-300" />

              {/* Big Golden Bow */}
              <div className="relative z-10 w-16 h-16 rounded-full bg-amber-400 border-2 border-white shadow-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                <Gift className="w-8 h-8 text-rose-950" />
              </div>

              <div className="relative z-10 mt-6 px-3 py-1 rounded-full bg-black/60 backdrop-blur-xs text-amber-200 text-xs font-bold tracking-wider uppercase border border-amber-400/40">
                Click to Unwrap ✨
              </div>
            </button>
          </div>
        ) : (
          /* Unwrapped Gift Content: Wifey VIP Love Coupons */
          <div>
            <div className="text-center pb-6 border-b border-rose-900/40 mb-6">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-400/40 mx-auto flex items-center justify-center mb-2">
                <Sparkles className="w-6 h-6 text-amber-300" />
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
                BB’s VIP Birthday Coupons 🎁
              </h3>
              <p className="text-xs sm:text-sm text-rose-200/80 mt-1">
                Issued with unconditional adoration by Talha. Valid today and forever!
              </p>
            </div>

            {/* Coupons List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {coupons.map((c) => (
                <div
                  key={c.id}
                  className="bg-[#240c33] border border-amber-500/30 rounded-2xl p-4 shadow-md relative overflow-hidden flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <Ticket className="w-4 h-4 text-amber-400" />
                      <h4 className="font-serif font-bold text-sm text-rose-100">
                        {c.title}
                      </h4>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>

                  <p className="text-xs text-rose-300/80 mb-3 leading-relaxed">
                    {c.description}
                  </p>

                  <div className="flex items-center justify-between text-[11px] pt-2 border-t border-rose-900/30 font-mono text-amber-300/90">
                    <span>CODE: {c.code}</span>
                    <span className="text-emerald-400 font-sans font-semibold">REDEEMABLE 24/7</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-rose-950/40 border border-rose-800/40 rounded-xl p-4 text-center">
              <p className="font-serif text-sm text-rose-100 italic">
                “My greatest gift is you, BB. Every coupon here is just a tiny glimpse of how spoiled and loved you deserve to be.”
              </p>
              <p className="text-xs text-amber-400 font-semibold mt-1">
                — Your Talha ♥
              </p>
            </div>

            <div className="text-center mt-6">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white text-xs font-semibold shadow-lg shadow-rose-950/60 transition cursor-pointer"
              >
                Cherish My Gift
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
