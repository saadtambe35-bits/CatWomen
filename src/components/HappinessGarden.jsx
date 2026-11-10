import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Sparkles, Plus, X, Flower2 } from 'lucide-react';
import { sound } from '../utils/soundEngine';

export default function HappinessGarden({
  visitorName = 'TASHMI',
  plantedFlowers = [],
  addPlantedFlower
}) {
  const baseFlowers = useMemo(() => [
    {
      id: 1,
      type: 'sakura',
      name: 'Cherry Blossom',
      color: '#FFB7C5',
      stemColor: '#70A060',
      isBloomed: true,
      message: "You don't have to bloom every day. Even flowers need rainy days to gather their strength.",
      category: 'Gentle Reminder'
    },
    {
      id: 2,
      type: 'lavender',
      name: 'Lavender Sprig',
      color: '#CDB4DB',
      stemColor: '#588157',
      isBloomed: false,
      message: "I hope life becomes softer with you, and gives you a thousand unexpected reasons to smile.",
      category: 'Warm Wish'
    },
    {
      id: 3,
      type: 'sunflower',
      name: 'Mini Sunflower',
      color: '#FFB703',
      stemColor: '#609966',
      isBloomed: false,
      message: "You are not required to be sunshine all the time. You deserve warmth even on your cloudy days.",
      category: 'Self Compassion'
    },
    {
      id: 4,
      type: 'tulip',
      name: 'Pastel Tulip',
      color: '#FFAAA6',
      stemColor: '#588157',
      isBloomed: false,
      message: "If today feels heavy, put it down for a while. The world can wait for you to catch your breath.",
      category: 'Permission to Rest'
    },
    {
      id: 5,
      type: 'rose',
      name: 'Gentle Rose',
      color: '#FF85A1',
      stemColor: '#407040',
      isBloomed: false,
      message: "A little kindness, a little laughter, and a tiny cat. Sometimes that's truly enough to make a day better.",
      category: 'Simple Joys'
    },
    {
      id: 6,
      type: 'daisy',
      name: 'White Daisy',
      color: '#FFFFFF',
      stemColor: '#609966',
      isBloomed: false,
      message: "Even the quietest, smallest step forward counts as progress. Be proud of just showing up today.",
      category: 'Quiet Strength'
    }
  ], []);

  const [bloomedMap, setBloomedMap] = useState({ 1: true });

  const allFlowers = useMemo(() => {
    return [...plantedFlowers, ...baseFlowers];
  }, [plantedFlowers, baseFlowers]);

  const [activeMessage, setActiveMessage] = useState(baseFlowers[0]);
  const [isPlantModalOpen, setIsPlantModalOpen] = useState(false);
  const [newFlowerName, setNewFlowerName] = useState('');
  const [newFlowerMessage, setNewFlowerMessage] = useState('');
  const [newFlowerColor, setNewFlowerColor] = useState('#FF9EAA');

  const handleBloomFlower = (flower) => {
    sound.init();
    sound.playBloom();
    setBloomedMap((prev) => ({ ...prev, [flower.id]: true }));
    setActiveMessage(flower);
  };

  const handlePlantFlower = (e) => {
    e.preventDefault();
    if (!newFlowerName.trim()) return;

    sound.init();
    sound.playBloom();

    const created = {
      id: Date.now(),
      type: 'custom',
      name: newFlowerName.trim(),
      color: newFlowerColor,
      stemColor: '#609966',
      isBloomed: true,
      message:
        newFlowerMessage.trim() ||
        `${visitorName}, this little blossom was planted with love to remind you of your own brightness.`,
      category: 'Planted by You'
    };

    setBloomedMap((prev) => ({ ...prev, [created.id]: true }));
    setActiveMessage(created);
    if (addPlantedFlower) addPlantedFlower(created);

    setNewFlowerName('');
    setNewFlowerMessage('');
    setIsPlantModalOpen(false);
  };

  const totalBloomed = allFlowers.filter((f) => bloomedMap[f.id] || f.isBloomed).length;

  return (
    <section id="garden" className="py-12 px-4 max-w-5xl mx-auto relative">
      {/* Animated Butterflies */}
      <div className="absolute top-8 left-1/4 animate-butterfly pointer-events-none select-none z-20">
        <span className="text-2xl filter drop-shadow-sm">🦋</span>
      </div>
      <div className="absolute top-28 right-1/5 animate-butterfly delay-1000 pointer-events-none select-none z-20">
        <span className="text-xl filter drop-shadow-sm">🦋</span>
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 text-pink-900 text-xs font-bold uppercase tracking-wider mb-3 border border-pink-200">
          <Flower2 size={13} className="text-pink-600" />
          Nurture & Bloom
        </div>
        <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-stone-900 mb-3">
          The Happiness Garden
        </h2>
        <p className="text-stone-700 text-sm sm:text-base max-w-lg mx-auto font-medium leading-relaxed">
          Click any bud to help it bloom and reveal a soothing message. Plant your own flower whenever you need a peaceful reminder.
        </p>
      </div>

      {/* Garden Meadow Grid */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-pink-200/90 shadow-xl mb-8 relative">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-pink-100">
          <div className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
            <span>{totalBloomed} of {allFlowers.length} flowers bloomed</span>
          </div>
          <button
            onClick={() => setIsPlantModalOpen(true)}
            className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-95 text-white font-bold text-xs shadow-xs transition transform hover:-translate-y-0.5 cursor-pointer min-h-[44px]"
          >
            <Plus size={14} />
            <span>Plant a Flower</span>
          </button>
        </div>

        {/* Flowers Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3.5">
          {allFlowers.map((flower) => {
            const isBloomed = bloomedMap[flower.id] || flower.isBloomed;
            const isSelected = activeMessage?.id === flower.id;
            return (
              <button
                key={flower.id}
                onClick={() => handleBloomFlower(flower)}
                className={`flex flex-col items-center justify-end p-4 h-48 rounded-2xl transition-all duration-300 relative group cursor-pointer border ${
                  isSelected
                    ? 'bg-pink-50 border-pink-400 ring-2 ring-pink-200 shadow-md'
                    : 'bg-white/85 hover:bg-white border-pink-100 hover:border-pink-300'
                }`}
              >
                {isBloomed && (
                  <span className="absolute top-2 right-2 text-xs animate-twinkle">✨</span>
                )}

                <div
                  className={`relative transform transition-all duration-500 mb-2 ${
                    isBloomed ? 'scale-105 animate-sway' : 'scale-90 group-hover:scale-95 opacity-80'
                  }`}
                >
                  <svg width="60" height="90" viewBox="0 0 60 90" fill="none">
                    <path
                      d="M30 45 Q26 65 30 85"
                      stroke={flower.stemColor || '#609966'}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M30 65 Q42 60 40 70 Q30 72 30 65"
                      fill={flower.stemColor || '#609966'}
                      opacity="0.9"
                    />
                    <path
                      d="M30 75 Q18 70 20 80 Q30 82 30 75"
                      fill={flower.stemColor || '#609966'}
                      opacity="0.9"
                    />

                    {isBloomed ? (
                      <g>
                        <circle cx="30" cy="24" r="11" fill={flower.color} />
                        <circle cx="20" cy="32" r="11" fill={flower.color} />
                        <circle cx="40" cy="32" r="11" fill={flower.color} />
                        <circle cx="23" cy="42" r="11" fill={flower.color} />
                        <circle cx="37" cy="42" r="11" fill={flower.color} />
                        <circle cx="30" cy="34" r="8" fill="#FFF3B0" stroke="#E0A96D" strokeWidth="1" />
                        <circle cx="30" cy="34" r="4" fill="#E0A96D" opacity="0.6" />
                      </g>
                    ) : (
                      <g>
                        <ellipse cx="30" cy="40" rx="9" ry="14" fill={flower.color} opacity="0.8" />
                        <path
                          d="M26 48 C24 40 28 32 30 30 C32 32 36 40 34 48 Z"
                          fill={flower.stemColor || '#609966'}
                          opacity="0.7"
                        />
                      </g>
                    )}
                  </svg>
                </div>

                <span className="text-xs font-bold text-stone-900 text-center leading-tight truncate w-full">
                  {flower.name}
                </span>
                <span className="text-[10px] text-pink-600 font-semibold mt-0.5">
                  {isBloomed ? 'Bloomed 🌸' : 'Click to bloom'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Flower Message Reveal Banner */}
      {activeMessage && (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-pink-200 shadow-md bg-gradient-to-r from-pink-50/80 via-white to-purple-50/80 animate-fadeIn">
          <div className="flex items-start gap-4">
            <span className="text-3xl p-2.5 bg-pink-100 rounded-2xl shadow-xs select-none">🌷</span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-pink-700 bg-pink-100/90 px-2.5 py-0.5 rounded-full border border-pink-200">
                  {activeMessage.category}
                </span>
                <span className="text-xs text-stone-600 font-semibold">— {activeMessage.name}</span>
              </div>
              <p className="font-playfair text-lg sm:text-xl text-stone-900 italic font-medium leading-relaxed mt-2">
                "{activeMessage.message.replace(/Tashmi|TASHMI/g, visitorName)}"
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Plant Flower Modal Portaled to document.body */}
      {isPlantModalOpen && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-rose-950/45 backdrop-blur-sm overflow-y-auto animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsPlantModalOpen(false);
          }}
        >
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-pink-100 animate-scaleUp relative my-auto max-h-[85dvh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-playfair text-xl font-bold text-stone-900 flex items-center gap-2">
                <span>🌱</span> Plant a New Flower
              </h3>
              <button
                onClick={() => setIsPlantModalOpen(false)}
                className="text-stone-400 hover:text-stone-700 p-1 rounded-full cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handlePlantFlower} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-900 mb-1">Flower Name</label>
                <input
                  type="text"
                  required
                  maxLength={20}
                  placeholder="e.g. Hope Blossom, Peace Lily"
                  value={newFlowerName}
                  onChange={(e) => setNewFlowerName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-pink-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 font-semibold text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-900 mb-1">Flower Color</label>
                <div className="flex items-center gap-3">
                  {['#FFB7C5', '#FFAAA6', '#CDB4DB', '#FFB703', '#B8E0D2', '#D8BBFF'].map((c) => (
                    <button
                      type="button"
                      key={c}
                      onClick={() => setNewFlowerColor(c)}
                      className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer ${
                        newFlowerColor === c ? 'scale-125 border-pink-600 shadow-sm' : 'border-white'
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-900 mb-1">
                  Gentle Note / Affirmation
                </label>
                <textarea
                  rows={3}
                  maxLength={140}
                  placeholder="A kind reminder or wish for yourself or TASHMI..."
                  value={newFlowerMessage}
                  onChange={(e) => setNewFlowerMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-pink-200 text-sm font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsPlantModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-500 hover:bg-stone-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-95 shadow-xs cursor-pointer"
                >
                  Plant in Garden 🌸
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
