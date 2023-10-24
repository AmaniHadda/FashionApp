const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: { type: String, default: "", required: true },
    createdAt: { Date },
    isActive: { type: Boolean, default: true },
    isArchived: { type: Boolean, default: false },
    image: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Categories", CategorySchema);
