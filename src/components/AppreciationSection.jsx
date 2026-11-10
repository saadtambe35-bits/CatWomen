import React from 'react';
import { Heart, Sparkles, Quote, Sun, CloudRain, Feather, Coffee } from 'lucide-react';

export default function AppreciationSection({ visitorName = 'TASHMI' }) {
  const favoriteQuotes = [
    {
      text: "You don't have to bloom every day. Even flowers need rainy days.",
      meaning: "A gentle reminder that difficult days and quiet rest are an essential part of growing.",
      icon: <CloudRain className="text-pink-400" size={20} />,
      bg: "from-pink-50 to-rose-50 border-pink-200"
    },
    {
      text: "I hope life becomes softer with you, and gives you a thousand reasons to smile.",
      meaning: "Wishing you ease in the places where life has been rough, and unprompted giggles.",
      icon: <Sparkles className="text-purple-400" size={20} />,
      bg: "from-purple-50 to-pink-50 border-purple-200"
    },
    {
      text: "If today feels heavy, put it down for a while. The world can wait.",
      meaning: "You do not have to carry every responsibility all at once. Your well-being comes first.",
      icon: <Feather className="text-teal-400" size={20} />,
      bg: "from-teal-50 to-sky-50 border-teal-200"
    },
    {
      text: "You are not required to be sunshine all the time. You deserve warmth even on your cloudy days.",
      meaning: "You don't have to perform cheerfulness. You are loved even in your quietest moments.",
      icon: <Sun className="text-amber-400" size={20} />,
      bg: "from-amber-50 to-yellow-50 border-amber-200"
    },
    {
      text: "A little kindness, a little laughter, and a tiny cat. Sometimes that's enough to make a day better.",
      meaning: "Finding peace in the tender, simple joys when big answers feel overwhelming.",
      icon: <Coffee className="text-rose-400" size={20} />,
      bg: "from-rose-50 to-pink-50 border-rose-200"
    }
  ];

  return (
    <section id="appreciation" className="py-16 px-4 max-w-5xl mx-auto">
      {/* Central Highlight Banner */}
      <div className="relative glass-panel rounded-3xl p-8 sm:p-12 border-2 border-pink-200/90 shadow-2xl text-center mb-12 overflow-hidden bg-gradient-to-b from-white via-pink-50/40 to-purple-50/40">
        <div className="absolute top-4 left-6 text-pink-200 pointer-events-none">
          <Quote size={52} className="opacity-40" />
        </div>
        <div className="absolute bottom-4 right-6 text-purple-200 pointer-events-none rotate-180">
          <Quote size={52} className="opacity-40" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold uppercase tracking-wider mb-6">
            <Heart size={14} className="fill-pink-500 text-pink-500" />
            Just for You
          </div>

          {/* Primary Specified Quote */}
          <blockquote className="font-playfair text-2xl sm:text-3xl md:text-4xl text-pink-950 font-bold leading-snug mb-6 italic">
            "Some people deserve a little extra kindness, not because they ask for it, but because the world can be a little too heavy sometimes."
          </blockquote>

          {/* Sub-quote message tailored to visitorName */}
          <div className="pt-6 border-t border-pink-200/70">
            <p className="font-poppins text-base sm:text-lg text-pink-800 font-medium leading-relaxed">
              <span className="font-bold text-pink-900">{visitorName}</span>, I hope you never forget that you are worthy of kindness, happiness and all the beautiful little things life has to offer.
            </p>
          </div>
        </div>
      </div>

      {/* Grid of Favorite Warm Reminders */}
      <div className="mb-4 text-center">
        <h3 className="font-playfair text-2xl font-bold text-pink-900 mb-2">
          Pockets of Comfort for Your Day
        </h3>
        <p className="text-xs sm:text-sm text-pink-700/70">
          Gentle words to tuck into your heart whenever you need them.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {favoriteQuotes.map((q, idx) => (
          <div
            key={idx}
            className={`glass-panel rounded-3xl p-6 border bg-gradient-to-br ${q.bg} shadow-sm glass-card-hover flex flex-col justify-between`}
          >
            <div>
              <div className="p-2.5 rounded-2xl bg-white/80 w-fit mb-4 shadow-2xs border border-pink-100">
                {q.icon}
              </div>
              <p className="font-playfair text-lg text-pink-950 font-bold leading-snug mb-3">
                "{q.text}"
              </p>
            </div>
            <p className="text-xs text-pink-800/70 font-medium leading-relaxed pt-3 border-t border-pink-200/50">
              {q.meaning}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

