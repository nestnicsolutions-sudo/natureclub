'use client';

import { motion } from 'framer-motion';

interface AnimatedTreeProps {
  size?: number;
  stage?: number;
  className?: string;
  onClick?: () => void;
}

export default function AnimatedTree({ 
  size = 80,
  stage = 3,
  className = '',
  onClick 
}: AnimatedTreeProps) {
  const treeHeight = size * (0.5 + stage * 0.15);
  const treeWidth = size * (0.4 + stage * 0.1);
  
  return (
    <motion.div
      className={`relative cursor-pointer ${className}`}
      style={{ width: size, height: treeHeight }}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Trunk */}
      <motion.div
        className="absolute"
        style={{
          width: size * 0.15,
          height: treeHeight * 0.4,
          background: 'linear-gradient(to right, #8B4513, #A0522D)',
          left: '42.5%',
          bottom: 0,
          borderRadius: '10% 10% 0 0',
        }}
        animate={{
          scaleY: [1, 1.02, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        {/* Trunk texture */}
        <div className="absolute w-full h-1 bg-black/20" style={{ top: '30%' }} />
        <div className="absolute w-full h-1 bg-black/20" style={{ top: '60%' }} />
      </motion.div>
      
      {/* Foliage layers */}
      {stage >= 1 && (
        <>
          {/* Bottom layer */}
          <motion.div
            className="absolute"
            style={{
              width: treeWidth,
              height: treeHeight * 0.35,
              background: 'linear-gradient(135deg, #4CAF50, #2E7D32)',
              left: `${(100 - (treeWidth / size * 100)) / 2}%`,
              bottom: treeHeight * 0.25,
              borderRadius: '50%',
            }}
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Middle layer */}
          {stage >= 2 && (
            <motion.div
              className="absolute"
              style={{
                width: treeWidth * 0.85,
                height: treeHeight * 0.32,
                background: 'linear-gradient(135deg, #66BB6A, #388E3C)',
                left: `${(100 - (treeWidth * 0.85 / size * 100)) / 2}%`,
                bottom: treeHeight * 0.4,
                borderRadius: '50%',
              }}
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
          )}
          
          {/* Top layer */}
          {stage >= 3 && (
            <motion.div
              className="absolute"
              style={{
                width: treeWidth * 0.7,
                height: treeHeight * 0.3,
                background: 'linear-gradient(135deg, #81C784, #43A047)',
                left: `${(100 - (treeWidth * 0.7 / size * 100)) / 2}%`,
                bottom: treeHeight * 0.55,
                borderRadius: '50%',
              }}
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          )}
          
          {/* Fruits if stage 4 */}
          {stage >= 4 && (
            <>
              <motion.div
                className="absolute bg-red-500 rounded-full shadow-lg"
                style={{
                  width: size * 0.12,
                  height: size * 0.12,
                  left: '25%',
                  top: '35%',
                }}
                animate={{
                  y: [0, -3, 0],
                  rotate: [-5, 5, -5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
              <motion.div
                className="absolute bg-red-500 rounded-full shadow-lg"
                style={{
                  width: size * 0.12,
                  height: size * 0.12,
                  right: '28%',
                  top: '40%',
                }}
                animate={{
                  y: [0, -3, 0],
                  rotate: [5, -5, 5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.5,
                }}
              />
            </>
          )}
        </>
      )}
      
      {/* Small leaves falling animation */}
      {stage >= 2 && (
        <>
          <motion.div
            className="absolute w-2 h-2 bg-green-600 rounded-full"
            style={{
              left: '30%',
              top: '20%',
            }}
            animate={{
              y: [0, 60],
              x: [0, -10, 10, 0],
              rotate: [0, 360],
              opacity: [1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          />
          <motion.div
            className="absolute w-2 h-2 bg-green-600 rounded-full"
            style={{
              right: '35%',
              top: '25%',
            }}
            animate={{
              y: [0, 60],
              x: [0, 10, -10, 0],
              rotate: [0, -360],
              opacity: [1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatDelay: 5,
            }}
          />
        </>
      )}
    </motion.div>
  );
}
