'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { GameState, WeatherState, AnimalState, PlantState, BadgeType, MissionType } from '@/types/game';
import { storage } from '@/lib/firebase';

interface GameContextType {
  gameState: GameState;
  updateWeather: (weather: Partial<WeatherState>) => void;
  feedAnimal: (animalId: string) => void;
  waterPlant: (plantId: string) => void;
  discoverCreature: (creatureId: string) => void;
  checkBadges: () => void;
  updateMissionProgress: (missionId: string, progress: number) => void;
  saveProgress: () => Promise<void>;
}

const defaultGameState: GameState = {
  userId: 'guest',
  animals: [
    { id: 'bird1', type: 'bird', mood: 'playful', lastFed: 0, feedCount: 0, position: { x: 30, y: 20 } },
    { id: 'rabbit1', type: 'rabbit', mood: 'happy', lastFed: 0, feedCount: 0, position: { x: 60, y: 70 } },
    { id: 'deer1', type: 'deer', mood: 'playful', lastFed: 0, feedCount: 0, position: { x: 80, y: 60 } },
    { id: 'butterfly1', type: 'butterfly', mood: 'playful', lastFed: 0, feedCount: 0, position: { x: 40, y: 35 } },
  ],
  plants: [
    { id: 'tree1', type: 'tree', stage: 1, lastWatered: 0, waterCount: 0, hasFruit: false },
    { id: 'flower1', type: 'flower', stage: 2, lastWatered: 0, waterCount: 0, hasFruit: false },
    { id: 'bush1', type: 'bush', stage: 2, lastWatered: 0, waterCount: 0, hasFruit: false },
  ],
  weather: {
    current: 'sunny',
    cloudCount: 2,
    isRaining: false,
    timeOfDay: 'day',
  },
  badges: [
    { id: 'rain-maker', name: 'Rain Maker', description: 'Changed weather 10 times', icon: '🌧️', earned: false, requirement: 10, progress: 0 },
    { id: 'super-feeder', name: 'Super Feeder', description: 'Fed animals 20 times', icon: '🍎', earned: false, requirement: 20, progress: 0 },
    { id: 'plant-hero', name: 'Plant Hero', description: 'Grew tree to stage 4', icon: '🌳', earned: false, requirement: 4, progress: 0 },
    { id: 'sky-wizard', name: 'Sky Wizard', description: 'Created a rainbow', icon: '🌈', earned: false, requirement: 1, progress: 0 },
    { id: 'night-explorer', name: 'Night Explorer', description: 'Explored at night', icon: '🌙', earned: false, requirement: 1, progress: 0 },
  ],
  missions: [
    { id: 'find-butterflies', title: 'Find Butterflies!', description: 'Tap to find 3 butterflies', completed: false, reward: '⭐', target: 3, progress: 0 },
    { id: 'water-flower', title: 'Help Flower Drink!', description: 'Water the flower 3 times', completed: false, reward: '🌻', target: 3, progress: 0 },
    { id: 'make-rainbow', title: 'Make a Rainbow!', description: 'Create a beautiful rainbow', completed: false, reward: '🌈', target: 1, progress: 0 },
  ],
  totalInteractions: 0,
  hiddenCreaturesFound: [],
  lastPlayed: Date.now(),
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState>(defaultGameState);

  // Load saved progress on mount
  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const savedState = storage.load('gameState');
      if (savedState) {
        setGameState(savedState);
      }
    } catch (error) {
      console.log('Using default game state');
    }
  };

  const saveProgress = async () => {
    try {
      storage.save('gameState', {
        ...gameState,
        lastPlayed: Date.now(),
      });
    } catch (error) {
      console.log('Failed to save progress');
    }
  };

  const updateWeather = (weather: Partial<WeatherState>) => {
    setGameState(prev => ({
      ...prev,
      weather: { ...prev.weather, ...weather },
      totalInteractions: prev.totalInteractions + 1,
    }));
  };

  const feedAnimal = (animalId: string) => {
    setGameState(prev => {
      const animals = prev.animals.map(animal =>
        animal.id === animalId
          ? { ...animal, mood: 'happy' as const, lastFed: Date.now(), feedCount: animal.feedCount + 1 }
          : animal
      );
      const totalFeeds = animals.reduce((sum, a) => sum + a.feedCount, 0);
      
      return {
        ...prev,
        animals,
        totalInteractions: prev.totalInteractions + 1,
        badges: prev.badges.map(badge =>
          badge.id === 'super-feeder' ? { ...badge, progress: totalFeeds } : badge
        ),
      };
    });
  };

  const waterPlant = (plantId: string) => {
    setGameState(prev => {
      const plants = prev.plants.map(plant => {
        if (plant.id === plantId) {
          const newStage = Math.min(plant.stage + 1, 4) as 0 | 1 | 2 | 3 | 4;
          return {
            ...plant,
            stage: newStage,
            lastWatered: Date.now(),
            waterCount: plant.waterCount + 1,
            hasFruit: newStage === 4,
          };
        }
        return plant;
      });

      const maxTreeStage = Math.max(...plants.filter(p => p.type === 'tree').map(p => p.stage));

      return {
        ...prev,
        plants,
        totalInteractions: prev.totalInteractions + 1,
        badges: prev.badges.map(badge =>
          badge.id === 'plant-hero' ? { ...badge, progress: maxTreeStage } : badge
        ),
      };
    });
  };

  const discoverCreature = (creatureId: string) => {
    setGameState(prev => ({
      ...prev,
      hiddenCreaturesFound: [...prev.hiddenCreaturesFound, creatureId],
      totalInteractions: prev.totalInteractions + 1,
    }));
  };

  const checkBadges = () => {
    setGameState(prev => ({
      ...prev,
      badges: prev.badges.map(badge => ({
        ...badge,
        earned: badge.progress >= badge.requirement || badge.earned,
        earnedAt: badge.earned && !badge.earnedAt ? Date.now() : badge.earnedAt,
      })),
    }));
  };

  const updateMissionProgress = (missionId: string, progress: number) => {
    setGameState(prev => ({
      ...prev,
      missions: prev.missions.map(mission =>
        mission.id === missionId
          ? { ...mission, progress, completed: progress >= mission.target }
          : mission
      ),
    }));
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        updateWeather,
        feedAnimal,
        waterPlant,
        discoverCreature,
        checkBadges,
        updateMissionProgress,
        saveProgress,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
