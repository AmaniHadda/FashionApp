const Commentcamarche = require('../models/Commentcamarche');

const CommentcamarcheController = {
  createCommentcamarcheWithDescriptions : async (req, res) => {
    try {
      const { title, descriptions } = req.body;
  
      if (!title) {
        return res.status(400).json({ error: "The 'title' field is required." });
      }
  
      if (!Array.isArray(descriptions)) {
        return res.status(400).json({ error: "The 'descriptions' field must be an array." });
      }
  
      const newCommentcamarche = new Commentcamarche({
        title,
        descriptions,
      });
  
      const persist = await newCommentcamarche.save();
  
      return res.status(200).json({
        status: "SUCCESS",
        msg: "Element ajouté avec succès.",
        data: persist,
      });
    } catch (error) {
      console.error("Erreur lors de la création de l'enregistrement :", error);
      res.status(500).json({ error: "Erreur lors de la création de l'enregistrement." });
    }
  },
  getCommentcamarcheById: async (req,res) => {
    try {
        const id=req.params.id;
      const commentcamarche = await Commentcamarche.findById(id);
      if (!commentcamarche) {
        res.status(401).json({ message: "Elément vide" });
      }
      res.status(201).json({
        status: "SUCCESS",
        msg: "Les informations sont affichées avec succés.",
        data: commentcamarche,
      });
    } catch (error) {
      console.error("Erreur lors de la lecture de l'enregistrement :", error);
      throw error;
    }
  },
  retrieve :async (req, res) => {
    try {
      const list = await Commentcamarche.find(); 
      
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
  updateCommentcamarcheById : async (req, res) => {
    try {
      const id = req.params.id;
      const { title, editDescriptions } = req.body; 
  
      const existingCommentcamarche = await Commentcamarche.findById(id);
  
      existingCommentcamarche.descriptions = editDescriptions; 
  
      if (title) {
        existingCommentcamarche.title = title;
      }
  
      const saved = await existingCommentcamarche.save();
  
      res.status(200).json({
        status: "SUCCESS",
        msg: "Information modifiée",
        data: saved,
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'enregistrement :", error);
      res.status(500).json({ error: "Erreur lors de la mise à jour de l'enregistrement." });
    }
  },
  deleteCommentcamarcheById : async (req,res) => {
    const id=req.params.id
    try {
      const deletedCommentcamarche = await Commentcamarche.findByIdAndDelete(id);
      
      if (!deletedCommentcamarche) {
        throw new Error('No commentcamarche found with the provided ID');
      }
      res.status(200).json({
        status: "SUCCESS",
        msg: "Information supprimée",
        data: deletedCommentcamarche,
      });
    } catch (error) {
      console.error("Erreur lors de la suppression de l'enregistrement :", error);
      throw error;
    }
  },
  retrieveAllCommentcamarche: async () => {
    try {
      const commentcamarches = await Commentcamarche.find();
      return commentcamarches;
    } catch (error) {
      console.error("Erreur lors de la récupération des enregistrements :", error);
      throw error;
    }
  },
};

module.exports = CommentcamarcheController;