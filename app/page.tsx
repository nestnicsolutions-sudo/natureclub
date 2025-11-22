'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SidebarNavigation from '@/components/navigation/SidebarNavigation';
import ForestScene from '@/components/scenes/ForestScene';
import MeadowScene from '@/components/scenes/MeadowScene';
import SkyScene from '@/components/scenes/SkyScene';
import GardenScene from '@/components/scenes/GardenScene';
import PondScene from '@/components/scenes/PondScene';
import MountainScene from '@/components/scenes/MountainScene';
import SpringScene from '@/components/scenes/SpringScene';
import SummerScene from '@/components/scenes/SummerScene';
import AutumnScene from '@/components/scenes/AutumnScene';
import WinterScene from '@/components/scenes/WinterScene';
import NatureQuests from '@/components/features/NatureQuests';

export default function Home() {
  const [activeSection, setActiveSection] = useState('forest');
  const [showIntro, setShowIntro] = useState(true);
  const [showFactPopup, setShowFactPopup] = useState(false);
  const [currentFact, setCurrentFact] = useState({ animal: '', fact: '' });
  const [weather, setWeather] = useState<'sunny' | 'rainy' | 'rainbow' | 'cloudy'>('sunny');
  const [isNight, setIsNight] = useState(false);
  const [showLightning, setShowLightning] = useState(false);
  const [isWeatherCollapsed, setIsWeatherCollapsed] = useState(false);
  const [showQuests, setShowQuests] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  // Thunder and lightning effect for rainy weather
  useEffect(() => {
    if (weather === 'rainy') {
      const thunderInterval = setInterval(() => {
        setShowLightning(true);
        // Play thunder sound after lightning (simulate delay)
        setTimeout(() => {
          // Thunder sound would play here
        }, 300);
      }, 8000 + Math.random() * 7000); // Random interval between 8-15 seconds

      return () => clearInterval(thunderInterval);
    }
  }, [weather]);

  const handleAnimalClick = (animal: string) => {
    const facts: Record<string, string> = {
      bird: 'Birds can see colors that humans cannot! They have amazing vision! 🐦',
      rabbit: 'Rabbits can jump up to 3 feet high! They love to hop around! 🐰',
      deer: 'Deer can run up to 30 miles per hour! They are super fast! 🦌',
      butterfly: 'Butterflies taste with their feet! How cool is that! 🦋',
      frog: 'Frogs can breathe through their skin underwater! Amazing! 🐸',
      dragonfly: 'Dragonflies can fly in all directions, even backwards! 🦟',
      duck: 'Ducks have waterproof feathers that keep them dry! 🦆',
      goat: 'Mountain goats can climb almost vertical cliffs! 🐐',
      eagle: 'Eagles can see up to 8 times better than humans! 🦅',
      lamb: 'Baby sheep are called lambs and they love to play and jump! 🐑',
      bunny: 'Rabbits thump their feet to warn others of danger! 🐰',
      bee: 'Bees dance to tell other bees where flowers are! 🐝',
      ladybug: 'Ladybugs can eat up to 5,000 insects in their lifetime! 🐞',
      grasshopper: 'Grasshoppers can jump 20 times their body length! 🦗',
      pumpkin: 'Pumpkins are actually fruits, not vegetables! 🎃',
      mushroom: 'Mushrooms can grow super fast, some in just one night! 🍄',
      squirrel: 'Squirrels forget where they bury about 25% of their nuts! 🐿️',
      hedgehog: 'Hedgehogs have about 5,000 spines on their back! 🦔',
      snowman: 'The largest snowman ever built was 122 feet tall! ⛄',
      cardinal: 'Cardinals mate for life and sing beautiful songs together! 🐦',
      fox: 'Foxes use Earth\'s magnetic field to hunt prey under snow! 🦊',
    };
    
    // Play discovery sound
    const event = new CustomEvent('playSound', { detail: { type: 'creatureDiscovery' } });
    window.dispatchEvent(event);
    
    setCurrentFact({ animal, fact: facts[animal] || 'This creature is amazing!' });
    setShowFactPopup(true);
    
    setTimeout(() => setShowFactPopup(false), 4000);
  };

  return (
      <main className="min-h-screen w-full overflow-hidden relative">
        {/* Intro animation */}
        <AnimatePresence>
          {showIntro && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-green-400 via-blue-400 to-purple-400"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="text-center"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-6xl md:text-8xl font-bold text-white drop-shadow-2xl mb-4">
                  🌿 Nature Club! 🦋
                </h1>
                <motion.p
                  className="text-2xl md:text-4xl text-white font-semibold"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                >
                  Let's explore the wild! ✨
                </motion.p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 shadow-xl">
          <div className="flex items-center justify-between">
            <motion.h1 
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow-lg"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              🌳 Nature Club
            </motion.h1>
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
              {/* Feature Buttons */}
              <motion.button
                className="bg-purple-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold text-sm sm:text-base shadow-lg flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowQuests(true)}
              >
                🎯 Quest
              </motion.button>
              
              <motion.button
                className="bg-pink-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold text-sm sm:text-base shadow-lg flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => alert("Kids Traits feature coming soon! (Face detection & Mood)")}
              >
                😊 Traits
              </motion.button>
              
              <motion.button
                className="bg-orange-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold text-sm sm:text-base shadow-lg flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => alert("Games feature coming soon! (Grow a plant, etc.)")}
              >
                🎮 Games
              </motion.button>

              {/* Badge display */}
              <motion.div
                className="bg-yellow-400 text-yellow-900 px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 rounded-full font-black text-sm sm:text-base md:text-lg shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                🏆 0
              </motion.div>
            </div>
          </div>
        </div>

        {/* Weather & Time Controls */}
        <motion.div 
          className="fixed top-14 sm:top-16 md:top-20 lg:top-24 right-2 sm:right-4 md:right-8 z-40 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border-2 border-white overflow-hidden"
          animate={{ 
            width: isWeatherCollapsed ? '60px' : 'auto',
            height: isWeatherCollapsed ? '60px' : 'auto'
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Fold/Unfold Button */}
          <motion.button
            onClick={() => setIsWeatherCollapsed(!isWeatherCollapsed)}
            className="absolute top-2 right-2 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-400 to-purple-500 text-white rounded-full shadow-lg flex items-center justify-center z-50 hover:from-blue-500 hover:to-purple-600"
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            title={isWeatherCollapsed ? 'Show Weather Panel' : 'Hide Weather Panel'}
          >
            <span className="text-xl sm:text-2xl font-bold">{isWeatherCollapsed ? '►' : '◄'}</span>
          </motion.button>

          <AnimatePresence>
            {!isWeatherCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="p-3 sm:p-4 md:p-5"
              >
                <h3 className="text-sm sm:text-base md:text-lg font-black text-gray-800 mb-3 md:mb-4 text-center pr-10">🌤️ Weather</h3>
                <div className="flex flex-col gap-2 sm:gap-2.5 md:gap-3">
            <motion.button
              onClick={() => {
                setWeather('sunny');
                const event = new CustomEvent('playSound', { detail: { type: 'weatherChange' } });
                window.dispatchEvent(event);
              }}
              className={`px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-3.5 rounded-xl md:rounded-2xl font-black text-sm sm:text-base md:text-lg transition-all border-2 ${
                weather === 'sunny'
                  ? 'bg-gradient-to-br from-yellow-300 to-yellow-400 text-yellow-900 shadow-xl border-yellow-500 scale-105'
                  : 'bg-white text-gray-700 hover:bg-yellow-50 shadow-md border-gray-300 hover:border-yellow-400'
              }`}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-2xl md:text-3xl">☀️</span> Sunny
            </motion.button>
            <motion.button
              onClick={() => {
                setWeather('rainy');
                const event = new CustomEvent('playSound', { detail: { type: 'weatherChange' } });
                window.dispatchEvent(event);
              }}
              className={`px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-3.5 rounded-xl md:rounded-2xl font-black text-sm sm:text-base md:text-lg transition-all border-2 ${
                weather === 'rainy'
                  ? 'bg-gradient-to-br from-blue-400 to-blue-500 text-white shadow-xl border-blue-600 scale-105'
                  : 'bg-white text-gray-700 hover:bg-blue-50 shadow-md border-gray-300 hover:border-blue-400'
              }`}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-2xl md:text-3xl">🌧️</span> Rain
            </motion.button>
            <motion.button
              onClick={() => {
                setWeather('rainbow');
                const event = new CustomEvent('playSound', { detail: { type: 'weatherChange' } });
                window.dispatchEvent(event);
              }}
              className={`px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-3.5 rounded-xl md:rounded-2xl font-black text-sm sm:text-base md:text-lg transition-all border-2 ${
                weather === 'rainbow'
                  ? 'bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 to-purple-400 text-white shadow-xl border-purple-500 scale-105'
                  : 'bg-white text-gray-700 hover:bg-purple-50 shadow-md border-gray-300 hover:border-purple-400'
              }`}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-2xl md:text-3xl">🌈</span> Rainbow
            </motion.button>
            <motion.button
              onClick={() => {
                setWeather('cloudy');
                const event = new CustomEvent('playSound', { detail: { type: 'weatherChange' } });
                window.dispatchEvent(event);
              }}
              className={`px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-3.5 rounded-xl md:rounded-2xl font-black text-sm sm:text-base md:text-lg transition-all border-2 ${
                weather === 'cloudy'
                  ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-900 shadow-xl border-gray-500 scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md border-gray-300 hover:border-gray-400'
              }`}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-2xl md:text-3xl">☁️</span> Clouds
            </motion.button>
          </div>
          
          <div className="mt-4 sm:mt-5 md:mt-6 pt-4 sm:pt-5 md:pt-6 border-t-2 border-gray-300">
            <h3 className="text-sm sm:text-base md:text-lg font-black text-gray-800 mb-3 md:mb-4 text-center">🕐 Time</h3>
            <motion.button
              onClick={() => {
                setIsNight(!isNight);
                const event = new CustomEvent('playSound', { detail: { type: 'weatherChange' } });
                window.dispatchEvent(event);
              }}
              className={`w-full px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-3.5 rounded-xl md:rounded-2xl font-black text-sm sm:text-base md:text-lg transition-all border-2 ${
                isNight
                  ? 'bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-xl border-indigo-800'
                  : 'bg-gradient-to-br from-sky-300 to-sky-400 text-sky-900 shadow-xl border-sky-500'
              }`}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {isNight ? <><span className="text-2xl md:text-3xl">🌙</span> Night</> : <><span className="text-2xl md:text-3xl">☀️</span> Day</>}
            </motion.button>
          </div>
        </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Quests Modal */}
        <AnimatePresence>
          {showQuests && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
              <NatureQuests onClose={() => setShowQuests(false)} />
            </div>
          )}
        </AnimatePresence>

        {/* Sidebar Navigation */}
        <SidebarNavigation 
          activeSection={activeSection} 
          onSectionChange={setActiveSection}
        />

        {/* Weather & Night Overlay Effects */}
        <AnimatePresence>
          {/* Night Mode with Moon and Stars */}
          {isNight && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 pointer-events-none z-30"
            >
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-blue-950 to-purple-950 opacity-70" />
              
              {/* Moon */}
              <motion.div
                className="absolute top-24 right-32"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="relative w-24 h-24">
                  {/* Moon glow */}
                  <div className="absolute inset-0 rounded-full bg-yellow-100 opacity-40 blur-2xl scale-150" />
                  {/* Moon body */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-100 to-gray-200 shadow-2xl">
                    {/* Moon craters */}
                    <div className="absolute w-4 h-4 bg-gray-300 rounded-full top-4 left-6 opacity-50" />
                    <div className="absolute w-3 h-3 bg-gray-300 rounded-full top-12 left-10 opacity-40" />
                    <div className="absolute w-5 h-5 bg-gray-300 rounded-full top-14 left-4 opacity-30" />
                  </div>
                </div>
              </motion.div>
              
              {/* Stars */}
              {Array.from({ length: 100 }).map((_, i) => {
                const starLeft = Math.random() * 100;
                const starTop = Math.random() * 70;
                const starDelay = Math.random() * 2;
                const starDuration = 2 + Math.random() * 3;
                return (
                  <div
                    key={`star-${i}`}
                    className="absolute"
                    style={{
                      left: `${starLeft}%`,
                      top: `${starTop}%`,
                    }}
                  >
                    <motion.div
                      className="w-1 h-1 bg-white rounded-full"
                      animate={{
                        opacity: [0.3, 1, 0.3],
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: starDuration,
                        repeat: Infinity,
                        delay: starDelay,
                      }}
                    />
                  </div>
                );
              })}
              
              {/* Shooting stars */}
              {[1, 2, 3].map((i) => {
                const shootingLeft = 20 + i * 30;
                return (
                  <div
                    key={`shooting-${i}`}
                    className="absolute"
                    style={{
                      left: `${shootingLeft}%`,
                      top: '10%',
                    }}
                  >
                    <motion.div
                      className="w-1 h-1 bg-white rounded-full"
                      animate={{
                        x: [0, 300],
                        y: [0, 200],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 8 + i * 3,
                        delay: i * 2,
                      }}
                    >
                      <div className="w-20 h-0.5 bg-gradient-to-r from-white to-transparent -rotate-45" />
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          )}
          
          {/* Rain Effect with Thunder & Lightning */}
          {weather === 'rainy' && (
            <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
              {/* Rain clouds */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                className="absolute inset-0 bg-gray-400/20"
              />
              
              {/* Lightning Flash */}
              <AnimatePresence>
                {showLightning && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0, 1, 0] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 bg-white z-40"
                    onAnimationComplete={() => setShowLightning(false)}
                  />
                )}
              </AnimatePresence>
              
              {/* Lightning Bolts */}
              <motion.svg
                className="absolute top-0 left-1/4 w-32 h-64"
                viewBox="0 0 100 200"
                initial={{ opacity: 0 }}
                animate={{ opacity: showLightning ? [0, 1, 0, 1, 0] : 0 }}
                transition={{ duration: 0.4 }}
              >
                <path
                  d="M 50 0 L 45 60 L 55 60 L 40 120 L 50 120 L 35 200 L 60 100 L 50 100 L 65 40 L 55 40 Z"
                  fill="#FFD700"
                  stroke="#FFF"
                  strokeWidth="2"
                  filter="url(#glow)"
                />
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
              </motion.svg>
              
              {/* Second Lightning Bolt */}
              <motion.svg
                className="absolute top-0 right-1/3 w-32 h-64"
                viewBox="0 0 100 200"
                initial={{ opacity: 0 }}
                animate={{ opacity: showLightning ? [0, 0, 1, 0, 1, 0] : 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <path
                  d="M 50 0 L 45 60 L 55 60 L 40 120 L 50 120 L 35 200 L 60 100 L 50 100 L 65 40 L 55 40 Z"
                  fill="#FFD700"
                  stroke="#FFF"
                  strokeWidth="2"
                  filter="url(#glow2)"
                />
                <defs>
                  <filter id="glow2">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
              </motion.svg>
              
              {/* Raindrops */}
              {Array.from({ length: 100 }).map((_, i) => {
                const rainLeft = Math.random() * 100;
                const rainDuration = 0.8 + Math.random() * 0.4;
                const rainDelay = Math.random() * 2;
                return (
                  <div
                    key={`rain-${i}`}
                    className="absolute"
                    style={{
                      left: `${rainLeft}%`,
                      top: '-10%',
                    }}
                  >
                    <motion.div
                      className="w-0.5 h-8 bg-gradient-to-b from-blue-300 to-blue-500 rounded-full"
                      animate={{
                        y: ['0vh', '120vh'],
                      }}
                      transition={{
                        duration: rainDuration,
                        repeat: Infinity,
                        delay: rainDelay,
                        ease: 'linear',
                      }}
                    />
                  </div>
                );
              })}
              
              {/* Ground splash effects */}
              {Array.from({ length: 30 }).map((_, i) => {
                const splashLeft = Math.random() * 100;
                const splashDelay = Math.random() * 2;
                return (
                  <div
                    key={`splash-${i}`}
                    className="absolute bottom-0"
                    style={{
                      left: `${splashLeft}%`,
                    }}
                  >
                    <motion.div
                      animate={{
                        opacity: [0, 0.5, 0],
                        scale: [0, 1.5, 0],
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        delay: splashDelay,
                      }}
                    >
                      <div className="w-2 h-2 rounded-full bg-blue-300/50" />
                    </motion.div>
                  </div>
                );
              })}
            </div>
          )}
          
          {/* Rainbow */}
          {weather === 'rainbow' && (
            <div
              className="fixed bottom-0 left-1/2 transform -translate-x-1/2 pointer-events-none z-30"
              style={{
                width: '90vw' as any,
                height: '50vh' as any,
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="w-full h-full"
              >
              <svg viewBox="0 0 1000 500" className="w-full h-full" preserveAspectRatio="xMidYMax meet">
                <defs>
                  <linearGradient id="rainbow" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: '#FF0000', stopOpacity: 0.9 }} />
                    <stop offset="16.67%" style={{ stopColor: '#FF7F00', stopOpacity: 0.9 }} />
                    <stop offset="33.33%" style={{ stopColor: '#FFFF00', stopOpacity: 0.9 }} />
                    <stop offset="50%" style={{ stopColor: '#00FF00', stopOpacity: 0.9 }} />
                    <stop offset="66.67%" style={{ stopColor: '#0000FF', stopOpacity: 0.9 }} />
                    <stop offset="83.33%" style={{ stopColor: '#4B0082', stopOpacity: 0.9 }} />
                    <stop offset="100%" style={{ stopColor: '#9400D3', stopOpacity: 0.9 }} />
                  </linearGradient>
                </defs>
                {/* Outer rainbow arc */}
                <path
                  d="M 50 500 Q 500 50 950 500"
                  fill="none"
                  stroke="url(#rainbow)"
                  strokeWidth="40"
                  strokeLinecap="round"
                />
                {/* Inner glowing arc */}
                <motion.path
                  d="M 100 500 Q 500 100 900 500"
                  fill="none"
                  stroke="url(#rainbow)"
                  strokeWidth="30"
                  strokeLinecap="round"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              </svg>
              </motion.div>
            </div>
          )}
          
          {/* Cloudy Weather */}
          {weather === 'cloudy' && (
            <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
              {/* Gray sky overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                className="absolute inset-0 bg-gray-500/30"
              />
              
              {/* Animated Clouds */}
              {[1, 2, 3, 4, 5, 6].map((cloud) => {
                const cloudTop = 10 + (cloud * 15);
                const cloudSize = 100 + Math.random() * 100;
                const cloudDuration = 20 + Math.random() * 15;
                return (
                  <div
                    key={`cloud-${cloud}`}
                    className="absolute"
                    style={{
                      top: `${cloudTop}%`,
                    }}
                  >
                    <motion.div
                      initial={{ x: '-200px' }}
                      animate={{ x: '100vw' }}
                      transition={{
                        duration: cloudDuration,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: cloud * 2,
                      }}
                    >
                    <svg
                      width={cloudSize}
                      height={cloudSize * 0.6}
                      viewBox="0 0 200 120"
                      className="drop-shadow-lg"
                    >
                      <ellipse cx="50" cy="70" rx="40" ry="30" fill="white" opacity="0.9" />
                      <ellipse cx="85" cy="60" rx="50" ry="40" fill="white" opacity="0.9" />
                      <ellipse cx="120" cy="65" rx="45" ry="35" fill="white" opacity="0.9" />
                      <ellipse cx="150" cy="75" rx="35" ry="25" fill="white" opacity="0.9" />
                      {/* Cloud shadows */}
                      <ellipse cx="50" cy="75" rx="40" ry="25" fill="gray" opacity="0.2" />
                      <ellipse cx="85" cy="68" rx="50" ry="35" fill="gray" opacity="0.2" />
                      <ellipse cx="120" cy="72" rx="45" ry="30" fill="gray" opacity="0.2" />
                    </svg>
                    </motion.div>
                  </div>
                );
              })}
              
              {/* Additional smaller clouds for depth */}
              {[1, 2, 3, 4].map((cloud) => {
                const cloudTop = 5 + (cloud * 20);
                const cloudSize = 60 + Math.random() * 60;
                const cloudDuration = 30 + Math.random() * 20;
                return (
                  <div
                    key={`small-cloud-${cloud}`}
                    className="absolute"
                    style={{
                      top: `${cloudTop}%`,
                    }}
                  >
                    <motion.div
                      initial={{ x: '100vw' }}
                      animate={{ x: '-200px' }}
                      transition={{
                        duration: cloudDuration,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: cloud * 3,
                      }}
                    >
                    <svg
                      width={cloudSize}
                      height={cloudSize * 0.6}
                      viewBox="0 0 200 120"
                      className="drop-shadow-md"
                    >
                      <ellipse cx="50" cy="70" rx="35" ry="25" fill="white" opacity="0.7" />
                      <ellipse cx="85" cy="60" rx="45" ry="35" fill="white" opacity="0.7" />
                      <ellipse cx="120" cy="65" rx="40" ry="30" fill="white" opacity="0.7" />
                    </svg>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          )}
        </AnimatePresence>

        {/* Main scene area */}
        <div className="ml-48 sm:ml-52 md:ml-56 lg:ml-60 xl:ml-64 pt-12 sm:pt-14 md:pt-16 lg:pt-20 h-screen overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full"
            >
              {activeSection === 'forest' && <ForestScene onAnimalClick={handleAnimalClick} weather={weather} isNight={isNight} />}
              {activeSection === 'meadow' && <MeadowScene onAnimalClick={handleAnimalClick} weather={weather} isNight={isNight} />}
              {activeSection === 'sky' && <SkyScene onAnimalClick={handleAnimalClick} weather={weather} isNight={isNight} />}
              {activeSection === 'garden' && <GardenScene onAnimalClick={handleAnimalClick} weather={weather} isNight={isNight} />}
              {activeSection === 'pond' && <PondScene onAnimalClick={handleAnimalClick} weather={weather} isNight={isNight} />}
              {activeSection === 'mountain' && <MountainScene onAnimalClick={handleAnimalClick} weather={weather} isNight={isNight} />}
              {activeSection === 'spring' && <SpringScene onAnimalClick={handleAnimalClick} weather={weather} isNight={isNight} />}
              {activeSection === 'summer' && <SummerScene onAnimalClick={handleAnimalClick} weather={weather} isNight={isNight} />}
              {activeSection === 'autumn' && <AutumnScene onAnimalClick={handleAnimalClick} weather={weather} isNight={isNight} />}
              {activeSection === 'winter' && <WinterScene onAnimalClick={handleAnimalClick} weather={weather} isNight={isNight} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Fact Popup */}
        <AnimatePresence>
          {showFactPopup && (
            <motion.div
              className="fixed top-32 left-1/2 transform -translate-x-1/2 z-50 bg-white rounded-3xl shadow-2xl p-8 max-w-md"
              initial={{ scale: 0, y: -50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0, y: -50 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <h3 className="text-3xl font-bold text-purple-600 mb-4">Fun Fact! 💡</h3>
              <p className="text-xl text-gray-700">{currentFact.fact}</p>
            </motion.div>
          )}
        </AnimatePresence>


      </main>
  );
}
