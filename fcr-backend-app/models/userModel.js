
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
    },
    confirmPassword: {
      type: String,
    },
    role: {
      type: Number,
      default: 0, // 0 = user , 1 = admin
    },
    reservations: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "reservation",
    },
    address: {
      type: String,
      trim: true,
    },
    birthday: {
      type: Date,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
    },
    date: { type: Date },

    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dckkojyep/image/upload/v1648661505/avatar/t67net4bvcfn5q86z2hy.gif",
    },
    justificatif: {
      type: String,
    
    },
    subscribed: {
      type: Boolean,
      default: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    statusParrain: {
      type: Boolean,
      default: false,
    },
    blocked: {
      type: Boolean,
      default: false,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    isJustified: {
      type: String,
      default: "Pas de justificatif",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", userSchema);

