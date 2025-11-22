'use client';

import { motion } from 'framer-motion';
import AnimatedFlower from '../animated/AnimatedFlower';
import AnimatedButterfly from '../animated/AnimatedButterfly';
import AnimatedBird from '../animated/AnimatedBird';

interface SummerSceneProps {
  onAnimalClick: (animalName: string) => void;
  weather?: 'sunny' | 'rainy' | 'rainbow' | 'cloudy';
  isNight?: boolean;
}

export default function SummerScene({ onAnimalClick, weather = 'sunny', isNight = false }: SummerSceneProps) {
  return (
    <div className={`relative w-full h-screen overflow-hidden ${
      isNight 
        ? 'bg-gradient-to-b from-indigo-950 via-purple-950 to-blue-950' 
        : 'bg-gradient-to-b from-sky-400 via-amber-200 to-yellow-300'
    }`}>
      
      {/* Bright Summer Sun */}
      {!isNight && (
        <motion.div
          className="absolute top-12 right-12 w-32 h-32 md:w-40 md:h-40"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ 
            rotate: { duration: 40, repeat: Infinity, ease: "linear" },
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          {/* Intense glow */}
          <div className="absolute inset-0 bg-yellow-400 rounded-full blur-3xl opacity-70" />
          <div className="absolute inset-2 bg-yellow-300 rounded-full blur-2xl opacity-80" />
          <div className="absolute inset-4 bg-orange-400 rounded-full" />
          
          {/* Sun rays */}
          {[...Array(16)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-12 md:h-16 bg-gradient-to-b from-yellow-400 to-transparent left-1/2 -ml-1"
              style={{
                transform: `rotate(${i * 22.5}deg) translateY(-60px)`,
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Heat Wave Effect */}
      {!isNight && weather === 'sunny' && (
        <div className="absolute inset-0 pointer-events-none z-5">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-32"
              style={{
                top: `${i * 12}%`,
                background: `linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)`,
              } as any}
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.5
              }}
            />
          ))}
        </div>
      )}

      {/* Summer Rain */}
      {weather === 'rainy' && (
        <div className="absolute inset-0 pointer-events-none z-20">
          {[...Array(80)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-10 bg-gradient-to-b from-blue-400 to-transparent"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10%`,
              } as any}
              animate={{
                y: ['0vh', '110vh'],
              }}
              transition={{
                duration: 0.8 + Math.random() * 0.5,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "linear"
              }}
            />
          ))}
        </div>
      )}

      {/* Rainbow */}
      {weather === 'rainbow' && (
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
        >
          <svg width="90vw" height="50vh" viewBox="0 0 800 400" className="overflow-visible">
            <defs>
              <linearGradient id="summerRainbow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF0000" />
                <stop offset="17%" stopColor="#FF7F00" />
                <stop offset="33%" stopColor="#FFFF00" />
                <stop offset="50%" stopColor="#00FF00" />
                <stop offset="67%" stopColor="#0000FF" />
                <stop offset="83%" stopColor="#4B0082" />
                <stop offset="100%" stopColor="#9400D3" />
              </linearGradient>
            </defs>
            <path
              d="M 50 400 Q 400 100 750 400"
              fill="none"
              stroke="url(#summerRainbow)"
              strokeWidth="40"
              opacity="0.8"
            />
          </svg>
        </motion.div>
      )}

      {/* Clouds */}
      {(weather === 'cloudy' || weather === 'rainy') && (
        <div className="absolute inset-0 z-10">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${15 + (i * 18)}%`,
                top: `${8 + (i % 2) * 20}%`,
              } as any}
              animate={{
                x: [0, 40, 0],
              }}
              transition={{
                duration: 20 + i * 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <svg width="120" height="70" viewBox="0 0 120 70">
                <ellipse cx="30" cy="40" rx="25" ry="22" fill="#F3F4F6" />
                <ellipse cx="55" cy="30" rx="30" ry="25" fill="#E5E7EB" />
                <ellipse cx="80" cy="40" rx="25" ry="22" fill="#F3F4F6" />
              </svg>
            </motion.div>
          ))}
        </div>
      )}

      {/* Lush Green Ground */}
      <div className="absolute bottom-0 w-full h-64 bg-gradient-to-b from-green-500 via-green-600 to-green-700">
        {/* Tall Summer Grass */}
        {[...Array(150)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bottom-0 w-1 bg-gradient-to-t from-green-700 to-green-400"
            style={{
              left: `${(i * 0.67)}%`,
              height: `${30 + Math.random() * 60}px`,
            } as any}
            animate={{
              rotate: [0, 2, 0, -2, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Sunflowers */}
      <div className="absolute bottom-20 left-16 z-20">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${i * 60}px` } as any}
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5 + i * 0.2, duration: 0.8 }}
          >
            <svg width="60" height="140" viewBox="0 0 60 140">
              {/* Stem */}
              <rect x="27" y="40" width="6" height="100" fill="#2D5016" />
              
              {/* Leaves */}
              <ellipse cx="20" cy="80" rx="12" ry="8" fill="#4A7C2A" />
              <ellipse cx="40" cy="100" rx="12" ry="8" fill="#4A7C2A" />
              
              {/* Flower center */}
              <circle cx="30" cy="30" r="12" fill="#8B4513" />
              
              {/* Petals */}
              {[...Array(12)].map((_, j) => (
                <ellipse
                  key={j}
                  cx={30 + Math.cos((j * 30) * Math.PI / 180) * 18}
                  cy={30 + Math.sin((j * 30) * Math.PI / 180) * 18}
                  rx="8"
                  ry="12"
                  fill="#FFD700"
                  transform={`rotate(${j * 30} ${30 + Math.cos((j * 30) * Math.PI / 180) * 18} ${30 + Math.sin((j * 30) * Math.PI / 180) * 18})`}
                />
              ))}
              
              {/* Seeds in center */}
              {[...Array(20)].map((_, k) => (
                <circle
                  key={k}
                  cx={30 + (Math.random() - 0.5) * 16}
                  cy={30 + (Math.random() - 0.5) * 16}
                  r="1.5"
                  fill="#654321"
                />
              ))}
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Wild Flowers */}
      <div className="absolute bottom-32 right-24 z-20">
        {[...Array(10)].map((_, i) => (
          <div key={i} style={{ position: 'absolute', left: i * 40, bottom: Math.random() * 40 }}>
            <AnimatedFlower 
              color={['#FF1493', '#FF69B4', '#9370DB', '#FFD700', '#FF6347'][i % 5]}
              delay={i * 0.2}
            />
          </div>
        ))}
      </div>

      {/* Trees with Full Foliage */}
      <motion.div
        className="absolute left-20 bottom-56"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <svg width="150" height="200" viewBox="0 0 150 200">
          {/* Trunk */}
          <rect x="65" y="100" width="20" height="100" fill="#654321" />
          
          {/* Dense foliage */}
          <circle cx="75" cy="90" r="45" fill="#2D5016" />
          <circle cx="60" cy="70" r="40" fill="#3A6B1F" />
          <circle cx="90" cy="70" r="40" fill="#3A6B1F" />
          <circle cx="75" cy="50" r="35" fill="#4A7C2A" />
          <circle cx="55" cy="85" r="30" fill="#2D5016" />
          <circle cx="95" cy="85" r="30" fill="#2D5016" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute right-32 bottom-64"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <svg width="130" height="180" viewBox="0 0 130 180">
          <rect x="57" y="90" width="18" height="90" fill="#654321" />
          <circle cx="65" cy="80" r="40" fill="#2D5016" />
          <circle cx="50" cy="65" r="35" fill="#3A6B1F" />
          <circle cx="80" cy="65" r="35" fill="#3A6B1F" />
          <circle cx="65" cy="45" r="30" fill="#4A7C2A" />
        </svg>
      </motion.div>

      {/* Butterflies (many) */}
      {[...Array(10)].map((_, i) => (
        <motion.div 
          key={i} 
          style={{ position: 'absolute', left: 100 + i * 80, top: 150 + (i % 3) * 80 } as any}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.5 }}
        >
          <AnimatedButterfly 
            onClick={onAnimalClick} 
          />
        </motion.div>
      ))}

      {/* Bees around flowers */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute cursor-pointer z-30"
          style={{
            left: `${20 + i * 15}%`,
            top: `${50 + (i % 3) * 15}%`,
          } as any}
          animate={{
            x: [0, 30, 60, 30, 0],
            y: [0, -15, -5, -20, 0],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          onClick={() => onAnimalClick('bee')}
          whileHover={{ scale: 1.2 }}
        >
          <svg width="30" height="20" viewBox="0 0 30 20">
            <ellipse cx="10" cy="8" rx="8" ry="6" fill="white" opacity="0.7" />
            <ellipse cx="20" cy="8" rx="8" ry="6" fill="white" opacity="0.7" />
            <ellipse cx="15" cy="10" rx="8" ry="6" fill="#FFD700" />
            <rect x="12" y="7" width="2" height="6" fill="black" />
            <rect x="16" y="7" width="2" height="6" fill="black" />
            <circle cx="15" cy="5" r="3" fill="black" />
          </svg>
        </motion.div>
      ))}

      {/* Ladybugs */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute cursor-pointer z-30"
          style={{
            left: `${30 + i * 20}%`,
            bottom: `${25 + i * 5}%`,
          } as any}
          animate={{
            x: [0, 20, 0],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          onClick={() => onAnimalClick('ladybug')}
          whileHover={{ scale: 1.3 }}
        >
          <svg width="25" height="25" viewBox="0 0 25 25">
            <ellipse cx="12.5" cy="12.5" rx="10" ry="12" fill="#FF0000" />
            <circle cx="12.5" cy="7" r="5" fill="black" />
            <line x1="12.5" y1="7" x2="12.5" y2="22" stroke="black" strokeWidth="1" />
            <circle cx="8" cy="12" r="2" fill="black" />
            <circle cx="17" cy="12" r="2" fill="black" />
            <circle cx="8" cy="17" r="2" fill="black" />
            <circle cx="17" cy="17" r="2" fill="black" />
          </svg>
        </motion.div>
      ))}

      {/* Cricket/Grasshopper */}
      <motion.div
        className="absolute bottom-28 left-1/2 cursor-pointer z-30"
        animate={{
          y: [0, -40, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut",
          repeatDelay: 3
        }}
        onClick={() => onAnimalClick('grasshopper')}
        whileHover={{ scale: 1.2 }}
      >
        <svg width="50" height="30" viewBox="0 0 50 30">
          {/* Body */}
          <ellipse cx="25" cy="15" rx="20" ry="8" fill="#90EE90" />
          
          {/* Head */}
          <circle cx="40" cy="12" r="6" fill="#7CFC00" />
          
          {/* Eyes */}
          <circle cx="42" cy="10" r="2" fill="black" />
          
          {/* Antennae */}
          <line x1="40" y1="8" x2="45" y2="2" stroke="#7CFC00" strokeWidth="1" />
          <line x1="42" y1="8" x2="48" y2="3" stroke="#7CFC00" strokeWidth="1" />
          
          {/* Legs */}
          <path d="M 15 20 L 10 28" stroke="#7CFC00" strokeWidth="2" />
          <path d="M 25 20 L 25 28" stroke="#7CFC00" strokeWidth="2" />
          <path d="M 35 18 L 40 12 L 45 25" stroke="#7CFC00" strokeWidth="2" fill="none" />
        </svg>
      </motion.div>

      {/* Birds */}
      {[...Array(5)].map((_, i) => (
        <motion.div 
          key={i} 
          style={{ position: 'absolute', left: 120 + i * 140, top: 60 + i * 25 } as any}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.7 }}
        >
          <AnimatedBird 
            onClick={onAnimalClick} 
          />
        </motion.div>
      ))}

      {/* Fireflies (only at dusk/night) */}
      {isNight && (
        <>
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-yellow-300 z-40"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${20 + Math.random() * 60}%`,
              } as any}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
                x: [0, Math.random() * 40 - 20],
                y: [0, Math.random() * 40 - 20],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 3
              }}
            />
          ))}
        </>
      )}

      {/* Summer Fruit Trees */}
      <motion.div
        className="absolute right-1/4 bottom-40"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <svg width="120" height="150" viewBox="0 0 120 150">
          <rect x="55" y="80" width="15" height="70" fill="#654321" />
          <circle cx="60" cy="70" r="35" fill="#4A7C2A" />
          <circle cx="45" cy="60" r="30" fill="#3A6B1F" />
          <circle cx="75" cy="60" r="30" fill="#3A6B1F" />
          
          {/* Apples */}
          <circle cx="50" cy="65" r="5" fill="#FF0000" />
          <circle cx="65" cy="70" r="5" fill="#FF0000" />
          <circle cx="70" cy="55" r="5" fill="#FF0000" />
          <circle cx="55" cy="75" r="5" fill="#FF0000" />
        </svg>
      </motion.div>

    </div>
  );
}
