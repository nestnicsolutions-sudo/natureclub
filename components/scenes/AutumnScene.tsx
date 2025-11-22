'use client';

import { motion } from 'framer-motion';
import AnimatedBird from '../animated/AnimatedBird';

interface AutumnSceneProps {
  onAnimalClick: (animalName: string) => void;
  weather?: 'sunny' | 'rainy' | 'rainbow' | 'cloudy';
  isNight?: boolean;
}

export default function AutumnScene({ onAnimalClick, weather = 'sunny', isNight = false }: AutumnSceneProps) {
  return (
    <div className={`relative w-full h-screen overflow-hidden ${
      isNight 
        ? 'bg-gradient-to-b from-orange-950 via-red-950 to-amber-950' 
        : 'bg-gradient-to-b from-orange-300 via-amber-300 to-yellow-400'
    }`}>
      
      {/* Autumn Sun */}
      {!isNight && (weather === 'sunny' || weather === 'rainbow') && (
        <motion.div
          className="absolute top-20 right-20 w-28 h-28 md:w-36 md:h-36"
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 bg-orange-400 rounded-full blur-2xl opacity-60" />
          <div className="absolute inset-3 bg-orange-500 rounded-full" />
          
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-10 md:h-12 bg-orange-400 left-1/2 -ml-0.75"
              style={{
                transform: `rotate(${i * 30}deg) translateY(-50px)`,
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Autumn Rain */}
      {weather === 'rainy' && (
        <div className="absolute inset-0 pointer-events-none z-20">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-8 bg-gradient-to-b from-gray-400 to-transparent"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10%`,
              }}
              animate={{
                y: ['0vh', '110vh'],
              }}
              transition={{
                duration: 1.2 + Math.random() * 0.5,
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
              <linearGradient id="autumnRainbow" x1="0%" y1="0%" x2="100%" y2="0%">
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
              stroke="url(#autumnRainbow)"
              strokeWidth="40"
              opacity="0.7"
            />
          </svg>
        </motion.div>
      )}

      {/* Clouds */}
      {(weather === 'cloudy' || weather === 'rainy') && (
        <div className="absolute inset-0 z-10">
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${12 + (i * 16)}%`,
                top: `${10 + (i % 3) * 18}%`,
              }}
              animate={{
                x: [0, 35, 0],
              }}
              transition={{
                duration: 18 + i * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <svg width="110" height="65" viewBox="0 0 110 65">
                <ellipse cx="28" cy="38" rx="23" ry="20" fill="#D6D6D6" />
                <ellipse cx="52" cy="28" rx="28" ry="23" fill="#C0C0C0" />
                <ellipse cx="75" cy="38" rx="23" ry="20" fill="#D6D6D6" />
              </svg>
            </motion.div>
          ))}
        </div>
      )}

      {/* Falling Leaves */}
      {[...Array(30)].map((_, i) => {
        const colors = ['#FF4500', '#FF8C00', '#FFD700', '#8B4513', '#DC143C'];
        const leafColor = colors[i % colors.length];
        
        return (
          <motion.div
            key={i}
            className="absolute z-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-10%`,
            }}
            animate={{
              y: ['0vh', '110vh'],
              x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50],
              rotate: [0, 360, 720, 1080],
            }}
            transition={{
              duration: 8 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: "linear"
            }}
          >
            <svg width="30" height="30" viewBox="0 0 30 30">
              {/* Maple leaf shape */}
              <path
                d="M 15 5 L 18 12 L 25 10 L 20 17 L 28 20 L 20 23 L 23 30 L 15 25 L 7 30 L 10 23 L 2 20 L 10 17 L 5 10 L 12 12 Z"
                fill={leafColor}
                opacity="0.9"
              />
              <line x1="15" y1="5" x2="15" y2="25" stroke="#654321" strokeWidth="1" />
            </svg>
          </motion.div>
        );
      })}

      {/* Ground with fallen leaves */}
      <div className="absolute bottom-0 w-full h-56 bg-gradient-to-b from-amber-600 via-orange-700 to-amber-800">
        {/* Grass turning brown */}
        {[...Array(80)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bottom-0 w-1 bg-gradient-to-t from-amber-800 to-yellow-700"
            style={{
              left: `${i * 1.25}%`,
              height: `${15 + Math.random() * 35}px`,
            }}
            animate={{
              rotate: [0, 3, 0, -3, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}
        
        {/* Leaf piles on ground */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute bottom-2"
            style={{ left: `${i * 8}%` }}
          >
            <svg width="40" height="15" viewBox="0 0 40 15">
              <ellipse cx="20" cy="10" rx="18" ry="8" fill="#8B4513" opacity="0.6" />
              {[...Array(8)].map((_, j) => (
                <ellipse
                  key={j}
                  cx={10 + Math.random() * 20}
                  cy={5 + Math.random() * 8}
                  rx="5"
                  ry="3"
                  fill={['#FF4500', '#FF8C00', '#FFD700'][j % 3]}
                  opacity="0.8"
                />
              ))}
            </svg>
          </div>
        ))}
      </div>

      {/* Autumn Trees with colorful foliage */}
      <motion.div
        className="absolute left-16 bottom-48"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <svg width="140" height="200" viewBox="0 0 140 200">
          <rect x="62" y="110" width="18" height="90" fill="#654321" />
          
          {/* Mixed colored leaves */}
          <circle cx="70" cy="100" r="42" fill="#FF4500" />
          <circle cx="55" cy="80" r="38" fill="#FF8C00" />
          <circle cx="85" cy="80" r="38" fill="#DC143C" />
          <circle cx="70" cy="60" r="33" fill="#FFD700" />
          <circle cx="50" cy="95" r="28" fill="#FF6347" />
          <circle cx="90" cy="95" r="28" fill="#FF4500" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute left-1/3 bottom-56"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <svg width="160" height="220" viewBox="0 0 160 220">
          <rect x="72" y="120" width="20" height="100" fill="#654321" />
          <circle cx="80" cy="110" r="48" fill="#8B4513" />
          <circle cx="62" cy="88" r="42" fill="#FF8C00" />
          <circle cx="98" cy="88" r="42" fill="#DC143C" />
          <circle cx="80" cy="65" r="38" fill="#FF4500" />
          <circle cx="58" cy="105" r="32" fill="#FFD700" />
          <circle cx="102" cy="105" r="32" fill="#FF6347" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute right-24 bottom-52"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <svg width="150" height="210" viewBox="0 0 150 210">
          <rect x="67" y="115" width="19" height="95" fill="#654321" />
          <circle cx="75" cy="105" r="45" fill="#DC143C" />
          <circle cx="58" cy="83" r="40" fill="#FF4500" />
          <circle cx="92" cy="83" r="40" fill="#FFD700" />
          <circle cx="75" cy="60" r="35" fill="#FF8C00" />
        </svg>
      </motion.div>

      {/* Pumpkin Patch */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${i * 70 - 140}px` }}
            initial={{ scale: 0, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ delay: 1.5 + i * 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => onAnimalClick('pumpkin')}
          >
            <svg width="60" height="50" viewBox="0 0 60 50">
              {/* Pumpkin body */}
              <ellipse cx="30" cy="30" rx="25" ry="20" fill="#FF8C00" />
              <ellipse cx="20" cy="30" rx="10" ry="18" fill="#FF7F00" />
              <ellipse cx="30" cy="30" rx="10" ry="18" fill="#FF6F00" />
              <ellipse cx="40" cy="30" rx="10" ry="18" fill="#FF7F00" />
              
              {/* Stem */}
              <rect x="27" y="12" width="6" height="8" fill="#8B4513" rx="2" />
              <path d="M 30 12 Q 35 8 40 10" stroke="#2D5016" strokeWidth="2" fill="none" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Mushrooms */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bottom-20 cursor-pointer z-25"
          style={{
            left: `${15 + i * 10}%`,
          }}
          initial={{ scale: 0, y: 10 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ delay: 2 + i * 0.15, duration: 0.5 }}
          whileHover={{ scale: 1.2 }}
          onClick={() => onAnimalClick('mushroom')}
        >
          <svg width="30" height="35" viewBox="0 0 30 35">
            {/* Stem */}
            <rect x="12" y="18" width="6" height="15" fill="#F5F5DC" rx="2" />
            
            {/* Cap */}
            <ellipse cx="15" cy="15" rx="12" ry="8" fill={i % 3 === 0 ? '#8B0000' : i % 3 === 1 ? '#DAA520' : '#8B4513'} />
            <ellipse cx="15" cy="14" rx="10" ry="6" fill={i % 3 === 0 ? '#A52A2A' : i % 3 === 1 ? '#F0E68C' : '#A0522D'} />
            
            {/* Spots (for red mushrooms) */}
            {i % 3 === 0 && (
              <>
                <circle cx="10" cy="13" r="2" fill="white" opacity="0.8" />
                <circle cx="20" cy="13" r="2" fill="white" opacity="0.8" />
                <circle cx="15" cy="10" r="2" fill="white" opacity="0.8" />
              </>
            )}
          </svg>
        </motion.div>
      ))}

      {/* Squirrel collecting acorns */}
      <motion.div
        className="absolute bottom-32 right-1/3 cursor-pointer z-30"
        animate={{
          x: [0, 60, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        onClick={() => onAnimalClick('squirrel')}
        whileHover={{ scale: 1.1 }}
      >
        <svg width="70" height="60" viewBox="0 0 70 60">
          {/* Bushy tail */}
          <path d="M 10 25 Q 5 15 10 5 Q 15 10 15 20" fill="#8B4513" />
          
          {/* Body */}
          <ellipse cx="35" cy="35" rx="18" ry="15" fill="#A0522D" />
          
          {/* Head */}
          <circle cx="48" cy="28" r="12" fill="#A0522D" />
          
          {/* Ear */}
          <ellipse cx="45" cy="18" rx="4" ry="8" fill="#8B4513" />
          <ellipse cx="51" cy="18" rx="4" ry="8" fill="#8B4513" />
          
          {/* Eye */}
          <circle cx="50" cy="26" r="2.5" fill="black" />
          <circle cx="51" cy="25" r="1" fill="white" />
          
          {/* Nose */}
          <circle cx="54" cy="30" r="2" fill="black" />
          
          {/* Front paws holding acorn */}
          <ellipse cx="42" cy="42" rx="4" ry="6" fill="#8B4513" />
          <ellipse cx="48" cy="42" rx="4" ry="6" fill="#8B4513" />
          
          {/* Acorn */}
          <ellipse cx="45" cy="45" rx="3" ry="4" fill="#8B4513" />
          <ellipse cx="45" cy="42" rx="3" ry="2" fill="#654321" />
          
          {/* Back legs */}
          <ellipse cx="30" cy="48" rx="5" ry="8" fill="#8B4513" />
          <ellipse cx="40" cy="48" rx="5" ry="8" fill="#8B4513" />
        </svg>
      </motion.div>

      {/* Migrating Birds in V-formation */}
      <motion.div
        className="absolute top-32 left-1/4"
        animate={{
          x: [0, 600],
          y: [0, -50],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {[...Array(7)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute cursor-pointer"
            style={{
              left: `${i % 2 === 0 ? i * 30 : (7 - i) * 30}px`,
              top: `${Math.abs(3 - i) * 20}px`,
            }}
            onClick={() => onAnimalClick('bird')}
            whileHover={{ scale: 1.3 }}
          >
            <svg width="30" height="20" viewBox="0 0 30 20">
              <path d="M 5 10 Q 15 5 25 10" stroke="black" strokeWidth="2" fill="none" />
              <path d="M 5 10 Q 15 15 25 10" stroke="black" strokeWidth="2" fill="none" />
            </svg>
          </motion.div>
        ))}
      </motion.div>

      {/* More scattered birds */}
      {[...Array(4)].map((_, i) => (
        <AnimatedBird 
          key={i} 
          x={140 + i * 160} 
          y={80 + i * 30} 
          delay={i * 0.8} 
          onClick={onAnimalClick} 
        />
      ))}

      {/* Hedgehog */}
      <motion.div
        className="absolute bottom-24 left-1/4 cursor-pointer z-30"
        animate={{
          x: [0, 40, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        onClick={() => onAnimalClick('hedgehog')}
        whileHover={{ scale: 1.1 }}
      >
        <svg width="60" height="40" viewBox="0 0 60 40">
          {/* Body with spikes */}
          <ellipse cx="35" cy="25" rx="20" ry="15" fill="#8B4513" />
          
          {/* Spikes */}
          {[...Array(15)].map((_, i) => (
            <line
              key={i}
              x1={25 + i * 2}
              y1={20 + Math.random() * 10}
              x2={25 + i * 2}
              y2={10 + Math.random() * 5}
              stroke="#654321"
              strokeWidth="2"
            />
          ))}
          
          {/* Face */}
          <circle cx="52" cy="23" r="8" fill="#D2B48C" />
          <circle cx="55" cy="20" r="2" fill="black" />
          <circle cx="58" cy="23" r="1.5" fill="black" />
          
          {/* Legs */}
          <rect x="25" y="35" width="3" height="5" fill="#654321" />
          <rect x="32" y="35" width="3" height="5" fill="#654321" />
          <rect x="40" y="35" width="3" height="5" fill="#654321" />
          <rect x="47" y="35" width="3" height="5" fill="#654321" />
        </svg>
      </motion.div>

      {/* Fog effect */}
      {(weather === 'cloudy' || isNight) && (
        <div className="absolute inset-0 pointer-events-none z-15">
          <div className="absolute bottom-0 w-full h-48 bg-gradient-to-t from-gray-400/30 to-transparent" />
        </div>
      )}

    </div>
  );
}
