const mongoose = require ('mongoose');

const CommentLouerSchema = new mongoose.Schema({
    title : { type : String, unique : true},
    description :  {type : String},
    typeDevice : {type : String},
    isArchived : {type : Boolean, default: false}
});

module.exports =  mongoose.model("CommentLouer", CommentLouerSchema);

