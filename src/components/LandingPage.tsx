import React from 'react';
import { MessageSquare, Zap, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Navbar */}
      <nav className="container mx-auto px-6 py-8 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <MessageSquare className="text-blue-400 animate-float" size={36} />
          <span className="text-white text-3xl font-bold font-sans">Deepseek AI Chat</span>
        </div>
        <div className="space-x-6">
          <Link
            to="/signin"
            className="text-white hover:text-blue-400 transition-colors duration-300 text-lg"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-500 hover:shadow-2xl"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-32">
        <div className="text-center mb-24">
          <h1 className="text-7xl font-bold text-white mb-8 animate-fade-in">
            Experience the Future of{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              Conversation
            </span>
          </h1>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto mb-12 animate-fade-in-up">
            Experience the power of Deepseek R1 — our most advanced model — designed for insightful conversations, innovative problem-solving, and seamless creative collaboration.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center mt-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-12 py-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-500 text-xl hover:scale-105 transform hover:shadow-2xl"
          >
            Get Started <ArrowRight className="ml-4 animate-bounce-horizontal" size={24} />
          </Link>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-gray-800 to-gray-850 p-8 rounded-2xl transform hover:scale-105 transition-all duration-500 hover:shadow-2xl">
            <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
              <MessageSquare className="text-blue-400" size={32} />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              Natural Conversations
            </h3>
            <p className="text-gray-400 text-lg">
              Experience fluid, context-aware conversations that feel natural and
              engaging.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-850 p-8 rounded-2xl transform hover:scale-105 transition-all duration-500 hover:shadow-2xl">
            <div className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
              <Zap className="text-purple-400" size={32} />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              Lightning Fast
            </h3>
            <p className="text-gray-400 text-lg">
              Get instant responses powered by state-of-the-art AI technology.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-850 p-8 rounded-2xl transform hover:scale-105 transition-all duration-500 hover:shadow-2xl">
            <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
              <Shield className="text-green-400" size={32} />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              Secure & Private
            </h3>
            <p className="text-gray-400 text-lg">
              Your conversations are protected with enterprise-grade security.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};