const Volunteer = require("../models/Volunteer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.registerVolunteer = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const volunteer = new Volunteer({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    await volunteer.save();

    res.json({ msg: "Volunteer registered" });
  } catch (err) {
    res.status(500).json({ msg: "Error registering volunteer" });
  }
};

// LOGIN
exports.loginVolunteer = async (req, res) => {
  try {
    const { email, password } = req.body;

    const volunteer = await Volunteer.findOne({ email });
    if (!volunteer) return res.status(404).json({ msg: "Not found" });

    const isMatch = await bcrypt.compare(password, volunteer.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: volunteer._id }, "secretkey");

    res.json({ token, volunteer });
  } catch (err) {
    res.status(500).json({ msg: "Login error" });
  }
};

// GET ALL ALERTS FOR VOLUNTEER
const Alert = require("../models/Alert");

exports.getAlertsForVolunteer = async (req, res) => {
  try {
    const alerts = await Alert.find({ status: "pending" });
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching alerts" });
  }
};

// ACCEPT ALERT
exports.acceptAlert = async (req, res) => {
  try {
    const alert = await Alert.findById(req.params.id);

    if (!alert) return res.status(404).json({ msg: "Alert not found" });

    alert.status = "accepted";
    await alert.save();

    res.json({ msg: "Alert accepted", alert });
  } catch (err) {
    res.status(500).json({ msg: "Error accepting alert" });
  }
};
exports.updateLocation = async (req, res) => {
  try {
    const { lat, lng } = req.body;

    console.log("BODY:", req.body);
    console.log("ID:", req.params.id);

    const volunteer = await Volunteer.findById(req.params.id);

    if (!volunteer) {
      return res.status(404).json({ msg: "Volunteer not found" });
    }

    volunteer.location = { lat, lng };

    await volunteer.save();

    res.json({ msg: "Location updated successfully" });
  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
};