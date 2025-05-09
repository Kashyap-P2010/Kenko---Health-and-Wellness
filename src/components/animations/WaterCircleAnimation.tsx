import React, { useEffect, useRef } from 'react';
import { AnimationProps } from '../../types';

const WaterCircleAnimation: React.FC<AnimationProps> = ({ animationState, progress }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) * 0.4;
    
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Calculate water level based on breathing state
    let waterLevel = 0; // 0 to 1, where 1 is full
    
    if (animationState === 'inhale') {
      waterLevel = progress;
    } else if (animationState === 'exhale') {
      waterLevel = 1 - progress;
    } else if (animationState === 'hold') {
      waterLevel = 1;
    } else if (animationState === 'rest') {
      waterLevel = 0;
    }
    
    // Draw container (circle)
    ctx.save();
    
    // Container outline
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(75, 85, 99, 0.4)';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Glass effect
    const glassGradient = ctx.createLinearGradient(
      centerX - radius, centerY - radius,
      centerX + radius, centerY + radius
    );
    glassGradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
    glassGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.05)');
    glassGradient.addColorStop(1, 'rgba(255, 255, 255, 0.15)');
    
    ctx.fillStyle = glassGradient;
    ctx.fill();
    
    // Calculate water fill area
    const waterY = centerY + radius - (2 * radius * waterLevel);
    
    // Create clipping region for water
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - 2, 0, Math.PI * 2);
    ctx.clip();
    
    // Draw water
    const waterGradient = ctx.createLinearGradient(centerX, waterY - 20, centerX, centerY + radius);
    waterGradient.addColorStop(0, 'rgba(56, 189, 248, 0.7)'); // Light blue
    waterGradient.addColorStop(1, 'rgba(3, 105, 161, 0.7)'); // Dark blue
    
    ctx.fillStyle = waterGradient;
    ctx.fillRect(centerX - radius, waterY, radius * 2, centerY + radius - waterY);
    
    // Add wave effect on top of water
    ctx.beginPath();
    
    const waveAmplitude = 5;
    const waveFrequency = 0.1;
    const waveSpeed = Date.now() * 0.003;
    
    ctx.moveTo(centerX - radius, waterY);
    
    for (let x = centerX - radius; x <= centerX + radius; x += 5) {
      const y = waterY + Math.sin((x * waveFrequency) + waveSpeed) * waveAmplitude;
      ctx.lineTo(x, y);
    }
    
    ctx.lineTo(centerX + radius, centerY + radius);
    ctx.lineTo(centerX - radius, centerY + radius);
    ctx.closePath();
    
    ctx.fillStyle = 'rgba(125, 211, 252, 0.5)'; // Lighter blue for wave
    ctx.fill();
    
    // Add highlights on water surface
    ctx.beginPath();
    for (let x = centerX - radius + 10; x <= centerX + radius - 10; x += 40) {
      const y = waterY + Math.sin((x * waveFrequency) + waveSpeed) * waveAmplitude;
      ctx.moveTo(x, y);
      ctx.arc(x, y - 2, 3, 0, Math.PI * 2);
    }
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
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

export default WaterCircleAnimation;