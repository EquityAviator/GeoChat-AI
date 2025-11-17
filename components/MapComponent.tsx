import React from 'react';

interface MapComponentProps {
  query: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ query }) => {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="mt-4 border border-gray-600 rounded-lg overflow-hidden shadow-lg">
      <iframe
        width="100%"
        height="300"
        loading="lazy"
        allowFullScreen
        src={mapSrc}
        className="border-0"
        title={`Google Map for ${query}`}
      ></iframe>
    </div>
  );
};

export default MapComponent;
