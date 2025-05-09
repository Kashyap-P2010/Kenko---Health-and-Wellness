import React, { useEffect, useRef } from 'react';
import { AnimationProps } from '../../types';

const FluidBallAnimation: React.FC<AnimationProps> = ({ animationState, progress }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Define ball size based on breathing state
    let baseRadius = Math.min(canvas.width, canvas.height) * 0.15;
    let actualRadius = baseRadius;
    let color = 'rgba(5, 150, 105, 0.6)'; // Default green
    
    if (animationState === 'inhale') {
      actualRadius = baseRadius + (baseRadius * 0.8 * progress);
      color = 'rgba(5, 150, 105, 0.6)';
    } else if (animationState === 'exhale') {
      actualRadius = baseRadius + (baseRadius * 0.8 * (1 - progress));
      color = 'rgba(5, 150, 105, 0.6)';
    } else if (animationState === 'hold') {
      actualRadius = baseRadius * 1.8;
      color = 'rgba(5, 150, 105, 0.8)';
    } else if (animationState === 'rest') {
      actualRadius = baseRadius;
      color = 'rgba(5, 150, 105, 0.4)';
    }
    
    // Draw fluid ball with glow effect
    ctx.save();
    
    // Outer glow
    const gradient = ctx.createRadialGradient(centerX, centerY, actualRadius * 0.8, centerX, centerY, actualRadius * 1.2);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, 'rgba(5, 150, 105, 0)');
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, actualRadius * 1.1, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Main ball
    ctx.beginPath();
    ctx.arc(centerX, centerY, actualRadius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    
    // Inner highlight
    ctx.beginPath();
    ctx.arc(centerX - (actualRadius * 0.15), centerY - (actualRadius * 0.15), actualRadius * 0.5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.fill();
    
    ctx.restore();
    
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

export default FluidBallAnimation;