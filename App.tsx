import React, { useState, useEffect, useRef } from 'react';
import { useGeolocation } from './hooks/useGeolocation';
import { getGroundedResponse } from './services/geminiService';
import type { Message } from './types';
import ChatInput from './components/ChatInput';
import ChatMessage from './components/ChatMessage';
import { BotIcon } from './components/Icons';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
      {
          id: 'initial',
          role: 'model',
          content: "Hello! I'm GeoChat AI. I can answer your questions using up-to-date information from Google Search, or provide location-based answers using Google Maps. Try asking me 'What are some good cafes near me?' or 'Who won the latest F1 race?'"
      }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const geolocation = useGeolocation();
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (prompt: string) => {
    setIsLoading(true);
    setError(null);

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: prompt,
    };
    setMessages(prev => [...prev, userMessage]);

    const { latitude, longitude } = geolocation.data || {};
    const location = latitude && longitude ? { latitude, longitude } : null;

    if (geolocation.error) {
        if (prompt.toLowerCase().includes('near me') || prompt.toLowerCase().includes('nearby')) {
             const errorMessage: Message = {
                id: Date.now().toString() + '-error',
                role: 'model',
                content: `I can't answer location-based questions without access to your location. Please enable location services in your browser and refresh. Error: ${geolocation.error.message}`,
            };
            setMessages(prev => [...prev, errorMessage]);
            setIsLoading(false);
            return;
        }
    }
    
    const response = await getGroundedResponse(prompt, location);

    const modelMessage: Message = {
        id: Date.now().toString() + '-model',
        role: 'model',
        content: response.text,
        sources: response.sources,
        isMap: response.isMap,
        mapQuery: response.isMap ? prompt : undefined
    };
    
    setMessages(prev => [...prev, modelMessage]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100">
        <header className="p-4 border-b border-gray-700 bg-gray-800 shadow-md flex items-center justify-center flex-col space-y-1 sticky top-0 z-10">
            <h1 className="text-xl font-bold text-white">GeoChat AI</h1>
            <p className="text-sm text-gray-400">Powered by Gemini & Google Grounding</p>
        </header>

        <main className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
                {messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
                {isLoading && (
                    <div className="flex items-start gap-4 p-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-600">
                            <BotIcon />
                        </div>
                        <div className="flex-1 pt-2 space-y-2">
                            <div className="h-3 bg-gray-700 rounded w-3/4 animate-pulse"></div>
                            <div className="h-3 bg-gray-700 rounded w-1/2 animate-pulse"></div>
                        </div>
                    </div>
                )}
                {error && <div className="p-4 text-red-400 bg-red-900/50 rounded-md">{error}</div>}
                <div ref={chatEndRef} />
            </div>
        </main>
        
        <div className="sticky bottom-0">
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
    </div>
  );
};

export default App;
