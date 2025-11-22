'use client';

import { motion } from 'framer-motion';
import { useGame } from '@/contexts/GameContext';
import { useState } from 'react';

export default function WeatherControls() {
  const { gameState, updateWeather, checkBadges } = useGame();
  const [showPanel, setShowPanel] = useState(true);

  const handleWeatherChange = (newWeather: 'sunny' | 'rainy' | 'rainbow') => {
    updateWeather({ 
      current: newWeather,
      isRaining: newWeather === 'rainy',
    });
    
    if (newWeather === 'rainbow') {
      const rainbowBadge = gameState.badges.find(b => b.id === 'sky-wizard');
      if (rainbowBadge && !rainbowBadge.earned) {
        updateWeather({ current: 'rainbow' });
        setTimeout(checkBadges, 100);
      }
    }
  };

  const toggleDayNight = () => {
    const newTime = gameState.weather.timeOfDay === 'day' ? 'night' : 'day';
    updateWeather({ timeOfDay: newTime });
    
    if (newTime === 'night') {
      setTimeout(checkBadges, 100);
    }
  };

  const addClouds = () => {
    updateWeather({ cloudCount: Math.min(gameState.weather.cloudCount + 1, 10) });
  };

  const removeClouds = () => {
    updateWeather({ cloudCount: Math.max(gameState.weather.cloudCount - 1, 0) });
  };

  return (
    <>
      {/* Toggle button */}
      <motion.button
        onClick={() => setShowPanel(!showPanel)}
        className="fixed top-32 right-4 bg-purple-500 hover:bg-purple-600 text-white w-14 h-14 flex items-center justify-center rounded-full shadow-2xl z-40 text-2xl"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {showPanel ? '✖️' : '🌤️'}
      </motion.button>

      {/* Weather control panel */}
      {showPanel && (
        <motion.div
          initial={{ x: 300 }}
          animate={{ x: 0 }}
          className="fixed right-4 top-52 bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl z-30 w-80 max-h-[calc(100vh-240px)] overflow-y-auto"
        >
          <h2 className="text-2xl font-bold text-purple-600 mb-4 text-center">
            🌤️ Weather Magic
          </h2>

          {/* Weather buttons */}
          <div className="space-y-3">
            <motion.button
              onClick={() => handleWeatherChange('sunny')}
              className={`w-full py-3 px-4 rounded-2xl font-bold text-lg transition-all ${
                gameState.weather.current === 'sunny'
                  ? 'bg-yellow-400 text-white shadow-lg scale-105'
                  : 'bg-yellow-200 text-yellow-700 hover:bg-yellow-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ☀️ Sunny
            </motion.button>

            <motion.button
              onClick={() => handleWeatherChange('rainy')}
              className={`w-full py-3 px-4 rounded-2xl font-bold text-lg transition-all ${
                gameState.weather.current === 'rainy'
                  ? 'bg-blue-500 text-white shadow-lg scale-105'
                  : 'bg-blue-200 text-blue-700 hover:bg-blue-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🌧️ Rain
            </motion.button>

            <motion.button
              onClick={() => handleWeatherChange('rainbow')}
              className={`w-full py-3 px-4 rounded-2xl font-bold text-lg transition-all ${
                gameState.weather.current === 'rainbow'
                  ? 'bg-gradient-to-r from-red-400 via-yellow-400 to-blue-400 text-white shadow-lg scale-105'
                  : 'bg-gradient-to-r from-red-200 via-yellow-200 to-blue-200 text-gray-700 hover:opacity-80'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🌈 Rainbow
            </motion.button>
          </div>

          {/* Cloud controls */}
          <div className="mt-4">
            <p className="text-base font-bold text-gray-700 mb-2 text-center">
              ☁️ Clouds: {gameState.weather.cloudCount}
            </p>
            <div className="flex gap-2">
              <motion.button
                onClick={removeClouds}
                className="flex-1 py-3 px-4 bg-red-200 text-red-700 rounded-xl font-bold hover:bg-red-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Less
              </motion.button>
              <motion.button
                onClick={addClouds}
                className="flex-1 py-3 px-4 bg-blue-200 text-blue-700 rounded-xl font-bold hover:bg-blue-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                More
              </motion.button>
            </div>
          </div>

          {/* Day/Night toggle */}
          <motion.button
            onClick={toggleDayNight}
            className={`w-full mt-3 py-3 px-4 rounded-2xl font-bold text-lg transition-all ${
              gameState.weather.timeOfDay === 'night'
                ? 'bg-indigo-900 text-white shadow-lg'
                : 'bg-amber-300 text-amber-900 shadow-lg'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {gameState.weather.timeOfDay === 'day' ? '🌙 Night' : '☀️ Day'}
          </motion.button>
        </motion.div>
      )}
    </>
  );
}
