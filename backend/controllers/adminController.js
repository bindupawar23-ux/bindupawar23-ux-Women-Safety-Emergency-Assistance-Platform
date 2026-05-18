const User = require("../models/User");
const Alert = require("../models/Alert");

exports.getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalAlerts = await Alert.countDocuments();
    const completed = await Alert.countDocuments({ status: "completed" });
    const pending = await Alert.countDocuments({ status: "pending" });

    res.json({
      totalUsers,
      totalAlerts,
      completed,
      pending,
    });
  }  catch (err) {
    console.log("ADMIN ERROR:", err.message); // 👈 IMPORTANT
    res.status(500).json({ msg: err.message });
  }
};