import { useState, useEffect } from "react";
import API from "../../services/api";
import io from "socket.io-client";
console.log("Final URL:", API.defaults.baseURL + "/alerts");
const socket = io("http://localhost:5000");

export default function SOS() {
  const [location, setLocation] = useState(null);

  // 📍 Get current location (one-time)
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => {
        alert("Location access denied ❌");
      }
    );
  };

  // 🚨 Send SOS alert
  const sendSOS = async () => {
    if (!location) return alert("Click Get Location first");

    try {
      const res = await API.post("/alerts", location);

      // 🔥 Emit alert (real-time)
      socket.emit("sendAlert", res.data);

      alert("🚨 SOS Sent Successfully!");
    } catch (err) {
      console.log(err);
      alert("Error sending SOS ❌");
    }
  };

  // 🚶 Live tracking (continuous location updates)
  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const liveLoc = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };

        // 🔥 Send live location to server
        socket.emit("liveLocation", liveLoc);
      },
      (err) => {
        console.log("Live tracking error:", err);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>🚨 Emergency SOS</h2>

      {/* Get Location */}
      <button
        onClick={getLocation}
        style={{
          padding: "10px 20px",
          margin: "10px",
          fontSize: "16px",
        }}
      >
        📍 Get Location
      </button>

      {/* Show Location */}
      {location && (
        <p>
          Latitude: {location.lat} <br />
          Longitude: {location.lng}
        </p>
      )}

      {/* SOS Button */}
      <button
        onClick={sendSOS}
        style={{
          background: "red",
          color: "white",
          padding: "20px",
          marginTop: "20px",
          fontSize: "18px",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        🚨 SEND SOS
      </button>
    </div>
  );
}