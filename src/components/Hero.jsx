import React from 'react';
import { Sparkles, Moon, Star, Heart, ArrowDown, Mail } from 'lucide-react';
import { sound } from '../utils/soundEngine';

export default function Hero({
  visitorName = 'TASHMI',
  onStartJourney,
  onOpenLetter,
  hasReadLetter = false
}) {
  const handleStart = () => {
    sound.init();
    sound.playSparkle();
    if (onStartJourney) onStartJourney();
    const moodSection = document.getElementById('mood-selection');
    if (moodSection) {
      moodSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenLetterClick = () => {
    sound.init();
    sound.playSparkle();
    if (onOpenLetter) onOpenLetter();
  };

  return (
    <section id="hero" className="relative min-h-[82vh] flex flex-col items-center justify-center text-center px-4 pt-8 pb-16 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-12 left-10 text-pink-300/60 animate-float-slow hidden md:block">
        <Moon size={44} className="fill-pink-200/50" />
      </div>
      <div className="absolute top-24 right-16 text-amber-300 animate-twinkle">
        <Star size={26} className="fill-amber-200" />
      </div>
      <div className="absolute bottom-28 left-1/6 text-purple-300/70 animate-twinkle delay-1000 hidden md:block">
        <Star size={20} className="fill-purple-200" />
      </div>
      <div className="absolute top-1/3 right-1/4 text-pink-400/60 animate-float-gentle hidden sm:block">
        <Heart size={22} className="fill-pink-200" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        {/* Animated Sleeping Kitten on Cloud */}
        <div className="relative mb-5 cursor-pointer group" onClick={() => sound.playPurr(2)}>
          <div className="relative w-68 h-36 md:w-80 md:h-40 flex items-center justify-center">
            <svg
              className="absolute inset-0 w-full h-full drop-shadow-xl animate-float-slow"
              viewBox="0 0 320 180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M80 150C55 150 35 130 35 105C35 83 50 65 72 61C78 35 102 15 130 15C152 15 171 27 181 45C190 38 202 34 215 34C240 34 260 54 260 79C278 81 292 96 292 115C292 134 276 150 257 150H80Z"
                fill="url(#heroCloudGrad)"
              />
              <defs>
                <linearGradient id="heroCloudGrad" x1="40" y1="20" x2="290" y2="160" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FFFFFF" />
                  <stop offset="0.6" stopColor="#FFF0F7" />
                  <stop offset="1" stopColor="#E9E2FE" />
                </linearGradient>
              </defs>
            </svg>

            {/* Kawaii Kitten */}
            <div className="relative z-10 transform -translate-y-2 group-hover:scale-105 transition-transform duration-300">
              <svg width="145" height="105" viewBox="0 0 160 120" fill="none">
                <path
                  d="M130 90C145 85 152 70 148 55C145 48 138 48 136 54C134 60 138 72 126 80"
                  stroke="#F6B894"
                  strokeWidth="8"
                  strokeLinecap="round"
                  className="animate-tail origin-bottom-right"
                />
                <ellipse cx="80" cy="75" rx="50" ry="32" fill="#FCE9DD" />
                <ellipse cx="65" cy="65" rx="18" ry="12" fill="#F8C9AA" />
                <ellipse cx="100" cy="70" rx="14" ry="10" fill="#F8C9AA" />
                <circle cx="50" cy="55" r="28" fill="#FCE9DD" />
                <path d="M40 30 Q50 45 60 30" fill="#F8C9AA" />
                <polygon points="32,40 38,18 48,34" fill="#F8C9AA" />
                <polygon points="35,38 39,24 45,34" fill="#FFAEC9" />
                <polygon points="56,34 68,20 72,40" fill="#F8C9AA" />
                <polygon points="58,35 66,25 70,39" fill="#FFAEC9" />
                <path d="M38 56 Q43 62 48 56" stroke="#6C4A42" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M54 56 Q59 62 64 56" stroke="#6C4A42" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <polygon points="50,62 48,65 52,65" fill="#FF8BA7" />
                <path d="M50 65 L50 67 Q47 70 44 68 M50 67 Q53 70 56 68" stroke="#6C4A42" strokeWidth="1.8" strokeLinecap="round" />
                <circle cx="35" cy="62" r="5" fill="#FF9EAA" opacity="0.6" />
                <circle cx="67" cy="62" r="5" fill="#FF9EAA" opacity="0.6" />
                <ellipse cx="44" cy="90" rx="9" ry="7" fill="#FFF2E8" />
                <ellipse cx="62" cy="90" rx="9" ry="7" fill="#FFF2E8" />
              </svg>

              <div className="absolute -top-3 right-4 font-handwritten text-purple-500 font-bold text-lg select-none">
                <span className="inline-block animate-bounce opacity-80">z</span>
                <span className="inline-block animate-bounce delay-300 opacity-90 text-xl ml-1">z</span>
                <span className="inline-block animate-bounce delay-700 opacity-100 text-2xl ml-1">Z</span>
              </div>
            </div>
          </div>
          <div className="text-xs text-pink-600 font-bold mt-1">
            (click the sleepy kitten to hear a purr)
          </div>
        </div>

        {/* Heading */}
        <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-extrabold text-stone-900 tracking-tight leading-tight mb-3">
          Hey{' '}
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600">
            {visitorName}!
            <span className="absolute -top-4 -right-6 text-2xl animate-twinkle">✨</span>
          </span>{' '}
          🐱
        </h1>

        {/* Subtitle */}
        <p className="font-poppins text-base sm:text-lg md:text-xl text-stone-700 max-w-xl mx-auto font-medium leading-relaxed mb-6">
          Welcome to your little corner of happiness. Leave your worries outside for a little while.
        </p>

        {/* Messenger Kitten Sealed Letter Teaser Card */}
        <div
          onClick={handleOpenLetterClick}
          className="w-full max-w-lg mb-6 p-4 sm:p-5 rounded-3xl glass-panel border-2 border-rose-200/90 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group relative overflow-hidden"
          title={`Click to read the sealed handwritten letter for ${visitorName}`}
        >
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-rose-100/40 via-pink-100/50 to-purple-100/40 opacity-70 group-hover:opacity-100 transition-opacity" />

          <div className="relative z-10 flex items-center gap-3.5 sm:gap-4">
            {/* Mini Envelope Icon with Wax Stamp */}
            <div className="relative w-13 h-13 sm:w-15 sm:h-15 flex-shrink-0 flex items-center justify-center rounded-2xl bg-gradient-to-br from-rose-100 to-pink-200 border border-rose-300 shadow-inner group-hover:scale-105 transition-transform">
              <Mail size={24} className="text-rose-600" />
              <span className="absolute -top-1 -right-1 text-xs">🐾</span>
              <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-rose-600 border border-white shadow-2xs flex items-center justify-center text-[7px] text-white font-bold">♥</span>
            </div>

            {/* Text description */}
            <div className="text-left flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-playfair text-base sm:text-lg font-bold text-stone-900 group-hover:text-rose-600 transition-colors">
                  Special Letter for {visitorName} 💌
                </span>
                {!hasReadLetter && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-rose-500 text-white animate-pulse">
                    New
                  </span>
                )}
              </div>
              <p className="text-stone-600 text-xs sm:text-sm font-medium line-clamp-1 sm:line-clamp-none">
                A wax-sealed note penned just to bring you peace and warmth today.
              </p>
            </div>

            {/* Call to action badge */}
            <div className="hidden xs:flex flex-shrink-0 items-center justify-center px-3.5 py-1.5 rounded-full bg-rose-500 group-hover:bg-rose-600 text-white text-xs font-bold transition-all shadow-xs">
              <span>Read ✨</span>
            </div>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5">
          {/* Primary CTA: Open Sealed Letter */}
          <button
            onClick={handleOpenLetterClick}
            className="group relative px-7 py-3 rounded-full font-bold text-white bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 hover:opacity-95 shadow-md shadow-rose-300/40 transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2.5 text-sm sm:text-base cursor-pointer min-h-[44px] w-full sm:w-auto"
          >
            <Mail size={17} className="group-hover:rotate-12 transition-transform" />
            <span>Open Your Sealed Letter ✨</span>
          </button>

          {/* Secondary CTA: Explore Cat Café */}
          <button
            onClick={handleStart}
            className="px-6 py-3 rounded-full font-bold text-stone-700 bg-white hover:bg-rose-50 border border-rose-200/80 shadow-xs hover:shadow-sm transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer min-h-[44px] w-full sm:w-auto"
          >
            <Sparkles size={16} className="text-rose-500" />
            <span>Visit the Cat Café 🐾</span>
          </button>
        </div>

        {/* Scroll prompt */}
        <button
          onClick={() => {
            const mood = document.getElementById('mood-selection');
            if (mood) mood.scrollIntoView({ behavior: 'smooth' });
          }}
          className="mt-8 text-stone-600 hover:text-pink-600 flex flex-col items-center gap-1 transition-colors text-xs font-semibold cursor-pointer"
        >
          <span>how are you feeling today?</span>
          <ArrowDown size={14} className="animate-bounce" />
        </button>
      </div>
    </section>
  );
}
