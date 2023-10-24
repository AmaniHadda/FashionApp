const mongoose = require("mongoose");

const ShopSchema = new mongoose.Schema(
  {
    titre: {
      type: String,
      required: true,
    },
    description: { 
      type: String, 

    },
    heure1: { 
        type: String, 
        required:true
      },
    heure2: { 
        type: String, 
      
      },
      lienMap: {
        type: String,
        validate: {
          validator: function (value) {
            // Expression régulière pour vérifier le format d'un lien de Google Maps
            const googleMapsRegex = /^https?:\/\/(?:www\.)?google\.com\/maps\/.*$/;
            return googleMapsRegex.test(value);
          },
          message: "Le lien Map doit être un lien valide de Google Maps",
        }}
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("shop", ShopSchema);


