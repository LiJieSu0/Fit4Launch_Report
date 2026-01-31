import React, { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default icon issues with Leaflet and Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Green Pin Icon for Base Station
const greenPinSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" fill="#2ab42a" stroke="black" stroke-width="1">
  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
  <circle cx="12" cy="9" r="2.5" fill="white"/>
</svg>
`;

const greenPinIcon = new L.DivIcon({
  html: greenPinSvg,
  className: '', // Clear default class
  iconSize: [30, 30],
  iconAnchor: [15, 30], // Anchor at bottom tip
  popupAnchor: [0, -30]
});

// Dot Icons for DUT and REF
const dutIcon = L.divIcon({
  className: 'dut-icon',
  iconSize: [15, 15],
  iconAnchor: [7.5, 7.5] // Center
});

const refIcon = L.divIcon({
  className: 'ref-icon',
  iconSize: [15, 15],
  iconAnchor: [7.5, 7.5] // Center
});

const calculateAverageCoords = (bandData, metric, device) => {
  if (!bandData || !bandData[device]) return null;

  let sumLat = 0;
  let sumLon = 0;
  let count = 0;

  // Iterate Runs 1-5
  for (let i = 1; i <= 5; i++) {
    const runKey = `Run${i}`;
    const runData = bandData[device][runKey];

    // Check if runData exists and has the specific metric
    if (runData && runData[metric]) {
      const { latitude, longitude } = runData[metric];
      if (latitude && longitude) {
        sumLat += latitude;
        sumLon += longitude;
        count++;
      }
    }
  }

  if (count === 0) return null;

  return [sumLat / count, sumLon / count];
};

const CoverageMap = ({ bandData, metric, baseStation }) => {
  // If baseStation is passed as 'baseStationCoords' (legacy support or typo in user example), handle it
  // The example usage uses 'baseStation={BASE_STATION_COORDS}'
  // We'll support 'baseStation' as primary.
  const bsPos = baseStation;

  const dutPos = useMemo(() => calculateAverageCoords(bandData, metric, 'DUT'), [bandData, metric]);
  const refPos = useMemo(() => calculateAverageCoords(bandData, metric, 'REF'), [bandData, metric]);

  if (!bsPos || bsPos.length < 2) {
    return <div>No base station coordinates provided.</div>;
  }

  const longitudeOffset = 0.05; // Adjust this value as needed, to make sure the map is centered on printing

  // Calculate center based on available positions to avoid null errors
  const positions = [bsPos];
  if (dutPos) positions.push(dutPos);
  if (refPos) positions.push(refPos);

  const avgLat = positions.reduce((sum, pos) => sum + pos[0], 0) / positions.length;
  const avgLon = positions.reduce((sum, pos) => sum + pos[1], 0) / positions.length;
  const newCenter = [avgLat, avgLon + longitudeOffset];
  return (
    <div style={{ position: 'relative', width: '80%', height: '400px', margin: '0 auto' }}>
      <MapContainer
        center={newCenter}
        zoom={13}
        zoomControl={false}
        dragging={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        boxZoom={false}
        attributionControl={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution=""
        />

        {/* Base Station Marker */}
        <Marker position={bsPos} icon={greenPinIcon}>
          {/* Optional: Add permanent tooltip if desired, though Legend explains it */}
        </Marker>

        {/* DUT Marker */}
        {dutPos && (
          <Marker position={dutPos} icon={dutIcon}>
          </Marker>
        )}

        {/* REF Marker */}
        {refPos && (
          <Marker position={refPos} icon={refIcon}>
          </Marker>
        )}
      </MapContainer>

      {/* Custom Legend Overlay */}
      <div style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: '10px',
        borderRadius: '5px',
        zIndex: 1000,
        display: 'flex',
        gap: '15px',
        alignItems: 'center',
        fontSize: '14px',
        fontWeight: 'bold'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div className="dut-icon" style={{ width: '10px', height: '10px', position: 'relative', top: '0', left: '0' }}></div>
          <span>DUT</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div className="ref-icon" style={{ width: '10px', height: '10px', position: 'relative', top: '0', left: '0' }}></div>
          <span>REF</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '15px', height: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} dangerouslySetInnerHTML={{ __html: greenPinSvg.replace('width="30"', 'width="15"').replace('height="30"', 'height="15"') }}></div>
          <span>Base Station</span>
        </div>
      </div>
    </div>
  );
};

export default CoverageMap;