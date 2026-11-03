(function () {
  const STORAGE_KEYS = {
    progress: 'dogti-progress',
    unlocked: 'dogti-unlocked',
    completeCount: 'dogti-complete-count',
    result: 'dogti-last-result'
  };

  const fallbackStore = {};

  function getStorage() {
    try {
      return window.localStorage;
    } catch (error) {
      return null;
    }
  }

  function readRaw(key) {
    const storage = getStorage();
    if (!storage) {
      return Object.prototype.hasOwnProperty.call(fallbackStore, key) ? fallbackStore[key] : null;
    }

    try {
      return storage.getItem(key);
    } catch (error) {
      return Object.prototype.hasOwnProperty.call(fallbackStore, key) ? fallbackStore[key] : null;
    }
  }

  function writeRaw(key, value) {
    const storage = getStorage();
    if (!storage) {
      fallbackStore[key] = value;
      return true;
    }

    try {
      storage.setItem(key, value);
      return true;
    } catch (error) {
      fallbackStore[key] = value;
      return false;
    }
  }

  function readJSON(key, fallbackValue) {
    const raw = readRaw(key);
    if (raw === null || raw === undefined) {
      return fallbackValue;
    }

    try {
      return JSON.parse(raw);
    } catch (error) {
      return fallbackValue;
    }
  }

  function writeJSON(key, value) {
    return writeRaw(key, JSON.stringify(value));
  }

  function saveProgress(progress) {
    return writeJSON(STORAGE_KEYS.progress, progress);
  }

  function loadProgress() {
    return readJSON(STORAGE_KEYS.progress, null);
  }

  function clearProgress() {
    const storage = getStorage();
    if (storage) {
      try {
        storage.removeItem(STORAGE_KEYS.progress);
      } catch (error) {
        delete fallbackStore[STORAGE_KEYS.progress];
      }
    } else {
      delete fallbackStore[STORAGE_KEYS.progress];
    }
  }

  function saveUnlocked(resultIds) {
    return writeJSON(STORAGE_KEYS.unlocked, resultIds);
  }

  function loadUnlocked() {
    return readJSON(STORAGE_KEYS.unlocked, []);
  }

  function unlockResult(resultId) {
    const unlocked = loadUnlocked();
    if (!resultId || unlocked.includes(resultId)) {
      return unlocked;
    }

    const next = [...unlocked, resultId];
    saveUnlocked(next);
    return next;
  }

  function saveCompletedCount(value) {
    return writeJSON(STORAGE_KEYS.completeCount, value);
  }

  function getCompletedCount() {
    return Number(readJSON(STORAGE_KEYS.completeCount, 0)) || 0;
  }

  function incrementCompletedCount() {
    const current = getCompletedCount();
    const next = current + 1;
    saveCompletedCount(next);
    return next;
  }

  function saveLastResult(resultId) {
    return writeJSON(STORAGE_KEYS.result, resultId);
  }

  function loadLastResult() {
    return readJSON(STORAGE_KEYS.result, null);
  }

  window.DogTiStorage = {
    keys: STORAGE_KEYS,
    saveProgress,
    loadProgress,
    clearProgress,
    saveUnlocked,
    loadUnlocked,
    unlockResult,
    saveCompletedCount,
    getCompletedCount,
    incrementCompletedCount,
    saveLastResult,
    loadLastResult
  };
})();
