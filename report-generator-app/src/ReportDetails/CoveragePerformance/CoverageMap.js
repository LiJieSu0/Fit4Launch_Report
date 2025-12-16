import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default icon issues with Leaflet and Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


const LONGITUDE_OFFSET = 0.04; 

const CoverageMap = ({ baseStationCoords }) => {
  if (!baseStationCoords || baseStationCoords.length === 0) {
    return <div>No base station coordinates provided.</div>;
  }

  const originalLat = baseStationCoords[0];
  const originalLon = baseStationCoords[1];

  const adjustedLon = originalLon + LONGITUDE_OFFSET;
  const position = [originalLat, adjustedLon]; 

  return (
    <MapContainer 
      center={position} 
      zoom={13} 
      style={{ height: '400px', width: '80%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={baseStationCoords}> 
      </Marker>
    </MapContainer>
  );
};

export default CoverageMap;