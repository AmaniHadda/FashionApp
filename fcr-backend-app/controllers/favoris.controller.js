const FavorisModel = require("../models/Favoris");
const jwt_decode = require('jwt-decode');
const habillementModel = require("../models/Habillement");

const FavorisController = {
  save_: async (req, res) => {   
    try {
      const habillementFK = req.body.habillementFK;
      const idUser= req.body.idUser
      const favoris=await FavorisModel.findOne({habillementFK:habillementFK,user:idUser})
      console.log(favoris)
      if (favoris){
        return res.status(400).json({ status: "FAILED", });

      }
      const instance = new FavorisModel({
        habillementFK: habillementFK,
        user : idUser
      });
      const persist = await instance.save();
      res.status(200).json({
        status: "SUCCESS",
        msg: "Un habillement est ajouté dans la liste de vos favoris.",
        data: persist,
      });
    
      
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  },
   
  retrievebyuser: async (req, res) => {
    try {
      const user = req.body.user || req.params.user;
      const fav = await Favoris.find({ user: user })
        .populate("brandFK")
        .populate("seasonFK")
        .populate("subcategoryFK");
      res.status(200).json({
        status: "SUCCESS",
        msg: "La liste de vos favoris a été affiché avec succés.",
        data: fav,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  },

  retrieve: async (req, res) => {
    try {
      const user= req.params.id;
      const fav = await FavorisModel.find({user:user})
      .populate({
        path: 'habillementFK',
        populate: {
          path: 'brandFK',
          model: 'Brands'
        }
      })
      .populate({
        path: 'habillementFK',
        populate: {
          path: 'seasonFK',
          model: 'Seasons'
        }
      })
      .populate({
        path: 'habillementFK',
        populate: {
          path: 'subcategoryFK',
          model: 'SubCategories'
        }
      })
      
      res.status(200).json({
        status: "SUCCESS",
        msg: "La liste de vos favoris a été affiché avec succés.",
        data: fav,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  },

  deleteById: async (req, res) => {
    try {
      const id = req.params.id;
      const fav = await FavorisModel.findByIdAndDelete(id);
      if (!fav) {
        res.status(404).json({ message: "Article Introuvable " });
      }
      res.status(200).json({
        message:
          "Opération effectuée avec succés. Vous avez supprimé un article de votre lise de favoris.",
      });
    } catch (error) {
      res.json({ error: error });
    }
  },
};
module.exports = FavorisController;