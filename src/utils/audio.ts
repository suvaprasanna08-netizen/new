/**
 * Web Audio Procedural Soundtrack & Sound Effects
 *
 * Provides a gentle, magical music box celesta melody using pure Web Audio API,
 * so the application has zero external audio file dependencies and zero failure modes.
 * Also supports an optional custom audio file URL with graceful fallback.
 */

class BirthdayAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private isMuted = false;
  private volume = 0.55;
  private schedulerInterval: number | null = null;
  private currentNoteIndex = 0;
  private audioElement: HTMLAudioElement | null = null;
  private customAudioFailed = false;

  // Magical celestial melody (frequencies in Hz: Pentatonic D-Lydian scale)
  // D4, F#4, A4, B4, C#5, D5, E5, F#5
  private melodyNotes: number[] = [
    293.66, 369.99, 440.00, 493.88, 554.37, 587.33, 554.37, 493.88,
    440.00, 369.99, 293.66, 369.99, 440.00, 587.33, 659.25, 739.99,
    659.25, 587.33, 493.88, 440.00, 369.99, 440.00, 493.88, 587.33,
    739.99, 659.25, 587.33, 440.00, 369.99, 293.66, 440.00, 293.66
  ];

  // Soft bass accompaniment arpeggio
  private bassNotes: number[] = [
    146.83, 220.00, 293.66, 220.00, // D
    164.81, 220.00, 329.63, 220.00, // E
    185.00, 220.00, 369.99, 220.00, // F#
    146.83, 220.00, 293.66, 220.00  // D
  ];

  private getAudioContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public init(customUrl?: string) {
    if (customUrl && !this.customAudioFailed) {
      try {
        this.audioElement = new Audio(customUrl);
        this.audioElement.loop = true;
        this.audioElement.volume = this.volume;
        this.audioElement.onerror = () => {
          this.customAudioFailed = true;
          this.audioElement = null;
        };
      } catch {
        this.customAudioFailed = true;
      }
    }
  }

  public togglePlay(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public play() {
    this.isPlaying = true;

    // If custom audio is configured and working
    if (this.audioElement && !this.customAudioFailed) {
      this.audioElement.volume = this.isMuted ? 0 : this.volume;
      this.audioElement.play().catch(() => {
        // Fallback to synth if autoplay or file failed
        this.startSynthMelody();
      });
      return;
    }

    this.startSynthMelody();
  }

  public pause() {
    this.isPlaying = false;
    if (this.audioElement) {
      this.audioElement.pause();
    }
    if (this.schedulerInterval) {
      window.clearInterval(this.schedulerInterval);
      this.schedulerInterval = null;
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.audioElement) {
      this.audioElement.volume = this.isMuted ? 0 : this.volume;
    }
    return this.isMuted;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.audioElement) {
      this.audioElement.volume = this.isMuted ? 0 : this.volume;
    }
  }

  public getStatus() {
    return {
      isPlaying: this.isPlaying,
      isMuted: this.isMuted,
      volume: this.volume,
    };
  }

  private startSynthMelody() {
    const ctx = this.getAudioContext();
    if (this.schedulerInterval) {
      window.clearInterval(this.schedulerInterval);
    }

    // Step every 520ms (roughly ~58 BPM dreamy lullaby)
    this.schedulerInterval = window.setInterval(() => {
      if (!this.isPlaying || this.isMuted) return;

      const noteFreq = this.melodyNotes[this.currentNoteIndex % this.melodyNotes.length];
      const bassFreq = this.bassNotes[Math.floor(this.currentNoteIndex / 2) % this.bassNotes.length];

      this.playMusicBoxNote(ctx, noteFreq, 0.45 * this.volume, 1.4);

      // Trigger soft bass note every other beat
      if (this.currentNoteIndex % 2 === 0) {
        this.playSoftWarmDrone(ctx, bassFreq, 0.25 * this.volume, 2.2);
      }

      this.currentNoteIndex++;
    }, 520);
  }

  private playMusicBoxNote(ctx: AudioContext, freq: number, gainLevel: number, decaySec: number) {
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Celesta bell-like timbre: sine with subtle octave overtone
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Filter to warm the chime
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(freq * 3.5, now);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(gainLevel, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + decaySec);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + decaySec);
  }

  private playSoftWarmDrone(ctx: AudioContext, freq: number, gainLevel: number, decaySec: number) {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(gainLevel, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + decaySec);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + decaySec);
  }

  /**
   * Sound effects for interactive actions
   */
  public playSoundEffect(effect: 'sparkle' | 'envelope' | 'pop' | 'candle' | 'wish' | 'chime' | 'bell') {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      const now = ctx.currentTime;

      if (effect === 'sparkle') {
        // Shimmering chord of bells
        [880, 1046.5, 1318.51, 1567.98].forEach((freq, idx) => {
          setTimeout(() => {
            this.playMusicBoxNote(ctx, freq, 0.25 * this.volume, 0.8);
          }, idx * 60);
        });
      } else if (effect === 'envelope') {
        // Gentle whoosh / chime opening
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.3);
        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.3 * this.volume, now + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.4);
      } else if (effect === 'candle') {
        // Warm flame chime
        this.playMusicBoxNote(ctx, 659.25, 0.3 * this.volume, 1.2);
      } else if (effect === 'wish') {
        // Deep magical resonant chime
        [587.33, 739.99, 880, 1174.66].forEach((f, i) => {
          setTimeout(() => {
            this.playMusicBoxNote(ctx, f, 0.28 * this.volume, 2.0);
          }, i * 90);
        });
      } else if (effect === 'pop') {
        // Gentle celebratory pop
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(60, now + 0.1);
        gain.gain.setValueAtTime(0.4 * this.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.15);
      } else {
        this.playMusicBoxNote(ctx, 880, 0.3 * this.volume, 1.0);
      }
    } catch {
      // Audio not supported or gesture needed; gracefully continue
    }
  }
}

export const audioEngine = new BirthdayAudioEngine();
