import React, { useEffect, useRef } from 'react';
import { AnimationProps } from '../../types';

const SpiralAnimation: React.FC<AnimationProps> = ({ animationState, progress }) => {
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
    
    // Calculate spiral parameters based on breathing state
    let radiusMultiplier = 0.8;
    let rotations = 2;
    let lineWidth = 6;
    
    if (animationState === 'inhale') {
      radiusMultiplier = 0.5 + (progress * 0.5);
      rotations = 1 + (progress * 2);
      lineWidth = 3 + (progress * 6);
    } else if (animationState === 'exhale') {
      radiusMultiplier = 1 - (progress * 0.3);
      rotations = 3 - (progress * 1.5);
      lineWidth = 9 - (progress * 5);
    } else if (animationState === 'hold') {
      radiusMultiplier = 1;
      rotations = 3;
      lineWidth = 9;
    } else if (animationState === 'rest') {
      radiusMultiplier = 0.7;
      rotations = 1.5;
      lineWidth = 5;
    }
    
    const spiralRadius = Math.min(canvas.width, canvas.height) / 2 * radiusMultiplier;
    
    // Create spiral
    ctx.save();
    
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    
    // Create a gradient for the spiral
    const gradient = ctx.createLinearGradient(
      centerX - spiralRadius, centerY - spiralRadius,
      centerX + spiralRadius, centerY + spiralRadius
    );
    gradient.addColorStop(0, 'rgba(52, 211, 153, 0.8)'); // Green
    gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.8)'); // Blue
    gradient.addColorStop(1, 'rgba(167, 139, 250, 0.8)'); // Purple
    
    ctx.strokeStyle = gradient;
    
    // Draw spiral
    ctx.beginPath();
    
    const numPoints = 150;
    const angleStep = Math.PI * 2 * rotations / numPoints;
    const growthFactor = spiralRadius / numPoints;
    
    let prevX = centerX, prevY = centerY;
    
    for (let i = 0; i <= numPoints; i++) {
      const angle = i * angleStep;
      const radius = i * growthFactor;
      
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        // Control points for smooth curve
        const cpx1 = prevX + (x - prevX) / 2;
        const cpy1 = prevY + (y - prevY) / 2;
        
        ctx.quadraticCurveTo(cpx1, cpy1, x, y);
      }
      
      prevX = x;
      prevY = y;
    }
    
    ctx.stroke();
    
    // Add a glowing effect
    ctx.shadowColor = 'rgba(52, 211, 153, 0.5)';
    ctx.shadowBlur = 10;
    ctx.stroke();
    
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

export default SpiralAnimation;