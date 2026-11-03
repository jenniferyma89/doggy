(function () {
  function buildResultLink(resultId) {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('result', resultId);
    return currentUrl.toString();
  }

  function getResultSummary(result) {
    return `${result.name}：${result.summary}｜我在 DogTi 测出是「${result.title}」。${buildResultLink(result.id)}`;
  }

  function copyText(value) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(value);
    }

    const helper = document.createElement('textarea');
    helper.value = value;
    helper.setAttribute('readonly', 'true');
    helper.style.position = 'fixed';
    helper.style.top = '-9999px';
    document.body.appendChild(helper);
    helper.select();
    document.execCommand('copy');
    helper.remove();
    return Promise.resolve();
  }

  function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove('show'), 1800);
  }

  function createResultSvg(result) {
    const primary = '#f0b669';
    const accent = '#7aa37a';
    const cardText = '#46372e';
    const muted = '#7d6d5d';
    const keywords = result.keywords.map((word) => `<tspan x="70" dy="34">• ${word}</tspan>`).join('');
    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1500" viewBox="0 0 1200 1500">
        <defs>
          <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stop-color="#fffdf9"/>
            <stop offset="1" stop-color="#fff4dc"/>
          </linearGradient>
        </defs>
        <rect width="1200" height="1500" rx="52" fill="url(#bg)"/>
        <circle cx="1000" cy="170" r="120" fill="#e9f5e5"/>
        <circle cx="250" cy="1340" r="160" fill="#dfeef4"/>
        <rect x="70" y="70" width="1060" height="1360" rx="42" fill="#fffdf8" stroke="#ecdcc1" stroke-width="4"/>
        <text x="110" y="170" font-size="24" font-family="Verdana, sans-serif" fill="${accent}" font-weight="700">DOGTI</text>
        <text x="110" y="260" font-size="70" font-family="Verdana, sans-serif" fill="${cardText}" font-weight="800">${result.name}</text>
        <text x="110" y="330" font-size="30" font-family="Verdana, sans-serif" fill="${primary}" font-weight="700">${result.title}</text>
        <text x="110" y="400" font-size="48" font-family="Verdana, sans-serif" fill="${cardText}" font-weight="700">${result.summary}</text>
        <text x="110" y="500" font-size="24" font-family="Verdana, sans-serif" fill="${muted}">关键词</text>
        <text x="110" y="550" font-size="26" font-family="Verdana, sans-serif" fill="${cardText}">${keywords}</text>
        <rect x="110" y="620" width="980" height="600" rx="30" fill="#fff7ee" stroke="#eedbc7"/>
        <text x="150" y="694" font-size="28" font-family="Verdana, sans-serif" fill="${cardText}" font-weight="700">性格分析</text>
        <text x="150" y="748" font-size="22" font-family="Verdana, sans-serif" fill="${muted}">${result.story}</text>
        <text x="150" y="840" font-size="26" font-family="Verdana, sans-serif" fill="${cardText}" font-weight="700">优点</text>
        <text x="150" y="884" font-size="22" font-family="Verdana, sans-serif" fill="${muted}">• ${result.strengths.join('；• ')}</text>
        <text x="150" y="980" font-size="26" font-family="Verdana, sans-serif" fill="${cardText}" font-weight="700">关系模式</text>
        <text x="150" y="1026" font-size="22" font-family="Verdana, sans-serif" fill="${muted}">${result.social}</text>
        <text x="150" y="1120" font-size="26" font-family="Verdana, sans-serif" fill="${cardText}" font-weight="700">生活建议</text>
        <text x="150" y="1164" font-size="22" font-family="Verdana, sans-serif" fill="${muted}">${result.advice}</text>
        <text x="900" y="1435" font-size="22" font-family="Verdana, sans-serif" fill="${primary}" font-weight="700">DogTi · 测测你是什么小狗</text>
      </svg>
    `;
  }

  function downloadResultCard(result) {
    const svg = createResultSvg(result);
    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${result.id}-dogti-card.svg`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('已下载结果卡片');
  }

  function nativeShare(result) {
    const shareData = {
      title: 'DogTi｜测测你是什么小狗',
      text: getResultSummary(result),
      url: buildResultLink(result.id)
    };

    if (navigator.share) {
      navigator.share(shareData).catch(() => {
        copyText(shareData.url).then(() => showToast('分享链接已复制'));
      });
      return;
    }

    copyText(shareData.url).then(() => showToast('分享链接已复制'));
  }

  function bindResultActions() {
    const copyLinkButton = document.getElementById('copy-link');
    const shareButton = document.getElementById('share-native');
    const copyTextButton = document.getElementById('copy-text');
    const downloadButton = document.getElementById('download-card');

    if (copyLinkButton) {
      copyLinkButton.addEventListener('click', () => {
        const resultId = new URLSearchParams(window.location.search).get('result');
        const result = DogTiScoring.getResultById(resultId);
        if (!result) {
          showToast('暂无可分享内容');
          return;
        }
        copyText(buildResultLink(result.id)).then(() => showToast('结果链接已复制'));
      });
    }

    if (shareButton) {
      shareButton.addEventListener('click', () => {
        const resultId = new URLSearchParams(window.location.search).get('result');
        const result = DogTiScoring.getResultById(resultId);
        if (result) {
          nativeShare(result);
        }
      });
    }

    if (copyTextButton) {
      copyTextButton.addEventListener('click', () => {
        const resultId = new URLSearchParams(window.location.search).get('result');
        const result = DogTiScoring.getResultById(resultId);
        if (!result) {
          showToast('暂无可复制文案');
          return;
        }
        copyText(getResultSummary(result)).then(() => showToast('结果文案已复制'));
      });
    }

    if (downloadButton) {
      downloadButton.addEventListener('click', () => {
        const resultId = new URLSearchParams(window.location.search).get('result');
        const result = DogTiScoring.getResultById(resultId);
        if (result) {
          downloadResultCard(result);
        }
      });
    }
  }

  window.DogTiShare = {
    buildResultLink,
    getResultSummary,
    copyText,
    downloadResultCard,
    nativeShare,
    bindResultActions,
    showToast
  };
})();

