(function () {
  const DIMENSIONS = window.DogTiData && window.DogTiData.dimensions ? window.DogTiData.dimensions : [];
  const LABELS = {
    extroversion: '外向度',
    family: '亲人度',
    energy: '活力值',
    curiosity: '好奇心',
    independence: '独立性',
    sensitivity: '情绪敏感度',
    order: '规则感',
    healing: '治愈力'
  };

  function createEmptyScores() {
    return DIMENSIONS.reduce((acc, key) => {
      acc[key] = 0;
      return acc;
    }, {});
  }

  function normalizeScores(scores) {
    const normalized = createEmptyScores();
    DIMENSIONS.forEach((key) => {
      normalized[key] = Math.max(0, Math.min(100, Math.round(scores[key] || 0)));
    });
    return normalized;
  }

  function buildTotalScoresForAnswers(answerMap) {
    const totals = createEmptyScores();
    const questions = window.DogTiData && window.DogTiData.questions ? window.DogTiData.questions : [];

    questions.forEach((question, index) => {
      const selectedIndex = answerMap[index];
      if (selectedIndex === undefined || selectedIndex === null || selectedIndex === -1) {
        return;
      }

      const selectedOption = question.options[selectedIndex];
      if (!selectedOption || !selectedOption.scores) {
        return;
      }

      DIMENSIONS.forEach((key) => {
        totals[key] += Number(selectedOption.scores[key] || 0);
      });
    });

    return normalizeScores(totals);
  }

  function calculateDistance(userVector, resultVector) {
    const weights = {
      extroversion: 1.08,
      family: 1.12,
      energy: 1.08,
      curiosity: 1.06,
      independence: 1.1,
      sensitivity: 1.12,
      order: 1.14,
      healing: 1.1
    };

    let total = 0;
    DIMENSIONS.forEach((key) => {
      const delta = (userVector[key] || 0) - (resultVector[key] || 0);
      total += Math.pow(delta * (weights[key] || 1), 2);
    });

    return Math.sqrt(total) / Math.sqrt(DIMENSIONS.length);
  }

  function chooseBestResult(userScores) {
    const results = window.DogTiData && window.DogTiData.results ? window.DogTiData.results : [];
    if (!results.length) {
      return null;
    }

    let bestResult = results[0];
    let bestDistance = Number.POSITIVE_INFINITY;

    results.forEach((result) => {
      const distance = calculateDistance(userScores, result.vector || createEmptyScores());
      const tieBreaker = result.id.localeCompare(bestResult.id);

      if (distance < bestDistance || (distance === bestDistance && tieBreaker < 0)) {
        bestDistance = distance;
        bestResult = result;
      }
    });

    return bestResult;
  }

  function getResultById(resultId) {
    const results = window.DogTiData && window.DogTiData.results ? window.DogTiData.results : [];
    return results.find((result) => result.id === resultId) || null;
  }

  function getDimensionLabel(key) {
    return LABELS[key] || key;
  }

  function getDimensionEntries(scores) {
    return DIMENSIONS.map((key) => ({
      key,
      label: getDimensionLabel(key),
      value: Number(scores[key] || 0)
    }));
  }

  window.DogTiScoring = {
    createEmptyScores,
    normalizeScores,
    buildTotalScoresForAnswers,
    chooseBestResult,
    getResultById,
    getDimensionEntries,
    getDimensionLabel,
    calculateDistance
  };
})();
