'use client';

import { motion } from 'framer-motion';
import AnimatedBird from '../animated/AnimatedBird';

interface WinterSceneProps {
  onAnimalClick: (animalName: string) => void;
  weather?: 'sunny' | 'rainy' | 'rainbow' | 'cloudy';
  isNight?: boolean;
}

export default function WinterScene({ onAnimalClick, weather = 'sunny', isNight = false }: WinterSceneProps) {
  return (
    <div className={`relative w-full h-screen overflow-hidden ${
      isNight 
        ? 'bg-gradient-to-b from-indigo-950 via-blue-950 to-slate-950' 
        : 'bg-gradient-to-b from-blue-200 via-blue-100 to-white'
    }`}>
      
      {/* Winter Sun (pale and low) */}
      {!isNight && (weather === 'sunny' || weather === 'rainbow') && (
        <motion.div
          className="absolute top-32 right-24 w-24 h-24 md:w-28 md:h-28"
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 bg-yellow-200 rounded-full blur-xl opacity-40" />
          <div className="absolute inset-4 bg-yellow-100 rounded-full opacity-60" />
          
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-8 bg-yellow-200 opacity-50 left-1/2 -ml-0.5"
              style={{
                transform: `rotate(${i * 45}deg) translateY(-40px)`,
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Falling Snow */}
      <div className="absolute inset-0 pointer-events-none z-30">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-10%`,
              opacity: 0.6 + Math.random() * 0.4,
            }}
            animate={{
              y: ['0vh', '110vh'],
              x: [0, Math.random() * 50 - 25, Math.random() * 50 - 25],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Heavy Snow during cloudy/rainy */}
      {(weather === 'cloudy' || weather === 'rainy') && (
        <div className="absolute inset-0 pointer-events-none z-35">
          {[...Array(150)].map((_, i) => (
            <motion.div
              key={`heavy-${i}`}
              className="absolute w-2 h-2 md:w-3 md:h-3 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10%`,
              }}
              animate={{
                y: ['0vh', '110vh'],
                x: [0, Math.random() * 60 - 30],
              }}
              transition={{
                duration: 3 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "linear"
              }}
            />
          ))}
        </div>
      )}

      {/* Rainbow (rare in winter) */}
      {weather === 'rainbow' && (
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
        >
          <svg width="90vw" height="50vh" viewBox="0 0 800 400" className="overflow-visible">
            <defs>
              <linearGradient id="winterRainbow" x1="0%" y1="0%" x2="100%" y2="0%">
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
              stroke="url(#winterRainbow)"
              strokeWidth="40"
              opacity="0.6"
            />
          </svg>
        </motion.div>
      )}

      {/* Snow Clouds */}
      {(weather === 'cloudy' || weather === 'rainy') && (
        <div className="absolute inset-0 z-10">
          {[...Array(9)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${8 + (i * 12)}%`,
                top: `${5 + (i % 3) * 15}%`,
              }}
              animate={{
                x: [0, 25, 0],
              }}
              transition={{
                duration: 25 + i * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <svg width="100" height="60" viewBox="0 0 100 60">
                <ellipse cx="25" cy="35" rx="22" ry="20" fill="#D3D3D3" />
                <ellipse cx="48" cy="25" rx="27" ry="22" fill="#C0C0C0" />
                <ellipse cx="70" cy="35" rx="22" ry="20" fill="#D3D3D3" />
              </svg>
            </motion.div>
          ))}
        </div>
      )}

      {/* Snowy Ground */}
      <div className="absolute bottom-0 w-full h-64 bg-gradient-to-b from-blue-50 via-white to-blue-100">
        {/* Snow drifts */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bottom-0"
            style={{
              left: `${i * 10}%`,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
          >
            <svg width="120" height="40" viewBox="0 0 120 40">
              <path
                d="M 0 40 Q 30 20 60 30 Q 90 25 120 40 Z"
                fill="white"
                opacity="0.9"
              />
              <path
                d="M 10 40 Q 35 25 65 32 Q 95 28 115 40 Z"
                fill="#F0F8FF"
                opacity="0.7"
              />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Bare Winter Trees */}
      <motion.div
        className="absolute left-12 bottom-56"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <svg width="120" height="180" viewBox="0 0 120 180">
          {/* Trunk */}
          <rect x="55" y="90" width="12" height="90" fill="#3E2723" />
          
          {/* Bare branches */}
          <line x1="61" y1="100" x2="30" y2="70" stroke="#3E2723" strokeWidth="4" />
          <line x1="61" y1="110" x2="40" y2="85" stroke="#3E2723" strokeWidth="3" />
          <line x1="61" y1="120" x2="35" y2="105" stroke="#3E2723" strokeWidth="3" />
          <line x1="61" y1="100" x2="90" y2="75" stroke="#3E2723" strokeWidth="4" />
          <line x1="61" y1="110" x2="85" y2="90" stroke="#3E2723" strokeWidth="3" />
          <line x1="61" y1="120" x2="80" y2="110" stroke="#3E2723" strokeWidth="3" />
          
          {/* Smaller branches */}
          <line x1="30" y1="70" x2="20" y2="60" stroke="#3E2723" strokeWidth="2" />
          <line x1="30" y1="70" x2="25" y2="75" stroke="#3E2723" strokeWidth="2" />
          <line x1="90" y1="75" x2="100" y2="65" stroke="#3E2723" strokeWidth="2" />
          <line x1="90" y1="75" x2="95" y2="80" stroke="#3E2723" strokeWidth="2" />
          
          {/* Snow on branches */}
          <ellipse cx="30" cy="70" rx="8" ry="4" fill="white" />
          <ellipse cx="90" cy="75" rx="8" ry="4" fill="white" />
          <ellipse cx="40" cy="85" rx="6" ry="3" fill="white" />
          <ellipse cx="85" cy="90" rx="6" ry="3" fill="white" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute left-1/3 bottom-48"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <svg width="100" height="160" viewBox="0 0 100 160">
          <rect x="46" y="80" width="10" height="80" fill="#3E2723" />
          <line x1="51" y1="90" x2="25" y2="65" stroke="#3E2723" strokeWidth="3.5" />
          <line x1="51" y1="100" x2="30" y2="80" stroke="#3E2723" strokeWidth="3" />
          <line x1="51" y1="90" x2="75" y2="70" stroke="#3E2723" strokeWidth="3.5" />
          <line x1="51" y1="100" x2="70" y2="85" stroke="#3E2723" strokeWidth="3" />
          
          <ellipse cx="25" cy="65" rx="7" ry="3" fill="white" />
          <ellipse cx="75" cy="70" rx="7" ry="3" fill="white" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute right-20 bottom-52"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <svg width="110" height="170" viewBox="0 0 110 170">
          <rect x="50" y="85" width="11" height="85" fill="#3E2723" />
          <line x1="55" y1="95" x2="28" y2="68" stroke="#3E2723" strokeWidth="4" />
          <line x1="55" y1="105" x2="35" y2="88" stroke="#3E2723" strokeWidth="3" />
          <line x1="55" y1="95" x2="82" y2="73" stroke="#3E2723" strokeWidth="4" />
          <line x1="55" y1="105" x2="75" y2="93" stroke="#3E2723" strokeWidth="3" />
          
          <ellipse cx="28" cy="68" rx="8" ry="4" fill="white" />
          <ellipse cx="82" cy="73" rx="8" ry="4" fill="white" />
        </svg>
      </motion.div>

      {/* Evergreen Pine Trees */}
      <motion.div
        className="absolute right-1/3 bottom-40"
        initial={{ scale: 0, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.7 }}
      >
        <svg width="100" height="140" viewBox="0 0 100 140">
          {/* Trunk */}
          <rect x="45" y="100" width="10" height="40" fill="#654321" />
          
          {/* Pine layers with snow */}
          <path d="M 50 30 L 30 60 L 70 60 Z" fill="#1B5E20" />
          <ellipse cx="50" cy="32" rx="18" ry="3" fill="white" />
          
          <path d="M 50 50 L 25 80 L 75 80 Z" fill="#2E7D32" />
          <ellipse cx="50" cy="52" rx="22" ry="3" fill="white" />
          
          <path d="M 50 70 L 20 100 L 80 100 Z" fill="#388E3C" />
          <ellipse cx="50" cy="72" rx="28" ry="4" fill="white" />
        </svg>
      </motion.div>

      {/* Snowman */}
      <motion.div
        className="absolute bottom-20 left-1/2 -translate-x-1/2 cursor-pointer z-40"
        initial={{ scale: 0, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => onAnimalClick('snowman')}
      >
        <svg width="100" height="140" viewBox="0 0 100 140">
          {/* Bottom snowball */}
          <circle cx="50" cy="110" r="28" fill="white" stroke="#E0E0E0" strokeWidth="2" />
          
          {/* Middle snowball */}
          <circle cx="50" cy="70" r="22" fill="white" stroke="#E0E0E0" strokeWidth="2" />
          
          {/* Top snowball (head) */}
          <circle cx="50" cy="35" r="18" fill="white" stroke="#E0E0E0" strokeWidth="2" />
          
          {/* Eyes */}
          <circle cx="44" cy="32" r="2" fill="black" />
          <circle cx="56" cy="32" r="2" fill="black" />
          
          {/* Carrot nose */}
          <path d="M 50 37 L 58 38 L 50 39 Z" fill="#FF8C00" />
          
          {/* Smile (coal) */}
          <circle cx="44" cy="42" r="1.5" fill="black" />
          <circle cx="47" cy="43" r="1.5" fill="black" />
          <circle cx="50" cy="43.5" r="1.5" fill="black" />
          <circle cx="53" cy="43" r="1.5" fill="black" />
          <circle cx="56" cy="42" r="1.5" fill="black" />
          
          {/* Buttons */}
          <circle cx="50" cy="65" r="2.5" fill="black" />
          <circle cx="50" cy="72" r="2.5" fill="black" />
          <circle cx="50" cy="79" r="2.5" fill="black" />
          
          {/* Stick arms */}
          <line x1="28" y1="65" x2="15" y2="55" stroke="#654321" strokeWidth="3" />
          <line x1="15" y1="55" x2="10" y2="50" stroke="#654321" strokeWidth="2" />
          <line x1="15" y1="55" x2="12" y2="60" stroke="#654321" strokeWidth="2" />
          
          <line x1="72" y1="65" x2="85" y2="55" stroke="#654321" strokeWidth="3" />
          <line x1="85" y1="55" x2="90" y2="50" stroke="#654321" strokeWidth="2" />
          <line x1="85" y1="55" x2="88" y2="60" stroke="#654321" strokeWidth="2" />
          
          {/* Top hat */}
          <rect x="38" y="15" width="24" height="6" fill="black" rx="2" />
          <rect x="42" y="5" width="16" height="12" fill="black" rx="1" />
          <rect x="42" y="5" width="16" height="2" fill="#8B0000" />
        </svg>
      </motion.div>

      {/* Ice Crystals */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute z-25"
          style={{
            left: `${15 + i * 12}%`,
            top: `${20 + (i % 3) * 20}%`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40">
            {/* 6-pointed star crystal */}
            <line x1="20" y1="5" x2="20" y2="35" stroke="#B0E0E6" strokeWidth="2" opacity="0.7" />
            <line x1="7" y1="13" x2="33" y2="27" stroke="#B0E0E6" strokeWidth="2" opacity="0.7" />
            <line x1="7" y1="27" x2="33" y2="13" stroke="#B0E0E6" strokeWidth="2" opacity="0.7" />
            
            {/* Smaller branches */}
            <line x1="20" y1="10" x2="16" y2="8" stroke="#ADD8E6" strokeWidth="1" opacity="0.6" />
            <line x1="20" y1="10" x2="24" y2="8" stroke="#ADD8E6" strokeWidth="1" opacity="0.6" />
            <line x1="20" y1="30" x2="16" y2="32" stroke="#ADD8E6" strokeWidth="1" opacity="0.6" />
            <line x1="20" y1="30" x2="24" y2="32" stroke="#ADD8E6" strokeWidth="1" opacity="0.6" />
          </svg>
        </motion.div>
      ))}

      {/* Cardinal (red bird) */}
      <motion.div
        className="absolute top-1/3 left-16 cursor-pointer z-35"
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        onClick={() => onAnimalClick('cardinal')}
        whileHover={{ scale: 1.2 }}
      >
        <svg width="50" height="40" viewBox="0 0 50 40">
          {/* Body */}
          <ellipse cx="25" cy="22" rx="15" ry="12" fill="#DC143C" />
          
          {/* Head */}
          <circle cx="35" cy="18" r="10" fill="#DC143C" />
          
          {/* Crest */}
          <path d="M 35 10 L 38 5 L 36 10 L 40 6 L 37 11" stroke="#DC143C" strokeWidth="2" fill="none" />
          
          {/* Beak */}
          <path d="M 42 18 L 47 18 L 42 20 Z" fill="#FF8C00" />
          
          {/* Eye */}
          <circle cx="38" cy="16" r="2" fill="black" />
          <circle cx="39" cy="15" r="0.5" fill="white" />
          
          {/* Wing */}
          <ellipse cx="20" cy="22" rx="8" ry="10" fill="#A52A2A" />
          
          {/* Tail */}
          <ellipse cx="10" cy="25" rx="10" ry="5" fill="#8B0000" />
        </svg>
      </motion.div>

      {/* Rabbit in snow */}
      <motion.div
        className="absolute bottom-32 right-1/4 cursor-pointer z-35"
        animate={{
          x: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        onClick={() => onAnimalClick('rabbit')}
        whileHover={{ scale: 1.1 }}
      >
        <svg width="60" height="50" viewBox="0 0 60 50">
          {/* Body */}
          <ellipse cx="30" cy="35" rx="18" ry="13" fill="white" stroke="#E0E0E0" strokeWidth="1" />
          
          {/* Head */}
          <circle cx="30" cy="20" r="12" fill="white" stroke="#E0E0E0" strokeWidth="1" />
          
          {/* Long ears */}
          <ellipse cx="24" cy="8" rx="4" ry="12" fill="white" stroke="#E0E0E0" strokeWidth="1" />
          <ellipse cx="36" cy="8" rx="4" ry="12" fill="white" stroke="#E0E0E0" strokeWidth="1" />
          <ellipse cx="24" cy="8" rx="2" ry="10" fill="#FFB6C1" />
          <ellipse cx="36" cy="8" rx="2" ry="10" fill="#FFB6C1" />
          
          {/* Eyes */}
          <circle cx="26" cy="18" r="2" fill="black" />
          <circle cx="34" cy="18" r="2" fill="black" />
          
          {/* Nose */}
          <circle cx="30" cy="22" r="1.5" fill="pink" />
          
          {/* Tail */}
          <circle cx="15" cy="38" r="5" fill="white" stroke="#E0E0E0" strokeWidth="1" />
        </svg>
      </motion.div>

      {/* Fox */}
      <motion.div
        className="absolute bottom-28 left-1/4 cursor-pointer z-35"
        animate={{
          x: [0, 80, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        onClick={() => onAnimalClick('fox')}
        whileHover={{ scale: 1.1 }}
      >
        <svg width="80" height="50" viewBox="0 0 80 50">
          {/* Tail */}
          <ellipse cx="15" cy="35" rx="12" ry="8" fill="#FF6347" />
          <ellipse cx="10" cy="35" rx="8" ry="6" fill="white" />
          
          {/* Body */}
          <ellipse cx="40" cy="35" rx="20" ry="12" fill="#FF6347" />
          
          {/* Head */}
          <circle cx="58" cy="30" r="12" fill="#FF6347" />
          
          {/* Ears */}
          <path d="M 52 20 L 48 12 L 54 18 Z" fill="#FF6347" />
          <path d="M 64 20 L 68 12 L 62 18 Z" fill="#FF6347" />
          <path d="M 52 20 L 50 15 L 54 19 Z" fill="white" />
          <path d="M 64 20 L 66 15 L 62 19 Z" fill="white" />
          
          {/* Snout */}
          <ellipse cx="65" cy="32" rx="6" ry="5" fill="white" />
          
          {/* Nose */}
          <circle cx="68" cy="32" r="2" fill="black" />
          
          {/* Eyes */}
          <circle cx="56" cy="28" r="2" fill="black" />
          <circle cx="57" cy="27" r="0.8" fill="white" />
          
          {/* Legs */}
          <rect x="30" y="43" width="4" height="7" fill="#FF6347" />
          <rect x="38" y="43" width="4" height="7" fill="#FF6347" />
          <rect x="46" y="43" width="4" height="7" fill="#FF6347" />
          <rect x="54" y="43" width="4" height="7" fill="#FF6347" />
        </svg>
      </motion.div>

      {/* Flying birds (fewer in winter) */}
      {[...Array(3)].map((_, i) => (
        <AnimatedBird 
          key={i} 
          x={160 + i * 180} 
          y={100 + i * 35} 
          delay={i} 
          onClick={onAnimalClick} 
        />
      ))}

      {/* Icicles hanging from top */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 z-20"
          style={{
            left: `${5 + i * 8}%`,
          }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 2 + i * 0.1, duration: 0.8 }}
        >
          <svg width="20" height={30 + Math.random() * 30} viewBox="0 0 20 60">
            <path
              d="M 10 0 L 5 20 L 10 60 L 15 20 Z"
              fill="#B0E0E6"
              opacity="0.8"
            />
            <path
              d="M 10 0 L 7 15 L 10 50 L 13 15 Z"
              fill="white"
              opacity="0.6"
            />
          </svg>
        </motion.div>
      ))}

    </div>
  );
}
