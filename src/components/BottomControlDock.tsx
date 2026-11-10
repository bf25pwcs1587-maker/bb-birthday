import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Camera,
  Sparkles,
  Mail,
  Gift,
  Music,
  Volume2,
  VolumeX,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CameraPreset } from '../types/index.ts';
import { soundEngine } from '../utils/audio.ts';

interface BottomControlDockProps {
  cameraPreset: CameraPreset;
  onSetCameraPreset: (preset: CameraPreset) => void;
  onOpenLetter: () => void;
  onOpenGift: () => void;
  onTriggerReveal?: () => void;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const BottomControlDock: React.FC<BottomControlDockProps> = ({
  cameraPreset,
  onSetCameraPreset,
  onOpenLetter,
  onOpenGift,
  onTriggerReveal,
  isMusicPlaying,
  onToggleMusic,
  isMuted,
  onToggleMute,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleConfetti = () => {
    soundEngine.playSparkleSound();
    confetti({
      particleCount: 75,
      spread: 80,
      origin: { y: 0.8 },
      colors: ['#f43f5e', '#fb7185', '#f59e0b', '#fbbf24', '#ffffff'],
    });
  };

  return (
    <aside
      aria-label="Birthday scene controls"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-[min(940px,94vw)] w-full transition-transform duration-300 pointer-events-auto"
      style={{
        transform: isCollapsed ? 'translate(-50%, calc(100% - 32px))' : 'translate(-50%, 0)',
      }}
    >
      {/* Collapse / Expand Toggle Button on Top of Dock */}
      <div className="flex justify-center mb-1">
        <button
          onClick={() => {
            soundEngine.playPopSound();
            setIsCollapsed(!isCollapsed);
          }}
          aria-expanded={!isCollapsed}
          aria-label={isCollapsed ? 'Show scene controls' : 'Hide scene controls'}
          className="px-3.5 py-1 rounded-t-xl bg-[#170823] text-rose-300 hover:text-white border-t border-x border-rose-500/40 text-xs font-medium flex items-center gap-1.5 shadow-md cursor-pointer transition"
        >
          {isCollapsed ? (
            <>
              <ChevronUp className="w-3.5 h-3.5" />
              <span>Show Controls</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5" />
              <span>Zen View (Hide Controls)</span>
            </>
          )}
        </button>
      </div>

      {/* Main Glassmorphic Dock Container */}
      <div className="bg-[#14061d] border border-rose-500/40 rounded-2xl p-2 sm:p-3 shadow-2xl shadow-rose-950/90 flex items-center justify-center sm:justify-between gap-1.5 sm:gap-3 flex-wrap">
        {/* Camera Views Selector */}
        <div className="flex items-center gap-1 bg-stone-900/60 p-0.5 sm:p-1 rounded-xl border border-stone-800">
          <span className="text-[11px] text-rose-300/80 font-medium px-1.5 hidden md:inline flex items-center gap-1">
            <Camera className="w-3 h-3 text-rose-400" />
            Views:
          </span>

          <button
            onClick={() => {
              soundEngine.playPopSound();
              onSetCameraPreset('cake');
            }}
            className={`px-2 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
              cameraPreset === 'cake'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            🎂 Cake
          </button>

          <button
            onClick={() => {
              soundEngine.playPopSound();
              onSetCameraPreset('overview');
            }}
            className={`px-2 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
              cameraPreset === 'overview'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            🌟 Wide
          </button>

          <button
            onClick={() => {
              soundEngine.playPopSound();
              onSetCameraPreset('cinematic');
            }}
            className={`px-2 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
              cameraPreset === 'cinematic'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            🪐 Orbit
          </button>
        </div>

        {/* Feature Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Replay 00:00 Auto Reveal */}
          {onTriggerReveal && (
            <button
              onClick={() => {
                soundEngine.playSparkleSound();
                onTriggerReveal();
              }}
              data-testid="dock-reveal-btn"
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:brightness-110 text-white text-xs font-semibold shadow-md transition flex items-center gap-1.5 cursor-pointer border border-pink-400/40"
            >
              <span>🎉 Happy Birthday BB!</span>
            </button>
          )}

          {/* Confetti blast */}
          <button
            onClick={handleConfetti}
            data-testid="dock-confetti-btn"
            className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-medium border border-amber-500/30 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden xs:inline">Fireworks</span>
          </button>

          {/* Open Love letter */}
          <button
            onClick={() => {
              soundEngine.playPopSound();
              onOpenLetter();
            }}
            data-testid="dock-love-letter-btn"
            className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-rose-950/80 hover:bg-rose-900 text-rose-200 text-xs font-medium border border-rose-500/40 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5 text-rose-400" />
            <span>Love Letter</span>
          </button>

          {/* Open Gift */}
          <button
            onClick={() => {
              soundEngine.playPopSound();
              onOpenGift();
            }}
            data-testid="dock-gift-btn"
            className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 hover:brightness-110 text-white text-xs font-semibold shadow-md transition flex items-center gap-1.5 cursor-pointer border border-amber-300/40"
          >
            <Gift className="w-3.5 h-3.5 text-yellow-200" />
            <span>Gift Box</span>
          </button>

          {/* Audio toggle shortcuts */}
          <div className="flex items-center gap-1 pl-1 border-l border-rose-900/40">
            <button
              onClick={onToggleMusic}
              aria-label={isMusicPlaying ? 'Stop music' : 'Start music'}
              className={`p-1.5 rounded-lg border text-xs cursor-pointer ${
                isMusicPlaying
                  ? 'bg-rose-600/30 border-rose-500/60 text-rose-300'
                  : 'bg-stone-800/80 border-stone-700 text-stone-400'
              }`}
            >
              <Music className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onToggleMute}
              aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
              className="p-1.5 rounded-lg bg-stone-800/80 border border-stone-700 text-stone-300 hover:text-white cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
