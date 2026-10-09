import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Compass, Sparkles, X } from 'lucide-react';
import { audioEngine } from '../utils/audio';

export interface SceneMeta {
  id: number;
  title: string;
  shortLabel: string;
}

export const SCENES: SceneMeta[] = [
  { id: 1, title: 'The Mysterious Welcome', shortLabel: 'Welcome' },
  { id: 2, title: 'The Grand Reveal', shortLabel: 'Reveal' },
  { id: 3, title: 'The Enchanted Garden', shortLabel: 'Garden' },
  { id: 4, title: 'Birthday Cake Ceremony', shortLabel: 'Cake' },
  { id: 5, title: 'The Gift Room', shortLabel: 'Presents' },
  { id: 6, title: 'The Heartfelt Letter', shortLabel: 'Letter' },
  { id: 7, title: 'Celebration Gallery', shortLabel: 'Gallery' },
  { id: 8, title: 'The Grand Finale', shortLabel: 'Finale' },
];

interface NavigationRailProps {
  currentScene: number;
  onSelectScene: (sceneId: number) => void;
  unlockedScenes: number[];
}

export const NavigationRail: React.FC<NavigationRailProps> = ({
  currentScene,
  onSelectScene,
  unlockedScenes,
}) => {
  const [showDrawer, setShowDrawer] = useState(false);

  const handlePrev = () => {
    if (currentScene > 1) {
      audioEngine.playSoundEffect('chime');
      onSelectScene(currentScene - 1);
    }
  };

  const handleNext = () => {
    if (currentScene < 8) {
      audioEngine.playSoundEffect('chime');
      onSelectScene(currentScene + 1);
    }
  };

  const handleSelect = (id: number) => {
    audioEngine.playSoundEffect('sparkle');
    onSelectScene(id);
    setShowDrawer(false);
  };

  return (
    <>
      {/* Floating Bottom Quick Navigator */}
      <nav
        aria-label="Scene Navigation"
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5 p-1.5 rounded-full bg-[#101229]/80 border border-white/15 backdrop-blur-md shadow-2xl transition-all duration-300"
      >
        <button
          onClick={handlePrev}
          disabled={currentScene === 1}
          className="p-2 rounded-full text-neutral-300 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
          aria-label="Previous scene"
          title="Previous Scene"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Scene progress dots with labels on desktop */}
        <div className="flex items-center gap-1 px-1">
          {SCENES.map((s) => {
            const isActive = currentScene === s.id;
            const isUnlocked = unlockedScenes.includes(s.id);
            return (
              <button
                key={s.id}
                onClick={() => handleSelect(s.id)}
                className={`relative group flex items-center justify-center transition-all cursor-pointer ${
                  isActive
                    ? 'w-7 h-7 rounded-full bg-gradient-to-r from-pink-400 to-amber-300 text-neutral-950 font-bold text-xs shadow-[0_0_12px_rgba(251,191,36,0.5)]'
                    : 'w-6 h-6 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 text-xs'
                }`}
                aria-label={`Jump to ${s.title}`}
                title={s.title}
              >
                <span>{s.id}</span>
                {/* Tooltip */}
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-black/90 text-[10px] text-neutral-200 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 border border-white/10">
                  {s.title}
                </span>
              </button>
            );
          })}
        </div>

        <button
          onClick={handleNext}
          disabled={currentScene === 8}
          className="p-2 rounded-full text-neutral-300 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
          aria-label="Next scene"
          title="Next Scene"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <div className="w-px h-4 bg-white/20 mx-0.5" />

        <button
          onClick={() => setShowDrawer(true)}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs text-neutral-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          title="Open Universe Map"
          aria-label="Open Chapter Map"
        >
          <Compass className="w-3.5 h-3.5 text-amber-300" />
          <span className="hidden md:inline font-serif tracking-wide text-xs">Scenes</span>
        </button>
      </nav>

      {/* Universe Map Modal / Drawer */}
      {showDrawer && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="universe-scenes-heading"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
        >
          <div className="relative w-full max-w-lg bg-[#141630] border border-amber-200/30 rounded-2xl p-6 shadow-2xl text-white overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <p className="text-[11px] tracking-widest uppercase text-amber-300 font-sans">
                  The Journey Map
                </p>
                <h3 id="universe-scenes-heading" className="text-xl font-serif text-white mt-0.5">
                  A Little Universe for Vasilisa
                </h3>
              </div>
              <button
                onClick={() => setShowDrawer(false)}
                className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close universe map"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-5 max-h-[60vh] overflow-y-auto pr-1">
              {SCENES.map((scene) => {
                const isActive = currentScene === scene.id;
                return (
                  <button
                    key={scene.id}
                    onClick={() => handleSelect(scene.id)}
                    className={`flex items-start gap-3 p-3 rounded-xl text-left border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-br from-pink-500/20 to-purple-600/30 border-amber-300/60 shadow-[0_0_16px_rgba(251,191,36,0.15)]'
                        : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'
                    }`}
                  >
                    <span
                      className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold shrink-0 mt-0.5 ${
                        isActive
                          ? 'bg-amber-300 text-neutral-950'
                          : 'bg-white/10 text-neutral-300'
                      }`}
                    >
                      {scene.id}
                    </span>
                    <div className="min-w-0">
                      <p className="font-serif text-sm text-neutral-100 font-medium truncate">
                        {scene.title}
                      </p>
                      <p className="text-[11px] text-neutral-400 mt-0.5">
                        {scene.id === 1 && 'Starry opening & sealed envelope'}
                        {scene.id === 2 && 'Floral reveal & cosmic greetings'}
                        {scene.id === 3 && 'Botanical garden & hidden wishes'}
                        {scene.id === 4 && 'Multi-tier cake & candle wishes'}
                        {scene.id === 5 && 'Four luxurious presents'}
                        {scene.id === 6 && 'Wax-sealed personal letter'}
                        {scene.id === 7 && 'Celestial celebration gallery'}
                        {scene.id === 8 && 'Grand fireworks & golden finale'}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 pt-3 border-t border-white/10 flex justify-between items-center text-xs text-neutral-400">
              <span>Birthday · October 13</span>
              <button
                onClick={() => setShowDrawer(false)}
                className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-neutral-200 transition-colors cursor-pointer"
              >
                Close Map
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
