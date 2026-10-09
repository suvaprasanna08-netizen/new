import React, { useState } from 'react';
import { Sparkles, ArrowRight, X, Heart, Eye } from 'lucide-react';
import { BIRTHDAY_CONFIG, GardenSecret } from '../config/birthdayData';
import { audioEngine } from '../utils/audio';

interface Scene3GardenProps {
  onContinue: () => void;
}

export const Scene3Garden: React.FC<Scene3GardenProps> = ({ onContinue }) => {
  const [selectedSecret, setSelectedSecret] = useState<GardenSecret | null>(null);
  const [bloomedFlowers, setBloomedFlowers] = useState<string[]>([]);
  const [butterflyActive, setButterflyActive] = useState<string | null>(null);
  const [discoveredCount, setDiscoveredCount] = useState<number>(0);
  const [discoveredIds, setDiscoveredIds] = useState<Set<string>>(new Set());

  const handleInteract = (secret: GardenSecret) => {
    audioEngine.playSoundEffect(
      secret.type === 'flower' ? 'sparkle' : secret.type === 'lantern' ? 'chime' : 'bell'
    );
    setSelectedSecret(secret);

    if (!discoveredIds.has(secret.id)) {
      const next = new Set(discoveredIds);
      next.add(secret.id);
      setDiscoveredIds(next);
      setDiscoveredCount(next.size);
    }
  };

  const handleFlowerBloom = (id: string, secret?: GardenSecret) => {
    audioEngine.playSoundEffect('sparkle');
    if (!bloomedFlowers.includes(id)) {
      setBloomedFlowers([...bloomedFlowers, id]);
    }
    if (secret) {
      handleInteract(secret);
    }
  };

  const handleButterflyClick = (id: string) => {
    audioEngine.playSoundEffect('sparkle');
    setButterflyActive(id);
    setTimeout(() => {
      setButterflyActive(null);
    }, 1800);
  };

  return (
    <div className="relative min-h-[95vh] flex flex-col items-center justify-between px-4 py-8 max-w-6xl mx-auto select-none">
      {/* Header section */}
      <div className="text-center z-10 max-w-xl mx-auto pt-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-pink-300/30 text-[11px] uppercase tracking-widest text-pink-200 mb-2 font-sans">
          <Sparkles className="w-3 h-3 text-pink-300" />
          <span>Interactive Botanical Haven</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-white font-normal">
          {BIRTHDAY_CONFIG.garden.title}
        </h2>
        <p className="text-xs sm:text-sm text-neutral-300 mt-2 font-sans max-w-md mx-auto">
          {BIRTHDAY_CONFIG.garden.subtitle}
        </p>

        {/* Discovery tracker badge */}
        <div className="mt-3 inline-flex items-center gap-2 text-xs text-amber-200 font-sans">
          <span>Wishes Discovered:</span>
          <span className="font-semibold px-2 py-0.5 rounded-full bg-amber-400/20 border border-amber-300/40">
            {discoveredCount} / {BIRTHDAY_CONFIG.garden.secrets.length}
          </span>
        </div>
      </div>

      {/* The Interactive Garden Landscape Canvas / SVG Stage */}
      <div className="relative w-full my-6 min-h-[460px] sm:min-h-[520px] rounded-3xl bg-gradient-to-b from-[#161738]/80 via-[#1b1c3e]/90 to-[#0e1026] border border-amber-200/20 backdrop-blur-md overflow-hidden shadow-2xl flex flex-col justify-end p-4 sm:p-8">
        {/* Garden Archway Silhouette in Background */}
        <div className="absolute inset-x-0 top-0 h-48 pointer-events-none opacity-40">
          <svg viewBox="0 0 800 240" className="w-full h-full" preserveAspectRatio="none">
            <path
              d="M 50 240 C 150 40, 650 40, 750 240"
              stroke="#fbbf24"
              strokeWidth="2"
              fill="none"
              strokeDasharray="6 4"
            />
            {/* Hanging fairy lights along arch */}
            {[150, 250, 350, 450, 550, 650].map((cx, i) => (
              <g key={i}>
                <line x1={cx} y1={90 + (i % 2) * 15} x2={cx} y2={125 + (i % 2) * 15} stroke="#fef08a" strokeWidth="1" />
                <circle cx={cx} cy={125 + (i % 2) * 15} r="5" fill="#fef08a" className="animate-pulse" />
              </g>
            ))}
          </svg>
        </div>

        {/* Floating Wishing Stars in the Sky */}
        <div className="absolute top-6 left-8 sm:left-16 z-20">
          <button
            onClick={() => handleInteract(BIRTHDAY_CONFIG.garden.secrets[3])}
            className="group flex flex-col items-center gap-1 cursor-pointer transition-transform hover:scale-125 focus:outline-none"
            title="Click the North Star"
            aria-label="Cosmic Wishing Star"
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-amber-300/20 border border-amber-300/60 flex items-center justify-center text-amber-200 shadow-[0_0_18px_rgba(251,191,36,0.8)] animate-twinkle">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 fill-amber-200" />
            </div>
            <span className="text-[10px] text-amber-200/80 tracking-wide font-sans opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 px-1.5 py-0.5 rounded">
              Cosmic Star
            </span>
          </button>
        </div>

        <div className="absolute top-10 right-8 sm:right-20 z-20">
          <button
            onClick={() => handleInteract(BIRTHDAY_CONFIG.garden.secrets[4])}
            className="group flex flex-col items-center gap-1 cursor-pointer transition-transform hover:scale-125 focus:outline-none"
            title="Click the Wishing Star"
            aria-label="Wishing Star"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-pink-300/20 border border-pink-300/60 flex items-center justify-center text-pink-200 shadow-[0_0_16px_rgba(244,114,182,0.8)] animate-twinkle" style={{ animationDelay: '800ms' }}>
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 fill-pink-200" />
            </div>
            <span className="text-[10px] text-pink-200/80 tracking-wide font-sans opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 px-1.5 py-0.5 rounded">
              Wishing Star
            </span>
          </button>
        </div>

        {/* Interactive Butterflies */}
        <div
          className={`absolute top-24 left-[35%] sm:left-[42%] z-20 transition-all duration-1000 ${
            butterflyActive === 'bf-1' ? '-translate-y-16 translate-x-12 scale-125' : ''
          }`}
        >
          <button
            onClick={() => handleButterflyClick('bf-1')}
            className="group flex items-center gap-1.5 p-2 rounded-full cursor-pointer focus:outline-none"
            title="Touch the enchanted butterfly"
            aria-label="Enchanted Butterfly"
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 40 40"
              className="fill-none animate-wing-flutter filter drop-shadow-[0_0_10px_rgba(244,114,182,0.7)]"
            >
              {/* Left wing */}
              <ellipse cx="14" cy="16" rx="10" ry="14" fill="#f472b6" fillOpacity="0.85" />
              <ellipse cx="16" cy="24" rx="7" ry="10" fill="#fbcfe8" fillOpacity="0.85" />
              {/* Right wing */}
              <ellipse cx="26" cy="16" rx="10" ry="14" fill="#f472b6" fillOpacity="0.85" />
              <ellipse cx="24" cy="24" rx="7" ry="10" fill="#fbcfe8" fillOpacity="0.85" />
              {/* Body */}
              <line x1="20" y1="10" x2="20" y2="30" stroke="#fde047" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <span className="text-[10px] text-pink-300 font-sans opacity-0 group-hover:opacity-100 bg-black/50 px-1 rounded">
              Touch Me
            </span>
          </button>
        </div>

        {/* Botanical Garden Foreground with Flowers & Glowing Lanterns */}
        <div className="relative z-10 w-full grid grid-cols-2 sm:grid-cols-4 gap-4 items-end mt-auto pt-16">
          {/* Item 1: Velvet Rose */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => handleFlowerBloom('rose', BIRTHDAY_CONFIG.garden.secrets[5])}
              className="group flex flex-col items-center cursor-pointer focus:outline-none"
              title="Click to bloom the Velvet Rose"
              aria-label="Velvet Rose"
            >
              <div
                className={`transition-transform duration-700 ${
                  bloomedFlowers.includes('rose') ? 'scale-125' : 'hover:scale-110'
                }`}
              >
                <svg width="68" height="96" viewBox="0 0 68 96" fill="none">
                  {/* Stem & Leaves */}
                  <path d="M34 45 Q35 75 34 96" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" />
                  <path d="M34 65 Q18 58 22 75" stroke="#4ade80" strokeWidth="2.5" fill="#22c55e" fillOpacity="0.5" />
                  <path d="M34 55 Q50 48 46 65" stroke="#4ade80" strokeWidth="2.5" fill="#22c55e" fillOpacity="0.5" />

                  {/* Rose Blossom with opening petals */}
                  <circle cx="34" cy="30" r="22" fill="#be185d" fillOpacity="0.3" className="animate-pulse" />
                  <ellipse cx="34" cy="32" rx="18" ry="16" fill="#e11d48" />
                  <ellipse cx="30" cy="28" rx="12" ry="12" fill="#f43f5e" />
                  <ellipse cx="37" cy="29" rx="10" ry="10" fill="#fb7185" />
                  <circle cx="34" cy="27" r="6" fill="#fecdd3" />
                  <circle cx="34" cy="27" r="2.5" fill="#fde047" />
                </svg>
              </div>
              <span className="text-xs font-serif text-pink-200 mt-1 group-hover:text-amber-200">
                Velvet Rose
              </span>
              <span className="text-[10px] text-neutral-400 font-sans">
                {bloomedFlowers.includes('rose') ? 'Bloomed · Click to view' : 'Touch to bloom'}
              </span>
            </button>
          </div>

          {/* Item 2: Lantern of Joy */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => handleInteract(BIRTHDAY_CONFIG.garden.secrets[0])}
              className="group flex flex-col items-center cursor-pointer focus:outline-none"
              title="Click to reveal Lantern of Joy"
              aria-label="Lantern of Joy"
            >
              <div className="relative hover:scale-110 transition-transform duration-300">
                {/* Lantern fixture */}
                <svg width="64" height="90" viewBox="0 0 64 90" fill="none">
                  <path d="M32 0 L32 18" stroke="#fbbf24" strokeWidth="2" />
                  <polygon points="18,18 46,18 40,26 24,26" fill="#d97706" />
                  {/* Glass pane with glowing flame */}
                  <rect
                    x="20"
                    y="26"
                    width="24"
                    height="36"
                    rx="4"
                    fill="#fef08a"
                    fillOpacity="0.25"
                    stroke="#fbbf24"
                    strokeWidth="1.5"
                  />
                  {/* Inner flame */}
                  <ellipse
                    cx="32"
                    cy="44"
                    rx="6"
                    ry="10"
                    fill="#f59e0b"
                    className="animate-flame"
                  />
                  <polygon points="22,62 42,62 38,70 26,70" fill="#b45309" />
                  <circle cx="32" cy="74" r="3" fill="#fbbf24" />
                </svg>
                {/* Glow aura */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-14 h-14 bg-amber-400/30 rounded-full blur-md pointer-events-none animate-pulse" />
              </div>
              <span className="text-xs font-serif text-amber-200 mt-1 group-hover:text-white">
                Lantern of Joy
              </span>
              <span className="text-[10px] text-neutral-400 font-sans">Reveals a wish</span>
            </button>
          </div>

          {/* Item 3: Lantern of Adventures */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => handleInteract(BIRTHDAY_CONFIG.garden.secrets[1])}
              className="group flex flex-col items-center cursor-pointer focus:outline-none"
              title="Click to reveal Lantern of Adventures"
              aria-label="Lantern of Adventures"
            >
              <div className="relative hover:scale-110 transition-transform duration-300">
                <svg width="64" height="90" viewBox="0 0 64 90" fill="none">
                  <path d="M32 0 L32 18" stroke="#c084fc" strokeWidth="2" />
                  <polygon points="18,18 46,18 40,26 24,26" fill="#7e22ce" />
                  <rect
                    x="20"
                    y="26"
                    width="24"
                    height="36"
                    rx="4"
                    fill="#e9d5ff"
                    fillOpacity="0.25"
                    stroke="#c084fc"
                    strokeWidth="1.5"
                  />
                  <ellipse
                    cx="32"
                    cy="44"
                    rx="6"
                    ry="10"
                    fill="#a855f7"
                    className="animate-flame"
                  />
                  <polygon points="22,62 42,62 38,70 26,70" fill="#6b21a8" />
                  <circle cx="32" cy="74" r="3" fill="#c084fc" />
                </svg>
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-14 h-14 bg-purple-400/30 rounded-full blur-md pointer-events-none animate-pulse" />
              </div>
              <span className="text-xs font-serif text-purple-200 mt-1 group-hover:text-white">
                Lantern of Horizons
              </span>
              <span className="text-[10px] text-neutral-400 font-sans">Reveals a wish</span>
            </button>
          </div>

          {/* Item 4: Golden Tulip */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => handleFlowerBloom('tulip', BIRTHDAY_CONFIG.garden.secrets[6])}
              className="group flex flex-col items-center cursor-pointer focus:outline-none"
              title="Click to bloom the Golden Tulip"
              aria-label="Golden Tulip"
            >
              <div
                className={`transition-transform duration-700 ${
                  bloomedFlowers.includes('tulip') ? 'scale-125' : 'hover:scale-110'
                }`}
              >
                <svg width="68" height="96" viewBox="0 0 68 96" fill="none">
                  <path d="M34 48 Q33 76 34 96" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" />
                  <path d="M34 68 Q52 56 46 80" stroke="#4ade80" strokeWidth="2" fill="#22c55e" fillOpacity="0.5" />
                  {/* Tulip Cup petals */}
                  <ellipse cx="34" cy="32" rx="16" ry="18" fill="#fbbf24" />
                  <path d="M22 26 C22 42 34 46 34 46 C34 46 22 36 22 26 Z" fill="#f59e0b" />
                  <path d="M46 26 C46 42 34 46 34 46 C34 46 46 36 46 26 Z" fill="#f59e0b" />
                  <ellipse cx="34" cy="22" rx="6" ry="10" fill="#fef08a" />
                </svg>
              </div>
              <span className="text-xs font-serif text-amber-200 mt-1 group-hover:text-white">
                Golden Tulip
              </span>
              <span className="text-[10px] text-neutral-400 font-sans">
                {bloomedFlowers.includes('tulip') ? 'Bloomed · Click to view' : 'Touch to bloom'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Secret Message Dialog / Modal */}
      {selectedSecret && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="garden-secret-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in"
        >
          <div className="relative max-w-md w-full bg-[#181938] border border-amber-300/40 rounded-2xl p-6 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.8)] text-white">
            <button
              onClick={() => setSelectedSecret(null)}
              className="absolute top-4 right-4 p-1 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close message"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2 text-amber-300">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-sans tracking-widest uppercase font-medium">
                {selectedSecret.name}
              </span>
            </div>

            <h3 id="garden-secret-title" className="text-xl sm:text-2xl font-serif text-pink-200 mb-3">
              {selectedSecret.title}
            </h3>

            <p className="text-sm text-neutral-200 font-sans leading-relaxed mb-6 bg-white/5 p-4 rounded-xl border border-white/10">
              {selectedSecret.message}
            </p>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedSecret(null)}
                className="px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 to-amber-300 text-neutral-950 font-medium text-xs sm:text-sm hover:scale-105 transition-transform cursor-pointer"
              >
                Keep in My Heart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Navigation */}
      <div className="mt-4 flex items-center justify-center">
        <button
          onClick={onContinue}
          className="px-7 py-3 rounded-full bg-gradient-to-r from-pink-500 via-rose-400 to-amber-300 text-neutral-950 font-medium font-sans text-sm tracking-wide shadow-[0_0_20px_rgba(244,114,182,0.35)] hover:shadow-[0_0_30px_rgba(251,191,36,0.5)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
        >
          <span>Continue to The Birthday Cake</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
