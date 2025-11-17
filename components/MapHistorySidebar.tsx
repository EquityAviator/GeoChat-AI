import React from 'react';
import { CloseIcon, MapPinIcon } from './Icons';

interface MapHistorySidebarProps {
  history: string[];
  onSearch: (query: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const MapHistorySidebar: React.FC<MapHistorySidebarProps> = ({ history, onSearch, isOpen, onClose }) => {
  return (
    <>
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      ></div>
      <aside 
        className={`absolute top-0 left-0 h-full w-72 bg-gray-800 shadow-xl z-30 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="map-history-heading"
      >
        <div className="flex flex-col h-full">
          <header className="p-4 flex items-center justify-between border-b border-gray-700">
            <h2 id="map-history-heading" className="text-lg font-semibold text-white">Map Search History</h2>
            <button 
              onClick={onClose} 
              className="p-1 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white"
              aria-label="Close history"
            >
              <CloseIcon />
            </button>
          </header>
          <div className="flex-1 overflow-y-auto p-2">
            {history.length === 0 ? (
              <p className="text-gray-400 text-center p-4">No map searches yet.</p>
            ) : (
              <ul>
                {history.map((query, index) => (
                  <li key={index}>
                    <button 
                      onClick={() => onSearch(query)}
                      className="w-full text-left flex items-center gap-3 p-3 rounded-md text-gray-300 hover:bg-gray-700 transition-colors"
                    >
                      <MapPinIcon />
                      <span className="truncate flex-1">{query}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default MapHistorySidebar;
