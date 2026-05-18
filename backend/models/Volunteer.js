const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  location: {
  lat: Number,
  lng: Number,
},
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Volunteer", volunteerSchema);