'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function SoundManager() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize Audio Context
  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Sound effect descriptions for developers
  const soundEffects = {
    animalFeed: '🍎 Feed sound - cheerful ping',
    plantWater: '💧 Water sound - gentle splash',
    weatherChange: '🌤️ Weather change - whoosh',
    badgeEarn: '🏆 Badge earned - celebration fanfare',
    creatureDiscovery: '✨ Discovery - magical sparkle',
    buttonTap: '👆 Button tap - soft pop',
  };

  const playTone = (frequency: number, duration: number, type: OscillatorType = 'sine') => {
    if (!audioContextRef.current || !soundEnabled) return;

    const audioContext = audioContextRef.current;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;
    gainNode.gain.value = volume * 0.3; // Scale down to prevent harsh sounds

    const now = audioContext.currentTime;
    gainNode.gain.setValueAtTime(volume * 0.3, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);

    oscillator.start(now);
    oscillator.stop(now + duration);
  };

  const playSound = (soundType: keyof typeof soundEffects) => {
    if (!soundEnabled || !audioContextRef.current) return;
    
    console.log(`🔊 Playing: ${soundEffects[soundType]}`);

    // Resume audio context if it's suspended (browser autoplay policy)
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }

    switch (soundType) {
      case 'animalFeed':
        // Cheerful ping - ascending notes
        playTone(523.25, 0.1, 'sine'); // C5
        setTimeout(() => playTone(659.25, 0.1, 'sine'), 80); // E5
        setTimeout(() => playTone(783.99, 0.15, 'sine'), 160); // G5
        break;

      case 'plantWater':
        // Water splash - descending gentle tones
        playTone(1046.50, 0.1, 'sine'); // C6
        setTimeout(() => playTone(880.00, 0.12, 'sine'), 60); // A5
        setTimeout(() => playTone(698.46, 0.15, 'sine'), 120); // F5
        break;

      case 'weatherChange':
        // Whoosh - sweep
        playTone(200, 0.3, 'sawtooth');
        setTimeout(() => playTone(400, 0.2, 'sawtooth'), 100);
        break;

      case 'badgeEarn':
        // Celebration fanfare - major chord progression
        playTone(523.25, 0.15, 'triangle'); // C5
        playTone(659.25, 0.15, 'triangle'); // E5
        setTimeout(() => {
          playTone(783.99, 0.15, 'triangle'); // G5
          playTone(1046.50, 0.15, 'triangle'); // C6
        }, 120);
        setTimeout(() => playTone(1318.51, 0.3, 'triangle'), 240); // E6
        break;

      case 'creatureDiscovery':
        // Magical sparkle - rapid ascending glissando
        for (let i = 0; i < 5; i++) {
          setTimeout(() => playTone(400 + i * 200, 0.08, 'sine'), i * 40);
        }
        break;

      case 'buttonTap':
        // Soft pop
        playTone(880, 0.05, 'sine');
        break;

      default:
        break;
    }
  };

  // Play ambient background sounds
  useEffect(() => {
    if (!soundEnabled || !audioContextRef.current) return;

    const playAmbient = () => {
      if (!soundEnabled) return;
      // Gentle nature ambient - random bird chirps
      const randomDelay = Math.random() * 5000 + 3000; // 3-8 seconds
      playTone(800 + Math.random() * 400, 0.15, 'sine');
      setTimeout(() => playTone(1000 + Math.random() * 300, 0.1, 'sine'), 150);
    };

    const ambientInterval = setInterval(playAmbient, 8000);
    
    return () => clearInterval(ambientInterval);
  }, [soundEnabled, volume]);

  // Global event listeners for sound triggers
  useEffect(() => {
    const handleCustomSound = (event: CustomEvent) => {
      playSound(event.detail.type);
    };

    window.addEventListener('playSound' as any, handleCustomSound);
    
    return () => {
      window.removeEventListener('playSound' as any, handleCustomSound);
    };
  }, [soundEnabled]);

  return (
    <div className="relative">
      {/* Sound toggle button - compact for nav bar */}
      <motion.button
        onClick={() => setSoundEnabled(!soundEnabled)}
        className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${
          soundEnabled
            ? 'bg-white/20 text-white hover:bg-white/30'
            : 'bg-white/10 text-white/60 hover:bg-white/20'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {soundEnabled ? '🔊' : '🔇'}
      </motion.button>

      {/* Volume control dropdown */}
      {soundEnabled && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full right-0 mt-2 bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-xl min-w-[140px] z-50"
        >
          <label className="text-xs font-bold text-gray-700 text-center block mb-2">
            Volume
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-xs text-gray-600 font-semibold mt-1">
            {Math.round(volume * 100)}%
          </div>
        </motion.div>
      )}
    </div>
  );
}
