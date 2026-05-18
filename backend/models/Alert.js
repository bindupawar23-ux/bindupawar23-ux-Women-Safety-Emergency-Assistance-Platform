const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    location: {
      lat: Number,
      lng: Number,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "completed"],
      default: "pending",
    },
    responderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
      createdAt: {
    type: Date,
    default: Date.now,
  },

  },
  { timestamps: true }
);


module.exports = mongoose.model("Alert", alertSchema);