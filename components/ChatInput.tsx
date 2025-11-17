import React, { useState, useEffect, useRef } from 'react';
import { SendIcon, MicrophoneIcon } from './Icons';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

// FIX: Define SpeechRecognition interface to fix "Cannot find name 'SpeechRecognition'" error.
interface SpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: (event: any) => void;
  onstart: () => void;
  onend: () => void;
  onerror: (event: any) => void;
  stop: () => void;
  start: () => void;
}

declare global {
  interface Window {
    // FIX: Update window declaration to use the defined SpeechRecognition interface.
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      console.warn("Speech recognition not supported by this browser.");
      return;
    }
    
    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.trim();
      setInput(transcript);
    };

    recognition.onstart = () => {
        setIsListening(true);
    };

    recognition.onend = () => {
        setIsListening(false);
    };
    
    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        alert("Microphone access was denied. Please allow microphone access in your browser settings to use voice input.");
      }
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, []);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleToggleListening = () => {
    if (!recognitionRef.current) return;
    
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.error("Could not start recognition:", e);
        setIsListening(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-800 border-t border-gray-700">
      <div className="relative max-w-4xl mx-auto">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isListening ? "Listening..." : "Ask me anything..."}
          disabled={isLoading}
          className="w-full bg-gray-700 text-gray-200 rounded-full py-3 pl-5 pr-28 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 disabled:opacity-50"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          <button
            type="button"
            onClick={handleToggleListening}
            disabled={isLoading || !recognitionRef.current}
            className="p-2 rounded-full text-white hover:bg-gray-600 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors"
            aria-label={isListening ? "Stop listening" : "Use microphone"}
          >
            <MicrophoneIcon isListening={isListening} />
          </button>
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="p-2 rounded-full text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
            aria-label="Send message"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
            ) : (
              <SendIcon />
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ChatInput;
