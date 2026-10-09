import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config/birthdayData';
import { audioEngine } from '../utils/audio';

interface Scene2RevealProps {
  onContinue: () => void;
}

export const Scene2Reveal: React.FC<Scene2RevealProps> = ({ onContinue }) => {
  const [bloomed, setBloomed] = useState(false);

  useEffect(() => {
    // Play celebratory chime and trigger confetti burst
    audioEngine.playSoundEffect('sparkle');

    const timeout = setTimeout(() => {
      setBloomed(true);
      // Fire celebratory confetti cannons
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f472b6', '#fbbf24', '#c084fc', '#ffffff', '#fbcfe8'],
        });

        setTimeout(() => {
          confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#f472b6', '#fbbf24', '#fbcfe8'],
          });
          confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#c084fc', '#fbbf24', '#ffffff'],
          });
        }, 300);
      } catch {
        // Fallback gracefully
      }
    }, 200);

    return () => clearTimeout(timeout);
  }, []);

  const handleConfettiAgain = () => {
    audioEngine.playSoundEffect('pop');
    try {
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.7 },
        colors: ['#f472b6', '#fbbf24', '#f43f5e', '#a855f7'],
      });
    } catch {
      // Graceful
    }
  };

  return (
    <div className="relative min-h-[92vh] flex flex-col items-center justify-center px-4 py-10 text-center overflow-hidden">
      {/* Decorative Fairy Lights garland across the top */}
      <div className="absolute top-0 left-0 right-0 flex justify-around pointer-events-none z-10 px-4">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-center animate-pulse"
            style={{ animationDelay: `${(i * 180) % 1500}ms` }}
          >
            <div className="w-px h-6 sm:h-8 bg-amber-200/40" />
            <div
              className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full shadow-[0_0_12px_rgba(251,191,36,0.9)] ${
                i % 3 === 0
                  ? 'bg-amber-200'
                  : i % 3 === 1
                  ? 'bg-pink-300'
                  : 'bg-purple-300'
              }`}
            />
          </div>
        ))}
      </div>

      {/* Floating Botanical Vines & Floral Wreath SVG Borders */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-between px-2 sm:px-8 opacity-60">
        {/* Left floral accent */}
        <div
          className={`transition-all duration-1000 transform ${
            bloomed ? 'translate-x-0 opacity-80' : '-translate-x-12 opacity-0'
          }`}
        >
          <svg width="120" height="240" viewBox="0 0 100 200" fill="none" className="max-w-[70px] sm:max-w-[120px]">
            <path
              d="M10 200 Q40 120 20 60 Q50 30 70 0"
              stroke="#f472b6"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4 2"
            />
            {/* Blooming flower buds */}
            <circle cx="20" cy="60" r="10" fill="#fbcfe8" opacity="0.8" />
            <circle cx="20" cy="60" r="6" fill="#f472b6" />
            <circle cx="20" cy="60" r="3" fill="#fef08a" />

            <circle cx="45" cy="110" r="8" fill="#e9d5ff" opacity="0.8" />
            <circle cx="45" cy="110" r="4" fill="#c084fc" />

            <circle cx="65" cy="15" r="12" fill="#fed7aa" opacity="0.8" />
            <circle cx="65" cy="15" r="7" fill="#fb923c" />
            <circle cx="65" cy="15" r="3" fill="#fff" />
          </svg>
        </div>

        {/* Right floral accent */}
        <div
          className={`transition-all duration-1000 transform ${
            bloomed ? 'translate-x-0 opacity-80' : 'translate-x-12 opacity-0'
          }`}
        >
          <svg width="120" height="240" viewBox="0 0 100 200" fill="none" className="max-w-[70px] sm:max-w-[120px]">
            <path
              d="M90 200 Q60 120 80 60 Q50 30 30 0"
              stroke="#c084fc"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4 2"
            />
            <circle cx="80" cy="60" r="10" fill="#fbcfe8" opacity="0.8" />
            <circle cx="80" cy="60" r="6" fill="#f472b6" />
            <circle cx="80" cy="60" r="3" fill="#fef08a" />

            <circle cx="55" cy="110" r="8" fill="#fed7aa" opacity="0.8" />
            <circle cx="55" cy="110" r="4" fill="#f97316" />

            <circle cx="35" cy="15" r="12" fill="#ddd6fe" opacity="0.8" />
            <circle cx="35" cy="15" r="7" fill="#a855f7" />
            <circle cx="35" cy="15" r="3" fill="#fff" />
          </svg>
        </div>
      </div>

      {/* Floating Balloons and Satin Ribbons in Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Balloon 1: Pink */}
        <div
          className={`absolute left-[12%] bottom-[-80px] w-14 sm:w-20 h-18 sm:h-24 rounded-full bg-gradient-to-tr from-pink-500/50 to-pink-200/80 shadow-[0_10px_20px_rgba(244,114,182,0.3)] transition-all duration-1000 ${
            bloomed ? 'translate-y-[-240px] opacity-75' : 'translate-y-0 opacity-0'
          }`}
        >
          <div className="absolute bottom-[-16px] left-1/2 -translate-x-1/2 w-px h-16 bg-pink-300/40" />
        </div>

        {/* Balloon 2: Champagne Gold */}
        <div
          className={`absolute right-[14%] bottom-[-80px] w-16 sm:w-22 h-20 sm:h-28 rounded-full bg-gradient-to-tr from-amber-400/50 to-yellow-100/80 shadow-[0_10px_20px_rgba(251,191,36,0.3)] transition-all duration-1000 delay-200 ${
            bloomed ? 'translate-y-[-260px] opacity-75' : 'translate-y-0 opacity-0'
          }`}
        >
          <div className="absolute bottom-[-16px] left-1/2 -translate-x-1/2 w-px h-16 bg-amber-300/40" />
        </div>

        {/* Balloon 3: Lavender */}
        <div
          className={`absolute left-[24%] bottom-[-80px] w-12 sm:w-16 h-15 sm:h-20 rounded-full bg-gradient-to-tr from-purple-500/40 to-purple-200/70 shadow-[0_10px_20px_rgba(168,85,247,0.3)] transition-all duration-1000 delay-300 ${
            bloomed ? 'translate-y-[-290px] opacity-60' : 'translate-y-0 opacity-0'
          }`}
        >
          <div className="absolute bottom-[-16px] left-1/2 -translate-x-1/2 w-px h-16 bg-purple-300/40" />
        </div>
      </div>

      {/* Center Reveal Glass Card */}
      <div
        className={`relative max-w-3xl w-full mx-auto p-6 sm:p-10 md:p-12 rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-amber-200/30 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] transition-all duration-1000 ${
          bloomed ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-6'
        }`}
      >
        {/* Date and Kicker */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-8 sm:w-16 bg-gradient-to-r from-transparent to-amber-300/60" />
          <span className="text-[11px] sm:text-xs font-sans tracking-widest uppercase text-amber-200/90 font-medium">
            {BIRTHDAY_CONFIG.reveal.dateBadge}
          </span>
          <div className="h-px w-8 sm:w-16 bg-gradient-to-l from-transparent to-amber-300/60" />
        </div>

        {/* Main Heading: English */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif text-white tracking-wide font-normal mb-3 leading-tight">
          <span className="block text-pink-200 text-lg sm:text-2xl font-light italic mb-1">
            Happy Birthday,
          </span>
          <span className="gold-gradient-text font-serif font-semibold drop-shadow-md">
            {BIRTHDAY_CONFIG.recipient.name}
          </span>
        </h1>

        {/* Russian Greeting */}
        <h2 className="text-xl sm:text-3xl md:text-4xl font-serif italic text-pink-300 font-light mb-5 tracking-wide">
          «{BIRTHDAY_CONFIG.reveal.cyrillicHeadline}»
        </h2>

        {/* Decorative divider with golden flower ornament */}
        <div className="flex items-center justify-center gap-3 my-5">
          <div className="h-px w-16 sm:w-28 bg-white/20" />
          <div className="w-5 h-5 rounded-full border border-amber-300/60 flex items-center justify-center text-amber-300">
            <Sparkles className="w-3 h-3" />
          </div>
          <div className="h-px w-16 sm:w-28 bg-white/20" />
        </div>

        {/* Secondary message */}
        <p className="text-base sm:text-xl font-serif text-amber-100/90 max-w-xl mx-auto leading-relaxed mb-4">
          {BIRTHDAY_CONFIG.reveal.subheading}
        </p>

        {/* Warm reflection */}
        <p className="text-xs sm:text-sm text-neutral-300 font-sans max-w-lg mx-auto leading-relaxed mb-8">
          {BIRTHDAY_CONFIG.reveal.reflection}
        </p>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <button
            onClick={onContinue}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-400 to-amber-300 text-neutral-950 font-semibold font-sans text-sm sm:text-base tracking-wide shadow-[0_0_30px_rgba(244,114,182,0.4)] hover:shadow-[0_0_40px_rgba(251,191,36,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>{BIRTHDAY_CONFIG.reveal.exploreButton}</span>
            <ArrowRight className="w-4 h-4 text-neutral-950" />
          </button>

          <button
            onClick={handleConfettiAgain}
            className="w-full sm:w-auto px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-neutral-200 text-xs sm:text-sm font-sans font-medium transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5"
            title="Pop celebration confetti"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>More Confetti</span>
          </button>
        </div>
      </div>
    </div>
  );
};
