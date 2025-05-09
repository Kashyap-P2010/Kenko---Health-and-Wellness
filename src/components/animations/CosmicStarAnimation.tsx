import React, { useEffect, useRef } from 'react';
import { AnimationProps } from '../../types';

const CosmicStarAnimation: React.FC<AnimationProps> = ({ animationState, progress }) => {
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
    
    // Calculate size based on breathing state
    let baseSize = Math.min(canvas.width, canvas.height) * 0.2;
    let actualSize = baseSize;
    let opacity = 0.7;
    
    if (animationState === 'inhale') {
      actualSize = baseSize + (baseSize * progress);
      opacity = 0.5 + (progress * 0.4);
    } else if (animationState === 'exhale') {
      actualSize = baseSize + (baseSize * (1 - progress));
      opacity = 0.9 - (progress * 0.4);
    } else if (animationState === 'hold') {
      actualSize = baseSize * 2;
      opacity = 0.9;
    } else if (animationState === 'rest') {
      actualSize = baseSize;
      opacity = 0.5;
    }
    
    // Draw cosmic star
    const numberOfPoints = 5;
    const outerRadius = actualSize;
    const innerRadius = actualSize * 0.4;
    const rotationOffset = Math.PI / 2;
    
    ctx.save();
    
    // Star glow
    const glowGradient = ctx.createRadialGradient(centerX, centerY, innerRadius, centerX, centerY, outerRadius * 1.5);
    glowGradient.addColorStop(0, `rgba(59, 130, 246, ${opacity})`); // Blue
    glowGradient.addColorStop(0.6, `rgba(124, 58, 237, ${opacity * 0.7})`); // Purple
    glowGradient.addColorStop(1, `rgba(124, 58, 237, 0)`);
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, outerRadius * 1.5, 0, Math.PI * 2);
    ctx.fillStyle = glowGradient;
    ctx.fill();
    
    // Draw star shape
    ctx.beginPath();
    for (let i = 0; i < numberOfPoints * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i * Math.PI / numberOfPoints) - rotationOffset;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
    
    // Fill the star with gradient
    const starGradient = ctx.createRadialGradient(centerX, centerY, innerRadius, centerX, centerY, outerRadius);
    starGradient.addColorStop(0, `rgba(59, 130, 246, ${opacity})`); // Blue
    starGradient.addColorStop(1, `rgba(124, 58, 237, ${opacity})`); // Purple
    
    ctx.fillStyle = starGradient;
    ctx.fill();
    
    // Add central glow
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius * 1.2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.5})`;
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

export default CosmicStarAnimation;