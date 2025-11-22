'use client';

import { motion } from 'framer-motion';
import AnimatedFlower from '../animated/AnimatedFlower';
import AnimatedButterfly from '../animated/AnimatedButterfly';

interface GardenSceneProps {
  onAnimalClick: (animal: string) => void;
  weather?: 'sunny' | 'rainy' | 'rainbow' | 'cloudy';
  isNight?: boolean;
}

export default function GardenScene({ onAnimalClick, weather = 'sunny', isNight = false }: GardenSceneProps) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Sky gradient */}
      <div className={`absolute inset-0 transition-colors duration-1000 ${
        isNight
          ? 'bg-gradient-to-b from-indigo-950 via-purple-950 to-slate-900'
          : 'bg-gradient-to-b from-sky-400 via-sky-200 to-green-100'
      }`} />
      
      {/* Background trees behind fence */}
      <div className="absolute bottom-[35%] left-[5%]">
        <svg width="80" height="120" viewBox="0 0 80 120">
          <rect x="35" y="80" width="10" height="40" fill="#654321" />
          <circle cx="40" cy="60" r="35" fill="#2d5016" opacity="0.8" />
          <circle cx="25" cy="55" r="25" fill="#3d6b1f" opacity="0.8" />
          <circle cx="55" cy="55" r="25" fill="#3d6b1f" opacity="0.8" />
        </svg>
      </div>
      
      <div className="absolute bottom-[35%] right-[8%]">
        <svg width="90" height="130" viewBox="0 0 90 130">
          <rect x="40" y="85" width="12" height="45" fill="#654321" />
          <circle cx="46" cy="65" r="38" fill="#2d5016" opacity="0.8" />
          <circle cx="28" cy="60" r="28" fill="#3d6b1f" opacity="0.8" />
          <circle cx="64" cy="60" r="28" fill="#3d6b1f" opacity="0.8" />
        </svg>
      </div>
      
      {/* Fence in background */}
      <div className="absolute bottom-[30%] left-0 right-0 flex items-end gap-2 px-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="w-8 bg-gradient-to-b from-amber-700 to-amber-800 rounded-t-sm"
            style={{
              height: `${80 + (i % 3) * 10}px`,
            }}
          />
        ))}
      </div>
      
      {/* Bushes along the fence */}
      {[10, 30, 50, 70, 90].map((left) => (
        <motion.div
          key={left}
          className="absolute"
          style={{
            bottom: '30%',
            left: `${left}%`,
          }}
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: left * 0.1,
          }}
        >
          <svg width="60" height="40" viewBox="0 0 60 40">
            <ellipse cx="15" cy="25" rx="15" ry="18" fill="#4a7c2c" />
            <ellipse cx="30" cy="20" rx="18" ry="20" fill="#5a8c3c" />
            <ellipse cx="45" cy="25" rx="15" ry="18" fill="#4a7c2c" />
          </svg>
        </motion.div>
      ))}
      
      {/* Garden bed */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-b from-amber-800 to-amber-900" />
      
      {/* Soil texture */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-b from-stone-700 to-stone-900">
        {/* Soil particles */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-black/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
      
      {/* Garden rows */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2">
        {[0, 1, 2].map((row) => (
          <motion.div
            key={row}
            className="absolute w-full h-0.5 bg-stone-800/50"
            style={{
              bottom: `${25 + row * 15}%`,
            }}
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: row * 0.5,
            }}
          />
        ))}
      </div>
      
      {/* Flowers in organized rows */}
      {/* Front row */}
      <AnimatedFlower size={85} stage={4} className="absolute bottom-[12%] left-[10%]" />
      <AnimatedFlower size={80} stage={4} className="absolute bottom-[12%] left-[25%]" />
      <AnimatedFlower size={82} stage={3} className="absolute bottom-[12%] left-[40%]" />
      <AnimatedFlower size={78} stage={4} className="absolute bottom-[12%] right-[35%]" />
      <AnimatedFlower size={84} stage={4} className="absolute bottom-[12%] right-[20%]" />
      <AnimatedFlower size={80} stage={3} className="absolute bottom-[12%] right-[8%]" />
      
      {/* Middle row */}
      <AnimatedFlower size={75} stage={3} className="absolute bottom-[28%] left-[15%]" />
      <AnimatedFlower size={72} stage={4} className="absolute bottom-[28%] left-[32%]" />
      <AnimatedFlower size={74} stage={3} className="absolute bottom-[28%] right-[40%]" />
      <AnimatedFlower size={70} stage={4} className="absolute bottom-[28%] right-[25%]" />
      <AnimatedFlower size={73} stage={3} className="absolute bottom-[28%] right-[12%]" />
      
      {/* Back row */}
      <AnimatedFlower size={60} stage={3} className="absolute bottom-[42%] left-[20%]" />
      <AnimatedFlower size={58} stage={2} className="absolute bottom-[42%] left-[38%]" />
      <AnimatedFlower size={62} stage={3} className="absolute bottom-[42%] right-[42%]" />
      <AnimatedFlower size={56} stage={2} className="absolute bottom-[42%] right-[28%]" />
      <AnimatedFlower size={60} stage={3} className="absolute bottom-[42%] right-[15%]" />
      
      {/* Vegetable plants - Tomato plants with stakes */}
      <div className="absolute bottom-[15%] left-[50%]">
        <svg width="60" height="80" viewBox="0 0 60 80">
          <line x1="30" y1="0" x2="30" y2="70" stroke="#8B4513" strokeWidth="2" />
          <path d="M 20 40 Q 30 20 40 40 Q 30 50 20 40" fill="#228B22" />
          <circle cx="25" cy="35" r="6" fill="#FF6347" />
          <circle cx="35" cy="38" r="5" fill="#FF6347" />
          <path d="M 15 55 Q 30 40 45 55 Q 30 65 15 55" fill="#228B22" />
          <circle cx="22" cy="52" r="7" fill="#FF6347" />
          <circle cx="38" cy="54" r="6" fill="#FF6347" />
        </svg>
      </div>
      
      <div className="absolute bottom-[15%] right-[45%]">
        <svg width="55" height="75" viewBox="0 0 55 75">
          <line x1="27" y1="0" x2="27" y2="65" stroke="#8B4513" strokeWidth="2" />
          <path d="M 18 35 Q 27 18 36 35 Q 27 45 18 35" fill="#228B22" />
          <circle cx="23" cy="32" r="5" fill="#FF6347" />
          <circle cx="31" cy="34" r="5" fill="#FF6347" />
          <path d="M 14 50 Q 27 38 40 50 Q 27 60 14 50" fill="#228B22" />
          <circle cx="20" cy="48" r="6" fill="#FF6347" />
          <circle cx="34" cy="50" r="6" fill="#FF6347" />
        </svg>
      </div>
      
      {/* Carrots with green tops */}
      <div className="absolute bottom-[13%] left-[65%]">
        <svg width="40" height="50" viewBox="0 0 40 50">
          <path d="M 20 15 L 15 45 L 20 50 L 25 45 Z" fill="#FF8C00" />
          <path d="M 12 10 L 15 0 L 18 10" fill="#228B22" />
          <path d="M 18 12 L 20 0 L 22 12" fill="#2E8B57" />
          <path d="M 22 10 L 25 0 L 28 10" fill="#228B22" />
        </svg>
      </div>
      
      <div className="absolute bottom-[13%] left-[72%]">
        <svg width="38" height="48" viewBox="0 0 38 48">
          <path d="M 19 14 L 14 42 L 19 47 L 24 42 Z" fill="#FF8C00" />
          <path d="M 11 9 L 14 0 L 17 9" fill="#228B22" />
          <path d="M 17 11 L 19 0 L 21 11" fill="#2E8B57" />
          <path d="M 21 9 L 24 0 L 27 9" fill="#228B22" />
        </svg>
      </div>
      
      {/* Small herb plants */}
      {[18, 28, 82, 88].map((left) => (
        <motion.div
          key={`herb-${left}`}
          className="absolute bottom-[14%]"
          style={{ left: `${left}%` }}
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: left * 0.05,
          }}
        >
          <svg width="30" height="35" viewBox="0 0 30 35">
            <ellipse cx="15" cy="25" rx="10" ry="12" fill="#3CB371" />
            <ellipse cx="10" cy="20" rx="8" ry="10" fill="#2E8B57" />
            <ellipse cx="20" cy="20" rx="8" ry="10" fill="#2E8B57" />
          </svg>
        </motion.div>
      ))}
      
      {/* Butterflies visiting flowers */}
      <motion.div
        className="absolute"
        animate={{
          x: [0, 100, 200, 300, 400, 500],
          y: [0, -20, -10, -30, -15, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
        }}
        style={{ bottom: '25%', left: '10%' }}
      >
        <AnimatedButterfly 
          size={65}
          onClick={() => onAnimalClick('butterfly')}
        />
      </motion.div>
      
      <motion.div
        className="absolute"
        animate={{
          x: [500, 400, 300, 200, 100, 0],
          y: [0, -15, -25, -10, -20, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          delay: 5,
        }}
        style={{ bottom: '35%', right: '10%' }}
      >
        <AnimatedButterfly 
          size={70}
          onClick={() => onAnimalClick('butterfly')}
        />
      </motion.div>
      
      <motion.div
        className="absolute"
        animate={{
          y: [-10, 10, -10],
          x: [-5, 5, -5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        style={{ bottom: '45%', left: '45%' }}
      >
        <AnimatedButterfly 
          size={60}
          onClick={() => onAnimalClick('butterfly')}
        />
      </motion.div>
      
      {/* Watering can */}
      <motion.div
        className="absolute bottom-[8%] right-[5%]"
        animate={{
          rotate: [-5, 5, -5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        <div className="relative w-20 h-16">
          {/* Can body */}
          <div className="absolute w-16 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-lg bottom-0 left-0" />
          {/* Handle */}
          <div className="absolute w-10 h-8 border-4 border-red-600 rounded-t-full right-0 bottom-2" />
          {/* Spout */}
          <div className="absolute w-12 h-3 bg-gradient-to-r from-red-700 to-red-600 rounded-r-full left-14 bottom-8" />
        </div>
      </motion.div>
      
      {/* Garden tools */}
      <div className="absolute bottom-[6%] left-[5%]">
        <div className="flex gap-2">
          {/* Shovel */}
          <div className="relative w-8 h-16">
            <div className="absolute w-2 h-12 bg-amber-700 left-1/2 top-0 transform -translate-x-1/2 rounded-t" />
            <div className="absolute w-6 h-6 bg-gray-600 left-1/2 bottom-0 transform -translate-x-1/2 rounded-b" />
          </div>
          {/* Rake */}
          <div className="relative w-8 h-16">
            <div className="absolute w-2 h-12 bg-amber-700 left-1/2 top-0 transform -translate-x-1/2 rounded-t" />
            <div className="absolute w-8 h-2 bg-gray-600 left-0 bottom-0 flex gap-0.5">
              <div className="w-1 h-4 bg-gray-600" />
              <div className="w-1 h-4 bg-gray-600" />
              <div className="w-1 h-4 bg-gray-600" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Bees flying around */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-yellow-400"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + Math.random() * 20}%`,
          }}
          animate={{
            x: [0, Math.random() * 60 - 30, 0],
            y: [0, Math.random() * 40 - 20, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          {/* Bee stripes */}
          <div className="absolute w-0.5 h-2 bg-black left-0.5" />
          <div className="absolute w-0.5 h-2 bg-black right-0.5" />
        </motion.div>
      ))}
      
      {/* Sun - only during day */}
      {!isNight && (weather === 'sunny' || weather === 'cloudy') && (
        <motion.div
          className="absolute top-12 left-16 w-20 h-20 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 shadow-xl"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        />
      )}
    </div>
  );
}
