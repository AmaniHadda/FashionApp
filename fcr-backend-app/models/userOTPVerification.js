const mongoose = require("mongoose");

const UserOTPVerificationSchema = new mongoose.Schema({
  userId: {
    type: String,
    trim: true,
  },
  otp: {
    type: String,
    trim: true,
  },
  createdAt: { Date },
  expiresAt: { Date },
});

module.exports = mongoose.model(
  "UserOTPVerification",
  UserOTPVerificationSchema
);
