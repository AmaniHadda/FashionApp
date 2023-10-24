const mongoose = require ('mongoose');

const VenteFlashSchema = new mongoose.Schema({

    habillementFK: {type : mongoose.Schema.Types.ObjectId, ref:"Habillement", unique:true},
    reduction : {type: Number},
    priceWithPromotion : { type : Number },

    dateLimite : { type : Date },

})

module.exports = mongoose.model("VenteFlash", VenteFlashSchema);