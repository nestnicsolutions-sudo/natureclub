'use client';

import { motion } from 'framer-motion';
import AnimatedFlower from '../animated/AnimatedFlower';
import AnimatedButterfly from '../animated/AnimatedButterfly';
import AnimatedRabbit from '../animated/AnimatedRabbit';
import AnimatedBird from '../animated/AnimatedBird';

interface MeadowSceneProps {
  onAnimalClick: (animal: string) => void;
  weather?: 'sunny' | 'rainy' | 'rainbow' | 'cloudy';
  isNight?: boolean;
}

export default function MeadowScene({ onAnimalClick, weather = 'sunny', isNight = false }: MeadowSceneProps) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Sky background with realistic gradient */}
      <div className={`absolute inset-0 transition-colors duration-1000 ${
        isNight
          ? 'bg-gradient-to-b from-indigo-900 via-purple-950 to-blue-950'
          : 'bg-gradient-to-b from-blue-300 via-blue-200 to-yellow-100'
      }`} />
      
      {/* Sun - only show during day and sunny/cloudy weather */}
      {!isNight && (weather === 'sunny' || weather === 'cloudy') && (
        <motion.div
          className="absolute top-16 right-24 w-24 h-24 rounded-full bg-gradient-to-br from-yellow-200 to-orange-300 shadow-2xl"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        >
        {/* Sun rays */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (360 / 12) * i;
          return (
            <motion.div
              key={i}
              className="absolute w-1 h-12 bg-gradient-to-t from-yellow-300/60 to-transparent"
              style={{
                left: '50%',
                top: '50%',
                transformOrigin: 'top center',
                transform: `translate(-50%, -100%) rotate(${angle}deg)`,
              }}
              animate={{
                opacity: [0.4, 0.8, 0.4],
                scaleY: [1, 1.2, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          );
        })}
      </motion.div>
      )}
      
      {/* Clouds - show during day only */}
      {!isNight && (
        <motion.div
          className="absolute top-20 left-[10%] opacity-80"
          animate={{
            x: [0, 100, 0],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
          }}
        >
          <div className="relative w-32 h-16">
            <div className="absolute w-16 h-16 bg-white rounded-full left-0 top-0" />
            <div className="absolute w-20 h-20 bg-white rounded-full left-12 top-0" />
            <div className="absolute w-16 h-16 bg-white rounded-full left-24 top-2" />
          </div>
        </motion.div>
      )}
      
      {!isNight && (
        <motion.div
          className="absolute top-32 right-[15%] opacity-70"
          animate={{
            x: [0, -80, 0],
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
          }}
        >
        <div className="relative w-28 h-14">
          <div className="absolute w-14 h-14 bg-white rounded-full left-0 top-0" />
          <div className="absolute w-16 h-16 bg-white rounded-full left-10 top-0" />
          <div className="absolute w-12 h-12 bg-white rounded-full left-20 top-2" />
        </div>
        </motion.div>
      )}
      
      {/* Rolling hills */}
      <svg viewBox="0 0 1200 400" className="absolute bottom-0 w-full h-2/3">
        <path
          d="M 0 400 L 0 250 Q 300 180 600 250 Q 900 320 1200 240 L 1200 400 Z"
          fill="url(#hillGradient1)"
        />
        <path
          d="M 0 400 L 0 280 Q 400 220 800 280 Q 1000 320 1200 290 L 1200 400 Z"
          fill="url(#hillGradient2)"
        />
        <defs>
          <linearGradient id="hillGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#86C232', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#61892F', stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="hillGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#9ACD32', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#6B8E23', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Grass texture at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-green-700 to-transparent" />
      
      {/* Flowers scattered across meadow */}
      <AnimatedFlower size={70} stage={4} className="absolute bottom-[25%] left-[15%]" />
      <AnimatedFlower size={60} stage={3} className="absolute bottom-[30%] left-[25%]" />
      <AnimatedFlower size={65} stage={4} className="absolute bottom-[22%] right-[35%]" />
      <AnimatedFlower size={55} stage={3} className="absolute bottom-[28%] right-[20%]" />
      <AnimatedFlower size={75} stage={4} className="absolute bottom-[20%] left-[45%]" />
      <AnimatedFlower size={50} stage={3} className="absolute bottom-[35%] right-[50%]" />
      
      {/* Butterflies */}
      <motion.div
        className="absolute"
        style={{ bottom: '35%', left: '20%' }}
        whileHover={{ scale: 1.2 }}
      >
        <AnimatedButterfly 
          size={65}
          onClick={() => onAnimalClick('butterfly')}
        />
      </motion.div>
      
      <motion.div
        className="absolute"
        style={{ bottom: '40%', right: '25%' }}
        whileHover={{ scale: 1.2 }}
      >
        <AnimatedButterfly 
          size={70}
          onClick={() => onAnimalClick('butterfly')}
        />
      </motion.div>
      
      {/* Bird flying */}
      <motion.div
        className="absolute"
        style={{ top: '25%', left: '30%' }}
        animate={{
          x: [0, 200, 400],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
        }}
        whileHover={{ scale: 1.2 }}
      >
        <AnimatedBird 
          size={60} 
          color="#4A90E2"
          onClick={() => onAnimalClick('bird')}
        />
      </motion.div>
      
      {/* Rabbit */}
      <motion.div
        className="absolute"
        style={{ bottom: '18%', right: '40%' }}
        whileHover={{ scale: 1.2 }}
      >
        <AnimatedRabbit 
          size={70}
          onClick={() => onAnimalClick('rabbit')}
        />
      </motion.div>
      
      {/* Grass blades swaying */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 w-1 bg-gradient-to-t from-green-800 to-green-500"
          style={{
            left: `${i * 5 + 2}%`,
            height: `${20 + Math.random() * 20}px`,
          }}
          animate={{
            rotate: [-2, 2, -2],
          }}
          transition={{
            duration: 2 + Math.random(),
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
      
      {/* Floating seeds/dandelions */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${20 + Math.random() * 40}%`,
          }}
          animate={{
            y: [0, -100],
            x: [0, Math.random() * 50 - 25],
            opacity: [0.6, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
}
