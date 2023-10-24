
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name!"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email!"],
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    object: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
    },
    respond: {
      type: String,
    },
    status: {
      type: String,
      default: "En attente",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contacts", contactSchema);

