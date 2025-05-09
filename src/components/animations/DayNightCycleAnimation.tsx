import React, { useEffect, useRef } from 'react';
import { AnimationProps } from '../../types';

const DayNightCycleAnimation: React.FC<AnimationProps> = ({ animationState, progress }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) * 0.3;
    
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Calculate color transition based on breathing state
    // Inhale transitions to white (day), exhale transitions to black (night)
    let r, g, b;
    
    if (animationState === 'inhale') {
      // Transition from gray to white
      r = g = b = 150 + (105 * progress);
    } else if (animationState === 'exhale') {
      // Transition from white to dark
      r = g = b = 255 - (205 * progress);
    } else if (animationState === 'hold') {
      // White (fully bright)
      r = g = b = 255;
    } else {
      // Gray at rest
      r = g = b = 150;
    }
    
    // Create the background night/day gradient
    const bgGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, canvas.width);
    
    if (animationState === 'inhale') {
      // Day sky (blue to light blue)
      bgGradient.addColorStop(0, `rgba(59, 130, 246, ${0.3 + progress * 0.4})`);
      bgGradient.addColorStop(1, `rgba(186, 230, 253, ${0.2 + progress * 0.3})`);
    } else if (animationState === 'exhale') {
      // Night sky (dark blue to deep purple)
      bgGradient.addColorStop(0, `rgba(30, 58, 138, ${0.3 + progress * 0.4})`);
      bgGradient.addColorStop(1, `rgba(91, 33, 182, ${0.2 + progress * 0.3})`);
    } else if (animationState === 'hold') {
      // Bright day sky
      bgGradient.addColorStop(0, 'rgba(59, 130, 246, 0.7)');
      bgGradient.addColorStop(1, 'rgba(186, 230, 253, 0.5)');
    } else {
      // Neutral sky
      bgGradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
      bgGradient.addColorStop(1, 'rgba(186, 230, 253, 0.2)');
    }
    
    // Draw background
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw the orb (sun/moon)
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    
    // Add a radial gradient to the orb
    const orbGradient = ctx.createRadialGradient(
      centerX - radius * 0.2, centerY - radius * 0.2, 
      radius * 0.1, 
      centerX, centerY, 
      radius
    );
    
    if (animationState === 'inhale' || animationState === 'hold') {
      // Sun
      orbGradient.addColorStop(0, 'rgba(255, 255, 200, 1)');
      orbGradient.addColorStop(1, `rgba(${r}, ${g}, 50, 0.9)`);
    } else {
      // Moon
      orbGradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      orbGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0.7)`);
    }
    
    ctx.fillStyle = orbGradient;
    ctx.fill();
    
    // Add a glow effect
    ctx.shadowColor = animationState === 'inhale' || animationState === 'hold' 
      ? 'rgba(255, 255, 200, 0.8)' 
      : 'rgba(255, 255, 255, 0.5)';
    ctx.shadowBlur = 20;
    ctx.fill();
    
  }, [animationState, progress]);
  
  return (
    <canvas 
      ref={canvasRef} 
      width={300} 
      height={300}
      className="max-w-full mx-auto"
    />
  );
};

export default DayNightCycleAnimation;