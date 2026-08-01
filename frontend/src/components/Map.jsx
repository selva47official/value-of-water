import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';
import api from '../services/api';

const MapComponent = ({ complaints }) => {
  const [mapCenter, setMapCenter] = useState({ lat: 11.1271, lng: 78.6569 });

  const mapStyles = {
    height: '500px',
    width: '100%',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  };

  const getSeverityColor = (severity) => {
    const colors = {
      'Critical': '#FF6B6B',
      'High': '#FFA500',
      'Medium': '#FFD93D',
      'Low': '#6BCB77'
    };
    return colors[severity] || '#667eea';
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        center={mapCenter}
        zoom={8}
      >
        {complaints.map((complaint) => (
          <MarkerF
            key={complaint.id}
            position={{
              lat: parseFloat(complaint.latitude),
              lng: parseFloat(complaint.longitude)
            }}
            icon={{
              path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z',
              fillColor: getSeverityColor(complaint.severity),
              fillOpacity: 1,
              scale: 1.5
            }}
            title={complaint.complaint_type}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
