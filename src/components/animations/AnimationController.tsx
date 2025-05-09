import React from 'react';
import { AnimationProps } from '../../types';
import FluidBallAnimation from './FluidBallAnimation';
import CosmicStarAnimation from './CosmicStarAnimation';
import DayNightCycleAnimation from './DayNightCycleAnimation';
import SpiralAnimation from './SpiralAnimation';
import WaterCircleAnimation from './WaterCircleAnimation';
import VocalWaveAnimation from './VocalWaveAnimation';
import TimerAnimation from './TimerAnimation';

interface AnimationControllerProps extends AnimationProps {
  type: string;
}

const AnimationController: React.FC<AnimationControllerProps> = ({ type, animationState, progress }) => {
  switch (type) {
    case 'fluidBall':
      return <FluidBallAnimation animationState={animationState} progress={progress} />;
    case 'cosmicStar':
      return <CosmicStarAnimation animationState={animationState} progress={progress} />;
    case 'dayNightCycle':
      return <DayNightCycleAnimation animationState={animationState} progress={progress} />;
    case 'spiral':
      return <SpiralAnimation animationState={animationState} progress={progress} />;
    case 'waterCircle':
      return <WaterCircleAnimation animationState={animationState} progress={progress} />;
    case 'vocalWave':
      return <VocalWaveAnimation animationState={animationState} progress={progress} />;
    case 'timer':
      return <TimerAnimation animationState={animationState} progress={progress} />;
    default:
      return <FluidBallAnimation animationState={animationState} progress={progress} />;
  }
};

export default AnimationController;