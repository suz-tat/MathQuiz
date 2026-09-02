/**
 * l10n.js - 多言語化（日本語 / 英語）リソース定義
 */
export const L10n = {
  currentLang: 'ja', // 'ja' or 'en'

  init() {
    const navLang = navigator.language || navigator.userLanguage || 'ja';
    this.currentLang = navLang.startsWith('en') ? 'en' : 'ja';
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
    tryAgain: { ja: 'もういちど はじめる', en: 'Try Again' },
    goodJob: { ja: 'おつかれさまでした！', en: 'Good Job!' },
    scoreMsg: (score, total) => L10n.isEnglish() ? `Score: ${score} / ${total}` : `${total} もん ちゅう、 ${score} もん せいかい です！`,
    
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
    soundToggle: { ja: 'おんせい', en: 'Sound' }
  }
};
