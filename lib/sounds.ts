// Sound utility functions for the Nature Explorer app

export type SoundType = 
  | 'animalFeed'
  | 'plantWater'
  | 'weatherChange'
  | 'badgeEarn'
  | 'creatureDiscovery'
  | 'buttonTap'
  | 'rain'
  | 'sunshine'
  | 'night'
  | 'celebration';

// Helper to dispatch custom sound events
export function playSound(soundType: SoundType, volume: number = 0.5) {
  const event = new CustomEvent('playSound', {
    detail: { type: soundType, volume }
  });
  window.dispatchEvent(event);
}

// Web Audio API sound generator for temporary sounds
// In production, replace with actual audio files
export function playTone(frequency: number, duration: number, volume: number = 0.5) {
  if (typeof window === 'undefined') return;
  
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    gainNode.gain.value = volume;
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  } catch (error) {
    console.log('Audio playback not supported');
  }
}

// Predefined sound effects using tones
export const soundEffects = {
  animalFeed: () => playTone(800, 0.2),
  plantWater: () => playTone(400, 0.3),
  weatherChange: () => playTone(600, 0.4),
  badgeEarn: () => {
    playTone(523, 0.15);
    setTimeout(() => playTone(659, 0.15), 150);
    setTimeout(() => playTone(784, 0.3), 300);
  },
  creatureDiscovery: () => {
    playTone(1000, 0.1);
    setTimeout(() => playTone(1200, 0.1), 100);
    setTimeout(() => playTone(1400, 0.2), 200);
  },
  buttonTap: () => playTone(500, 0.1),
};

// Load and play actual audio files (for production)
export class SoundManager {
  private sounds: Map<SoundType, HTMLAudioElement> = new Map();
  private volume: number = 0.5;
  private enabled: boolean = true;

  constructor() {
    if (typeof window === 'undefined') return;
    this.loadSounds();
  }

  private loadSounds() {
    // In production, load actual audio files from /public/sounds/
    const soundFiles: Record<SoundType, string> = {
      animalFeed: '/sounds/feed.mp3',
      plantWater: '/sounds/water.mp3',
      weatherChange: '/sounds/weather.mp3',
      badgeEarn: '/sounds/badge.mp3',
      creatureDiscovery: '/sounds/discover.mp3',
      buttonTap: '/sounds/tap.mp3',
      rain: '/sounds/rain.mp3',
      sunshine: '/sounds/sun.mp3',
      night: '/sounds/night.mp3',
      celebration: '/sounds/celebration.mp3',
    };

    Object.entries(soundFiles).forEach(([type, file]) => {
      const audio = new Audio(file);
      audio.volume = this.volume;
      this.sounds.set(type as SoundType, audio);
    });
  }

  play(type: SoundType) {
    if (!this.enabled) return;
    
    const sound = this.sounds.get(type);
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(() => {
        // Fallback to tone if audio file fails
        soundEffects[type as keyof typeof soundEffects]?.();
      });
    } else {
      // Fallback to tone
      soundEffects[type as keyof typeof soundEffects]?.();
    }
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
    this.sounds.forEach(sound => {
      sound.volume = this.volume;
    });
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  isEnabled() {
    return this.enabled;
  }
}

// Singleton instance
let soundManagerInstance: SoundManager | null = null;

export function getSoundManager(): SoundManager {
  if (!soundManagerInstance) {
    soundManagerInstance = new SoundManager();
  }
  return soundManagerInstance;
}
