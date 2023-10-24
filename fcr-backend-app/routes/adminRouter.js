const router = require("express").Router();
const mongoose = require("mongoose");
const CategoriesModel = require("../models/Categories");
const adminCtrl = require("../controllers/admin.Controller");
const _admin = require('../middleware/authAdmin');  

router.post("/addCategory",_admin, adminCtrl.addCategory);
router.get("/fetchCategory", adminCtrl.fetchCategory);
router.get("/fetchUnarchivedCategory", adminCtrl.fetchUnarchivedCategory);
router.get("/search/:search",_admin, adminCtrl.searchCategory);
router.put("/updateCategory/:id",_admin, async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        code: 400,
        description: "Invalid category ID",
        success: false,
        requestDate: Date.now(),
      });
    }

    const instance = await CategoriesModel.findByIdAndUpdate(
      id,
      { $set: { name, description } },
      { new: true }
    );

    if (!instance) {
      return res.status(404).json({
        code: 404,
        description: "Category not found",
        success: false,
        requestDate: Date.now(),
      });
    }

    res.json(instance);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});
router.delete("/deleteCategory/:id",_admin, adminCtrl.deleteById);
router.get("/getCategory/:id",_admin, adminCtrl.getCategoryById);
router.put("/categories/:id/archive",_admin, adminCtrl.archiveCategory);
module.exports = router;
