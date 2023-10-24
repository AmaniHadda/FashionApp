const mongoose = require ("mongoose");
const AproposSchema = new mongoose.Schema({
    phoneNumber1 : {type: String},
    phoneNumber2 : {type: String},
    rue : {type: String},
    ville : {type: String},


},{
    timestamps : true
});
const Apropos = mongoose.model("Apropos", AproposSchema);
module.exports = Apropos;