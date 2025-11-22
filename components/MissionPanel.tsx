'use client';

import { motion } from 'framer-motion';
import { useGame } from '@/contexts/GameContext';

export default function MissionPanel() {
  const { gameState } = useGame();

  return (
    <div className="min-h-screen pb-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-center text-purple-600 mb-8 mt-8"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🎯 Fun Missions! 🎯
        </motion.h1>

        <div className="space-y-6">
          {gameState.missions.map((mission, index) => (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                className={`relative p-8 rounded-3xl shadow-2xl transition-all ${
                  mission.completed
                    ? 'bg-gradient-to-br from-green-300 via-green-400 to-emerald-400'
                    : 'bg-gradient-to-br from-blue-300 via-blue-400 to-purple-400'
                }`}
                whileHover={{ scale: 1.02 }}
                animate={mission.completed ? { rotate: [0, -1, 1, 0] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {/* Completion checkmark */}
                {mission.completed && (
                  <motion.div
                    className="absolute -top-4 -right-4 bg-white text-green-500 w-16 h-16 rounded-full flex items-center justify-center text-4xl shadow-xl"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  >
                    ✓
                  </motion.div>
                )}

                <div className="flex items-start gap-6">
                  {/* Mission icon */}
                  <motion.div
                    className="text-6xl md:text-7xl"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    {mission.completed ? '🎉' : '🎯'}
                  </motion.div>

                  {/* Mission details */}
                  <div className="flex-1">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                      {mission.title}
                    </h2>
                    <p className="text-xl md:text-2xl text-white/90 mb-4 font-semibold">
                      {mission.description}
                    </p>

                    {/* Progress bar */}
                    <div className="bg-white/30 rounded-full h-6 overflow-hidden mb-2">
                      <motion.div
                        className="h-full bg-white flex items-center justify-center font-bold text-purple-600"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((mission.progress / mission.target) * 100, 100)}%` }}
                        transition={{ duration: 0.5 }}
                      >
                        {mission.progress >= mission.target && (
                          <span className="text-sm">Complete! 🎉</span>
                        )}
                      </motion.div>
                    </div>

                    {/* Progress numbers */}
                    <div className="flex justify-between items-center text-white font-bold text-lg">
                      <span>Progress: {mission.progress} / {mission.target}</span>
                      {mission.completed && (
                        <motion.span
                          className="text-3xl"
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          {mission.reward}
                        </motion.span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Confetti for completed missions */}
                {mission.completed && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                    {[...Array(20)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full"
                        style={{
                          backgroundColor: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A'][i % 5],
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          y: [0, -30, 0],
                          x: [0, Math.random() * 40 - 20, 0],
                          opacity: [1, 0.5, 1],
                          scale: [1, 1.5, 1],
                        }}
                        transition={{
                          duration: 2 + Math.random(),
                          repeat: Infinity,
                          delay: i * 0.1,
                        }}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Motivational message */}
        <motion.div
          className="mt-12 text-center bg-gradient-to-r from-yellow-300 to-orange-300 text-gray-800 py-8 px-6 rounded-3xl shadow-2xl"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-6xl mb-4">🌟</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {gameState.missions.filter((m) => m.completed).length === gameState.missions.length
              ? "Amazing! You completed all missions! 🎊"
              : "Keep going! You're doing great! 💪"}
          </h2>
          <p className="text-xl md:text-2xl font-semibold">
            Completed: {gameState.missions.filter((m) => m.completed).length} / {gameState.missions.length}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
