import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Gift, Lock, Unlock, Sparkles, X, Heart, ArrowRight } from 'lucide-react';
import { BIRTHDAY_CONFIG, GiftItem } from '../config/birthdayData';
import { audioEngine } from '../utils/audio';

interface Scene5GiftRoomProps {
  onContinue: () => void;
}

export const Scene5GiftRoom: React.FC<Scene5GiftRoomProps> = ({ onContinue }) => {
  const [openedGifts, setOpenedGifts] = useState<number[]>([]);
  const [activeGiftModal, setActiveGiftModal] = useState<GiftItem | null>(null);
  const [isUnlockingSecret, setIsUnlockingSecret] = useState(false);
  const [secretUnlocked, setSecretUnlocked] = useState(false);

  const handleOpenGift = (gift: GiftItem) => {
    if (gift.isLocked && !secretUnlocked) {
      // Trigger unlocking anticipation
      setIsUnlockingSecret(true);
      audioEngine.playSoundEffect('wish');

      setTimeout(() => {
        setIsUnlockingSecret(false);
        setSecretUnlocked(true);
        audioEngine.playSoundEffect('sparkle');
        setActiveGiftModal(gift);
        if (!openedGifts.includes(gift.id)) {
          setOpenedGifts([...openedGifts, gift.id]);
        }
      }, 1400);
      return;
    }

    audioEngine.playSoundEffect('envelope');
    setActiveGiftModal(gift);

    if (!openedGifts.includes(gift.id)) {
      setOpenedGifts([...openedGifts, gift.id]);
    }

    // Playful surprise gets mini confetti
    if (gift.id === 2) {
      setTimeout(() => {
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#a855f7', '#f472b6', '#fde047'],
          });
        } catch {
          // Graceful
        }
      }, 200);
    }
  };

  return (
    <div className="relative min-h-[95vh] flex flex-col items-center justify-between px-4 py-8 max-w-6xl mx-auto select-none">
      {/* Header */}
      <div className="text-center z-10 max-w-xl mx-auto pt-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-pink-300/30 text-[11px] uppercase tracking-widest text-pink-200 mb-2 font-sans">
          <Gift className="w-3 h-3 text-pink-300" />
          <span>The Birthday Parlour</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-white font-normal">
          The Gift Room
        </h2>
        <p className="text-xs sm:text-sm text-neutral-300 mt-2 font-sans max-w-md mx-auto">
          Four hand-wrapped presents prepared with warmth and care. Select each ribbon to unwrap its surprise.
        </p>

        {/* Progress Tracker */}
        <div className="mt-3 inline-flex items-center gap-2 text-xs text-amber-200 font-sans">
          <span>Presents Unwrapped:</span>
          <span className="font-semibold px-2 py-0.5 rounded-full bg-pink-400/20 border border-pink-300/40">
            {openedGifts.length} / {BIRTHDAY_CONFIG.gifts.length}
          </span>
        </div>
      </div>

      {/* Grid of Four Interactive Gifts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full my-8 items-stretch">
        {BIRTHDAY_CONFIG.gifts.map((gift) => {
          const isOpened = openedGifts.includes(gift.id);
          const isLocked = gift.isLocked && !secretUnlocked;

          return (
            <div
              key={gift.id}
              className={`group relative flex flex-col items-center justify-between p-6 rounded-2xl border transition-all duration-300 backdrop-blur-md cursor-pointer ${
                isOpened
                  ? 'bg-white/10 border-pink-300/50 shadow-[0_0_20px_rgba(244,114,182,0.2)]'
                  : 'bg-white/5 border-white/15 hover:border-amber-200/50 hover:bg-white/10 hover:-translate-y-1.5 shadow-lg hover:shadow-2xl'
              }`}
              onClick={() => handleOpenGift(gift)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOpenGift(gift);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Open present ${gift.title}`}
            >
              {/* Top Tag */}
              <div className="w-full flex items-center justify-between text-xs text-neutral-400 mb-4">
                <span className="font-serif italic text-amber-200/80">Gift #{gift.id}</span>
                {isLocked ? (
                  <span className="flex items-center gap-1 text-amber-300 text-[11px]">
                    <Lock className="w-3 h-3" /> Locked
                  </span>
                ) : isOpened ? (
                  <span className="text-pink-300 text-[11px] font-medium">Unwrapped</span>
                ) : (
                  <span className="text-neutral-400 text-[11px]">Touch to open</span>
                )}
              </div>

              {/* The Illustrated Present Box */}
              <div className="relative w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center my-2">
                {/* SVG Gift Box */}
                <svg viewBox="0 0 160 160" className="w-full h-full filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)]">
                  {/* Shadow */}
                  <ellipse cx="80" cy="148" rx="65" ry="10" fill="#000000" fillOpacity="0.35" />

                  {/* Box Body */}
                  <rect
                    x="24"
                    y="55"
                    width="112"
                    height="85"
                    rx="6"
                    fill={gift.boxColor}
                    stroke={gift.accentColor}
                    strokeWidth="1.5"
                  />

                  {/* Pattern on Box */}
                  {gift.pattern === 'dots' && (
                    <g fill={gift.ribbonColor} fillOpacity="0.35">
                      {[36, 52, 68, 84, 100, 116].map((x) =>
                        [70, 90, 110, 125].map((y) => (
                          <circle key={`${x}-${y}`} cx={x} cy={y} r="2.5" />
                        ))
                      )}
                    </g>
                  )}
                  {gift.pattern === 'stripes' && (
                    <g stroke={gift.ribbonColor} strokeWidth="2.5" strokeOpacity="0.4">
                      <line x1="40" y1="55" x2="40" y2="140" />
                      <line x1="56" y1="55" x2="56" y2="140" />
                      <line x1="104" y1="55" x2="104" y2="140" />
                      <line x1="120" y1="55" x2="120" y2="140" />
                    </g>
                  )}
                  {gift.pattern === 'stars' && (
                    <g fill="#fbbf24" fillOpacity="0.6">
                      <circle cx="45" cy="75" r="2" />
                      <circle cx="115" cy="80" r="2.5" />
                      <circle cx="50" cy="120" r="2" />
                      <circle cx="110" cy="120" r="2.5" />
                    </g>
                  )}

                  {/* Vertical Ribbon */}
                  <rect
                    x="71"
                    y="55"
                    width="18"
                    height="85"
                    fill={gift.ribbonColor}
                  />

                  {/* Box Lid */}
                  <rect
                    x="18"
                    y="42"
                    width="124"
                    height="20"
                    rx="4"
                    fill={gift.boxColor}
                    stroke={gift.accentColor}
                    strokeWidth="1.5"
                  />
                  {/* Lid Ribbon */}
                  <rect
                    x="71"
                    y="42"
                    width="18"
                    height="20"
                    fill={gift.ribbonColor}
                  />

                  {/* Ribbon Bow on Top */}
                  <path
                    d="M 80 42 C 55 18 45 35 72 40 Z"
                    fill={gift.ribbonColor}
                    stroke={gift.accentColor}
                    strokeWidth="1"
                  />
                  <path
                    d="M 80 42 C 105 18 115 35 88 40 Z"
                    fill={gift.ribbonColor}
                    stroke={gift.accentColor}
                    strokeWidth="1"
                  />
                  <circle
                    cx="80"
                    cy="41"
                    r="6"
                    fill={gift.accentColor}
                  />

                  {/* Lock badge if locked */}
                  {isLocked && (
                    <g transform="translate(68, 85)">
                      <rect x="0" y="8" width="24" height="20" rx="3" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
                      <path d="M4 8 V4 A8 8 0 0 1 20 4 V8" fill="none" stroke="#fbbf24" strokeWidth="3" />
                      <circle cx="12" cy="18" r="2.5" fill="#78350f" />
                    </g>
                  )}
                </svg>

                {/* Anticipation glow when unlocking */}
                {isUnlockingSecret && gift.id === 4 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-amber-400/20 rounded-full animate-ping pointer-events-none" />
                )}
              </div>

              {/* Gift Title & Subtitle */}
              <div className="text-center mt-3">
                <h3 className="font-serif text-lg text-white font-medium group-hover:text-pink-200 transition-colors">
                  {gift.title}
                </h3>
                <p className="text-[11px] text-neutral-400 font-sans mt-0.5">
                  {gift.subtitle}
                </p>
              </div>

              {/* Action Button inside card */}
              <div className="mt-4 w-full">
                {isLocked ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenGift(gift);
                    }}
                    className="w-full py-2 px-3 rounded-full bg-amber-400/20 hover:bg-amber-400/30 border border-amber-300/40 text-amber-200 text-xs font-sans font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Unlock className="w-3.5 h-3.5" />
                    <span>{isUnlockingSecret ? 'Unlocking...' : 'Reveal the Secret'}</span>
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenGift(gift);
                    }}
                    className={`w-full py-2 px-3 rounded-full text-xs font-sans font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      isOpened
                        ? 'bg-pink-400/20 hover:bg-pink-400/30 text-pink-200 border border-pink-300/30'
                        : 'bg-white/10 hover:bg-white/20 text-neutral-200 border border-white/20'
                    }`}
                  >
                    <Gift className="w-3.5 h-3.5" />
                    <span>{isOpened ? 'Read Again' : 'Unwrap Gift'}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Gift Detail Modal */}
      {activeGiftModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="gift-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
        >
          <div className="relative max-w-lg w-full bg-[#181938] border border-amber-300/40 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.8)] text-white">
            <button
              onClick={() => setActiveGiftModal(null)}
              className="absolute top-5 right-5 p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close gift"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Gift Header */}
            <div className="flex items-center gap-2 mb-2 text-pink-300">
              <Gift className="w-4 h-4" />
              <span className="text-xs font-sans tracking-widest uppercase font-semibold">
                Gift #{activeGiftModal.id} · {activeGiftModal.title}
              </span>
            </div>

            <h3 id="gift-modal-title" className="text-2xl sm:text-3xl font-serif text-amber-100 mb-3">
              {activeGiftModal.messageTitle}
            </h3>

            {/* Message Body */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 my-4">
              <p className="text-sm sm:text-base text-neutral-200 font-sans leading-relaxed">
                {activeGiftModal.messageBody}
              </p>
              {activeGiftModal.quote && (
                <p className="text-xs font-serif italic text-amber-200/90 mt-4 border-t border-white/10 pt-3">
                  {activeGiftModal.quote}
                </p>
              )}
            </div>

            {/* Modal Controls */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-neutral-400 font-sans">
                A Little Universe for Vasilisa
              </span>
              <button
                onClick={() => setActiveGiftModal(null)}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-amber-300 text-neutral-950 font-medium text-xs sm:text-sm hover:scale-105 transition-transform cursor-pointer"
              >
                Close & Keep Gift
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
          <span>Read The Heartfelt Letter</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
