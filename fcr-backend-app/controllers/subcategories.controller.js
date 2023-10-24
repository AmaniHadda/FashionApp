const SubCategoryModel = require("../models/SubCategories");
const CategoryModel=require("../models/Categories");

const SubCategoriesController = {
  create: async (req, res) => {
    try {
      const { name, category } = req.body;
      const img = req.file.filename;
  
      const categoryObj = await CategoryModel.findOne({ name: category });
  
      if (!categoryObj) {
        return res.status(403).json({
          error: "Category not found",
        });
      }
  
      const subcategory = new SubCategoryModel({
        name: name,
        categoryFK: categoryObj._id,
        img: img,
      });
  
      await subcategory.save();
      res.json({
        status: "SUCCESS",
        msg: "L'opération a été effectuée avec succès.",
        data: subcategory,
      });
    } catch (error) {
      console.error("Error creating subcategory:", error);
      return res.status(500).json({ error: "Error creating subcategory" });
    }
  },
 
 updateById :async (req, res) => {
    try {
      const id = req.params.id;
      const { name, category } = req.body;
  
      const updateFields = {};
      if (name) {
        updateFields.name = name;
      }
      if (category) {
        const categoryInstance = await CategoryModel.findOne({ name: category });
        if (!categoryInstance) {
          return res.status(403).json({
            error: "Category not found",
          });
        }
        updateFields.categoryFK = categoryInstance._id;
      }
  
      if (req.file) {
        updateFields.img = req.file.filename;
      }
  
      try {
        const subcategory = await SubCategoryModel.findByIdAndUpdate(
          id,
          updateFields,
          { new: true }
        );
  
        return res.json(subcategory);
      } catch (error) {
        console.error("Error updating subcategory:", error);
        return res.status(500).json({ error: "Error updating subcategory" });
      }
    } catch (error) {
      console.error("Error updating subcategory:", error);
      return res.status(500).json({ error: "Error updating subcategory" });
    }
  },
 updatephotoById: async (req, res) => {
    const id = req.params.id;
    const img=req.body.img;
    const instance = await SubCategoryModel.findById(id);
    instance.img = img;
    const saved = await instance.save();
    res.json(saved);
  },
  archiveById: async (req, res) => {
    const id = req.params.id;
    const instance = await SubCategoryModel.findById(id);
    instance.isArchived = true;
    const saved = await instance.save();
    res.json(saved);
  },
  restoreById: async (req, res) => {
    const id = req.params.id;
    const instance = await SubCategoryModel.findById(id);
    instance.isArchived = false;
    const saved = await instance.save();
    res.json(saved);
  },
  retrieveEnabled: async (req, res) => {
    try {
      const list = await SubCategoryModel.find({ isArchived: false });
      if (!list) {
        res.status(401).json({ message: "Liste vide" });
      }
      res.status(201).json({
        status: "SUCCESS",
        msg: "Liste des sous catégories activées est affichée avec succés.",
        data: list,
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  retrieveDisabled: async (req, res) => {
    try {
      const list = await SubCategoryModel.find({ isArchived: true });
      if (!list) {
        res.status(401).json({ message: "Liste vide" });
      }
      res.status(201).json({
        status: "SUCCESS",
        msg: "Liste des sous catégories désactivées est affichée avec succés.",
        data: list,
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  retrieve: async (req, res) => {
    try {
      const list = await SubCategoryModel.find().populate("categoryFK");
      if (!list) {
        res.status(401).json({ message: "Liste vide" });
      }
      res.status(200).json({
        status: "SUCCESS",
        msg: "Liste des sous catégories est affichée avec succés.",
        data: list,
      });
    } catch (error) {
      res.status(500).json({ error: error });
      console.log(error)
    }
  },
  retrieveByCategoryFK: async (req, res) => {
    try {
      const categoryFK = req.params.categoryFK;
      const list = await SubCategoryModel.find({
        categoryFK: categoryFK,
      });
      if (!list) {
        res.status(401).json({ message: "Liste vide" });
      }
      res.status(201).json({
        status: "SUCCESS",
        msg: "Liste des habillements par catégorie est affichée avec succés.",
        data: list,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  },
  deleteById: async (req, res) => {
    try {
      const id = req.params.id;
      const response = await SubCategoryModel.findByIdAndDelete(id);
      if (!response) {
        res.status(404).json({ message: "Sous catégorie Introuvable " });
      }

      res.status(200).json({
        message:
          "Opération effectuée avec succés." 
      });
    } catch (error) {
      res.json({ error: error });
    }
  },
  retrieveById :async (req, res) => {
    try {
      const id = req.params.id;
      const subcategory = await SubCategoryModel.findById(id).populate("categoryFK");
  
      if (!subcategory) {
        return res.status(404).json({ error: "Subcategory not found" });
      }
  
      return res.json(subcategory);
    } catch (error) {
      console.error("Error retrieving subcategory:", error);
      return res.status(500).json({ error: "Error retrieving subcategory" });
    }
  },
  searchSubCategory: async (req, res, next) => {
    try {
      const category= await CategoryModel.findOne({name: { $regex: `${req.params.search.trim()}`, $options: "i" }})
      console.log(req.params.search.trim()) 
      const query={
        $or:[
         {name: { $regex: `${req.params.search.trim()}`, $options: "i" }}
        ], isArchived:false
       }
      if (category){
        query.$or.push({ categoryFK: category._id });
      }
     const instance=await SubCategoryModel.find(query).populate("categoryFK");
      console.log(instance)
      res.json({
        status: "SUCCESS",
        data:instance,
        message:"données affichées avec succees .",
      });
    } catch (error) {
      console.log(error)
      res.json({
        status: "Failed",
        message:error
      });
    }
  },
  
};
module.exports = SubCategoriesController;