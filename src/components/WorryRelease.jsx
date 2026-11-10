import React, { useState } from 'react';
import { Wind, Send, RefreshCw } from 'lucide-react';
import { sound } from '../utils/soundEngine';

export default function WorryRelease({ visitorName = 'TASHMI', isDarkRoom = false }) {
  const [worryText, setWorryText] = useState('');
  const [isReleasing, setIsReleasing] = useState(false);
  const [hasReleased, setHasReleased] = useState(false);

  const handleRelease = (e) => {
    e.preventDefault();
    if (!worryText.trim() || isReleasing) return;

    sound.init();
    sound.playSparkle();
    setIsReleasing(true);

    // Play ascending bloom chime midway as lantern rises into the stars
    setTimeout(() => {
      sound.playBloom();
    }, 900);

    // Complete the release animation
    setTimeout(() => {
      setIsReleasing(false);
      setHasReleased(true);
      setWorryText('');
    }, 2500);
  };

  const handleReset = () => {
    sound.init();
    sound.playSparkle();
    setHasReleased(false);
  };

  return (
    <section id="worry-release" className="py-12 px-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3 ${
          isDarkRoom
            ? 'bg-indigo-900/70 text-indigo-200 border border-indigo-700/60'
            : 'bg-purple-100 text-purple-900 border border-purple-200'
        }`}>
          <Wind size={13} className="text-purple-400" />
          Gentle Release
        </div>
        <h2 className={`font-playfair text-3xl sm:text-4xl font-bold mb-3 ${
          isDarkRoom ? 'text-indigo-100' : 'text-stone-900'
        }`}>
          The Starlight Lantern Sky
        </h2>
        <p className={`text-sm sm:text-base max-w-md mx-auto leading-relaxed ${
          isDarkRoom ? 'text-indigo-200/80' : 'text-stone-700'
        }`}>
          If something is feeling heavy today, write it below and release it into the starry sky. It is completely private and simply let go.
        </p>
      </div>

      <div className={`rounded-3xl p-6 sm:p-10 border transition-all duration-500 relative overflow-hidden ${
        isDarkRoom
          ? 'glass-panel-dark border-indigo-800/60'
          : 'glass-panel border-purple-200/90 bg-gradient-to-b from-indigo-50/50 via-purple-50/40 to-pink-50/50'
      }`}>
        {/* Decorative Stars */}
        <div className="absolute top-6 left-10 text-amber-200/70 text-sm animate-twinkle select-none pointer-events-none">✦</div>
        <div className="absolute top-16 right-14 text-purple-300/70 text-lg animate-twinkle delay-500 select-none pointer-events-none">★</div>
        <div className="absolute bottom-10 left-1/3 text-pink-300/60 text-sm animate-twinkle delay-1000 select-none pointer-events-none">✦</div>

        {!hasReleased ? (
          <div className="relative z-10 flex flex-col items-center max-w-lg mx-auto">
            {/* The Floating Amber Lantern Animation */}
            <div className={`relative mb-6 ${
              isReleasing ? 'animate-float-up-fade' : 'animate-float-slow'
            }`}>
              <svg width="120" height="150" viewBox="0 0 120 150" fill="none" className="drop-shadow-xl">
                {/* Outer Glow */}
                <ellipse cx="60" cy="70" rx="48" ry="52" fill="#FFB703" opacity={isReleasing ? '0.6' : '0.35'} className="animate-pulse" />

                {/* Lantern Body */}
                <path
                  d="M35 35 C35 25 85 25 85 35 L95 85 C95 105 25 105 25 85 Z"
                  fill="url(#amberLanternGrad)"
                  stroke="#FFB703"
                  strokeWidth="2.5"
                />

                {/* Top Rim */}
                <ellipse cx="60" cy="35" rx="26" ry="6" fill="#F4A261" stroke="#E76F51" strokeWidth="2" />
                <path d="M60 29 L60 12" stroke="#E76F51" strokeWidth="2.5" strokeLinecap="round" />

                {/* Warm Light Core */}
                <circle cx="60" cy="72" r="16" fill="#FFF9A6" />
                <circle cx="60" cy="72" r="9" fill="#FFD166" className="animate-ping" />

                {/* Tassel */}
                <line x1="60" y1="102" x2="60" y2="135" stroke="#E76F51" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="60" cy="138" r="4" fill="#E76F51" />

                <defs>
                  <linearGradient id="amberLanternGrad" x1="25" y1="35" x2="95" y2="105" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFF2B2" />
                    <stop offset="0.6" stopColor="#FFD166" />
                    <stop offset="1" stopColor="#F4A261" />
                  </linearGradient>
                </defs>
              </svg>

              {isReleasing && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-amber-200 text-3xl animate-spin select-none">
                  ✨
                </div>
              )}
            </div>

            <form onSubmit={handleRelease} className={`w-full space-y-4 transition-all duration-700 ${
              isReleasing ? 'opacity-30 scale-95 pointer-events-none' : 'opacity-100'
            }`}>
              <div className="relative">
                <textarea
                  rows={3}
                  value={worryText}
                  onChange={(e) => setWorryText(e.target.value)}
                  disabled={isReleasing}
                  placeholder={`What feels heavy right now, ${visitorName}? (e.g. overthinking, feeling tired, expectations...)`}
                  className={`w-full px-5 py-3.5 rounded-2xl text-base font-medium resize-none shadow-inner transition-colors focus:outline-none focus:ring-2 ${
                    isDarkRoom
                      ? 'bg-slate-900/90 border border-indigo-700/60 text-indigo-100 placeholder-indigo-400 focus:ring-indigo-500'
                      : 'bg-white/95 border border-purple-200 text-stone-900 placeholder-stone-400 focus:ring-purple-400'
                  }`}
                  maxLength={250}
                />
                <span className={`absolute bottom-2.5 right-3 text-[10px] font-semibold ${
                  isDarkRoom ? 'text-indigo-400' : 'text-stone-500'
                }`}>
                  100% private • disappears forever
                </span>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={!worryText.trim() || isReleasing}
                  className={`flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm text-white shadow-md transition transform min-h-[44px] ${
                    !worryText.trim() || isReleasing
                      ? 'bg-stone-300 dark:bg-slate-800 cursor-not-allowed opacity-60'
                      : 'bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 hover:opacity-95 hover:-translate-y-0.5 active:translate-y-0 shadow-purple-900/40 cursor-pointer'
                  }`}
                >
                  <Send size={15} className={isReleasing ? 'animate-bounce' : ''} />
                  <span>{isReleasing ? 'Releasing to the stars...' : 'Release into the Starlight ✨'}</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 animate-scaleUp max-w-md mx-auto">
            <span className="text-5xl block mb-3 animate-bounce select-none">🌠</span>
            <h3 className={`font-playfair text-2xl font-bold mb-2 ${
              isDarkRoom ? 'text-indigo-100' : 'text-stone-900'
            }`}>
              It Has Been Released
            </h3>
            <p className={`font-poppins text-sm leading-relaxed mb-6 font-medium ${
              isDarkRoom ? 'text-indigo-200/90' : 'text-stone-700'
            }`}>
              Whatever you wrote has floated into the night sky and dissolved into quiet starlight. You don't have to carry that weight on your shoulders anymore, {visitorName}. Take a slow, gentle breath.
            </p>

            <button
              onClick={handleReset}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold transition cursor-pointer ${
                isDarkRoom
                  ? 'bg-indigo-900/80 hover:bg-indigo-800 text-indigo-100 border border-indigo-700/60'
                  : 'bg-purple-100 hover:bg-purple-200 text-purple-900'
              }`}
            >
              <RefreshCw size={13} />
              <span>Release Another Thought</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
