import React, { useEffect, useRef } from 'react';
import { AnimationProps } from '../../types';

const VocalWaveAnimation: React.FC<AnimationProps> = ({ animationState, progress }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) * 0.35;
    
    // Parameters for the animation based on breathing state
    let waveAmplitude = 0;
    let waveFrequency = 0.05;
    let waveOpacity = 0;
    
    if (animationState === 'inhale') {
      waveAmplitude = 2 + (progress * 3);
      waveOpacity = 0.3 + (progress * 0.4);
    } else if (animationState === 'exhale') {
      waveAmplitude = 20 - (progress * 18);
      waveFrequency = 0.1 - (progress * 0.05);
      waveOpacity = 0.8 - (progress * 0.4);
    } else if (animationState === 'hold') {
      waveAmplitude = 5;
      waveOpacity = 0.7;
    } else {
      waveAmplitude = 2;
      waveOpacity = 0.3;
    }
    
    // Draw concentric circles with wave effects
    ctx.save();
    
    // Background glow
    if (animationState === 'exhale') {
      const glowRadius = radius * (1.2 + progress * 0.8);
      const glowGradient = ctx.createRadialGradient(
        centerX, centerY, 0, 
        centerX, centerY, glowRadius
      );
      glowGradient.addColorStop(0, `rgba(232, 121, 249, ${waveOpacity * 0.5})`); // Pink
      glowGradient.addColorStop(0.6, `rgba(167, 139, 250, ${waveOpacity * 0.3})`); // Purple
      glowGradient.addColorStop(1, 'rgba(167, 139, 250, 0)');
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, glowRadius, 0, Math.PI * 2);
      ctx.fillStyle = glowGradient;
      ctx.fill();
    }
    
    // Draw multiple vocal wave circles
    const numCircles = 5;
    const circleSpacing = radius / numCircles;
    
    for (let i = 1; i <= numCircles; i++) {
      const currentRadius = i * circleSpacing;
      const intensity = 1 - (i / numCircles); // Outer circles are less intense
      
      ctx.beginPath();
      
      // Create wavy circle
      const segments = 100;
      const angleStep = (Math.PI * 2) / segments;
      const timeOffset = Date.now() * 0.001; // For animation
      
      for (let j = 0; j <= segments; j++) {
        const angle = j * angleStep;
        
        // Add wave effect
        const waveOffset = Math.sin(angle * 8 + timeOffset) * waveAmplitude * intensity;
        const radiusWithWave = currentRadius + waveOffset;
        
        const x = centerX + Math.cos(angle) * radiusWithWave;
        const y = centerY + Math.sin(angle) * radiusWithWave;
        
        if (j === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.closePath();
      
      // Set varying opacity based on circle and state
      let circleOpacity = waveOpacity * intensity;
      
      if (animationState === 'exhale') {
        // During exhale, make waves more vibrant
        ctx.strokeStyle = `rgba(147, 51, 234, ${circleOpacity * 1.5})`;
        ctx.lineWidth = 2 + (intensity * 2);
      } else {
        ctx.strokeStyle = `rgba(79, 70, 229, ${circleOpacity})`;
        ctx.lineWidth = 1 + intensity;
      }
      
      ctx.stroke();
    }
    
    // Center point with glow during exhale
    if (animationState === 'exhale') {
      ctx.beginPath();
      ctx.arc(centerX, centerY, 10 + (progress * 5), 0, Math.PI * 2);
      const centerGradient = ctx.createRadialGradient(
        centerX, centerY, 0, 
        centerX, centerY, 15 + (progress * 5)
      );
      centerGradient.addColorStop(0, 'rgba(216, 180, 254, 0.9)');
      centerGradient.addColorStop(1, 'rgba(147, 51, 234, 0)');
      
      ctx.fillStyle = centerGradient;
      ctx.fill();
    }
    
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

export default VocalWaveAnimation;