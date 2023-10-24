
const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now }, 
    eventType: { type: String, required: true },
    coachName: { type: mongoose.Schema.Types.ObjectId, ref: "Coach" },
    status: { type: String, default: "En attente" },
    rejectedReason: { type: String },
    otherDates: { type: [Date] },
    isCanceled: { type: Boolean, default: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    habillements: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Habillement" },
    ],
    isArchived: { type: Boolean, default: false},
  },
  { timestamps: true }
);

const Meeting = mongoose.model("Meeting", meetingSchema);

module.exports = Meeting;

