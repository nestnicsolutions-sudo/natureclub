'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useGame } from '@/contexts/GameContext';

interface HiddenCreaturesProps {
  foundCreatures: string[];
}

const creatures = [
  { id: 'firefly', emoji: '✨', fact: 'Fireflies light up to talk to each other!', position: { left: '25%', top: '40%' } },
  { id: 'ladybug', emoji: '🐞', fact: 'Ladybugs help protect leaves!', position: { left: '65%', top: '55%' } },
  { id: 'chameleon', emoji: '🦎', fact: 'Chameleons can change colors!', position: { left: '45%', top: '65%' } },
  { id: 'butterfly', emoji: '🦋', fact: 'Butterflies taste with their feet!', position: { left: '80%', top: '35%' } },
];

export default function HiddenCreatures({ foundCreatures }: HiddenCreaturesProps) {
  const [discoveredCreature, setDiscoveredCreature] = useState<string | null>(null);
  const { discoverCreature } = useGame();

  const handleDiscover = (creatureId: string) => {
    if (!foundCreatures.includes(creatureId)) {
      discoverCreature(creatureId);
      setDiscoveredCreature(creatureId);
      setTimeout(() => setDiscoveredCreature(null), 4000);
    }
  };

  return (
    <>
      {creatures.map((creature) => {
        const isDiscovered = foundCreatures.includes(creature.id);
        
        return (
          <motion.div
            key={creature.id}
            className={`absolute cursor-pointer ${isDiscovered ? 'opacity-100' : 'opacity-30 hover:opacity-60'}`}
            style={creature.position}
            onClick={() => handleDiscover(creature.id)}
            animate={
              isDiscovered
                ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }
                : { scale: [1, 1.05, 1] }
            }
            transition={{ duration: 2, repeat: Infinity }}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              className="text-5xl md:text-6xl drop-shadow-lg relative"
              animate={isDiscovered ? { y: [0, -10, 0] } : {}}
            >
              {creature.emoji}
              {!isDiscovered && (
                <motion.div
                  className="absolute -top-2 -right-2 text-2xl"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  ❓
                </motion.div>
              )}
            </motion.div>

            {/* Discovery notification */}
            {discoveredCreature === creature.id && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-20 left-1/2 -translate-x-1/2 bg-purple-500 text-white px-6 py-4 rounded-2xl shadow-2xl max-w-xs z-50 text-center"
              >
                <div className="text-4xl mb-2">✨ Discovered! ✨</div>
                <div className="text-lg font-bold mb-2">{creature.emoji}</div>
                <div className="text-sm">{creature.fact}</div>
              </motion.div>
            )}
          </motion.div>
        );
      })}

      {/* Discovery counter */}
      <div className="fixed bottom-8 left-8 bg-purple-500 text-white px-6 py-3 rounded-full shadow-2xl font-bold text-lg z-30">
        🔍 {foundCreatures.length}/{creatures.length}
      </div>
    </>
  );
}
