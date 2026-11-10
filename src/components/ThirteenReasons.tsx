import React, { useState } from 'react';
import {
  Sparkles,
  Heart,
  HeartHandshake,
  Music,
  Home,
  Crown,
  Eye,
  Moon,
  ShieldCheck,
  Smile,
  Gift,
  Flame,
  Infinity,
} from 'lucide-react';
import { getThirteenReasons } from '../utils/birthdayLogic.ts';
import { soundEngine } from '../utils/audio.ts';
import { ReasonItem } from '../types/index.ts';

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-5 h-5 text-amber-400" />,
  HeartHandshake: <HeartHandshake className="w-5 h-5 text-pink-400" />,
  Music: <Music className="w-5 h-5 text-rose-400" />,
  Home: <Home className="w-5 h-5 text-amber-300" />,
  Crown: <Crown className="w-5 h-5 text-yellow-400" />,
  Eye: <Eye className="w-5 h-5 text-pink-300" />,
  Moon: <Moon className="w-5 h-5 text-indigo-300" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
  Smile: <Smile className="w-5 h-5 text-amber-400" />,
  Heart: <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />,
  Gift: <Gift className="w-5 h-5 text-purple-400" />,
  Flame: <Flame className="w-5 h-5 text-orange-400" />,
  Infinity: <Infinity className="w-5 h-5 text-rose-400" />,
};

export const ThirteenReasons: React.FC = () => {
  const reasons: ReasonItem[] = getThirteenReasons();
  const [selectedReason, setSelectedReason] = useState<number | null>(null);

  const handleCardClick = (id: number) => {
    soundEngine.playMusicBoxNote(400 + id * 40, 0.35, 0.12);
    setSelectedReason(selectedReason === id ? null : id);
  };

  return (
    <section id="reasons" className="py-20 px-4 max-w-7xl mx-auto relative z-20">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs font-semibold mb-3">
          <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
          <span>Milestone of Adoration</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
          13 Reasons Why You Are <span className="text-gold-gradient">My Whole World</span>
        </h2>
        <p className="text-rose-200/80 text-sm sm:text-base mt-3 font-light">
          Thirteen sweet treasures that make Talha fall in love with his wifey BB every single day.
        </p>
      </div>

      {/* Grid of 13 Reasons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {reasons.map((item) => {
          const isSelected = selectedReason === item.id;
          const isFinalReason = item.id === 13;

          return (
            <div
              key={item.id}
              onClick={() => handleCardClick(item.id)}
              className={`rounded-2xl p-6 transition-all duration-300 cursor-pointer border relative overflow-hidden group ${
                isFinalReason
                  ? 'sm:col-span-2 lg:col-span-3 bg-gradient-to-r from-[#2a0822] via-[#3d0b28] to-[#1e0722] border-amber-500/60 shadow-xl shadow-rose-950/70'
                  : isSelected
                  ? 'bg-[#220a2e] border-amber-400/80 shadow-lg shadow-pink-900/50 scale-[1.02]'
                  : 'bg-[#15071d]/80 hover:bg-[#1f0b2a]/90 border-rose-900/40 hover:border-rose-500/50 hover:shadow-md'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-950/60 border border-rose-500/30 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                    {iconMap[item.iconName] || <Heart className="w-5 h-5 text-rose-400" />}
                  </div>
                  <div>
                    <span className="text-[11px] font-bold tracking-widest text-amber-300/90 uppercase">
                      Reason #{item.id}
                    </span>
                    <h3 className="font-serif font-bold text-base sm:text-lg text-rose-100 group-hover:text-amber-200 transition-colors">
                      {item.title}
                    </h3>
                    {item.thaiTitle && (
                      <p className="text-xs text-amber-300/80 font-medium">
                        {item.thaiTitle}
                      </p>
                    )}
                  </div>
                </div>

                <div className="w-7 h-7 rounded-full bg-stone-900/60 border border-stone-700/50 flex items-center justify-center text-xs font-serif font-bold text-amber-300">
                  {item.id}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-rose-200/90 leading-relaxed mb-4">
                {item.description}
              </p>

              {/* Quote in English and Thai */}
              <div className="pt-3 border-t border-rose-900/30 flex items-center justify-between gap-2">
                <div>
                  <p className="text-[11px] sm:text-xs text-amber-200/80 italic font-serif">
                    {item.romanticQuote}
                  </p>
                  {item.thaiQuote && (
                    <p className="text-[10px] sm:text-[11px] text-rose-300/70 font-serif italic mt-0.5">
                      {item.thaiQuote}
                    </p>
                  )}
                </div>
                <Heart className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-amber-400 fill-amber-400' : 'text-rose-500/40'}`} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
