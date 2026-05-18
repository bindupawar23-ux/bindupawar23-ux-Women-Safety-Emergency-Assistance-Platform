import { useEffect, useState } from "react";
import API from "../../services/api";
import io from "socket.io-client";


import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
} from "recharts";
const socket = io("http://localhost:5000");
const notifySound = new Audio("/notify.mp3");
export default function Admin() {
  const [stats, setStats] = useState({});

 useEffect(() => {
  fetchStats();

  // 🔥 Listen for live updates
  socket.on("adminUpdate", () => {
    console.log("Admin live update received");
     notifySound.currentTime = 0;
      notifySound.play().catch(() => {});

    fetchStats(); // reload stats
  });

  return () => socket.off("adminUpdate");
}, []);
  // 📊 Bar Chart Data
  const barData = [
    { name: "Users", value: stats.totalUsers || 0 },
    { name: "Alerts", value: stats.totalAlerts || 0 },
  ];
   useEffect(() => {
    const unlock = () => {
      notifySound.play()
        .then(() => {
          notifySound.pause();
          notifySound.currentTime = 0;
        })
        .catch(() => {});
    };

    document.body.addEventListener("click", unlock);

    return () => {
      document.body.removeEventListener("click", unlock);
    };
  }, []);

  // 🥧 Pie Chart Data
  const pieData = [
    { name: "Completed", value: stats.completed || 0 },
    { name: "Pending", value: stats.pending || 0 },
  ];
 const fetchStats = () => {
    API.get("/admin/stats")
      .then((res) => {
        console.log("DATA:", res.data);
        setStats(res.data);
      })
      .catch((err) => console.log(err));
  };


  return (
    <div style={{ padding: "20px" }}>
      <h2>📊 Admin Dashboard</h2>

      <h3>Total Users: {stats.totalUsers}</h3>
      <h3>Total Alerts: {stats.totalAlerts}</h3>

      {/* 📊 BAR CHART */}
      <h3>Users vs Alerts</h3>
      <BarChart width={400} height={300} data={barData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" />
      </BarChart>

      {/* 🥧 PIE CHART */}
      <h3>Alert Status</h3>
      <PieChart width={400} height={300}>
        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
        />
        <Tooltip />
      </PieChart>
    </div>
  );
}