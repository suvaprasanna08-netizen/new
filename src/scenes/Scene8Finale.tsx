import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, RotateCcw, Compass, Heart, Star } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config/birthdayData';
import { audioEngine } from '../utils/audio';

interface Scene8FinaleProps {
  onRestartJourney: () => void;
  onReturnToWorld: () => void;
}

export const Scene8Finale: React.FC<Scene8FinaleProps> = ({
  onRestartJourney,
  onReturnToWorld,
}) => {
  const [fireworksActive, setFireworksActive] = useState(true);

  const triggerFireworks = () => {
    audioEngine.playSoundEffect('sparkle');
    setFireworksActive(true);

    try {
      // Elegant sequence of fireworks bursts
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { x: 0.3, y: 0.4 },
        colors: ['#fbbf24', '#f472b6', '#ffffff', '#e9d5ff'],
      });

      setTimeout(() => {
        confetti({
          particleCount: 90,
          spread: 110,
          origin: { x: 0.7, y: 0.35 },
          colors: ['#f472b6', '#fde047', '#38bdf8', '#c084fc'],
        });
      }, 400);

      setTimeout(() => {
        confetti({
          particleCount: 120,
          spread: 130,
          origin: { x: 0.5, y: 0.3 },
          colors: ['#ffe082', '#f43f5e', '#a855f7', '#ffffff'],
        });
      }, 900);
    } catch {
      // Graceful
    }
  };

  useEffect(() => {
    triggerFireworks();
  }, []);

  return (
    <div className="relative min-h-[95vh] flex flex-col items-center justify-center px-4 py-12 text-center select-none overflow-hidden">
      {/* Animated SVG Fireworks Bloom in Twilight Sky */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center opacity-70">
        <svg viewBox="0 0 800 600" className="w-full h-full max-w-4xl">
          {/* Firework 1: Center Starburst */}
          <g transform="translate(400, 200)" className="animate-pulse">
            {[...Array(16)].map((_, i) => {
              const angle = (i * Math.PI) / 8;
              const x1 = Math.cos(angle) * 20;
              const y1 = Math.sin(angle) * 20;
              const x2 = Math.cos(angle) * 110;
              const y2 = Math.sin(angle) * 110;
              return (
                <g key={i}>
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#fde047"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    opacity="0.8"
                  />
                  <circle cx={x2} cy={y2} r="3" fill="#f472b6" />
                </g>
              );
            })}
          </g>

          {/* Firework 2: Left Burst */}
          <g transform="translate(180, 160)" className="animate-pulse" style={{ animationDelay: '500ms' }}>
            {[...Array(12)].map((_, i) => {
              const angle = (i * Math.PI) / 6;
              const x2 = Math.cos(angle) * 75;
              const y2 = Math.sin(angle) * 75;
              return (
                <g key={i}>
                  <line x1={0} y1={0} x2={x2} y2={y2} stroke="#f472b6" strokeWidth="1.2" opacity="0.7" />
                  <circle cx={x2} cy={y2} r="2.5" fill="#fef08a" />
                </g>
              );
            })}
          </g>

          {/* Firework 3: Right Burst */}
          <g transform="translate(620, 180)" className="animate-pulse" style={{ animationDelay: '900ms' }}>
            {[...Array(12)].map((_, i) => {
              const angle = (i * Math.PI) / 6;
              const x2 = Math.cos(angle) * 80;
              const y2 = Math.sin(angle) * 80;
              return (
                <g key={i}>
                  <line x1={0} y1={0} x2={x2} y2={y2} stroke="#c084fc" strokeWidth="1.2" opacity="0.7" />
                  <circle cx={x2} cy={y2} r="2.5" fill="#fbcfe8" />
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* Center Finale Plaque / Card */}
      <div className="relative max-w-2xl w-full mx-auto p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-amber-300/40 backdrop-blur-xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] z-10">
        {/* Date Inscription */}
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-amber-300/30 bg-white/5 text-[11px] font-sans tracking-widest uppercase text-amber-200">
          <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
          <span>{BIRTHDAY_CONFIG.finale.dateSubtext}</span>
          <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
        </div>

        {/* Final Headings */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif text-white tracking-wide font-normal mb-2 leading-tight">
          <span className="block text-pink-200 text-lg sm:text-2xl font-light italic mb-1">
            Happy Birthday,
          </span>
          <span className="gold-gradient-text font-serif font-bold drop-shadow-md">
            {BIRTHDAY_CONFIG.recipient.name}
          </span>
        </h1>

        {/* Russian Greeting */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-pink-300 font-light mb-6 tracking-wide">
          «{BIRTHDAY_CONFIG.finale.cyrillicHeading}»
        </h2>

        {/* Golden Line */}
        <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-transparent via-amber-300/80 to-transparent my-4" />

        {/* Final Message */}
        <p className="text-sm sm:text-lg font-serif text-amber-100/90 leading-relaxed max-w-xl mx-auto my-6">
          {BIRTHDAY_CONFIG.finale.message}
        </p>

        {/* Interactive Finale Control Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-8 pt-4 border-t border-white/10">
          {/* Replay Finale Fireworks */}
          <button
            onClick={triggerFireworks}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 via-rose-400 to-amber-300 text-neutral-950 font-semibold font-sans text-xs sm:text-sm tracking-wide shadow-[0_0_25px_rgba(244,114,182,0.4)] hover:shadow-[0_0_35px_rgba(251,191,36,0.6)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-neutral-900" />
            <span>{BIRTHDAY_CONFIG.finale.replayFinaleBtn}</span>
          </button>

          {/* Return to Birthday World */}
          <button
            onClick={onReturnToWorld}
            className="w-full sm:w-auto px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-neutral-100 text-xs sm:text-sm font-sans font-medium transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4 text-amber-300" />
            <span>{BIRTHDAY_CONFIG.finale.returnWorldBtn}</span>
          </button>

          {/* Replay Entire Journey */}
          <button
            onClick={onRestartJourney}
            className="w-full sm:w-auto px-5 py-3 rounded-full bg-transparent hover:bg-white/5 border border-white/15 text-neutral-300 hover:text-white text-xs sm:text-sm font-sans transition-all cursor-pointer flex items-center justify-center gap-1.5"
            title="Start again from Chapter 1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{BIRTHDAY_CONFIG.finale.restartJourneyBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
