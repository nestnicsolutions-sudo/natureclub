'use client';

import { useState } from 'react';
import { useGame } from '@/contexts/GameContext';
import Sky from './scene/Sky';
import Animals from './scene/Animals';
import Plants from './scene/Plants';
import WeatherControls from './scene/WeatherControls';
import HiddenCreatures from './scene/HiddenCreatures';
import { motion } from 'framer-motion';

export default function NatureScene() {
  const { gameState, saveProgress } = useGame();
  const [showSaveNotification, setShowSaveNotification] = useState(false);

  const handleSave = async () => {
    await saveProgress();
    setShowSaveNotification(true);
    setTimeout(() => setShowSaveNotification(false), 2000);
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Sky and Weather */}
      <Sky weather={gameState.weather} />
      
      {/* Main Scene Container */}
      <div className="relative w-full h-screen">
        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-b from-grass-light to-grass-dark">
          <div className="absolute inset-0 opacity-20">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-8 bg-grass-dark rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  bottom: `${Math.random() * 40}%`,
                  transform: `rotate(${Math.random() * 30 - 15}deg)`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Plants */}
        <Plants plants={gameState.plants} />

        {/* Animals */}
        <Animals animals={gameState.animals} />

        {/* Hidden Creatures */}
        <HiddenCreatures foundCreatures={gameState.hiddenCreaturesFound} />

        {/* Weather Controls */}
        <WeatherControls />

        {/* Save Button */}
        <motion.button
          onClick={handleSave}
          className="fixed bottom-8 right-8 bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-full shadow-2xl font-bold text-xl z-50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          💾 Save
        </motion.button>

        {/* Save Notification */}
        {showSaveNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-24 right-8 bg-green-500 text-white px-8 py-4 rounded-full shadow-2xl font-bold text-xl z-50"
          >
            ✅ Saved!
          </motion.div>
        )}

        {/* Interaction Counter */}
        <div className="fixed top-28 left-4 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-xl z-30">
          <span className="text-xl md:text-2xl font-bold text-purple-600">
            ⭐ {gameState.totalInteractions}
          </span>
        </div>
      </div>
    </div>
  );
}
