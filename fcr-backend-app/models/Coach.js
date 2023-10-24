const mongoose = require("mongoose");

const CoashSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique:true },
    name: {
      type: String,
      required: true
    },
    phone: { type: String, required: true},
    status:{type:Boolean, default: false},
    description: {type:String},
    preferences: {type:String}
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Coach", CoashSchema);
