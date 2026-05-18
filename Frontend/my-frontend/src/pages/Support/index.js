import { useEffect, useState } from "react";
import io from "socket.io-client";
import LiveMap from "../../components/LiveMap";
import AlertCard from "../../components/AlertCard";

const socket = io("http://localhost:5000");

export default function Support() {
  const [alerts, setAlerts] = useState([]);
  const [liveLocation, setLiveLocation] = useState(null);

  useEffect(() => {
    // 🔔 Receive new SOS alerts
    socket.on("newAlert", (alert) => {
      setAlerts((prev) => [alert, ...prev]);
    });

    // 📍 Live location updates
    socket.on("updateLocation", (loc) => {
      setLiveLocation(loc);
    });

    return () => {
      socket.off("newAlert");
      socket.off("updateLocation");
    };
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>🚨 Support Team Dashboard</h2>

      {/* 🔔 Alerts */}
      <h3>Incoming Alerts</h3>
      {alerts.map((alert, index) => (
        <AlertCard key={index} alert={alert} />
      ))}

      {/* 📍 Map */}
      <h3>Live Location</h3>
      <LiveMap location={liveLocation} />
    </div>
  );
}