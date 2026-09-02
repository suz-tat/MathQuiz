/**
 * MathQuiz (さんすう けいさん) - Standalone JavaScript Bundle
 * file:// プロトコル（直接ダブルクリック起動）および http:// サーバー環境の両方で
 * CORS制限なく完全に動作するように自己完結形式で実装されています。
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. 多言語対応 (L10n)
  // ==========================================================================
  const L10n = {
    currentLang: 'ja', // 'ja' or 'en'

    init() {
      const languages = navigator.languages || [navigator.language || navigator.userLanguage || 'ja'];
      const isJapanese = languages.some(lang => typeof lang === 'string' && lang.toLowerCase().startsWith('ja'));
      this.currentLang = isJapanese ? 'ja' : 'en';
    },

    setLanguage(lang) {
      this.currentLang = lang;
    },

    isEnglish() {
      return this.currentLang === 'en';
    },

    get(ja, en) {
      return this.isEnglish() ? en : ja;
    },

    dict: {
      appTitle: { ja: 'さんすう けいさん', en: 'Math Quiz' },
      appSubtitle: { ja: 'まいにち たのしく おべんきょう', en: 'Learning is fun every day' },
      start: { ja: 'はじめる', en: 'Start' },
      settings: { ja: 'せってい', en: 'Settings' },
      viewWeakArea: { ja: 'にがてな もんだい を みる', en: 'View Weak Area' },
      back: { ja: 'もどる', en: 'Back' },
      backToHome: { ja: 'さいしょにもどる', en: 'Back to Home' },
      goodJob: { ja: 'おつかれさまでした！', en: 'Good Job!' },
      tryAgain: { ja: 'もういちど はじめる', en: 'Try Again' },
      scoreMsg: (score, total) => L10n.isEnglish() ? `Score: ${score} / ${total}` : `${total} もん ちゅう、 ${score} もん せいかい です！`,
      rankPerfect: { ja: '👑 パーフェクト！ たいへん よくできました！💮', en: '👑 Perfect! Excellent Job! 💮' },
      rankGreat: { ja: '🌟 すごい！ よくがんばったね！', en: '🌟 Awesome! Great Effort!' },
      rankGood: { ja: '👍 ナイスチャレンジ！', en: '👍 Nice Challenge!' },
      rankEncourage: { ja: '🌈 おしい！ つぎは きっと できるよ！', en: '🌈 Good try! Keep it up!' },
      earnedBanner: (count) => L10n.isEnglish() ? `+${count} Medals Earned! ✨` : `＋${count}枚 メダルゲット！✨`,
      totalMedalsLabel: { ja: 'あつめた メダル:', en: 'Total Medals:' },
      coinsUnit: (count) => L10n.isEnglish() ? `${count}` : `${count}枚`,
      
      // 設定
      numberSize: { ja: 'かずの おおきさ', en: 'Number Size' },
      numberSizeSub: { ja: '1 から 99 まで', en: 'From 1 to 99' },
      timeLimit: { ja: 'にがて はんてい じかん', en: 'Weak Area Time Limit' },
      timeLimitSub: { ja: '1びょう から 99びょう まで', en: 'From 1 to 99 seconds' },
      calcType: { ja: 'けいさんの しゅるい', en: 'Calculation Type' },
      carryBorrow: { ja: 'くりあがり・くりさがり', en: 'Carry / Borrow' },
      yes: { ja: 'あり', en: 'Yes' },
      no: { ja: 'なし', en: 'No' },
      prioritizeMistakes: { ja: 'にがてな もんだい', en: 'Prioritize Mistakes' },
      prioritizeYes: { ja: 'ゆうせん', en: 'Yes' },
      prioritizeNo: { ja: 'ふつう', en: 'No' },
      questionsCount: { ja: 'もんだいの かず', en: 'Number of Questions' },
      q5: { ja: '5もん', en: '5 Qs' },
      q10: { ja: '10もん', en: '10 Qs' },
      q20: { ja: '20もん', en: '20 Qs' },
      totalCoins: { ja: 'これまでの せいかいすう', en: 'Total Coins' },
      coinsCollected: (count) => L10n.isEnglish() ? `Coins collected: ${count}` : `あつめた メダル: ${count} まい`,
      reset: { ja: 'リセット', en: 'Reset' },
      resetConfirm: { ja: 'これまでの せいかいすう を リセットしますか？', en: 'Do you want to reset total coin count?' },
      
      // クイズ
      questionHeader: (curr, total) => L10n.isEnglish() ? `【 Question ${curr} / ${total} 】` : `【 もんだい ${curr} / ${total} 】`,
      del: { ja: '消す', en: 'DEL' },
      ok: { ja: 'こたえる', en: 'OK' },
      correctFeedback: { ja: '⭕ せいかい！ よくできました！', en: '⭕ Correct! Well done!' },
      wrongFeedback: (ans) => L10n.isEnglish() ? `❌ Wrong... The answer was 【 ${ans} 】.` : `❌ ざんねん… こたえは 【 ${ans} 】 でした。`,
      ttsCorrect: { ja: 'せいかい', en: 'Correct' },
      ttsQuestion: (n1, op, n2) => {
        if (L10n.isEnglish()) {
          const opEn = op === '+' ? 'plus' : op === '-' ? 'minus' : 'times';
          return `${n1} ${opEn} ${n2} is?`;
        } else {
          const opJp = op === '+' ? 'たす' : op === '-' ? 'ひく' : 'かける';
          return `${n1} ${opJp} ${n2} は？`;
        }
      },

      // 苦手な問題
      weakAreaTitle: { ja: '苦手な問題', en: 'Weak Area' },
      weakAreaSub: { ja: '（正答時に自動消去）', en: '(Auto-delete on correct answer)' },
      selectToDelete: { ja: '消去する問題の選択', en: 'Select to Delete' },
      noWeakQuestions: { ja: '苦手な問題はありません。 🌟', en: 'No weak questions yet! 🌟' },
      clearLogs: { ja: '記録クリア', en: 'Clear Logs' },
      cancel: { ja: 'キャンセル', en: 'Cancel' },
      deleteSelected: { ja: '選択した問題を消す', en: 'Delete Selected' },
      weakLabel: { ja: '苦手', en: 'Weak' },
      wrongLabel: (ans) => L10n.isEnglish() ? `Wrong: ${ans}` : `誤答: ${ans}`,
      soundToggle: { ja: 'おんせい', en: 'Sound' },

      // Cookie / ストレージ同意
      cookieTitle: { ja: 'データのほぞん について', en: 'Data Storage Notice' },
      cookieDesc: {
        ja: 'このアプリでは、メダルのかず や せってい、にがてな もんだい を きろくするために ブラウザの ほぞんきのう（ストレージ / Cookie）を つかっています。',
        en: 'This app uses browser storage (Cookies / LocalStorage) to save your medal progress, settings, and weak questions.'
      },
      cookieAgree: { ja: '同意する（わかった！）', en: 'Agree (Got it!)' }
    }
  };

  // ==========================================================================
  // 2. ストレージ・データ永続化 (Storage)
  // ==========================================================================
  const CarryMode = {
    CarryOnly: 'CarryOnly', // あり
    NoCarry: 'NoCarry',     // なし
    Both: 'Both'            // りょうほう
  };

  const DefaultSettings = {
    maxNumber: 10,
    isAddition: true,
    isSubtraction: true,
    isMultiplication: false,
    carryMode: CarryMode.CarryOnly,
    prioritizeWrongQuestions: false,
    totalQuestions: 5,
    timeThresholdSeconds: 5,
    soundEnabled: true,
    speechEnabled: true
  };

  const STORAGE_KEYS = {
    SETTINGS: 'MathQuiz_settings',
    WRONG_QUESTIONS: 'MathQuiz_wrong_questions',
    TOTAL_CORRECT_COUNT: 'MathQuiz_total_correct_count',
    COOKIE_CONSENT: 'MathQuiz_cookie_consent'
  };

  const Storage = {
    hasCookieConsent() {
      try {
        return localStorage.getItem(STORAGE_KEYS.COOKIE_CONSENT) === 'true';
      } catch (e) {
        return false;
      }
    },

    setCookieConsent(agreed = true) {
      try {
        localStorage.setItem(STORAGE_KEYS.COOKIE_CONSENT, agreed ? 'true' : 'false');
      } catch (e) {
        console.error('Failed to save cookie consent', e);
      }
    },
    getSettings() {
      try {
        const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
        if (data) {
          return { ...DefaultSettings, ...JSON.parse(data) };
        }
      } catch (e) {
        console.warn('Failed to load settings from storage', e);
      }
      return { ...DefaultSettings };
    },

    saveSettings(settings) {
      try {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
      } catch (e) {
        console.error('Failed to save settings to storage', e);
      }
    },

    getTotalCorrectCount() {
      try {
        const data = localStorage.getItem(STORAGE_KEYS.TOTAL_CORRECT_COUNT);
        return data ? parseInt(data, 10) || 0 : 0;
      } catch (e) {
        console.warn('Failed to load correct count', e);
        return 0;
      }
    },

    saveTotalCorrectCount(count) {
      try {
        localStorage.setItem(STORAGE_KEYS.TOTAL_CORRECT_COUNT, count.toString());
      } catch (e) {
        console.error('Failed to save correct count', e);
      }
    },

    incrementTotalCorrectCount() {
      const current = this.getTotalCorrectCount();
      const updated = current + 1;
      this.saveTotalCorrectCount(updated);
      return updated;
    },

    resetTotalCorrectCount() {
      this.saveTotalCorrectCount(0);
    },

    getWrongQuestions() {
      try {
        const data = localStorage.getItem(STORAGE_KEYS.WRONG_QUESTIONS);
        if (data) {
          return JSON.parse(data);
        }
      } catch (e) {
        console.warn('Failed to load wrong questions', e);
      }
      return [];
    },

    saveWrongQuestions(list) {
      try {
        localStorage.setItem(STORAGE_KEYS.WRONG_QUESTIONS, JSON.stringify(list));
      } catch (e) {
        console.error('Failed to save wrong questions', e);
      }
    },

    addWrongQuestion(question, wrongAnswer, isSlow = false) {
      const list = this.getWrongQuestions();
      const filtered = list.filter(item => 
        !(item.num1 === question.num1 && item.num2 === question.num2 && item.operator === question.operator)
      );
      filtered.push({
        num1: question.num1,
        num2: question.num2,
        operator: question.operator,
        correctAnswer: question.correctAnswer,
        wrongAnswer: wrongAnswer,
        isSlow: isSlow
      });
      this.saveWrongQuestions(filtered);
      return filtered;
    },

    removeWrongQuestion(question) {
      const list = this.getWrongQuestions();
      const filtered = list.filter(item => 
        !(item.num1 === question.num1 && item.num2 === question.num2 && item.operator === question.operator)
      );
      this.saveWrongQuestions(filtered);
      return filtered;
    },

    removeWrongQuestions(toRemoveList) {
      const list = this.getWrongQuestions();
      const filtered = list.filter(item => 
        !toRemoveList.some(r => r.num1 === item.num1 && r.num2 === item.num2 && r.operator === item.operator)
      );
      this.saveWrongQuestions(filtered);
      return filtered;
    },

    clearWrongQuestions() {
      this.saveWrongQuestions([]);
    }
  };

  // ==========================================================================
  // 3. 問題生成・算数ロジック (QuizLogic)
  // ==========================================================================
  const QuizLogic = {
    hasAdditionCarry(num1, num2) {
      let n1 = num1;
      let n2 = num2;
      let c = 0;
      while (n1 > 0 || n2 > 0) {
        const d1 = n1 % 10;
        const d2 = n2 % 10;
        const sum = d1 + d2 + c;
        if (sum >= 10) return true;
        c = Math.floor(sum / 10);
        n1 = Math.floor(n1 / 10);
        n2 = Math.floor(n2 / 10);
      }
      return false;
    },

    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    generateQuestion(settings) {
      const modes = [];
      if (settings.isAddition) modes.push(1);
      if (settings.isSubtraction) modes.push(2);
      if (settings.isMultiplication) modes.push(3);

      if (modes.length === 0) {
        return { num1: 0, num2: 0, operator: '+', correctAnswer: 0, isFromWrongList: false };
      }

      const currentMode = modes[Math.floor(Math.random() * modes.length)];

      while (true) {
        const n1 = this.getRandomInt(1, Math.max(1, settings.maxNumber));
        const n2 = this.getRandomInt(1, Math.max(1, settings.maxNumber));

        if (currentMode === 2) { // 引き算
          const num1 = Math.max(n1, n2);
          const num2 = Math.min(n1, n2);
          const hasBorrow = (num1 % 10) < (num2 % 10);

          if (settings.carryMode === CarryMode.CarryOnly) {
            if (!hasBorrow && settings.maxNumber >= 10) continue;
          } else if (settings.carryMode === CarryMode.NoCarry) {
            if (hasBorrow) continue;
          }

          return {
            num1,
            num2,
            operator: '-',
            correctAnswer: num1 - num2,
            isFromWrongList: false
          };
        } else if (currentMode === 3) { // 掛け算
          const num1 = n1;
          const num2 = n2;
          return {
            num1,
            num2,
            operator: '×',
            correctAnswer: num1 * num2,
            isFromWrongList: false
          };
        } else { // 足し算
          const num1 = n1;
          const num2 = n2;
          const hasCarry = this.hasAdditionCarry(num1, num2);

          if (settings.carryMode === CarryMode.CarryOnly) {
            if (!hasCarry && settings.maxNumber >= 10) continue;
          } else if (settings.carryMode === CarryMode.NoCarry) {
            if (hasCarry) continue;
          }

          return {
            num1,
            num2,
            operator: '+',
            correctAnswer: num1 + num2,
            isFromWrongList: false
          };
        }
      }
    },

    generateQuestions(settings, count, wrongQuestions = []) {
      const questionsMap = new Map();
      const makeKey = (q) => `${q.num1}_${q.operator}_${q.num2}`;

      if (settings.prioritizeWrongQuestions && wrongQuestions && wrongQuestions.length > 0) {
        const validWrongQuestions = wrongQuestions.filter(wrongQ => {
          const modeMatches = 
            (wrongQ.operator === '+' && settings.isAddition) ||
            (wrongQ.operator === '-' && settings.isSubtraction) ||
            (wrongQ.operator === '×' && settings.isMultiplication);

          const numMatches = wrongQ.num1 <= settings.maxNumber && wrongQ.num2 <= settings.maxNumber;

          let carryMatches = true;
          if (settings.carryMode === CarryMode.CarryOnly) {
            if (wrongQ.operator === '+') {
              const hasCarry = this.hasAdditionCarry(wrongQ.num1, wrongQ.num2);
              carryMatches = hasCarry || settings.maxNumber < 10;
            } else if (wrongQ.operator === '-') {
              const hasBorrow = (wrongQ.num1 % 10) < (wrongQ.num2 % 10);
              carryMatches = hasBorrow || settings.maxNumber < 10;
            }
          } else if (settings.carryMode === CarryMode.NoCarry) {
            if (wrongQ.operator === '+') {
              carryMatches = !this.hasAdditionCarry(wrongQ.num1, wrongQ.num2);
            } else if (wrongQ.operator === '-') {
              carryMatches = (wrongQ.num1 % 10) >= (wrongQ.num2 % 10);
            }
          }

          return modeMatches && numMatches && carryMatches;
        }).map(wq => ({
          num1: wq.num1,
          num2: wq.num2,
          operator: wq.operator,
          correctAnswer: wq.correctAnswer,
          isFromWrongList: true
        }));

        const shuffledWrong = [...validWrongQuestions].sort(() => Math.random() - 0.5);
        for (const q of shuffledWrong.slice(0, count)) {
          questionsMap.set(makeKey(q), q);
        }
      }

      let attempts = 0;
      const maxAttempts = count * 150;

      while (questionsMap.size < count && attempts < maxAttempts) {
        const q = this.generateQuestion(settings);
        const key = makeKey(q);
        if (!questionsMap.has(key)) {
          questionsMap.set(key, q);
        }
        attempts++;
      }

      return Array.from(questionsMap.values());
    }
  };

  // ==========================================================================
  // 4. 音声読み上げ & 効果音 (Audio)
  // ==========================================================================
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
      this.japaneseVoice = voices.find(v => v.lang === 'ja-JP' || v.lang === 'ja_JP' || v.lang.startsWith('ja')) || null;
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

    speak(text) {
      if (!this.speechEnabled || !this.speechSynthesis) return;
      this.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      const isEn = L10n.isEnglish();
      utterance.lang = isEn ? 'en-US' : 'ja-JP';
      utterance.rate = isEn ? 0.95 : 1.0;
      utterance.pitch = 1.1;

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

    speakQuestion(question) {
      if (!question) return;
      const text = L10n.dict.ttsQuestion(question.num1, question.operator, question.num2);
      this.speak(text);
    }

    speakCorrect() {
      const text = L10n.get(L10n.dict.ttsCorrect.ja, L10n.dict.ttsCorrect.en);
      this.speak(text);
    }

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

    playCorrect() {
      if (!this.soundEnabled) return;
      this.initAudioContext();
      if (!this.audioCtx) return;

      try {
        const now = this.audioCtx.currentTime;
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

    playWrong() {
      if (!this.soundEnabled) return;
      this.initAudioContext();
      if (!this.audioCtx) return;

      try {
        const now = this.audioCtx.currentTime;
        for (let i = 0; i < 2; i++) {
          const startTime = now + (i * 0.18);
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(146.83, startTime);

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

    playMedalPop(index = 0) {
      if (!this.soundEnabled) return;
      this.initAudioContext();
      if (!this.audioCtx) return;

      try {
        const baseFreqs = [523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50];
        const freq = baseFreqs[index % baseFreqs.length] * (1 + Math.floor(index / baseFreqs.length) * 0.2);
        const now = this.audioCtx.currentTime;

        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(now);
        osc.stop(now + 0.15);
      } catch (e) {
        // ignore
      }
    }

    playFanfare() {
      if (!this.soundEnabled) return;
      this.initAudioContext();
      if (!this.audioCtx) return;

      try {
        const notes = [523.25, 659.25, 783.99, 1046.50];
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

  const Audio = new AudioManager();

  // ==========================================================================
  // 5. アプリケーション本体 (MathQuizApp)
  // ==========================================================================
  class MathQuizApp {
    constructor() {
      this.currentScreen = 'home';
      this.settings = Storage.getSettings();
      this.totalCorrectCount = Storage.getTotalCorrectCount();
      
      this.questions = [];
      this.currentQuestionIndex = 0;
      this.score = 0;
      this.historyIcons = [];
      this.userAnswer = '';
      this.isInputEnabled = true;
      this.questionStartTime = 0;
      this.nextQuestionTimeout = null;

      this.isWrongDeleteMode = false;
      this.selectedWrongItems = new Set();

      this.confettiParticles = [];
      this.confettiAnimId = null;

      this.init();
    }

    init() {
      L10n.init();
      const soundOn = this.settings.soundEnabled ?? true;
      this.settings.soundEnabled = soundOn;
      this.settings.speechEnabled = soundOn;
      Audio.setSoundEnabled(soundOn);
      Audio.setSpeechEnabled(soundOn);

      this.bindEvents();
      this.applyLanguage();
      this.updateHomeScreenUI();
      this.updateSoundToggleUI();
      this.checkCookieConsent();
      this.setupOrientationHandler();
      this.setupConfettiCanvas();
    }

    checkCookieConsent() {
      const banner = document.getElementById('cookie-consent-banner');
      if (!banner) return;
      if (!Storage.hasCookieConsent()) {
        banner.style.display = 'flex';
      } else {
        banner.style.display = 'none';
      }
    }

    applyLanguage() {
      const d = L10n.dict;
      const isEn = L10n.isEnglish();

      document.getElementById('txt-header-app-name').textContent = L10n.get(d.appTitle.ja, d.appTitle.en);

      document.getElementById('txt-home-title').textContent = L10n.get(d.appTitle.ja, d.appTitle.en);
      document.getElementById('txt-home-subtitle').textContent = L10n.get(d.appSubtitle.ja, d.appSubtitle.en);
      document.getElementById('txt-home-start').textContent = L10n.get(d.start.ja, d.start.en);
      document.getElementById('txt-home-settings').textContent = L10n.get(d.settings.ja, d.settings.en);
      document.getElementById('txt-home-wrong').textContent = L10n.get(d.viewWeakArea.ja, d.viewWeakArea.en);

      document.getElementById('txt-set-maxnum-title').textContent = L10n.get(d.numberSize.ja, d.numberSize.en);
      document.getElementById('txt-set-maxnum-sub').textContent = L10n.get(d.numberSizeSub.ja, d.numberSizeSub.en);
      document.getElementById('txt-set-time-title').textContent = L10n.get(d.timeLimit.ja, d.timeLimit.en);
      document.getElementById('txt-set-time-sub').textContent = L10n.get(d.timeLimitSub.ja, d.timeLimitSub.en);
      document.getElementById('txt-set-calctype-title').textContent = L10n.get(d.calcType.ja, d.calcType.en);
      document.getElementById('txt-set-carry-title').textContent = L10n.get(d.carryBorrow.ja, d.carryBorrow.en);
      document.getElementById('chip-carry-yes').textContent = L10n.get(d.yes.ja, d.yes.en);
      document.getElementById('chip-carry-no').textContent = L10n.get(d.no.ja, d.no.en);
      document.getElementById('txt-set-wrong-title').textContent = L10n.get(d.prioritizeMistakes.ja, d.prioritizeMistakes.en);
      document.getElementById('chip-wrong-priority').textContent = L10n.get(d.prioritizeYes.ja, d.prioritizeYes.en);
      document.getElementById('chip-wrong-normal').textContent = L10n.get(d.prioritizeNo.ja, d.prioritizeNo.en);
      document.getElementById('txt-set-count-title').textContent = L10n.get(d.questionsCount.ja, d.questionsCount.en);
      document.getElementById('chip-count-5').textContent = L10n.get(d.q5.ja, d.q5.en);
      document.getElementById('chip-count-10').textContent = L10n.get(d.q10.ja, d.q10.en);
      document.getElementById('chip-count-20').textContent = L10n.get(d.q20.ja, d.q20.en);
      document.getElementById('txt-set-coins-title').textContent = L10n.get(d.totalCoins.ja, d.totalCoins.en);
      document.getElementById('btn-reset-coins').textContent = L10n.get(d.reset.ja, d.reset.en);
      document.getElementById('txt-set-back').textContent = L10n.get(d.back.ja, d.back.en);

      document.getElementById('key-del').textContent = L10n.get(d.del.ja, d.del.en);
      document.getElementById('key-ok').textContent = L10n.get(d.ok.ja, d.ok.en);

      document.getElementById('txt-result-title').textContent = L10n.get(d.goodJob.ja, d.goodJob.en);
      document.getElementById('txt-result-restart').textContent = L10n.get(d.tryAgain.ja, d.tryAgain.en);
      document.getElementById('txt-result-home').textContent = L10n.get(d.backToHome.ja, d.backToHome.en);

      document.getElementById('txt-wrong-title').textContent = L10n.get(d.weakAreaTitle.ja, d.weakAreaTitle.en);
      document.getElementById('txt-wrong-sub').textContent = L10n.get(d.weakAreaSub.ja, d.weakAreaSub.en);
      document.getElementById('txt-empty-wrong').textContent = L10n.get(d.noWeakQuestions.ja, d.noWeakQuestions.en);
      document.getElementById('txt-wrong-back').textContent = L10n.get(d.back.ja, d.back.en);
      document.getElementById('txt-wrong-clear').textContent = L10n.get(d.clearLogs.ja, d.clearLogs.en);
      document.getElementById('txt-wrong-cancel').textContent = L10n.get(d.cancel.ja, d.cancel.en);
      document.getElementById('txt-wrong-del-selected').textContent = L10n.get(d.deleteSelected.ja, d.deleteSelected.en);

      document.getElementById('txt-cookie-title').textContent = L10n.get(d.cookieTitle.ja, d.cookieTitle.en);
      document.getElementById('txt-cookie-desc').textContent = L10n.get(d.cookieDesc.ja, d.cookieDesc.en);
      document.getElementById('txt-cookie-agree').textContent = L10n.get(d.cookieAgree.ja, d.cookieAgree.en);

      this.updateSettingsScreenUI();
    }

    updateHomeScreenUI() {
      this.totalCorrectCount = Storage.getTotalCorrectCount();
      document.getElementById('txt-home-coins').textContent = `× ${this.totalCorrectCount}`;

      const isValid = (this.settings.isAddition || this.settings.isSubtraction || this.settings.isMultiplication) &&
                      this.settings.maxNumber > 0;
      document.getElementById('btn-home-start').disabled = !isValid;
    }

    navigateTo(screenName) {
      Audio.playTap();
      if (this.nextQuestionTimeout) {
        clearTimeout(this.nextQuestionTimeout);
        this.nextQuestionTimeout = null;
      }

      document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
      });

      const target = document.getElementById(`screen-${screenName}`);
      if (target) {
        target.classList.add('active');
      }
      this.currentScreen = screenName;

      const appRoot = document.getElementById('app-root');
      if (screenName === 'quiz') {
        appRoot.classList.add('landscape-mode');
      } else {
        appRoot.classList.remove('landscape-mode');
      }

      if (screenName === 'home') {
        this.updateHomeScreenUI();
      } else if (screenName === 'settings') {
        this.updateSettingsScreenUI();
      } else if (screenName === 'wrong') {
        this.renderWrongQuestionsList();
      }
    }

    updateSoundToggleUI() {
      const isEnabled = !!this.settings.soundEnabled;
      const btn = document.getElementById('btn-sound-toggle');
      if (!btn) return;

      btn.classList.toggle('active', isEnabled);
      const titleText = isEnabled
        ? L10n.get('おんせい・こうかおん: ON', 'Sound & Audio: ON')
        : L10n.get('おんせい・こうかおん: OFF', 'Sound & Audio: OFF');
      btn.setAttribute('title', titleText);

      const svgEl = document.getElementById('svg-sound-icon');
      if (svgEl) {
        if (isEnabled) {
          svgEl.innerHTML = `
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          `;
        } else {
          svgEl.innerHTML = `
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <line x1="23" y1="9" x2="17" y2="15"></line>
            <line x1="17" y1="9" x2="23" y2="15"></line>
          `;
        }
      }
    }

    bindEvents() {
      document.getElementById('btn-sound-toggle').addEventListener('click', () => {
        const newState = !this.settings.soundEnabled;
        this.settings.soundEnabled = newState;
        this.settings.speechEnabled = newState;
        Storage.saveSettings(this.settings);
        Audio.setSoundEnabled(newState);
        Audio.setSpeechEnabled(newState);
        this.updateSoundToggleUI();
        if (newState) {
          Audio.playTap();
        }
      });

      const cookieAgreeBtn = document.getElementById('btn-cookie-agree');
      if (cookieAgreeBtn) {
        cookieAgreeBtn.addEventListener('click', () => {
          Audio.playTap();
          Storage.setCookieConsent(true);
          const banner = document.getElementById('cookie-consent-banner');
          if (banner) {
            banner.classList.add('fade-out');
            setTimeout(() => {
              banner.style.display = 'none';
              banner.classList.remove('fade-out');
            }, 300);
          }
        });
      }

      document.getElementById('btn-home-start').addEventListener('click', () => this.startQuiz());
      document.getElementById('btn-home-settings').addEventListener('click', () => this.navigateTo('settings'));
      document.getElementById('btn-home-wrong').addEventListener('click', () => this.navigateTo('wrong'));

      document.getElementById('btn-settings-back').addEventListener('click', () => this.navigateTo('home'));

      const maxNumInput = document.getElementById('input-max-number');
      maxNumInput.addEventListener('input', (e) => {
        let val = parseInt(e.target.value, 10);
        if (isNaN(val) || val < 1) val = 1;
        if (val > 99) val = 99;
        this.settings.maxNumber = val;
        Storage.saveSettings(this.settings);
        this.updateHomeScreenUI();
      });

      const timeThresholdInput = document.getElementById('input-time-threshold');
      timeThresholdInput.addEventListener('input', (e) => {
        let val = parseInt(e.target.value, 10);
        if (isNaN(val) || val < 1) val = 1;
        if (val > 99) val = 99;
        this.settings.timeThresholdSeconds = val;
        Storage.saveSettings(this.settings);
      });

      document.getElementById('chip-calc-add').addEventListener('click', () => this.toggleCalcType('isAddition'));
      document.getElementById('chip-calc-sub').addEventListener('click', () => this.toggleCalcType('isSubtraction'));
      document.getElementById('chip-calc-mul').addEventListener('click', () => this.toggleCalcType('isMultiplication'));

      document.getElementById('chip-carry-yes').addEventListener('click', () => this.toggleCarryMode(true));
      document.getElementById('chip-carry-no').addEventListener('click', () => this.toggleCarryMode(false));

      document.getElementById('chip-wrong-priority').addEventListener('click', () => {
        this.settings.prioritizeWrongQuestions = true;
        Storage.saveSettings(this.settings);
        this.updateSettingsScreenUI();
        Audio.playTap();
      });
      document.getElementById('chip-wrong-normal').addEventListener('click', () => {
        this.settings.prioritizeWrongQuestions = false;
        Storage.saveSettings(this.settings);
        this.updateSettingsScreenUI();
        Audio.playTap();
      });

      ['5', '10', '20'].forEach(cnt => {
        document.getElementById(`chip-count-${cnt}`).addEventListener('click', () => {
          this.settings.totalQuestions = parseInt(cnt, 10);
          Storage.saveSettings(this.settings);
          this.updateSettingsScreenUI();
          Audio.playTap();
        });
      });

      document.getElementById('btn-reset-coins').addEventListener('click', () => {
        Audio.playTap();
        if (confirm(L10n.get(L10n.dict.resetConfirm.ja, L10n.dict.resetConfirm.en))) {
          Storage.resetTotalCorrectCount();
          this.updateHomeScreenUI();
          this.updateSettingsScreenUI();
        }
      });

      document.getElementById('keypad').addEventListener('click', (e) => {
        const btn = e.target.closest('.key-btn');
        if (!btn || !this.isInputEnabled) return;

        const num = btn.dataset.key;
        if (num !== undefined) {
          this.inputDigit(num);
        } else if (btn.id === 'key-del') {
          this.deleteDigit();
        } else if (btn.id === 'key-ok') {
          this.submitAnswer();
        }
      });

      window.addEventListener('keydown', (e) => {
        if (this.currentScreen !== 'quiz' || !this.isInputEnabled) return;

        if (e.key >= '0' && e.key <= '9') {
          this.inputDigit(e.key);
        } else if (e.key === 'Backspace' || e.key === 'Delete') {
          this.deleteDigit();
        } else if (e.key === 'Enter') {
          this.submitAnswer();
        }
      });

      document.getElementById('btn-result-restart').addEventListener('click', () => this.startQuiz());
      document.getElementById('btn-result-home').addEventListener('click', () => this.navigateTo('home'));

      document.getElementById('btn-wrong-back').addEventListener('click', () => this.navigateTo('home'));
      document.getElementById('btn-wrong-clear-mode').addEventListener('click', () => {
        this.isWrongDeleteMode = true;
        this.selectedWrongItems.clear();
        this.renderWrongQuestionsList();
        Audio.playTap();
      });
      document.getElementById('btn-wrong-cancel-delete').addEventListener('click', () => {
        this.isWrongDeleteMode = false;
        this.selectedWrongItems.clear();
        this.renderWrongQuestionsList();
        Audio.playTap();
      });
      document.getElementById('btn-wrong-execute-delete').addEventListener('click', () => {
        if (this.selectedWrongItems.size > 0) {
          const toRemove = Array.from(this.selectedWrongItems);
          Storage.removeWrongQuestions(toRemove);
          this.isWrongDeleteMode = false;
          this.selectedWrongItems.clear();
          this.renderWrongQuestionsList();
          Audio.playTap();
        }
      });
    }

    toggleCalcType(prop) {
      Audio.playTap();
      this.settings[prop] = !this.settings[prop];
      
      if (!this.settings.isAddition && !this.settings.isSubtraction && !this.settings.isMultiplication) {
        this.settings[prop] = true;
      }
      Storage.saveSettings(this.settings);
      this.updateSettingsScreenUI();
      this.updateHomeScreenUI();
    }

    toggleCarryMode(isYes) {
      Audio.playTap();
      const currentMode = this.settings.carryMode;
      let newMode = currentMode;

      if (isYes) {
        if (currentMode === CarryMode.CarryOnly) {
          newMode = CarryMode.Both;
        } else if (currentMode === CarryMode.Both) {
          newMode = CarryMode.NoCarry;
        } else {
          newMode = CarryMode.Both;
        }
      } else {
        if (currentMode === CarryMode.NoCarry) {
          newMode = CarryMode.Both;
        } else if (currentMode === CarryMode.Both) {
          newMode = CarryMode.CarryOnly;
        } else {
          newMode = CarryMode.Both;
        }
      }

      this.settings.carryMode = newMode;
      Storage.saveSettings(this.settings);
      this.updateSettingsScreenUI();
    }

    updateSettingsScreenUI() {
      document.getElementById('input-max-number').value = this.settings.maxNumber;
      document.getElementById('input-time-threshold').value = this.settings.timeThresholdSeconds;

      document.getElementById('chip-calc-add').classList.toggle('active', this.settings.isAddition);
      document.getElementById('chip-calc-sub').classList.toggle('active', this.settings.isSubtraction);
      document.getElementById('chip-calc-mul').classList.toggle('active', this.settings.isMultiplication);

      const isCarryEnabled = this.settings.isAddition || this.settings.isSubtraction;
      const isCarryActive = this.settings.carryMode === CarryMode.CarryOnly || this.settings.carryMode === CarryMode.Both;
      const isNoCarryActive = this.settings.carryMode === CarryMode.NoCarry || this.settings.carryMode === CarryMode.Both;

      const chipCarryYes = document.getElementById('chip-carry-yes');
      const chipCarryNo = document.getElementById('chip-carry-no');

      chipCarryYes.disabled = !isCarryEnabled;
      chipCarryNo.disabled = !isCarryEnabled;
      chipCarryYes.classList.toggle('active', isCarryEnabled && isCarryActive);
      chipCarryNo.classList.toggle('active', isCarryEnabled && isNoCarryActive);

      document.getElementById('chip-wrong-priority').classList.toggle('active', this.settings.prioritizeWrongQuestions);
      document.getElementById('chip-wrong-normal').classList.toggle('active', !this.settings.prioritizeWrongQuestions);

      ['5', '10', '20'].forEach(cnt => {
        document.getElementById(`chip-count-${cnt}`).classList.toggle('active', this.settings.totalQuestions === parseInt(cnt, 10));
      });

      this.totalCorrectCount = Storage.getTotalCorrectCount();
      document.getElementById('txt-set-coins-sub').textContent = L10n.dict.coinsCollected(this.totalCorrectCount);
    }

    startQuiz() {
      const wrongList = Storage.getWrongQuestions();
      this.questions = QuizLogic.generateQuestions(this.settings, this.settings.totalQuestions, wrongList);
      this.currentQuestionIndex = 0;
      this.score = 0;
      this.historyIcons = [];
      this.userAnswer = '';
      this.isInputEnabled = true;

      this.navigateTo('quiz');
      this.renderCurrentQuestion();
    }

    renderCurrentQuestion() {
      const q = this.questions[this.currentQuestionIndex];
      if (!q) return;

      this.userAnswer = '';
      this.isInputEnabled = true;
      this.updateUserAnswerBox();

      const counterText = L10n.dict.questionHeader(this.currentQuestionIndex + 1, this.questions.length);
      document.getElementById('txt-quiz-counter').textContent = counterText;
      document.getElementById('txt-quiz-formula').textContent = `${q.num1} ${q.operator} ${q.num2} ＝`;

      const feedbackBox = document.getElementById('box-quiz-feedback');
      feedbackBox.textContent = '';
      feedbackBox.className = 'quiz-feedback-box';

      this.renderHistoryIcons();
      Audio.speakQuestion(q);
      this.questionStartTime = performance.now();
    }

    inputDigit(digit) {
      if (!this.isInputEnabled) return;
      if (this.userAnswer.length < 4) {
        Audio.playTap();
        this.userAnswer += digit;
        this.updateUserAnswerBox();
      }
    }

    deleteDigit() {
      if (!this.isInputEnabled || this.userAnswer.length === 0) return;
      Audio.playTap();
      this.userAnswer = this.userAnswer.slice(0, -1);
      this.updateUserAnswerBox();
    }

    updateUserAnswerBox() {
      const box = document.getElementById('box-user-answer');
      if (this.userAnswer.length > 0) {
        box.textContent = this.userAnswer;
        box.classList.add('has-value');
        box.classList.remove('is-placeholder');
      } else {
        box.textContent = '?';
        box.classList.remove('has-value');
        box.classList.add('is-placeholder');
      }
    }

    submitAnswer() {
      if (!this.isInputEnabled || this.userAnswer.length === 0) return;
      this.isInputEnabled = false;

      const q = this.questions[this.currentQuestionIndex];
      const userVal = parseInt(this.userAnswer, 10);
      const isCorrect = userVal === q.correctAnswer;

      const timeTakenSec = (performance.now() - this.questionStartTime) / 1000;
      const isSlow = timeTakenSec >= this.settings.timeThresholdSeconds;

      const feedbackBox = document.getElementById('box-quiz-feedback');

      if (isCorrect) {
        this.score++;
        this.historyIcons.push('⭕');
        feedbackBox.textContent = L10n.get(L10n.dict.correctFeedback.ja, L10n.dict.correctFeedback.en);
        feedbackBox.className = 'quiz-feedback-box correct';
        
        Audio.playCorrect();
        Audio.speakCorrect();
        Storage.incrementTotalCorrectCount();

        if (isSlow) {
          Storage.addWrongQuestion(q, userVal, true);
        } else if (q.isFromWrongList) {
          Storage.removeWrongQuestion(q);
        }
      } else {
        this.historyIcons.push('❌');
        feedbackBox.textContent = L10n.dict.wrongFeedback(q.correctAnswer);
        feedbackBox.className = 'quiz-feedback-box wrong';

        Audio.playWrong();
        Storage.addWrongQuestion(q, userVal, isSlow);
      }

      this.renderHistoryIcons();

      this.nextQuestionTimeout = setTimeout(() => {
        this.currentQuestionIndex++;
        if (this.currentQuestionIndex < this.questions.length) {
          this.renderCurrentQuestion();
        } else {
          this.showResultScreen();
        }
      }, 2000);
    }

    renderHistoryIcons() {
      const histBox = document.getElementById('box-quiz-history');
      histBox.textContent = this.historyIcons.join(' ');
    }

    showResultScreen() {
      this.navigateTo('result');
      const total = this.questions.length;
      const earnedMedals = this.score;

      // 称号・ランクバッジの決定
      const rankEl = document.getElementById('txt-result-rank');
      const d = L10n.dict;
      if (earnedMedals === total && total > 0) {
        rankEl.textContent = L10n.get(d.rankPerfect.ja, d.rankPerfect.en);
        rankEl.style.display = 'inline-block';
      } else if (earnedMedals >= Math.ceil(total * 0.8)) {
        rankEl.textContent = L10n.get(d.rankGreat.ja, d.rankGreat.en);
        rankEl.style.display = 'inline-block';
      } else if (earnedMedals > 0) {
        rankEl.textContent = L10n.get(d.rankGood.ja, d.rankGood.en);
        rankEl.style.display = 'inline-block';
      } else {
        rankEl.textContent = L10n.get(d.rankEncourage.ja, d.rankEncourage.en);
        rankEl.style.display = 'inline-block';
      }

      const gridEl = document.getElementById('result-medals-grid');
      const bannerEl = document.getElementById('txt-result-earned-banner');
      const earnedCountEl = document.getElementById('txt-result-earned-count');
      
      gridEl.innerHTML = '';
      gridEl.classList.toggle('compact', total >= 10);
      earnedCountEl.textContent = '0';
      bannerEl.style.display = earnedMedals > 0 ? 'flex' : 'none';

      // 獲得メダルがない場合
      if (earnedMedals === 0) {
        return;
      }

      // メダル出現タイマーの設定
      if (this.resultAnimTimeouts) {
        this.resultAnimTimeouts.forEach(t => clearTimeout(t));
      }
      this.resultAnimTimeouts = [];

      // 枚数に応じたインターバル（20枚なら60ms、5枚なら180ms）
      const interval = Math.max(50, Math.min(180, 1200 / earnedMedals));

      let spawned = 0;
      const spawnNextMedal = () => {
        if (spawned < earnedMedals) {
          spawned++;
          const medalDiv = document.createElement('div');
          medalDiv.className = 'earned-medal-item';
          medalDiv.innerHTML = '<img src="assets/favicon.svg" alt="Medal">';
          gridEl.appendChild(medalDiv);
          earnedCountEl.textContent = spawned.toString();
          Audio.playMedalPop(spawned - 1);

          if (spawned < earnedMedals) {
            const timeoutId = setTimeout(spawnNextMedal, interval);
            this.resultAnimTimeouts.push(timeoutId);
          } else {
            // 全メダル出現完了
            const timeoutId = setTimeout(() => {
              if (earnedMedals === total || earnedMedals >= Math.ceil(total * 0.7)) {
                Audio.playFanfare();
                this.fireConfetti();
              }
            }, 250);
            this.resultAnimTimeouts.push(timeoutId);
          }
        }
      };

      const startTimeout = setTimeout(spawnNextMedal, 300);
      this.resultAnimTimeouts.push(startTimeout);

      // タップでスキップ
      const medalsWrapper = document.querySelector('.result-medals-wrapper');
      if (medalsWrapper) {
        medalsWrapper.onclick = () => {
          if (spawned < earnedMedals) {
            this.resultAnimTimeouts.forEach(t => clearTimeout(t));
            this.resultAnimTimeouts = [];
            gridEl.innerHTML = '';
            for (let i = 0; i < earnedMedals; i++) {
              const medalDiv = document.createElement('div');
              medalDiv.className = 'earned-medal-item';
              medalDiv.style.animation = 'none';
              medalDiv.innerHTML = '<img src="assets/favicon.svg" alt="Medal">';
              gridEl.appendChild(medalDiv);
            }
            spawned = earnedMedals;
            earnedCountEl.textContent = earnedMedals.toString();

            if (earnedMedals === total || earnedMedals >= Math.ceil(total * 0.7)) {
              Audio.playFanfare();
              this.fireConfetti();
            }
          }
        };
      }
    }

    renderWrongQuestionsList() {
      const wrongList = Storage.getWrongQuestions();
      const container = document.getElementById('wrong-list');
      const emptyState = document.getElementById('empty-wrong-state');
      const normalActions = document.getElementById('wrong-normal-actions');
      const deleteActions = document.getElementById('wrong-delete-actions');
      const executeDeleteBtn = document.getElementById('btn-wrong-execute-delete');

      container.innerHTML = '';

      if (this.isWrongDeleteMode) {
        document.getElementById('txt-wrong-title').textContent = L10n.get(L10n.dict.selectToDelete.ja, L10n.dict.selectToDelete.en);
        document.getElementById('txt-wrong-sub').style.display = 'none';
        normalActions.style.display = 'none';
        deleteActions.style.display = 'flex';
        executeDeleteBtn.disabled = this.selectedWrongItems.size === 0;
      } else {
        document.getElementById('txt-wrong-title').textContent = L10n.get(L10n.dict.weakAreaTitle.ja, L10n.dict.weakAreaTitle.en);
        document.getElementById('txt-wrong-sub').style.display = 'block';
        normalActions.style.display = 'flex';
        deleteActions.style.display = 'none';
        document.getElementById('btn-wrong-clear-mode').disabled = wrongList.length === 0;
      }

      if (wrongList.length === 0) {
        emptyState.style.display = 'flex';
        return;
      }
      emptyState.style.display = 'none';

      wrongList.forEach(item => {
        const card = document.createElement('div');
        card.className = 'wrong-item-card';

        const isSelected = Array.from(this.selectedWrongItems).some(
          sel => sel.num1 === item.num1 && sel.num2 === item.num2 && sel.operator === item.operator
        );

        if (this.isWrongDeleteMode) {
          card.classList.add('selectable');
          if (isSelected) card.classList.add('selected');

          card.addEventListener('click', () => {
            Audio.playTap();
            if (isSelected) {
              this.selectedWrongItems = new Set(
                Array.from(this.selectedWrongItems).filter(
                  sel => !(sel.num1 === item.num1 && sel.num2 === item.num2 && sel.operator === item.operator)
                )
              );
            } else {
              this.selectedWrongItems.add(item);
            }
            this.renderWrongQuestionsList();
          });
        }

        const leftDiv = document.createElement('div');
        leftDiv.className = 'wrong-item-left';

        if (this.isWrongDeleteMode) {
          const checkbox = document.createElement('div');
          checkbox.className = 'custom-checkbox';
          checkbox.innerHTML = isSelected ? '✓' : '';
          leftDiv.appendChild(checkbox);
        }

        const formula = document.createElement('span');
        formula.className = 'wrong-formula-text';
        formula.textContent = `${item.num1} ${item.operator} ${item.num2}`;
        leftDiv.appendChild(formula);

        const statusTag = document.createElement('span');
        statusTag.className = 'wrong-status-tag';
        if (item.isSlow && item.wrongAnswer === item.correctAnswer) {
          statusTag.textContent = L10n.get(L10n.dict.weakLabel.ja, L10n.dict.weakLabel.en);
        } else {
          statusTag.textContent = L10n.dict.wrongLabel(item.wrongAnswer);
        }

        card.appendChild(leftDiv);
        card.appendChild(statusTag);
        container.appendChild(card);
      });
    }

    setupOrientationHandler() {
      const handleResize = () => {
        const isLandscape = window.innerWidth > window.innerHeight && window.innerHeight < 650;
        const quizScreen = document.getElementById('screen-quiz');
        if (quizScreen) {
          quizScreen.classList.toggle('landscape', isLandscape);
        }
      };
      window.addEventListener('resize', handleResize);
      handleResize();
    }

    setupConfettiCanvas() {
      this.confettiCanvas = document.getElementById('confetti-canvas');
      if (!this.confettiCanvas) return;
      this.confettiCtx = this.confettiCanvas.getContext('2d');

      const resizeCanvas = () => {
        if (!this.confettiCanvas) return;
        this.confettiCanvas.width = window.innerWidth;
        this.confettiCanvas.height = window.innerHeight;
      };
      window.addEventListener('resize', resizeCanvas);
      resizeCanvas();
    }

    fireConfetti() {
      if (!this.confettiCanvas || !this.confettiCtx) return;
      if (this.confettiAnimId) {
        cancelAnimationFrame(this.confettiAnimId);
      }
      this.confettiParticles = [];

      const colors = ['#6366F1', '#EC4899', '#F59E0B', '#10B981', '#3B82F6', '#EF4444', '#8B5CF6'];
      const count = 75;

      for (let i = 0; i < count; i++) {
        this.confettiParticles.push({
          x: this.confettiCanvas.width * Math.random(),
          y: -20 - Math.random() * 80,
          w: 8 + Math.random() * 8,
          h: 6 + Math.random() * 6,
          color: colors[Math.floor(Math.random() * colors.length)],
          vx: (Math.random() - 0.5) * 4,
          vy: 2.5 + Math.random() * 3.5,
          rotation: Math.random() * 360,
          vRot: (Math.random() - 0.5) * 8,
          alpha: 1
        });
      }

      const animate = () => {
        this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);
        let aliveCount = 0;

        for (const p of this.confettiParticles) {
          p.x += p.vx;
          p.y += p.vy;
          p.rotation += p.vRot;

          if (p.y > this.confettiCanvas.height - 50) {
            p.alpha -= 0.02;
          }

          if (p.alpha > 0 && p.y < this.confettiCanvas.height) {
            aliveCount++;
            this.confettiCtx.save();
            this.confettiCtx.globalAlpha = p.alpha;
            this.confettiCtx.translate(p.x, p.y);
            this.confettiCtx.rotate((p.rotation * Math.PI) / 180);
            this.confettiCtx.fillStyle = p.color;
            this.confettiCtx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            this.confettiCtx.restore();
          }
        }

        if (aliveCount > 0) {
          this.confettiAnimId = requestAnimationFrame(animate);
        } else {
          this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);
          this.confettiAnimId = null;
        }
      };

      animate();
    }
  }

  // アプリケーション起動
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.mathQuizApp = new MathQuizApp();
    });
  } else {
    window.mathQuizApp = new MathQuizApp();
  }
})();
