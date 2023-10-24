const mongoose = require("mongoose");

const SizeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    isArchived: { 
      type: Boolean, 
      default: false 
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Size", SizeSchema);
