import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Play, Pause, Sparkles } from 'lucide-react';
import { audioEngine } from '../utils/audio';
import { BIRTHDAY_CONFIG } from '../config/birthdayData';

interface AudioPlayerProps {
  onAutoStartRequested?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ onAutoStartRequested }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  useEffect(() => {
    audioEngine.init(BIRTHDAY_CONFIG.audio.customAudioUrl);
  }, []);

  useEffect(() => {
    if (onAutoStartRequested && !isPlaying) {
      audioEngine.play();
      setIsPlaying(true);
    }
  }, [onAutoStartRequested, isPlaying]);

  const togglePlayback = () => {
    const playing = audioEngine.togglePlay();
    setIsPlaying(playing);
    if (playing) {
      audioEngine.playSoundEffect('sparkle');
    }
  };

  const toggleMute = () => {
    const muted = audioEngine.toggleMute();
    setIsMuted(muted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    audioEngine.setVolume(val);
    if (isMuted && val > 0) {
      setIsMuted(false);
      audioEngine.toggleMute();
    }
  };

  return (
    <div className="relative flex items-center gap-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-2 py-1 text-xs text-white shadow-lg transition-all duration-300 hover:bg-white/15">
      {/* Play / Pause toggle */}
      <button
        onClick={togglePlayback}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer ${
          isPlaying
            ? 'bg-pink-500/30 text-pink-200 shadow-[0_0_12px_rgba(244,114,182,0.4)]'
            : 'text-neutral-300 hover:text-white'
        }`}
        title={isPlaying ? 'Pause music' : 'Play peaceful birthday melody'}
        aria-label={isPlaying ? 'Pause music' : 'Play melody'}
      >
        {isPlaying ? (
          <>
            <Pause className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-medium">Melody</span>
          </>
        ) : (
          <>
            <Music className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-medium">Music</span>
          </>
        )}
      </button>

      {/* Pulsing audio wave visualizer */}
      {isPlaying && !isMuted && (
        <div className="flex items-center gap-0.5 px-1 h-3" aria-hidden="true">
          <span className="w-0.5 h-2 bg-pink-300 rounded-full animate-pulse" />
          <span className="w-0.5 h-3.5 bg-amber-300 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
          <span className="w-0.5 h-1.5 bg-purple-300 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
        </div>
      )}

      {/* Mute button */}
      <button
        onClick={toggleMute}
        className="p-1 rounded-full text-neutral-300 hover:text-white transition-colors cursor-pointer"
        title={isMuted ? 'Unmute' : 'Mute'}
        aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
      >
        {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-300" /> : <Volume2 className="w-3.5 h-3.5" />}
      </button>

      {/* Volume slider toggle */}
      <div className="relative">
        <button
          onClick={() => setShowVolumeSlider(!showVolumeSlider)}
          className="p-1 rounded-full text-neutral-400 hover:text-white transition-colors cursor-pointer text-[10px]"
          title="Volume options"
          aria-label="Volume slider"
        >
          {Math.round(volume * 100)}%
        </button>

        {showVolumeSlider && (
          <div className="absolute right-0 top-full mt-2 p-2 bg-[#12132b]/95 border border-white/20 rounded-xl shadow-2xl backdrop-blur-md z-50 flex flex-col gap-2 w-32">
            <span className="text-[10px] text-neutral-300 font-medium">Volume</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full accent-pink-400 cursor-pointer h-1.5 bg-white/20 rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
};
