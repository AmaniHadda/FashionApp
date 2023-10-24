const HabillementImages = require("../models/HabillementImage");
const fs = require('fs');
const path = require('path');
const Habillement=require("../models/Habillement")
const HabillementImageController = {
  create: async (req, res) => {
    try {
      const { name } = req.params;
      const habillement = await Habillement.findOne({ name });
  
      if (!habillement) {
        return res.status(404).json({ message: "Habillement not found." });
      }
  
      if (!req.file || !req.file.filename) {
        return res.status(400).json({ message: "File not provided." });
      }
  
      const hbImg = req.file.filename;
      const instance = new HabillementImages({
        habillementFK: habillement._id,
        hbImg: hbImg,
      });
  
      const persist = await instance.save();
      res.status(200).json({
        status: "SUCCESS",
        msg: "Vous avez ajouté une image à cet habillement",
        data: persist,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
 viewbyforeignkey: async (req, res) => {
    try {
      const mylist = await HabillementImages.find({habillementFK:req.params.habillementFK});
      console.log(mylist);
      res.status(200).json({
        status: "SUCCESS",
        msg: "Liste des images est chargé avec succés",
        data: mylist,
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  updatebyid: async (req, res) => {
    try {
      const id = req.params.id;
      const hbImg = req.body.hbImg;
      const instance = await HabillementImages.findById(id);
      instance.hbImg = hbImg;
      const saved = await instance.save();
      res.status(200).json({
        status: "SUCCESS",
        msg: "Vous avez effectué une opération de modification.",
        data: saved,
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  deletebyid: async (req, res) => {
    try {
      const instance = await HabillementImages.findByIdAndDelete(req.params.id);
      if (!instance) {
        res.status(404).json({
          message: "Une sous image de l'article est introuvable ",
        });
      }
      fs.unlinkSync(
        path.join(__dirname, "../uploads/habillements/hb_images/", instance?.hbImg)
      );

      res.status(200).json({
        message:
          "Une sous image de l'article a été supprimé avec succés" +
          req.params.id +
          ". " +
          "Notez que cette image a été détruit de votre serveur " 
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  },
};

module.exports = HabillementImageController;
