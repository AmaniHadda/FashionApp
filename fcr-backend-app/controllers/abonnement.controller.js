const AbonnementModel = require("../models/Abonnement");

const AbonnementController = {
  create: async (req, res) => {
    try {
      const { title, description, price1, price3, price6, price12, priceRed1, priceRed3, priceRed6, priceRed12 } = req.body;
      let price=[parseFloat(price1), parseFloat(price3),parseFloat(price6), parseFloat(price12)]
      let reduction=[parseFloat(priceRed1),parseFloat(priceRed3),parseFloat(priceRed6),parseFloat(priceRed12)]
      let convertedPrice = 0;
      let priceWithPromotion = 0;
      let TabpriceWithPromotion=[];
      if (reduction.length != 0) {
        for (let index = 0; index < price.length; index++) {
          convertedPrice = price[index] * (reduction[index] / 100);
          priceWithPromotion = (price[index] - convertedPrice); 
          console.log(price[index])
          TabpriceWithPromotion.push(parseFloat(priceWithPromotion));
        }
      } else {
        TabpriceWithPromotion = price;
      }
      console.log(TabpriceWithPromotion)
      const instance = new AbonnementModel({
        title,
        reduction,
        description,
        price,
        pricePromotion: TabpriceWithPromotion,
      });
      instance.cover=req.file.filename;
      const persist = await instance.save();
      res.status(200).json({
        status: "SUCCESS",
        msg: "Abonnement crée avec succés",
        data: persist,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  },
  retrieve: async (req, res) => {
    try {
      const list = await AbonnementModel.find();
      if (!list) {
        res.status(401).json({ message: "Liste vide" });
      }
      res.status(201).json({
        status: "SUCCESS",
        msg: "Liste des abonnements est affichée avec succés.",
        data: list,
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  retrievebyid: async (req, res) => {
    try {
      const id = req.params.id;
      const item = await AbonnementModel.findById(id);
      if (!item) {
        res.status(401).json({ message: "élément vide" });
      }
      res.status(201).json({
        status: "SUCCESS",
        msg: "Abonnement est affiché avec succés.",
        data: item,
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  retrievebyenable: async (req, res) => {
    try {
      const list = await AbonnementModel.find({ isArchived: false }).sort({reduction: 1});
      if (!list) {
        res.status(401).json({ message: "Liste vide" });
      }
      res.status(201).json({
        status: "SUCCESS",
        msg: "Liste des abonnements activés est affichée avec succés.",
        data: list,
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  retrievebydisable: async (req, res) => {
    try {
      const list = await AbonnementModel.find({ isArchived: true });
      if (!list) {
        res.status(401).json({ message: "Liste vide" });
      }
      res.status(201).json({
        status: "SUCCESS",
        msg: "Liste des abonnements désactivés est affichée avec succés.",
        data: list,
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  updatebyid: async (req, res) => {
    try {
      const id = req.params.id;
      const { title, description, price1, price3, price6, price12, priceRed1, priceRed3, priceRed6, priceRed12 } =req.body;
      let convertPromotion = 0;
      let price=[parseFloat(price1), parseFloat(price3),parseFloat(price6), parseFloat(price12)]
      let reduction=[parseFloat(priceRed1),parseFloat(priceRed3),parseFloat(priceRed6),parseFloat(priceRed12)]     
      let convertedPrice = 0;
      let priceWithPromotion = 0;
      let TabpriceWithPromotion=[];
      if (reduction.length != 0) {
        for (let index = 0; index < price.length; index++) {
          convertedPrice = price[index] * (reduction[index] / 100);
          priceWithPromotion = (price[index] - convertedPrice); 
          console.log(price[index])
          TabpriceWithPromotion.push(parseFloat(priceWithPromotion));
        }
      } else {
        TabpriceWithPromotion = price;
      }    
      const instance = await AbonnementModel.findById(id);
      if(req.file){
        instance.cover = req.file.filename;
      }
      instance.title = title;
      instance.reduction = reduction;
      instance.description = description;
      instance.price = price;
      instance.pricePromotion = TabpriceWithPromotion;
      const saved = await instance.save();
      res.status(200).json(saved);
    } catch (error) {
      console.log(error)
    }
  },
  updatecoverbyid: async (req, res) => {
    try {
      const id = req.params.id.trim();
      const { cover } = req.body;
      const instance = await AbonnementModel.findById(id);
      instance.cover = cover;
      const saved = await instance.save();
      res.status(200).json(saved);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  enablebyid: async (req, res) => {
    try {
      const id = req.params.id;
      const instance = await AbonnementModel.findById(id);
      instance.isArchived = false;
      const saved = await instance.save();
      res.status(200).json(saved);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  disablebyid: async (req, res) => {
    try {
      const id = req.params.id;
      const instance = await AbonnementModel.findById(id);
      instance.isArchived = true;
      const saved = await instance.save();
      res.status(200).json(saved);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  deleteById: async (req, res) => {
    try {
      const instance = await AbonnementModel.findByIdAndDelete(req.params.id);
      if (!instance) {
        res.status(404).json({
          message: "Article introuvable " + instance?.title,
        });
      }
      res.status(200).json({
        message:
          "Abonnement supprimé avec succés" +
          req.params.id +
          ". " +
          "Notez que cette image a été détruit de votre serveur " +
          instance?.cover,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  },
  searchAbonnement: async (req, res, next) => {
    try {
      console.log(req.params.search.trim())
      const instance=await AbonnementModel.find({
       $or:[
        {title: { $regex: `${req.params.search.trim()}`, $options: "i" }}, 
        {description: { $regex: `${req.params.search.trim()}`, $options: "i" }},
        {
          $expr: {
            $regexMatch: {
              input: { $toString: "$reduction" },
              regex: req.params.search.trim(),
              options: "i",
            },
          },
        },
        {
          $expr: {
            $regexMatch: {
              input: { $toString: "$duration" },
              regex: req.params.search.trim(),
              options: "i",
            },
          },
        },
        {
          $expr: {
            $regexMatch: {
              input: { $toString: "$pricePromotion" },
              regex: req.params.search.trim(),
              options: "i",
            },
          },
        },
        {
          $expr: {
            $regexMatch: {
              input: { $toString: "$price" },
              regex: req.params.search.trim(),
              options: "i",
            },
          },
        },
       ] , isArchived:false
                       
      });
      console.log(instance)
      res.json({
        status: "SUCCESS",
        data:instance,
        message:"données affichées avec succees .",
      });
    } catch (error) {
      res.json({
        status: "Failed",
        message:error
      });
    }
  }
};

module.exports = AbonnementController;