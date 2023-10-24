const mongoose = require('mongoose');

const CommentcamarcheSchema = new mongoose.Schema({
  title: { type: String, required: true },
  descriptions: [{ type: String }], 
  isArchived: { type: Boolean, default: false }
},
{
  timestamps: true,
});

module.exports = mongoose.model("Commentcamarche", CommentcamarcheSchema);