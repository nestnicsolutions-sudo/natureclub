'use client';

import { motion } from 'framer-motion';
import AnimatedBird from '../animated/AnimatedBird';

interface SkySceneProps {
  onAnimalClick: (animal: string) => void;
  weather?: 'sunny' | 'rainy' | 'rainbow' | 'cloudy';
  isNight?: boolean;
}

export default function SkyScene({ onAnimalClick, weather = 'sunny', isNight = false }: SkySceneProps) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Layered sky gradient - realistic atmosphere */}
      <div className={`absolute inset-0 transition-colors duration-1000 ${
        isNight
          ? 'bg-gradient-to-b from-indigo-950 via-blue-950 to-purple-900'
          : 'bg-gradient-to-b from-blue-500 via-blue-300 to-blue-100'
      }`} />
      
      {/* Sun with glow - only during day */}
      {!isNight && (weather === 'sunny' || weather === 'cloudy') && (
        <motion.div
          className="absolute top-24 right-32"
          animate={{
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        >
        <div className="relative w-32 h-32">
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full bg-yellow-200 opacity-40 blur-3xl scale-150" />
          {/* Sun */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-200 via-yellow-300 to-orange-400" />
        </div>
        </motion.div>
      )}
      
      {/* Multiple cloud layers for depth */}
      {/* Far clouds */}
      <motion.div
        className="absolute top-16 left-[5%] opacity-40"
        animate={{
          x: [-50, 1300],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
        }}
      >
        <div className="relative w-40 h-20">
          <div className="absolute w-20 h-20 bg-white rounded-full left-0 top-0" />
          <div className="absolute w-24 h-24 bg-white rounded-full left-16 top-0" />
          <div className="absolute w-20 h-20 bg-white rounded-full left-32 top-2" />
        </div>
      </motion.div>
      
      {/* Middle layer clouds */}
      <motion.div
        className="absolute top-32 right-[20%] opacity-60"
        animate={{
          x: [0, -1300],
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
        }}
      >
        <div className="relative w-48 h-24">
          <div className="absolute w-24 h-24 bg-white rounded-full left-0 top-0 shadow-lg" />
          <div className="absolute w-28 h-28 bg-white rounded-full left-20 top-0 shadow-lg" />
          <div className="absolute w-24 h-24 bg-white rounded-full left-40 top-2 shadow-lg" />
        </div>
      </motion.div>
      
      <motion.div
        className="absolute top-[45%] left-[10%] opacity-70"
        animate={{
          x: [-100, 1400],
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          delay: 5,
        }}
      >
        <div className="relative w-56 h-28">
          <div className="absolute w-28 h-28 bg-white rounded-full left-0 top-0 shadow-xl" />
          <div className="absolute w-32 h-32 bg-white rounded-full left-24 top-0 shadow-xl" />
          <div className="absolute w-28 h-28 bg-white rounded-full left-48 top-2 shadow-xl" />
        </div>
      </motion.div>
      
      {/* Close clouds - big and detailed */}
      <motion.div
        className="absolute bottom-[20%] right-[5%] opacity-90"
        animate={{
          x: [1400, -200],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          delay: 10,
        }}
      >
        <div className="relative w-64 h-32">
          <div className="absolute w-32 h-32 bg-white rounded-full left-0 top-0 shadow-2xl" />
          <div className="absolute w-36 h-36 bg-white rounded-full left-28 top-0 shadow-2xl" />
          <div className="absolute w-32 h-32 bg-white rounded-full left-56 top-2 shadow-2xl" />
          {/* Cloud highlights */}
          <div className="absolute w-16 h-16 bg-white/80 rounded-full left-8 top-4" />
          <div className="absolute w-20 h-20 bg-white/80 rounded-full left-36 top-4" />
        </div>
      </motion.div>
      
      {/* Birds flying in formation */}
      <motion.div
        className="absolute"
        style={{ top: '20%', left: '15%' }}
        animate={{
          x: [0, 400, 800],
          y: [0, -50, -20],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
        }}
      >
        <AnimatedBird 
          size={50} 
          color="#FF6347"
          onClick={() => onAnimalClick('bird')}
        />
      </motion.div>
      
      <motion.div
        className="absolute"
        style={{ top: '22%', left: '20%' }}
        animate={{
          x: [0, 400, 800],
          y: [0, -45, -15],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          delay: 0.5,
        }}
      >
        <AnimatedBird 
          size={48} 
          color="#FF4500"
          onClick={() => onAnimalClick('bird')}
        />
      </motion.div>
      
      <motion.div
        className="absolute"
        style={{ top: '24%', left: '10%' }}
        animate={{
          x: [0, 400, 800],
          y: [0, -40, -10],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          delay: 1,
        }}
      >
        <AnimatedBird 
          size={46} 
          color="#DC143C"
          onClick={() => onAnimalClick('bird')}
        />
      </motion.div>
      
      {/* Solo birds */}
      <motion.div
        className="absolute"
        style={{ top: '50%', right: '25%' }}
        animate={{
          x: [0, -300],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          delay: 3,
        }}
      >
        <AnimatedBird 
          size={55} 
          color="#4A90E2"
          onClick={() => onAnimalClick('bird')}
        />
      </motion.div>
      
      <motion.div
        className="absolute"
        style={{ top: '35%', left: '40%' }}
        animate={{
          x: [0, 200],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          delay: 7,
        }}
      >
        <AnimatedBird 
          size={60} 
          color="#FF1493"
          onClick={() => onAnimalClick('bird')}
        />
      </motion.div>
      
      {/* Airplane trail (fun detail) */}
      <motion.div
        className="absolute top-[15%]"
        animate={{
          x: [-100, 1400],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          delay: 15,
        }}
      >
        {/* Trail */}
        <div className="relative">
          <div className="w-48 h-1 bg-white/60" />
          {/* Tiny plane */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
            <div className="w-4 h-1 bg-gray-400 relative">
              <div className="absolute w-6 h-px bg-gray-400 top-0 left-1/2 transform -translate-x-1/2" />
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Sunlight rays through clouds */}
      <motion.div
        className="absolute top-32 right-40 w-2 h-64 bg-gradient-to-b from-yellow-200/40 to-transparent rotate-12"
        animate={{
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
      />
      <motion.div
        className="absolute top-32 right-32 w-3 h-72 bg-gradient-to-b from-yellow-200/50 to-transparent rotate-6"
        animate={{
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          delay: 1,
        }}
      />
      
      {/* Flying insects/dots for depth */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-black/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 80}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
}
