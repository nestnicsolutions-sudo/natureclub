'use client';

import { motion } from 'framer-motion';

interface AnimatedDeerProps {
  size?: number;
  className?: string;
  onClick?: () => void;
}

export default function AnimatedDeer({ 
  size = 70,
  className = '',
  onClick 
}: AnimatedDeerProps) {
  return (
    <motion.div
      className={`relative cursor-pointer ${className}`}
      style={{ width: size, height: size }}
      onClick={onClick}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      animate={{
        y: [0, -3, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {/* Body */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: size * 0.55,
          height: size * 0.45,
          background: 'linear-gradient(135deg, #8D6E63, #A1887F)',
          left: '15%',
          top: '40%',
        }}
      />
      
      {/* Head */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: size * 0.35,
          height: size * 0.4,
          background: 'linear-gradient(135deg, #A1887F, #BCAAA4)',
          left: '50%',
          top: '20%',
        }}
        animate={{
          rotate: [-2, 2, -2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      />
      
      {/* Snout */}
      <div
        className="absolute rounded-full"
        style={{
          width: size * 0.2,
          height: size * 0.15,
          background: 'linear-gradient(135deg, #BCAAA4, #D7CCC8)',
          left: '68%',
          top: '38%',
        }}
      />
      
      {/* Ears */}
      <motion.div
        style={{
          position: 'absolute',
          width: size * 0.15,
          height: size * 0.25,
          background: 'linear-gradient(135deg, #A1887F, #8D6E63)',
          left: '48%',
          top: '12%',
          borderRadius: '50% 50% 20% 20%',
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
          className="absolute"
          style={{
            width: '60%',
            height: '60%',
            background: 'linear-gradient(135deg, #FFCCBC, #FFAB91)',
            left: '20%',
            top: '15%',
            borderRadius: '50%',
          }}
        />
      </motion.div>
      
      <motion.div
        style={{
          position: 'absolute',
          width: size * 0.15,
          height: size * 0.25,
          background: 'linear-gradient(135deg, #A1887F, #8D6E63)',
          right: '28%',
          top: '12%',
          borderRadius: '50% 50% 20% 20%',
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
          className="absolute"
          style={{
            width: '60%',
            height: '60%',
            background: 'linear-gradient(135deg, #FFCCBC, #FFAB91)',
            left: '20%',
            top: '15%',
            borderRadius: '50%',
          }}
        />
      </motion.div>
      
      {/* Antlers */}
      <div
        style={{
          position: 'absolute',
          width: size * 0.04,
          height: size * 0.25,
          backgroundColor: '#6D4C41',
          left: '52%',
          top: '2%',
          borderRadius: '50% 50% 0 0',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: size * 0.03,
            height: size * 0.15,
            backgroundColor: '#6D4C41',
            left: '-80%',
            top: '20%',
            borderRadius: '50% 50% 0 0',
            transform: 'rotate(-45deg)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: size * 0.03,
            height: size * 0.12,
            backgroundColor: '#6D4C41',
            right: '-80%',
            top: '30%',
            borderRadius: '50% 50% 0 0',
            transform: 'rotate(45deg)',
          }}
        />
      </div>
      
      <div
        style={{
          position: 'absolute',
          width: size * 0.04,
          height: size * 0.25,
          backgroundColor: '#6D4C41',
          right: '32%',
          top: '2%',
          borderRadius: '50% 50% 0 0',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: size * 0.03,
            height: size * 0.15,
            backgroundColor: '#6D4C41',
            left: '-80%',
            top: '20%',
            borderRadius: '50% 50% 0 0',
            transform: 'rotate(-45deg)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: size * 0.03,
            height: size * 0.12,
            backgroundColor: '#6D4C41',
            right: '-80%',
            top: '30%',
            borderRadius: '50% 50% 0 0',
            transform: 'rotate(45deg)',
          }}
        />
      </div>
      
      {/* Eyes */}
      <div
        className="absolute bg-black rounded-full"
        style={{
          width: size * 0.07,
          height: size * 0.07,
          left: '58%',
          top: '28%',
        }}
      />
      <div
        className="absolute bg-black rounded-full"
        style={{
          width: size * 0.07,
          height: size * 0.07,
          right: '32%',
          top: '28%',
        }}
      />
      
      {/* Nose */}
      <div
        className="absolute bg-black rounded-full"
        style={{
          width: size * 0.08,
          height: size * 0.06,
          left: '72%',
          top: '44%',
        }}
      />
      
      {/* Legs */}
      <motion.div
        className="absolute"
        style={{
          width: size * 0.12,
          height: size * 0.35,
          background: 'linear-gradient(to bottom, #8D6E63, #6D4C41)',
          left: '20%',
          bottom: '0%',
          borderRadius: '20% 20% 5% 5%',
        }}
        animate={{
          scaleY: [1, 0.95, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />
      <motion.div
        className="absolute"
        style={{
          width: size * 0.12,
          height: size * 0.35,
          background: 'linear-gradient(to bottom, #8D6E63, #6D4C41)',
          left: '38%',
          bottom: '0%',
          borderRadius: '20% 20% 5% 5%',
        }}
        animate={{
          scaleY: [1, 0.95, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: 0.3,
        }}
      />
      
      {/* Tail */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: size * 0.15,
          height: size * 0.18,
          background: 'linear-gradient(135deg, #A1887F, #8D6E63)',
          left: '8%',
          top: '48%',
        }}
        animate={{
          rotate: [-10, 10, -10],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
      />
    </motion.div>
  );
}
