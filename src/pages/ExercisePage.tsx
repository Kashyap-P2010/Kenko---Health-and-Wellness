import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getExerciseById } from '../data/exercises';
import ExerciseController from '../components/ExerciseController';

const ExercisePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const exercise = id ? getExerciseById(id) : undefined;
  
  if (!exercise) {
    return <Navigate to="/" />;
  }
  
  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="container mx-auto px-4">
        <ExerciseController exercise={exercise} />
      </div>
    </div>
  );
};

export default ExercisePage;