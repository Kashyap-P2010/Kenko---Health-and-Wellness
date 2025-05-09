import React from 'react';
import { Leaf, Wind, Heart, BrainCircuit } from 'lucide-react';
import ExerciseCard from '../components/ExerciseCard';
import { exercises } from '../data/exercises';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-4 relative overflow-hidden bg-gradient-to-br from-emerald-50 to-emerald-100">
        <div className="absolute inset-0 overflow-hidden z-0">
          <svg className="absolute right-0 top-0 h-full w-1/2 text-emerald-100 opacity-50 transform translate-x-1/3" viewBox="0 0 100 100" preserveAspectRatio="none">
            <circle cx="50" cy="50" r="40" fill="currentColor" fillOpacity="0.5" />
            <circle cx="75" cy="30" r="20" fill="currentColor" fillOpacity="0.3" />
          </svg>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-emerald-900 mb-4 font-japanese">
              健康 <span className="font-normal">Kenko</span>
            </h1>
            <p className="text-lg md:text-xl text-emerald-800 mb-8 leading-relaxed">
              Discover the ancient Japanese art of breathing techniques for health, wellness, and inner peace. Transform your daily routine with simple exercises for any time of day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#exercises" 
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 inline-flex items-center justify-center"
              >
                <Wind className="h-5 w-5 mr-2" />
                Start Breathing
              </a>
              <a 
                href="#about" 
                className="bg-white hover:bg-emerald-50 text-emerald-600 border border-emerald-200 px-6 py-3 rounded-lg shadow-sm hover:shadow transition-all inline-flex items-center justify-center"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-16 md:py-24 bg-white px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-emerald-800 mb-4 font-japanese">The Kenko Philosophy</h2>
            <p className="text-gray-600 mb-8">
              Inspired by traditional Japanese wellness practices, Kenko combines ancient wisdom with modern science to bring you breathing exercises designed for your modern lifestyle.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-emerald-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <BrainCircuit className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-emerald-800 mb-2">Mind-Body Connection</h3>
              <p className="text-gray-600">
                Our exercises strengthen the connection between your mind and body, improving overall mental clarity and physical health.
              </p>
            </div>
            
            <div className="bg-emerald-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-emerald-800 mb-2">Heart Health</h3>
              <p className="text-gray-600">
                Regular breathing exercises can lower blood pressure, reduce stress on your heart, and improve cardiovascular health.
              </p>
            </div>
            
            <div className="bg-emerald-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <Leaf className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-emerald-800 mb-2">Natural Balance</h3>
              <p className="text-gray-600">
                Our approach helps restore your body's natural rhythms, promoting better sleep, digestion, and energy levels.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Exercises Section */}
      <section id="exercises" className="py-16 md:py-24 bg-emerald-50 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-emerald-800 mb-4 font-japanese">Breathing Exercises</h2>
            <p className="text-gray-600">
              Choose from our collection of therapeutic breathing exercises, each designed for specific times of day and wellness goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {exercises.map(exercise => (
              <ExerciseCard key={exercise.id} exercise={exercise} />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-emerald-600 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4 font-japanese">Start Your Wellness Journey Today</h2>
          <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
            Incorporate Kenko breathing exercises into your daily routine and experience the transformative benefits for your mind, body, and spirit.
          </p>
          <a 
            href="#exercises" 
            className="bg-white hover:bg-emerald-50 text-emerald-600 px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 inline-flex items-center"
          >
            <Wind className="h-5 w-5 mr-2" />
            Begin Your Practice
          </a>
        </div>
      </section>
    </div>
  );
};

export default HomePage;