'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface AnimalFactProps {
  animal: {
    type: string;
    emoji: string;
    fact: string;
    sound: string;
  };
  onClose: () => void;
}

export default function AnimalFactPopup({ animal, onClose }: AnimalFactProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 10 }}
          className="bg-gradient-to-br from-yellow-200 via-green-200 to-blue-200 rounded-3xl p-8 max-w-md shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Animal emoji */}
          <motion.div
            className="text-8xl text-center mb-4"
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
          >
            {animal.emoji}
          </motion.div>

          {/* Sound indicator */}
          <motion.div
            className="text-center text-4xl mb-4"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            🔊 {animal.sound}
          </motion.div>

          {/* Fun fact */}
          <div className="bg-white/80 rounded-2xl p-6 mb-4">
            <p className="text-xl font-bold text-gray-800 text-center">
              Did you know?
            </p>
            <p className="text-lg text-gray-700 mt-2 text-center">
              {animal.fact}
            </p>
          </div>

          {/* Close button */}
          <motion.button
            onClick={onClose}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 px-6 rounded-2xl text-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Cool! 👍
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
