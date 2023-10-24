const mongoose = require("mongoose");

const ShoeSizeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    isArchived: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ShoeSize", ShoeSizeSchema);
