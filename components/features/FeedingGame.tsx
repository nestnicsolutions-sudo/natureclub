'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useGame } from '@/contexts/GameContext';

interface FeedOption {
  id: string;
  emoji: string;
  name: string;
  correctFor: string[];
}

const feedOptions: FeedOption[] = [
  { id: 'seeds', emoji: '🌰', name: 'Seeds', correctFor: ['bird', 'rabbit'] },
  { id: 'berries', emoji: '🫐', name: 'Berries', correctFor: ['bird', 'deer', 'rabbit'] },
  { id: 'leaves', emoji: '🍃', name: 'Leaves', correctFor: ['deer', 'rabbit', 'butterfly'] },
  { id: 'nectar', emoji: '🌺', name: 'Nectar', correctFor: ['butterfly'] },
];

export default function FeedingGame() {
  const { gameState, feedAnimal } = useGame();
  const [selectedFood, setSelectedFood] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ animal: string; correct: boolean } | null>(null);

  const handleFoodSelect = (foodId: string) => {
    setSelectedFood(foodId);
  };

  const handleAnimalFeed = (animalId: string, animalType: string) => {
    if (!selectedFood) return;

    const food = feedOptions.find(f => f.id === selectedFood);
    if (!food) return;

    const isCorrect = food.correctFor.includes(animalType);
    setFeedback({ animal: animalId, correct: isCorrect });

    if (isCorrect) {
      feedAnimal(animalId);
    }

    setTimeout(() => {
      setFeedback(null);
      setSelectedFood(null);
    }, 2000);
  };

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40">
      {/* Food selection panel */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="bg-white/95 backdrop-blur-md rounded-3xl p-4 shadow-2xl"
      >
        <p className="text-center font-bold text-gray-700 mb-3 text-lg">
          🍽️ Feed the Animals!
        </p>
        
        <div className="flex gap-3">
          {feedOptions.map((food) => (
            <motion.button
              key={food.id}
              onClick={() => handleFoodSelect(food.id)}
              className={`flex flex-col items-center p-4 rounded-2xl transition-all ${
                selectedFood === food.id
                  ? 'bg-green-400 scale-110 shadow-lg'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-4xl mb-1">{food.emoji}</span>
              <span className="text-xs font-semibold text-gray-700">{food.name}</span>
            </motion.button>
          ))}
        </div>

        {selectedFood && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-3 text-sm font-bold text-purple-600"
          >
            👆 Now tap an animal to feed!
          </motion.p>
        )}
      </motion.div>

      {/* Feedback animation */}
      {feedback && (
        <motion.div
          initial={{ scale: 0, y: -50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0 }}
          className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-4 px-8 py-4 rounded-full font-bold text-2xl shadow-2xl ${
            feedback.correct
              ? 'bg-green-500 text-white'
              : 'bg-orange-400 text-white'
          }`}
        >
          {feedback.correct ? '🎉 Yummy!' : '😅 Try another food!'}
        </motion.div>
      )}
    </div>
  );
}
