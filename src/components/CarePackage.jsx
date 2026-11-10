import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Gift, Sparkles, Check, RefreshCw } from 'lucide-react';
import { sound } from '../utils/soundEngine';

export default function CarePackage({ visitorName = 'TASHMI' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    sound.init();
    sound.playSparkle();
    setIsOpening(true);

    setTimeout(() => {
      sound.playBloom();
      setIsOpening(false);
      setIsOpen(true);

      try {
        confetti({
          particleCount: 70,
          spread: 65,
          origin: { y: 0.75 },
          colors: ['#FFC0CB', '#FFD166', '#B8E0D2', '#CDB4DB', '#FFF0F5']
        });
      } catch {}
    }, 700);
  };

  const handleReset = () => {
    sound.init();
    sound.playSparkle();
    setIsOpen(false);
  };

  const packageItems = [
    {
      emoji: '☁️',
      title: 'Cloud Fleece Blanket',
      desc: 'Super soft, warm, and scented with lavender. Curl up without guilt.',
      tag: 'Cozy Rest'
    },
    {
      emoji: '☕',
      title: 'Cat-Marshmallow Cocoa',
      desc: 'Rich, sweet, and comforting. Guaranteed 100% warmth for your chest.',
      tag: 'Warmth'
    },
    {
      emoji: '🐾',
      title: '5x Gentle Kitty Headbutts',
      desc: 'Soft purring rumbles designed to dissolve 99.9% of stressful thoughts.',
      tag: 'Affection'
    },
    {
      emoji: '🎫',
      title: 'Overthinking Immunity Pass',
      desc: 'Grants full permission to turn off your brain and not worry for the rest of today.',
      tag: 'Peace of Mind'
    },
    {
      emoji: '🌸',
      title: 'Fresh Pink Peony Bouquet',
      desc: `A gentle reminder that you, ${visitorName}, make this world a softer, lovelier place.`,
      tag: 'Appreciation'
    }
  ];

  return (
    <section id="care-package" className="py-12 px-4 max-w-4xl mx-auto text-center">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 text-pink-900 text-xs font-bold uppercase tracking-wider mb-3 border border-pink-200">
          <Gift size={13} className="text-pink-600" />
          Prepared with Care
        </div>
        <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-stone-900 mb-3">
          A Comfort Care Package
        </h2>
        <p className="text-stone-700 text-sm sm:text-base max-w-md mx-auto font-medium leading-relaxed">
          A digital comfort box wrapped especially for {visitorName}. Untie the ribbon whenever the world feels a little too heavy.
        </p>
      </div>

      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-pink-200/90 shadow-xl relative overflow-hidden flex flex-col items-center">
        {!isOpen ? (
          <div className="flex flex-col items-center py-6">
            {/* Animated Wrapped Gift Box */}
            <div
              onClick={handleOpen}
              className={`cursor-pointer relative group transition-transform duration-300 select-none ${
                isOpening ? 'animate-bounce' : 'hover:scale-105'
              }`}
              title="Click to untie the gift box!"
            >
              <div className="absolute inset-0 bg-pink-300/30 rounded-full blur-2xl group-hover:bg-pink-400/40 transition-colors" />

              <svg width="180" height="180" viewBox="0 0 180 180" fill="none" className="relative z-10 drop-shadow-xl">
                <rect x="35" y="65" width="110" height="95" rx="10" fill="#FFE5EC" stroke="#FFB7C5" strokeWidth="3" />
                <rect x="80" y="65" width="20" height="95" fill="#FF85A1" />
                <rect x="35" y="105" width="110" height="18" fill="#FF85A1" />
                <rect x="28" y="50" width="124" height="22" rx="6" fill="#FFF0F5" stroke="#FFB7C5" strokeWidth="3" />
                <rect x="80" y="50" width="20" height="22" fill="#FF85A1" />
                <path
                  d="M90 50 C75 30 50 35 60 50 C70 58 85 52 90 50 Z"
                  fill="#FF85A1"
                  stroke="#FF4D6D"
                  strokeWidth="2"
                />
                <path
                  d="M90 50 C105 30 130 35 120 50 C110 58 95 52 90 50 Z"
                  fill="#FF85A1"
                  stroke="#FF4D6D"
                  strokeWidth="2"
                />
                <circle cx="90" cy="50" r="7" fill="#FF4D6D" />

                <g transform="translate(100, 80) rotate(15)">
                  <polygon points="0,0 35,0 42,12 35,24 0,24" fill="#FFFDF8" stroke="#D4A373" strokeWidth="1.5" />
                  <circle cx="8" cy="12" r="2" fill="#BC6C25" />
                  <text x="14" y="16" fontSize="8" fontFamily="'Poppins', sans-serif" fontWeight="bold" fill="#BC6C25">
                    FOR {visitorName}
                  </text>
                </g>
              </svg>

              <span className="text-[11px] font-bold text-pink-900 bg-pink-100/90 px-3 py-1 rounded-full mt-2 block shadow-xs border border-pink-200">
                {isOpening ? 'Untying ribbon...' : 'Click to untie ribbon 🎀'}
              </span>
            </div>

            <button
              onClick={handleOpen}
              className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 hover:opacity-95 text-white font-bold text-sm shadow-md shadow-pink-200 transition transform hover:-translate-y-0.5 cursor-pointer min-h-[44px]"
            >
              <Sparkles size={16} />
              <span>Open Your Care Package</span>
            </button>
          </div>
        ) : (
          <div className="w-full max-w-2xl py-4 animate-scaleUp">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-6 border border-emerald-200">
              <Check size={14} className="text-emerald-600" />
              Package Claimed for {visitorName}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-8">
              {packageItems.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white/95 border border-pink-100 shadow-sm flex items-start gap-3 glass-card-hover"
                >
                  <span className="text-3xl p-2 bg-pink-50 rounded-xl border border-pink-100 select-none">
                    {item.emoji}
                  </span>
                  <div>
                    <h4 className="font-playfair text-base font-bold text-stone-900">
                      {item.title}
                    </h4>
                    <span className="text-[10px] font-bold text-pink-600 uppercase tracking-wide">
                      {item.tag}
                    </span>
                    <p className="font-poppins text-xs text-stone-700 font-medium leading-relaxed mt-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleReset}
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-900 text-xs font-bold transition cursor-pointer min-h-[44px]"
            >
              <RefreshCw size={13} />
              <span>Wrap Another Package</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
