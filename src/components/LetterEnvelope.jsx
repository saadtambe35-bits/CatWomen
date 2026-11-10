import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import confetti from 'canvas-confetti';
import { Mail, Sparkles, Heart, X, Check, Copy, ChevronDown, ChevronUp, Lock } from 'lucide-react';
import { sound } from '../utils/soundEngine';

export default function LetterEnvelope({
  isOpen = false,
  onClose,
  visitorName = 'TASHMI',
  unlockedGoldenTreat = false
}) {
  const [isUnsealed, setIsUnsealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isPsExpanded, setIsPsExpanded] = useState(true);

  // Reset to sealed state whenever the modal is freshly reopened so the reveal experience can be enjoyed again
  useEffect(() => {
    if (isOpen) {
      setIsUnsealed(false);
      setCopied(false);
    }
  }, [isOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && onClose) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBreakSeal = () => {
    sound.init();
    sound.playSparkle();
    sound.playBloom();
    setIsUnsealed(true);

    try {
      confetti({
        particleCount: 85,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFB6C1', '#FF69B4', '#FFD166', '#CDB4DB', '#FFF0F5']
      });
    } catch {}
  };

  const handleClose = () => {
    sound.init();
    sound.playSparkle();
    if (onClose) onClose();
  };

  const letterText = `Hey ${visitorName},

I don't know everything you're going through, and I won't pretend that a few words can make everything better.

But I hope this little website brought even the tiniest smile to your face.

You don't have to be strong every moment. You don't have to pretend everything is fine. Take your time, breathe, rest and give yourself the kindness you give to others.

And whenever life feels a little too overwhelming, remember that even the darkest skies eventually make room for sunshine.

Keep smiling, little human. You deserve beautiful days too. 🌷

Sending you a virtual cat hug! 🐈💕

Forever in your corner,
by loving batman 🦇✨`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(letterText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return typeof document !== 'undefined' ? createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-rose-950/45 backdrop-blur-md overflow-y-auto animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      {!isUnsealed ? (
        /* ================= STEP 1: SEALED ENVELOPE & MESSENGER KITTEN ================= */
        <div className="relative bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border-4 border-rose-100 text-center animate-scaleUp my-auto max-h-[85dvh] overflow-y-auto">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-rose-50 transition cursor-pointer"
            title="Close envelope"
          >
            <X size={18} />
          </button>

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100 text-rose-900 text-xs font-bold uppercase tracking-wider mb-3 border border-rose-200">
            <Mail size={13} className="text-rose-600" />
            <span>Special Delivery for {visitorName}</span>
          </div>

          <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
            A Sealed Letter Has Arrived 💌
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm max-w-sm mx-auto font-medium leading-relaxed mb-4">
            A tiny messenger kitten traveled across soft clouds with a wax-sealed envelope addressed only to you.
          </p>

          {/* Kitten & Envelope Illustration */}
          <div
            onClick={handleBreakSeal}
            className="relative cursor-pointer group select-none transition-transform duration-300 hover:scale-105 my-2 flex flex-col items-center"
            title="Click to break the wax seal and read the letter!"
          >
            <div className="absolute inset-0 bg-rose-300/25 rounded-full blur-2xl group-hover:bg-rose-400/35 transition-colors" />

            <div className="relative z-10 w-60 h-60 sm:w-68 sm:h-68 flex items-center justify-center animate-float-slow">
              <svg
                className="w-full h-full drop-shadow-xl"
                viewBox="0 0 240 240"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Fluffy clouds behind */}
                <path
                  d="M50 90 C30 70 20 100 45 110 C25 115 35 135 60 120"
                  fill="#FFF0F5"
                  stroke="#FFD6E0"
                  strokeWidth="2"
                  opacity="0.9"
                />
                <path
                  d="M190 90 C210 70 220 100 195 110 C215 115 205 135 180 120"
                  fill="#FFF0F5"
                  stroke="#FFD6E0"
                  strokeWidth="2"
                  opacity="0.9"
                />

                {/* Kitten Ears */}
                <polygon points="85,60 92,30 110,50" fill="#FCE9DD" stroke="#F6B894" strokeWidth="2" />
                <polygon points="90,56 94,36 104,50" fill="#FFAEC9" />
                <polygon points="130,50 148,30 155,60" fill="#FCE9DD" stroke="#F6B894" strokeWidth="2" />
                <polygon points="136,50 146,36 150,56" fill="#FFAEC9" />

                {/* Kitten Head */}
                <circle cx="120" cy="72" r="32" fill="#FCE9DD" stroke="#F6B894" strokeWidth="2" />

                {/* Sleepy eyes */}
                <path d="M106 72 Q112 78 118 72" stroke="#6C4A42" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M122 72 Q128 78 134 72" stroke="#6C4A42" strokeWidth="2.5" strokeLinecap="round" />

                {/* Nose & Mouth */}
                <polygon points="120,78 118,81 122,81" fill="#FF8BA7" />
                <path d="M120 81 L120 83 Q117 86 114 84 M120 83 Q123 86 126 84" stroke="#6C4A42" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="102" cy="78" r="5" fill="#FF9EAA" opacity="0.6" />
                <circle cx="138" cy="78" r="5" fill="#FF9EAA" opacity="0.6" />

                {/* Envelope Body */}
                <g transform="translate(30, 95)">
                  <rect x="0" y="0" width="180" height="115" rx="12" fill="#FFF9FA" stroke="#F3C4D7" strokeWidth="3" />
                  <path d="M0 0 L90 65 L180 0" stroke="#F3C4D7" strokeWidth="2.5" fill="#FFF0F5" />
                  <path d="M0 115 L70 52" stroke="#FCE2EB" strokeWidth="2" />
                  <path d="M180 115 L110 52" stroke="#FCE2EB" strokeWidth="2" />

                  {/* Red Wax Seal */}
                  <circle cx="90" cy="65" r="20" fill="#E63946" stroke="#D90429" strokeWidth="2.5" className="group-hover:scale-110 origin-center transition-transform" />
                  <path
                    d="M90 73 C90 73 82 68 82 62 C82 58 85 56 88 58 C90 60 90 60 90 60 C90 60 90 60 92 58 C95 56 98 58 98 62 C98 68 90 73 90 73 Z"
                    fill="#FFF0F5"
                  />

                  {/* Stamp */}
                  <rect x="142" y="12" width="26" height="32" rx="3" fill="#FFF0F5" stroke="#FFCCD5" strokeWidth="1.5" />
                  <text x="155" y="32" fontSize="16" textAnchor="middle">🐾</text>

                  {/* To: Label */}
                  <text x="35" y="92" fontSize="13" fontFamily="'Caveat', cursive" fontWeight="bold" fill="#BC6C25">
                    To: Dearest {visitorName} 🌸
                  </text>
                </g>

                {/* Kitten Paws clutching envelope */}
                <ellipse cx="65" cy="115" rx="10" ry="8" fill="#FFF2E8" stroke="#F6B894" strokeWidth="1.5" />
                <ellipse cx="175" cy="115" rx="10" ry="8" fill="#FFF2E8" stroke="#F6B894" strokeWidth="1.5" />
              </svg>
            </div>

            {/* Break Seal Action Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleBreakSeal();
              }}
              className="mt-2 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 hover:opacity-95 text-white font-bold text-sm shadow-md shadow-pink-200 transition transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Sparkles size={16} />
              <span>Tap Seal to Break & Read ✨</span>
            </button>
          </div>
        </div>
      ) : (
        /* ================= STEP 2: UNFOLDED STATIONERY LETTER ================= */
        <div className="relative bg-[#FFFDF9] rounded-3xl p-6 sm:p-10 max-w-xl w-full shadow-2xl border-4 border-rose-100 my-auto animate-scaleUp text-left max-h-[85dvh] overflow-y-auto">
          {/* Subtle Watermark Paw */}
          <div className="absolute top-10 right-10 text-8xl text-pink-100/35 select-none pointer-events-none font-sans">
            🐾
          </div>

          {/* Modal Header */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-rose-100">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-600 uppercase tracking-wider">
              <Heart size={14} className="fill-rose-500 text-rose-500" />
              <span>A Handwritten Note For You</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={copyToClipboard}
                className="p-2 rounded-full hover:bg-rose-50 text-stone-500 hover:text-rose-600 transition cursor-pointer"
                title="Copy letter text"
              >
                {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
              </button>
              <button
                onClick={handleClose}
                className="p-2 rounded-full hover:bg-rose-50 text-stone-400 hover:text-stone-700 transition cursor-pointer"
                title="Close"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Letter Body */}
          <div className="space-y-4 font-handwritten text-xl sm:text-2xl text-stone-900 leading-relaxed font-semibold">
            <p>Hey {visitorName},</p>

            <p>
              I don't know everything you're going through, and I won't pretend that a few words can make everything better.
            </p>

            <p>
              But I hope this little website brought even the tiniest smile to your face.
            </p>

            <p>
              You don't have to be strong every moment. You don't have to pretend everything is fine. Take your time, breathe, rest and give yourself the kindness you give to others.
            </p>

            <p>
              And whenever life feels a little too overwhelming, remember that even the darkest skies eventually make room for sunshine.
            </p>

            <p>
              Keep smiling, little human. You deserve beautiful days too. 🌷
            </p>

            <p className="flex items-center gap-2 text-rose-900">
              <span>Sending you a virtual cat hug!</span>
              <span>🐈💕</span>
            </p>

            <div className="pt-4 text-right">
              <p className="text-stone-700 font-semibold text-lg font-handwritten">Forever in your corner,</p>
              <p className="text-rose-700 font-bold text-2xl font-handwritten mt-0.5">by loving batman 🦇✨</p>
            </div>
          </div>

          {/* Secret P.S. (Unlocked via Fish Catcher Game) */}
          {unlockedGoldenTreat ? (
            <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/90 shadow-xs">
              <button
                onClick={() => setIsPsExpanded(!isPsExpanded)}
                className="w-full flex items-center justify-between text-left cursor-pointer"
              >
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                  <span className="text-base">🐟</span>
                  <span>Secret P.S. (Unlocked by catching 10 fish! ✨)</span>
                </div>
                {isPsExpanded ? (
                  <ChevronUp size={16} className="text-amber-700" />
                ) : (
                  <ChevronDown size={16} className="text-amber-700" />
                )}
              </button>

              {isPsExpanded && (
                <div className="mt-3 pt-3 border-t border-amber-200/60 font-handwritten text-lg sm:text-xl text-stone-800 leading-relaxed font-semibold">
                  <p>
                    "P.S. The café kitties whispered that you're an absolute legend at catching fish! They want you to know that your gentleness, patience, and kind heart never go unnoticed. Don't forget to visit the Cat Café to feed them their Golden Salmon treat! 🐾✨"
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="mt-6 p-3 rounded-2xl bg-pink-50/70 border border-pink-200/60 flex items-center justify-between text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <Lock size={13} className="text-rose-500" />
                <span>A secret P.S. is tucked behind the wax seal...</span>
              </div>
              <span className="font-semibold text-rose-600">Catch 10 fish in Cat Café to unlock! 🐟</span>
            </div>
          )}

          {/* Modal Footer */}
          <div className="mt-8 pt-4 border-t border-rose-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-stone-600 font-semibold text-center sm:text-left">
              Keep this sanctuary whenever you need a safe place.
            </span>
            <button
              onClick={handleClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-rose-100 hover:bg-rose-200 text-rose-900 font-bold text-xs transition cursor-pointer text-center shadow-2xs"
            >
              Fold Letter & Keep Safe 🌸
            </button>
          </div>
        </div>
      )}
    </div>,
    document.body
  ) : null;
}
