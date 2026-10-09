import React, { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config/birthdayData';
import { audioEngine } from '../utils/audio';

interface Scene1WelcomeProps {
  onOpenSurprise: () => void;
}

export const Scene1Welcome: React.FC<Scene1WelcomeProps> = ({ onOpenSurprise }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    audioEngine.playSoundEffect('envelope');
    // Allow envelope unfolding animation to complete smoothly before transitioning
    setTimeout(() => {
      audioEngine.playSoundEffect('sparkle');
      onOpenSurprise();
    }, 1100);
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-12 text-center select-none">
      {/* Decorative celestial background aura */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-purple-600/20 via-pink-500/20 to-amber-300/15 blur-3xl pointer-events-none animate-pulse" />

      {/* Atmospheric kicker */}
      <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-amber-300/30 bg-white/5 backdrop-blur-sm text-[11px] sm:text-xs text-amber-200 tracking-widest uppercase font-sans">
        <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
        <span>{BIRTHDAY_CONFIG.welcome.kicker}</span>
        <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
      </div>

      {/* Heading */}
      <h1 className="max-w-2xl text-2xl sm:text-4xl md:text-5xl font-serif font-light text-neutral-100 leading-tight sm:leading-snug mb-3">
        <span className="block italic text-pink-200 font-serif mb-1">For Vasilisa</span>
        <span className="text-white drop-shadow-md">
          {BIRTHDAY_CONFIG.welcome.introText}
        </span>
      </h1>

      <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-md mx-auto mb-8">
        {BIRTHDAY_CONFIG.welcome.hintText}
      </p>

      {/* The Decorative Interactive Envelope */}
      <div
        onClick={handleOpen}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleOpen();
          }
        }}
        tabIndex={0}
        role="button"
        aria-label="Open your birthday surprise envelope"
        className={`group relative w-64 sm:w-80 h-44 sm:h-52 bg-gradient-to-b from-[#1f1b3c] to-[#121124] border border-amber-200/40 rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.6)] cursor-pointer transition-all duration-700 ease-out focus:outline-none focus:ring-2 focus:ring-amber-300/70 ${
          isOpening
            ? 'scale-105 rotate-1 shadow-[0_0_60px_rgba(251,191,36,0.6)]'
            : 'hover:scale-102 hover:shadow-[0_0_35px_rgba(244,114,182,0.35)]'
        }`}
      >
        {/* Envelope flap */}
        <div
          className={`absolute top-0 left-0 right-0 h-24 sm:h-28 overflow-hidden transition-transform duration-700 origin-top ${
            isOpening ? '-scale-y-100 -translate-y-2' : ''
          }`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <svg
            viewBox="0 0 320 120"
            className="w-full h-full fill-current text-[#29224d] filter drop-shadow(0 4px 6px rgba(0,0,0,0.4))"
            preserveAspectRatio="none"
          >
            <polygon points="0,0 320,0 160,115" fill="#252146" stroke="#fbbf24" strokeWidth="1" strokeOpacity="0.4" />
          </svg>
        </div>

        {/* Envelope interior paper preview (visible as flap opens) */}
        <div
          className={`absolute inset-3 bg-gradient-to-b from-[#fffaf0] to-[#fce7f3] rounded-md transition-all duration-700 flex flex-col items-center justify-center p-3 text-neutral-800 shadow-inner ${
            isOpening ? '-translate-y-8 opacity-100' : 'opacity-20 translate-y-2'
          }`}
        >
          <p className="font-serif italic text-sm sm:text-base text-pink-700 font-semibold">
            Happy Birthday, Vasilisa!
          </p>
          <p className="text-[10px] sm:text-xs text-neutral-600 font-sans mt-1">
            October 13 · A Celebration in Bloom
          </p>
        </div>

        {/* Lower envelope body fold */}
        <div className="absolute inset-0 pointer-events-none">
          <svg viewBox="0 0 320 200" className="w-full h-full" preserveAspectRatio="none">
            <polygon
              points="0,200 160,105 320,200"
              fill="#181433"
              stroke="#fbbf24"
              strokeWidth="1"
              strokeOpacity="0.3"
            />
            <polygon
              points="0,0 0,200 160,105"
              fill="#1b173a"
              opacity="0.8"
            />
            <polygon
              points="320,0 320,200 160,105"
              fill="#1b173a"
              opacity="0.8"
            />
          </svg>
        </div>

        {/* Golden Wax Seal with Monogram "V" */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#99582a] via-[#d4af37] to-[#ffe082] shadow-[0_4px_16px_rgba(0,0,0,0.5),0_0_15px_rgba(251,191,36,0.5)] border-2 border-[#fff3b0] flex items-center justify-center transition-all duration-500 z-10 ${
            isOpening ? 'scale-125 opacity-0 rotate-45' : 'group-hover:scale-110'
          }`}
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-amber-900/40 flex items-center justify-center bg-gradient-to-br from-[#c89830] to-[#8c5220]">
            <span className="font-serif text-xl sm:text-2xl font-bold text-amber-100 drop-shadow">
              V
            </span>
          </div>
        </div>

        {/* Golden delicate sparkles around seal */}
        <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-amber-300/20 blur-md pointer-events-none" />
        <div className="absolute -bottom-3 -left-3 w-8 h-8 rounded-full bg-pink-400/20 blur-md pointer-events-none" />
      </div>

      {/* Primary Action Button */}
      <div className="mt-9">
        <button
          onClick={handleOpen}
          disabled={isOpening}
          className="relative group px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-400 to-amber-300 text-neutral-950 font-medium font-sans text-sm sm:text-base tracking-wide shadow-[0_0_25px_rgba(244,114,182,0.4)] hover:shadow-[0_0_35px_rgba(251,191,36,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer disabled:opacity-50"
        >
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-neutral-900" />
            <span>{isOpening ? 'Opening the Universe...' : BIRTHDAY_CONFIG.welcome.ctaButton}</span>
            <Sparkles className="w-4 h-4 text-neutral-900" />
          </span>
        </button>
      </div>

      {/* Date badge */}
      <div className="mt-8 text-neutral-400 text-xs font-serif tracking-widest uppercase">
        <span>Celebration Date · {BIRTHDAY_CONFIG.recipient.birthdayDate}</span>
      </div>
    </div>
  );
};
