const mongoose = require ("mongoose");
const gifSchema = new mongoose.Schema({
    gif : {type: String}
},{
    timestamps : true
});
const gifModel = mongoose.model("gif", gifSchema);
module.exports = gifModel;
