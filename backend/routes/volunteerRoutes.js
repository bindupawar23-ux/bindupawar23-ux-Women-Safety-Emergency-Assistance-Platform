const express = require("express");
const router = express.Router();
const { updateLocation } = require("../controllers/volunteerController");

const {
  registerVolunteer,
  loginVolunteer,
  getAlertsForVolunteer,
  acceptAlert,
} = require("../controllers/volunteerController");

// Register
router.post("/register", registerVolunteer);


// Login
router.post("/login", loginVolunteer);

// Get alerts
router.get("/alerts", getAlertsForVolunteer);

// Accept alert
router.put("/alerts/:id", acceptAlert);
router.put("/location/:id", updateLocation);

module.exports = router;