// Game state types
export interface AnimalState {
  id: string;
  type: 'bird' | 'rabbit' | 'deer' | 'butterfly' | 'owl' | 'bat';
  mood: 'happy' | 'sleepy' | 'playful' | 'surprised' | 'hungry';
  lastFed: number;
  feedCount: number;
  position: { x: number; y: number };
}

export interface PlantState {
  id: string;
  type: 'tree' | 'flower' | 'bush';
  stage: 0 | 1 | 2 | 3 | 4; // Growth stages
  lastWatered: number;
  waterCount: number;
  hasFruit: boolean;
}

export interface WeatherState {
  current: 'sunny' | 'rainy' | 'cloudy' | 'rainbow' | 'night';
  cloudCount: number;
  isRaining: boolean;
  timeOfDay: 'day' | 'night';
}

export interface BadgeType {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt?: number;
  requirement: number;
  progress: number;
}

export interface MissionType {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  reward: string;
  target: number;
  progress: number;
}

export interface GameState {
  userId: string;
  animals: AnimalState[];
  plants: PlantState[];
  weather: WeatherState;
  badges: BadgeType[];
  missions: MissionType[];
  totalInteractions: number;
  hiddenCreaturesFound: string[];
  lastPlayed: number;
}

export interface HiddenCreature {
  id: string;
  type: 'firefly' | 'ladybug' | 'chameleon' | 'butterfly';
  fact: string;
  discovered: boolean;
}
