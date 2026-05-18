import { useState } from "react";

export default function AlertCard({ alert }) {
  const [status, setStatus] = useState("Pending");

  // ✅ Accept Alert
  const handleAccept = () => {
    setStatus("Accepted");
    alert("🚑 You accepted this emergency!");
  };

  // ❌ Ignore Alert
  const handleIgnore = () => {
    setStatus("Ignored");
    alert("❌ Alert ignored");
  };

  // 📍 Navigate using Google Maps
  const handleNavigate = () => {
    if (!alert?.lat || !alert?.lng) {
      alert("Location not available ❌");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const origin = `${pos.coords.latitude},${pos.coords.longitude}`;
        const destination = `${alert.lat},${alert.lng}`;

        const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
        window.open(url, "_blank");
      },
      () => {
        // fallback (without origin)
        const url = `https://www.google.com/maps/dir/?api=1&destination=${alert.lat},${alert.lng}`;
        window.open(url, "_blank");
      }
    );
  };

  return (
    <div
      style={{
        border: "2px solid red",
        borderRadius: "10px",
        padding: "15px",
        marginBottom: "15px",
        background: "#fff5f5",
      }}
    >
      <h4>🚨 Emergency Alert</h4>

      <p><b>Status:</b> {status}</p>
      <p><b>Latitude:</b> {alert.lat}</p>
      <p><b>Longitude:</b> {alert.lng}</p>

      {/* 🔘 Buttons */}
      <div style={{ marginTop: "10px" }}>
        <button
          onClick={handleAccept}
          style={{
            background: "green",
            color: "white",
            padding: "8px 12px",
            marginRight: "10px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          ✅ Accept
        </button>

        <button
          onClick={handleIgnore}
          style={{
            background: "gray",
            color: "white",
            padding: "8px 12px",
            marginRight: "10px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          ❌ Ignore
        </button>

        <button
          onClick={handleNavigate}
          style={{
            background: "blue",
            color: "white",
            padding: "8px 12px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          📍 Navigate
        </button>
      </div>
    </div>
  );
}