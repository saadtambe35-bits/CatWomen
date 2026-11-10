import React from 'react';
import { ArrowUp, Home, Coffee, Moon, Gift } from 'lucide-react';

export default function Footer({ visitorName = 'TASHMI', isDarkRoom, setActiveRoom }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { id: 'lounge', label: 'Lounge', icon: Home },
    { id: 'cafe', label: 'Cat Café', icon: Coffee },
    { id: 'calm', label: 'Starlight Calm', icon: Moon },
    { id: 'keepsakes', label: 'Keepsakes', icon: Gift },
  ];

  return (
    <footer
      className={`py-12 px-4 border-t backdrop-blur-md text-center transition-colors duration-500 ${
        isDarkRoom
          ? 'border-indigo-900/50 bg-slate-950/70 text-indigo-200'
          : 'border-pink-100 bg-white/60 text-stone-700'
      }`}
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-5">
        <div className="flex items-center gap-2 text-base font-semibold">
          <span>🐾</span>
          <span className={isDarkRoom ? 'text-indigo-100 font-display' : 'text-rose-950 font-display'}>
            {visitorName}'s Little World
          </span>
          <span>🐾</span>
        </div>

        <p className={`max-w-md leading-relaxed text-xs sm:text-sm ${isDarkRoom ? 'text-indigo-200/80' : 'text-stone-600'}`}>
          A digital sanctuary created with warmth, affection, and gentle care — without any pressure.
          Come back whenever you need to breathe, smile, or hear a kitty purr.
        </p>

        {/* Quick Sanctuary Room Jump Links */}
        {setActiveRoom && (
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveRoom(item.id);
                    scrollToTop();
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isDarkRoom
                      ? 'bg-indigo-900/40 hover:bg-indigo-800/60 text-indigo-200 border border-indigo-700/40'
                      : 'bg-rose-50 hover:bg-rose-100 text-stone-700 border border-rose-200/60'
                  }`}
                >
                  <Icon size={12} className={isDarkRoom ? 'text-indigo-300' : 'text-rose-500'} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}

        <button
          onClick={scrollToTop}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-medium text-xs transition shadow-xs mt-2 ${
            isDarkRoom
              ? 'bg-indigo-950/80 hover:bg-indigo-900 text-indigo-200 border border-indigo-800/60'
              : 'bg-rose-100/80 hover:bg-rose-200/80 text-rose-900 border border-rose-200/60'
          }`}
        >
          <ArrowUp size={13} />
          <span>Back to Top</span>
        </button>

        <div className={`text-xs mt-2 flex flex-wrap items-center justify-center gap-1.5 font-medium ${isDarkRoom ? 'text-indigo-300' : 'text-rose-700'}`}>
          <span>Made with endless love for</span>
          <span className="font-bold underline decoration-pink-400 underline-offset-2">{visitorName}</span>
          <span>— by loving batman 🦇💖</span>
        </div>
      </div>
    </footer>
  );
}
