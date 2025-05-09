import React, { useState, useEffect, useRef } from 'react';
import { Exercise, ExerciseStep } from '../types';
import AnimationController from './animations/AnimationController';
import { ArrowLeft, PlayCircle, Volume2, VolumeX } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ExerciseControllerProps {
  exercise: Exercise;
}

const ExerciseController: React.FC<ExerciseControllerProps> = ({ exercise }) => {
  const [isStarted, setIsStarted] = useState(false);
  const [currentCycle, setCurrentCycle] = useState(1);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  
  const currentStep = exercise.steps[currentStepIndex];
  const animationState = currentStep?.type || 'rest';
  
  // Audio elements Lololololllll
  const inhaleAudioRef = useRef<HTMLAudioElement | null>(null);
  const exhaleAudioRef = useRef<HTMLAudioElement | null>(null);
  const holdAudioRef = useRef<HTMLAudioElement | null>(null);
  
  // Timer reference
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  
  // Initialize the exercise
  const initializeExercise = () => {
    setCurrentCycle(1);
    setCurrentStepIndex(0);
    setProgress(0);
    
    if (exercise.steps.length > 0) {
      setTimeLeft(exercise.steps[0].duration);
      startTimeRef.current = Date.now();
    }
  };
  
  // Start the exercise
  const startExercise = () => {
    setIsStarted(true);
    initializeExercise();
  };
  
  // Toggle audio mute
  const toggleMute = () => {
    setIsMuted(!isMuted);
    
    [inhaleAudioRef.current, exhaleAudioRef.current, holdAudioRef.current].forEach(audio => {
      if (audio) {
        audio.muted = !isMuted;
      }
    });
  };
  
  // Play audio for current step
  const playStepAudio = (step: ExerciseStep) => {
    if (isMuted) return;
    
    let audioElement = null;
    
    if (step.type === 'inhale' && inhaleAudioRef.current) {
      audioElement = inhaleAudioRef.current;
    } else if (step.type === 'exhale' && exhaleAudioRef.current) {
      audioElement = exhaleAudioRef.current;
    } else if (step.type === 'hold' && holdAudioRef.current) {
      audioElement = holdAudioRef.current;
    }
    
    if (audioElement) {
      audioElement.currentTime = 0;
      audioElement.play().catch(console.error);
    }
  };
  
  // Move to next step
  const nextStep = () => {
    if (currentStepIndex < exercise.steps.length - 1) {
      const nextStep = exercise.steps[currentStepIndex + 1];
      setCurrentStepIndex(prev => prev + 1);
      setTimeLeft(nextStep.duration);
      setProgress(0);
      startTimeRef.current = Date.now();
      playStepAudio(nextStep);
    } else if (currentCycle < exercise.cycles || exercise.cycles === Infinity) {
      const firstStep = exercise.steps[0];
      setCurrentCycle(prev => prev + 1);
      setCurrentStepIndex(0);
      setTimeLeft(firstStep.duration);
      setProgress(0);
      startTimeRef.current = Date.now();
      playStepAudio(firstStep);
    } else {
      setIsStarted(false);
    }
  };
  
  // Main exercise timer
  useEffect(() => {
    if (!isStarted) return;
    
    // Play audio for initial step
    if (currentStep) {
      playStepAudio(currentStep);
    }
    
    const updateTimer = () => {
      const elapsedTime = (Date.now() - startTimeRef.current) / 1000;
      const newTimeLeft = Math.max(0, currentStep.duration - elapsedTime);
      const newProgress = Math.min(1, elapsedTime / currentStep.duration);
      
      setTimeLeft(newTimeLeft);
      setProgress(newProgress);
      
      if (newTimeLeft <= 0) {
        nextStep();
      }
    };
    
    timerRef.current = window.setInterval(updateTimer, 50);
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isStarted, currentStep, currentStepIndex]);
  
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center px-4">
      {/* Hidden audio elements */}
      <audio 
        ref={inhaleAudioRef} 
        preload="auto"
        muted={isMuted}
      >
        <source src="/audio/inhale.mp3" type="audio/mpeg" />
      </audio>
      <audio 
        ref={exhaleAudioRef}
        preload="auto"
        muted={isMuted}
      >
        <source src="/audio/exhale.mp3" type="audio/mpeg" />
      </audio>
      <audio 
        ref={holdAudioRef}
        preload="auto"
        muted={isMuted}
      >
        <source src="/audio/hold.mp3" type="audio/mpeg" />
      </audio>
      
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-8">
        <Link to="/" className="flex items-center text-emerald-600 hover:text-emerald-700 transition-colors">
          <ArrowLeft className="h-5 w-5 mr-1" />
          <span>Back</span>
        </Link>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={toggleMute}
            className="p-2 rounded-full hover:bg-emerald-50 transition-colors"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX className="h-5 w-5 text-gray-500" />
            ) : (
              <Volume2 className="h-5 w-5 text-emerald-600" />
            )}
          </button>
        </div>
      </div>
      
      {/* Exercise Information */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-emerald-800 mb-2 font-japanese">{exercise.title}</h1>
        <p className="text-gray-600 mb-4">{exercise.info}</p>
      </div>
      
      {!isStarted ? (
        <div className="text-center space-y-6">
          <div className="bg-emerald-50 rounded-lg p-6 shadow-inner">
            <h2 className="text-xl font-semibold text-emerald-700 mb-4">Instructions</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">{exercise.instructions}</p>
            <div className="text-sm text-gray-500">
              <p>Duration: {exercise.steps.reduce((acc, step) => acc + step.duration, 0)} seconds per cycle</p>
              <p>Cycles: {exercise.cycles === Infinity ? "∞" : exercise.cycles}</p>
            </div>
          </div>
          
          <button
            onClick={startExercise}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 inline-flex items-center"
          >
            <PlayCircle className="h-5 w-5 mr-2" />
            Start Exercise
          </button>
        </div>
      ) : (
        <div className="w-full space-y-6">
          {/* Animation area */}
          <div className="mx-auto w-full max-w-sm h-64 relative">
            <AnimationController 
              type={exercise.animationType} 
              animationState={animationState} 
              progress={progress} 
            />
          </div>
          
          {/* Instructions */}
          <div className="bg-emerald-50 rounded-lg p-6 text-center shadow-inner">
            <h2 className="font-semibold text-xl text-emerald-700 mb-2">
              {currentStep.type.charAt(0).toUpperCase() + currentStep.type.slice(1)}
              {currentStep.instruction ? `: ${currentStep.instruction}` : ''}
            </h2>
            <div className="flex items-center justify-center space-x-2 text-emerald-600 mt-2">
              <span className="text-lg">{Math.ceil(timeLeft)} seconds</span>
            </div>
          </div>
          
          {/* Progress indicators */}
          <div className="w-full flex flex-col space-y-3">
            {/* Step progress */}
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-emerald-600 h-2.5 rounded-full transition-all duration-100" 
                style={{ width: `${progress * 100}%` }}
              ></div>
            </div>
            
            {/* Cycle indicator */}
            <div className="text-sm text-gray-600 flex justify-between">
              <span>Cycle {currentCycle} of {exercise.cycles === Infinity ? "∞" : exercise.cycles}</span>
              <span>Step {currentStepIndex + 1} of {exercise.steps.length}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExerciseController;
