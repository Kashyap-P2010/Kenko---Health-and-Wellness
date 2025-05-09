import React, { useEffect, useRef } from 'react';
import { AnimationProps } from '../../types';

const TimerAnimation: React.FC<AnimationProps> = ({ animationState, progress }) => {
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
    
    // Draw timer background
    ctx.save();
    
    // Main circle background
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(229, 231, 235, 0.5)'; // Light gray
    ctx.fill();
    
    // Draw progress arc
    const startAngle = -Math.PI / 2; // Start from top
    let endAngle = startAngle + (Math.PI * 2 * progress);
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.lineTo(centerX, centerY);
    ctx.closePath();
    
    // Set colors based on breathing state
    let fillColor;
    if (animationState === 'inhale') {
      fillColor = 'rgba(59, 130, 246, 0.6)'; // Blue
    } else if (animationState === 'hold') {
      fillColor = 'rgba(139, 92, 246, 0.6)'; // Purple
    } else if (animationState === 'exhale') {
      fillColor = 'rgba(52, 211, 153, 0.6)'; // Green
    } else {
      fillColor = 'rgba(156, 163, 175, 0.6)'; // Gray
    }
    
    ctx.fillStyle = fillColor;
    ctx.fill();
    
    // Draw inner circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.7, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    
    // Add text to indicate the current state
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 24px sans-serif';
    
    // Capitalize first letter
    const displayText = animationState.charAt(0).toUpperCase() + animationState.slice(1);
    
    ctx.fillStyle = fillColor.replace('0.6', '1');
    ctx.fillText(displayText, centerX, centerY - 15);
    
    // Add progress percentage
    ctx.font = '16px sans-serif';
    ctx.fillStyle = 'rgba(75, 85, 99, 0.8)';
    ctx.fillText(`${Math.round(progress * 100)}%`, centerX, centerY + 15);
    
    // Draw pulsing circle to indicate timing
    const pulseSize = 5 + (Math.sin(Date.now() * 0.01) + 1) * 3;
    ctx.beginPath();
    ctx.arc(centerX, centerY - 45, pulseSize, 0, Math.PI * 2);
    ctx.fillStyle = fillColor;
    ctx.fill();
    
    // Add subtle ticks around the timer
    ctx.strokeStyle = 'rgba(156, 163, 175, 0.4)';
    ctx.lineWidth = 1;
    
    for (let i = 0; i < 12; i++) {
      const angle = i * (Math.PI / 6);
      const innerRadius = radius * 0.9;
      const outerRadius = radius;
      
      const startX = centerX + Math.cos(angle) * innerRadius;
      const startY = centerY + Math.sin(angle) * innerRadius;
      const endX = centerX + Math.cos(angle) * outerRadius;
      const endY = centerY + Math.sin(angle) * outerRadius;
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
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

export default TimerAnimation;