const mongoose = require("mongoose");

const BrandVideoSchema = new mongoose.Schema({
  linkvideo: { type: String, unique: true },
  uploadvideo: { type: String, unique: true },
  pickVideo: { type: Boolean, default: false },
});

module.exports = mongoose.model("BrandVideo", BrandVideoSchema);
