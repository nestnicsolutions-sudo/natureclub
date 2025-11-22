'use client';

import { motion } from 'framer-motion';
import NatureSectionButton from '../ui/NatureSectionButton';
import { Trees, Bird, Bug, Flower2, Fish, Mountain, Snowflake, Leaf, Sun, CloudRain } from 'lucide-react';

interface SidebarNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const natureSections = [
  {
    id: 'forest',
    label: 'Forest',
    icon: <Trees className="w-5 h-5 md:w-6 md:h-6" />,
    color: 'bg-gradient-to-br from-green-500 to-green-700',
  },
  {
    id: 'meadow',
    label: 'Meadow',
    icon: <Flower2 className="w-5 h-5 md:w-6 md:h-6" />,
    color: 'bg-gradient-to-br from-yellow-400 to-pink-500',
  },
  {
    id: 'sky',
    label: 'Sky',
    icon: <Bird className="w-5 h-5 md:w-6 md:h-6" />,
    color: 'bg-gradient-to-br from-blue-400 to-blue-600',
  },
  {
    id: 'pond',
    label: 'Pond',
    icon: <Fish className="w-5 h-5 md:w-6 md:h-6" />,
    color: 'bg-gradient-to-br from-cyan-400 to-blue-500',
  },
  {
    id: 'garden',
    label: 'Garden',
    icon: <Bug className="w-5 h-5 md:w-6 md:h-6" />,
    color: 'bg-gradient-to-br from-purple-400 to-pink-500',
  },
  {
    id: 'mountain',
    label: 'Mountain',
    icon: <Mountain className="w-5 h-5 md:w-6 md:h-6" />,
    color: 'bg-gradient-to-br from-gray-500 to-gray-700',
  },
  {
    id: 'spring',
    label: 'Spring',
    icon: <CloudRain className="w-5 h-5 md:w-6 md:h-6" />,
    color: 'bg-gradient-to-br from-green-300 to-pink-400',
  },
  {
    id: 'summer',
    label: 'Summer',
    icon: <Sun className="w-5 h-5 md:w-6 md:h-6" />,
    color: 'bg-gradient-to-br from-yellow-400 to-orange-500',
  },
  {
    id: 'autumn',
    label: 'Autumn',
    icon: <Leaf className="w-5 h-5 md:w-6 md:h-6" />,
    color: 'bg-gradient-to-br from-orange-500 to-red-600',
  },
  {
    id: 'winter',
    label: 'Winter',
    icon: <Snowflake className="w-5 h-5 md:w-6 md:h-6" />,
    color: 'bg-gradient-to-br from-blue-200 to-blue-400',
  },
];

export default function SidebarNavigation({ 
  activeSection, 
  onSectionChange 
}: SidebarNavigationProps) {
  return (
    <motion.div
      className="fixed left-0 top-12 sm:top-14 md:top-16 lg:top-20 bottom-0 w-16 sm:w-20 md:w-56 lg:w-60 xl:w-64 bg-white/95 backdrop-blur-lg shadow-2xl rounded-r-3xl z-40 overflow-y-auto overflow-x-hidden"
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      style={{ 
        scrollbarWidth: 'thin',
        scrollbarColor: '#10b981 #e5e7eb'
      }}
    >
      <div className="p-2 sm:p-3 md:p-5 lg:p-6">
        <div className="mb-2 sm:mb-4 md:mb-6 text-center md:text-left">
          <h2 className="hidden md:block text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-gray-800 mb-1 md:mb-2">
            🌿 Explore Nature
          </h2>
          <p className="hidden md:block text-xs sm:text-sm text-gray-600">
            Click to visit different habitats!
          </p>
          <span className="md:hidden text-xl sm:text-2xl">🌿</span>
        </div>
        
        <div className="space-y-2 sm:space-y-3">
        {natureSections.map((section, index) => (
          <motion.div
            key={section.id}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <NatureSectionButton
              icon={section.icon}
              label={section.label}
              color={section.color}
              onClick={() => onSectionChange(section.id)}
              isActive={activeSection === section.id}
            />
          </motion.div>
        ))}
      </div>
      
        {/* Fun facts section */}
        <motion.div
          className="mt-6 sm:mt-8 p-3 sm:p-4 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-sm sm:text-base md:text-lg font-bold text-amber-900 mb-2">
            💡 Did you know?
          </h3>
          <p className="text-xs sm:text-sm text-amber-800">
            Each habitat has unique animals and plants waiting to be discovered!
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
