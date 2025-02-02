import React from 'react';
import { MessageSquare, Clock, BarChart } from 'lucide-react';
import { ChatStats } from '../types';

interface Props {
  stats: ChatStats;
  onNewChat: () => void;
  theme?: 'light' | 'dark';
}

export const WelcomeScreen: React.FC<Props> = ({ stats, onNewChat, theme = 'dark' }) => {
  const isLight = theme === 'light';

  return (
    <div
      className={`h-full flex flex-col items-center justify-center ${
        isLight ? 'bg-white' : 'bg-gray-900'
      }`}
      style={!isLight ? { backgroundColor: 'rgb(17 24 39 / var(--tw-bg-opacity))' } : {}}
    >
      {/* Welcome Message */}
      <h1
        className={`text-5xl font-bold mb-6 text-center ${
          isLight ? 'text-gray-900' : 'text-white'
        } animate-fade-in`}
      >
        Welcome to{' '}
        <span
          className={`bg-gradient-to-r ${
            isLight ? 'from-blue-600 to-purple-600' : 'from-blue-400 to-purple-400'
          } text-transparent bg-clip-text`}
        >
          Deepseek R1
        </span>
      </h1>

      {/* Stats Section */}
      

      {/* Start New Chat Button */}
      <button
        onClick={onNewChat}
        className={`bg-gradient-to-r ${
          isLight ? 'from-blue-600 to-purple-600' : 'from-blue-500 to-purple-500'
        } text-white rounded-xl px-8 py-4 flex items-center gap-3 hover:from-blue-700 hover:to-purple-700 transition-all duration-500 hover:scale-105 transform hover:shadow-2xl animate-bounce-horizontal`}
      >
        <MessageSquare size={24} />
        <span className="text-lg">Start New Chat</span>
      </button>
    </div>
  );
};