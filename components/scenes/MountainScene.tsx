'use client';

import { motion } from 'framer-motion';
import AnimatedBird from '../animated/AnimatedBird';

interface MountainSceneProps {
  onAnimalClick: (animal: string) => void;
  weather?: 'sunny' | 'rainy' | 'rainbow' | 'cloudy';
  isNight?: boolean;
}

export default function MountainScene({ onAnimalClick, weather = 'sunny', isNight = false }: MountainSceneProps) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Sky background */}
      <div className={`absolute inset-0 transition-colors duration-1000 ${
        isNight
          ? 'bg-gradient-to-b from-indigo-950 via-purple-950 to-gray-900'
          : 'bg-gradient-to-b from-blue-400 via-blue-300 to-cyan-200'
      }`} />
      
      {/* Sun - only during day */}
      {!isNight && (weather === 'sunny' || weather === 'cloudy') && (
        <motion.div
          className="absolute top-16 right-24"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        >
          <div className="relative w-28 h-28">
            <div className="absolute inset-0 rounded-full bg-yellow-100 opacity-40 blur-3xl scale-150" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-200 via-yellow-300 to-orange-400" />
          </div>
        </motion.div>
      )}
      
      {/* Distant mountains (background) */}
      <svg viewBox="0 0 1200 500" className="absolute bottom-0 w-full h-full">
        <defs>
          <linearGradient id="mountain1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#4A5568', stopOpacity: 0.5 }} />
            <stop offset="100%" style={{ stopColor: '#2D3748', stopOpacity: 0.6 }} />
          </linearGradient>
          <linearGradient id="mountain2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#718096', stopOpacity: 0.6 }} />
            <stop offset="100%" style={{ stopColor: '#4A5568', stopOpacity: 0.7 }} />
          </linearGradient>
          <linearGradient id="mountain3" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#A0AEC0', stopOpacity: 0.8 }} />
            <stop offset="100%" style={{ stopColor: '#718096', stopOpacity: 0.9 }} />
          </linearGradient>
        </defs>
        
        {/* Back mountains */}
        <path
          d="M 0 500 L 200 250 L 400 300 L 600 200 L 800 280 L 1000 220 L 1200 320 L 1200 500 Z"
          fill="url(#mountain1)"
        />
        
        {/* Middle mountains */}
        <path
          d="M 0 500 L 150 320 L 300 380 L 500 260 L 700 340 L 900 280 L 1100 360 L 1200 380 L 1200 500 Z"
          fill="url(#mountain2)"
        />
        
        {/* Front mountains with snow caps */}
        <g>
          <path
            d="M 0 500 L 100 400 L 250 320 L 400 360 L 600 280 L 800 360 L 950 320 L 1100 400 L 1200 420 L 1200 500 Z"
            fill="url(#mountain3)"
          />
          {/* Snow caps */}
          <path d="M 250 320 L 300 350 L 350 340 L 400 360 L 350 330 L 300 340 Z" fill="#FFF" opacity="0.9" />
          <path d="M 600 280 L 650 310 L 700 300 L 750 320 L 700 290 L 650 300 Z" fill="#FFF" opacity="0.9" />
          <path d="M 950 320 L 1000 350 L 1050 340 L 1000 330 Z" fill="#FFF" opacity="0.9" />
        </g>
      </svg>
      
      {/* Rocky cliffs */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-b from-gray-600 to-gray-800">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-gray-700 rounded-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.6,
            }}
          />
        ))}
      </div>
      
      {/* Pine trees */}
      {[8, 15, 85, 92, 12, 88].map((left, i) => (
        <motion.div
          key={`tree-${i}`}
          className="absolute"
          style={{
            left: `${left}%`,
            bottom: `${15 + (i % 2) * 8}%`,
          }}
          animate={{
            rotate: [0, 1, 0, -1, 0],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
          }}
        >
          <svg width="50" height="100" viewBox="0 0 50 100">
            <rect x="22" y="60" width="6" height="40" fill="#5D4037" />
            <path d="M 25 20 L 5 50 L 15 50 L 0 70 L 12 70 L 0 85 L 50 85 L 38 70 L 50 70 L 35 50 L 45 50 Z" fill="#1B5E20" />
          </svg>
        </motion.div>
      ))}
      
      {/* Mountain goats */}
      <motion.div
        className="absolute"
        style={{ left: '25%', bottom: '35%' }}
        animate={{
          x: [0, 100, 200, 100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        whileHover={{ scale: 1.2 }}
        onClick={() => onAnimalClick('goat')}
      >
        <svg width="80" height="70" viewBox="0 0 80 70">
          {/* Body */}
          <ellipse cx="40" cy="50" rx="30" ry="20" fill="#E8E8E8" />
          {/* Head */}
          <circle cx="25" cy="35" r="18" fill="#F5F5F5" />
          {/* Horns */}
          <path d="M 20 25 Q 15 15 18 10" stroke="#654321" strokeWidth="3" fill="none" />
          <path d="M 30 25 Q 35 15 32 10" stroke="#654321" strokeWidth="3" fill="none" />
          {/* Ears */}
          <ellipse cx="18" cy="28" rx="5" ry="8" fill="#E8E8E8" />
          <ellipse cx="32" cy="28" rx="5" ry="8" fill="#E8E8E8" />
          {/* Eye */}
          <circle cx="25" cy="35" r="3" fill="#000" />
          {/* Legs */}
          <rect x="25" y="60" width="5" height="10" fill="#D3D3D3" />
          <rect x="35" y="60" width="5" height="10" fill="#D3D3D3" />
          <rect x="45" y="60" width="5" height="10" fill="#D3D3D3" />
          <rect x="55" y="60" width="5" height="10" fill="#D3D3D3" />
        </svg>
      </motion.div>
      
      <motion.div
        className="absolute"
        style={{ right: '15%', bottom: '42%' }}
        whileHover={{ scale: 1.2 }}
        onClick={() => onAnimalClick('goat')}
      >
        <svg width="75" height="65" viewBox="0 0 75 65">
          <ellipse cx="37" cy="47" rx="28" ry="18" fill="#E8E8E8" />
          <circle cx="23" cy="32" r="16" fill="#F5F5F5" />
          <path d="M 18 23 Q 13 13 16 8" stroke="#654321" strokeWidth="3" fill="none" />
          <path d="M 28 23 Q 33 13 30 8" stroke="#654321" strokeWidth="3" fill="none" />
          <ellipse cx="16" cy="26" rx="4" ry="7" fill="#E8E8E8" />
          <ellipse cx="30" cy="26" rx="4" ry="7" fill="#E8E8E8" />
          <circle cx="23" cy="32" r="3" fill="#000" />
          <rect x="23" y="57" width="5" height="8" fill="#D3D3D3" />
          <rect x="33" y="57" width="5" height="8" fill="#D3D3D3" />
          <rect x="43" y="57" width="5" height="8" fill="#D3D3D3" />
          <rect x="53" y="57" width="5" height="8" fill="#D3D3D3" />
        </svg>
      </motion.div>
      
      {/* Eagles soaring */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={`eagle-${i}`}
          className="absolute"
          style={{
            left: `${20 + i * 25}%`,
            top: `${10 + i * 8}%`,
          }}
          animate={{
            x: [0, 200, 400, 600, 800],
            y: [0, -30, -10, -40, 0],
          }}
          transition={{
            duration: 25 + i * 5,
            repeat: Infinity,
            ease: "linear",
          }}
          whileHover={{ scale: 1.3 }}
          onClick={() => onAnimalClick('eagle')}
        >
          <svg width="90" height="40" viewBox="0 0 90 40">
            {/* Wings */}
            <path d="M 10 20 Q 0 10 0 20 Q 5 30 10 25 Z" fill="#654321" />
            <path d="M 80 20 Q 90 10 90 20 Q 85 30 80 25 Z" fill="#654321" />
            <ellipse cx="30" cy="22" rx="25" ry="8" fill="#8B4513" />
            <ellipse cx="60" cy="22" rx="25" ry="8" fill="#8B4513" />
            {/* Body */}
            <ellipse cx="45" cy="20" rx="15" ry="10" fill="#654321" />
            {/* Head */}
            <circle cx="45" cy="15" r="8" fill="#FFF" />
            <circle cx="45" cy="15" r="2" fill="#000" />
            {/* Beak */}
            <path d="M 45 15 L 50 18 L 45 20 Z" fill="#FFA500" />
          </svg>
        </motion.div>
      ))}
      
      {/* Smaller birds in groups */}
      <motion.div
        className="absolute"
        style={{ top: '20%', right: '30%' }}
        animate={{
          x: [-50, 500],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
        }}
      >
        <AnimatedBird 
          size={55} 
          color="#2C3E50"
          onClick={() => onAnimalClick('bird')}
        />
      </motion.div>
      
      {/* Mountain flowers in foreground */}
      {[20, 40, 60, 75].map((left, i) => (
        <motion.div
          key={`flower-${i}`}
          className="absolute"
          style={{
            left: `${left}%`,
            bottom: '8%',
          }}
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 2, 0, -2, 0],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        >
          <svg width="35" height="45" viewBox="0 0 35 45">
            <line x1="17" y1="20" x2="17" y2="45" stroke="#2E7D32" strokeWidth="2" />
            <circle cx="17" cy="12" r="2" fill="#FFD700" />
            {[0, 72, 144, 216, 288].map((angle, j) => (
              <ellipse
                key={j}
                cx="17"
                cy="12"
                rx="5"
                ry="8"
                fill={i % 2 === 0 ? '#FF69B4' : '#9C27B0'}
                transform={`rotate(${angle} 17 12)`}
              />
            ))}
          </svg>
        </motion.div>
      ))}
      
      {/* Falling snow effect (when it's cold in mountains) */}
      {weather === 'cloudy' && Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`snow-${i}`}
          className="absolute w-2 h-2 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-5%',
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, Math.random() * 50 - 25],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}
