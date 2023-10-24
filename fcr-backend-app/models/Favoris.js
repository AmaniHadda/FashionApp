const mongoose = require("mongoose");

const FavorisSchema = new mongoose.Schema(
  {
    habillementFK: { type: mongoose.Schema.Types.ObjectId, ref: "Habillement" },
    user : {type: mongoose.Schema.Types.ObjectId, ref:"Users"}
  },
  {
    timestamps: true,
  }
  );

module.exports = mongoose.model("Favoris", FavorisSchema);
