const mongoose = require("mongoose");

const SubCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    isArchived: { type: Boolean, default: false },
    categoryFK : { type : mongoose.Schema.Types.ObjectId, ref:"Categories"},
    img : {type : String},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SubCategories", SubCategorySchema);
