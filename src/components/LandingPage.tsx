import React from 'react';
import { MessageSquare, Zap, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Navbar */}
      <nav className="container mx-auto px-6 py-6 flex justify-between items-center flex-wrap">
  <div className="flex items-center space-x-3">
    <MessageSquare className="text-blue-400 animate-float" size={32} />
    <span className="text-white text-2xl sm:text-3xl font-bold font-sans">Deepseek AI Chat</span>
  </div>
  
  {/* Button Container */}
  <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 gap-2 sm:gap-6 mt-4 sm:mt-0">
    <Link
      to="/signin"
      className="text-white hover:text-blue-400 transition-colors duration-300 text-lg"
    >
      Sign In
    </Link>
    <Link
      to="/signup"
      className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-500 hover:shadow-xl"
    >
      Sign Up
    </Link>
  </div>
</nav>


      {/* Hero Section */}
      <main className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 animate-fade-in">
          Experience the Future of{' '}
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Conversation
          </span>
        </h1>
        <p className="text-lg sm:text-2xl text-gray-300 max-w-2xl mx-auto mb-8 animate-fade-in-up">
          Experience the power of Deepseek R1 — our most advanced model — designed for insightful conversations, innovative problem-solving, and seamless creative collaboration.
        </p>
        <Link
          to="/signup"
          className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-500 text-lg sm:text-xl hover:scale-105 transform hover:shadow-xl"
        >
          Get Started <ArrowRight className="ml-3 sm:ml-4 animate-bounce-horizontal" size={20} sm:size={24} />
        </Link>
      </main>

      {/* Features Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-6 pb-20">
        {[
          {
            icon: <MessageSquare className="text-blue-400" size={28} />, 
            title: 'Natural Conversations',
            description: 'Experience fluid, context-aware conversations that feel natural and engaging.'
          },
          {
            icon: <Zap className="text-purple-400" size={28} />, 
            title: 'Lightning Fast',
            description: 'Get instant responses powered by state-of-the-art AI technology.'
          },
          {
            icon: <Shield className="text-green-400" size={28} />, 
            title: 'Secure & Private',
            description: 'Your conversations are protected with enterprise-grade security.'
          }
        ].map((feature, index) => (
          <div key={index} className="bg-gradient-to-br from-gray-800 to-gray-850 p-6 sm:p-8 rounded-xl transform hover:scale-105 transition-all duration-500 hover:shadow-xl">
            <div className="bg-gradient-to-r from-white/10 to-white/20 w-14 h-14 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2 sm:mb-4">
              {feature.title}
            </h3>
            <p className="text-gray-400 text-base sm:text-lg">
              {feature.description}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};
