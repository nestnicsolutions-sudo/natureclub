'use client';

import { motion } from 'framer-motion';

interface AnimatedButterflyProps {
  size?: number;
  className?: string;
  onClick?: (animalName: string) => void;
}

export default function AnimatedButterfly({ 
  size = 60,
  className = '',
  onClick 
}: AnimatedButterflyProps) {
  return (
    <motion.div
      className={`relative cursor-pointer ${className}`}
      style={{ width: size, height: size * 0.8 } as any}
      onClick={() => onClick && onClick('butterfly')}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      animate={{
        y: [0, -15, 0],
        x: [0, 5, 0, -5, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {/* Body */}
      <div
        className="absolute bg-gray-800 rounded-full"
        style={{
          width: size * 0.12,
          height: size * 0.6,
          left: '44%',
          top: '20%',
        }}
      />
      
      {/* Left upper wing */}
      <motion.div
        className="absolute"
        style={{
          width: size * 0.45,
          height: size * 0.5,
          left: '5%',
          top: '10%',
          background: 'linear-gradient(135deg, #FF6B9D 0%, #FEC368 50%, #FF9A8B 100%)',
          borderRadius: '80% 20% 50% 50% / 80% 80% 20% 20%',
          transformOrigin: 'right center',
        } as any}
        animate={{
          rotateY: [0, 30, 0],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
        }}
      >
        {/* Wing pattern */}
        <div
          className="absolute bg-white/40 rounded-full"
          style={{
            width: '35%',
            height: '35%',
            top: '25%',
            left: '25%',
          }}
        />
        <div
          className="absolute bg-white/30 rounded-full"
          style={{
            width: '25%',
            height: '25%',
            top: '50%',
            left: '45%',
          }}
        />
      </motion.div>
      
      {/* Right upper wing */}
      <motion.div
        className="absolute"
        style={{
          width: size * 0.45,
          height: size * 0.5,
          right: '5%',
          top: '10%',
          background: 'linear-gradient(225deg, #FF6B9D 0%, #FEC368 50%, #FF9A8B 100%)',
          borderRadius: '20% 80% 50% 50% / 80% 80% 20% 20%',
          transformOrigin: 'left center',
        } as any}
        animate={{
          rotateY: [0, -30, 0],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
        }}
      >
        {/* Wing pattern */}
        <div
          className="absolute bg-white/40 rounded-full"
          style={{
            width: '35%',
            height: '35%',
            top: '25%',
            right: '25%',
          }}
        />
        <div
          className="absolute bg-white/30 rounded-full"
          style={{
            width: '25%',
            height: '25%',
            top: '50%',
            right: '45%',
          }}
        />
      </motion.div>
      
      {/* Left lower wing */}
      <motion.div
        className="absolute"
        style={{
          width: size * 0.4,
          height: size * 0.4,
          left: '8%',
          bottom: '15%',
          background: 'linear-gradient(135deg, #C471ED 0%, #F64F59 100%)',
          borderRadius: '50% 20% 80% 50% / 50% 20% 80% 50%',
          transformOrigin: 'right center',
        } as any}
        animate={{
          rotateY: [0, 30, 0],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
        }}
      />
      
      {/* Right lower wing */}
      <motion.div
        className="absolute"
        style={{
          width: size * 0.4,
          height: size * 0.4,
          right: '8%',
          bottom: '15%',
          background: 'linear-gradient(225deg, #C471ED 0%, #F64F59 100%)',
          borderRadius: '20% 50% 50% 80% / 20% 50% 50% 80%',
          transformOrigin: 'left center',
        } as any}
        animate={{
          rotateY: [0, -30, 0],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
        }}
      />
      
      {/* Antennae */}
      <motion.div
        style={{
          position: 'absolute',
          width: size * 0.02,
          height: size * 0.25,
          backgroundColor: '#333',
          left: '43%',
          top: '0%',
          borderRadius: '50% 50% 0 0',
          transformOrigin: 'bottom',
        } as any}
        animate={{
          rotate: [-10, 10, -10],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        <div
          className="absolute bg-pink-400 rounded-full"
          style={{
            width: size * 0.06,
            height: size * 0.06,
            left: '-100%',
            top: '-50%',
          }}
        />
      </motion.div>
      
      <motion.div
        style={{
          position: 'absolute',
          width: size * 0.02,
          height: size * 0.25,
          backgroundColor: '#333',
          right: '43%',
          top: '0%',
          borderRadius: '50% 50% 0 0',
          transformOrigin: 'bottom',
        } as any}
        animate={{
          rotate: [10, -10, 10],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        <div
          className="absolute bg-pink-400 rounded-full"
          style={{
            width: size * 0.06,
            height: size * 0.06,
            right: '-100%',
            top: '-50%',
          }}
        />
      </motion.div>
    </motion.div>
  );
}
