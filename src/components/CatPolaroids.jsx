import React, { useState } from 'react';
import { Camera, Heart, RotateCw } from 'lucide-react';
import { sound } from '../utils/soundEngine';

export default function CatPolaroids({ visitorName = 'TASHMI' }) {
  const [flippedCards, setFlippedCards] = useState({});

  const polaroids = [
    {
      id: 'mochi',
      title: 'Mochi in a Teacup ☕',
      frontEmoji: '☕😴',
      caption: 'If I fits, I sits. And I sleeps.',
      backMessage: `Mochi wanted to remind you: "Human, on busy days, remember to tuck yourself into something warm and cozy. Just like my favorite cup."`,
      date: 'Cat Café Afternoon',
      borderTint: 'border-pink-200 bg-pink-50/50'
    },
    {
      id: 'mikan',
      title: 'Mikan\'s Flower Crown 🌸',
      frontEmoji: '🌸🍊',
      caption: 'One single braincell, but looking fabulous.',
      backMessage: `Mikan wants you to know: "You don't need to have everything figured out to be wonderful. Sometimes wearing a flower crown and being goofy is enough!"`,
      date: 'Garden Zoomies Session',
      borderTint: 'border-amber-200 bg-amber-50/50'
    },
    {
      id: 'yuki',
      title: 'Her Majesty Yuki 👑',
      frontEmoji: '👑🤍',
      caption: 'Royal Persian fluff taking a sunbath.',
      backMessage: `Yuki decrees: "${visitorName}, you deserve to be treated with royalty-tier gentleness, soft blankets, and zero unsolicited stress."`,
      date: 'Sunny Velvet Cushion',
      borderTint: 'border-purple-200 bg-purple-50/50'
    },
    {
      id: 'kuro',
      title: 'Pocket Panther Kuro 🖤',
      frontEmoji: '🧥🐾',
      caption: 'Peeking out of the sweater pocket.',
      backMessage: `Kuro whispers: "I fit right into your sweater pocket so I can keep bad thoughts and gloomy skies away from you wherever you go!"`,
      date: 'Chilly Morning Snuggle',
      borderTint: 'border-blue-200 bg-blue-50/50'
    }
  ];

  const toggleFlip = (id) => {
    sound.init();
    sound.playSparkle();
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section id="polaroids" className="py-10 sm:py-12 px-3 sm:px-4 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 text-rose-900 text-xs font-bold uppercase tracking-wider mb-3 border border-rose-200">
          <Camera size={13} className="text-rose-600" />
          Kitten Snapshots
        </div>
        <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 mb-2 sm:mb-3">
          The Kitten Polaroid Wall
        </h2>
        <p className="text-stone-700 text-xs sm:text-base max-w-md mx-auto font-medium leading-relaxed">
          Candid snapshots of our four café residents. Click any polaroid to flip it and read the little message written on the back!
        </p>
      </div>

      {/* Responsive Grid: 2 columns on phone, 3 on tablet, 4 on desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
        {polaroids.map((p) => {
          const isFlipped = !!flippedCards[p.id];
          return (
            <div
              key={p.id}
              onClick={() => toggleFlip(p.id)}
              className="cursor-pointer group select-none min-h-[44px]"
            >
              <div
                className={`relative bg-white p-3 sm:p-4 pb-4 sm:pb-6 rounded-2xl shadow-md border-2 ${p.borderTint} transition-all duration-300 transform hover:-translate-y-1.5 hover:shadow-xl h-full flex flex-col justify-between`}
              >
                {/* Washi Tape at top */}
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-12 sm:w-16 h-5 sm:h-6 bg-pink-200/90 opacity-90 backdrop-blur-xs transform -rotate-2 rounded-xs shadow-2xs z-20 pointer-events-none" />

                {!isFlipped ? (
                  <div className="flex flex-col items-center h-full justify-between">
                    <div className="w-full h-32 sm:h-40 md:h-44 bg-gradient-to-b from-pink-50 to-purple-50 rounded-xl border border-pink-100 flex flex-col items-center justify-center relative overflow-hidden mb-2 sm:mb-3">
                      <span className="text-3xl sm:text-5xl filter drop-shadow-sm animate-float-gentle">
                        {p.frontEmoji}
                      </span>
                      <span className="absolute bottom-1.5 right-1.5 text-[9px] sm:text-[10px] text-pink-600 font-bold bg-white/80 px-1.5 py-0.5 rounded-full shadow-2xs">
                        tap to flip 🔄
                      </span>
                    </div>

                    <h4 className="font-playfair text-xs sm:text-base font-bold text-stone-900 text-center mb-1 line-clamp-1">
                      {p.title}
                    </h4>
                    <p className="font-handwritten text-sm sm:text-lg text-stone-700 text-center font-medium line-clamp-2">
                      "{p.caption}"
                    </p>
                    <span className="text-[9px] sm:text-[10px] text-stone-500 font-semibold mt-1">
                      {p.date}
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-between min-h-[190px] sm:min-h-[240px] p-2 bg-[#FFFDF8] rounded-xl border border-dashed border-pink-200 animate-fadeIn h-full">
                    <div className="flex items-center gap-1 text-[10px] sm:text-xs font-bold text-pink-600 uppercase tracking-wider mb-1">
                      <Heart size={11} className="fill-pink-500 text-pink-500" />
                      <span>Note on Back</span>
                    </div>

                    <p className="font-handwritten text-sm sm:text-lg text-stone-900 leading-relaxed font-semibold text-center my-auto">
                      {p.backMessage}
                    </p>

                    <div className="w-full pt-2 border-t border-pink-100 flex items-center justify-between text-[10px] text-pink-600 font-bold">
                      <span>🐾 Sent with love</span>
                      <span className="flex items-center gap-1">
                        <RotateCw size={10} /> flip back
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
