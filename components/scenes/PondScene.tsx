'use client';

import { motion } from 'framer-motion';
import AnimatedBird from '../animated/AnimatedBird';
import AnimatedButterfly from '../animated/AnimatedButterfly';

interface PondSceneProps {
  onAnimalClick: (animal: string) => void;
  weather?: 'sunny' | 'rainy' | 'rainbow' | 'cloudy';
  isNight?: boolean;
}

export default function PondScene({ onAnimalClick, weather = 'sunny', isNight = false }: PondSceneProps) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Sky background */}
      <div className={`absolute inset-0 transition-colors duration-1000 ${
        isNight
          ? 'bg-gradient-to-b from-indigo-950 via-blue-950 to-cyan-950'
          : 'bg-gradient-to-b from-sky-400 via-sky-300 to-cyan-200'
      }`} />
      
      {/* Sun - only during day */}
      {!isNight && (weather === 'sunny' || weather === 'cloudy') && (
        <motion.div
          className="absolute top-20 right-28 w-24 h-24 rounded-full bg-gradient-to-br from-yellow-200 to-orange-300 shadow-2xl"
          animate={{
            scale: [1, 1.06, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />
      )}
      
      {/* Distant trees/forest background */}
      <div className="absolute bottom-[45%] left-0 right-0 h-32">
        <svg viewBox="0 0 1200 150" className="w-full h-full">
          {Array.from({ length: 15 }).map((_, i) => (
            <g key={i}>
              <rect x={i * 80} y="80" width="15" height="70" fill="#654321" opacity="0.6" />
              <circle cx={i * 80 + 7} cy="70" r="35" fill="#2d5016" opacity="0.7" />
            </g>
          ))}
        </svg>
      </div>
      
      {/* Pond water */}
      <div className={`absolute bottom-0 left-0 right-0 h-[55%] transition-colors duration-1000 ${
        isNight
          ? 'bg-gradient-to-b from-cyan-950 via-blue-900 to-slate-950'
          : 'bg-gradient-to-b from-cyan-400 via-blue-400 to-blue-600'
      }`}>
        {/* Water ripples */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border-2 border-white/30"
            style={{
              left: `${20 + i * 12}%`,
              top: `${30 + (i % 3) * 20}%`,
              width: '80px',
              height: '40px',
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
      
      {/* Lily pads */}
      {[15, 35, 55, 75, 25, 65, 45].map((left, i) => (
        <motion.div
          key={`lily-${i}`}
          className="absolute"
          style={{
            left: `${left}%`,
            bottom: `${15 + (i % 3) * 12}%`,
          }}
          animate={{
            y: [0, -5, 0],
            rotate: [0, 2, 0],
          }}
          transition={{
            duration: 3 + i * 0.3,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        >
          <svg width="70" height="70" viewBox="0 0 70 70">
            <ellipse cx="35" cy="35" rx="32" ry="28" fill="#2d6b2d" opacity="0.9" />
            <ellipse cx="35" cy="35" rx="28" ry="24" fill="#3d8b3d" opacity="0.8" />
            <path d="M 35 7 L 35 35" stroke="#2d5016" strokeWidth="2" />
          </svg>
          {/* Lotus flower on some lily pads */}
          {i % 2 === 0 && (
            <motion.div
              className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            >
              <svg width="30" height="35" viewBox="0 0 30 35">
                {/* Petals */}
                <ellipse cx="15" cy="20" rx="8" ry="12" fill="#FFB6C1" transform="rotate(-30 15 20)" />
                <ellipse cx="15" cy="20" rx="8" ry="12" fill="#FFB6C1" transform="rotate(30 15 20)" />
                <ellipse cx="15" cy="20" rx="8" ry="12" fill="#FFC0CB" />
                <ellipse cx="15" cy="20" rx="8" ry="12" fill="#FFD0DB" transform="rotate(60 15 20)" />
                <ellipse cx="15" cy="20" rx="8" ry="12" fill="#FFD0DB" transform="rotate(-60 15 20)" />
                {/* Center */}
                <circle cx="15" cy="20" r="4" fill="#FFD700" />
              </svg>
            </motion.div>
          )}
        </motion.div>
      ))}
      
      {/* Cattails/Reeds */}
      {[5, 12, 88, 93, 8, 90].map((left, i) => (
        <motion.div
          key={`reed-${i}`}
          className="absolute"
          style={{
            left: `${left}%`,
            bottom: '10%',
          }}
          animate={{
            rotate: [0, 3, 0, -3, 0],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        >
          <svg width="20" height="120" viewBox="0 0 20 120">
            <line x1="10" y1="0" x2="10" y2="100" stroke="#4a6b2c" strokeWidth="3" />
            <ellipse cx="10" cy="15" rx="8" ry="18" fill="#6B4423" />
          </svg>
        </motion.div>
      ))}
      
      {/* Frogs on lily pads */}
      <motion.div
        className="absolute"
        style={{ left: '35%', bottom: '28%' }}
        whileHover={{ scale: 1.2 }}
        onClick={() => onAnimalClick('frog')}
      >
        <svg width="60" height="40" viewBox="0 0 60 40">
          {/* Frog body */}
          <ellipse cx="30" cy="25" rx="22" ry="16" fill="#4CAF50" />
          <ellipse cx="30" cy="25" rx="18" ry="13" fill="#66BB6A" />
          {/* Eyes */}
          <circle cx="22" cy="18" r="8" fill="#FFF" />
          <circle cx="38" cy="18" r="8" fill="#FFF" />
          <circle cx="22" cy="18" r="5" fill="#000" />
          <circle cx="38" cy="18" r="5" fill="#000" />
          {/* Legs */}
          <ellipse cx="12" cy="32" rx="10" ry="6" fill="#4CAF50" />
          <ellipse cx="48" cy="32" rx="10" ry="6" fill="#4CAF50" />
        </svg>
      </motion.div>
      
      <motion.div
        className="absolute"
        style={{ left: '65%', bottom: '20%' }}
        whileHover={{ scale: 1.2 }}
        onClick={() => onAnimalClick('frog')}
        animate={{
          y: [0, -3, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          delay: 0.5,
        }}
      >
        <svg width="55" height="38" viewBox="0 0 55 38">
          <ellipse cx="27" cy="23" rx="20" ry="14" fill="#4CAF50" />
          <ellipse cx="27" cy="23" rx="16" ry="11" fill="#66BB6A" />
          <circle cx="20" cy="17" r="7" fill="#FFF" />
          <circle cx="34" cy="17" r="7" fill="#FFF" />
          <circle cx="20" cy="17" r="4" fill="#000" />
          <circle cx="34" cy="17" r="4" fill="#000" />
          <ellipse cx="10" cy="30" rx="9" ry="5" fill="#4CAF50" />
          <ellipse cx="44" cy="30" rx="9" ry="5" fill="#4CAF50" />
        </svg>
      </motion.div>
      
      {/* Dragonflies */}
      {[25, 55, 75].map((left, i) => (
        <motion.div
          key={`dragonfly-${i}`}
          className="absolute"
          style={{
            left: `${left}%`,
            top: `${35 + i * 8}%`,
          }}
          animate={{
            x: [0, 40, 80, 40, 0],
            y: [0, -20, -10, -30, 0],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: i * 1.5,
          }}
          whileHover={{ scale: 1.3 }}
          onClick={() => onAnimalClick('dragonfly')}
        >
          <svg width="45" height="20" viewBox="0 0 45 20">
            {/* Wings */}
            <ellipse cx="12" cy="8" rx="10" ry="6" fill="#87CEEB" opacity="0.6" />
            <ellipse cx="12" cy="12" rx="10" ry="6" fill="#87CEEB" opacity="0.6" />
            <ellipse cx="28" cy="8" rx="10" ry="6" fill="#87CEEB" opacity="0.5" />
            <ellipse cx="28" cy="12" rx="10" ry="6" fill="#87CEEB" opacity="0.5" />
            {/* Body */}
            <rect x="18" y="8" width="16" height="4" rx="2" fill="#4169E1" />
            <circle cx="16" cy="10" r="3" fill="#1E40AF" />
          </svg>
        </motion.div>
      ))}
      
      {/* Fish jumping */}
      <motion.div
        className="absolute"
        style={{ left: '45%', bottom: '35%' }}
        animate={{
          y: [0, -60, 0],
          rotate: [0, 180, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 5,
        }}
      >
        <svg width="50" height="30" viewBox="0 0 50 30">
          <ellipse cx="25" cy="15" rx="20" ry="10" fill="#FF6B35" />
          <ellipse cx="25" cy="15" rx="16" ry="8" fill="#FF8C61" />
          <circle cx="18" cy="12" r="3" fill="#000" />
          <path d="M 42 15 L 50 8 L 50 22 Z" fill="#FF6B35" />
        </svg>
      </motion.div>
      
      {/* Ducks swimming */}
      <motion.div
        className="absolute"
        style={{ left: '20%', bottom: '32%' }}
        animate={{
          x: [0, 200, 400, 200, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        whileHover={{ scale: 1.15 }}
        onClick={() => onAnimalClick('duck')}
      >
        <svg width="70" height="60" viewBox="0 0 70 60">
          {/* Body */}
          <ellipse cx="35" cy="40" rx="28" ry="18" fill="#8B7355" />
          {/* Head */}
          <circle cx="28" cy="25" r="15" fill="#654321" />
          {/* Beak */}
          <ellipse cx="18" cy="25" rx="8" ry="5" fill="#FFA500" />
          {/* Eye */}
          <circle cx="28" cy="22" r="3" fill="#000" />
          {/* Wing */}
          <path d="M 40 35 Q 55 30 55 42 Q 50 45 40 42 Z" fill="#654321" opacity="0.8" />
        </svg>
      </motion.div>
      
      {/* Birds flying above pond */}
      <motion.div
        className="absolute"
        style={{ top: '15%', left: '60%' }}
        animate={{
          x: [-100, 300],
          y: [0, -20, 0, 20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
        }}
      >
        <AnimatedBird 
          size={65} 
          color="#4A90E2"
          onClick={() => onAnimalClick('bird')}
        />
      </motion.div>
      
      {/* Butterflies near flowers */}
      <motion.div
        className="absolute"
        style={{ top: '25%', left: '10%' }}
        animate={{
          x: [0, 50, 100, 50, 0],
          y: [0, -15, -5, -20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
        }}
      >
        <AnimatedButterfly 
          size={60}
          onClick={() => onAnimalClick('butterfly')}
        />
      </motion.div>
    </div>
  );
}
