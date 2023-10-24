const UserModel = require("../models/userModel");
const CategoriesModel = require("../models/Categories");
const mongoose = require("mongoose");

const { v4: uuidv4 } = require("uuid");
const adminCtrl = {
  addCategory: async (req, res) => {
    try {
      const { name, description } = req.body;
      if (!name || !description) {
        res.status(400).json({
          code: 400,
          description: "Veuillez ajouter des informations supplimentaires",
          success: false,
          requestDate: Date.now(),
        });
      } else {
        const category = new CategoriesModel({
          id: uuidv4(),
          name: name,
          description: description,
        });
        await category.save();
        res.status(200).json({
          code: 200,
          description: "category ajouter avec success",
          success: true,
          requestDate: Date.now(),
        });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  fetchCategory: async (req, res) => {
    try {
      const categories = await CategoriesModel.find();
      if (categories) {
        res.status(200).json({
          code: 200,
          description: "category ajouter avec success",
          data: categories,
          success: true,
          requestDate: Date.now(),
        });
      } else {
        res.status(404).json({
          code: 404,
          description: "categories introuvable",
          success: false,
          requestDate: Date.now(),
        });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteById: async (req, res) => {
    try {
      const id = req.params.id;
      const response = await CategoriesModel.findByIdAndDelete(id);
      if (!response) {
        res.status(404).json({ message: "Sous catégorie Introuvable " });
      }

      res.status(200).json({
        message: "Opération effectuée avec succés.",
      });
    } catch (error) {
      res.json({ error: error });
    }
  },
  getCategoryById: async (req, res) => {
    try {
      const category = await CategoriesModel.findById(req.params.id);
      if (!category) {
        return res.status(404).json({ msg: "Category not found" });
      }
      res.status(200).json(category);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  archiveCategory: async (req, res) => {
    const { id } = req.params;
    try {
      const category = await CategoriesModel.findById(id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      category.isArchived = !category.isArchived;
      await category.save();
      return res
        .status(200)
        .json({ message: "Category archived/unarchived successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  },
  fetchUnarchivedCategory: async (req, res) => {
    try {
      const categories = await CategoriesModel.find({ isArchived: false });
  
      if (categories.length > 0) {
        res.status(200).json({
          code: 200,
          description: "Categories retrieved successfully",
          data: categories,
          success: true,
          requestDate: Date.now(),
        });
      } else {
        res.status(404).json({
          code: 404,
          description: "No non-archived categories found",
          success: false,
          requestDate: Date.now(),
        });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
 searchCategory: async (req, res, next) => {
    try {
      console.log(req.params.search.trim())
  
      const instance=await CategoriesModel.find({
       $or:[
        {name: { $regex: `${req.params.search.trim()}`, $options: "i" }}, 
        {description: { $regex: `${req.params.search.trim()}`, $options: "i" }},
       ], isArchived:false
      });
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
module.exports = adminCtrl;