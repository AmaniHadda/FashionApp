const Habillement = require("../models/Habillement");

const FilterHabillementController = {   
  filterBySeason: async (req, res) => {
    try {
      const seasonFK = req.params.seasonFK;
      const response = await Habillement.find({ seasonFK: seasonFK, isArchived: false })
      .populate("brandFK")
      .populate("seasonFK")
      .populate("subcategoryFK");
      res.status(201).json({
        status: "SUCCESS",
        msg: "Résultat de l'opération.",
        data: response,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  },
  filterByBrand: async (req, res) => {
    try {
      const brandFK = req.params.brandFK;
      const response = await Habillement.find({ brandFK: brandFK, isArchived: false })
      .populate("brandFK")
      .populate("seasonFK")
      .populate("subcategoryFK");
      res.status(201).json({
        status: "SUCCESS",
        msg: "Résultat de l'opération.",
        data: response,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  },
  filterBySize: async (req, res) => {
    try {
      const [size] = [req.params.size];
      const response = await Habillement.find({ sizes: size, isArchived : false })
      .populate("brandFK")
      .populate("seasonFK")
      .populate("subcategoryFK");
      
      res.status(201).json({
        status: "SUCCESS",
        msg: "Résultat de l'opération.",
        data: response,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  },
  filterByShoeSize: async (req, res) => {
    try {
      const [shoesizes] = [req.params.shoesizes];
      const response = await Habillement.find({ shoesizes: shoesizes, isArchived : false })        
      .populate("brandFK")
      .populate("seasonFK")
      .populate("subcategoryFK");;
      res.status(201).json({
        status: "SUCCESS",
        msg: "Résultat de l'opération.",
        data: response,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  },
  filterByNewest: async (req, res) => {
    try {
      const response = await Habillement.find({isNew_: true,isArchived: false})
      .populate("brandFK")
      .populate("seasonFK")
      .populate("subcategoryFK")
      .populate("proprietaire")
      .populate("etatDepot");
      
      res.status(201).json({
        status: "SUCCESS",
        msg: "Résultat de l'opération.",
        data: response,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  },
  filterByIsVenteFlash: async (req, res) => {
    try {
      const response = await Habillement.find({isVenteFlash: true,isArchived: false})
      .populate("brandFK")
      .populate("seasonFK")
      .populate("subcategoryFK")
      .populate("proprietaire")
      .populate("etatDepot");     
      res.status(201).json({
        status: "SUCCESS",
        msg: "Résultat de l'opération.",
        data: response,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  },
  filterBySubCategory: async(req,res)=>{
    try {
      const response= await Habillement.find({subcategoryFK: req.params.id,isArchived: false})
      .populate("brandFK")
      .populate("seasonFK")
      .populate("subcategoryFK");
      res.status(201).json({
        status: "SUCCESS",
        msg: "Résultat de l'opération.",
        data: response,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  }
};
module.exports = FilterHabillementController;