/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BackgroundStarfield } from './components/BackgroundStarfield';
import { PetalOverlay } from './components/PetalOverlay';
import { AudioPlayer } from './components/AudioPlayer';
import { NavigationRail, SCENES } from './components/NavigationRail';
import { Scene1Welcome } from './scenes/Scene1Welcome';
import { Scene2Reveal } from './scenes/Scene2Reveal';
import { Scene3Garden } from './scenes/Scene3Garden';
import { Scene4Cake } from './scenes/Scene4Cake';
import { Scene5GiftRoom } from './scenes/Scene5GiftRoom';
import { Scene6Letter } from './scenes/Scene6Letter';
import { Scene7Gallery } from './scenes/Scene7Gallery';
import { Scene8Finale } from './scenes/Scene8Finale';
import { BIRTHDAY_CONFIG } from './config/birthdayData';
import { Sparkles, Heart } from 'lucide-react';

export default function App() {
  const [currentScene, setCurrentScene] = useState<number>(1);
  const [unlockedScenes, setUnlockedScenes] = useState<number[]>([1]);
  const [autoStartAudio, setAutoStartAudio] = useState(false);

  const goToScene = (sceneId: number) => {
    setCurrentScene(sceneId);
    if (!unlockedScenes.includes(sceneId)) {
      setUnlockedScenes((prev) => [...prev, sceneId]);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSurprise = () => {
    setAutoStartAudio(true);
    goToScene(2);
  };

  return (
    <div className="relative min-h-screen bg-[#0b0d1b] text-neutral-100 flex flex-col justify-between selection:bg-pink-300 selection:text-neutral-900 overflow-x-hidden">
      {/* Background Starfield Canvas with Mouse Parallax & Shooting Stars */}
      <BackgroundStarfield currentScene={currentScene} />

      {/* Romantic Petal Drift Overlay on Celebration Scenes */}
      {currentScene >= 2 && currentScene <= 8 && (
        <PetalOverlay density={currentScene === 2 || currentScene === 8 ? 'high' : 'medium'} />
      )}

      {/* Elegant Top Bar (Adhering to Top Bar Contract) */}
      <header className="relative z-30 flex items-center justify-between gap-4 px-4 sm:px-8 py-3.5 border-b border-white/10 backdrop-blur-md bg-[#0b0d1b]/60">
        {/* Zone 1: Single Brand Wordmark */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => goToScene(1)}
            className="flex items-center gap-2 group cursor-pointer text-left"
            title="Return to Welcome"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-pink-400 to-amber-300 flex items-center justify-center text-neutral-950 font-serif font-bold text-sm shadow-[0_0_10px_rgba(251,191,36,0.4)]">
              V
            </div>
            <div>
              <span className="font-serif text-base sm:text-lg text-white font-medium tracking-wide whitespace-nowrap block">
                A Little Universe
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Single-line Clean Nav Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-5 text-xs text-neutral-300"
        >
          <button
            onClick={() => goToScene(2)}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentScene === 2 ? 'text-amber-300 font-medium' : 'hover:text-white'
            }`}
          >
            Reveal
          </button>
          <button
            onClick={() => goToScene(3)}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentScene === 3 ? 'text-amber-300 font-medium' : 'hover:text-white'
            }`}
          >
            Garden
          </button>
          <button
            onClick={() => goToScene(4)}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentScene === 4 ? 'text-amber-300 font-medium' : 'hover:text-white'
            }`}
          >
            Cake
          </button>
          <button
            onClick={() => goToScene(5)}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentScene === 5 ? 'text-amber-300 font-medium' : 'hover:text-white'
            }`}
          >
            Gifts
          </button>
          <button
            onClick={() => goToScene(6)}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentScene === 6 ? 'text-amber-300 font-medium' : 'hover:text-white'
            }`}
          >
            Letter
          </button>
          <button
            onClick={() => goToScene(7)}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentScene === 7 ? 'text-amber-300 font-medium' : 'hover:text-white'
            }`}
          >
            Gallery
          </button>
          <button
            onClick={() => goToScene(8)}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentScene === 8 ? 'text-amber-300 font-medium' : 'hover:text-white'
            }`}
          >
            Finale
          </button>
        </nav>

        {/* Zone 3: Audio Controller Action */}
        <div className="flex items-center gap-3 shrink-0">
          <AudioPlayer onAutoStartRequested={autoStartAudio} />
        </div>
      </header>

      {/* Main Experience Viewport */}
      <main className="relative z-10 flex-1 flex flex-col justify-center pb-20">
        {currentScene === 1 && <Scene1Welcome onOpenSurprise={handleOpenSurprise} />}
        {currentScene === 2 && <Scene2Reveal onContinue={() => goToScene(3)} />}
        {currentScene === 3 && <Scene3Garden onContinue={() => goToScene(4)} />}
        {currentScene === 4 && <Scene4Cake onContinue={() => goToScene(5)} />}
        {currentScene === 5 && <Scene5GiftRoom onContinue={() => goToScene(6)} />}
        {currentScene === 6 && <Scene6Letter onContinue={() => goToScene(7)} />}
        {currentScene === 7 && <Scene7Gallery onContinue={() => goToScene(8)} />}
        {currentScene === 8 && (
          <Scene8Finale
            onRestartJourney={() => goToScene(1)}
            onReturnToWorld={() => goToScene(2)}
          />
        )}
      </main>

      {/* Persistent Scene Stepper & Floating Navigation Rail */}
      <NavigationRail
        currentScene={currentScene}
        onSelectScene={goToScene}
        unlockedScenes={unlockedScenes}
      />

      {/* Subtle Curatorial Footer */}
      <footer className="relative z-10 py-3 px-4 text-center text-[11px] text-neutral-400 font-sans border-t border-white/5 bg-[#0b0d1b]/40">
        <p>
          Dedicated to Vasilisa · Celebrating October 13 · Crafted with warmth, friendship & stardust
        </p>
      </footer>
    </div>
  );
}
