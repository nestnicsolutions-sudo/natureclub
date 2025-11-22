'use client';

import { motion } from 'framer-motion';
import { CSSProperties } from 'react';

interface AnimatedBirdProps {
  size?: number;
  color?: string;
  className?: string;
  onClick?: () => void;
}

export default function AnimatedBird({ 
  size = 60, 
  color = '#FF6B6B',
  className = '',
  onClick 
}: AnimatedBirdProps) {
  return (
    <motion.div
      className={`relative cursor-pointer ${className}`}
      style={{ width: size, height: size }}
      onClick={onClick}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {/* Bird body */}
      <motion.div
        className="absolute"
        style={{
          width: size * 0.5,
          height: size * 0.6,
          backgroundColor: color,
          borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
          left: '25%',
          top: '30%',
        }}
      />
      
      {/* Bird head */}
      <motion.div
        className="absolute"
        style={{
          width: size * 0.35,
          height: size * 0.35,
          backgroundColor: color,
          borderRadius: '50%',
          left: '50%',
          top: '15%',
        }}
      />
      
      {/* Eye */}
      <motion.div
        className="absolute bg-white rounded-full"
        style={{
          width: size * 0.12,
          height: size * 0.12,
          left: '58%',
          top: '22%',
        }}
      >
        <div
          className="absolute bg-black rounded-full"
          style={{
            width: '60%',
            height: '60%',
            left: '20%',
            top: '20%',
          }}
        />
      </motion.div>
      
      {/* Beak */}
      <motion.div
        style={{
          position: 'absolute',
          width: 0,
          height: 0,
          borderLeft: `${size * 0.15}px solid ${color}`,
          borderTop: `${size * 0.08}px solid transparent`,
          borderBottom: `${size * 0.08}px solid transparent`,
          left: '75%',
          top: '28%',
          filter: 'brightness(0.9)',
        }}
      />
      
      {/* Left wing */}
      <motion.div
        className="absolute"
        style={{
          width: size * 0.4,
          height: size * 0.3,
          backgroundColor: color,
          borderRadius: '50%',
          left: '10%',
          top: '40%',
          filter: 'brightness(0.85)',
        }}
        animate={{
          rotate: [0, -15, 0],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
        }}
      />
      
      {/* Right wing */}
      <motion.div
        className="absolute"
        style={{
          width: size * 0.4,
          height: size * 0.3,
          backgroundColor: color,
          borderRadius: '50%',
          right: '10%',
          top: '40%',
          filter: 'brightness(0.85)',
        }}
        animate={{
          rotate: [0, 15, 0],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
        }}
      />
    </motion.div>
  );
}
