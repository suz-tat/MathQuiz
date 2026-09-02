/**
 * audio.js - Web Speech API（読み上げ）および Web Audio API（効果音合成）
 */

import { L10n } from './l10n.js';

class AudioManager {
  constructor() {
    this.audioCtx = null;
    this.speechSynthesis = window.speechSynthesis || null;
    this.soundEnabled = true;
    this.speechEnabled = true;
    this.japaneseVoice = null;
    this.englishVoice = null;

    if (this.speechSynthesis) {
      this.initVoices();
      if (typeof speechSynthesis.onvoiceschanged !== 'undefined') {
        speechSynthesis.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  initAudioContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  initVoices() {
    if (!this.speechSynthesis) return;
    const voices = this.speechSynthesis.getVoices();
    // 日本語のボイスを探す（自然な女性ボイス優先など）
    this.japaneseVoice = voices.find(v => v.lang === 'ja-JP' || v.lang === 'ja_JP' || v.lang.startsWith('ja')) || null;
    // 英語のボイスを探す
    this.englishVoice = voices.find(v => v.lang === 'en-US' || v.lang.startsWith('en')) || null;
  }

  setSoundEnabled(enabled) {
    this.soundEnabled = enabled;
  }

  setSpeechEnabled(enabled) {
    this.speechEnabled = enabled;
    if (!enabled && this.speechSynthesis) {
      this.speechSynthesis.cancel();
    }
  }

  /**
   * テキスト読み上げ (TTS)
   */
  speak(text) {
    if (!this.speechEnabled || !this.speechSynthesis) return;

    // 前の読み上げを停止
    this.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const isEn = L10n.isEnglish();
    utterance.lang = isEn ? 'en-US' : 'ja-JP';
    utterance.rate = isEn ? 0.95 : 1.0;
    utterance.pitch = 1.1; // 少し明るめのピッチ

    if (isEn && this.englishVoice) {
      utterance.voice = this.englishVoice;
    } else if (!isEn && this.japaneseVoice) {
      utterance.voice = this.japaneseVoice;
    }

    try {
      this.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error', e);
    }
  }

  /**
   * 問題の読み上げ
   */
  speakQuestion(question) {
    if (!question) return;
    const text = L10n.dict.ttsQuestion(question.num1, question.operator, question.num2);
    this.speak(text);
  }

  /**
   * 「せいかい」の読み上げ
   */
  speakCorrect() {
    const text = L10n.get(L10n.dict.ttsCorrect.ja, L10n.dict.ttsCorrect.en);
    this.speak(text);
  }

  /**
   * 効果音：タップ音（ポコッ）
   */
  playTap() {
    if (!this.soundEnabled) return;
    this.initAudioContext();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.05);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch (e) {
      // ignore
    }
  }

  /**
   * 効果音：正解音（ピンポン♫）
   */
  playCorrect() {
    if (!this.soundEnabled) return;
    this.initAudioContext();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      
      // 第1音 (高めのミ/E5 659.25Hz)
      const osc1 = this.audioCtx.createOscillator();
      const gain1 = this.audioCtx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(659.25, now);
      gain1.gain.setValueAtTime(0.25, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc1.connect(gain1);
      gain1.connect(this.audioCtx.destination);
      osc1.start(now);
      osc1.stop(now + 0.3);

      // 第2音 (ド/C6 1046.5Hz)
      const osc2 = this.audioCtx.createOscillator();
      const gain2 = this.audioCtx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1046.5, now + 0.18);
      gain2.gain.setValueAtTime(0.001, now);
      gain2.gain.setValueAtTime(0.3, now + 0.18);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.65);
      osc2.connect(gain2);
      gain2.connect(this.audioCtx.destination);
      osc2.start(now + 0.18);
      osc2.stop(now + 0.7);
    } catch (e) {
      // ignore
    }
  }

  /**
   * 効果音：不正解音（ブブー）
   */
  playWrong() {
    if (!this.soundEnabled) return;
    this.initAudioContext();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;

      // 2回の低い矩形波
      for (let i = 0; i < 2; i++) {
        const startTime = now + (i * 0.18);
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(146.83, startTime); // D3

        gain.gain.setValueAtTime(0.18, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.14);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.15);
      }
    } catch (e) {
      // ignore
    }
  }

  /**
   * 効果音：ファンファーレ / メダル獲得音（キラリン✨）
   */
  playFanfare() {
    if (!this.soundEnabled) return;
    this.initAudioContext();
    if (!this.audioCtx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      const now = this.audioCtx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        const startTime = now + (idx * 0.1);
        const duration = 0.4;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.2, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(startTime);
        osc.stop(startTime + duration + 0.05);
      });
    } catch (e) {
      // ignore
    }
  }
}

export const Audio = new AudioManager();
