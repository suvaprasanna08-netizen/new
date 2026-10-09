import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Flame, FlameKindling, Wind, Heart, ArrowRight } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config/birthdayData';
import { audioEngine } from '../utils/audio';

interface Scene4CakeProps {
  onContinue: () => void;
}

export const Scene4Cake: React.FC<Scene4CakeProps> = ({ onContinue }) => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [wishMade, setWishMade] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const [wishMessageOpen, setWishMessageOpen] = useState(false);

  const handleToggleCandles = () => {
    if (candlesLit) {
      audioEngine.playSoundEffect('pop');
      setCandlesLit(false);
    } else {
      audioEngine.playSoundEffect('candle');
      setCandlesLit(true);
    }
  };

  const handleMakeWish = () => {
    audioEngine.playSoundEffect('wish');
    setWishMade(true);
    setWishMessageOpen(true);

    // If candles were lit, gently blow them out as part of the wish ceremony
    setTimeout(() => {
      setCandlesLit(false);
    }, 1200);
  };

  const handleCelebrate = () => {
    audioEngine.playSoundEffect('pop');
    setCelebrating(true);

    try {
      // Multiple bursts of confetti
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.65 },
        colors: ['#f472b6', '#fbbf24', '#fbcfe8', '#a855f7', '#ffffff'],
      });
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 60,
          origin: { x: 0.1, y: 0.7 },
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 60,
          origin: { x: 0.9, y: 0.7 },
        });
      }, 250);
    } catch {
      // Graceful
    }

    setTimeout(() => setCelebrating(false), 2000);
  };

  return (
    <div className="relative min-h-[95vh] flex flex-col items-center justify-between px-4 py-8 max-w-5xl mx-auto select-none">
      {/* Header */}
      <div className="text-center z-10 max-w-xl mx-auto pt-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-pink-300/30 text-[11px] uppercase tracking-widest text-pink-200 mb-2 font-sans">
          <Sparkles className="w-3 h-3 text-amber-300" />
          <span>Candlelight Ceremony</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-white font-normal">
          {BIRTHDAY_CONFIG.cake.title}
        </h2>
        <p className="text-xs sm:text-sm text-neutral-300 mt-2 font-sans max-w-md mx-auto">
          {BIRTHDAY_CONFIG.cake.subtitle}
        </p>
      </div>

      {/* Center Cake Display Stage */}
      <div className="relative my-4 flex flex-col items-center justify-center w-full max-w-lg min-h-[380px] sm:min-h-[440px]">
        {/* Soft Golden Halo Behind Cake */}
        <div
          className={`absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full transition-all duration-700 pointer-events-none ${
            candlesLit
              ? 'bg-amber-400/20 blur-3xl scale-110'
              : 'bg-purple-900/20 blur-2xl scale-95'
          }`}
        />

        {/* Wish Particles Spiral Effect */}
        {wishMade && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center animate-ping duration-1000 opacity-30">
            <div className="w-80 h-80 rounded-full border-2 border-amber-300" />
          </div>
        )}

        {/* The Illustrated SVG Cake */}
        <div className="relative z-10 w-72 sm:w-88 filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.7)]">
          <svg viewBox="0 0 320 340" className="w-full h-auto">
            <defs>
              <linearGradient id="cakeIvory" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fffdfa" />
                <stop offset="100%" stopColor="#fae8df" />
              </linearGradient>
              <linearGradient id="cakePink" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fdf2f8" />
                <stop offset="50%" stopColor="#fce7f3" />
                <stop offset="100%" stopColor="#f472b6" />
              </linearGradient>
              <linearGradient id="goldRim" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#c59b27" />
                <stop offset="50%" stopColor="#ffe699" />
                <stop offset="100%" stopColor="#b38719" />
              </linearGradient>
              <linearGradient id="standGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f5efe6" />
                <stop offset="50%" stopColor="#e8ded2" />
                <stop offset="100%" stopColor="#c5b7a5" />
              </linearGradient>
            </defs>

            {/* Cake Stand Base & Stem */}
            <path
              d="M100 325 L220 325 C210 320 180 305 170 290 L150 290 C140 305 110 320 100 325 Z"
              fill="url(#standGrad)"
            />
            {/* Cake Stand Pedestal Plate */}
            <ellipse cx="160" cy="290" rx="140" ry="24" fill="url(#standGrad)" stroke="#c59b27" strokeWidth="2" />
            <ellipse cx="160" cy="287" rx="135" ry="20" fill="#fffaf5" />

            {/* Bottom Tier (Tier 3) */}
            <g id="tier-bottom">
              <path
                d="M45 220 L45 260 C45 282 275 282 275 260 L275 220 Z"
                fill="url(#cakePink)"
              />
              <ellipse cx="160" cy="220" rx="115" ry="22" fill="#fff5f7" />
              {/* Pearl border around bottom tier rim */}
              {[60, 85, 110, 135, 160, 185, 210, 235, 260].map((px, idx) => (
                <circle key={idx} cx={px} cy={225} r="4" fill="#ffffff" stroke="#c59b27" strokeWidth="0.8" />
              ))}
              {/* Decorative golden filigree swags */}
              <path
                d="M50 235 Q90 260 130 235 Q160 260 190 235 Q230 260 270 235"
                stroke="url(#goldRim)"
                strokeWidth="2.5"
                fill="none"
              />
            </g>

            {/* Middle Tier (Tier 2) */}
            <g id="tier-middle">
              <path
                d="M75 155 L75 195 C75 212 245 212 245 195 L245 155 Z"
                fill="url(#cakeIvory)"
              />
              <ellipse cx="160" cy="155" rx="85" ry="18" fill="#fef1f4" />
              {/* Decorative piped icing scallop on middle tier */}
              <path
                d="M80 170 Q105 185 130 170 Q160 185 190 170 Q215 185 240 170"
                stroke="#f472b6"
                strokeWidth="2.5"
                fill="none"
              />
              {/* Rose rosettes on tier rim */}
              <circle cx="160" cy="158" r="5" fill="#f472b6" />
              <circle cx="120" cy="159" r="4.5" fill="#f472b6" />
              <circle cx="200" cy="159" r="4.5" fill="#f472b6" />
            </g>

            {/* Top Tier (Tier 1) */}
            <g id="tier-top">
              <path
                d="M105 100 L105 135 C105 148 215 148 215 135 L215 100 Z"
                fill="url(#cakePink)"
              />
              <ellipse cx="160" cy="100" rx="55" ry="14" fill="#ffffff" stroke="url(#goldRim)" strokeWidth="1" />
              {/* Piped border */}
              <path
                d="M110 112 Q135 124 160 112 Q185 124 210 112"
                stroke="#c59b27"
                strokeWidth="2"
                fill="none"
              />
            </g>

            {/* Five Birthday Candles */}
            {[
              { x: 125, y: 70 },
              { x: 142, y: 64 },
              { x: 160, y: 60 },
              { x: 178, y: 64 },
              { x: 195, y: 70 },
            ].map((candle, idx) => (
              <g key={idx} className="cursor-pointer" onClick={handleToggleCandles}>
                {/* Candle Stick */}
                <rect
                  x={candle.x - 3}
                  y={candle.y}
                  width="6"
                  height="26"
                  rx="2"
                  fill={idx % 2 === 0 ? '#fbcfe8' : '#fef08a'}
                  stroke="#c59b27"
                  strokeWidth="0.8"
                />
                {/* Wick */}
                <line
                  x1={candle.x}
                  y1={candle.y}
                  x2={candle.x}
                  y2={candle.y - 5}
                  stroke="#57534e"
                  strokeWidth="1.5"
                />

                {/* Flame (if lit) */}
                {candlesLit ? (
                  <g className="animate-flame" style={{ transformOrigin: `${candle.x}px ${candle.y - 6}px` }}>
                    {/* Flame outer aura */}
                    <circle cx={candle.x} cy={candle.y - 12} r="9" fill="#fef08a" fillOpacity="0.4" />
                    {/* Flame teardrop */}
                    <path
                      d={`M${candle.x} ${candle.y - 20} C${candle.x + 5} ${candle.y - 13} ${candle.x + 4} ${candle.y - 6} ${candle.x} ${candle.y - 6} C${candle.x - 4} ${candle.y - 6} ${candle.x - 5} ${candle.y - 13} ${candle.x} ${candle.y - 20} Z`}
                      fill="#f59e0b"
                    />
                    <ellipse cx={candle.x} cy={candle.y - 9} rx="2" ry="4" fill="#ffffff" />
                  </g>
                ) : (
                  /* Smoke puff when blown out */
                  <path
                    d={`M${candle.x} ${candle.y - 6} Q${candle.x + 3} ${candle.y - 14} ${candle.x - 1} ${candle.y - 22}`}
                    stroke="#a8a29e"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                    fill="none"
                    opacity="0.6"
                  />
                )}
              </g>
            ))}
          </svg>
        </div>

        {/* Flame status indicator */}
        <div className="mt-2 text-xs font-serif tracking-wide text-neutral-300">
          {candlesLit ? (
            <span className="text-amber-200">The candles are glowing softly</span>
          ) : (
            <span className="text-pink-200">The candles have carried your wish to the sky</span>
          )}
        </div>
      </div>

      {/* Interactive Controls Bar */}
      <div className="flex flex-wrap items-center justify-center gap-3 z-20 my-3">
        {/* Toggle / Relight Candles */}
        <button
          onClick={handleToggleCandles}
          className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-neutral-100 text-xs sm:text-sm font-sans font-medium transition-all cursor-pointer flex items-center gap-2"
          aria-label={candlesLit ? 'Blow out candles' : 'Relight candles'}
        >
          {candlesLit ? (
            <>
              <Wind className="w-4 h-4 text-pink-300" />
              <span>Blow Out Candles</span>
            </>
          ) : (
            <>
              <Flame className="w-4 h-4 text-amber-300" />
              <span>Relight Candles</span>
            </>
          )}
        </button>

        {/* Make a Wish Button */}
        <button
          onClick={handleMakeWish}
          className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-400 to-amber-300 text-neutral-950 text-xs sm:text-sm font-semibold tracking-wide shadow-[0_0_20px_rgba(244,114,182,0.4)] hover:shadow-[0_0_30px_rgba(251,191,36,0.6)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-neutral-900" />
          <span>Make a Wish</span>
        </button>

        {/* Celebrate Button */}
        <button
          onClick={handleCelebrate}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-500/40 to-pink-500/40 hover:from-purple-500/60 hover:to-pink-500/60 border border-purple-300/40 text-neutral-100 text-xs sm:text-sm font-sans font-medium transition-all cursor-pointer flex items-center gap-2"
        >
          <Heart className="w-4 h-4 text-rose-300 fill-rose-300" />
          <span>Celebrate!</span>
        </button>
      </div>

      {/* Wish Confirmed Modal */}
      {wishMessageOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="wish-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
        >
          <div className="relative max-w-md w-full bg-[#181836] border border-amber-300/50 rounded-2xl p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-center text-white">
            <div className="w-12 h-12 mx-auto rounded-full bg-amber-400/20 border border-amber-300/50 flex items-center justify-center text-amber-300 mb-3 animate-pulse">
              <Sparkles className="w-6 h-6" />
            </div>

            <h3 id="wish-title" className="text-2xl font-serif text-amber-100 mb-2">
              Wish Whispered to the Stars
            </h3>

            <p className="text-sm text-neutral-200 font-sans leading-relaxed my-4 bg-white/5 p-4 rounded-xl border border-white/10">
              {BIRTHDAY_CONFIG.cake.wishConfirmed}
            </p>

            <button
              onClick={() => setWishMessageOpen(false)}
              className="mt-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-amber-300 text-neutral-950 font-medium text-xs sm:text-sm hover:scale-105 transition-transform cursor-pointer"
            >
              Thank You
            </button>
          </div>
        </div>
      )}

      {/* Footer Navigation */}
      <div className="mt-4 flex items-center justify-center">
        <button
          onClick={onContinue}
          className="px-7 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-neutral-100 font-medium font-sans text-sm tracking-wide transition-all cursor-pointer flex items-center gap-2"
        >
          <span>Step into The Gift Room</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
