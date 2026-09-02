/**
 * logic.js - クイズ出題・問題生成ロジック（QuizLogic.kt 互換）
 */

import { CarryMode } from './storage.js';

export const QuizLogic = {
  /**
   * 足し算で繰り上がりが発生するかを判定
   */
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

  /**
   * ランダムな整数 [min, max] を取得
   */
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  /**
   * 単一の問題を生成
   */
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

      if (currentMode === 2) { // 引き算 (Subtraction)
        const num1 = Math.max(n1, n2);
        const num2 = Math.min(n1, n2);
        const hasBorrow = (num1 % 10) < (num2 % 10);

        if (settings.carryMode === CarryMode.CarryOnly) {
          if (!hasBorrow && settings.maxNumber >= 10) continue;
        } else if (settings.carryMode === CarryMode.NoCarry) {
          if (hasBorrow) continue;
        }
        // CarryMode.Both の場合はそのまま採用

        return {
          num1,
          num2,
          operator: '-',
          correctAnswer: num1 - num2,
          isFromWrongList: false
        };
      } else if (currentMode === 3) { // 掛け算 (Multiplication)
        const num1 = n1;
        const num2 = n2;
        return {
          num1,
          num2,
          operator: '×',
          correctAnswer: num1 * num2,
          isFromWrongList: false
        };
      } else { // 足し算 (Addition)
        const num1 = n1;
        const num2 = n2;
        const hasCarry = this.hasAdditionCarry(num1, num2);

        if (settings.carryMode === CarryMode.CarryOnly) {
          if (!hasCarry && settings.maxNumber >= 10) continue;
        } else if (settings.carryMode === CarryMode.NoCarry) {
          if (hasCarry) continue;
        }
        // CarryMode.Both の場合はそのまま採用

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

  /**
   * 指定問題数分の問題セットを一括生成（苦手問題優先、重複除外）
   */
  generateQuestions(settings, count, wrongQuestions = []) {
    const questionsMap = new Map();

    const makeKey = (q) => `${q.num1}_${q.operator}_${q.num2}`;

    // 苦手問題の優先出題
    if (settings.prioritizeWrongQuestions && wrongQuestions && wrongQuestions.length > 0) {
      const validWrongQuestions = wrongQuestions.filter(wrongQ => {
        // 演算子の一致
        const modeMatches = 
          (wrongQ.operator === '+' && settings.isAddition) ||
          (wrongQ.operator === '-' && settings.isSubtraction) ||
          (wrongQ.operator === '×' && settings.isMultiplication);

        // 最大値の一致
        const numMatches = wrongQ.num1 <= settings.maxNumber && wrongQ.num2 <= settings.maxNumber;

        // 繰り上がり・繰り下がり条件の一致
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

      // シャッフルして最大 count 件まで追加
      const shuffledWrong = [...validWrongQuestions].sort(() => Math.random() - 0.5);
      for (const q of shuffledWrong.slice(0, count)) {
        questionsMap.set(makeKey(q), q);
      }
    }

    // 残りの問題をランダム生成
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
