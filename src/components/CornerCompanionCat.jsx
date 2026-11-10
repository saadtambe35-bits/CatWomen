import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { sound } from '../utils/soundEngine';

export default function CornerCompanionCat({
  visitorName = 'TASHMI',
  activeRoom = 'lounge',
  currentMood,
  unlockedGoldenTreat = false,
  catStats = {},
  isDarkRoom = false
}) {
  const [speechBubble, setSpeechBubble] = useState(null);
  const [isPetting, setIsPetting] = useState(false);
  const [hearts, setHearts] = useState([]);

  const baseMessages = [
    "pspsps... you need a break?",
    "Human, drink some water! Hydration check! 💧",
    "Sending 1000 virtual hugs right this second. 💕",
    "Meow means you're doing great, even when it doesn't feel like it.",
    "No overthinking allowed for the next 5 minutes. 🐾",
    "Did you unclench your jaw and drop your shoulders just now?",
    "I'm right here with you! *nuzzles your screen affectionately*",
    `You're my favorite human today, ${visitorName}. 🐾`,
    "*soft headbutt* That is kitten language for 'you matter'.",
    "If anyone was mean to you today, I will swat their coffee cup off the table.",
    "Take a slow breath with me... in... and out. Good human.",
    "You survived 100% of your hardest days so far. You're unstoppable."
  ];

  const getContextualMessage = () => {
    // 1. High priority: Golden treat available but not in café
    if (unlockedGoldenTreat && activeRoom !== 'cafe') {
      return `You caught 10 fish! Visit the Cat Café to feed the kittens their special Golden Salmon! 🍣✨`;
    }

    // 2. High priority: Rough mood
    if (currentMood === 'rough' && activeRoom !== 'calm') {
      return `Things feel heavy today? Visit the Starlight Calm room to breathe and let go of worries. ☁️`;
    }

    // 3. Room-specific warmth
    if (activeRoom === 'calm') {
      return `Inhale peace, exhale the noise. The stars are keeping you safe right now. 🌙`;
    }

    if (activeRoom === 'cafe') {
      const mochiHearts = catStats?.sleepy?.hearts || 0;
      if (mochiHearts > 3) {
        return `Mochi loves your gentle scratches so much! Have you said hello to silly Mikan yet? 🍊`;
      }
      return `The kittens are so happy you're here. Pet them gently! 🐈`;
    }

    if (activeRoom === 'keepsakes') {
      return `Did you plant a flower in the garden or read your handwritten letter yet? 💌`;
    }

    // Default pool
    return baseMessages[Math.floor(Math.random() * baseMessages.length)];
  };

  const handleClickCat = () => {
    sound.init();
    sound.playMeow('tiny');
    sound.playPurr(1.5);
    setIsPetting(true);
    setTimeout(() => setIsPetting(false), 800);

    const msg = getContextualMessage();
    setSpeechBubble(msg);

    const newHeart = { id: Date.now(), x: Math.random() * 20 - 10 };
    setHearts((prev) => [...prev.slice(-3), newHeart]);
  };

  useEffect(() => {
    if (!speechBubble) return;
    const timer = setTimeout(() => {
      setSpeechBubble(null);
    }, 7000);
    return () => clearTimeout(timer);
  }, [speechBubble]);

  return (
    <div className="fixed bottom-20 md:bottom-6 right-3 md:right-6 z-40 flex flex-col items-end pointer-events-auto select-none">
      {/* Speech Bubble */}
      {speechBubble && (
        <div className={`relative mb-2 mr-2 max-w-xs rounded-2xl p-3.5 shadow-xl border text-xs sm:text-sm font-medium leading-snug animate-scaleUp ${
          isDarkRoom
            ? 'bg-slate-900/95 border-indigo-700 text-indigo-100 shadow-indigo-950/80'
            : 'bg-white/95 border-pink-200 text-stone-900 shadow-pink-200/50'
        }`}>
          <div className="flex items-start justify-between gap-2">
            <p className="italic">"{speechBubble}"</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSpeechBubble(null);
              }}
              className="text-stone-400 hover:text-stone-700 p-0.5 cursor-pointer"
            >
              <X size={13} />
            </button>
          </div>
          <div className={`absolute -bottom-2 right-8 w-3 h-3 border-b border-r transform rotate-45 ${
            isDarkRoom
              ? 'bg-slate-900 border-indigo-700'
              : 'bg-white border-pink-200'
          }`} />
        </div>
      )}

      {/* Floating Hearts */}
      <div className="relative pointer-events-none">
        {hearts.map((h) => (
          <div
            key={h.id}
            className="absolute -top-10 right-6 text-pink-500 animate-bounce text-lg"
            style={{ transform: `translateX(${h.x}px)` }}
          >
            💗
          </div>
        ))}
      </div>

      {/* Animated Kitten Head */}
      <div
        onClick={handleClickCat}
        className={`cursor-pointer transition-transform duration-300 group ${
          isPetting ? 'scale-110 animate-purr' : 'hover:scale-108'
        }`}
        title="I'm your sanctuary companion cat! Click me anytime 🐾"
      >
        <div className={`relative w-14 h-14 sm:w-16 sm:h-16 backdrop-blur-sm rounded-full border-2 shadow-lg flex items-center justify-center transition-colors ${
          isDarkRoom
            ? 'bg-indigo-900/90 border-indigo-500 shadow-indigo-950'
            : 'bg-pink-100/90 hover:bg-pink-200/90 border-pink-300 shadow-pink-200/60'
        }`}>
          <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
            <polygon points="12,24 16,6 30,18" fill="#FCE9DD" stroke="#F6B894" strokeWidth="1.5" />
            <polygon points="15,22 18,10 26,18" fill="#FFAEC9" />
            <polygon points="34,18 48,6 52,24" fill="#FCE9DD" stroke="#F6B894" strokeWidth="1.5" />
            <polygon points="38,18 46,10 49,22" fill="#FFAEC9" />
            <circle cx="32" cy="34" r="22" fill="#FCE9DD" stroke="#F6B894" strokeWidth="1.5" />
            <path d="M22 14 Q32 26 42 14" fill="#F8C9AA" />
            <path d="M22 34 Q26 40 30 34" stroke="#5C3D2E" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M34 34 Q38 40 42 34" stroke="#5C3D2E" strokeWidth="2.5" strokeLinecap="round" />
            <polygon points="32,38 30,41 34,41" fill="#FF8BA7" />
            <path d="M32 41 L32 43 Q29 45 26 44 M32 43 Q35 45 38 44" stroke="#5C3D2E" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="19" cy="38" r="4" fill="#FF9EAA" opacity="0.6" />
            <circle cx="45" cy="38" r="4" fill="#FF9EAA" opacity="0.6" />
            <ellipse cx="22" cy="54" rx="5" ry="4" fill="#FFF2E8" stroke="#F6B894" strokeWidth="1" />
            <ellipse cx="42" cy="54" rx="5" ry="4" fill="#FFF2E8" stroke="#F6B894" strokeWidth="1" />
          </svg>

          <span className="absolute -top-1 -right-1 text-xs animate-twinkle">🐾</span>
        </div>
      </div>
    </div>
  );
}
