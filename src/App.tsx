/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ThreeCanvas } from './components/ThreeCanvas.tsx';
import { HeaderNavbar } from './components/HeaderNavbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { ThirteenReasons } from './components/ThirteenReasons.tsx';
import { ScrapbookSection } from './components/ScrapbookSection.tsx';
import { LoveConstellation } from './components/LoveConstellation.tsx';
import { LoveMessageBoard } from './components/LoveMessageBoard.tsx';
import { LoveLetterModal } from './components/LoveLetterModal.tsx';
import { SurpriseGiftModal } from './components/SurpriseGiftModal.tsx';
import { BottomControlDock } from './components/BottomControlDock.tsx';
import { BirthdayLockScreen } from './components/BirthdayLockScreen.tsx';
import { BirthdayCountdownReveal } from './components/BirthdayCountdownReveal.tsx';
import { soundEngine } from './utils/audio.ts';
import { calculateThailandCountdown } from './utils/thaiTime.ts';
import { CameraPreset } from './types/index.ts';

export default function App() {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [savedWish, setSavedWish] = useState('');
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('cake');
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [isGiftOpen, setIsGiftOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showCelebrationReveal, setShowCelebrationReveal] = useState(false);

  // Thailand time lock / unlock state
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    if (params.get('preview') === '1' || params.get('autostart') === '1') {
      return true;
    }
    const countdown = calculateThailandCountdown();
    return countdown.isUnlocked;
  });

  const handleUnlock = () => {
    setIsUnlocked(true);
    setShowCelebrationReveal(true);
  };

  // Check Thailand time periodically
  useEffect(() => {
    const timer = setInterval(() => {
      const countdown = calculateThailandCountdown();
      if (countdown.isUnlocked && !isUnlocked) {
        handleUnlock();
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [isUnlocked]);

  const handleToggleMusic = () => {
    const playing = soundEngine.toggleMusic();
    setIsMusicPlaying(playing);
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    soundEngine.setMuted(nextMuted);
    setIsMuted(nextMuted);
    if (nextMuted) {
      setIsMusicPlaying(false);
    }
  };

  const handleBlowCandles = (wish: string) => {
    setCandlesBlown(true);
    setSavedWish(wish);
  };

  const handleRelightCandles = () => {
    setCandlesBlown(false);
  };

  // If before birthday in Thailand time and not unlocked by secret passcode/preview, show Lock Screen
  if (!isUnlocked) {
    return (
      <BirthdayLockScreen
        onUnlock={handleUnlock}
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={handleToggleMusic}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-[#0b0510] text-[#fdf2f8] selection:bg-pink-600 selection:text-white">
      {/* 3D WebGL Canvas Layer - Fixed in Background for the Hero Section */}
      <div className="fixed inset-0 z-0 w-full h-full pointer-events-auto">
        <ThreeCanvas candlesBlown={candlesBlown} cameraPreset={cameraPreset} />
      </div>

      {/* Top Header Navigation */}
      <HeaderNavbar
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={handleToggleMusic}
        onOpenLetter={() => setIsLetterOpen(true)}
        onOpenGift={() => setIsGiftOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* Hero Section with Interactive Candle Blowout */}
        <HeroSection
          candlesBlown={candlesBlown}
          onBlowCandles={handleBlowCandles}
          onRelightCandles={handleRelightCandles}
          savedWish={savedWish}
        />

        {/* Scrollable Romantic Content Sections with Dark/Vibrant Backdrop */}
        <div className="relative z-20 bg-gradient-to-b from-transparent via-[#0e0414]/95 to-[#09020d] backdrop-blur-xs pt-12 pb-24 border-t border-rose-950/40 shadow-2xl">
          {/* 13 Reasons Why Talha Adores BB */}
          <ThirteenReasons />

          {/* Polaroid Love Scrapbook & Memories */}
          <ScrapbookSection />

          {/* Love Constellation Map */}
          <LoveConstellation />

          {/* Love Notes & Countdown */}
          <LoveMessageBoard />
        </div>
      </main>

      {/* Grand Automatic Birthday Countdown Reveal Modal */}
      {showCelebrationReveal && (
        <BirthdayCountdownReveal onDismiss={() => setShowCelebrationReveal(false)} />
      )}

      {/* Love Letter Modal from Talha */}
      <LoveLetterModal
        isOpen={isLetterOpen}
        onClose={() => setIsLetterOpen(false)}
      />

      {/* Surprise Birthday Gift Box Modal */}
      <SurpriseGiftModal
        isOpen={isGiftOpen}
        onClose={() => setIsGiftOpen(false)}
      />

      {/* Sleek Collapsible Bottom Dock (Three.js Skill standard) */}
      <BottomControlDock
        cameraPreset={cameraPreset}
        onSetCameraPreset={setCameraPreset}
        onOpenLetter={() => setIsLetterOpen(true)}
        onOpenGift={() => setIsGiftOpen(true)}
        onTriggerReveal={() => setShowCelebrationReveal(true)}
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={handleToggleMusic}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />
    </div>
  );
}
