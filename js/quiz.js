(function () {
  const TOTAL_QUESTIONS = (window.DogTiData && window.DogTiData.questions ? window.DogTiData.questions.length : 0) || 24;

  function getState() {
    return {
      answers: Array(TOTAL_QUESTIONS).fill(null),
      currentIndex: 0
    };
  }

  function buildOptionMarkup(question, index, isSelected) {
    const optionLetter = String.fromCharCode(65 + index);
    return `
      <button type="button" class="answer-option" data-index="${index}" aria-pressed="${isSelected ? 'true' : 'false'}">
        <span class="option-letter">${optionLetter}</span>${question.options[index].label}
      </button>
    `;
  }

  function renderQuestion() {
    const question = window.DogTiData.questions[this.currentIndex];
    if (!question) {
      return;
    }

    const questionCard = document.getElementById('question-card');
    const categoryNode = document.getElementById('question-category');
    const titleNode = document.getElementById('question-title');
    const answerList = document.getElementById('answer-list');
    const counterNode = document.getElementById('question-counter');
    const percentNode = document.getElementById('progress-percent');
    const progressFill = document.getElementById('progress-fill');
    const progressBar = document.querySelector('.progress-track');

    categoryNode.textContent = question.category;
    titleNode.textContent = question.prompt;
    counterNode.textContent = `第 ${this.currentIndex + 1} / ${TOTAL_QUESTIONS} 题`;

    const answeredCount = this.answers.filter((value) => value !== null && value !== undefined).length;
    const progressValue = (answeredCount / TOTAL_QUESTIONS) * 100;
    progressFill.style.width = `${progressValue}%`;
    progressBar.setAttribute('aria-valuenow', String(Math.round(progressValue)));
    percentNode.textContent = `${Math.round(progressValue)}%`;

    answerList.innerHTML = question.options.map((option, optionIndex) => {
      const selected = this.answers[this.currentIndex] === optionIndex;
      return buildOptionMarkup(question, optionIndex, selected);
    }).join('');

    questionCard.classList.remove('is-animating');
    void questionCard.offsetWidth;
    questionCard.classList.add('is-animating');

    const buttons = answerList.querySelectorAll('.answer-option');
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const selectedIndex = Number(button.dataset.index);
        this.selectAnswer(selectedIndex);
      });
    });

    const previousButton = document.getElementById('previous-button');
    previousButton.disabled = this.currentIndex === 0;
    previousButton.textContent = this.currentIndex === 0 ? '← 上一题' : '← 上一题';
  }

  function selectAnswer(selectedIndex) {
    this.answers[this.currentIndex] = selectedIndex;
    if (window.DogTiStorage && DogTiStorage.saveProgress) {
      DogTiStorage.saveProgress({
        answers: this.answers,
        currentIndex: this.currentIndex
      });
    }

    if (this.currentIndex >= TOTAL_QUESTIONS - 1) {
      if (typeof this.onComplete === 'function') {
        this.onComplete(this.answers);
      }
      return;
    }

    this.currentIndex += 1;
    this.renderQuestion();
  }

  function goToPrevious() {
    if (this.currentIndex <= 0) {
      return;
    }

    this.currentIndex -= 1;
    this.renderQuestion();
    if (window.DogTiStorage && DogTiStorage.saveProgress) {
      DogTiStorage.saveProgress({
        answers: this.answers,
        currentIndex: this.currentIndex
      });
    }
  }

  function reset() {
    const fresh = getState();
    this.answers = fresh.answers;
    this.currentIndex = fresh.currentIndex;
    this.renderQuestion();
    if (window.DogTiStorage && DogTiStorage.saveProgress) {
      DogTiStorage.saveProgress({
        answers: this.answers,
        currentIndex: this.currentIndex
      });
    }
  }

  function restoreProgress() {
    const saved = window.DogTiStorage && DogTiStorage.loadProgress ? DogTiStorage.loadProgress() : null;
    if (!saved || !Array.isArray(saved.answers)) {
      return false;
    }

    this.answers = saved.answers.slice(0, TOTAL_QUESTIONS);
    this.currentIndex = Math.min(Number(saved.currentIndex) || 0, TOTAL_QUESTIONS - 1);
    return true;
  }

  function getCurrentQuestionNumber() {
    return this.currentIndex + 1;
  }

  const quizState = {
    answers: Array(TOTAL_QUESTIONS).fill(null),
    currentIndex: 0,
    renderQuestion,
    selectAnswer,
    goToPrevious,
    reset,
    restoreProgress,
    getCurrentQuestionNumber,
    onComplete: null
  };

  window.DogTiQuiz = quizState;
})();
