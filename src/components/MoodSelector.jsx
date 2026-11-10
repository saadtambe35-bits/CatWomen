import React, { useState } from 'react';
import { Heart, Sparkles, Coffee, Smile, Wind, Compass, ArrowRight, ShieldCheck } from 'lucide-react';
import { sound } from '../utils/soundEngine';

export default function MoodSelector({
  visitorName = 'TASHMI',
  currentMood,
  setCurrentMood,
  setActiveRoom
}) {
  const [hugCount, setHugCount] = useState(0);
  const [teaSipped, setTeaSipped] = useState(false);

  const moods = [
    {
      id: 'comfort',
      emoji: '🥺',
      label: 'Need a little comfort',
      color: 'from-pink-100 to-rose-100 border-pink-300 text-pink-950',
      title: 'Sending you the gentlest warm hug...',
      message: `${visitorName}, on days when everything feels like too much, please know you don't have to handle it alone. It is okay to be gentle with yourself. You are doing so much better than you realize.`,
      recommendedRoom: 'keepsakes',
      recommendedLabel: 'Open the Sunshine Jar'
    },
    {
      id: 'rough',
      emoji: '😭',
      label: 'Having a rough day',
      color: 'from-purple-100 to-indigo-100 border-purple-300 text-purple-950',
      title: 'It is okay to put the weight down.',
      message: `You don't have to be strong right now, and you don't have to put on a brave face. Even the fiercest storms run out of rain. For right now, just breathe. The world can wait for you.`,
      recommendedRoom: 'calm',
      recommendedLabel: 'Visit Starlight Calm'
    },
    {
      id: 'funny',
      emoji: '😂',
      label: 'Need something funny',
      color: 'from-amber-100 to-yellow-100 border-amber-300 text-amber-950',
      title: 'Kitten goofiness dispatched to your rescue!',
      message: `Did you know our silly orange cat Mikan tried to catch a laser beam yesterday and ended up wearing a cardboard box as a fashionable hat? Laughter is officially on the house today!`,
      recommendedRoom: 'cafe',
      recommendedLabel: 'Play with Mikan'
    },
    {
      id: 'peace',
      emoji: '😴',
      label: 'Just want some peace',
      color: 'from-teal-100 to-blue-100 border-teal-300 text-teal-950',
      title: 'Welcome to your quiet refuge.',
      message: `No noise. No obligations. No demands. Take a deep breath, sink into this calm space, and let the quiet rhythm of the cats bring you total tranquility.`,
      recommendedRoom: 'calm',
      recommendedLabel: '4-4-6 Breathing Corner'
    },
    {
      id: 'good',
      emoji: '😊',
      label: 'Feeling pretty good',
      color: 'from-emerald-100 to-green-100 border-emerald-300 text-emerald-950',
      title: 'Hearing that makes my day so much brighter!',
      message: `Cherish this lovely feeling! I hope this smile stays with you all day long. Let's make it even brighter with some fun in the café or catching fishies for the kittens!`,
      recommendedRoom: 'cafe',
      recommendedLabel: 'Play Catch the Fish'
    }
  ];

  const activeSelected = moods.find((m) => m.id === currentMood) || null;

  const handleSelectMood = (mood) => {
    sound.init();
    sound.playSparkle();
    if (setCurrentMood) setCurrentMood(mood.id);
    setTeaSipped(false);
  };

  const handleSendHug = () => {
    sound.init();
    sound.playPurr(1.5);
    setHugCount((prev) => prev + 1);
  };

  const handleSipTea = () => {
    sound.init();
    sound.playSparkle();
    setTeaSipped(true);
  };

  return (
    <section id="mood-selection" className="py-12 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 text-pink-900 text-xs font-bold uppercase tracking-wider mb-3 border border-pink-200">
          <Heart size={13} className="fill-pink-500 text-pink-500" />
          Safe & Gentle Check-in
        </div>
        <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-stone-900 mb-3">
          How are you feeling today?
        </h2>
        <p className="text-stone-700 text-sm sm:text-base max-w-md mx-auto font-medium leading-relaxed">
          Whatever you are feeling is completely valid. No pressure to cheer up — this sanctuary will match your pace.
        </p>
      </div>

      {/* Mood Buttons Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-3 mb-8">
        {moods.map((mood) => {
          const isSelected = activeSelected?.id === mood.id;
          return (
            <button
              key={mood.id}
              onClick={() => handleSelectMood(mood)}
              className={`p-3 sm:p-4 rounded-2xl flex flex-col items-center justify-center gap-1.5 sm:gap-2 transition-all duration-300 border-2 cursor-pointer shadow-xs min-h-[44px] ${
                isSelected
                  ? 'bg-white border-pink-500 scale-105 shadow-md shadow-pink-200 ring-2 ring-pink-300/40'
                  : 'bg-white/90 hover:bg-white border-pink-100 hover:border-pink-300 hover:-translate-y-1'
              }`}
            >
              <span className="text-2xl sm:text-3xl filter drop-shadow-xs select-none">{mood.emoji}</span>
              <span className="text-xs sm:text-sm font-bold text-stone-900 text-center leading-snug">
                {mood.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Response Box */}
      {activeSelected && (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-pink-200/90 shadow-lg animate-fadeIn relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl p-2 bg-pink-50 rounded-2xl border border-pink-100 shadow-xs select-none">
                {activeSelected.emoji}
              </span>
              <div>
                <h3 className="font-playfair text-xl sm:text-2xl font-bold text-stone-900">
                  {activeSelected.title}
                </h3>
                <span className="text-xs text-pink-600 font-bold">Just for you, right now</span>
              </div>
            </div>

            <p className="font-poppins text-base text-stone-800 leading-relaxed mb-6 font-medium">
              {activeSelected.message}
            </p>

            {/* Micro-Activities & Room Switcher */}
            <div className="pt-4 border-t border-pink-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                {activeSelected.id === 'comfort' && (
                  <button
                    onClick={handleSendHug}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-pink-100 hover:bg-pink-200 text-pink-900 text-xs font-bold transition cursor-pointer"
                  >
                    <span>🐱</span>
                    <span>Receive Virtual Cat Hug</span>
                    {hugCount > 0 && (
                      <span className="px-2 py-0.5 bg-pink-500 text-white rounded-full text-xs font-bold animate-pulse">
                        +{hugCount * 100} hugs
                      </span>
                    )}
                  </button>
                )}

                {activeSelected.id === 'rough' && (
                  <button
                    onClick={handleSipTea}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-950 text-xs font-bold transition cursor-pointer"
                  >
                    <Coffee size={15} />
                    <span>{teaSipped ? 'Warm chamomile tea sipped ☕' : 'Sip warm chamomile tea ☕'}</span>
                  </button>
                )}

                {activeSelected.id === 'funny' && (
                  <button
                    onClick={() => sound.playMeow('silly')}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 text-xs font-bold transition cursor-pointer"
                  >
                    <Sparkles size={14} className="text-amber-600" />
                    <span>Orange Cat "Derp" Sound</span>
                  </button>
                )}

                {activeSelected.id === 'peace' && (
                  <button
                    onClick={() => sound.playPurr(3)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-100 hover:bg-teal-200 text-teal-950 text-xs font-bold transition cursor-pointer"
                  >
                    <Wind size={15} />
                    <span>Listen to Quiet Purr (5s)</span>
                  </button>
                )}

                {activeSelected.id === 'good' && (
                  <button
                    onClick={() => sound.playBloom()}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-950 text-xs font-bold transition cursor-pointer"
                  >
                    <Sparkles size={14} className="text-emerald-600" />
                    <span>Send Joy Sparkles ✨</span>
                  </button>
                )}
              </div>

              {/* Recommendation Shortcut Button */}
              {setActiveRoom && (
                <button
                  onClick={() => setActiveRoom(activeSelected.recommendedRoom)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-400 hover:opacity-95 text-white text-xs font-bold shadow-xs transition transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>{activeSelected.recommendedLabel}</span>
                  <ArrowRight size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
