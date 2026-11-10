import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import confetti from 'canvas-confetti';
import { RotateCcw, Award, ArrowLeft, ArrowRight, Play, Star, Gamepad2, Trophy } from 'lucide-react';
import { sound } from '../utils/soundEngine';

export default function FishCatcherGame({
  visitorName = 'TASHMI',
  fishHighScore = 0,
  recordFishScore = () => {},
  unlockedGoldenTreat = false
}) {
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [fishCount, setFishCount] = useState(0);
  const [showSecretModal, setShowSecretModal] = useState(false);

  // Game state ref to avoid React state lag in requestAnimationFrame
  const gameStateRef = useRef({
    basketX: 160,
    basketWidth: 72,
    items: [],
    score: 0,
    fishCaught: 0,
    lives: 3,
    lastSpawn: 0,
    speedMultiplier: 1,
    animationId: null
  });

  const startGame = () => {
    sound.init();
    sound.playSparkle();
    const canvas = canvasRef.current;
    if (!canvas) return;

    gameStateRef.current = {
      basketX: canvas.width / 2 - 36,
      basketWidth: 72,
      items: [],
      score: 0,
      fishCaught: 0,
      lives: 3,
      lastSpawn: Date.now(),
      speedMultiplier: 1,
      animationId: null
    };

    setScore(0);
    setFishCount(0);
    setIsPlaying(true);
  };

  const stopGame = () => {
    if (gameStateRef.current.animationId) {
      cancelAnimationFrame(gameStateRef.current.animationId);
    }
    setIsPlaying(false);
    if (recordFishScore) {
      recordFishScore(gameStateRef.current.score, gameStateRef.current.fishCaught);
    }
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isPlaying) return;
      const state = gameStateRef.current;
      const canvas = canvasRef.current;
      if (!canvas) return;

      if (e.key === 'ArrowLeft' || e.key === 'a') {
        state.basketX = Math.max(10, state.basketX - 25);
      } else if (e.key === 'ArrowRight' || e.key === 'd') {
        state.basketX = Math.min(canvas.width - state.basketWidth - 10, state.basketX + 25);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying]);

  // Touch, Mouse & Pointer tracking on canvas
  const handlePointerEvent = (e) => {
    if (!isPlaying) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : null);
    if (clientX === null) return;
    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const state = gameStateRef.current;
    state.basketX = Math.max(10, Math.min(canvas.width - state.basketWidth - 10, x - state.basketWidth / 2));
  };

  // Main Game Loop
  useEffect(() => {
    if (!isPlaying) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const loop = () => {
      const state = gameStateRef.current;
      const now = Date.now();

      // Clear Canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Soft Pastel Background
      ctx.fillStyle = '#FFF8FA';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Spawn falling items
      const spawnInterval = Math.max(700, 1400 - state.fishCaught * 35);
      if (now - state.lastSpawn > spawnInterval) {
        state.lastSpawn = now;
        const types = [
          { type: 'fish', emoji: '🐟', points: 1, speed: 2.2 },
          { type: 'fish', emoji: '🐠', points: 1, speed: 2.5 },
          { type: 'star', emoji: '⭐', points: 2, speed: 2.8 },
          { type: 'heart', emoji: '💖', points: 2, speed: 2.3 }
        ];
        const selected = types[Math.floor(Math.random() * types.length)];
        state.items.push({
          x: Math.random() * (canvas.width - 40) + 20,
          y: -20,
          type: selected.type,
          emoji: selected.emoji,
          points: selected.points,
          speed: (selected.speed + state.fishCaught * 0.08) * state.speedMultiplier,
          size: 26
        });
      }

      // Update & Draw items
      for (let i = state.items.length - 1; i >= 0; i--) {
        const item = state.items[i];
        item.y += item.speed;

        ctx.font = '24px serif';
        ctx.textAlign = 'center';
        ctx.fillText(item.emoji, item.x, item.y);

        // Check basket collision
        const basketY = canvas.height - 42;
        if (
          item.y >= basketY - 10 &&
          item.y <= basketY + 25 &&
          item.x >= state.basketX - 10 &&
          item.x <= state.basketX + state.basketWidth + 10
        ) {
          sound.playCatch();
          state.score += item.points * 10;
          state.fishCaught += 1;
          setScore(state.score);
          setFishCount(state.fishCaught);

          if (recordFishScore) {
            recordFishScore(state.score, state.fishCaught);
          }

          // Secret achievement check at 10 fish
          if (state.fishCaught === 10 && !unlockedGoldenTreat) {
            if (state.animationId) {
              cancelAnimationFrame(state.animationId);
            }
            setIsPlaying(false);
            setShowSecretModal(true);
            try {
              confetti({
                particleCount: 80,
                spread: 70,
                origin: { y: 0.6 }
              });
            } catch {}
          }

          state.items.splice(i, 1);
          continue;
        }

        // Missed item
        if (item.y > canvas.height + 25) {
          state.items.splice(i, 1);
        }
      }

      // Draw Kitten Basket at the bottom
      const bx = state.basketX;
      const by = canvas.height - 48;
      const bw = state.basketWidth;

      // Basket body
      ctx.fillStyle = '#FFB5A7';
      ctx.beginPath();
      ctx.roundRect(bx, by, bw, 32, [8, 8, 16, 16]);
      ctx.fill();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#FCD5CE';
      ctx.stroke();

      // Cute kitten ears on the basket
      ctx.fillStyle = '#FFB5A7';
      ctx.beginPath();
      ctx.moveTo(bx + 8, by);
      ctx.lineTo(bx + 16, by - 12);
      ctx.lineTo(bx + 24, by);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(bx + bw - 24, by);
      ctx.lineTo(bx + bw - 16, by - 12);
      ctx.lineTo(bx + bw - 8, by);
      ctx.fill();

      // Kitten basket face
      ctx.fillStyle = '#4A3B48';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('(=^･ω･^=)', bx + bw / 2, by + 20);

      state.animationId = requestAnimationFrame(loop);
    };

    gameStateRef.current.animationId = requestAnimationFrame(loop);

    return () => {
      if (gameStateRef.current.animationId) {
        cancelAnimationFrame(gameStateRef.current.animationId);
      }
    };
  }, [isPlaying, unlockedGoldenTreat, recordFishScore]);

  const activeHigh = Math.max(fishHighScore || 0, score || 0);

  return (
    <section id="mini-game" className="py-12 px-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 text-sky-900 text-xs font-bold uppercase tracking-wider mb-3 border border-sky-200">
          <Gamepad2 size={13} className="text-sky-600" />
          Playful Catch
        </div>
        <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-stone-900 mb-3">
          Catch the Fishies!
        </h2>
        <p className="text-stone-700 text-sm sm:text-base max-w-md mx-auto font-medium leading-relaxed">
          Help the little kitty catch yummy snacks and stars! Catch 10 fish to unlock the Golden Salmon Treat for the Cat Café.
        </p>
      </div>

      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-pink-200/90 shadow-xl flex flex-col items-center">
        {/* Score & Counters Bar */}
        <div className="w-full max-w-md flex items-center justify-between mb-4 px-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-pink-900 bg-pink-100 px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-2xs border border-pink-200">
              <Trophy size={13} className="text-pink-600" />
              Score: {score}
            </span>
            <span className="text-xs font-bold text-sky-900 bg-sky-100 px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-2xs border border-sky-200">
              🐟 {fishCount} / 10 Fish
            </span>
          </div>

          <div className="flex items-center gap-2">
            {activeHigh > 0 && (
              <span className="text-[11px] font-bold text-stone-600 bg-stone-100 px-2.5 py-1 rounded-xl">
                Best: {activeHigh}
              </span>
            )}

            {(unlockedGoldenTreat || fishCount >= 10) && (
              <button
                onClick={() => {
                  if (gameStateRef.current.animationId) {
                    cancelAnimationFrame(gameStateRef.current.animationId);
                  }
                  setIsPlaying(false);
                  setShowSecretModal(true);
                }}
                className="text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-2xs transition border border-amber-300 cursor-pointer"
              >
                <Award size={13} className="text-amber-600" /> Golden Treat Unlocked!
              </button>
            )}
          </div>
        </div>

        {/* Canvas Game Area */}
        <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden border-2 border-pink-200 shadow-inner bg-[#FFF8FA] touch-none select-none flex items-center justify-center">
          <canvas
            ref={canvasRef}
            width={380}
            height={285}
            onPointerDown={handlePointerEvent}
            onPointerMove={handlePointerEvent}
            onTouchMove={handlePointerEvent}
            className="cursor-ew-resize w-full h-full block touch-none select-none"
          />

          {!isPlaying && (
            <div className="absolute inset-0 bg-white/90 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center">
              <span className="text-4xl sm:text-5xl mb-2 sm:mb-3 animate-bounce select-none">🐱🧺</span>
              <h3 className="font-playfair text-lg sm:text-xl font-bold text-stone-900 mb-1">
                Ready to Catch Some Treats?
              </h3>
              <p className="text-xs text-stone-700 font-medium max-w-xs mb-4">
                Drag your finger, mouse, or use Arrow Keys (← / →) to guide the basket. Catch 10 fish to unlock the Golden Salmon!
              </p>
              <button
                onClick={startGame}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-sky-500 hover:opacity-95 text-white font-bold text-sm shadow-md transition transform hover:scale-105 cursor-pointer min-h-[44px]"
              >
                <Play size={15} className="fill-white" />
                <span>Start Playing</span>
              </button>
            </div>
          )}
        </div>

        {/* Controls Bar & Mobile Buttons */}
        <div className="w-full max-w-md mt-4 flex items-center justify-between gap-3">
          {isPlaying ? (
            <>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const s = gameStateRef.current;
                    s.basketX = Math.max(10, s.basketX - 35);
                  }}
                  className="flex items-center justify-center gap-1 px-4 py-2 bg-pink-100 hover:bg-pink-200 text-pink-900 rounded-xl text-xs font-bold transition cursor-pointer min-h-[44px] min-w-[70px]"
                >
                  <ArrowLeft size={14} /> Left
                </button>
                <button
                  onClick={() => {
                    const s = gameStateRef.current;
                    const c = canvasRef.current;
                    if (c) s.basketX = Math.min(c.width - s.basketWidth - 10, s.basketX + 35);
                  }}
                  className="flex items-center justify-center gap-1 px-4 py-2 bg-pink-100 hover:bg-pink-200 text-pink-900 rounded-xl text-xs font-bold transition cursor-pointer min-h-[44px] min-w-[70px]"
                >
                  Right <ArrowRight size={14} />
                </button>
              </div>

              <button
                onClick={stopGame}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100 transition cursor-pointer min-h-[44px]"
              >
                <RotateCcw size={13} /> Pause & Save
              </button>
            </>
          ) : (
            <div className="w-full text-center text-xs text-stone-600 font-medium">
              Tip: Catch golden stars ⭐ and hearts 💖 for double bonus points!
            </div>
          )}
        </div>
      </div>

      {/* Secret 10-Fish Unlock Modal Portaled to document.body */}
      {showSecretModal && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-rose-950/45 backdrop-blur-sm overflow-y-auto animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowSecretModal(false);
          }}
        >
          <div className="bg-gradient-to-br from-pink-50 via-white to-amber-50 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border-2 border-pink-200 animate-scaleUp text-center relative my-auto max-h-[85dvh] overflow-y-auto">
            <span className="text-5xl mb-2 block animate-bounce select-none">🏆🐱🍣</span>
            <span className="text-xs font-bold text-amber-800 uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
              Golden Salmon Unlocked!
            </span>

            <h3 className="font-playfair text-2xl font-bold text-stone-900 mt-3 mb-2">
              Meow-velous Job, {visitorName}!
            </h3>

            <div className="my-4 p-4 rounded-2xl bg-white/95 border border-pink-100 shadow-xs text-left">
              <p className="font-handwritten text-2xl text-stone-900 font-semibold leading-relaxed">
                "No matter how chaotic the world gets, you have a playful, brilliant spirit that brings so much light to everyone around you. Thank you for simply being you!"
              </p>
              <p className="mt-2 text-right font-handwritten text-xl font-bold text-rose-700">
                — by loving batman 🦇💖
              </p>
              <div className="mt-3 pt-3 border-t border-pink-100 text-xs font-bold text-amber-800 flex items-center gap-1.5">
                <Star size={14} className="fill-amber-500 text-amber-500 flex-shrink-0" />
                <span>Visit the Cat Café to feed the kittens their special Golden Salmon! 🍣✨</span>
              </div>
            </div>

            <button
              onClick={() => setShowSecretModal(false)}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 hover:opacity-95 text-white font-bold text-sm shadow-sm transition cursor-pointer"
            >
              Keep Playing & Smiling 💕
            </button>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
