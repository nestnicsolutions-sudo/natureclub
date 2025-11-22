'use client';

import { motion } from 'framer-motion';

interface AnimatedRabbitProps {
  size?: number;
  className?: string;
  onClick?: () => void;
}

export default function AnimatedRabbit({ 
  size = 60,
  className = '',
  onClick 
}: AnimatedRabbitProps) {
  return (
    <motion.div
      className={`relative cursor-pointer ${className}`}
      style={{ width: size, height: size }}
      onClick={onClick}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      animate={{
        y: [0, -5, 0],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {/* Body */}
      <motion.div
        className="absolute bg-gray-300 rounded-full"
        style={{
          width: size * 0.6,
          height: size * 0.7,
          left: '20%',
          bottom: '10%',
        }}
      />
      
      {/* Head */}
      <motion.div
        className="absolute bg-gray-300 rounded-full"
        style={{
          width: size * 0.5,
          height: size * 0.45,
          left: '35%',
          top: '20%',
        }}
      />
      
      {/* Left ear */}
      <motion.div
        className="absolute bg-gray-300 rounded-full"
        style={{
          width: size * 0.15,
          height: size * 0.45,
          left: '30%',
          top: '0%',
          borderRadius: '50% 50% 30% 30%',
        }}
        animate={{
          rotate: [-5, 5, -5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        <div
          className="absolute bg-pink-200 rounded-full"
          style={{
            width: '60%',
            height: '70%',
            left: '20%',
            top: '10%',
            borderRadius: '50% 50% 30% 30%',
          }}
        />
      </motion.div>
      
      {/* Right ear */}
      <motion.div
        className="absolute bg-gray-300 rounded-full"
        style={{
          width: size * 0.15,
          height: size * 0.45,
          right: '25%',
          top: '0%',
          borderRadius: '50% 50% 30% 30%',
        }}
        animate={{
          rotate: [5, -5, 5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        <div
          className="absolute bg-pink-200 rounded-full"
          style={{
            width: '60%',
            height: '70%',
            left: '20%',
            top: '10%',
            borderRadius: '50% 50% 30% 30%',
          }}
        />
      </motion.div>
      
      {/* Eyes */}
      <div
        className="absolute bg-black rounded-full"
        style={{
          width: size * 0.08,
          height: size * 0.08,
          left: '42%',
          top: '32%',
        }}
      />
      <div
        className="absolute bg-black rounded-full"
        style={{
          width: size * 0.08,
          height: size * 0.08,
          right: '35%',
          top: '32%',
        }}
      />
      
      {/* Nose */}
      <div
        className="absolute bg-pink-400 rounded-full"
        style={{
          width: size * 0.1,
          height: size * 0.08,
          left: '45%',
          top: '42%',
        }}
      />
      
      {/* Tail */}
      <motion.div
        className="absolute bg-white rounded-full"
        style={{
          width: size * 0.2,
          height: size * 0.2,
          left: '5%',
          bottom: '25%',
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
        }}
      />
    </motion.div>
  );
}
