import React, { useEffect, useRef } from 'react';

interface BackgroundStarfieldProps {
  currentScene: number; // 1 to 8
}

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  color: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  len: number;
  speed: number;
  angle: number;
  alpha: number;
  active: boolean;
}

export const BackgroundStarfield: React.FC<BackgroundStarfieldProps> = ({ currentScene }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / width - 0.5) * 20,
        y: (e.clientY / height - 0.5) * 20,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Initialize stars
    const stars: Star[] = [];
    const particles: Particle[] = [];
    let shootingStar: ShootingStar = {
      x: 0,
      y: 0,
      len: 0,
      speed: 0,
      angle: 0,
      alpha: 0,
      active: false,
    };

    const starColors = ['#FFFFFF', '#FFE4E6', '#FDE68A', '#E9D5FF', '#BAE6FD'];
    const particleColors = ['#F9A8D4', '#FDE047', '#C4B5FD', '#FFFFFF'];

    const initStars = () => {
      stars.length = 0;
      const count = Math.min(140, Math.floor((width * height) / 8000));
      for (let i = 0; i < count; i++) {
        const baseAlpha = Math.random() * 0.7 + 0.2;
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.8 + 0.6,
          alpha: baseAlpha,
          baseAlpha,
          twinkleSpeed: Math.random() * 0.03 + 0.01,
          twinkleOffset: Math.random() * Math.PI * 2,
          color: starColors[Math.floor(Math.random() * starColors.length)],
        });
      }

      particles.length = 0;
      const pCount = 35;
      for (let i = 0; i < pCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: -Math.random() * 0.4 - 0.1,
          size: Math.random() * 2.2 + 0.8,
          alpha: Math.random() * 0.6 + 0.2,
          color: particleColors[Math.floor(Math.random() * particleColors.length)],
        });
      }
    };

    initStars();

    const triggerShootingStar = () => {
      shootingStar = {
        x: Math.random() * width * 0.8,
        y: Math.random() * height * 0.4,
        len: Math.random() * 80 + 40,
        speed: Math.random() * 8 + 6,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
        alpha: 1,
        active: true,
      };
    };

    let shootingStarTimer = 0;

    let time = 0;
    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Parallax offsets
      const offsetX = mouseRef.current.x;
      const offsetY = mouseRef.current.y;

      // Draw background stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const currentAlpha =
          star.baseAlpha + Math.sin(time * star.twinkleSpeed * 10 + star.twinkleOffset) * 0.3;
        const clampedAlpha = Math.max(0.05, Math.min(1, currentAlpha));

        ctx.fillStyle = star.color;
        ctx.globalAlpha = clampedAlpha;
        ctx.beginPath();
        ctx.arc(
          (star.x + offsetX * 0.5 + width) % width,
          (star.y + offsetY * 0.5 + height) % height,
          star.size,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }

      // Draw floating gentle particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * 0.8;
        ctx.beginPath();
        ctx.arc(p.x + offsetX * 0.8, p.y + offsetY * 0.8, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw shooting star if active
      shootingStarTimer++;
      if (shootingStarTimer > 320 && !shootingStar.active && Math.random() < 0.02) {
        triggerShootingStar();
        shootingStarTimer = 0;
      }

      if (shootingStar.active) {
        ctx.save();
        ctx.strokeStyle = `rgba(255, 245, 220, ${shootingStar.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        const tailX = shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.len;
        const tailY = shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.len;
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(shootingStar.x, shootingStar.y);
        ctx.stroke();
        ctx.restore();

        shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
        shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;
        shootingStar.alpha -= 0.015;
        if (shootingStar.alpha <= 0) {
          shootingStar.active = false;
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentScene]);

  // Dynamic gradient backdrop depending on scene
  const isDarkScene = currentScene === 1 || currentScene === 8;
  const isGardenScene = currentScene === 3;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-colors duration-1000">
      {/* Background radial atmosphere */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isDarkScene
            ? 'opacity-100'
            : 'opacity-40'
        }`}
        style={{
          background:
            'radial-gradient(circle at 50% 30%, #1c1538 0%, #0d0e23 55%, #070814 100%)',
        }}
      />

      {/* Celebratory warm romantic glow for scenes 2 to 7 */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          !isDarkScene ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: isGardenScene
            ? 'radial-gradient(ellipse at 50% 40%, rgba(38, 20, 56, 0.9) 0%, rgba(17, 24, 39, 0.95) 70%, #080915 100%)'
            : 'radial-gradient(ellipse at 50% 35%, rgba(61, 26, 68, 0.85) 0%, rgba(20, 16, 43, 0.95) 65%, #090a18 100%)',
        }}
      />

      {/* Atmospheric luminous clouds */}
      <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-pink-500/10 blur-3xl" />
      <div className="absolute top-1/2 -right-20 w-80 h-80 rounded-full bg-violet-600/15 blur-3xl" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl" />

      {/* Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
