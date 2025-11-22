'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface SoundItem {
  id: string;
  emoji: string;
  name: string;
  sound: string;
  position: { x: number; y: number };
}

const soundItems: SoundItem[] = [
  { id: 'tree', emoji: '🌳', name: 'Tree', sound: 'Knock knock knock!', position: { x: 15, y: 40 } },
  { id: 'water', emoji: '💧', name: 'Water', sound: 'Splash splash!', position: { x: 40, y: 60 } },
  { id: 'bird', emoji: '🐦', name: 'Bird', sound: 'Tweet tweet!', position: { x: 70, y: 25 } },
  { id: 'wind', emoji: '🌬️', name: 'Wind', sound: 'Whoooosh!', position: { x: 50, y: 15 } },
  { id: 'frog', emoji: '🐸', name: 'Frog', sound: 'Ribbit ribbit!', position: { x: 65, y: 70 } },
  { id: 'bee', emoji: '🐝', name: 'Bee', sound: 'Bzzzz bzzzz!', position: { x: 30, y: 30 } },
];

interface SoundExplorerProps {
  onClose?: () => void;
}

export default function SoundExplorer({ onClose }: SoundExplorerProps = {}) {
  const [playingSound, setPlayingSound] = useState<string | null>(null);
  const [activeSounds, setActiveSounds] = useState<string[]>([]);

  const handleSoundPlay = (soundId: string) => {
    setPlayingSound(soundId);
    
    // Toggle sound in active sounds
    setActiveSounds(prev => 
      prev.includes(soundId) 
        ? prev.filter(s => s !== soundId)
        : [...prev, soundId]
    );

    setTimeout(() => setPlayingSound(null), 1500);
  };

  const clearAllSounds = () => {
    setActiveSounds([]);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-sky-200 via-green-200 to-blue-200 z-[100] p-4">
      {/* Header */}
      <div className="text-center py-6 relative">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute left-4 top-6 bg-white hover:bg-gray-100 text-gray-800 font-bold px-6 py-3 rounded-full shadow-lg text-lg"
          >
            ← Back
          </button>
        )}
        <h1 className="text-5xl font-bold text-purple-600 mb-2">
          🎵 Sound Explorer
        </h1>
        <p className="text-xl text-gray-700">
          Tap to hear nature sounds!
        </p>
      </div>

      {/* Sound items */}
      <div className="relative w-full h-[60vh] rounded-3xl bg-gradient-to-b from-sky-300 to-green-300 border-4 border-white shadow-2xl overflow-hidden">
        {soundItems.map((item) => (
          <motion.div
            key={item.id}
            className="absolute cursor-pointer"
            style={{
              left: `${item.position.x}%`,
              top: `${item.position.y}%`,
            }}
            onClick={() => handleSoundPlay(item.id)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            animate={
              playingSound === item.id
                ? { scale: [1, 1.3, 1], rotate: [0, -10, 10, 0] }
                : activeSounds.includes(item.id)
                ? { y: [0, -5, 0] }
                : {}
            }
            transition={{ duration: 0.5, repeat: activeSounds.includes(item.id) ? Infinity : 0 }}
          >
            <div className="relative">
              <div className="text-6xl">{item.emoji}</div>
              
              {/* Active indicator */}
              {activeSounds.includes(item.id) && (
                <motion.div
                  className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}

              {/* Sound bubble */}
              {playingSound === item.id && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-2xl shadow-lg whitespace-nowrap"
                >
                  <div className="text-lg font-bold text-purple-600">
                    {item.sound}
                  </div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white" />
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Active sounds panel */}
      <div className="mt-6 bg-white/90 rounded-2xl p-4 shadow-xl">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-700">
            🎶 Playing: {activeSounds.length} sounds
          </h3>
          <motion.button
            onClick={clearAllSounds}
            className="bg-red-400 hover:bg-red-500 text-white font-bold px-4 py-2 rounded-xl text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🔇 Stop All
          </motion.button>
        </div>
        
        <div className="flex gap-2 flex-wrap">
          {activeSounds.map(soundId => {
            const item = soundItems.find(s => s.id === soundId);
            return item ? (
              <div key={soundId} className="bg-purple-200 px-3 py-1 rounded-full text-sm font-semibold">
                {item.emoji} {item.name}
              </div>
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
}
