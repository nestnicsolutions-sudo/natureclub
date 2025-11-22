'use client';

import { motion } from 'framer-motion';
import { AnimalState } from '@/types/game';
import { useGame } from '@/contexts/GameContext';
import { useState } from 'react';

interface AnimalsProps {
  animals: AnimalState[];
}

const animalFacts: Record<string, { fact: string; sound: string }> = {
  bird: { fact: 'Birds can see colors humans can\'t see!', sound: 'Tweet tweet!' },
  rabbit: { fact: 'Rabbits can jump 3 feet high!', sound: 'Hop hop!' },
  deer: { fact: 'Deer can run up to 30 miles per hour!', sound: 'Snort!' },
  butterfly: { fact: 'Butterflies taste with their feet!', sound: 'Flutter!' },
  owl: { fact: 'Owls can turn their heads 270 degrees!', sound: 'Hoot hoot!' },
  bat: { fact: 'Bats are the only mammals that can fly!', sound: 'Squeak!' },
};

export default function Animals({ animals }: AnimalsProps) {
  const { feedAnimal } = useGame();
  const [feedingAnimal, setFeedingAnimal] = useState<string | null>(null);
  const [showingFact, setShowingFact] = useState<string | null>(null);

  const handleFeed = (animalId: string, animalType: string) => {
    feedAnimal(animalId);
    setFeedingAnimal(animalId);
    setShowingFact(animalType);
    setTimeout(() => {
      setFeedingAnimal(null);
      setShowingFact(null);
    }, 3000);
  };

  const getAnimalEmoji = (type: AnimalState['type']) => {
    const emojis = {
      bird: '🐦',
      rabbit: '🐰',
      deer: '🦌',
      butterfly: '🦋',
      owl: '🦉',
      bat: '🦇',
    };
    return emojis[type];
  };

  const getMoodAnimation = (mood: AnimalState['mood']) => {
    switch (mood) {
      case 'happy':
        return { y: [0, -10, 0], rotate: [0, 5, -5, 0] };
      case 'playful':
        return { y: [0, -15, 0], x: [0, 5, -5, 0] };
      case 'sleepy':
        return { opacity: [1, 0.7, 1] };
      case 'surprised':
        return { scale: [1, 1.2, 1] };
      case 'hungry':
        return { rotate: [-5, 5, -5] };
      default:
        return {};
    }
  };

  return (
    <>
      {animals.map((animal) => {
        const animalInfo = animalFacts[animal.type];
        return (
        <motion.div
          key={animal.id}
          className="absolute cursor-pointer tap-bounce"
          style={{
            left: `${animal.position.x}%`,
            top: `${animal.position.y}%`,
          }}
          onClick={() => handleFeed(animal.id, animal.type)}
          animate={getMoodAnimation(animal.mood)}
          transition={{ duration: 1, repeat: Infinity }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="relative">
            <motion.div
              className="text-6xl md:text-8xl drop-shadow-lg"
              animate={feedingAnimal === animal.id ? { scale: [1, 1.3, 1] } : {}}
            >
              {getAnimalEmoji(animal.type)}
            </motion.div>

            {/* Mood indicator */}
            <motion.div
              className="absolute -top-2 -right-2 text-2xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              {animal.mood === 'happy' && '❤️'}
              {animal.mood === 'playful' && '✨'}
              {animal.mood === 'sleepy' && '😴'}
              {animal.mood === 'surprised' && '😮'}
              {animal.mood === 'hungry' && '🍎'}
            </motion.div>

            {/* Feeding animation */}
            {feedingAnimal === animal.id && (
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 text-4xl"
                initial={{ y: 0, opacity: 1 }}
                animate={{ y: -50, opacity: 0 }}
                transition={{ duration: 1 }}
              >
                🍎✨
              </motion.div>
            )}

            {/* Feed count bubble */}
            {animal.feedCount > 0 && (
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-full px-2 py-0.5 text-xs font-bold text-purple-600 shadow-lg whitespace-nowrap">
                🍎 {animal.feedCount}
              </div>
            )}

            {/* Fun fact popup */}
            {showingFact === animal.type && animalInfo && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute -top-24 left-1/2 -translate-x-1/2 bg-purple-500 text-white px-4 py-3 rounded-2xl shadow-2xl whitespace-nowrap z-50 max-w-xs w-max"
              >
                <div className="text-lg font-bold mb-1">
                  {animalInfo.sound}
                </div>
                <div className="text-xs">
                  {animalInfo.fact}
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-purple-500" />
              </motion.div>
            )}
          </div>
        </motion.div>
      )})}
    </>
  );
}
