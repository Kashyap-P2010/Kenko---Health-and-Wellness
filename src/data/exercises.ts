import { Exercise } from '../types';

export const exercises: Exercise[] = [
  {
    id: 'morning',
    title: 'Morning Breathing',
    info: 'Helps reset circadian rhythm.',
    instructions: 'Think of a soothing place (e.g., a beautiful park). Take 5 fast, long breaths, followed by 5 normal breaths. Repeat the cycle, gradually increasing to 10 long breaths. Do this 3 times.',
    animationType: 'fluidBall',
    type: 'morning',
    cycles: 3,
    steps: [
      { type: 'inhale', duration: 4 },
      { type: 'exhale', duration: 4 },
    ]
  },
  {
    id: 'afternoon',
    title: 'Afternoon Energy',
    info: 'Mid-day energy boost!',
    instructions: 'Sit comfortably with your spine straight and feet flat. Take two short inhales through your nose, then exhale slowly through pursed lips. This helps bring fresh oxygen to the brain and boosts energy levels. Repeat 3 times.',
    animationType: 'cosmicStar',
    type: 'afternoon',
    cycles: 3,
    steps: [
      { type: 'inhale', duration: 2, instruction: 'Short inhale' },
      { type: 'inhale', duration: 2, instruction: 'Short inhale again' },
      { type: 'exhale', duration: 4, instruction: 'Slow exhale' },
    ]
  },
  {
    id: 'night',
    title: 'Night Relaxation',
    info: 'Helps you fall asleep easily.',
    instructions: 'Lay comfortably on your back, arms by your sides with palms open. Breathe in for 4 seconds, hold for 4, and exhale for 4. This helps calm the mind. Repeat 3 times.',
    animationType: 'dayNightCycle',
    type: 'night',
    cycles: 3,
    steps: [
      { type: 'inhale', duration: 4 },
      { type: 'hold', duration: 4 },
      { type: 'exhale', duration: 4 },
    ]
  },
  {
    id: 'hypertension',
    title: 'Hypertension Relief',
    info: 'Lower your blood pressure in 3 minutes!',
    instructions: 'Stand up straight with your legs slightly apart. Slowly swing your arms and hips, gradually increasing speed. When you feel slightly tired, stop and rest for 5 seconds. Repeat 3 times.',
    animationType: 'spiral',
    type: 'hypertension',
    cycles: 3,
    steps: [
      { type: 'inhale', duration: 3 },
      { type: 'exhale', duration: 3 },
      { type: 'rest', duration: 5, instruction: 'Rest briefly' },
    ]
  },
  {
    id: 'stress',
    title: 'Stress Relief',
    info: 'Relieve stress easily.',
    instructions: 'Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds. Repeat this cycle 3 times.',
    animationType: 'waterCircle',
    type: 'stress',
    cycles: 3,
    steps: [
      { type: 'inhale', duration: 4 },
      { type: 'hold', duration: 7 },
      { type: 'exhale', duration: 8 },
    ]
  },
  {
    id: 'anxiety',
    title: 'Anxiety Reducer',
    info: 'Reduce anxiety.',
    instructions: 'Take a full inhale, then exhale with a vocal sigh or hum (HMMMMMMM).',
    animationType: 'vocalWave',
    type: 'anxiety',
    cycles: 3,
    steps: [
      { type: 'inhale', duration: 4 },
      { type: 'exhale', duration: 6, instruction: 'Exhale with a humming sound' },
    ]
  },
  {
    id: 'timer',
    title: 'Breathing Timer',
    info: 'Breathing Timer.',
    instructions: 'Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds. Repeat infinitely.',
    animationType: 'timer',
    type: 'timer',
    cycles: Infinity,
    steps: [
      { type: 'inhale', duration: 4 },
      { type: 'hold', duration: 7 },
      { type: 'exhale', duration: 8 },
    ]
  },
];

export const getExerciseById = (id: string): Exercise | undefined => {
  return exercises.find(exercise => exercise.id === id);
};