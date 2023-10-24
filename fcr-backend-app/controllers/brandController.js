const BrandModel = require("../models/Brand");

const BrandController = {
  create: async (req, res) => {
    try {
      const name = req.body.name;
      const instance = new BrandModel({ name });
      const persist = await instance.save();
      return res.status(201).json({
        success: "SUCCESS",
        msg: "Opération effectuée avec succés",
        data: persist,
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  retrieve: async (req, res) => {
    try {
      const list = await BrandModel.find();
      if (!list) {
        res.status(401).json({ message: "Liste vide" });
      }
      res.status(201).json({
        status: "SUCCESS",
        msg: "Liste des marques est affichée avec succés.",
        data: list,
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  retrieveEnabled: async (req, res) => {
    try {
      const list = await BrandModel.find({ isArchived: false });
      if (!list) {
        res.status(401).json({ message: "Liste vide" });
      }
      res.status(201).json({
        status: "SUCCESS",
        msg: "Liste des marques activées est affichée avec succés.",
        data: list,
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  retrieveDisabled: async (req, res) => {
    try {
      const list = await BrandModel.find({ isArchived: true });
      if (!list) {
        res.status(401).json({ message: "Liste vide" });
      }
      res.status(201).json({
        status: "SUCCESS",
        msg: "Liste des marques désactivées est affichée avec succés.",
        data: list,
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  updateById: async (req, res) => {
    const id = req.params.id;
    const { name } = req.body;
    const instance = await BrandModel.findById(id);
    instance.name = name;
    const saved = await instance.save();
    res.json(saved);
  },
  deleteById: async (req, res) => {
    try {
      const id = req.params.id;
      const response = await BrandModel.findByIdAndDelete(id);
      if (!response) {
        res.status(404).json({ message: "Marque Introuvable " });
      }

      res.status(200).json({
        message: "Opération effectuée avec succés.",
      });
    } catch (error) {
      res.json({ error: error });
    }
  },
  archiveById: async (req, res) => {
    const id = req.params.id;
    const instance = await BrandModel.findById(id);
    instance.isArchived = true;
    const saved = await instance.save();
    res.json(saved);
  },
  restoreById: async (req, res) => {
    const id = req.params.id;
    const instance = await BrandModel.findById(id);
    instance.isArchived = true;
    const saved = await instance.save();
    res.json(saved);
  },
};
module.exports = BrandController;
