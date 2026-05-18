import { useEffect, useState } from "react";
import io from "socket.io-client";
import LiveMap from "../../components/LiveMap";
const socket = io("http://localhost:5000");

// 🔔 siren
const alertSound = new Audio("/siren.mp3");
const [liveLocation, setLiveLocation] = useState(null);

export default function Volunteer() {
  const [alerts, setAlerts] = useState([]);

  // 🔔 1. Unlock audio after first click
  useEffect(() => {
    const unlockAudio = () => {
      alertSound.play()
        .then(() => {
          alertSound.pause();
          alertSound.currentTime = 0;
        })
        .catch(() => {});
    };

    document.body.addEventListener("click", unlockAudio);

    return () => {
      document.body.removeEventListener("click", unlockAudio);
    };
  }, []);

  // 🔔 2. Listen for alerts
  useEffect(() => {
    socket.on("newAlert", (alert) => {
      console.log("ALERT RECEIVED:", alert);

      // 🔔 play siren
      alertSound.currentTime = 0;
      alertSound.play().catch((err) => {
        console.log("Sound error:", err);
      });

      setAlerts((prev) => [alert, ...prev]);
    });

    return () => socket.off("newAlert");
  }, []);

  return (
    <div>
      <h2>🚨 Volunteer Dashboard</h2>

      {/* 🔧 TEST BUTTON (optional) */}
      <button onClick={() => alertSound.play()}>
        Test Siren
      </button>
    </div>
  );
}