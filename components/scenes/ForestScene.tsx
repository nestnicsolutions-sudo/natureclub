'use client';

import { motion } from 'framer-motion';
import AnimatedTree from '../animated/AnimatedTree';
import AnimatedBird from '../animated/AnimatedBird';
import AnimatedDeer from '../animated/AnimatedDeer';
import AnimatedRabbit from '../animated/AnimatedRabbit';

interface ForestSceneProps {
  onAnimalClick: (animal: string) => void;
  weather?: 'sunny' | 'rainy' | 'rainbow' | 'cloudy';
  isNight?: boolean;
}

export default function ForestScene({ onAnimalClick, weather = 'sunny', isNight = false }: ForestSceneProps) {
  
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Realistic gradient background - forest atmosphere */}
      <div className={`absolute inset-0 transition-colors duration-1000 ${
        isNight 
          ? 'bg-gradient-to-b from-indigo-900 via-blue-950 to-green-950'
          : 'bg-gradient-to-b from-sky-400 via-sky-300 to-green-300'
      }`} />
      
      {/* Mountain silhouette in background */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3">
        <svg viewBox="0 0 1200 300" className="w-full h-full">
          <path
            d="M 0 300 L 0 200 Q 200 100 400 150 Q 600 50 800 120 Q 1000 80 1200 150 L 1200 300 Z"
            fill="url(#mountainGradient)"
          />
          <defs>
            <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#1e3a1e', stopOpacity: 0.9 }} />
              <stop offset="100%" style={{ stopColor: '#2d5a2d', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Forest ground - darker and more realistic */}
      <div className={`absolute bottom-0 left-0 right-0 h-1/2 transition-colors duration-1000 ${
        isNight
          ? 'bg-gradient-to-b from-green-950 to-gray-950'
          : 'bg-gradient-to-b from-green-700 to-green-900'
      }`} />
      
      {/* Grass texture */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-green-900 to-transparent"
        animate={{
          opacity: [0.7, 0.9, 0.7],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      />
      
      {/* Trees in background - Dense Forest Generation */}
      {Array.from({ length: 20 }).map((_, i) => {
        // Randomize position and size for natural look
        const isBack = i < 12; // More trees in back
        const bottomPos = isBack ? 35 + Math.random() * 12 : 15 + Math.random() * 20;
        const size = isBack ? 80 + Math.random() * 60 : 150 + Math.random() * 100;
        const leftPos = (i * 5) + Math.random() * 10; // Spread across width
        const zIndex = Math.floor(50 - bottomPos); // Lower trees have higher z-index (closer)
        
        return (
          <div 
            key={`tree-${i}`}
            className="absolute"
            style={{ 
              bottom: `${bottomPos}%`, 
              left: `${leftPos}%`,
              zIndex: zIndex,
              filter: isBack ? 'blur(0.5px)' : 'none',
              opacity: isBack ? 0.7 : 1
            }}
          >
            <AnimatedTree 
              size={size} 
              stage={isBack ? 3 : 4} 
              onClick={() => console.log('Tree clicked!')}
            />
          </div>
        );
      })}
      
      {/* Hero Trees (Interactive) */}
      <div className="absolute bottom-[10%] left-[10%] z-20">
        <AnimatedTree 
          size={220} 
          stage={4} 
          onClick={() => console.log('Tree clicked!')}
        />
      </div>
      <div className="absolute bottom-[12%] right-[15%] z-20">
        <AnimatedTree 
          size={200} 
          stage={4} 
          onClick={() => console.log('Tree clicked!')}
        />
      </div>
      
      {/* Forest animals */}
      <motion.div
        className="absolute"
        style={{ bottom: '28%', left: '40%' } as any}
        whileHover={{ scale: 1.1 }}
      >
        <AnimatedBird 
          size={70} 
          color="#FF6347"
          onClick={() => onAnimalClick('bird')}
        />
      </motion.div>
      
      <motion.div
        className="absolute"
        style={{ bottom: '18%', right: '35%' } as any}
        whileHover={{ scale: 1.1 }}
      >
        <AnimatedDeer 
          size={90}
          onClick={() => onAnimalClick('deer')}
        />
      </motion.div>
      
      <motion.div
        className="absolute"
        style={{ bottom: '15%', left: '60%' } as any}
        whileHover={{ scale: 1.1 }}
      >
        <AnimatedRabbit 
          size={65}
          onClick={() => onAnimalClick('rabbit')}
        />
      </motion.div>
      
      {/* Sunlight rays - only show in sunny weather during day */}
      {weather === 'sunny' && !isNight && (
        <>
          <motion.div
            className="absolute top-10 right-20 w-2 h-40 bg-gradient-to-b from-yellow-300/50 to-transparent rotate-12"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          />
          <motion.div
            className="absolute top-10 right-32 w-2 h-32 bg-gradient-to-b from-yellow-300/40 to-transparent rotate-6"
            animate={{
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: 1,
            }}
          />
        </>
      )}
      
      {/* Floating particles (dust/pollen) */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/60 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 60}%`,
          } as any}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}
