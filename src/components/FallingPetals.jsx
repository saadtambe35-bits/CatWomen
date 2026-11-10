import React, { useEffect, useRef } from 'react';

export default function FallingPetals({ isEnabled = true, mode = 'petals' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isEnabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const isStars = mode === 'stars';
    const particleCount = Math.min(36, Math.floor(width / (isStars ? 35 : 40)));
    const particles = [];

    const petalColors = [
      'rgba(255, 182, 193, 0.65)',
      'rgba(255, 192, 203, 0.75)',
      'rgba(255, 218, 224, 0.7)',
      'rgba(230, 200, 240, 0.6)',
      'rgba(255, 230, 240, 0.8)',
    ];

    const starColors = [
      'rgba(255, 243, 176, 0.85)', // Golden starlight
      'rgba(255, 255, 255, 0.9)',  // Diamond white
      'rgba(216, 180, 254, 0.8)',  // Lavender twinkle
      'rgba(199, 210, 254, 0.75)', // Soft indigo
      'rgba(254, 215, 170, 0.8)',  // Warm amber
    ];

    const colors = isStars ? starColors : petalColors;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: isStars ? Math.random() * 4 + 2 : Math.random() * 8 + 7,
        speedX: isStars ? (Math.random() - 0.5) * 0.4 : Math.random() * 1.5 - 0.2,
        speedY: isStars ? Math.random() * 0.5 + 0.2 : Math.random() * 1.2 + 0.8,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        color: colors[Math.floor(Math.random() * colors.length)],
        swayAmplitude: isStars ? Math.random() * 0.8 : Math.random() * 2 + 1,
        swayOffset: Math.random() * Math.PI * 2,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.04 + 0.02
      });
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.015;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += Math.sin(time + p.swayOffset) * p.swayAmplitude + p.speedX * 0.4;
        p.rotation += p.rotationSpeed;
        p.twinklePhase += p.twinkleSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (isStars) {
          // Draw 4-point twinkling star
          const alpha = 0.5 + Math.sin(p.twinklePhase) * 0.45;
          ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${Math.max(0.1, alpha)})`);
          ctx.beginPath();
          const s = p.size;
          ctx.moveTo(0, -s * 1.5);
          ctx.quadraticCurveTo(0, 0, s * 1.5, 0);
          ctx.quadraticCurveTo(0, 0, 0, s * 1.5);
          ctx.quadraticCurveTo(0, 0, -s * 1.5, 0);
          ctx.quadraticCurveTo(0, 0, 0, -s * 1.5);
          ctx.fill();
        } else {
          // Draw cute cherry petal shape
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(p.size / 2, -p.size / 2, p.size, p.size / 3, 0, p.size * 1.5);
          ctx.bezierCurveTo(-p.size, p.size / 3, -p.size / 2, -p.size / 2, 0, 0);
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isEnabled, mode]);

  if (!isEnabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 transition-opacity duration-700"
      style={{ opacity: mode === 'stars' ? 0.95 : 0.85 }}
    />
  );
}
