const mongoose = require ("mongoose");

const BannerSchema = new mongoose.Schema({
    description1 : {type: String},
    description2 : {type: String},
    description3 : {type: String},
    image : {type: String},

},{
    timestamps : true
});
module.exports = mongoose.model("banner", BannerSchema);
