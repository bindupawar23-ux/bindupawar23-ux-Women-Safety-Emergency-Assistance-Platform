import { useEffect, useState } from "react";
import API from "../../services/api";
import io from "socket.io-client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

// 🔥 Socket connection
const socket = io("http://localhost:5000");

export default function MapView() {
  const [alerts, setAlerts] = useState([]);
  const [liveUser, setLiveUser] = useState(null);

  const position = [17.385, 78.4867]; // Default (Hyderabad)

  // 🚀 Fetch alerts from backend
  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const res = await API.get("/alerts");
      setAlerts(res.data);
    } catch (err) {
      console.log("Error fetching alerts:", err);
    }
  };

  // 🚀 Real-time alerts
  useEffect(() => {
    socket.on("newAlert", (data) => {
      setAlerts((prev) => [...prev, data]);
    });

    // 🚶 Live tracking
    socket.on("updateLocation", (data) => {
      setLiveUser(data);
    });

    return () => {
      socket.off("newAlert");
      socket.off("updateLocation");
    };
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📍 Safety Map</h2>

      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "500px", width: "100%" }}
      >
        {/* Map tiles */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* 🚨 SOS Alerts */}
        {alerts.map((alert) => (
          <Marker
            key={alert._id}
            position={[alert.location.lat, alert.location.lng]}
          >
            <Popup>
              🚨 SOS Alert <br />
              Status: {alert.status}
            </Popup>
          </Marker>
        ))}

        {/* 🚶 Live User Tracking */}
        {liveUser && (
          <Marker position={[liveUser.lat, liveUser.lng]}>
            <Popup>🚶 Live User Location</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
