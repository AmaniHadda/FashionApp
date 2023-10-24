const mongoose = require ("mongoose");
const logoSchema = new mongoose.Schema({
    logo : {type: String}
},{
    timestamps : true
});
const logoModel = mongoose.model("logo", logoSchema);
module.exports = logoModel;