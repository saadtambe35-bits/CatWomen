import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'tashmi_sanctuary_v1';

const defaultState = {
  userName: 'TASHMI',
  activeRoom: 'lounge', // 'lounge' | 'cafe' | 'calm' | 'keepsakes'
  currentMood: null,
  catStats: {
    sleepy: { hearts: 0, fishFed: 0, goldenFed: 0, status: 'idle' },
    orange: { hearts: 0, fishFed: 0, goldenFed: 0, status: 'idle' },
    white: { hearts: 0, fishFed: 0, goldenFed: 0, status: 'idle' },
    black: { hearts: 0, fishFed: 0, goldenFed: 0, status: 'idle' }
  },
  plantedFlowers: [],
  fishHighScore: 0,
  unlockedGoldenTreat: false,
  openedSunshines: [],
  hasReadLetter: false
};

export function useSanctuaryState() {
  const [state, setState] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const legacyLetterRead = localStorage.getItem('tashmi_letter_read') === 'true';

      if (stored) {
        const parsed = JSON.parse(stored);
        let normalizedName = 'TASHMI';
        if (parsed.userName) {
          const upper = parsed.userName.toUpperCase();
          if (upper === 'TASHMI' || upper === 'RASHMI' || upper === 'XYZ') {
            normalizedName = 'TASHMI';
          } else {
            normalizedName = parsed.userName;
          }
        }

        return {
          ...defaultState,
          ...parsed,
          userName: normalizedName,
          hasReadLetter: parsed.hasReadLetter ?? legacyLetterRead,
          catStats: {
            ...defaultState.catStats,
            ...(parsed.catStats || {})
          }
        };
      } else if (legacyLetterRead) {
        return {
          ...defaultState,
          hasReadLetter: true
        };
      }
    } catch (e) {
      console.warn('Failed to load sanctuary state from localStorage:', e);
    }
    return defaultState;
  });

  // Sync state changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Failed to save sanctuary state to localStorage:', e);
    }
  }, [state]);

  const setUserName = useCallback((name) => {
    const trimmed = (name || '').trim();
    if (!trimmed) return;
    setState((prev) => ({ ...prev, userName: trimmed }));
  }, []);

  const setActiveRoom = useCallback((room) => {
    const validRooms = ['lounge', 'cafe', 'calm', 'keepsakes'];
    if (validRooms.includes(room)) {
      setState((prev) => ({ ...prev, activeRoom: room }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const setCurrentMood = useCallback((moodId) => {
    setState((prev) => ({ ...prev, currentMood: moodId }));
  }, []);

  const updateCat = useCallback((catId, action, value = 1) => {
    setState((prev) => {
      const currentCat = prev.catStats[catId] || { hearts: 0, fishFed: 0, goldenFed: 0, status: 'idle' };
      const updated = { ...currentCat };

      if (action === 'pet') updated.hearts = (updated.hearts || 0) + value;
      if (action === 'feed') updated.fishFed = (updated.fishFed || 0) + value;
      if (action === 'feedGolden') {
        updated.goldenFed = (updated.goldenFed || 0) + value;
        updated.hearts = (updated.hearts || 0) + 5; // Golden treat bonus affection!
      }
      if (action === 'status') updated.status = value;

      return {
        ...prev,
        catStats: {
          ...prev.catStats,
          [catId]: updated
        }
      };
    });
  }, []);

  const addPlantedFlower = useCallback((flower) => {
    setState((prev) => ({
      ...prev,
      plantedFlowers: [flower, ...(prev.plantedFlowers || [])]
    }));
  }, []);

  const recordFishScore = useCallback((score, fishCaught) => {
    setState((prev) => {
      const newHigh = Math.max(prev.fishHighScore || 0, score);
      const shouldUnlock = prev.unlockedGoldenTreat || fishCaught >= 10;
      return {
        ...prev,
        fishHighScore: newHigh,
        unlockedGoldenTreat: shouldUnlock
      };
    });
  }, []);

  const markSunshineOpened = useCallback((noteId) => {
    setState((prev) => {
      const opened = prev.openedSunshines || [];
      if (opened.includes(noteId)) return prev;
      return {
        ...prev,
        openedSunshines: [...opened, noteId]
      };
    });
  }, []);

  const markLetterRead = useCallback(() => {
    setState((prev) => ({ ...prev, hasReadLetter: true }));
  }, []);

  return {
    ...state,
    setUserName,
    setActiveRoom,
    setCurrentMood,
    updateCat,
    addPlantedFlower,
    recordFishScore,
    markSunshineOpened,
    markLetterRead
  };
}
