const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: { origin: "*" },
});

// 🔥 ADD THIS
app.set("io", io);
//app.set("io", io);

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/admin", require("./routes/adminRoutes"));

// DB
connectDB();
app.use("/api/volunteers", require("./routes/volunteerRoutes"));
app.use("/api/volunteers", require("./routes/volunteerRoutes"));
// Routes
app.use("/api/alerts", require("./routes/alertRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
// 🧠 Socket Logic
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // 🚨 Receive SOS
  socket.on("sendAlert", (data) => {
    console.log("Sending alert:", data); 
    console.log("New Alert:", data);

    // broadcast to all volunteers
    io.emit("newAlert", data);
      io.emit("adminUpdate");
    
  });

  // 📍 Live tracking
  socket.on("liveLocation", (data) => {
    io.emit("updateLocation", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Start server
const PORT = process.env.PORT || 5000;

server.listen(PORT, () =>
  console.log(`Server running on port ${PORT} 🚀`)
);