/**
 * storage.js - LocalStorage を用いたデータ永続化管理
 */

export const CarryMode = {
  CarryOnly: 'CarryOnly', // あり
  NoCarry: 'NoCarry',     // なし
  Both: 'Both'            // りょうほう
};

export const DefaultSettings = {
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
  LEGACY_PREFS: 'MathQuizPrefs' // Android互換用キー名も確認
};

export const Storage = {
  /**
   * 設定を取得
   */
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

  /**
   * 設定を保存
   */
  saveSettings(settings) {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings to storage', e);
    }
  },

  /**
   * 累計正答数（メダル数）を取得
   */
  getTotalCorrectCount() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TOTAL_CORRECT_COUNT);
      return data ? parseInt(data, 10) || 0 : 0;
    } catch (e) {
      console.warn('Failed to load correct count', e);
      return 0;
    }
  },

  /**
   * 累計正答数を保存
   */
  saveTotalCorrectCount(count) {
    try {
      localStorage.setItem(STORAGE_KEYS.TOTAL_CORRECT_COUNT, count.toString());
    } catch (e) {
      console.error('Failed to save correct count', e);
    }
  },

  /**
   * 累計正答数を+1
   */
  incrementTotalCorrectCount() {
    const current = this.getTotalCorrectCount();
    const updated = current + 1;
    this.saveTotalCorrectCount(updated);
    return updated;
  },

  /**
   * 累計正答数をリセット
   */
  resetTotalCorrectCount() {
    this.saveTotalCorrectCount(0);
  },

  /**
   * 苦手な問題リストを取得
   * 形式: Array<{ num1: number, num2: number, operator: string, correctAnswer: number, wrongAnswer: number, isSlow: boolean }>
   */
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

  /**
   * 苦手な問題リストを保存
   */
  saveWrongQuestions(list) {
    try {
      localStorage.setItem(STORAGE_KEYS.WRONG_QUESTIONS, JSON.stringify(list));
    } catch (e) {
      console.error('Failed to save wrong questions', e);
    }
  },

  /**
   * 苦手な問題を追加（重複は更新）
   */
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

  /**
   * 苦手問題から特定の式を削除（正解して設定時間未満だった場合）
   */
  removeWrongQuestion(question) {
    const list = this.getWrongQuestions();
    const filtered = list.filter(item => 
      !(item.num1 === question.num1 && item.num2 === question.num2 && item.operator === question.operator)
    );
    this.saveWrongQuestions(filtered);
    return filtered;
  },

  /**
   * 選択された苦手問題を一括削除
   */
  removeWrongQuestions(toRemoveList) {
    const list = this.getWrongQuestions();
    const filtered = list.filter(item => 
      !toRemoveList.some(r => r.num1 === item.num1 && r.num2 === item.num2 && r.operator === item.operator)
    );
    this.saveWrongQuestions(filtered);
    return filtered;
  },

  /**
   * 苦手な問題リストを全消去
   */
  clearWrongQuestions() {
    this.saveWrongQuestions([]);
  }
};
