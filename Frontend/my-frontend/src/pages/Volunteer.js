import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

// 🔔 sound
const alertSound = new Audio("/siren.mp3");

export default function Volunteer() {
  const [alerts, setAlerts] = useState([]);

  // 🔔 1️⃣ SOCKET useEffect (already exists)
  useEffect(() => {
    socket.on("newAlert", (alert) => {
      alertSound.play(); // siren
      setAlerts((prev) => [alert, ...prev]);
    });

    return () => socket.off("newAlert");
  }, []);

  // 🔔 2️⃣ ADD THIS HERE (separate useEffect)
  useEffect(() => {
    const enableSound = () => {
      alertSound.play().catch(() => {});
    };

    document.body.addEventListener("click", enableSound);

    return () => {
      document.body.removeEventListener("click", enableSound);
    };
  }, []);

  return (
    <div>
      <h2>Volunteer Dashboard</h2>
    </div>
  );
}

