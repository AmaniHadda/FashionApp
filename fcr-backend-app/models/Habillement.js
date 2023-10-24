const mongoose = require("mongoose");

const HabillementSchema = new mongoose.Schema(
  {
    img: { type: String, unique: true },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: { type: String, default: "" },
    price: { type: Number },
    newPrice: { type: Number, default: 0 },
    subcategoryFK: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategories" },
    seasonFK: { type: mongoose.Schema.Types.ObjectId, ref: "Seasons" },
    brandFK: { type: mongoose.Schema.Types.ObjectId, ref: "Brands" },
    sizes: { type: [String] },
    shoesizes: { type: [String] },
    isNew_: { type: Boolean, default: false },
    isRecentlySeen: { type: Boolean },
    isArchived: { type: Boolean, default: false },
    isVenteFlash: { type: Boolean, default: false },
    dateRecentlySeen: { type: Date },
    proprietaire: { type: mongoose.Schema.Types.ObjectId, ref: "ParrainSchema" },
    dateDepot: { type: Date },
    dateEffectifRamacage: { type: Date },
    lieu: { type: String },
    etatDepot:{type: mongoose.Schema.Types.ObjectId, ref: "etat"},
    //etatLivraison:{type: mongoose.Schema.Types.ObjectId, ref: "etat"}

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Habillement", HabillementSchema);
