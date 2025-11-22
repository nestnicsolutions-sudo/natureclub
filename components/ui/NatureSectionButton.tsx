'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface NatureSectionButtonProps {
  icon: ReactNode;
  label: string;
  color: string;
  onClick: () => void;
  isActive?: boolean;
}

export default function NatureSectionButton({ 
  icon, 
  label, 
  color, 
  onClick, 
  isActive 
}: NatureSectionButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`w-full p-4 rounded-2xl transition-all ${
        isActive
          ? `${color} scale-105 shadow-2xl`
          : 'bg-white/80 hover:bg-white shadow-lg'
      }`}
      whileHover={{ scale: 1.05, x: 10 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 rounded-xl ${isActive ? 'bg-white/30' : color} flex items-center justify-center text-2xl`}>
          {icon}
        </div>
        <span className={`font-bold text-lg ${isActive ? 'text-white' : 'text-gray-700'}`}>
          {label}
        </span>
      </div>
    </motion.button>
  );
}
