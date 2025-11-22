'use client';

import { motion } from 'framer-motion';
import AnimatedFlower from '../animated/AnimatedFlower';
import AnimatedButterfly from '../animated/AnimatedButterfly';
import AnimatedBird from '../animated/AnimatedBird';

interface SpringSceneProps {
  onAnimalClick: (animalName: string) => void;
  weather?: 'sunny' | 'rainy' | 'rainbow' | 'cloudy';
  isNight?: boolean;
}

export default function SpringScene({ onAnimalClick, weather = 'sunny', isNight = false }: SpringSceneProps) {
  return (
    <div className={`relative w-full h-screen overflow-hidden ${
      isNight 
        ? 'bg-gradient-to-b from-indigo-900 via-blue-950 to-green-900' 
        : 'bg-gradient-to-b from-sky-300 via-sky-200 to-green-200'
    }`}>
      
      {/* Sun */}
      {!isNight && (weather === 'sunny' || weather === 'rainbow') && (
        <motion.div
          className="absolute top-16 right-16 w-24 h-24 md:w-32 md:h-32"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 bg-yellow-300 rounded-full blur-xl opacity-50" />
          <div className="absolute inset-2 bg-yellow-400 rounded-full" />
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-6 md:h-8 bg-yellow-400 left-1/2 -ml-0.5"
              style={{
                transform: `rotate(${i * 30}deg) translateY(-48px)`,
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Spring Rain Showers */}
      {weather === 'rainy' && (
        <div className="absolute inset-0 pointer-events-none z-20">
          {[...Array(60)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-8 bg-gradient-to-b from-blue-300 to-transparent"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10%`,
              } as any}
              animate={{
                y: ['0vh', '110vh'],
              }}
              transition={{
                duration: 1 + Math.random(),
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
              <linearGradient id="rainbowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
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
              stroke="url(#rainbowGradient)"
              strokeWidth="40"
              opacity="0.7"
            />
          </svg>
        </motion.div>
      )}

      {/* Clouds */}
      {(weather === 'cloudy' || weather === 'rainy') && (
        <div className="absolute inset-0 z-10">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${10 + (i * 15)}%`,
                top: `${10 + (i % 3) * 15}%`,
              } as any}
              animate={{
                x: [0, 30, 0],
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <svg width="100" height="60" viewBox="0 0 100 60">
                <ellipse cx="25" cy="35" rx="20" ry="18" fill="#E5E7EB" />
                <ellipse cx="45" cy="25" rx="25" ry="20" fill="#D1D5DB" />
                <ellipse cx="65" cy="35" rx="20" ry="18" fill="#E5E7EB" />
              </svg>
            </motion.div>
          ))}
        </div>
      )}

      {/* Cherry Blossom Trees */}
      <motion.div
        className="absolute left-0 bottom-0"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Left Tree */}
        <svg width="200" height="300" viewBox="0 0 200 300">
          {/* Trunk */}
          <rect x="85" y="150" width="30" height="150" fill="#654321" />
          <rect x="80" y="140" width="10" height="80" fill="#8B4513" />
          
          {/* Branches */}
          <path d="M 100 180 Q 60 150 40 120" stroke="#654321" strokeWidth="8" fill="none" />
          <path d="M 100 200 Q 140 170 160 140" stroke="#654321" strokeWidth="8" fill="none" />
          <path d="M 100 160 Q 100 120 100 80" stroke="#654321" strokeWidth="10" fill="none" />
          
          {/* Pink Blossoms */}
          {[...Array(30)].map((_, i) => (
            <motion.circle
              key={i}
              cx={40 + Math.random() * 120}
              cy={60 + Math.random() * 140}
              r={8 + Math.random() * 6}
              fill={i % 3 === 0 ? '#FFC0CB' : i % 3 === 1 ? '#FFB6C1' : '#FF69B4'}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + Math.random() * 2, duration: 0.5 }}
            />
          ))}
          
          {/* White Blossoms */}
          {[...Array(20)].map((_, i) => (
            <motion.circle
              key={`white-${i}`}
              cx={45 + Math.random() * 110}
              cy={70 + Math.random() * 130}
              r={6 + Math.random() * 4}
              fill="white"
              opacity={0.9}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1 + Math.random() * 2, duration: 0.5 }}
            />
          ))}
        </svg>
      </motion.div>

      {/* Right Cherry Blossom Tree */}
      <motion.div
        className="absolute right-0 bottom-0"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <svg width="180" height="280" viewBox="0 0 180 280">
          <rect x="75" y="140" width="25" height="140" fill="#654321" />
          <path d="M 87 160 Q 50 130 30 100" stroke="#654321" strokeWidth="7" fill="none" />
          <path d="M 87 180 Q 120 150 150 120" stroke="#654321" strokeWidth="7" fill="none" />
          
          {[...Array(25)].map((_, i) => (
            <motion.circle
              key={i}
              cx={30 + Math.random() * 120}
              cy={60 + Math.random() * 130}
              r={7 + Math.random() * 5}
              fill={i % 2 === 0 ? '#FFC0CB' : '#FFB6C1'}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8 + Math.random() * 2, duration: 0.5 }}
            />
          ))}
        </svg>
      </motion.div>

      {/* Falling Petals */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `-5%`,
            background: i % 3 === 0 ? '#FFC0CB' : i % 3 === 1 ? '#FFB6C1' : 'white',
          } as any}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50],
            rotate: [0, 360, 720],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
        />
      ))}

      {/* Grass Field with Fresh Green Shoots */}
      <div className="absolute bottom-0 w-full h-48 bg-gradient-to-b from-green-400 to-green-600">
        {/* New Grass Shoots */}
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bottom-0 w-1 bg-gradient-to-t from-green-600 to-green-300"
            style={{
              left: `${i}%`,
              height: `${20 + Math.random() * 40}px`,
            } as any}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{
              duration: 1,
              delay: Math.random() * 3,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      {/* Spring Flowers - Tulips, Daffodils */}
      <div className="absolute bottom-12 left-1/4 z-20">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${i * 40}px` } as any}
            initial={{ scale: 0, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ delay: 1 + i * 0.2, duration: 0.6 }}
          >
            {/* Tulip */}
            <svg width="30" height="60" viewBox="0 0 30 60">
              <line x1="15" y1="30" x2="15" y2="60" stroke="#2D5016" strokeWidth="2" />
              <ellipse cx="15" cy="20" rx="10" ry="15" fill={i % 3 === 0 ? '#FF1493' : i % 3 === 1 ? '#FFD700' : '#FF69B4'} />
              <path d="M 15 5 L 10 20 L 20 20 Z" fill={i % 3 === 0 ? '#FF1493' : i % 3 === 1 ? '#FFD700' : '#FF69B4'} />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* More Spring Flowers - Right Side */}
      <div className="absolute bottom-16 right-1/4 z-20">
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{ position: 'absolute', left: i * 50, bottom: Math.random() * 30 }}>
            <AnimatedFlower 
              color={i % 2 === 0 ? '#9370DB' : '#FFB6C1'}
              delay={2 + i * 0.3}
            />
          </div>
        ))}
      </div>

      {/* Baby Animals - Lamb */}
      <motion.div
        className="absolute bottom-32 left-1/3 cursor-pointer z-30"
        animate={{
          x: [0, 50, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        onClick={() => onAnimalClick('lamb')}
        whileHover={{ scale: 1.1 }}
      >
        <svg width="80" height="60" viewBox="0 0 80 60">
          {/* Body - fluffy wool */}
          <ellipse cx="40" cy="40" rx="25" ry="20" fill="white" />
          <circle cx="35" cy="35" r="8" fill="#F0F0F0" />
          <circle cx="45" cy="35" r="8" fill="#F0F0F0" />
          <circle cx="40" cy="45" r="10" fill="#F0F0F0" />
          
          {/* Head */}
          <ellipse cx="55" cy="30" rx="12" ry="15" fill="white" />
          
          {/* Ears */}
          <ellipse cx="50" cy="22" rx="4" ry="8" fill="#FFE4E1" />
          <ellipse cx="60" cy="22" rx="4" ry="8" fill="#FFE4E1" />
          
          {/* Eyes */}
          <circle cx="52" cy="28" r="2" fill="black" />
          <circle cx="58" cy="28" r="2" fill="black" />
          
          {/* Nose */}
          <circle cx="55" cy="33" r="2" fill="pink" />
          
          {/* Legs */}
          <rect x="28" y="50" width="4" height="10" fill="#E8E8E8" />
          <rect x="38" y="50" width="4" height="10" fill="#E8E8E8" />
          <rect x="48" y="50" width="4" height="10" fill="#E8E8E8" />
          <rect x="58" y="50" width="4" height="10" fill="#E8E8E8" />
        </svg>
      </motion.div>

      {/* Baby Animals - Bunny */}
      <motion.div
        className="absolute bottom-28 right-1/3 cursor-pointer z-30"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        onClick={() => onAnimalClick('bunny')}
        whileHover={{ scale: 1.1 }}
      >
        <svg width="60" height="70" viewBox="0 0 60 70">
          {/* Body */}
          <ellipse cx="30" cy="50" rx="18" ry="15" fill="#D3D3D3" />
          
          {/* Head */}
          <circle cx="30" cy="30" r="15" fill="#E0E0E0" />
          
          {/* Long Ears */}
          <ellipse cx="22" cy="15" rx="5" ry="18" fill="#D3D3D3" />
          <ellipse cx="38" cy="15" rx="5" ry="18" fill="#D3D3D3" />
          <ellipse cx="22" cy="15" rx="3" ry="15" fill="pink" />
          <ellipse cx="38" cy="15" rx="3" ry="15" fill="pink" />
          
          {/* Eyes */}
          <circle cx="25" cy="28" r="2.5" fill="black" />
          <circle cx="35" cy="28" r="2.5" fill="black" />
          
          {/* Nose */}
          <circle cx="30" cy="33" r="2" fill="pink" />
          
          {/* Whiskers */}
          <line x1="15" y1="32" x2="25" y2="32" stroke="gray" strokeWidth="0.5" />
          <line x1="35" y1="32" x2="45" y2="32" stroke="gray" strokeWidth="0.5" />
          
          {/* Tail */}
          <circle cx="30" cy="62" r="6" fill="white" />
        </svg>
      </motion.div>

      {/* Nesting Birds */}
      <motion.div
        className="absolute top-40 left-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <svg width="80" height="60" viewBox="0 0 80 60">
          {/* Nest */}
          <ellipse cx="40" cy="50" rx="35" ry="10" fill="#8B4513" />
          <ellipse cx="40" cy="48" rx="30" ry="8" fill="#A0522D" />
          
          {/* Eggs */}
          <ellipse cx="30" cy="47" rx="6" ry="8" fill="#E6F3FF" />
          <ellipse cx="40" cy="47" rx="6" ry="8" fill="#E6F3FF" />
          <ellipse cx="50" cy="47" rx="6" ry="8" fill="#E6F3FF" />
        </svg>
      </motion.div>

      {/* Flying Birds */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `${100 + i * 150}px`, top: `${50 + i * 30}px` } as any}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.5 }}
        >
          <AnimatedBird onClick={onAnimalClick} />
        </motion.div>
      ))}

      {/* Spring Butterflies */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `${150 + i * 100}px`, top: `${200 + i * 50}px` } as any}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.8 }}
        >
          <AnimatedButterfly onClick={onAnimalClick} />
        </motion.div>
      ))}

      {/* Bees */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute cursor-pointer z-30"
          style={{
            left: `${30 + i * 20}%`,
            top: `${40 + i * 10}%`,
          } as any}
          animate={{
            x: [0, 40, 80, 40, 0],
            y: [0, -20, -10, -30, 0],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          onClick={() => onAnimalClick('bee')}
          whileHover={{ scale: 1.2 }}
        >
          <svg width="30" height="20" viewBox="0 0 30 20">
            {/* Wings */}
            <ellipse cx="10" cy="8" rx="8" ry="6" fill="white" opacity="0.7" />
            <ellipse cx="20" cy="8" rx="8" ry="6" fill="white" opacity="0.7" />
            
            {/* Body */}
            <ellipse cx="15" cy="10" rx="8" ry="6" fill="#FFD700" />
            <rect x="12" y="7" width="2" height="6" fill="black" />
            <rect x="16" y="7" width="2" height="6" fill="black" />
            
            {/* Head */}
            <circle cx="15" cy="5" r="3" fill="black" />
          </svg>
        </motion.div>
      ))}

      {/* Puddles */}
      {weather === 'rainy' && (
        <>
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bottom-24"
              style={{
                left: `${15 + i * 18}%`,
              } as any}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1 + i * 0.3, duration: 1 }}
            >
              <svg width="80" height="30" viewBox="0 0 80 30">
                <ellipse cx="40" cy="20" rx="35" ry="10" fill="#87CEEB" opacity="0.5" />
                <ellipse cx="40" cy="18" rx="30" ry="8" fill="#B0E0E6" opacity="0.6" />
              </svg>
            </motion.div>
          ))}
        </>
      )}

    </div>
  );
}
