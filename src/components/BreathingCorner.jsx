import React, { useState, useEffect } from 'react';
import { Wind, Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { sound } from '../utils/soundEngine';

export default function BreathingCorner({ visitorName, isDarkRoom = false }) {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState('in'); // 'in' (4s) | 'hold' (4s) | 'out' (6s)
  const [countdown, setCountdown] = useState(4);
  const [completedBreaths, setCompletedBreaths] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // 4-4-6 Breathing Cycle
  useEffect(() => {
    if (!isActive) return;

    let timer;
    if (countdown > 1) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else {
      // Transition between phases
      if (phase === 'in') {
        setPhase('hold');
        setCountdown(4);
        if (soundEnabled) sound.playBreathingChime('hold');
      } else if (phase === 'hold') {
        setPhase('out');
        setCountdown(6);
        if (soundEnabled) sound.playBreathingChime('out');
      } else if (phase === 'out') {
        setPhase('in');
        setCountdown(4);
        setCompletedBreaths((prev) => prev + 1);
        if (soundEnabled) sound.playBreathingChime('in');
      }
    }

    return () => clearTimeout(timer);
  }, [isActive, phase, countdown, soundEnabled]);

  const toggleSession = () => {
    sound.init();
    if (!isActive) {
      setIsActive(true);
      setPhase('in');
      setCountdown(4);
      if (soundEnabled) sound.playBreathingChime('in');
    } else {
      setIsActive(false);
    }
  };

  const resetSession = () => {
    setIsActive(false);
    setPhase('in');
    setCountdown(4);
    setCompletedBreaths(0);
  };

  // Phase details
  const phaseInfo = {
    in: {
      label: 'Breathe In Slowly...',
      instruction: 'Fill your chest with calm and quiet peace.',
      scale: 'scale-125 md:scale-135',
      petalExpand: 'scale-110',
      glow: isDarkRoom ? 'shadow-indigo-500/50 shadow-2xl' : 'shadow-pink-300/60 shadow-2xl'
    },
    hold: {
      label: 'Gently Hold...',
      instruction: 'Rest in this stillness. You are completely safe here.',
      scale: 'scale-125 md:scale-135',
      petalExpand: 'scale-110',
      glow: isDarkRoom ? 'shadow-purple-500/50 shadow-2xl' : 'shadow-purple-300/60 shadow-2xl'
    },
    out: {
      label: 'Breathe Out Completely...',
      instruction: 'Let all the tension and noise melt away into the quiet.',
      scale: 'scale-90',
      petalExpand: 'scale-90',
      glow: isDarkRoom ? 'shadow-cyan-500/30 shadow-lg' : 'shadow-teal-300/40 shadow-lg'
    }
  };

  const current = phaseInfo[phase];

  return (
    <section id="breathing-corner" className="py-12 px-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3 ${
          isDarkRoom
            ? 'bg-indigo-900/70 text-indigo-200 border border-indigo-700/60'
            : 'bg-purple-100 text-purple-900 border border-purple-200'
        }`}>
          <Wind size={13} className="text-purple-400" />
          4-4-6 Calming Rhythm
        </div>
        <h2 className={`font-playfair text-3xl sm:text-4xl font-bold mb-3 ${
          isDarkRoom ? 'text-indigo-100' : 'text-stone-900'
        }`}>
          Breathing & Relaxation Corner
        </h2>
        <p className={`text-sm sm:text-base max-w-md mx-auto leading-relaxed ${
          isDarkRoom ? 'text-indigo-200/80' : 'text-stone-700'
        }`}>
          Synchronize your breath with the expanding flower. 4 seconds in, 4 seconds hold, 6 seconds out. There is nowhere else you need to be.
        </p>
      </div>

      <div className={`rounded-3xl p-8 sm:p-12 border transition-all duration-500 flex flex-col items-center relative overflow-hidden ${
        isDarkRoom
          ? 'glass-panel-dark border-indigo-800/60'
          : 'glass-panel border-pink-200/90'
      }`}>
        {/* Soft Background Pulse */}
        <div className={`absolute inset-0 pointer-events-none ${
          isDarkRoom
            ? 'bg-gradient-to-b from-indigo-950/40 via-purple-950/20 to-slate-950/50'
            : 'bg-gradient-to-b from-purple-50/40 via-pink-50/30 to-blue-50/40'
        }`} />

        {/* Counter of completed breaths */}
        <div className={`relative z-10 flex items-center gap-2 mb-6 text-xs font-bold px-4 py-1.5 rounded-full ${
          isDarkRoom
            ? 'bg-indigo-900/80 text-indigo-200 border border-indigo-700/50'
            : 'bg-purple-100 text-purple-900'
        }`}>
          <Sparkles size={13} className="text-amber-400" />
          <span>{completedBreaths} peaceful breaths completed</span>
        </div>

        {/* Animated Expanding/Contracting Breathing Flower */}
        <div className="relative z-10 my-6 flex items-center justify-center w-64 h-64 sm:w-80 sm:h-80">
          {/* Halo Glow */}
          <div
            className={`absolute inset-0 rounded-full transition-all duration-1000 ${
              isActive ? current.glow : 'shadow-none'
            } ${
              isDarkRoom
                ? 'bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-2xl'
                : 'bg-gradient-to-r from-pink-200/50 via-purple-200/50 to-blue-200/50 blur-xl opacity-60'
            }`}
          />

          {/* Flower Visual SVG */}
          <div
            className={`relative transition-all duration-1000 transform ${
              isActive ? current.scale : 'scale-100'
            }`}
          >
            <svg
              width="240"
              height="240"
              viewBox="0 0 240 240"
              className="drop-shadow-lg"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer soft petals */}
              <g className="opacity-75">
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
                  <ellipse
                    key={i}
                    cx="120"
                    cy="60"
                    rx="28"
                    ry="50"
                    fill={i % 2 === 0 ? (isDarkRoom ? '#A78BFA' : '#FFD6E0') : (isDarkRoom ? '#C084FC' : '#E8D7F1')}
                    transform={`rotate(${deg} 120 120)`}
                  />
                ))}
              </g>

              {/* Inner Petals */}
              <g className="opacity-85">
                {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((deg, i) => (
                  <ellipse
                    key={i}
                    cx="120"
                    cy="72"
                    rx="22"
                    ry="38"
                    fill={i % 2 === 0 ? (isDarkRoom ? '#DDD6FE' : '#FFE5EC') : (isDarkRoom ? '#818CF8' : '#D8E2DC')}
                    transform={`rotate(${deg} 120 120)`}
                  />
                ))}
              </g>

              {/* Center Glowing Core */}
              <circle
                cx="120"
                cy="120"
                r="48"
                fill={isDarkRoom ? '#1E1B4B' : '#FFF0F5'}
                stroke={isDarkRoom ? '#818CF8' : '#F3C4D7'}
                strokeWidth="3"
              />
              <circle
                cx="120"
                cy="120"
                r="38"
                fill={isDarkRoom ? '#312E81' : '#FFF9FB'}
              />
            </svg>

            {/* Center Text (Countdown & Phase) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none">
              <span className={`font-playfair text-4xl sm:text-5xl font-extrabold leading-none ${
                isDarkRoom ? 'text-amber-200' : 'text-stone-900'
              }`}>
                {isActive ? countdown : '🌸'}
              </span>
              <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest mt-1 ${
                isDarkRoom ? 'text-indigo-300' : 'text-pink-600'
              }`}>
                {isActive ? (phase === 'in' ? 'Inhale' : phase === 'hold' ? 'Hold' : 'Exhale') : 'Relax'}
              </span>
            </div>
          </div>
        </div>

        {/* Phase Instruction & Cue */}
        <div className="relative z-10 text-center max-w-sm mb-6">
          <h3 className={`font-playfair text-xl sm:text-2xl font-bold mb-1 ${
            isDarkRoom ? 'text-indigo-100' : 'text-stone-900'
          }`}>
            {isActive ? current.label : 'Take a Soft Moment for Yourself'}
          </h3>
          <p className={`text-xs sm:text-sm font-medium ${
            isDarkRoom ? 'text-indigo-200/80' : 'text-stone-600'
          }`}>
            {isActive
              ? current.instruction
              : `Whenever you feel stressed, ${visitorName}, let this gentle flower guide your breathing.`}
          </p>
        </div>

        {/* Action Controls */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={toggleSession}
            className={`flex items-center gap-2 px-7 py-3 rounded-full font-bold text-sm shadow-md transition transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer min-h-[44px] ${
              isActive
                ? isDarkRoom
                  ? 'bg-indigo-800 hover:bg-indigo-700 text-white border border-indigo-600'
                  : 'bg-purple-200 hover:bg-purple-300 text-purple-900'
                : 'bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 hover:opacity-95 text-white'
            }`}
          >
            {isActive ? <Pause size={16} /> : <Play size={16} className="fill-white" />}
            <span>{isActive ? 'Pause' : 'Start 4-4-6 Breathing'}</span>
          </button>

          {isActive && (
            <button
              onClick={resetSession}
              className={`p-3 rounded-full border transition shadow-xs cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center ${
                isDarkRoom
                  ? 'bg-indigo-950/80 text-indigo-300 border-indigo-800 hover:text-white hover:bg-indigo-900'
                  : 'bg-white text-stone-600 hover:text-stone-900 border-pink-200'
              }`}
              title="Reset session"
            >
              <RotateCcw size={16} />
            </button>
          )}

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-3 rounded-full border transition shadow-xs cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center ${
              soundEnabled
                ? isDarkRoom
                  ? 'bg-indigo-900 text-indigo-200 border-indigo-700'
                  : 'bg-pink-100 border-pink-300 text-pink-700'
                : isDarkRoom
                ? 'bg-slate-900 text-indigo-400/60 border-indigo-900'
                : 'bg-white border-pink-200 text-stone-400'
            }`}
            title={soundEnabled ? 'Mute breath chime' : 'Enable breath chime'}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
        </div>
      </div>
    </section>
  );
}
