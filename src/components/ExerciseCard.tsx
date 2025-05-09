import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Exercise } from '../types';

// Icons for each exercise type
const exerciseIcons = {
  morning: '🌅',
  afternoon: '☀️',
  night: '🌙',
  hypertension: '❤️',
  stress: '🧘',
  anxiety: '🌊',
  timer: '⏱️',
};

interface ExerciseCardProps {
  exercise: Exercise;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise }) => {
  return (
    <Link 
      to={`/exercise/${exercise.id}`}
      className="group relative bg-white overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    >
      <div className="absolute top-4 right-4 text-2xl z-10">
        {exerciseIcons[exercise.type]}
      </div>
      
      <div className="p-6 relative z-10">
        <h3 className="font-japanese text-xl font-semibold text-emerald-800 mb-2 group-hover:text-emerald-600 transition-colors">
          {exercise.title}
        </h3>
        
        <p className="text-gray-600 mb-4 text-sm">{exercise.info}</p>
        
        <div className="flex items-center text-emerald-600 font-medium text-sm">
          <span className="mr-1">Begin exercise</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-emerald-50/30 group-hover:to-emerald-50/60 transition-all duration-300"></div>
      
      {/* Exercise type indicator */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></div>
    </Link>
  );
};

export default ExerciseCard;

