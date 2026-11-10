import React, { useState } from 'react';
import { Coffee } from 'lucide-react';
import { sound } from '../utils/soundEngine';

export default function CozyTeaStation({ visitorName = 'TASHMI' }) {
  const [selectedTea, setSelectedTea] = useState('chamomile');
  const [topping, setTopping] = useState('marshmallow');
  const [hasSipped, setHasSipped] = useState(false);

  const teas = [
    { id: 'chamomile', name: 'Chamomile Honey', color: '#FFF3B0', desc: 'Calming and golden, perfect for releasing worried thoughts.' },
    { id: 'matcha', name: 'Pastel Matcha Latte', color: '#D8F3DC', desc: 'Warm, grounding, and gentle on tired minds.' },
    { id: 'lavender', name: 'Lavender Sweet Milk', color: '#E2D4F0', desc: 'Soothing floral warmth to wrap around your heart.' },
    { id: 'cocoa', name: 'Velvet Cat Cocoa', color: '#DDB892', desc: 'Sweet, cozy comfort for the soul on chilly days.' }
  ];

  const toppings = [
    { id: 'marshmallow', name: 'Cat Paw Marshmallow 🐾' },
    { id: 'honey', name: 'Wild Honey Drizzle 🍯' },
    { id: 'stars', name: 'Sugar Stars ✨' },
    { id: 'cinnamon', name: 'Cinnamon Heart 💗' }
  ];

  const handleSip = () => {
    sound.init();
    sound.playSparkle();
    setHasSipped(true);
  };

  const currentTea = teas.find((t) => t.id === selectedTea);

  return (
    <section className="py-12 px-4 max-w-4xl mx-auto">
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-pink-200/90 shadow-md">
        <div className="flex items-center gap-2 text-pink-900 text-xs font-bold uppercase tracking-wider mb-2">
          <Coffee size={14} className="text-pink-600" /> Cozy Drink Nook
        </div>
        <h3 className="font-playfair text-2xl font-bold text-stone-900 mb-2">
          Warm Up with a Virtual Cup
        </h3>
        <p className="text-xs sm:text-sm text-stone-700 font-medium mb-6">
          Choose a warm soothing drink and garnish it however you like. A cozy cup made with extra care for {visitorName}.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Drink Visualizer */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-pink-50/70 rounded-2xl border border-pink-100">
            {/* Animated Steam */}
            <div className="flex gap-2 text-pink-400 font-bold text-lg animate-float-slow select-none mb-1">
              <span className="opacity-70 animate-bounce">~</span>
              <span className="opacity-90 animate-bounce delay-150">~</span>
              <span className="opacity-80 animate-bounce delay-300">~</span>
            </div>

            {/* Teacup SVG */}
            <div className="relative w-36 h-28 flex items-center justify-center">
              <svg width="140" height="110" viewBox="0 0 140 110" fill="none">
                <ellipse cx="70" cy="95" rx="55" ry="10" fill="#FFF0F5" stroke="#F3C4D7" strokeWidth="2.5" />
                <path
                  d="M30 35 C30 75 45 90 70 90 C95 90 110 75 110 35 Z"
                  fill="#FFFFFF"
                  stroke="#F3C4D7"
                  strokeWidth="2.5"
                />
                <ellipse cx="70" cy="38" rx="36" ry="10" fill={currentTea.color} />
                <path
                  d="M108 45 C122 45 125 70 106 72"
                  stroke="#F3C4D7"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                />
                <circle cx="70" cy="65" r="4" fill="#FFAEC9" opacity="0.8" />
                <circle cx="64" cy="58" r="2" fill="#FFAEC9" opacity="0.8" />
                <circle cx="76" cy="58" r="2" fill="#FFAEC9" opacity="0.8" />
                <circle cx="70" cy="55" r="2" fill="#FFAEC9" opacity="0.8" />
              </svg>
            </div>

            <span className="text-xs font-bold text-stone-900 mt-2">
              {currentTea.name}
            </span>
            <span className="text-[11px] text-pink-700 font-semibold">
              with {toppings.find((t) => t.id === topping).name}
            </span>

            <button
              onClick={handleSip}
              className="mt-4 px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 hover:opacity-95 text-white font-bold text-xs shadow-xs transition transform hover:scale-105 cursor-pointer min-h-[44px]"
            >
              {hasSipped ? 'Warmth felt in your chest 💕' : 'Take a Cozy Sip ☕'}
            </button>
          </div>

          {/* Options */}
          <div className="md:col-span-7 space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-900 mb-2">Pick Your Warm Drink</label>
              <div className="grid grid-cols-2 gap-2">
                {teas.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setSelectedTea(t.id);
                      setHasSipped(false);
                      sound.playSparkle();
                    }}
                    className={`p-2.5 rounded-xl text-left border transition text-xs cursor-pointer min-h-[44px] flex flex-col justify-center ${
                      selectedTea === t.id
                        ? 'bg-white border-pink-400 ring-2 ring-pink-200 font-bold text-stone-900 shadow-xs'
                        : 'bg-white/80 hover:bg-white border-pink-100 text-stone-700 font-medium'
                    }`}
                  >
                    <div className="font-bold">{t.name}</div>
                    <div className="text-[10px] text-stone-500 font-normal line-clamp-1">{t.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-900 mb-2">Pick a Topping</label>
              <div className="grid grid-cols-2 gap-2">
                {toppings.map((tp) => (
                  <button
                    key={tp.id}
                    onClick={() => {
                      setTopping(tp.id);
                      sound.playSparkle();
                    }}
                    className={`p-2.5 rounded-xl text-left border transition text-xs cursor-pointer font-medium min-h-[44px] flex items-center ${
                      topping === tp.id
                        ? 'bg-white border-pink-400 ring-2 ring-pink-200 font-bold text-stone-900 shadow-xs'
                        : 'bg-white/80 hover:bg-white border-pink-100 text-stone-700'
                    }`}
                  >
                    {tp.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
