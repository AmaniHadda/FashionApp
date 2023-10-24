const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  description: { type: String },
  photo: { type: String },
  prix : { type: Number },
  lastBrand : { type : String},
  lastSeen : { type: Boolean , default : false},
  isActive: { type: Boolean, default: true },
  isArchived: { type: Boolean, default: false },
});

module.exports = mongoose.model("Products", ProductSchema);
