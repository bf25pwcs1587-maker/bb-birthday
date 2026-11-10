import React, { useState } from 'react';
import { X, Heart, Sparkles, Check, Copy } from 'lucide-react';
import { soundEngine } from '../utils/audio.ts';

interface LoveLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoveLetterModal: React.FC<LoveLetterModalProps> = ({ isOpen, onClose }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleBreakSeal = () => {
    soundEngine.playWaxSealSound();
    soundEngine.playSparkleSound();
    setIsOpened(true);
  };

  const letterContent = `My Dearest Wifey BB,
(ถึง บีบี ที่รักที่สุดในชีวิตของตัลฮา)

สุขสันต์วันเกิดนะที่รัก... Happy Birthday to the most breathtaking, kind-hearted, and remarkable woman God ever blessed this Earth with.

As we celebrate this special 13th, words feel far too small to hold everything my heart feels for you. From the instant you came into my life, you turned the ordinary into poetry. Your smile is my daily sunrise; your voice is the peace that calms any storm; and your warm hand in mine is the only anchor I will ever need.

Thank you for being my lover, my best friend, my confidante, and my eternal sanctuary. Thank you for your endless patience, your playful jokes that leave me laughing till my stomach hurts, and the unconditional love you give without expecting anything in return.

ขอให้บีบีมีความสุขมากๆ ในทุกๆ วัน มีสุขภาพร่างกายที่แข็งแรง สมหวังในทุกความปรารถนา และเป็นรอยยิ้มที่สว่างไสวที่สุดของตัลฮาตลอดไปนะครับ

On your birthday today, my deepest prayer is for your life to overflow with radiant health, purest joy, unforgettable adventures, and every single dream your heart cherishes. I promise to spend every day of our lives cherishing you, protecting you, and proving how deeply you are adored.

รักบีบีที่สุดในโลกนะ... You are my present, my future, and my greatest blessing.

Happy Birthday, my sweet queen BB. Today and for all eternity, I am yours.

ด้วยรักและความคิดถึงสุดหัวใจ,
Forever & Always,
With all my love and devotion,
Talha ♥ (ตัลฮา)`;

  const handleCopy = () => {
    navigator.clipboard.writeText(letterContent);
    setCopied(true);
    soundEngine.playPopSound();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Love Letter from Talha"
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close love letter"
          className="absolute top-2 right-2 z-20 p-2 rounded-full bg-stone-900/80 text-rose-300 hover:text-white border border-rose-500/40 cursor-pointer transition"
        >
          <X className="w-5 h-5" />
        </button>

        {!isOpened ? (
          /* Sealed Envelope View */
          <div className="bg-[#1f0b24] border-2 border-amber-500/40 rounded-3xl p-8 sm:p-12 shadow-2xl text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-rose-950/40 to-black/60 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              <span className="text-xs uppercase tracking-widest text-amber-300/90 font-medium mb-2">
                A Confidential Love Note
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-rose-100 mb-1">
                For My Precious Wifey, BB
              </h3>
              <p className="text-xs text-amber-300 font-serif italic mb-6">
                (แด่บีบี... ผู้เป็นดั่งดวงใจของตัลฮา)
              </p>

              {/* Wax Seal Button */}
              <button
                onClick={handleBreakSeal}
                className="group relative my-6 w-24 h-24 rounded-full bg-gradient-to-tr from-amber-700 via-rose-700 to-amber-500 p-1 shadow-2xl shadow-rose-950/80 hover:scale-105 active:scale-95 transition-all cursor-pointer border-2 border-amber-300/60"
                aria-label="Break golden wax seal and read love letter"
              >
                <div className="w-full h-full rounded-full bg-[#831843] flex flex-col items-center justify-center border border-amber-400/50">
                  <span className="font-serif font-black text-amber-200 text-lg tracking-wider">
                    B & T
                  </span>
                  <span className="text-[9px] text-amber-300 font-bold">รักตลอดไป</span>
                </div>
                <div className="absolute -bottom-2 bg-amber-400 text-black text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
                  เปิดผนึก (Break Seal)
                </div>
              </button>

              <p className="text-xs text-rose-300/80 max-w-sm font-light mt-2">
                Sealed with devotion by Talha on the 13th • ปิดผนึกด้วยความรักและความภักดีของตัลฮา
              </p>
            </div>
          </div>
        ) : (
          /* Unfolded Parchment Letter View */
          <div className="bg-[#fcf8f2] text-[#2c1810] rounded-3xl p-6 sm:p-10 shadow-2xl border-4 border-amber-200/80 relative">
            {/* Top Ornamental Header */}
            <div className="text-center pb-6 border-b border-amber-800/20 mb-6">
              <div className="flex items-center justify-center gap-2 text-rose-700 mb-1">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span className="font-serif text-xs uppercase tracking-widest font-bold text-amber-900">
                  With All My Soul & Devotion
                </span>
                <Sparkles className="w-4 h-4 text-amber-600" />
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#3d1a24]">
                To My Darling BB On Your Birthday
              </h3>
              <p className="text-xs text-stone-500 font-serif italic mt-1">
                Written by Talha for our special 13th
              </p>
            </div>

            {/* Letter Body */}
            <div className="space-y-4 font-serif text-sm sm:text-base leading-relaxed text-stone-800">
              <p className="font-semibold text-lg text-rose-900">
                My Dearest Wifey BB,
              </p>
              <p>
                Happy Birthday to the most breathtaking, kind-hearted, and remarkable woman God ever blessed this Earth with.
              </p>
              <p>
                As we celebrate this special 13th, words feel far too small to hold everything my heart feels for you. From the instant you came into my life, you turned the ordinary into poetry. Your smile is my daily sunrise; your voice is the peace that calms any storm; and your warm hand in mine is the only anchor I will ever need.
              </p>
              <p>
                Thank you for being my lover, my best friend, my confidante, and my eternal sanctuary. Thank you for your endless patience, your playful jokes that leave me laughing till my stomach hurts, and the unconditional love you give without expecting anything in return.
              </p>
              <p>
                On your birthday today, my deepest prayer is for your life to overflow with radiant health, purest joy, unforgettable adventures, and every single dream your heart cherishes. I promise to spend every day of our lives cherishing you, protecting you, and proving how deeply you are adored.
              </p>
              <p>
                You are my present, my future, and my greatest blessing.
              </p>
            </div>

            {/* Signature */}
            <div className="mt-8 pt-6 border-t border-amber-800/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="text-xs text-stone-500 uppercase tracking-wider font-semibold">
                  Forever and completely yours,
                </p>
                <p className="font-script text-4xl text-rose-800 mt-1">
                  Talha ♥
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="px-4 py-2 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Copied Letter!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-stone-600" />
                      <span>Copy Letter</span>
                    </>
                  )}
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-semibold shadow transition cursor-pointer"
                >
                  Close & Cherish
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
