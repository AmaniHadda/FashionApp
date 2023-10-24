const mongoose = require ("mongoose");

const AbonnementSchema = new mongoose.Schema({
    cover : {type: String, unique : true},
    title : {type: String, unique: true},
    reduction :[{type: Number}],
    description : {type : String},
    price : [{type: Number}],   
    pricePromotion : [{type: Number}],
    isArchived : {type: Boolean, default:false}

},{
    timestamps : true
});
const AbonnementModel = mongoose.model("Abonnement", AbonnementSchema);

module.exports = AbonnementModel;