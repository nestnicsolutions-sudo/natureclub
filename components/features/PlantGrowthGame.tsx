'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface PlantGrowthProps {
  onClose: () => void;
  onComplete: () => void;
}

export default function PlantGrowthGame({ onClose, onComplete }: PlantGrowthProps) {
  const [stage, setStage] = useState(0);
  const [waterLevel, setWaterLevel] = useState(50);
  const [sunLevel, setSunLevel] = useState(50);
  const [showFact, setShowFact] = useState(false);

  const stages = [
    { emoji: '🌱', name: 'Seed', fact: 'Seeds need water and warmth to sprout!' },
    { emoji: '🌿', name: 'Sprout', fact: 'Baby plants are called sprouts!' },
    { emoji: '🌺', name: 'Bud', fact: 'Flower buds form before blooming!' },
    { emoji: '🌸', name: 'Flower', fact: 'Flowers make seeds for new plants!' },
    { emoji: '🌻', name: 'Full Bloom', fact: 'Sunflowers follow the sun across the sky!' },
  ];

  useEffect(() => {
    if (waterLevel >= 100 && sunLevel >= 100 && stage < stages.length - 1) {
      setStage(prev => prev + 1);
      setWaterLevel(50);
      setSunLevel(50);
      setShowFact(true);
      setTimeout(() => setShowFact(false), 3000);
      
      if (stage === stages.length - 2) {
        setTimeout(() => onComplete(), 3000);
      }
    }
  }, [waterLevel, sunLevel, stage, stages.length, onComplete]);

  const addWater = () => {
    setWaterLevel(prev => Math.min(prev + 20, 100));
  };

  const addSun = () => {
    setSunLevel(prev => Math.min(prev + 20, 100));
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-sky-300 to-green-300 z-[100] flex items-center justify-center p-4">
      <div className="bg-white/95 rounded-3xl p-8 max-w-2xl w-full shadow-2xl">
        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold text-green-600 mb-2">
            🌱 Grow a Plant!
          </h2>
          <p className="text-lg text-gray-700">
            Stage {stage + 1} of {stages.length}: {stages[stage].name}
          </p>
        </div>

        {/* Plant display */}
        <div className="bg-gradient-to-b from-sky-100 to-green-200 rounded-2xl p-12 mb-6 min-h-64 flex items-center justify-center relative overflow-hidden">
          {/* Soil */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-yellow-900 to-yellow-700" />
          
          {/* Plant */}
          <motion.div
            key={stage}
            initial={{ scale: 0, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="text-9xl relative z-10"
          >
            {stages[stage].emoji}
          </motion.div>

          {/* Water droplets animation */}
          {waterLevel < 100 && (
            <motion.div
              className="absolute top-4 right-4 text-4xl"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              💧
            </motion.div>
          )}

          {/* Sun rays animation */}
          {sunLevel < 100 && (
            <motion.div
              className="absolute top-4 left-4 text-4xl"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              ☀️
            </motion.div>
          )}
        </div>

        {/* Progress bars */}
        <div className="space-y-4 mb-6">
          {/* Water bar */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="font-bold text-blue-600">💧 Water</span>
              <span className="font-bold text-blue-600">{waterLevel}%</span>
            </div>
            <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
                initial={{ width: 0 }}
                animate={{ width: `${waterLevel}%` }}
              />
            </div>
          </div>

          {/* Sun bar */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="font-bold text-yellow-600">☀️ Sunlight</span>
              <span className="font-bold text-yellow-600">{sunLevel}%</span>
            </div>
            <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-yellow-400 to-orange-500"
                initial={{ width: 0 }}
                animate={{ width: `${sunLevel}%` }}
              />
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-4 mb-4">
          <motion.button
            onClick={addWater}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-2xl text-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={waterLevel >= 100}
          >
            💧 Add Water
          </motion.button>

          <motion.button
            onClick={addSun}
            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 px-6 rounded-2xl text-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={sunLevel >= 100}
          >
            ☀️ Add Sun
          </motion.button>
        </div>

        {/* Close button */}
        <motion.button
          onClick={onClose}
          className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-2xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Exit Game
        </motion.button>

        {/* Fun fact popup */}
        <AnimatePresence>
          {showFact && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-purple-500 text-white p-6 rounded-2xl shadow-2xl max-w-md text-center"
            >
              <div className="text-4xl mb-3">✨</div>
              <p className="text-lg font-bold">{stages[stage].fact}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
