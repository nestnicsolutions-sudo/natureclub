'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface ZoomItem {
  id: string;
  emoji: string;
  name: string;
  description: string;
  microView: string;
  fact: string;
}

const zoomItems: ZoomItem[] = [
  {
    id: 'leaf',
    emoji: '🍃',
    name: 'Leaf',
    description: 'See the tiny veins!',
    microView: '🌿',
    fact: 'Leaf veins carry water and food like tiny highways!'
  },
  {
    id: 'butterfly',
    emoji: '🦋',
    name: 'Butterfly Wing',
    description: 'Zoom into the scales!',
    microView: '✨',
    fact: 'Butterfly wings are covered in thousands of tiny colorful scales!'
  },
  {
    id: 'water',
    emoji: '💧',
    name: 'Water Drop',
    description: 'Look inside!',
    microView: '💎',
    fact: 'Water droplets act like tiny magnifying glasses!'
  },
  {
    id: 'soil',
    emoji: '🟤',
    name: 'Soil',
    description: 'See the layers!',
    microView: '🪨',
    fact: 'Soil has millions of tiny living creatures helping plants grow!'
  },
];

interface NatureZoomLensProps {
  onClose?: () => void;
}

export default function NatureZoomLens({ onClose }: NatureZoomLensProps = {}) {
  const [selectedItem, setSelectedItem] = useState<ZoomItem | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomIn = () => {
    if (zoomLevel < 3) setZoomLevel(zoomLevel + 1);
  };

  const handleZoomOut = () => {
    if (zoomLevel > 1) setZoomLevel(zoomLevel - 1);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-blue-900 via-purple-800 to-indigo-900 z-[100] p-4">
      <div className="max-w-6xl mx-auto h-full flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center py-6 relative"
        >
          {onClose && (
            <button
              onClick={onClose}
              className="absolute left-0 top-6 bg-white/20 hover:bg-white/30 text-white font-bold px-6 py-3 rounded-full shadow-lg text-lg backdrop-blur-md"
            >
              ← Back
            </button>
          )}
          <h1 className="text-5xl font-bold text-white mb-2">
            🔭 Nature Zoom Lens
          </h1>
          <p className="text-xl text-blue-200">
            Discover the hidden micro-world!
          </p>
        </motion.div>

        {/* Main view area */}
        <div className="flex-1 flex items-center justify-center mb-6">
          <div className="relative w-full max-w-2xl">
            {/* Microscope view */}
            <motion.div
              className="bg-white rounded-full aspect-square flex items-center justify-center shadow-2xl border-8 border-gray-300 overflow-hidden"
              animate={{
                scale: selectedItem ? [1, 1.02, 1] : 1
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {selectedItem ? (
                <motion.div
                  key={selectedItem.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: zoomLevel }}
                  className="text-center"
                >
                  <div className="text-9xl mb-4">
                    {zoomLevel === 3 ? selectedItem.microView : selectedItem.emoji}
                  </div>
                  <p className="text-2xl font-bold text-gray-700 px-8">
                    {selectedItem.name}
                  </p>
                </motion.div>
              ) : (
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">👇</div>
                  <p className="text-2xl font-bold text-gray-500">
                    Select an item below to zoom in!
                  </p>
                </div>
              )}
            </motion.div>

            {/* Zoom controls */}
            {selectedItem && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4">
                <motion.button
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 3}
                  className="bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed w-16 h-16 rounded-full shadow-xl flex items-center justify-center text-3xl font-bold"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  +
                </motion.button>
                <div className="bg-white w-16 h-16 rounded-full shadow-xl flex items-center justify-center">
                  <span className="text-2xl font-bold">{zoomLevel}x</span>
                </div>
                <motion.button
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 1}
                  className="bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed w-16 h-16 rounded-full shadow-xl flex items-center justify-center text-3xl font-bold"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  −
                </motion.button>
              </div>
            )}
          </div>
        </div>

        {/* Item selection */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {zoomItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => {
                  setSelectedItem(item);
                  setZoomLevel(1);
                }}
                className={`p-6 rounded-2xl transition-all ${
                  selectedItem?.id === item.id
                    ? 'bg-purple-500 scale-105'
                    : 'bg-white/20 hover:bg-white/30'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-6xl mb-2">{item.emoji}</div>
                <p className="text-white font-bold text-sm">{item.name}</p>
              </motion.button>
            ))}
          </div>

          {/* Fun fact */}
          <AnimatePresence>
            {selectedItem && zoomLevel === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-yellow-400 rounded-2xl p-4 text-center"
              >
                <p className="text-lg font-bold text-gray-800">
                  💡 {selectedItem.fact}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
