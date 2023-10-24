const mongoose = require("mongoose");

const ParrainSchema = new mongoose.Schema({
idUser: [{type: mongoose.Schema.Types.ObjectId, ref: "Users" }],

  email: {
    type: String,
    unique: true,
  },
  phone: {
    type: String,
    trim:true
  },
  status: {
    type: Boolean,
    default:false
  },
  codeParrain: {
    type: String,
    trim: true,
  }},{
    timestamps : true
});

module.exports = mongoose.model(
  "ParrainSchema",
  ParrainSchema
);