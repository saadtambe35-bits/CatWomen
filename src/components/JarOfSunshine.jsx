import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Sun, RefreshCw, Heart, X } from 'lucide-react';
import { sound } from '../utils/soundEngine';

export default function JarOfSunshine({
  visitorName = 'TASHMI',
  openedSunshines = [],
  markSunshineOpened
}) {
  const notes = [
    "You deserve happiness, even on the days you don't feel your best.",
    "Take a breath. You don't have to solve everything today.",
    "Your existence makes this world a little more beautiful.",
    "Please don't forget to be kind to yourself.",
    "Even the smallest steps count.",
    "You are allowed to rest without feeling guilty.",
    "You don't have to bloom every day. Even flowers need rainy days.",
    "I hope life becomes softer with you, and gives you a thousand reasons to smile.",
    "If today feels heavy, put it down for a while. The world can wait.",
    "You are not required to be sunshine all the time. You deserve warmth even on your cloudy days.",
    "A little kindness, a little laughter, and a tiny cat. Sometimes that's enough to make a day better.",
    "You are more resilient and courageous than you give yourself credit for.",
    "Whatever didn't get finished today can wait until tomorrow. Be proud of what you survived.",
    "Somewhere, someone smiled today just because you crossed their mind.",
    "You are allowed to take up space, set boundaries, and protect your peace.",
    "Softness is not weakness; it takes incredible courage to stay gentle in a tough world.",
    "The clouds will pass, the skies will clear, and you will breathe easy again.",
    "You don't need anyone's permission to relax, nap, or just do absolutely nothing.",
    "You are a rare and precious soul. Never forget how much you matter.",
    "No feeling is permanent. This tiredness will lift, and brighter mornings will come.",
    "Your heart is doing its best, and that is more than enough.",
    "Drink some water, stretch your back, and let out that breath you've been holding.",
    "A quiet day is not an unproductive day; it is a healing day.",
    "You bring warmth into the lives of those who know you, even when you can't feel it yourself.",
    "Sending you infinite virtual hugs, a warm cup of cocoa, and sleepy kitten purrs."
  ];

  const [activeNoteIndex, setActiveNoteIndex] = useState(null);
  const [isShaking, setIsShaking] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);

  const activeNote = activeNoteIndex !== null ? notes[activeNoteIndex] : null;

  const pickRandomNote = () => {
    sound.init();
    sound.playSparkle();
    setIsShaking(true);

    setTimeout(() => {
      setIsShaking(false);
      const randomIndex = Math.floor(Math.random() * notes.length);
      setActiveNoteIndex(randomIndex);
      if (markSunshineOpened) markSunshineOpened(randomIndex);
    }, 450);
  };

  const toggleFavorite = (text) => {
    sound.init();
    sound.playSparkle();
    if (favorites.includes(text)) {
      setFavorites(favorites.filter((f) => f !== text));
    } else {
      setFavorites([...favorites, text]);
    }
  };

  const totalOpened = new Set([...openedSunshines, ...(activeNoteIndex !== null ? [activeNoteIndex] : [])]).size;

  return (
    <section id="sunshine-jar" className="py-12 px-4 max-w-4xl mx-auto">
      {/* Heartfelt Appreciation Banner Merged at top */}
      <div className="relative glass-panel rounded-3xl p-6 sm:p-8 border-2 border-pink-200/90 shadow-lg text-center mb-10 overflow-hidden bg-gradient-to-r from-pink-50/70 via-white to-purple-50/70">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-900 text-xs font-bold uppercase tracking-wider mb-4 border border-pink-200">
          <Heart size={13} className="fill-pink-500 text-pink-500" />
          A Little Extra Kindness
        </div>

        <blockquote className="font-playfair text-xl sm:text-2xl text-stone-900 font-bold leading-snug mb-3 italic">
          "Some people deserve a little extra kindness, not because they ask for it, but because the world can be a little too heavy sometimes."
        </blockquote>

        <p className="font-poppins text-xs sm:text-sm text-stone-700 font-medium max-w-md mx-auto">
          <span className="font-bold text-stone-900">{visitorName}</span>, I hope you never forget that you are worthy of kindness, happiness and all the beautiful little things life has to offer.
        </p>
      </div>

      {/* Jar Section Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-950 text-xs font-bold uppercase tracking-wider mb-3 border border-amber-200">
          <Sun size={13} className="text-amber-500 fill-amber-500" />
          Warmth in a Jar
        </div>
        <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-stone-900 mb-3">
          Jar of Sunshine
        </h2>
        <p className="text-stone-700 text-sm sm:text-base max-w-md mx-auto font-medium leading-relaxed">
          Whenever clouds gather over your day, reach inside this jar for a gentle reminder of how cherished and resilient you are.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Animated Glass Jar */}
        <div className="flex flex-col items-center">
          <div
            onClick={pickRandomNote}
            className={`relative w-48 h-64 sm:w-56 sm:h-72 cursor-pointer transition-transform duration-300 select-none group ${
              isShaking ? 'animate-bounce' : 'hover:scale-105'
            }`}
            title="Click to pull a note of sunshine!"
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-yellow-200/40 rounded-full blur-2xl -z-10 group-hover:bg-yellow-300/50 transition-colors" />

            {/* SVG Glass Mason Jar */}
            <svg
              className="w-full h-full drop-shadow-xl"
              viewBox="0 0 200 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="58" y="15" width="84" height="20" rx="4" fill="#D4A373" stroke="#BC6C25" strokeWidth="2" />
              <rect x="50" y="35" width="100" height="12" rx="3" fill="#E6BE8A" stroke="#BC6C25" strokeWidth="2" />
              <line x1="50" y1="42" x2="150" y2="42" stroke="#FF85A1" strokeWidth="3" />
              <circle cx="100" cy="42" r="5" fill="#FF85A1" />
              <path d="M100 42 Q90 52 82 46 M100 42 Q110 52 118 46" stroke="#FF85A1" strokeWidth="2.5" fill="none" />

              <path
                d="M50 47 C45 60 30 75 30 110 L30 220 C30 240 45 250 100 250 C155 250 170 240 170 220 L170 110 C170 75 155 60 150 47 Z"
                fill="url(#glassGrad)"
                stroke="#FFE5EC"
                strokeWidth="3"
              />

              <path
                d="M42 90 L42 210 C42 225 50 235 60 238"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.6"
              />

              {/* Folded Paper Notes inside Jar */}
              <g className="animate-float-gentle">
                <rect x="55" y="180" width="35" height="24" rx="4" fill="#FFCCD5" stroke="#FFA7B6" strokeWidth="1.5" transform="rotate(-15 72 192)" />
                <rect x="95" y="195" width="38" height="26" rx="4" fill="#FFF176" stroke="#FFEE58" strokeWidth="1.5" transform="rotate(18 114 208)" />
                <rect x="110" y="160" width="32" height="24" rx="4" fill="#E0AAFF" stroke="#C77DFF" strokeWidth="1.5" transform="rotate(-8 126 172)" />
                <rect x="65" y="140" width="34" height="22" rx="4" fill="#B8E0D2" stroke="#95D5B2" strokeWidth="1.5" transform="rotate(22 82 151)" />
                <rect x="90" y="125" width="36" height="25" rx="4" fill="#FFD6A5" stroke="#FFBD59" strokeWidth="1.5" transform="rotate(-12 108 137)" />

                <circle cx="75" cy="115" r="3" fill="#FFF9A6" className="animate-twinkle" />
                <circle cx="125" cy="110" r="3.5" fill="#FFF9A6" className="animate-twinkle delay-300" />
                <circle cx="100" cy="170" r="3" fill="#FFF9A6" className="animate-twinkle delay-700" />
              </g>

              <rect x="60" y="145" width="80" height="32" rx="6" fill="#FFF8F0" stroke="#E6BE8A" strokeWidth="1.5" opacity="0.95" />
              <text x="100" y="165" fontSize="11" fontFamily="'Poppins', sans-serif" fontWeight="bold" fill="#BC6C25" textAnchor="middle">
                SUNSHINE
              </text>

              <defs>
                <linearGradient id="glassGrad" x1="30" y1="50" x2="170" y2="250" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FFFFFF" stopOpacity="0.45" />
                  <stop offset="0.5" stopColor="#FFF9E6" stopOpacity="0.3" />
                  <stop offset="1" stopColor="#FFDEE9" stopOpacity="0.4" />
                </linearGradient>
              </defs>
            </svg>

            <span className="text-[11px] font-bold text-amber-900 bg-amber-100/90 px-3 py-1 rounded-full mt-3 block text-center shadow-xs border border-amber-300">
              Click jar to unfold note ✨
            </span>
          </div>

          <div className="flex items-center gap-3 mt-3 text-xs font-semibold text-stone-700">
            <span>☀️ {totalOpened} / {notes.length} notes read</span>
            {favorites.length > 0 && (
              <button
                onClick={() => setShowFavoritesModal(true)}
                className="text-pink-600 font-bold hover:underline cursor-pointer flex items-center gap-1"
              >
                <Heart size={12} className="fill-pink-500 text-pink-500" /> {favorites.length} saved
              </button>
            )}
          </div>
        </div>

        {/* Note Display Card */}
        <div className="w-full max-w-md">
          {activeNote ? (
            <div className="relative bg-gradient-to-br from-amber-50 via-white to-pink-50 rounded-3xl p-6 sm:p-8 border-2 border-amber-200/90 shadow-xl animate-scaleUp">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-amber-100">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
                  <Sun size={14} className="fill-amber-400 text-amber-500" />
                  Sunshine Note
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleFavorite(activeNote)}
                    className="p-1.5 rounded-full hover:bg-amber-100/60 text-amber-600 transition cursor-pointer"
                    title={favorites.includes(activeNote) ? 'Saved' : 'Save to favorites'}
                  >
                    <Heart
                      size={18}
                      className={favorites.includes(activeNote) ? 'fill-rose-500 text-rose-500' : 'text-stone-400'}
                    />
                  </button>
                  <button
                    onClick={() => setActiveNoteIndex(null)}
                    className="p-1 rounded-full hover:bg-amber-100/60 text-stone-400 hover:text-stone-700 cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              <div className="py-2">
                <p className="font-handwritten text-2xl sm:text-3xl text-stone-900 leading-relaxed font-semibold">
                  "{activeNote.replace(/Tashmi|TASHMI/g, visitorName)}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between">
                <span className="text-xs text-amber-900/80 font-semibold">
                  Take this warmth with you today.
                </span>
                <button
                  onClick={pickRandomNote}
                  className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-stone-950 font-bold text-xs transition shadow-xs cursor-pointer min-h-[44px]"
                >
                  <RefreshCw size={13} className={isShaking ? 'animate-spin' : ''} />
                  <span>Pick Another</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="glass-panel rounded-3xl p-8 border border-pink-200/80 text-center flex flex-col items-center justify-center min-h-[220px]">
              <span className="text-4xl mb-3 animate-bounce select-none">☀️</span>
              <h4 className="font-playfair text-lg font-bold text-stone-900 mb-1">
                The Jar is Full of Sunshine
              </h4>
              <p className="text-xs sm:text-sm text-stone-700 font-medium max-w-xs mb-4">
                Click on the glass jar whenever you need a heartfelt pick-me-up. There are 25 gentle notes waiting inside for you.
              </p>
              <button
                onClick={pickRandomNote}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-stone-950 font-bold text-xs shadow-xs transition cursor-pointer min-h-[44px] flex items-center justify-center"
              >
                Pull First Sunshine Note ✨
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Saved Favorites Modal Portaled to document.body */}
      {showFavoritesModal && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-rose-950/45 backdrop-blur-sm overflow-y-auto animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowFavoritesModal(false);
          }}
        >
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-pink-100 animate-scaleUp max-h-[85dvh] flex flex-col relative my-auto">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-pink-100">
              <h3 className="font-playfair text-xl font-bold text-stone-900 flex items-center gap-2">
                <Heart size={18} className="fill-rose-500 text-rose-500" />
                <span>Saved Sunshine Notes ({favorites.length})</span>
              </h3>
              <button
                onClick={() => setShowFavoritesModal(false)}
                className="text-stone-400 hover:text-stone-700 p-1 rounded-full cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="overflow-y-auto space-y-3 pr-1 flex-1">
              {favorites.map((note, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-left">
                  <p className="font-handwritten text-xl text-stone-900 font-semibold leading-relaxed">
                    "{note.replace(/Tashmi|TASHMI/g, visitorName)}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
