import { useEffect, useState } from "react";
import API from "../../services/api";

export default function VolunteerDashboard() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const res = await API.get("/volunteers/alerts");
      setAlerts(res.data);
    } catch (err) {
      console.log(err);
    }
  };
const sendLocation = () => {
  navigator.geolocation.getCurrentPosition(async (pos) => {
    const loc = {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
    };

    const id = localStorage.getItem("volunteerId");

    await API.put(`/volunteers/location/${id}`, loc);

    alert("Location updated");
  });
};
  const acceptAlert = async (id) => {
    try {
      await API.put(`/volunteers/alerts/${id}`);
      alert("Alert accepted");
      fetchAlerts(); // refresh
    } catch (err) {
      alert("Error accepting alert");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Volunteer Dashboard</h2>

      {alerts.length === 0 ? (
        <p>No pending alerts</p>
      ) : (
        alerts.map((alert) => (
          <div
            key={alert._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              margin: "10px",
            }}
          >
            <p><b>Location:</b> {alert.location.lat}, {alert.location.lng}</p>
            <p><b>Status:</b> {alert.status}</p>

            <button onClick={() => acceptAlert(alert._id)}>
              Accept 🚨
            </button>
            <button onClick={sendLocation}>📍 Share My Location</button>
          </div>
        ))
      )}
    </div>
  );
}