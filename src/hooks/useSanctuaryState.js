import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'tashmi_sanctuary_v2';

export const DEFAULT_STATE = {
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

function deepMerge(target, source) {
  if (!source || typeof source !== 'object' || Array.isArray(source)) {
    return source !== undefined ? source : target;
  }
  const output = { ...target };
  for (const key of Object.keys(source)) {
    if (
      source[key] &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key]) &&
      target[key] &&
      typeof target[key] === 'object' &&
      !Array.isArray(target[key])
    ) {
      output[key] = deepMerge(target[key], source[key]);
    } else if (source[key] !== undefined) {
      output[key] = source[key];
    }
  }
  return output;
}

export function useSanctuaryState() {
  const [state, setState] = useState(() => {
    try {
      // Check for v2 state first
      const storedV2 = localStorage.getItem(STORAGE_KEY);
      const storedV1 = !storedV2 ? localStorage.getItem('tashmi_sanctuary_v1') : null;
      const rawStored = storedV2 || storedV1;
      const legacyLetterRead = localStorage.getItem('tashmi_letter_read') === 'true';

      if (rawStored) {
        const parsed = JSON.parse(rawStored);
        const merged = deepMerge(DEFAULT_STATE, parsed);

        // Name normalization: always maintain TASHMI
        let normalizedName = 'TASHMI';
        if (merged.userName) {
          const upper = String(merged.userName).toUpperCase();
          if (upper === 'TASHMI' || upper === 'RASHMI' || upper === 'XYZ') {
            normalizedName = 'TASHMI';
          } else {
            normalizedName = merged.userName;
          }
        }
        merged.userName = normalizedName;

        if (legacyLetterRead) {
          merged.hasReadLetter = true;
        }

        // Validate activeRoom
        const validRooms = ['lounge', 'cafe', 'calm', 'keepsakes'];
        if (!validRooms.includes(merged.activeRoom)) {
          merged.activeRoom = 'lounge';
        }

        // Ensure array safety
        if (!Array.isArray(merged.plantedFlowers)) merged.plantedFlowers = [];
        if (!Array.isArray(merged.openedSunshines)) merged.openedSunshines = [];

        return merged;
      } else if (legacyLetterRead) {
        return {
          ...DEFAULT_STATE,
          hasReadLetter: true
        };
      }
    } catch (e) {
      console.warn('Failed to load sanctuary state from localStorage, using defaults:', e);
    }
    return DEFAULT_STATE;
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
      const currentCat = (prev.catStats && prev.catStats[catId]) || {
        hearts: 0,
        fishFed: 0,
        goldenFed: 0,
        status: 'idle'
      };
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
          ...(prev.catStats || {}),
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
      const newHigh = Math.max(prev.fishHighScore || 0, score || 0);
      const shouldUnlock = Boolean(prev.unlockedGoldenTreat || (fishCaught && fishCaught >= 10));
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
