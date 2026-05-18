const Alert = require("../models/Alert");
const Volunteer = require("../models/Volunteer");
function getDistance(lat1, lng1, lat2, lng2) {
  return Math.sqrt(
    Math.pow(lat1 - lat2, 2) + Math.pow(lng1 - lng2, 2)
  );
}

exports.notifyNearbyVolunteers = async (lat, lng) => {
  const volunteers = await Volunteer.find();

  // Find nearby (within small radius)
  const nearby = volunteers.filter((v) => {
    if (!v.location) return false;

    const dist = getDistance(
      lat,
      lng,
      v.location.lat,
      v.location.lng
    );

    return dist < 0.05; // 🔥 radius (adjust)
  });

  return nearby;
};
// 🚨 Create Alert
exports.createAlert = async (req, res) => {
  try {
    const { lat, lng } = req.body;

    const alert = new Alert({
      userId: req.user?.id || null, // optional auth
      location: { lat, lng },
    });

    await alert.save();

    res.status(201).json(alert);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 📄 Get All Alerts (Admin / Testing)
exports.getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ createdAt: -1 });
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ Accept Alert
exports.acceptAlert = async (req, res) => {
  try {
    const alert = await Alert.findById(req.params.id);

    if (!alert) return res.status(404).json({ msg: "Alert not found" });

    alert.status = "accepted";
    alert.responderId = req.user?.id || null;

    await alert.save();

    res.json(alert);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};