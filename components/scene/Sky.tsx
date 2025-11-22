'use client';

import { motion } from 'framer-motion';
import { WeatherState } from '@/types/game';
import { useEffect, useState } from 'react';

interface SkyProps {
  weather: WeatherState;
}

export default function Sky({ weather }: SkyProps) {
  const [clouds, setClouds] = useState<Array<{ id: number; speed: number; y: number }>>([]);

  useEffect(() => {
    const cloudArray = Array.from({ length: weather.cloudCount }, (_, i) => ({
      id: i,
      speed: 20 + Math.random() * 20,
      y: 10 + Math.random() * 40,
    }));
    setClouds(cloudArray);
  }, [weather.cloudCount]);

  const getSkyGradient = () => {
    if (weather.timeOfDay === 'night') {
      return 'from-indigo-900 via-purple-900 to-blue-900';
    }
    if (weather.current === 'rainy') {
      return 'from-gray-400 via-gray-500 to-gray-600';
    }
    if (weather.current === 'rainbow') {
      return 'from-sky-light via-blue-300 to-sky';
    }
    return 'from-sky-light via-blue-200 to-sky';
  };

  return (
    <div className={`absolute inset-0 bg-gradient-to-b ${getSkyGradient()} transition-all duration-1000`}>
      {/* Sun */}
      {weather.timeOfDay === 'day' && weather.current !== 'rainy' && (
        <motion.div
          className="absolute top-20 right-20 w-24 h-24 md:w-32 md:h-32 bg-sunshine rounded-full shadow-2xl"
          animate={{
            scale: [1, 1.1, 1],
            boxShadow: [
              '0 0 40px rgba(255, 215, 0, 0.8)',
              '0 0 60px rgba(255, 215, 0, 1)',
              '0 0 40px rgba(255, 215, 0, 0.8)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {/* Sun rays */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-1 h-16 bg-sunshine origin-bottom"
              style={{
                transform: `translate(-50%, -100%) rotate(${i * 45}deg)`,
              }}
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </motion.div>
      )}

      {/* Moon */}
      {weather.timeOfDay === 'night' && (
        <motion.div
          className="absolute top-20 right-20 w-24 h-24 md:w-32 md:h-32 bg-gray-100 rounded-full shadow-2xl"
          animate={{
            boxShadow: [
              '0 0 40px rgba(240, 248, 255, 0.8)',
              '0 0 60px rgba(240, 248, 255, 1)',
              '0 0 40px rgba(240, 248, 255, 0.8)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {/* Moon craters */}
          <div className="absolute top-4 left-6 w-4 h-4 bg-gray-300 rounded-full opacity-50" />
          <div className="absolute top-10 left-10 w-6 h-6 bg-gray-300 rounded-full opacity-50" />
          <div className="absolute top-14 left-4 w-3 h-3 bg-gray-300 rounded-full opacity-50" />
        </motion.div>
      )}

      {/* Stars (at night) */}
      {weather.timeOfDay === 'night' && (
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 60}%`,
              }}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
            />
          ))}
        </div>
      )}

      {/* Clouds */}
      {clouds.map((cloud) => (
        <motion.div
          key={cloud.id}
          className="absolute"
          style={{ top: `${cloud.y}%` }}
          initial={{ x: '-20%' }}
          animate={{ x: '120%' }}
          transition={{
            duration: cloud.speed,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <div className="relative">
            <div className="w-24 h-16 md:w-32 md:h-20 bg-white rounded-full opacity-80 shadow-lg" />
            <div className="absolute top-4 left-8 w-32 h-16 md:w-40 md:h-20 bg-white rounded-full opacity-80 shadow-lg" />
            <div className="absolute top-2 right-4 w-20 h-14 md:w-24 md:h-16 bg-white rounded-full opacity-80 shadow-lg" />
          </div>
        </motion.div>
      ))}

      {/* Rainbow */}
      {weather.current === 'rainbow' && (
        <motion.div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-48 md:w-[600px] md:h-64"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          {['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'].map((color, i) => (
            <div
              key={color}
              className="absolute inset-0 rounded-t-full border-t-8"
              style={{
                borderColor: color,
                transform: `scale(${1 - i * 0.12})`,
                opacity: 0.7,
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Rain */}
      {weather.isRaining && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-8 bg-blue-400 opacity-70"
              style={{
                left: `${Math.random() * 100}%`,
              }}
              initial={{ y: -100 }}
              animate={{ y: '100vh' }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: Math.random(),
                ease: 'linear',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
