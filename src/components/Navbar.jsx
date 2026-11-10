import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Sofa,
  Coffee,
  Moon,
  Flower2,
  Music,
  CloudRain,
  Volume2,
  VolumeX,
  Sparkles,
  Edit3
} from 'lucide-react';
import { sound } from '../utils/soundEngine';

export default function Navbar({
  visitorName = 'TASHMI',
  setVisitorName,
  activeRoom,
  setActiveRoom,
  unlockedGoldenTreat,
  isMusicPlaying,
  setIsMusicPlaying,
  isMuted,
  setIsMuted,
  petalsEnabled,
  setPetalsEnabled
}) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(visitorName);
  const [isRainPlaying, setIsRainPlaying] = useState(false);

  const isCalmRoom = activeRoom === 'calm';

  const rooms = [
    { id: 'lounge', label: 'Cozy Lounge', shortLabel: 'Lounge', icon: Sofa },
    {
      id: 'cafe',
      label: 'Cat Café & Play',
      shortLabel: 'Cat Café',
      icon: Coffee,
      hasBadge: unlockedGoldenTreat
    },
    { id: 'calm', label: 'Starlight Calm', shortLabel: 'Calm', icon: Moon },
    { id: 'keepsakes', label: 'Garden & Keepsakes', shortLabel: 'Keepsakes', icon: Flower2 }
  ];

  const toggleMusic = () => {
    sound.init();
    if (isMusicPlaying) {
      sound.stopBgm();
      setIsMusicPlaying(false);
    } else {
      sound.startBgm();
      setIsMusicPlaying(true);
    }
  };

  const toggleMute = () => {
    sound.init();
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    sound.setMuted(newMuted);
  };

  const toggleRain = () => {
    sound.init();
    const next = !isRainPlaying;
    setIsRainPlaying(next);
    sound.toggleRain(next);
  };

  const handleNameSave = (e) => {
    e.preventDefault();
    if (tempName.trim()) {
      setVisitorName(tempName.trim());
    }
    setIsEditingName(false);
  };

  return (
    <>
      {/* Top Header Bar */}
      <header
        className={`sticky top-0 z-40 w-full transition-colors duration-500 backdrop-blur-md border-b ${
          isCalmRoom
            ? 'bg-slate-950/80 border-indigo-900/40 text-indigo-100'
            : 'bg-white/85 border-pink-100/90 text-stone-800'
        }`}
      >
        <div className="max-w-6xl mx-auto px-3 sm:px-4 h-14 md:h-16 flex items-center justify-between gap-3">
          {/* Sanctuary Brand & Name Personalization (Left) - Displays cleanly without truncating */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => setActiveRoom('lounge')}
              className="group flex items-center gap-2 text-left focus:outline-none cursor-pointer"
            >
              <span
                className={`text-base sm:text-xl p-1.5 rounded-2xl transition-transform group-hover:scale-110 shadow-xs flex-shrink-0 ${
                  isCalmRoom ? 'bg-indigo-900/60 border border-indigo-700/50' : 'bg-pink-100/80'
                }`}
              >
                🐾
              </span>
              <div>
                <span
                  className={`font-playfair text-sm sm:text-base md:text-lg font-bold block whitespace-nowrap ${
                    isCalmRoom
                      ? 'bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 bg-clip-text text-transparent'
                      : 'bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent'
                  }`}
                >
                  {visitorName}'s Sanctuary
                </span>
                <span
                  className={`hidden sm:block text-[10px] font-medium tracking-wide whitespace-nowrap ${
                    isCalmRoom ? 'text-indigo-400' : 'text-pink-600'
                  }`}
                >
                  your gentle corner of peace
                </span>
              </div>
            </button>

            {/* Edit Name Button */}
            <button
              onClick={() => {
                setTempName(visitorName);
                setIsEditingName(true);
              }}
              title="Personalize Name"
              className={`p-1.5 rounded-full transition-colors cursor-pointer flex-shrink-0 ${
                isCalmRoom
                  ? 'text-indigo-400 hover:text-indigo-200 hover:bg-indigo-900/50'
                  : 'text-pink-500 hover:text-pink-700 hover:bg-pink-100/80'
              }`}
            >
              <Edit3 size={13} />
            </button>
          </div>

          {/* Desktop Centered 4-Room Tabs as Rounded Pills (Center) */}
          <nav
            className={`hidden md:flex items-center gap-1.5 p-1 rounded-full border transition-colors duration-500 ${
              isCalmRoom ? 'bg-slate-900/70 border-indigo-900/50' : 'bg-pink-50/70 border-pink-100'
            }`}
          >
            {rooms.map((room) => {
              const Icon = room.icon;
              const isActive = activeRoom === room.id;
              return (
                <button
                  key={room.id}
                  onClick={() => setActiveRoom(room.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer min-h-[36px] ${
                    isActive
                      ? isCalmRoom
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/50'
                        : 'bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-md shadow-pink-200'
                      : isCalmRoom
                      ? 'text-indigo-300 hover:text-white hover:bg-indigo-950/60'
                      : 'text-stone-700 hover:text-pink-700 hover:bg-pink-100/60'
                  }`}
                >
                  <Icon size={14} />
                  <span>{room.label}</span>
                  {room.hasBadge && (
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping absolute -top-0.5 -right-0.5" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Section: Clean Audio Ambiance Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            {/* Background Music Box */}
            <button
              onClick={toggleMusic}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer min-h-[36px] ${
                isMusicPlaying
                  ? isCalmRoom
                    ? 'bg-indigo-500 text-white shadow-indigo-900 animate-pulse'
                    : 'bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-pink-200 animate-pulse-glow'
                  : isCalmRoom
                  ? 'bg-slate-900/80 text-indigo-300 border border-indigo-800/60 hover:bg-indigo-950'
                  : 'bg-white text-stone-700 border border-pink-200 hover:bg-pink-50'
              }`}
              title={isMusicPlaying ? 'Pause peaceful lullaby' : 'Play peaceful lullaby'}
            >
              <Music size={13} className={isMusicPlaying ? 'animate-bounce' : ''} />
              <span className="hidden sm:inline">{isMusicPlaying ? 'Music On' : 'Music'}</span>
            </button>

            {/* Cozy Rain */}
            <button
              onClick={toggleRain}
              className={`p-2 rounded-full border transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center ${
                isRainPlaying
                  ? isCalmRoom
                    ? 'bg-sky-600/90 border-sky-400 text-white shadow-sm'
                    : 'bg-sky-100 border-sky-300 text-sky-700'
                  : isCalmRoom
                  ? 'bg-slate-900/80 border-indigo-800/60 text-indigo-400 hover:text-indigo-200'
                  : 'bg-white border-pink-200 text-stone-600 hover:text-sky-600 hover:bg-pink-50'
              }`}
              title={isRainPlaying ? 'Stop cozy rain sound' : 'Turn on cozy rain sound'}
            >
              <CloudRain size={14} />
            </button>

            {/* Ambient Falling Particles (Sakura/Stars) Toggle */}
            {setPetalsEnabled && (
              <button
                onClick={() => setPetalsEnabled(!petalsEnabled)}
                className={`p-2 rounded-full border transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center ${
                  petalsEnabled
                    ? isCalmRoom
                      ? 'bg-indigo-900/90 text-indigo-200 border-indigo-700'
                      : 'bg-pink-100 text-pink-700 border-pink-300'
                    : isCalmRoom
                    ? 'bg-slate-900/80 border-indigo-800/60 text-indigo-400/50 hover:text-indigo-200'
                    : 'bg-white border-pink-200 text-stone-400 hover:text-pink-600'
                }`}
                title={petalsEnabled ? (isCalmRoom ? 'Disable stars' : 'Disable petals') : (isCalmRoom ? 'Enable stars' : 'Enable petals')}
              >
                <Sparkles size={14} />
              </button>
            )}

            {/* Sound FX Mute Toggle */}
            <button
              onClick={toggleMute}
              className={`p-2 rounded-full border transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center ${
                isCalmRoom
                  ? 'bg-slate-900/80 border-indigo-800/60 text-indigo-400 hover:text-indigo-200'
                  : 'bg-white border-pink-200 text-stone-600 hover:text-pink-600 hover:bg-pink-50'
              }`}
              title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
            >
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sticky Frosted-Glass Bottom Tab Bar (< md) */}
      <nav
        className={`md:hidden fixed bottom-0 inset-x-0 z-40 backdrop-blur-lg border-t pb-safe flex justify-around py-2 shadow-lg transition-colors duration-500 ${
          isCalmRoom
            ? 'bg-slate-950/85 border-indigo-900/50 text-indigo-200 shadow-indigo-950/80'
            : 'bg-white/85 border-rose-100 text-stone-700 shadow-rose-200/40'
        }`}
      >
        {rooms.map((room) => {
          const Icon = room.icon;
          const isActive = activeRoom === room.id;
          return (
            <button
              key={room.id}
              onClick={() => setActiveRoom(room.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl text-[11px] font-bold transition-all relative min-h-[44px] min-w-[64px] cursor-pointer ${
                isActive
                  ? isCalmRoom
                    ? 'text-indigo-200 bg-indigo-900/80 scale-105'
                    : 'text-rose-600 bg-pink-100/90 scale-105'
                  : isCalmRoom
                  ? 'text-indigo-400/80 hover:text-indigo-200'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Icon size={18} />
              <span className="mt-0.5 font-medium">{room.shortLabel}</span>
              {room.hasBadge && (
                <span className="w-2 h-2 rounded-full bg-amber-400 absolute top-1 right-3 animate-ping" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Name Customization Modal Portaled to document.body */}
      {isEditingName && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-rose-950/45 backdrop-blur-sm overflow-y-auto animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsEditingName(false);
          }}
        >
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-pink-100 transform transition-all animate-scaleUp relative my-auto max-h-[85dvh] overflow-y-auto">
            <div className="flex items-center gap-2 text-pink-600 mb-2">
              <Sparkles size={18} />
              <h3 className="font-playfair text-xl font-bold text-stone-900">Personalize Sanctuary</h3>
            </div>
            <p className="text-xs text-stone-600 mb-4">
              Enter her name so every cat dialogue, warm note, and letter speak directly to her.
            </p>
            <form onSubmit={handleNameSave}>
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                placeholder="e.g. TASHMI"
                maxLength={24}
                className="w-full px-4 py-2.5 rounded-2xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 text-stone-900 font-semibold mb-4 text-base"
                autoFocus
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditingName(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-500 hover:bg-stone-100 cursor-pointer min-h-[44px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-pink-500 to-rose-400 hover:opacity-90 shadow-xs cursor-pointer min-h-[44px]"
                >
                  Save Name
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
