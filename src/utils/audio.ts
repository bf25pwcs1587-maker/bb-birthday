/**
 * Procedural Web Audio API Sound Synthesizer
 * Zero external audio files or network dependencies.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isMusicPlaying: boolean = false;
  private musicIntervalId: number | null = null;
  private currentNoteIndex: number = 0;

  // Romantic music box notes for "Happy Birthday" melody (frequencies in Hz)
  // C4, C4, D4, C4, F4, E4 ...
  private readonly melodyNotes: Array<{ freq: number; dur: number; pause: number }> = [
    { freq: 261.63, dur: 0.35, pause: 0.1 }, // Hap-
    { freq: 261.63, dur: 0.35, pause: 0.1 }, // py
    { freq: 293.66, dur: 0.6, pause: 0.15 }, // birth-
    { freq: 261.63, dur: 0.6, pause: 0.15 }, // day
    { freq: 349.23, dur: 0.6, pause: 0.15 }, // to
    { freq: 329.63, dur: 1.1, pause: 0.3 },  // you (E4)

    { freq: 261.63, dur: 0.35, pause: 0.1 }, // Hap-
    { freq: 261.63, dur: 0.35, pause: 0.1 }, // py
    { freq: 293.66, dur: 0.6, pause: 0.15 }, // birth-
    { freq: 261.63, dur: 0.6, pause: 0.15 }, // day
    { freq: 392.00, dur: 0.6, pause: 0.15 }, // to
    { freq: 349.23, dur: 1.1, pause: 0.3 },  // you (F4)

    { freq: 261.63, dur: 0.35, pause: 0.1 }, // Hap-
    { freq: 261.63, dur: 0.35, pause: 0.1 }, // py
    { freq: 523.25, dur: 0.6, pause: 0.15 }, // birth- (C5)
    { freq: 440.00, dur: 0.6, pause: 0.15 }, // day
    { freq: 349.23, dur: 0.6, pause: 0.15 }, // dear
    { freq: 329.63, dur: 0.6, pause: 0.15 }, // BB
    { freq: 293.66, dur: 1.1, pause: 0.3 },  // (Talha loves you)

    { freq: 466.16, dur: 0.35, pause: 0.1 }, // Hap- (Bb4)
    { freq: 466.16, dur: 0.35, pause: 0.1 }, // py
    { freq: 440.00, dur: 0.6, pause: 0.15 }, // birth- (A4)
    { freq: 349.23, dur: 0.6, pause: 0.15 }, // day
    { freq: 392.00, dur: 0.6, pause: 0.15 }, // to
    { freq: 349.23, dur: 1.4, pause: 0.6 },  // you! (F4)

    // Romantic music box interlude arpeggio
    { freq: 523.25, dur: 0.4, pause: 0.1 },
    { freq: 659.25, dur: 0.4, pause: 0.1 },
    { freq: 783.99, dur: 0.5, pause: 0.2 },
    { freq: 1046.50, dur: 0.8, pause: 0.4 },
  ];

  private initCtx(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.isMusicPlaying) {
      this.stopMusic();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public getIsMusicPlaying(): boolean {
    return this.isMusicPlaying;
  }

  /**
   * Plays a crystal music box bell tone
   */
  public playMusicBoxNote(freq: number, duration: number = 0.6, gainLevel: number = 0.2) {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const oscHarmonic = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Subtle second harmonic for music box sparkle
    oscHarmonic.type = 'triangle';
    oscHarmonic.frequency.setValueAtTime(freq * 2, now);

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(gainLevel, now + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gainNode);
    oscHarmonic.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now);
    oscHarmonic.start(now);
    osc.stop(now + duration + 0.05);
    oscHarmonic.stop(now + duration + 0.05);
  }

  /**
   * Toggle background romantic music box melody
   */
  public toggleMusic(): boolean {
    if (this.isMusicPlaying) {
      this.stopMusic();
      return false;
    } else {
      this.startMusic();
      return true;
    }
  }

  public startMusic() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    this.isMusicPlaying = true;
    this.currentNoteIndex = 0;
    this.playNextMusicNote();
  }

  private playNextMusicNote = () => {
    if (!this.isMusicPlaying || this.isMuted) return;
    const note = this.melodyNotes[this.currentNoteIndex];
    this.playMusicBoxNote(note.freq, note.dur, 0.15);

    const delay = (note.dur + note.pause) * 1000;
    this.currentNoteIndex = (this.currentNoteIndex + 1) % this.melodyNotes.length;

    this.musicIntervalId = window.setTimeout(this.playNextMusicNote, delay);
  };

  public stopMusic() {
    this.isMusicPlaying = false;
    if (this.musicIntervalId !== null) {
      window.clearTimeout(this.musicIntervalId);
      this.musicIntervalId = null;
    }
  }

  /**
   * Sound of blowing out candles (whoosh air & extinguishing)
   */
  public playCandleBlowSound() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const bufferSize = ctx.sampleRate * 1.0;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.9);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.95);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
  }

  /**
   * Sparkle sound for wishes & confetti
   */
  public playSparkleSound() {
    if (this.isMuted) return;
    const notes = [587.33, 739.99, 880.00, 1174.66, 1479.98];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playMusicBoxNote(freq, 0.45, 0.12);
      }, idx * 75);
    });
  }

  /**
   * Celebration Fanfare when candles are blown
   */
  public playCelebrationFanfare() {
    if (this.isMuted) return;
    const arpeggio = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
    arpeggio.forEach((f, i) => {
      setTimeout(() => {
        this.playMusicBoxNote(f, 0.6, 0.18);
      }, i * 90);
    });
  }

  /**
   * Wax seal unseal crack / open
   */
  public playWaxSealSound() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.18);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.19);
  }

  /**
   * Gentle pop or button click
   */
  public playPopSound() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.08);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  }
}

export const soundEngine = new SoundEngine();
