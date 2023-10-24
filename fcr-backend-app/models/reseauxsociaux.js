const mongoose = require ("mongoose");

const ResSocSchema = new mongoose.Schema({
    lienInstagram : {type: String},
    lienFacebook : {type: String},
    lienTiktok : {type: String},
    lienEmail : {type: String},
    isArchived:{type: Boolean, default:false}
},{
    timestamps : true
});
module.exports = mongoose.model("ReseauxSociaux", ResSocSchema);
