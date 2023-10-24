const mongoose = require ('mongoose');

const HabillementImageSchema = new mongoose.Schema({
    habillementFK: { type: mongoose.Schema.Types.ObjectId, ref: "Habillement" },
    hbImg : {type : String},
},{
    timestamps : true
});

module.exports = mongoose.model("HabillementImage", HabillementImageSchema);