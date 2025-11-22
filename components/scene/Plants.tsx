'use client';

import { motion } from 'framer-motion';
import { PlantState } from '@/types/game';
import { useGame } from '@/contexts/GameContext';
import { useState } from 'react';

interface PlantsProps {
  plants: PlantState[];
}

export default function Plants({ plants }: PlantsProps) {
  const { waterPlant } = useGame();
  const [wateringPlant, setWateringPlant] = useState<string | null>(null);

  const handleWater = (plantId: string) => {
    waterPlant(plantId);
    setWateringPlant(plantId);
    setTimeout(() => setWateringPlant(null), 1000);
  };

  const getPlantVisual = (plant: PlantState) => {
    const { type, stage } = plant;

    if (type === 'tree') {
      const sizes = ['text-4xl', 'text-5xl', 'text-6xl', 'text-7xl', 'text-8xl'];
      return {
        emoji: stage === 4 ? '🌳' : stage >= 2 ? '🌲' : '🌱',
        size: sizes[stage] || sizes[0],
      };
    }

    if (type === 'flower') {
      const flowers = ['🌱', '🌿', '🌺', '🌸', '🌻'];
      return {
        emoji: flowers[stage] || flowers[0],
        size: 'text-6xl',
      };
    }

    if (type === 'bush') {
      const bushes = ['🌱', '🌿', '🪴', '🌳', '🌳'];
      return {
        emoji: bushes[stage] || bushes[0],
        size: 'text-5xl',
      };
    }

    return { emoji: '🌱', size: 'text-4xl' };
  };

  const getPlantPosition = (plant: PlantState) => {
    if (plant.id === 'tree1') return { left: '15%', bottom: '20%' };
    if (plant.id === 'flower1') return { left: '50%', bottom: '25%' };
    if (plant.id === 'bush1') return { left: '75%', bottom: '30%' };
    return { left: '50%', bottom: '30%' };
  };

  return (
    <>
      {plants.map((plant) => {
        const visual = getPlantVisual(plant);
        const position = getPlantPosition(plant);

        return (
          <motion.div
            key={plant.id}
            className="absolute cursor-pointer tap-bounce"
            style={position}
            onClick={() => handleWater(plant.id)}
            animate={{
              scale: wateringPlant === plant.id ? [1, 1.2, 1] : 1,
              y: [0, -5, 0],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              <motion.div
                className={`${visual.size} drop-shadow-lg`}
                animate={wateringPlant === plant.id ? { rotate: [-5, 5, -5, 0] } : {}}
              >
                {visual.emoji}
              </motion.div>

              {/* Watering animation */}
              {wateringPlant === plant.id && (
                <>
                  <motion.div
                    className="absolute top-0 left-1/2 -translate-x-1/2 text-3xl"
                    initial={{ y: -30, opacity: 1 }}
                    animate={{ y: 0, opacity: 0 }}
                    transition={{ duration: 1 }}
                  >
                    💧💧💧
                  </motion.div>
                  <motion.div
                    className="absolute top-0 left-0 right-0 text-4xl text-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.5, 0] }}
                    transition={{ duration: 0.6 }}
                  >
                    ✨
                  </motion.div>
                </>
              )}

              {/* Stage indicator */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-green-500 text-white rounded-full px-2 py-0.5 text-xs font-bold shadow-lg whitespace-nowrap">
                Lv {plant.stage}
              </div>

              {/* Water count */}
              {plant.waterCount > 0 && (
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-blue-500 text-white rounded-full px-2 py-0.5 text-xs font-bold shadow-lg">
                  💧 {plant.waterCount}
                </div>
              )}

              {/* Fruits */}
              {plant.hasFruit && (
                <motion.div
                  className="absolute -top-4 right-0 text-3xl"
                  animate={{ rotate: [0, 10, -10, 0], y: [0, -3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🍎
                </motion.div>
              )}

              {/* Growth indicator */}
              {plant.stage < 4 && (
                <motion.div
                  className="absolute -top-6 left-1/2 -translate-x-1/2 text-xl"
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ⬆️
                </motion.div>
              )}
            </div>
          </motion.div>
        );
      })}
    </>
  );
}
