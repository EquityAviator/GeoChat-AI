import React from 'react';
import type { Message } from '../types';
import { UserIcon, BotIcon, GoogleIcon, MapPinIcon } from './Icons';
import MapComponent from './MapComponent';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { role, content, sources, isMap, mapQuery } = message;
  const isUser = role === 'user';

  return (
    <div className={`flex items-start gap-4 p-4 rounded-lg ${isUser ? '' : 'bg-gray-800/50'}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isUser ? 'bg-blue-600' : 'bg-gray-600'}`}>
        {isUser ? <UserIcon /> : <BotIcon />}
      </div>
      <div className="flex-1 pt-1 overflow-hidden">
        <p className="text-gray-200 whitespace-pre-wrap leading-relaxed">{content}</p>
        
        {isMap && mapQuery && <MapComponent query={mapQuery} />}

        {sources && sources.length > 0 && (
          <div className="mt-4 pt-3 border-t border-gray-700">
            <h4 className="text-sm font-semibold text-gray-400 mb-2">Sources:</h4>
            <div className="flex flex-wrap gap-2">
              {sources.map((source, index) => (
                <a
                  key={index}
                  href={source.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs bg-gray-700 hover:bg-gray-600 text-blue-300 px-3 py-1 rounded-full transition-colors truncate"
                  title={source.title}
                >
                  {source.type === 'web' ? <GoogleIcon /> : <MapPinIcon />}
                  <span className="truncate">{source.title || new URL(source.uri).hostname}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
