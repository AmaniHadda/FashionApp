const mongoose = require("mongoose");

const etat = new mongoose.Schema(
  {
    qualite: { type: Number },
    marque : {type: Number},
    tendance : {type: Number},
    rarete : {type: Number},
    etat: {type:Number}
  },
  {
    timestamps: true,
  }
  );

module.exports = mongoose.model("etat", etat);
