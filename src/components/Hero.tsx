import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <div className="text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Welcome to ProAI Launchpad
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Build amazing AI-powered applications with ease
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/login"
            className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
          >
            Get Started
          </a>
          <a
            href="#features"
            className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
