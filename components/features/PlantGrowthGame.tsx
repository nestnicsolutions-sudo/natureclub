'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface PlantGrowthProps {
  onClose: () => void;
  onComplete: () => void;
}

export default function PlantGrowthGame({ onClose, onComplete }: PlantGrowthProps) {
  const [stage, setStage] = useState(0);
  const [waterLevel, setWaterLevel] = useState(50);
  const [sunLevel, setSunLevel] = useState(50);
  const [showFact, setShowFact] = useState(false);
  
  const plantAreaRef = useRef<HTMLDivElement>(null);

  const stages = [
    { emoji: '🌱', name: 'Seed', fact: 'Seeds need water and warmth to sprout!' },
    { emoji: '🌿', name: 'Sprout', fact: 'Baby plants are called sprouts!' },
    { emoji: '🌺', name: 'Bud', fact: 'Flower buds form before blooming!' },
    { emoji: '🌸', name: 'Flower', fact: 'Flowers make seeds for new plants!' },
    { emoji: '🌻', name: 'Full Bloom', fact: 'Sunflowers follow the sun across the sky!' },
  ];

  useEffect(() => {
    if (waterLevel >= 100 && sunLevel >= 100 && stage < stages.length - 1) {
      // Level up!
      setTimeout(() => {
        setStage(prev => prev + 1);
        setWaterLevel(30); // Reset levels but not to 0 so it's not too hard
        setSunLevel(30);
        setShowFact(true);
        
        // Play success sound
        const event = new CustomEvent('playSound', { detail: { type: 'success' } });
        window.dispatchEvent(event);

        setTimeout(() => setShowFact(false), 4000);
        
        if (stage === stages.length - 2) {
          setTimeout(() => onComplete(), 3000);
        }
      }, 500);
    }
  }, [waterLevel, sunLevel, stage, stages.length, onComplete]);

  const handleDrop = (e: any, info: any, type: string) => {
    if (!plantAreaRef.current) return;

    const plantRect = plantAreaRef.current.getBoundingClientRect();
    const dropPoint = info.point;

    // Check if dropped inside the plant area
    if (
      dropPoint.x >= plantRect.left &&
      dropPoint.x <= plantRect.right &&
      dropPoint.y >= plantRect.top &&
      dropPoint.y <= plantRect.bottom
    ) {
      if (type === 'water') {
        setWaterLevel(prev => Math.min(prev + 20, 100));
        // Play water sound
        const event = new CustomEvent('playSound', { detail: { type: 'water' } });
        window.dispatchEvent(event);
      } else if (type === 'sun') {
        setSunLevel(prev => Math.min(prev + 20, 100));
        // Play sun sound
        const event = new CustomEvent('playSound', { detail: { type: 'magic' } });
        window.dispatchEvent(event);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white/95 rounded-3xl p-4 md:p-8 max-w-4xl w-full shadow-2xl relative overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>

        {/* Title */}
        <div className="text-center mb-4 md:mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
            🌱 Grow a Plant!
          </h2>
          <p className="text-base md:text-lg text-gray-600">
            Drag the Water 💧 and Sun ☀️ to help the plant grow!
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
          {/* Tools Panel */}
          <div className="flex md:flex-col gap-4 md:gap-8 order-2 md:order-1">
            <DraggableTool 
              emoji="💧" 
              label="Water" 
              color="bg-blue-100 border-blue-300" 
              onDragEnd={(e, info) => handleDrop(e, info, 'water')}
            />
            <DraggableTool 
              emoji="☀️" 
              label="Sun" 
              color="bg-yellow-100 border-yellow-300" 
              onDragEnd={(e, info) => handleDrop(e, info, 'sun')}
            />
          </div>

          {/* Main Game Area */}
          <div className="flex-1 w-full max-w-md order-1 md:order-2">
            {/* Plant Container */}
            <div 
              ref={plantAreaRef}
              className="bg-gradient-to-b from-sky-100 to-green-100 rounded-3xl p-8 h-80 md:h-96 relative border-4 border-green-200 shadow-inner flex items-end justify-center overflow-hidden"
            >
              {/* Progress Bars Overlay */}
              <div className="absolute top-4 left-4 right-4 flex gap-4">
                <div className="flex-1">
                  <div className="flex justify-between text-xs font-bold text-blue-600 mb-1">
                    <span>💧 Water</span>
                    <span>{waterLevel}%</span>
                  </div>
                  <div className="h-3 bg-blue-100 rounded-full overflow-hidden border border-blue-200">
                    <motion.div 
                      className="h-full bg-blue-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${waterLevel}%` }}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-xs font-bold text-yellow-600 mb-1">
                    <span>☀️ Sun</span>
                    <span>{sunLevel}%</span>
                  </div>
                  <div className="h-3 bg-yellow-100 rounded-full overflow-hidden border border-yellow-200">
                    <motion.div 
                      className="h-full bg-yellow-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${sunLevel}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Soil */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-[#8B4513] rounded-b-2xl border-t-4 border-[#654321]" />

              {/* Plant */}
              <motion.div
                key={stage}
                initial={{ scale: 0, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="relative z-10 mb-12 text-[8rem] md:text-[10rem] filter drop-shadow-2xl select-none"
              >
                {stages[stage].emoji}
              </motion.div>

              {/* Fact Popup */}
              <AnimatePresence>
                {showFact && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur p-6 rounded-2xl shadow-xl text-center w-64 border-2 border-purple-200 z-20"
                  >
                    <span className="text-4xl mb-2 block">✨</span>
                    <h3 className="font-bold text-purple-600 mb-1">Great Job!</h3>
                    <p className="text-sm text-gray-600">{stages[stage].fact}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="text-center mt-4 font-bold text-gray-500">
              Stage {stage + 1}: {stages[stage].name}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function DraggableTool({ emoji, label, color, onDragEnd }: { emoji: string, label: string, color: string, onDragEnd: (e: any, info: any) => void }) {
  return (
    <div className="flex flex-col items-center gap-2 z-50">
      <motion.div
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.2}
        dragSnapToOrigin
        onDragEnd={onDragEnd}
        whileHover={{ scale: 1.1, cursor: 'grab' }}
        whileDrag={{ scale: 1.2, cursor: 'grabbing' }}
        className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl ${color} flex items-center justify-center text-4xl md:text-5xl shadow-lg border-2 select-none touch-none cursor-grab active:cursor-grabbing`}
      >
        {emoji}
      </motion.div>
      <span className="font-bold text-gray-600">{label}</span>
    </div>
  );
}
