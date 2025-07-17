import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import { useState, useEffect } from 'react';
import L from 'leaflet';

const getStatusIcon = (status) => {
  const normalized = (status || '').toLowerCase().replace(/\s+/g, '-');

  const iconMap = {
    new: '/icons/marker-icon-red.png',
    'in-progress': '/icons/marker-icon-yellow.png',
    resolved: '/icons/marker-icon-green.png',
  };

  const iconUrl = iconMap[normalized] || '/icons/marker-icon-blue.png';

  return new L.Icon({
    iconUrl,
    shadowUrl: '/icons/marker-shadow.png', // also place this in public/icons/
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
};



const MapView = () => {
  const [position, setPosition] = useState(null);
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState('all'); 

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
      },
      (err) => {
        console.error("Geolocation error:", err.message);
        // fallback to a default location
        setPosition([0, 0]); // Equator fallback
      }
    );
    // Fetch reports
    axios.get('http://localhost:5000/api/reports')
      .then((res) => setReports(res.data))
      .catch((err) => console.error("❌ Failed to fetch reports:", err));
  }, []);
  const filteredReports = reports.filter((r) =>
    filter === 'all' ? true : r.status === filter
  );
  

  if (!position) return <p className="text-center mt-10">🌍 Loading map...</p>;

  return (
    <div className="w-full">
      {/* Filter Controls */}
      <div className="flex justify-center gap-4 my-4">
        {['all', 'new', 'in-progress', 'resolved'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-1 rounded ${
              filter === status
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {status}
          </button>
        ))}
      </div>
     <MapContainer
        center={position}
        zoom={6}
        scrollWheelZoom={true}
        className="w-full h-[500px] z-0" // Use Tailwind or replace with style if needed
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        <Marker position={position}>
          <Popup>You are here</Popup>
        </Marker>
        {filteredReports.map((report, idx) => (
          <Marker
            key={idx}
            position={[
              report.location.coordinates[1], // lat
              report.location.coordinates[0], // lon
            ]}
            icon={getStatusIcon(report.status)}
          >
            console.log('Report Status:', report.status);

            <Popup>
              <div className="text-sm">
                <p className="font-semibold">{report.description}</p>
                {report.image && (
                  <img
                    src={`http://localhost:5000${report.image}`}
                    alt="Report"
                    style={{
                      width: '150px',
                      borderRadius: '8px',
                      display: 'block',
                      marginTop: '8px'
                    }}
                  />
                )}
              </div>
            </Popup>

          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};


export default MapView;
