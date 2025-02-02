import React from 'react';
import { MessageSquare } from 'lucide-react';
import { ChatStats } from '../types';

interface Props {
  stats: ChatStats;
  onNewChat: () => void;
  theme?: 'light' | 'dark';
  isButtonVisible: boolean;
  setIsButtonVisible: (visible: boolean) => void;
}

export const WelcomeScreen: React.FC<Props> = ({ 
  stats, 
  onNewChat, 
  theme = 'dark', 
  isButtonVisible, 
  setIsButtonVisible 
}) => {
  const isLight = theme === 'light';

  const handleNewChat = () => {
    setIsButtonVisible(false);
    onNewChat();
  };

  return (
    <div className={`h-full flex flex-col items-center justify-center ${
      isLight ? 'bg-white' : 'bg-gray-900'
    }`}>
      <h1 className={`text-5xl font-bold mb-6 text-center ${
        isLight ? 'text-gray-900' : 'text-white'
      } animate-fade-in`}>
        Welcome to{' '}
        <span className={`bg-gradient-to-r ${
          isLight ? 'from-blue-600 to-purple-600' : 'from-blue-400 to-purple-400'
        } text-transparent bg-clip-text`}>
          Deepseek R1
        </span>
      </h1>

      {isButtonVisible && (
        <button
          onClick={handleNewChat}
          className={`bg-gradient-to-r ${
            isLight ? 'from-blue-600 to-purple-600' : 'from-blue-500 to-purple-500'
          } text-white rounded-xl px-8 py-4 flex items-center gap-3 hover:from-blue-700 hover:to-purple-700 transition-all duration-500 hover:scale-105 transform hover:shadow-2xl`}
        >
          <MessageSquare size={24} />
          <span className="text-lg">Start New Chat</span>
        </button>
      )}
    </div>
  );
};
