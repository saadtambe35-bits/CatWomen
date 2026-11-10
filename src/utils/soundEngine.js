// Web Audio API procedural sound engine
// 100% self-contained, no external mp3 assets that could break or fail to load!

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.isBgmPlaying = false;
    this.bgmTimer = null;
    this.currentNoteIndex = 0;
    this.masterGain = null;
    this.bgmGain = null;

    // Ambient channels
    this.rainNode = null;
    this.rainGain = null;
    this.purrNode = null;
    this.purrGain = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.8, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.bgmGain = this.ctx.createGain();
      this.bgmGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.bgmGain.connect(this.masterGain);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(muted ? 0 : 0.8, this.ctx.currentTime, 0.05);
    }
  }

  // Soft Kalimba / Music Box note
  playKalimbaNote(freq, time, duration = 1.2, volume = 0.25) {
    if (!this.ctx || this.isMuted) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);

      // Add slight overtone for metallic music box feel
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2.01, time);
      gain2.gain.setValueAtTime(volume * 0.15, time);
      gain2.gain.exponentialRampToValueAtTime(0.0001, time + duration * 0.5);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, time);

      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(volume, time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

      osc.connect(gain);
      osc2.connect(gain2);
      gain2.connect(filter);
      gain.connect(filter);
      filter.connect(this.bgmGain || this.masterGain);

      osc.start(time);
      osc2.start(time);
      osc.stop(time + duration);
      osc2.stop(time + duration);
    } catch {
      // AudioContext gracefully handled
    }
  }

  // Background Music: Gentle Lofi Music-Box Melody
  startBgm() {
    this.init();
    if (this.isBgmPlaying) return;
    this.isBgmPlaying = true;

    // Peaceful lullaby in C Major / A Minor pentatonic
    const notes = [
      { f: 523.25, d: 0.8 }, // C5
      { f: 659.25, d: 0.8 }, // E5
      { f: 783.99, d: 1.2 }, // G5
      { f: 587.33, d: 0.8 }, // D5
      { f: 523.25, d: 1.5 }, // C5
      { f: 440.00, d: 0.8 }, // A4
      { f: 392.00, d: 0.8 }, // G4
      { f: 523.25, d: 1.8 }, // C5

      { f: 659.25, d: 0.8 }, // E5
      { f: 587.33, d: 0.8 }, // D5
      { f: 523.25, d: 1.0 }, // C5
      { f: 440.00, d: 0.8 }, // A4
      { f: 392.00, d: 1.4 }, // G4
      { f: 329.63, d: 0.8 }, // E4
      { f: 392.00, d: 0.8 }, // G4
      { f: 523.25, d: 2.2 }, // C5
    ];

    let step = 0;
    const playNext = () => {
      if (!this.isBgmPlaying) return;
      const note = notes[step % notes.length];
      const now = this.ctx.currentTime;
      this.playKalimbaNote(note.f, now, note.d * 1.8, 0.22);

      // Occasional soft bass root note
      if (step % 4 === 0) {
        const bassFreq = (step % 8 === 0) ? 261.63 : 220.00; // C4 or A3
        this.playKalimbaNote(bassFreq * 0.5, now, 2.5, 0.15);
      }

      step++;
      const delayMs = note.d * 1000 * 0.95;
      this.bgmTimer = setTimeout(playNext, delayMs);
    };

    playNext();
  }

  stopBgm() {
    this.isBgmPlaying = false;
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  // Playful Kitty Meow
  playMeow(pitch = 'normal') {
    this.init();
    if (this.isMuted) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      let baseFreq = 480;
      let duration = 0.45;

      if (pitch === 'sleepy') {
        baseFreq = 340;
        duration = 0.55;
      } else if (pitch === 'silly') {
        baseFreq = 580;
        duration = 0.35;
      } else if (pitch === 'tiny') {
        baseFreq = 680;
        duration = 0.38;
      }

      osc.type = 'triangle';
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1000, now);
      filter.Q.setValueAtTime(2.5, now);

      osc.frequency.setValueAtTime(baseFreq * 0.85, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.35, now + duration * 0.35);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.75, now + duration);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.28, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + duration);
    } catch {
      // safe fallback
    }
  }

  // Realistic Warm Purring
  playPurr(duration = 2.5) {
    this.init();
    if (this.isMuted) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const mod = this.ctx.createOscillator();
      const modGain = this.ctx.createGain();
      const masterPurrGain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(75, now);

      mod.type = 'sine';
      mod.frequency.setValueAtTime(24, now);
      modGain.gain.setValueAtTime(30, now);
      mod.connect(modGain);
      modGain.connect(osc.frequency);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(220, now);

      masterPurrGain.gain.setValueAtTime(0.001, now);
      masterPurrGain.gain.linearRampToValueAtTime(0.35, now + 0.3);
      masterPurrGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(filter);
      filter.connect(masterPurrGain);
      masterPurrGain.connect(this.masterGain);

      mod.start(now);
      osc.start(now);
      mod.stop(now + duration);
      osc.stop(now + duration);
    } catch {
      // safe
    }
  }

  // Continuous Soothing Rain Ambient
  toggleRain(enable) {
    this.init();
    if (enable) {
      if (this.rainNode) return;
      try {
        const bufferSize = this.ctx.sampleRate * 2;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let lastOut = 0.0;
        // Generate soft pink noise
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          data[i] = (lastOut + 0.02 * white) / 1.02;
          lastOut = data[i];
          data[i] *= 2.5;
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, this.ctx.currentTime);

        this.rainGain = this.ctx.createGain();
        this.rainGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
        this.rainGain.gain.linearRampToValueAtTime(0.15, this.ctx.currentTime + 1);

        noise.connect(filter);
        filter.connect(this.rainGain);
        this.rainGain.connect(this.masterGain);

        noise.start();
        this.rainNode = noise;
      } catch {}
    } else {
      if (this.rainGain && this.ctx) {
        this.rainGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
        setTimeout(() => {
          if (this.rainNode) {
            try { this.rainNode.stop(); } catch {}
            this.rainNode = null;
          }
        }, 500);
      }
    }
  }

  // Flower Bloom Sparkle Chime
  playBloom() {
    this.init();
    if (this.isMuted) return;
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, i) => {
      setTimeout(() => {
        if (this.ctx) {
          this.playKalimbaNote(freq, this.ctx.currentTime, 0.8, 0.2);
        }
      }, i * 90);
    });
  }

  // Gentle Click / Sparkle
  playSparkle() {
    this.init();
    if (this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1174.66, now);
      osc.frequency.exponentialRampToValueAtTime(1567.98, now + 0.15);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.25);
    } catch {}
  }

  // Fish Caught Pop
  playCatch() {
    this.init();
    if (this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.15);
    } catch {}
  }

  // Breathing Guide Tone
  playBreathingChime(type = 'in') {
    this.init();
    if (this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      if (type === 'in') {
        osc.frequency.setValueAtTime(329.63, now);
        osc.frequency.exponentialRampToValueAtTime(440.00, now + 3.8);
      } else if (type === 'hold') {
        osc.frequency.setValueAtTime(440.00, now);
      } else {
        osc.frequency.setValueAtTime(440.00, now);
        osc.frequency.exponentialRampToValueAtTime(261.63, now + 5.8);
      }
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.001, now + (type === 'out' ? 5.8 : 3.8));
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + (type === 'out' ? 6 : 4));
    } catch {}
  }
}

export const sound = new SoundEngine();
