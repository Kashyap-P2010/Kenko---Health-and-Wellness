import React from 'react';
import { Leaf } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isHomePage ? 'bg-transparent' : 'bg-emerald-50/90 backdrop-blur-sm shadow-sm'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-emerald-800 transition-all hover:text-emerald-600"
          >
            <Leaf className="h-6 w-6" />
            <span className="font-japanese text-xl font-medium">健康 Kenko</span>
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`px-3 py-2 text-sm font-medium rounded-md transition-all ${
                isHomePage 
                  ? 'text-emerald-900 hover:text-emerald-700' 
                  : 'text-emerald-800 hover:text-emerald-600'
              }`}
            >
              Home
            </Link>
            <a 
              href="#about" 
              className="px-3 py-2 text-sm font-medium text-emerald-800 rounded-md transition-all hover:text-emerald-600"
            >
              About
            </a>
            <a 
              href="#exercises" 
              className="px-3 py-2 text-sm font-medium text-emerald-800 rounded-md transition-all hover:text-emerald-600"
            >
              Exercises
            </a>
          </div>
          <div className="hidden md:block">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all shadow-sm hover:shadow">
              Start Breathing
            </button>
          </div>
          <div className="md:hidden flex items-center">
            <button className="text-emerald-800 hover:text-emerald-600 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

