const CommentLouer = require("../models/CommentLouer");

const CommentLouerController = {
  create: async (req, res) => {
    try {
      const { title, description, typeDevice } = req.body;
      if (!title) {
        res.status(400).json({ msg: "Champ obligatoire." });
      }
      const instance = new CommentLouer({
        title,
        description,
        typeDevice,
      });
      const persist = await instance.save();
      res.status(200).json({
        status: "SUCCESS",
        msg: "Element ajouté avec succés.",
        data: persist,
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  retrieve :async (req, res) => {
    try {
      const list = await CommentLouer.find(); 
      
      if (!list || list.length === 0) {
        return res.status(400).json({ msg: "Liste vide." });
      }
      
      res.status(200).json({
        status: "SUCCESS",
        msg: "Données chargées",
        data: list,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erreur lors de la récupération des données." });
    }
  },
  retrieveenabled: async (req, res) => {
    try {
      const list = await CommentLouer.find({ isArchived: false });
      if (!list) res.status(400).json({ msg: "Liste vide." });
      res.status(200).json({
        status: "SUCCESS",
        msg: "Données chargées",
        data: list,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  },
  retrieveenabledweb: async (req, res) => {
    try {
      const list = await CommentLouer.find(
        { isArchived: false,  typeDevice: "Web" },

      );
      if (!list) res.status(400).json({ msg: "Liste vide." });
      res.status(200).json({
        status: "SUCCESS",
        msg: "Données chargées",
        data: list,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  },
  retrieveenabledmobile: async (req, res) => {
    try {
      const list = await CommentLouer.find(
        { isArchived: false,  typeDevice: "Mobile" },
    
      );
      if (!list) res.status(400).json({ msg: "Liste vide." });
      res.status(200).json({
        status: "SUCCESS",
        msg: "Données chargées",
        data: list,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  },
  retrievedisabled: async (req, res) => {
    try {
      const list = CommentLouer.find({ isArchived: true });
      if (!list) res.status(400).json({ msg: "Liste vide." });
      res.status(200).json({
        status: "SUCCESS",
        msg: "Données chargées",
        data: list,
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  updatebyid : async (req, res) => {
    try {
      const id = req.params.id;
      const { title, description, typeDevice } = req.body;
  
      const instance = await CommentLouer.findById(id);
  
      if (typeof title !== 'undefined') {
        instance.title = title;
      }
  
      if (typeof description !== 'undefined') {
        instance.description = description;
      }
  
      if (typeof typeDevice !== 'undefined') {
        instance.typeDevice = typeDevice;
      }
  
      const saved = await instance.save();
      res.status(200).json({
        status: "SUCCESS",
        msg: "Information modifiée",
        data: saved,
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  archivebyid: async (req, res) => {
    try {
      const id = req.params.id;
      const instance = await CommentLouer.findById(id);
      instance.isArchived = true;
      const saved = await instance.save();
      res.status(200).json(saved);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  restorebyid: async (req, res) => {
    try {
      const id = req.params.id;
      const instance = await CommentLouer.findById(id);
      instance.isArchived = false;
      const saved = await instance.save();
      res.status(200).json(saved);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  deletebyid: async (req, res) => {
    try {
      const instance = await CommentLouer.findByIdAndDelete(req.params.id);
      if (!instance) {
        res.status(404).json({
          message: "Information introuvable " + instance?.title,
        });
      }
      res.status(200).json({
        message: "Information supprimée avec succés" + req.params.id,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  },
  retrievebyid: async (req, res) => {
    try {
      const id = req.params.id;
      const item = await CommentLouer.findById(id);
      if (!item) {
        res.status(401).json({ message: "Elément vide" });
      }
      res.status(201).json({
        status: "SUCCESS",
        msg: "Les informations sont affichées avec succés.",
        data: item,
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
};
module.exports = CommentLouerController;