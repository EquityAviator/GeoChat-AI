import React, { useState, useEffect, useRef } from 'react';
import { useGeolocation } from './hooks/useGeolocation';
import { getGroundedResponse } from './services/geminiService';
import type { Message } from './types';
import ChatInput from './components/ChatInput';
import ChatMessage from './components/ChatMessage';
import TypingIndicator from './components/TypingIndicator';
import MapHistorySidebar from './components/MapHistorySidebar';
import { TrashIcon, HistoryIcon } from './components/Icons';

const initialMessage: Message = {
    id: 'initial',
    role: 'model',
    content: "Hello! I'm GeoChat AI. I can answer your questions using up-to-date information from Google Search, or provide location-based answers using Google Maps. Try asking me 'What are some good cafes near me?' or 'Who won the latest F1 race?'"
};

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const savedMessages = localStorage.getItem('geochat-history');
      if (savedMessages) {
        const parsed = JSON.parse(savedMessages);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (error) {
      console.error("Failed to load messages from localStorage", error);
    }
    return [initialMessage];
  });

  const [mapHistory, setMapHistory] = useState<string[]>(() => {
    try {
      const savedHistory = localStorage.getItem('geochat-map-history');
      return savedHistory ? JSON.parse(savedHistory) : [];
    } catch (error) {
      console.error("Failed to load map history from localStorage", error);
      return [];
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const geolocation = useGeolocation();
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    try {
      localStorage.setItem('geochat-history', JSON.stringify(messages));
    } catch (error) {
      console.error("Failed to save messages to localStorage", error);
    }
  }, [messages]);

  useEffect(() => {
    try {
      localStorage.setItem('geochat-map-history', JSON.stringify(mapHistory));
    } catch (error) {
      console.error("Failed to save map history to localStorage", error);
    }
  }, [mapHistory]);

  const handleSendMessage = async (prompt: string) => {
    setIsLoading(true);
    setError(null);
    setIsSidebarOpen(false);

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

    if (modelMessage.isMap && modelMessage.mapQuery) {
        setMapHistory(prev => {
            const newHistory = [modelMessage.mapQuery!, ...prev.filter(q => q !== modelMessage.mapQuery)];
            return newHistory.slice(0, 50); // Limit history size
        });
    }
    
    setMessages(prev => [...prev, modelMessage]);
    setIsLoading(false);
  };
  
  const handleClearChat = () => {
    setMessages([initialMessage]);
    setMapHistory([]);
    localStorage.removeItem('geochat-history');
    localStorage.removeItem('geochat-map-history');
  };

  const handleHistorySearch = (query: string) => {
    handleSendMessage(query);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 font-sans">
      <MapHistorySidebar 
        history={mapHistory} 
        onSearch={handleHistorySearch}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className="flex flex-col flex-1 transition-all duration-300">
          <header className="p-4 border-b border-gray-700 bg-gray-800 shadow-md flex items-center justify-between sticky top-0 z-10">
              <button 
                  onClick={() => setIsSidebarOpen(true)} 
                  className="p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white transition-colors" 
                  aria-label="Open map search history"
                  title="Open map search history"
              >
                  <HistoryIcon />
              </button>
              <div className="text-center">
                <h1 className="text-xl font-bold text-white">GeoChat AI</h1>
                <p className="text-sm text-gray-400">Powered by Gemini & Google Grounding</p>
              </div>
              <button 
                  onClick={handleClearChat} 
                  className="p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white transition-colors" 
                  aria-label="Clear chat history"
                  title="Clear chat history"
              >
                  <TrashIcon />
              </button>
          </header>

          <main className="flex-1 overflow-y-auto">
              <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
                  {messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
                  {isLoading && <TypingIndicator />}
                  {error && <div className="p-4 text-red-400 bg-red-900/50 rounded-md">{error}</div>}
                  <div ref={chatEndRef} />
              </div>
          </main>
          
          <div className="sticky bottom-0">
            <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
          </div>
      </div>
    </div>
  );
};

export default App;
