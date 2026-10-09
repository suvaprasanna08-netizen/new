import React, { useState } from 'react';
import { Mail, Sparkles, X, Heart, ArrowRight, CornerDownLeft } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config/birthdayData';
import { audioEngine } from '../utils/audio';

interface Scene6LetterProps {
  onContinue: () => void;
}

export const Scene6Letter: React.FC<Scene6LetterProps> = ({ onContinue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenLetter = () => {
    if (isOpen || isOpening) return;
    setIsOpening(true);
    audioEngine.playSoundEffect('envelope');

    setTimeout(() => {
      setIsOpen(true);
      setIsOpening(false);
      audioEngine.playSoundEffect('sparkle');
    }, 800);
  };

  const handleCloseLetter = () => {
    audioEngine.playSoundEffect('chime');
    setIsOpen(false);
  };

  const letter = BIRTHDAY_CONFIG.letter;

  return (
    <div className="relative min-h-[95vh] flex flex-col items-center justify-between px-4 py-8 max-w-4xl mx-auto select-none">
      {/* Header */}
      <div className="text-center z-10 max-w-xl mx-auto pt-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-pink-300/30 text-[11px] uppercase tracking-widest text-pink-200 mb-2 font-sans">
          <Mail className="w-3 h-3 text-pink-300" />
          <span>A Letter Across Distance</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-white font-normal">
          The Heartfelt Letter
        </h2>
        <p className="text-xs sm:text-sm text-neutral-300 mt-2 font-sans max-w-md mx-auto">
          An authentic handwritten-style digital letter for your birthday, sealed with a golden crest.
        </p>
      </div>

      {/* Main Letter / Envelope Stage */}
      <div className="relative w-full my-6 flex flex-col items-center justify-center min-h-[460px]">
        {!isOpen ? (
          /* Sealed Envelope View */
          <div className="flex flex-col items-center">
            <div
              onClick={handleOpenLetter}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOpenLetter();
                }
              }}
              tabIndex={0}
              role="button"
              aria-label="Open personal birthday letter"
              className={`group relative w-72 sm:w-96 h-48 sm:h-60 rounded-2xl bg-gradient-to-b from-[#2a244d] to-[#17142d] border border-amber-300/40 shadow-[0_20px_50px_rgba(0,0,0,0.7)] cursor-pointer transition-all duration-500 hover:scale-103 hover:shadow-[0_0_40px_rgba(251,191,36,0.35)] focus:outline-none focus:ring-2 focus:ring-amber-300 ${
                isOpening ? 'scale-105 opacity-90' : ''
              }`}
            >
              {/* Envelope Flap SVG */}
              <div
                className={`absolute top-0 left-0 right-0 h-28 overflow-hidden origin-top transition-transform duration-700 ${
                  isOpening ? '-scale-y-100 -translate-y-2' : ''
                }`}
              >
                <svg viewBox="0 0 380 140" className="w-full h-full fill-[#342b5f]">
                  <polygon points="0,0 380,0 190,135" stroke="#fbbf24" strokeWidth="1.2" strokeOpacity="0.5" />
                </svg>
              </div>

              {/* Envelope Body Flaps */}
              <div className="absolute inset-0 pointer-events-none">
                <svg viewBox="0 0 380 240" className="w-full h-full" preserveAspectRatio="none">
                  <polygon points="0,240 190,120 380,240" fill="#201a3d" stroke="#fbbf24" strokeWidth="1" strokeOpacity="0.3" />
                  <polygon points="0,0 0,240 190,120" fill="#241e45" opacity="0.9" />
                  <polygon points="380,0 380,240 190,120" fill="#241e45" opacity="0.9" />
                </svg>
              </div>

              {/* Inscription on Envelope */}
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end text-neutral-300 text-xs font-serif italic">
                <div>
                  <span className="block text-[11px] font-sans uppercase tracking-wider text-amber-300/70 not-italic">
                    To:
                  </span>
                  <span className="text-base text-pink-200">Vasilisa</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-neutral-400 not-italic">
                    {letter.dateLabel}
                  </span>
                </div>
              </div>

              {/* Wax Seal Center */}
              <div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-tr from-[#8a4e1d] via-[#d4af37] to-[#ffe082] shadow-[0_4px_20px_rgba(0,0,0,0.6),0_0_20px_rgba(251,191,36,0.6)] border-2 border-amber-200 flex items-center justify-center transition-all duration-300 ${
                  isOpening ? 'scale-125 opacity-0' : 'group-hover:scale-110'
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#b88222] to-[#713f12] flex items-center justify-center border border-amber-900/40">
                  <span className="font-serif text-2xl font-bold text-amber-100">V</span>
                </div>
              </div>
            </div>

            {/* Click to open button */}
            <button
              onClick={handleOpenLetter}
              disabled={isOpening}
              className="mt-6 px-7 py-3 rounded-full bg-gradient-to-r from-pink-500 via-rose-400 to-amber-300 text-neutral-950 font-medium font-sans text-sm tracking-wide shadow-[0_0_25px_rgba(244,114,182,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-neutral-900" />
              <span>{isOpening ? 'Unfolding Letter...' : 'Break Seal & Read Letter'}</span>
            </button>
          </div>
        ) : (
          /* Unfolded Parchment Paper Letter View */
          <div className="relative w-full max-w-2xl bg-[#fdfbf7] text-[#292524] rounded-2xl p-6 sm:p-10 md:p-12 shadow-[0_25px_70px_rgba(0,0,0,0.8)] border border-[#e5dacf] animate-fade-in my-2">
            {/* Delicate top ornamental header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#e5dacf] mb-6">
              <div className="flex items-center gap-2 text-stone-500 text-xs font-serif italic">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>October 13 · A Celebration of Friendship</span>
              </div>
              <button
                onClick={handleCloseLetter}
                className="p-1 rounded-full text-stone-400 hover:text-stone-800 hover:bg-stone-200/50 transition-colors cursor-pointer"
                aria-label="Fold letter back into envelope"
                title="Fold letter back"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Salutation */}
            <h3 className="font-serif text-2xl sm:text-3xl text-[#1c1917] font-semibold mb-6">
              {letter.salutation}
            </h3>

            {/* Letter Body Paragraphs */}
            <div className="space-y-4 font-serif text-base sm:text-lg text-[#292524] leading-relaxed">
              {letter.paragraphs.map((p, idx) => (
                <p key={idx} className={idx === 0 ? 'font-semibold text-pink-900' : ''}>
                  {p}
                </p>
              ))}
            </div>

            {/* Closing & Signoff */}
            <div className="mt-8 pt-6 border-t border-[#e5dacf] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="font-serif italic text-base text-stone-700">
                  {letter.closing}
                </p>
                <p className="font-serif font-bold text-lg text-stone-900 mt-1">
                  {letter.signature}
                </p>
              </div>

              {/* Return / Fold back control */}
              <button
                onClick={handleCloseLetter}
                className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 border border-stone-300 text-xs font-sans text-stone-700 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <CornerDownLeft className="w-3.5 h-3.5" />
                <span>Fold Letter Back</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="mt-4 flex items-center justify-center">
        <button
          onClick={onContinue}
          className="px-7 py-3 rounded-full bg-gradient-to-r from-pink-500 via-rose-400 to-amber-300 text-neutral-950 font-medium font-sans text-sm tracking-wide shadow-[0_0_20px_rgba(244,114,182,0.35)] hover:shadow-[0_0_30px_rgba(251,191,36,0.5)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
        >
          <span>Visit The Celebration Gallery</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
