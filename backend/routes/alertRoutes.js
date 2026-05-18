const express = require("express");
const router = express.Router();

const {
  createAlert,
  getAlerts,
  acceptAlert,
} = require("../controllers/alertController");

// POST /api/alerts
router.post("/", createAlert);

// GET /api/alerts
router.get("/", getAlerts);

// PUT /api/alerts/accept/:id
router.put("/accept/:id", acceptAlert);
router.post("/", (req, res) => {
  console.log("Alert received:", req.body);
  res.json({ msg: "Alert received", data: req.body });
});

module.exports = router;