const SizeModel = require("../models/Size");
const SizeController = {
  create: async (req, res) => {
    try {
      const name = req.body.name
      const instance = new SizeModel({
        name,
      });
      const persist = await instance.save();
      return res.status(201).json({
        success: "SUCCESS",
        msg: "Opération effectuée avec succés",
        data: persist,
      });
    } catch (error) {
      console.log(error);
    }
  },

  find: async (req, res) => {
    try {
      const list = await SizeModel.find();
      if (!list) {
        res.status(401).json({ message: "Liste vide" });
      }
      res.status(201).json({
        status: "SUCCESS",
        msg: "Liste des tailles est affichée avec succés.",
        data: list,
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  retrieveEnabled: async (req, res) => {
    try {
      const list = await SizeModel.find({ isArchived: false });
      if (!list) {
        res.status(401).json({ message: "Liste vide" });
      }
      res.status(201).json({
        status: "SUCCESS",
        msg: "Liste des tailles est affichée avec succés.",
        data: list,
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  retrieveDisabled: async (req, res) => {
    try {
      const list = await SizeModel.find({ isArchived: true });
      if (!list) {
        res.status(401).json({ message: "Liste vide" });
      }
      res.status(201).json({
        status: "SUCCESS",
        msg: "Liste des tailles désactivées est affichée avec succés.",
        data: list,
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  updateById: async (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const instance = await SizeModel.findById(id);
    instance.name = name;
    const saved = await instance.save();
    res.json(saved);
  },
  archiveById: async (req, res) => {
    const id = req.params.id;
    const instance = await SizeModel.findById(id);
    instance.isArchived = true;
    const saved = await instance.save();
    res.json(saved);
  },
  restoreById: async (req, res) => {
    const id = req.params.id;
    const instance = await SizeModel.findById(id);
    instance.isArchived = false;
    const saved = await instance.save();
    res.json(saved);
  },
  deleteById: async (req, res) => {
    try {
      const id = req.params.id;
      const response = await SizeModel.findByIdAndDelete(id);
      if (!response) {
        res.status(404).json({ message: "La taille est Introuvable " });
      }

      res.status(200).json({
        message: "Opération effectuée avec succés.",
      });
    } catch (error) {
      res.json({ error: error });
    }
  },
};
module.exports = SizeController;
