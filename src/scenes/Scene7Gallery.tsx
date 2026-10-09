import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, Expand, Compass } from 'lucide-react';
import { BIRTHDAY_CONFIG, GalleryPanel } from '../config/birthdayData';
import { audioEngine } from '../utils/audio';

interface Scene7GalleryProps {
  onContinue: () => void;
}

export const Scene7Gallery: React.FC<Scene7GalleryProps> = ({ onContinue }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const panels = BIRTHDAY_CONFIG.gallery;
  const current = panels[activeIndex];

  const handlePrev = () => {
    audioEngine.playSoundEffect('chime');
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : panels.length - 1));
  };

  const handleNext = () => {
    audioEngine.playSoundEffect('chime');
    setActiveIndex((prev) => (prev < panels.length - 1 ? prev + 1 : 0));
  };

  const handleSelect = (idx: number) => {
    audioEngine.playSoundEffect('chime');
    setActiveIndex(idx);
  };

  return (
    <div className="relative min-h-[95vh] flex flex-col items-center justify-between px-4 py-8 max-w-5xl mx-auto select-none">
      {/* Header */}
      <div className="text-center z-10 max-w-xl mx-auto pt-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-pink-300/30 text-[11px] uppercase tracking-widest text-pink-200 mb-2 font-sans">
          <Sparkles className="w-3 h-3 text-pink-300" />
          <span>Curated Celestial Exhibition</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-white font-normal">
          The Celebration Gallery
        </h2>
        <p className="text-xs sm:text-sm text-neutral-300 mt-2 font-sans max-w-md mx-auto">
          Four hand-crafted art panels celebrating joy, adventure, humor, and the wonderful days waiting ahead.
        </p>
      </div>

      {/* Main Gallery Display: Ornate Gilded Art Frame */}
      <div className="relative w-full max-w-3xl my-6 flex flex-col items-center">
        {/* Navigation Arrows for Desktop */}
        <button
          onClick={handlePrev}
          className="absolute -left-4 sm:-left-12 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#181938]/90 border border-amber-300/40 text-neutral-200 hover:text-white hover:scale-110 flex items-center justify-center shadow-xl transition-all cursor-pointer"
          aria-label="Previous artwork"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute -right-4 sm:-right-12 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#181938]/90 border border-amber-300/40 text-neutral-200 hover:text-white hover:scale-110 flex items-center justify-center shadow-xl transition-all cursor-pointer"
          aria-label="Next artwork"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* The Gilded Frame Container */}
        <div className="relative w-full rounded-3xl p-3 sm:p-5 bg-gradient-to-tr from-[#997327] via-[#f7d78a] to-[#8c6720] shadow-[0_25px_60px_rgba(0,0,0,0.8)] border border-[#ffeaa7]">
          {/* Inner Inset Mount */}
          <div className="relative rounded-2xl bg-[#0f1026] p-4 sm:p-8 overflow-hidden min-h-[380px] sm:min-h-[440px] flex flex-col md:flex-row items-center gap-6">
            {/* Left: Original SVG Art Composition */}
            <div className="w-full md:w-1/2 flex items-center justify-center relative">
              <div
                className="w-56 h-56 sm:w-64 sm:h-64 rounded-2xl p-4 flex items-center justify-center relative overflow-hidden shadow-inner border border-white/20 transition-all duration-700"
                style={{ backgroundColor: current.themeColor }}
              >
                {/* Visual Art Rendering Based on illustrationType */}
                {current.illustrationType === 'botanical' && (
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    {/* Soft watercolor rings */}
                    <circle cx="100" cy="100" r="75" fill="#fbcfe8" fillOpacity="0.4" />
                    <circle cx="120" cy="80" r="45" fill="#fed7aa" fillOpacity="0.4" />
                    {/* Delicate botanical branches */}
                    <path d="M40 160 Q80 120 120 60 Q140 30 170 20" stroke="#be185d" strokeWidth="2.5" fill="none" />
                    {/* Flower blooms */}
                    <circle cx="120" cy="60" r="14" fill="#f43f5e" />
                    <circle cx="120" cy="60" r="6" fill="#fef08a" />
                    <circle cx="75" cy="105" r="12" fill="#ec4899" />
                    <circle cx="75" cy="105" r="5" fill="#fef08a" />
                    <circle cx="150" cy="35" r="10" fill="#fb7185" />
                    <circle cx="150" cy="35" r="4" fill="#ffffff" />
                    {/* Floating leaves */}
                    <ellipse cx="60" cy="130" rx="8" ry="14" fill="#86efac" transform="rotate(30 60 130)" />
                    <ellipse cx="98" cy="85" rx="6" ry="12" fill="#86efac" transform="rotate(-40 98 85)" />
                  </svg>
                )}

                {current.illustrationType === 'horizon' && (
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    {/* Sky & Horizon gradients */}
                    <circle cx="100" cy="100" r="78" fill="#dbeafe" fillOpacity="0.5" />
                    {/* Golden Sun & Moon */}
                    <circle cx="100" cy="70" r="28" fill="#fde047" />
                    <circle cx="100" cy="70" r="28" fill="#f59e0b" fillOpacity="0.3" />
                    {/* Horizon Mountains */}
                    <path d="M20 145 L75 90 L130 145 Z" fill="#93c5fd" />
                    <path d="M85 145 L135 100 L185 145 Z" fill="#60a5fa" />
                    {/* Sparkling stars */}
                    <circle cx="45" cy="45" r="3" fill="#3b82f6" />
                    <circle cx="155" cy="50" r="3.5" fill="#3b82f6" />
                    <circle cx="140" cy="30" r="2" fill="#3b82f6" />
                    {/* Sail or road */}
                    <path d="M40 160 Q100 135 160 160" stroke="#2563eb" strokeWidth="2" strokeDasharray="3 3" fill="none" />
                  </svg>
                )}

                {current.illustrationType === 'lanterns' && (
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <circle cx="100" cy="100" r="78" fill="#fef3c7" fillOpacity="0.5" />
                    {/* Central joyful glowing lantern */}
                    <rect x="75" y="60" width="50" height="70" rx="10" fill="#fde68a" stroke="#d97706" strokeWidth="2" />
                    <ellipse cx="100" cy="95" rx="12" ry="20" fill="#f59e0b" className="animate-flame" />
                    <ellipse cx="100" cy="95" rx="6" ry="10" fill="#ffffff" />
                    {/* Soft warm aura */}
                    <circle cx="100" cy="95" r="40" fill="#fbbf24" fillOpacity="0.25" className="animate-pulse" />
                    {/* Lantern top & hanger */}
                    <path d="M70 60 L130 60 L100 40 Z" fill="#b45309" />
                    <path d="M100 40 L100 20" stroke="#b45309" strokeWidth="2" />
                    <circle cx="100" cy="20" r="4" fill="#b45309" />
                  </svg>
                )}

                {current.illustrationType === 'constellation' && (
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <circle cx="100" cy="100" r="78" fill="#ede9fe" fillOpacity="0.5" />
                    {/* Star constellation map lines */}
                    <path
                      d="M50 50 L90 80 L130 65 L155 110 L120 150 L65 140 Z"
                      stroke="#8b5cf6"
                      strokeWidth="1.5"
                      strokeDasharray="4 2"
                      fill="none"
                    />
                    {/* Stars */}
                    <circle cx="50" cy="50" r="4.5" fill="#7c3aed" />
                    <circle cx="90" cy="80" r="5" fill="#c4b5fd" stroke="#7c3aed" strokeWidth="1.5" />
                    <circle cx="130" cy="65" r="4.5" fill="#7c3aed" />
                    <circle cx="155" cy="110" r="5" fill="#f59e0b" />
                    <circle cx="120" cy="150" r="4" fill="#7c3aed" />
                    <circle cx="65" cy="140" r="5.5" fill="#c4b5fd" stroke="#7c3aed" strokeWidth="1.5" />
                    {/* Crescent moon in background */}
                    <path
                      d="M 140 30 A 20 20 0 0 0 160 50 A 15 15 0 0 1 140 30 Z"
                      fill="#8b5cf6"
                      opacity="0.7"
                    />
                  </svg>
                )}
              </div>
            </div>

            {/* Right: Artwork Details & Philosophy */}
            <div className="w-full md:w-1/2 flex flex-col justify-center text-left">
              <span className="text-[11px] font-sans tracking-widest uppercase text-amber-300 font-medium">
                Panel {current.id} of {panels.length}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-white font-normal mt-1 mb-1">
                {current.title}
              </h3>
              <p className="text-xs sm:text-sm font-serif italic text-pink-200 mb-4">
                {current.subtitle}
              </p>

              <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed mb-5">
                {current.description}
              </p>

              <div className="border-l-2 border-amber-300/60 pl-3 py-1">
                <p className="text-xs font-serif italic text-amber-200/90">
                  {current.quote}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Selector Pills */}
        <div className="flex items-center gap-2 mt-5">
          {panels.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => handleSelect(idx)}
              className={`px-3 py-1.5 rounded-full text-xs font-sans transition-all cursor-pointer ${
                activeIndex === idx
                  ? 'bg-amber-300 text-neutral-950 font-semibold shadow-[0_0_12px_rgba(251,191,36,0.5)]'
                  : 'bg-white/10 hover:bg-white/20 text-neutral-300'
              }`}
            >
              {p.title}
            </button>
          ))}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="mt-4 flex items-center justify-center">
        <button
          onClick={onContinue}
          className="px-7 py-3 rounded-full bg-gradient-to-r from-pink-500 via-rose-400 to-amber-300 text-neutral-950 font-medium font-sans text-sm tracking-wide shadow-[0_0_20px_rgba(244,114,182,0.35)] hover:shadow-[0_0_30px_rgba(251,191,36,0.5)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
        >
          <span>Witness The Grand Finale</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
