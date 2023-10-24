
const mongoose = require("mongoose");

const PasswordResetSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
  },
  resetString: {
    type: String,
    trim: true,
  },
  createdAt: { Date },
  expiresAt: { Date },
});

module.exports = mongoose.model(
  "PasswordReset",
  PasswordResetSchema
);

