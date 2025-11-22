'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface Quest {
  id: string;
  title: string;
  description: string;
  emoji: string;
  target: number;
  reward: string;
}

interface NatureQuestsProps {
  onClose?: () => void;
}

const quests: Quest[] = [
  {
    id: 'butterflies',
    title: 'Find 3 Blue Butterflies',
    description: 'Look for butterflies around the garden!',
    emoji: '🦋',
    target: 3,
    reward: '⭐ Butterfly Badge'
  },
  {
    id: 'nuts',
    title: 'Collect 5 Acorns',
    description: 'Help gather food for winter!',
    emoji: '🌰',
    target: 5,
    reward: '🏆 Helper Medal'
  },
  {
    id: 'garden',
    title: 'Grow 3 Flowers',
    description: 'Make a beautiful flower garden!',
    emoji: '🌸',
    target: 3,
    reward: '🌻 Gardener Star'
  },
];

export default function NatureQuests({ onClose }: NatureQuestsProps = {}) {
  const [activeQuests, setActiveQuests] = useState(
    quests.map(q => ({ ...q, progress: 0, completed: false }))
  );
  const [selectedQuest, setSelectedQuest] = useState<string | null>(null);

  const updateProgress = (questId: string) => {
    setActiveQuests(prev =>
      prev.map(quest => {
        if (quest.id === questId && !quest.completed) {
          const newProgress = Math.min(quest.progress + 1, quest.target);
          return {
            ...quest,
            progress: newProgress,
            completed: newProgress >= quest.target
          };
        }
        return quest;
      })
    );
  };

  return (
    <div className="bg-gradient-to-br from-purple-300 via-pink-300 to-yellow-300 rounded-3xl p-8 relative">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg transition-colors"
        >
          <X className="w-6 h-6 text-gray-700" />
        </button>
      )}
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg mb-2">
            🎯 Nature Quests!
          </h1>
          <p className="text-2xl text-white font-semibold">
            Complete fun missions!
          </p>
        </motion.div>

        {/* Quest cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activeQuests.map((quest, index) => (
            <motion.div
              key={quest.id}
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-3xl p-6 shadow-2xl cursor-pointer ${
                quest.completed
                  ? 'bg-gradient-to-br from-green-300 to-emerald-400'
                  : 'bg-white'
              }`}
              onClick={() => setSelectedQuest(quest.id)}
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Completed badge */}
              {quest.completed && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-3 -right-3 bg-yellow-400 text-white w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-xl border-4 border-white"
                >
                  ✓
                </motion.div>
              )}

              {/* Quest emoji */}
              <motion.div
                className="text-7xl text-center mb-4"
                animate={quest.completed ? { rotate: [0, 360] } : { y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {quest.emoji}
              </motion.div>

              {/* Quest info */}
              <h3 className="text-2xl font-bold text-gray-800 text-center mb-2">
                {quest.title}
              </h3>
              <p className="text-center text-gray-600 mb-4 text-sm">
                {quest.description}
              </p>

              {/* Progress bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm font-bold mb-1">
                  <span>Progress</span>
                  <span>{quest.progress}/{quest.target}</span>
                </div>
                <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${(quest.progress / quest.target) * 100}%` }}
                  />
                </div>
              </div>

              {/* Reward */}
              <div className="bg-yellow-100 rounded-2xl p-3 text-center">
                <p className="text-sm font-semibold text-gray-600 mb-1">Reward:</p>
                <p className="text-lg font-bold text-purple-600">{quest.reward}</p>
              </div>

              {/* Action button */}
              {!quest.completed && (
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    updateProgress(quest.id);
                  }}
                  className="w-full mt-4 bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 rounded-2xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🎯 Do Quest!
                </motion.button>
              )}
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-white rounded-3xl p-6 shadow-2xl text-center"
        >
          <div className="text-5xl mb-3">🎉</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Completed: {activeQuests.filter(q => q.completed).length}/{quests.length}
          </h2>
          <p className="text-xl text-gray-600">
            {activeQuests.every(q => q.completed)
              ? "Amazing! You completed all quests! 🌟"
              : "Keep going, explorer! 💪"}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
