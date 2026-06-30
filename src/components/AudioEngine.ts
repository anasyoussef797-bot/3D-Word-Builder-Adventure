/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

class AudioEngine {
  private ctx: AudioContext | null = null;
  private isEnabled: boolean = true;
  private isVoiceEnabled: boolean = true;
  private bgmIntervalId: any = null;
  private bgmPlaying: boolean = false;

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleSound(enabled: boolean) {
    this.isEnabled = enabled;
    if (!enabled) {
      this.stopBGM();
    } else {
      this.startBGM();
    }
  }

  toggleVoice(enabled: boolean) {
    this.isVoiceEnabled = enabled;
  }

  getSoundStatus() {
    return this.isEnabled;
  }

  getVoiceStatus() {
    return this.isVoiceEnabled;
  }

  // Soft happy background music loop synthesized dynamically
  startBGM() {
    if (!this.isEnabled || this.bgmPlaying) return;
    this.initCtx();
    if (!this.ctx) return;

    this.bgmPlaying = true;
    let step = 0;

    // Cheerful bouncy nursery rhyme progression in C Major
    const playStep = () => {
      if (!this.bgmPlaying || !this.isEnabled || !this.ctx) return;

      const t = this.ctx.currentTime;
      const beat = step % 16;

      // Bass notes (Triangle wave - warm and bouncy)
      // C3 (130.81), F3 (174.61), G3 (196.00)
      let bassFreq = 0;
      if (beat < 4) bassFreq = 130.81; // C3
      else if (beat < 8) bassFreq = 174.61; // F3
      else if (beat < 12) bassFreq = 196.00; // G3
      else bassFreq = 130.81; // C3

      // Play bass on beats 0 and 2 of each 4-beat bar
      if (beat % 2 === 0) {
        const bassOsc = this.ctx.createOscillator();
        const bassGain = this.ctx.createGain();
        bassOsc.type = 'triangle';
        bassOsc.frequency.setValueAtTime(bassFreq, t);

        bassGain.gain.setValueAtTime(0, t);
        bassGain.gain.linearRampToValueAtTime(0.012, t + 0.05); // soft bass
        bassGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);

        bassOsc.connect(bassGain);
        bassGain.connect(this.ctx.destination);
        bassOsc.start(t);
        bassOsc.stop(t + 0.4);
      }

      // Happy Melody notes (Sine wave - sweet and pure)
      // C Major Pentatonic melody: C5, D5, E5, G5, A5, C6
      const melodyNotes = [
        523.25, 587.33, 659.25, 783.99, 880.00, 1046.50
      ];
      
      // Happy upbeat pattern
      // C, E, G, E, F, A, C6, A, G, B, D6, B, C, G, E, C
      const pattern = [0, 2, 3, 2, 1, 4, 5, 4, 3, 5, 4, 5, 0, 3, 2, 0];
      const melodyIdx = pattern[beat];
      let melodyFreq = melodyNotes[melodyIdx];
      if (melodyIdx === 6) melodyFreq = 1174.66; // D6

      // Play melody on alternating steps for a lively feeling
      if (beat % 2 === 1 || beat % 4 === 0) {
        const melOsc = this.ctx.createOscillator();
        const melGain = this.ctx.createGain();
        melOsc.type = 'sine';
        melOsc.frequency.setValueAtTime(melodyFreq, t);

        melGain.gain.setValueAtTime(0, t);
        melGain.gain.linearRampToValueAtTime(0.01, t + 0.05); // soft, clean, background melody
        melGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);

        melOsc.connect(melGain);
        melGain.connect(this.ctx.destination);
        melOsc.start(t);
        melOsc.stop(t + 0.3);
      }

