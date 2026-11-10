import React from 'react';
import { Heart, Volume2, VolumeX, Music, Sparkles } from 'lucide-react';

interface HeaderNavbarProps {
  isMuted: boolean;
  onToggleMute: () => void;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
  onOpenLetter: () => void;
  onOpenGift: () => void;
}

export const HeaderNavbar: React.FC<HeaderNavbarProps> = ({
  isMuted,
  onToggleMute,
  isMusicPlaying,
  onToggleMusic,
  onOpenLetter,
  onOpenGift,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#0b0510]/80 backdrop-blur-md border-b border-rose-900/30 px-4 py-3 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Monogram / Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-600 via-rose-500 to-amber-400 p-[2px] shadow-lg shadow-pink-900/40">
            <div className="w-full h-full bg-[#130718] rounded-full flex items-center justify-center">
              <span className="font-serif font-bold text-sm tracking-wider text-amber-300">B&T</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-serif text-base sm:text-lg font-bold tracking-wide text-rose-100">
                BB <span className="text-rose-400">♥</span> TALHA
              </h1>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-medium">
                🇹🇭 13 พ.ย. (Thailand ICT)
              </span>
            </div>
            <p className="text-[11px] text-rose-300/80 hidden sm:block">
              สุขสันต์วันเกิดนะที่รัก • Happy Birthday to My Forever Queen
            </p>
          </div>
        </div>

        {/* Quick Nav Anchors */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-xs font-medium text-rose-200/80">
          <a
            href="#hero"
            className="px-3 py-1.5 rounded-full hover:bg-rose-900/30 hover:text-white transition-colors"
          >
            🎂 Birthday Cake
          </a>
          <button
            onClick={onOpenLetter}
            data-testid="header-love-letter-btn"
            className="px-3 py-1.5 rounded-full hover:bg-rose-900/30 hover:text-white transition-colors cursor-pointer"
          >
            💌 Love Letter
          </button>
          <a
            href="#reasons"
            className="px-3 py-1.5 rounded-full hover:bg-rose-900/30 hover:text-white transition-colors"
          >
            💖 13 Reasons
          </a>
          <a
            href="#scrapbook"
            className="px-3 py-1.5 rounded-full hover:bg-rose-900/30 hover:text-white transition-colors"
          >
            📸 Memories
          </a>
          <a
            href="#constellation"
            className="px-3 py-1.5 rounded-full hover:bg-rose-900/30 hover:text-white transition-colors"
          >
            ✨ Constellation
          </a>
          <button
            onClick={onOpenGift}
            data-testid="header-gift-btn"
            className="px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-rose-500/20 text-amber-200 border border-amber-500/30 hover:brightness-110 transition cursor-pointer flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Surprise Gift
          </button>
        </nav>

        {/* Audio / Music Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleMusic}
            aria-label={isMusicPlaying ? 'Pause birthday music box' : 'Play birthday music box'}
            className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer border ${
              isMusicPlaying
                ? 'bg-rose-600/30 text-rose-200 border-rose-500/50 shadow-sm shadow-rose-900/50'
                : 'bg-stone-900/50 text-stone-300 border-stone-700/50 hover:bg-rose-900/20'
            }`}
          >
            <Music className={`w-3.5 h-3.5 ${isMusicPlaying ? 'text-rose-400' : 'text-stone-400'}`} />
            <span className="hidden sm:inline">{isMusicPlaying ? 'Music Playing' : 'Play Music'}</span>
          </button>

          <button
            onClick={onToggleMute}
            aria-label={isMuted ? 'Unmute sound effects' : 'Mute sound effects'}
            className="p-2 rounded-full bg-stone-900/50 text-stone-300 border border-stone-700/50 hover:bg-rose-900/20 hover:text-white transition cursor-pointer"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-rose-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-stone-300" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