(function () {
  function isResultIdValid(resultId) {
    const data = window.DogTiData && window.DogTiData.results ? window.DogTiData.results : [];
    return Boolean(resultId && data.some((result) => result.id === resultId));
  }

  function getResultByCurrentUrl() {
    const params = new URLSearchParams(window.location.search);
    const resultId = params.get('result');
    if (!resultId) return null;
    return isResultIdValid(resultId) ? DogTiScoring.getResultById(resultId) : null;
  }

  function updateHomeCounts() {
    const countNode = document.getElementById('completion-count');
    if (!countNode) return;
    const count = DogTiStorage.getCompletedCount();
    countNode.textContent = `已在该设备完成 ${count} 次测试`;
  }

  function buildAtlasCards() {
    const grid = document.getElementById('atlas-grid');
    const unlockCount = document.getElementById('unlock-count');
    if (!grid) return;

    const unlocked = DogTiStorage.loadUnlocked();
    const results = window.DogTiData && window.DogTiData.results ? window.DogTiData.results : [];
    unlockCount.textContent = String(unlocked.length);

    grid.innerHTML = results.map((result) => {
      const isUnlocked = unlocked.includes(result.id);
      return `
        <button type="button" class="atlas-card ${isUnlocked ? '' : 'locked'}" data-result-id="${result.id}" ${isUnlocked ? '' : 'aria-disabled="true"'}>
          <span class="atlas-emoji" aria-hidden="true">${result.emoji}</span>
          <span class="atlas-name">${isUnlocked ? result.name : '待解锁'}</span>
          <span class="atlas-title">${isUnlocked ? result.title : '未解锁'}</span>
          <span class="atlas-lock" aria-hidden="true">${isUnlocked ? '已解锁' : '未解锁'}</span>
        </button>
      `;
    }).join('');

    grid.querySelectorAll('.atlas-card').forEach((button) => {
      button.addEventListener('click', () => {
        const resultId = button.dataset.resultId;
        if (!resultId || !unlocked.includes(resultId)) {
          return;
        }
        const result = DogTiScoring.getResultById(resultId);
        if (!result) return;

        const url = new URL(window.location.href);
        url.searchParams.set('result', result.id);
        window.history.pushState({}, '', url);
        renderResultScreen(result.id);
        showScreen('result');
      });
    });
  }

  function renderResultScreen(resultId) {
    const result = DogTiScoring.getResultById(resultId);
    const container = document.getElementById('result');
    if (!container || !result) return;

    const resultHeading = document.getElementById('result-heading');
    const resultTagline = document.getElementById('result-tagline');
    const resultKeywords = document.getElementById('result-keywords');
    const dimensionBars = document.getElementById('dimension-bars');
    const analysisGrid = document.getElementById('analysis-grid');
    const resultArt = document.getElementById('result-art');

    resultHeading.textContent = result.name;
    resultTagline.textContent = result.summary;
    resultArt.textContent = '';
    resultKeywords.innerHTML = result.keywords.map((keyword) => `<span class="keyword">${keyword}</span>`).join('');

    const scores = DogTiScoring.getDimensionEntries(result.vector || {});
    dimensionBars.innerHTML = scores.map((item) => `
      <div class="dimension-row">
        <div class="dimension-label"><span>${item.label}</span><span>${item.value}</span></div>
        <div class="dimension-track"><span style="width:${item.value}%"></span></div>
      </div>
    `).join('');

    const analysis = [
      { label: '性格分析', text: result.story },
      { label: '优点', text: result.strengths.join('、') },
      { label: '隐藏弱点', text: result.weaknesses.join('、') },
      { label: '社交方式', text: result.social },
      { label: '恋爱模式', text: result.love },
      { label: '小狗式建议', text: result.advice }
    ];

    analysisGrid.innerHTML = analysis.map((item) => `
      <div class="analysis-block">
        <h3>${item.label}</h3>
        <p>${item.text}</p>
      </div>
    `).join('');

    const shareLink = DogTiShare.buildResultLink(result.id);
    window.history.replaceState({}, '', shareLink);
    DogTiStorage.saveLastResult(result.id);
    DogTiShare.bindResultActions();
  }

  function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach((screen) => {
      const isActive = screen.id === screenId;
      screen.hidden = !isActive;
      screen.classList.toggle('is-active', isActive);
    });
  }

  function openHome() {
    showScreen('home');
    updateHomeCounts();
    buildAtlasCards();
  }

  function nextQuestion() {
    const quiz = window.DogTiQuiz;
    quiz.renderQuestion();
    showScreen('quiz');
  }

  function openQuiz() {
    const quiz = window.DogTiQuiz;
    const saved = DogTiStorage.loadProgress();
    if (saved && Array.isArray(saved.answers) && saved.answers.some((item) => item !== null && item !== undefined)) {
      quiz.answers = saved.answers;
      quiz.currentIndex = Math.min(Number(saved.currentIndex) || 0, quiz.answers.length - 1);
    }
    nextQuestion();
  }

  function beginLoadingToResult(resultId) {
    showScreen('loading');
    setTimeout(() => {
      renderResultScreen(resultId);
      showScreen('result');
    }, 1200);
  }

  function handleQuizComplete(answers) {
    const userScores = DogTiScoring.buildTotalScoresForAnswers(answers);
    const result = DogTiScoring.chooseBestResult(userScores);
    if (!result) {
      openHome();
      return;
    }

    DogTiStorage.unlockResult(result.id);
    DogTiStorage.saveLastResult(result.id);
    DogTiStorage.incrementCompletedCount();
    updateHomeCounts();
    buildAtlasCards();
    DogTiStorage.clearProgress();
    beginLoadingToResult(result.id);
  }

  function bindHomeActions() {
    const startButton = document.getElementById('start-button');
    const atlasButton = document.getElementById('home-atlas');
    const headerAtlas = document.getElementById('header-atlas');
    const resultHome = document.getElementById('result-home');
    const resultAtlas = document.getElementById('result-atlas');
    const retakeButton = document.getElementById('retake-button');
    const atlasHome = document.getElementById('atlas-home');

    if (startButton) {
      startButton.addEventListener('click', () => {
        DogTiQuiz.onComplete = handleQuizComplete;
        openQuiz();
      });
    }

    [atlasButton, headerAtlas].forEach((button) => {
      if (button) button.addEventListener('click', () => {
        buildAtlasCards();
        showScreen('atlas');
      });
    });

    if (resultHome) {
      resultHome.addEventListener('click', openHome);
    }

    if (resultAtlas) {
      resultAtlas.addEventListener('click', () => {
        buildAtlasCards();
        showScreen('atlas');
      });
    }

    if (retakeButton) {
      retakeButton.addEventListener('click', () => {
        DogTiStorage.clearProgress();
        DogTiQuiz.reset();
        DogTiQuiz.onComplete = handleQuizComplete;
        showScreen('quiz');
      });
    }

    if (atlasHome) {
      atlasHome.addEventListener('click', openHome);
    }
  }

  function bindQuizActions() {
    const previousButton = document.getElementById('previous-button');
    const quizHome = document.getElementById('quiz-home');
    const quitQuiz = document.getElementById('quit-quiz');
    const confirmCancel = document.getElementById('confirm-cancel');
    const confirmLeave = document.getElementById('confirm-leave');
    const confirmLayer = document.getElementById('confirm-layer');

    if (previousButton) {
      previousButton.addEventListener('click', () => {
        DogTiQuiz.goToPrevious();
        DogTiStorage.saveProgress({ answers: DogTiQuiz.answers, currentIndex: DogTiQuiz.currentIndex });
      });
    }

    if (quizHome || quitQuiz) {
      const leaveAction = () => {
        confirmLayer.hidden = false;
      };
      if (quizHome) quizHome.addEventListener('click', leaveAction);
      if (quitQuiz) quitQuiz.addEventListener('click', leaveAction);
    }

    if (confirmCancel) confirmCancel.addEventListener('click', () => { confirmLayer.hidden = true; });
    if (confirmLeave) confirmLeave.addEventListener('click', () => {
      confirmLayer.hidden = true;
      DogTiStorage.saveProgress({ answers: DogTiQuiz.answers, currentIndex: DogTiQuiz.currentIndex });
      showScreen('home');
    });
  }

  function initializeFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const resultId = params.get('result');
    if (resultId) {
      if (!isResultIdValid(resultId)) {
        const cleanUrl = new URL(window.location.href);
        cleanUrl.searchParams.delete('result');
        window.history.replaceState({}, '', cleanUrl);
        openHome();
        return;
      }

      renderResultScreen(resultId);
      showScreen('result');
      return;
    }

    const savedProgress = DogTiStorage.loadProgress();
    if (savedProgress && Array.isArray(savedProgress.answers) && savedProgress.answers.some((item) => item !== null && item !== undefined)) {
      DogTiQuiz.answers = savedProgress.answers;
      DogTiQuiz.currentIndex = Math.min(Number(savedProgress.currentIndex) || 0, DogTiQuiz.answers.length - 1);
      DogTiQuiz.onComplete = handleQuizComplete;
      showScreen('quiz');
      DogTiQuiz.renderQuestion();
      return;
    }

    openHome();
  }

  function init() {
    updateHomeCounts();
    DogTiQuiz.onComplete = handleQuizComplete;
    bindHomeActions();
    bindQuizActions();
    DogTiShare.bindResultActions();
    buildAtlasCards();
    initializeFromUrl();
  }

  window.addEventListener('DOMContentLoaded', init);
})();