      step++;
    };

    // Stop any existing BGM interval
    if (this.bgmIntervalId) {
      clearInterval(this.bgmIntervalId);
    }

    // Warm up and play first step
    playStep();
    this.bgmIntervalId = setInterval(playStep, 250); // 120 BPM sixteenth notes / bouncy steps!
  }

  stopBGM() {
    this.bgmPlaying = false;
    if (this.bgmIntervalId) {
      clearInterval(this.bgmIntervalId);
      this.bgmIntervalId = null;
    }
  }

  // Synthesize game sound effects using Web Audio API
  playClick() {
    if (!this.isEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  playPickup() {
    if (!this.isEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(300, this.ctx.currentTime);
    osc.frequency.setValueAtTime(500, this.ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.15);
  }

  playSuccess() {
    if (!this.isEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99]; // C4, E4, G4, C5, E5, G5

    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t + idx * 0.08);

      gain.gain.setValueAtTime(0, t + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.1, t + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.08 + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t + idx * 0.08);
      osc.stop(t + idx * 0.08 + 0.45);
    });
  }

  playError() {
    if (!this.isEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(100, this.ctx.currentTime + 0.3);

    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.3);
  }

  playSparkle() {
    if (!this.isEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    for (let i = 0; i < 5; i++) {
      const freq = 1000 + Math.random() * 2000;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t + i * 0.05);

      gain.gain.setValueAtTime(0, t + i * 0.05);
      gain.gain.linearRampToValueAtTime(0.05, t + i * 0.05 + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.05 + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t + i * 0.05);
      osc.stop(t + i * 0.05 + 0.2);
    }
  }

  playKidsCheering() {
    if (!this.isEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    // 1. Triumphant fast arpeggio chords (C major happy notes)
    const rootNotes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
    rootNotes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t + idx * 0.05);

      gain.gain.setValueAtTime(0, t + idx * 0.05);
      gain.gain.linearRampToValueAtTime(0.08, t + idx * 0.05 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.05 + 0.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t + idx * 0.05);
      osc.stop(t + idx * 0.05 + 0.9);
    });

    // 2. Synthesize 3 high-pitched "woohoo" vocal slides simulating children cheering!
    const cheerTimes = [0.1, 0.25, 0.4];
    cheerTimes.forEach((delay, index) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      // Slide from 550Hz up to 950Hz (child vocal ranges)
      const startFreq = 550 + index * 40;
      const endFreq = 950 + index * 80;
      
      osc.frequency.setValueAtTime(startFreq, t + delay);
      osc.frequency.exponentialRampToValueAtTime(endFreq, t + delay + 0.35);

      // Cute kid pitch vibrato LFO
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.value = 16; 
      lfoGain.gain.value = 25; 
      
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);

      gain.gain.setValueAtTime(0, t + delay);
      gain.gain.linearRampToValueAtTime(0.05, t + delay + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, t + delay + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      lfo.start(t + delay);
      osc.start(t + delay);

      lfo.stop(t + delay + 0.45);
      osc.stop(t + delay + 0.45);
    });

    // 3. Synthesize applause/cheering noise bursts (sounds like laughing & clapping children)
    try {
      const bufferSize = this.ctx.sampleRate * 1.5;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.value = 1000;

      const bandpass = this.ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(1500, t);
      bandpass.frequency.exponentialRampToValueAtTime(2500, t + 1.5);
      bandpass.Q.value = 1.5;

      const noiseNode = this.ctx.createBufferSource();
      noiseNode.buffer = buffer;

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.05, t);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 1.5);

      noiseNode.connect(filter);
      filter.connect(bandpass);
      bandpass.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);

      noiseNode.start(t);
      noiseNode.stop(t + 1.5);
    } catch (e) {
      console.warn("Cheering audio synthesis fallback activated", e);
    }
  }

  // Speak using the custom server-side TTS proxy with robust fallback to CORS proxy, direct client-side Google TTS and Web Speech API
  speak(text: string, lang: 'ar' | 'en' | 'fr' | 'de', pitch = 1.2, rate = 0.85) {
    if (!this.isVoiceEnabled) return;

    const playDirectFallback = () => {
      try {
        // Direct Client-Side Google Translate TTS URL as a fallback (works perfectly in browsers without CORS block for <audio> elements)
        const directUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${lang}&client=tw-ob&q=${encodeURIComponent(text)}`;
        
        // Create audio element and set referrerpolicy="no-referrer" to strip the Referer header!
        // This is crucial for Vercel deployment because Google Translate blocks requests containing third-party Referer headers.
        const audioDirect = document.createElement('audio');
        audioDirect.setAttribute('referrerpolicy', 'no-referrer');
        audioDirect.src = directUrl;
        audioDirect.volume = 0.95;

        audioDirect.play().catch(err => {
          console.warn("Direct Client TTS play failed, trying standard SpeechSynthesis:", err);
          this.speakWithSpeechSynthesis(text, lang, pitch, rate);
        });
      } catch (e) {
        console.warn("Direct Client TTS initialization failed, trying standard SpeechSynthesis:", e);
        this.speakWithSpeechSynthesis(text, lang, pitch, rate);
      }
    };

    const playCorsProxyFallback = () => {
      try {
        const googleUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${lang}&client=tw-ob&q=${encodeURIComponent(text)}`;
        const corsProxyUrl = `https://corsproxy.io/?${encodeURIComponent(googleUrl)}`;
        
        const audioCors = document.createElement('audio');
        audioCors.setAttribute('referrerpolicy', 'no-referrer');
        audioCors.src = corsProxyUrl;
        audioCors.volume = 0.95;

        let fallbackTriggered = false;
        const triggerDirectFallback = () => {
          if (fallbackTriggered) return;
          fallbackTriggered = true;
          playDirectFallback();
        };

        audioCors.addEventListener('error', () => {
          triggerDirectFallback();
        });

        audioCors.play().catch(() => {
          triggerDirectFallback();
        });
      } catch (e) {
        console.warn("CORS Proxy TTS initialization failed, trying Direct Fallback:", e);
        playDirectFallback();
      }
    };

    // Try our high-quality server-side proxy
    try {
      const proxyUrl = `/api/tts?lang=${lang}&text=${encodeURIComponent(text)}`;
      const audioProxy = document.createElement('audio');
      // Set referrerpolicy to no-referrer as well for proxy consistency
      audioProxy.setAttribute('referrerpolicy', 'no-referrer');
      audioProxy.src = proxyUrl;
      audioProxy.volume = 0.95;

      let fallbackTriggered = false;
      const triggerFallback = () => {
        if (fallbackTriggered) return;
        fallbackTriggered = true;
        playCorsProxyFallback();
      };

      audioProxy.addEventListener('error', () => {
        triggerFallback();
      });

      audioProxy.play().catch(() => {
        triggerFallback();
      });
    } catch (error) {
      console.warn("Server TTS initialization failed, falling back to CORS proxy TTS:", error);
      playCorsProxyFallback();
    }
  }

  private speakWithSpeechSynthesis(text: string, lang: 'ar' | 'en' | 'fr' | 'de', pitch = 1.2, rate = 0.85) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    // Workaround for speech synthesis getting stuck on various mobile/desktop browsers
    try {
      window.speechSynthesis.cancel();
    } catch (e) {
      console.warn("speechSynthesis control error", e);
    }

    // Wait 60ms to let the audio context/synthesis cancellation settle down before issuing next voice request
    setTimeout(() => {
      if (typeof window === 'undefined' || !window.speechSynthesis) return;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = pitch; // Child-friendly slightly higher pitch
      utterance.rate = rate;   // Marginally slower rate for clarity

      // Configure correct language tags
      switch (lang) {
        case 'ar':
          utterance.lang = 'ar-SA'; // Standard Arabic
          break;
        case 'en':
          utterance.lang = 'en-GB';
          break;
        case 'fr':
          utterance.lang = 'fr-FR';
          break;
        case 'de':
          utterance.lang = 'de-DE';
          break;
      }

      // Aggressive Arabic & locale voice finder
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        // First try to find a native Arabic voice if language is Arabic
        const match = voices.find(v => {
          const vLang = v.lang.toLowerCase();
          return vLang.startsWith(lang) || 
                 vLang.includes(lang) ||
                 (lang === 'ar' && (vLang.includes('arabic') || vLang.includes('ar-') || vLang.includes('ar_')));
        });
        if (match) {
          utterance.voice = match;
          utterance.lang = match.lang;
        }
      }

      utterance.onerror = (e) => {
        console.warn('Speech synthesis error:', e);
        // Fallback: if voice fails, play a sweet visual sparkle sound to stay engaging
        this.playSparkle();
      };

      window.speechSynthesis.speak(utterance);
    }, 60);
  }

  // Say individual letters with specialized phonetic mappings for educational excellence
  speakLetter(letter: string, lang: 'ar' | 'en' | 'fr' | 'de') {
    if (lang === 'ar') {
      const ARABIC_LETTER_NAMES: Record<string, string> = {
        'أ': 'ألف',
        'ب': 'باء',
        'ت': 'تاء',
        'ث': 'ثاء',
        'ج': 'جيم',
        'ح': 'حاء',
        'خ': 'خاء',
        'د': 'دال',
        'ذ': 'ذال',
        'ر': 'راء',
        'ز': 'زاي',
        'س': 'سين',
        'ش': 'شين',
        'ص': 'صاد',
        'ض': 'ضاد',
        'ط': 'طاء',
        'ظ': 'ظاء',
        'ع': 'عين',
        'غ': 'غين',
        'ف': 'فاء',
        'ق': 'قاف',
        'ك': 'كاف',
        'ل': 'لام',
        'م': 'ميم',
        'ن': 'نون',
        'ه': 'هاء',
        'و': 'واو',
        'ي': 'ياء',
        'ة': 'تاء مربوطة',
        'أرنب': 'أرنب',
        'تفاحة': 'تفاحة',
        'بطة': 'بطة',
        'فيل': 'فيل',
        'سمكة': 'سمكة'
      };
      const cleanLetter = letter.trim();
      const phoneticName = ARABIC_LETTER_NAMES[cleanLetter] || cleanLetter;
      this.speak(phoneticName, lang, 1.3, 0.75);
    } else {
      this.speak(letter, lang, 1.3, 0.75);
    }
  }
}

// Warm up Web Speech API voices on load (critical for Chrome & Safari)
if (typeof window !== 'undefined' && window.speechSynthesis) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}

export const gameAudio = new AudioEngine();
