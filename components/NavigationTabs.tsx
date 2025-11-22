'use client';

import { motion } from 'framer-motion';

interface NavigationTabsProps {
  activeTab: 'explore' | 'missions' | 'badges' | 'games' | 'zoom' | 'sounds';
  onTabChange: (tab: 'explore' | 'missions' | 'badges' | 'games' | 'zoom' | 'sounds') => void;
}

export default function NavigationTabs({ activeTab, onTabChange }: NavigationTabsProps) {
  const tabs = [
    { id: 'explore' as const, label: 'Explore', icon: '🌳' },
    { id: 'games' as const, label: 'Games', icon: '🎮' },
    { id: 'zoom' as const, label: 'Zoom', icon: '🔭' },
    { id: 'sounds' as const, label: 'Sounds', icon: '🎵' },
    { id: 'missions' as const, label: 'Quests', icon: '🎯' },
    { id: 'badges' as const, label: 'Badges', icon: '🏆' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 shadow-2xl overflow-x-auto">
      <div className="flex justify-start md:justify-around items-center py-3 px-4 gap-2 min-w-max md:min-w-0">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center flex-1 max-w-[140px] py-2 px-4 rounded-2xl font-bold text-base md:text-xl transition-all ${
              activeTab === tab.id
                ? 'bg-white text-purple-600 shadow-xl scale-110'
                : 'bg-white/30 text-white hover:bg-white/50'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={activeTab === tab.id ? { y: [0, -3, 0] } : {}}
            transition={{ duration: 0.5, repeat: activeTab === tab.id ? Infinity : 0, repeatDelay: 2 }}
          >
            <span className="text-3xl md:text-4xl mb-1">{tab.icon}</span>
            <span className="text-sm md:text-base">{tab.label}</span>
          </motion.button>
        ))}
      </div>
    </nav>
  );
}
