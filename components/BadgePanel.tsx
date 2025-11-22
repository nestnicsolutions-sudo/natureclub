'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/contexts/GameContext';
import { useState, useEffect } from 'react';
import { Trophy, X } from 'lucide-react';

export default function BadgePanel() {
  const { gameState, checkBadges } = useGame();
  const [celebratingBadge, setCelebratingBadge] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    checkBadges();
  }, [checkBadges]);

  const handleBadgeClick = (badgeId: string, earned: boolean) => {
    if (earned) {
      setCelebratingBadge(badgeId);
      setTimeout(() => setCelebratingBadge(null), 2000);
    }
  };

  const earnedCount = gameState.badges.filter((b) => b.earned).length;

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 px-4 py-2 rounded-2xl font-bold shadow-lg transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Trophy className="w-6 h-6" />
        <span className="text-lg">{earnedCount}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-auto p-8 relative"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              <motion.h1
                className="text-5xl md:text-7xl font-bold text-center text-white mb-8"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🏆 Your Badges! 🏆
              </motion.h1>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gameState.badges.map((badge, index) => (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleBadgeClick(badge.id, badge.earned)}
                    className={`cursor-pointer rounded-3xl p-6 transition-all ${
                      badge.earned
                        ? 'bg-white shadow-2xl'
                        : 'bg-gray-200 opacity-60 grayscale'
                    }`}
                    whileHover={{ scale: badge.earned ? 1.05 : 1 }}
                  >
                    <div className="relative">
                      <div className="text-6xl mb-4 text-center">{badge.icon}</div>
                      <h3 className="text-2xl font-bold text-center mb-2 text-gray-800">
                        {badge.name}
                      </h3>
                      <p className="text-center text-gray-600 mb-4">{badge.description}</p>

                      <div className="w-full bg-gray-300 rounded-full h-4 mb-2">
                        <motion.div
                          className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full"
                          initial={{ width: 0 }}
                          animate={{
                            width: `${(badge.progress / badge.requirement) * 100}%`,
                          }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        />
                      </div>
                      <p className="text-center text-sm text-gray-600">
                        {badge.progress} / {badge.requirement}
                      </p>

                      {badge.earned && celebratingBadge === badge.id && (
                        <>
                          {[...Array(6)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-3 h-3 bg-yellow-400 rounded-full"
                              style={{
                                top: '50%',
                                left: '50%',
                              }}
                              animate={{
                                x: [0, Math.cos((i * 60 * Math.PI) / 180) * 100],
                                y: [0, Math.sin((i * 60 * Math.PI) / 180) * 100],
                                scale: [1, 0],
                                opacity: [1, 0],
                              }}
                              transition={{
                                duration: 1,
                              }}
                            />
                          ))}
                        </>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="mt-12 text-center bg-white/20 backdrop-blur-sm text-white py-8 px-6 rounded-3xl shadow-2xl"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-3xl md:text-4xl font-bold">
                  You've earned {earnedCount} out of {gameState.badges.length} badges!
                </h2>
                <p className="text-xl md:text-2xl mt-4 font-semibold">
                  Keep exploring to collect them all! 🌟
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
