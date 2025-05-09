export interface Exercise {
  id: string;
  title: string;
  info: string;
  instructions: string;
  animationType: 'fluidBall' | 'cosmicStar' | 'dayNightCycle' | 'spiral' | 'waterCircle' | 'vocalWave' | 'timer';
  type: 'morning' | 'afternoon' | 'night' | 'hypertension' | 'stress' | 'anxiety' | 'timer';
  cycles: number;
  steps: ExerciseStep[];
}

export interface ExerciseStep {
  type: 'inhale' | 'hold' | 'exhale' | 'rest';
  duration: number; // in seconds
  instruction?: string;
}

export interface AnimationProps {
  animationState: 'inhale' | 'hold' | 'exhale' | 'rest';
  progress: number; // 0 to 1
}