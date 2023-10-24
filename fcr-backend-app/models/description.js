const mongoose = require ("mongoose");

const DescriptionSchema = new mongoose.Schema({
    description : {type: String},
    titre : {type: String},
    isArchived:{type: Boolean, default:false}
},{
    timestamps : true
});
module.exports = mongoose.model("Description", DescriptionSchema);
