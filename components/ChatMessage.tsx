import React, { useState } from 'react';
import type { Message } from '../types';
import { UserIcon, BotIcon, GoogleIcon, MapPinIcon, ThumbsUpIcon, ThumbsDownIcon, WifiOffIcon } from './Icons';
import MapComponent from './MapComponent';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { role, content, sources, isMap, mapQuery } = message;
  const isUser = role === 'user';
  const isOnline = useOnlineStatus();
  const [feedback, setFeedback] = useState<'like' | 'dislike' | null>(null);

  const OfflineMapMessage = () => (
    <div className="mt-4 p-4 border border-yellow-700 bg-yellow-900/50 text-yellow-300 rounded-lg flex items-center gap-3">
      <WifiOffIcon />
      <div>
        <h4 className="font-bold">You are offline</h4>
        <p className="text-sm">Please check your internet connection to view the map.</p>
      </div>
    </div>
  );

  return (
    <div className={`flex items-start gap-4 p-4 rounded-lg ${isUser ? '' : 'bg-gray-800/50'}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isUser ? 'bg-blue-600' : 'bg-gray-600'}`}>
        {isUser ? <UserIcon /> : <BotIcon />}
      </div>
      <div className="flex-1 pt-1 overflow-hidden">
        <p className="text-gray-200 whitespace-pre-wrap leading-relaxed">{content}</p>
        
        {isMap && mapQuery && (
          isOnline ? <MapComponent query={mapQuery} /> : <OfflineMapMessage />
        )}

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

        {!isUser && content && (
             <div className="mt-4 flex items-center gap-2">
                <button 
                    onClick={() => setFeedback('like')} 
                    disabled={feedback !== null}
                    className={`p-1 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 disabled:opacity-50 disabled:hover:bg-transparent transition-colors ${feedback === 'like' ? 'text-blue-400 bg-gray-700' : ''}`}
                    aria-label="Good response"
                >
                    <ThumbsUpIcon solid={feedback === 'like'} />
                </button>
                <button 
                    onClick={() => setFeedback('dislike')} 
                    disabled={feedback !== null}
                    className={`p-1 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 disabled:opacity-50 disabled:hover:bg-transparent transition-colors ${feedback === 'dislike' ? 'text-red-400 bg-gray-700' : ''}`}
                    aria-label="Bad response"
                >
                    <ThumbsDownIcon solid={feedback === 'dislike'} />
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
