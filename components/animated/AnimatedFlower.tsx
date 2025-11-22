'use client';

import { motion } from 'framer-motion';

interface AnimatedFlowerProps {
  size?: number;
  stage?: number;
  className?: string;
  onClick?: () => void;
}

export default function AnimatedFlower({ 
  size = 60,
  stage = 3,
  className = '',
  onClick 
}: AnimatedFlowerProps) {
  const petalCount = Math.min(stage + 3, 8);
  const centerSize = size * 0.25;
  
  return (
    <motion.div
      className={`relative cursor-pointer ${className}`}
      style={{ width: size, height: size }}
      onClick={onClick}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 0.8, type: "spring" }}
    >
      {/* Stem */}
      {stage >= 1 && (
        <motion.div
          className="absolute"
          style={{
            width: size * 0.08,
            height: size * 0.5,
            background: 'linear-gradient(to right, #2E7D32, #4CAF50)',
            left: '46%',
            bottom: 0,
            borderRadius: '10% 10% 0 0',
          }}
          animate={{
            scaleY: [1, 1.03, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          {/* Leaf */}
          <motion.div
            className="absolute"
            style={{
              width: size * 0.15,
              height: size * 0.1,
              background: 'linear-gradient(to right, #1B5E20, #2E7D32)',
              left: '-80%',
              top: '40%',
              borderRadius: '0 50% 50% 0',
            }}
            animate={{
              rotate: [-10, 10, -10],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          />
        </motion.div>
      )}
      
      {/* Petals */}
      {stage >= 2 && (
        <div
          className="absolute"
          style={{
            left: '50%',
            top: '25%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {Array.from({ length: petalCount }).map((_, i) => {
            const angle = (360 / petalCount) * i;
            const petalColor = stage >= 4 ? '#FF1744' : stage >= 3 ? '#FF4081' : '#FFB6C1';
            
            return (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  width: size * 0.25,
                  height: size * 0.35,
                  background: `linear-gradient(135deg, ${petalColor}, ${petalColor}88)`,
                  borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                  left: '50%',
                  top: '50%',
                  transformOrigin: 'center center',
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${size * 0.18}px)`,
                }}
                initial={{ scale: 0 }}
                animate={{ 
                  scale: 1,
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                  scale: { delay: i * 0.1, duration: 0.5 },
                  rotate: { 
                    duration: 4, 
                    repeat: Infinity,
                    delay: i * 0.2,
                  }
                }}
              />
            );
          })}
        </div>
      )}
      
      {/* Center */}
      {stage >= 2 && (
        <motion.div
          className="absolute rounded-full"
          style={{
            width: centerSize,
            height: centerSize,
            background: 'radial-gradient(circle, #FFD700, #FFA500)',
            left: '50%',
            top: '25%',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 10px rgba(255, 215, 0, 0.5)',
          }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          {/* Center dots */}
          {stage >= 3 && (
            <>
              {Array.from({ length: 6 }).map((_, i) => {
                const angle = (360 / 6) * i;
                const radius = centerSize * 0.25;
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;
                
                return (
                  <div
                    key={i}
                    className="absolute bg-orange-700 rounded-full"
                    style={{
                      width: centerSize * 0.15,
                      height: centerSize * 0.15,
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                );
              })}
            </>
          )}
        </motion.div>
      )}
      
      {/* Sparkles when fully grown */}
      {stage >= 4 && (
        <>
          <motion.div
            className="absolute w-2 h-2 bg-yellow-300 rounded-full"
            style={{
              left: '20%',
              top: '15%',
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
            }}
          />
          <motion.div
            className="absolute w-2 h-2 bg-yellow-300 rounded-full"
            style={{
              right: '20%',
              top: '20%',
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
              delay: 0.5,
            }}
          />
        </>
      )}
    </motion.div>
  );
}
