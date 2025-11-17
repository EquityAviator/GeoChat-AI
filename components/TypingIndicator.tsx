import React from 'react';
import { BotIcon } from './Icons';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-start gap-4 p-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-600">
        <BotIcon />
      </div>
      <div className="flex-1 pt-3.5 flex items-center space-x-1.5">
          <div className="w-2.5 h-2.5 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '0ms', animationDuration: '1s'}}></div>
          <div className="w-2.5 h-2.5 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '250ms', animationDuration: '1s' }}></div>
          <div className="w-2.5 h-2.5 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '500ms', animationDuration: '1s' }}></div>
      </div>
    </div>
  );
};

export default TypingIndicator;
