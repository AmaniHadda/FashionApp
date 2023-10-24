const mongoose = require ("mongoose");

const InventaireSchema = new mongoose.Schema({
    locataire: { type: mongoose.Schema.Types.ObjectId, ref: "ParrainSchema" },
    habillement : { type: mongoose.Schema.Types.ObjectId, ref: "Habillement" },
    dateLocation : {type: Date},
    dateRecuperation : {type: Date},
    dateEffectifRecuperation : {type : Date},
    price : {type: Number},  
    isArchived : {type: Boolean, default:false},
    etatLivraison: {type: mongoose.Schema.Types.ObjectId, ref: "etat" },
    etatRecuperation: {type: mongoose.Schema.Types.ObjectId, ref: "etat" },
 
},{
    timestamps : true
});
const InventaireModel = mongoose.model("InventaireSchema", InventaireSchema);

module.exports = InventaireModel;