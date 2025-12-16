import React, { useMemo, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Custom marker icons - simple solid circles to match legend
const createCustomIcon = (color) => {
    return L.divIcon({
        className: 'custom-marker',
        html: `<div style="
      background-color: ${color};
      width: 16px;
      height: 16px;
      border-radius: 50%;
    "></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
    });
};

const baseStationIcon = L.icon({
    iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDMwIDQwIj48cGF0aCBmaWxsPSIjNENBRjUwIiBkPSJNMTUgMEMxMC4wMyAwIDYgNC4wMyA2IDljMCA3LjUgOSAxNiA5IDE2czktOC41IDktMTZjMC00Ljk3LTQuMDMtOS05LTl6bTAgMTJjLTEuNjYgMC0zLTEuMzQtMy0zczEuMzQtMyAzLTMgMyAxLjM0IDMgMy0xLjM0IDMtMyAzeiIvPjwvc3ZnPg==',
    iconSize: [30, 40],
    iconAnchor: [15, 40],
    popupAnchor: [0, -40],
});

const dutIcon = createCustomIcon('#F44336'); // Red
const refIcon = createCustomIcon('#2196F3'); // Blue

// Component to handle map re-centering on print
const MapController = ({ center, zoom }) => {
    const map = useMap();

    useEffect(() => {
        const handleBeforePrint = () => {
            // Force map to re-center and invalidate size before printing
            setTimeout(() => {
                map.invalidateSize();
                map.setView(center, zoom);
            }, 100);
        };

        const handleAfterPrint = () => {
            // Re-center map after printing
            setTimeout(() => {
                map.invalidateSize();
                map.setView(center, zoom);
            }, 100);
        };

        // Listen for print events
        window.addEventListener('beforeprint', handleBeforePrint);
        window.addEventListener('afterprint', handleAfterPrint);

        // Also handle Chrome's print dialog which doesn't fire beforeprint
        const mediaQueryList = window.matchMedia('print');
        const handlePrintMediaChange = (mql) => {
            if (mql.matches) {
                handleBeforePrint();
            } else {
                handleAfterPrint();
            }
        };

        mediaQueryList.addListener(handlePrintMediaChange);

        return () => {
            window.removeEventListener('beforeprint', handleBeforePrint);
            window.removeEventListener('afterprint', handleAfterPrint);
            mediaQueryList.removeListener(handlePrintMediaChange);
        };
    }, [map, center, zoom]);

    return null;
};

const CoverageMap = ({ bandData, metric, baseStation }) => {
    // Calculate average positions for DUT and REF
    const { dutAvgPosition, refAvgPosition } = useMemo(() => {
        if (!bandData || !bandData.DUT || !bandData.REF) {
            return { dutAvgPosition: null, refAvgPosition: null };
        }

        const calculateAverage = (deviceData) => {
            let latSum = 0;
            let lonSum = 0;
            let count = 0;

            for (let i = 1; i <= 5; i++) {
                const runKey = `Run${i}`;
                const runData = deviceData[runKey];

                if (runData && runData[metric]) {
                    const { latitude, longitude } = runData[metric];
                    if (latitude && longitude) {
                        latSum += latitude;
                        lonSum += longitude;
                        count++;
                    }
                }
            }

            return count > 0 ? [latSum / count, lonSum / count] : null;
        };

        return {
            dutAvgPosition: calculateAverage(bandData.DUT),
            refAvgPosition: calculateAverage(bandData.REF),
        };
    }, [bandData, metric]);

    // Calculate map center and zoom to fit all markers
    const { center, zoom } = useMemo(() => {
        if (!dutAvgPosition && !refAvgPosition && !baseStation) {
            return { center: [47.1449, -122.3574], zoom: 13 }; // Default Seattle coordinates
        }

        const positions = [dutAvgPosition, refAvgPosition, baseStation].filter(Boolean);

        if (positions.length === 0) {
            return { center: [47.1449, -122.3574], zoom: 13 };
        }

        // Calculate bounding box
        const lats = positions.map(pos => pos[0]);
        const lons = positions.map(pos => pos[1]);

        const minLat = Math.min(...lats);
        const maxLat = Math.max(...lats);
        const minLon = Math.min(...lons);
        const maxLon = Math.max(...lons);

        // Calculate center from bounding box
        const centerLat = (minLat + maxLat) / 2;
        const centerLon = (minLon + maxLon) / 2;

        // Calculate appropriate zoom level based on the span
        const latSpan = maxLat - minLat;
        const lonSpan = maxLon - minLon;
        const maxSpan = Math.max(latSpan, lonSpan);

        // Determine zoom level (increased by 1 for better marker visibility)
        let zoomLevel = 14; // default
        if (maxSpan > 0.05) zoomLevel = 12;
        else if (maxSpan > 0.02) zoomLevel = 13;
        else if (maxSpan > 0.01) zoomLevel = 14;
        else if (maxSpan > 0.005) zoomLevel = 15;
        else zoomLevel = 16;

        return { center: [centerLat, centerLon], zoom: zoomLevel };
    }, [dutAvgPosition, refAvgPosition, baseStation]);

    // Create lines from base station to DUT and REF
    const lines = useMemo(() => {
        const result = [];
        if (baseStation && dutAvgPosition) {
            result.push({
                positions: [baseStation, dutAvgPosition],
                color: '#F44336',
                label: 'DUT',
            });
        }
        if (baseStation && refAvgPosition) {
            result.push({
                positions: [baseStation, refAvgPosition],
                color: '#2196F3',
                label: 'REF',
            });
        }
        return result;
    }, [baseStation, dutAvgPosition, refAvgPosition]);

    return (
        <div className="map-outer-container">
            <MapContainer
                center={center}
                zoom={zoom}
                style={{ width: '100%', height: '100%' }}
                scrollWheelZoom={false}
                dragging={false}
                touchZoom={false}
                doubleClickZoom={false}
                boxZoom={false}
                keyboard={false}
                zoomControl={false}
            >
                <MapController center={center} zoom={zoom} />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Base Station Marker */}
                {baseStation && (
                    <Marker position={baseStation} icon={baseStationIcon}>
                        <Popup>
                            <strong>Base Station</strong>
                            <br />
                            Lat: {baseStation[0].toFixed(6)}
                            <br />
                            Lon: {baseStation[1].toFixed(6)}
                        </Popup>
                    </Marker>
                )}

                {/* DUT Average Position Marker */}
                {dutAvgPosition && (
                    <Marker position={dutAvgPosition} icon={dutIcon}>
                        <Popup>
                            <strong>DUT (Average)</strong>
                            <br />
                            Lat: {dutAvgPosition[0].toFixed(6)}
                            <br />
                            Lon: {dutAvgPosition[1].toFixed(6)}
                        </Popup>
                    </Marker>
                )}

                {/* REF Average Position Marker */}
                {refAvgPosition && (
                    <Marker position={refAvgPosition} icon={refIcon}>
                        <Popup>
                            <strong>REF (Average)</strong>
                            <br />
                            Lat: {refAvgPosition[0].toFixed(6)}
                            <br />
                            Lon: {refAvgPosition[1].toFixed(6)}
                        </Popup>
                    </Marker>
                )}

                {/* Lines from Base Station to DUT and REF */}
                {lines.map((line, index) => (
                    <Polyline
                        key={index}
                        positions={line.positions}
                        color={line.color}
                        weight={3}
                        opacity={0.6}
                        dashArray="10, 10"
                    />
                ))}
            </MapContainer>

            {/* Legend */}
            <div style={{
                marginTop: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                fontSize: '16px',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        backgroundColor: '#F44336',
                    }}></div>
                    <span>DUT</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        backgroundColor: '#2196F3',
                    }}></div>
                    <span>REF</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="20" height="24" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 0C7.03 0 3 4.03 3 9C3 16.5 12 25 12 25C12 25 21 16.5 21 9C21 4.03 16.97 0 12 0ZM12 12C10.34 12 9 10.66 9 9C9 7.34 10.34 6 12 6C13.66 6 15 7.34 15 9C15 10.66 13.66 12 12 12Z" fill="#4CAF50" />
                    </svg>
                    <span>Base Station</span>
                </div>
            </div>
        </div>
    );
};

export default CoverageMap;
