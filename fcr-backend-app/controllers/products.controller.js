const ProductModel = require("../models/ProductModel");
const productsController = {
  create: async (req, res) => {
    try {
      const { name, description, prix, lastBrand } = req.body;

      if (!name || !description) {
        res.status(400).json({
          code: 400,
          description: "Remplissez soigneusement les données",
          success: false,
          requestDate: Date.now(),
        });
      } else {
        const product = new ProductModel({
          name,
          description,
          prix,
          lastBrand,
        });
        product.photo=req.file.filename;
       const saved =  await product.save();
        res.status(200).json({
          code: 200,
          description: "produit sauvegardé avec succés",
          success: true,
          data : saved 
        });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  fetchProducts: async (req, res) => {
    try {
      const products = await ProductModel.find();
      if (products) {
        res.status(200).json({
          code: 200,
          description: "Liste des produits est affichée avec succés",
          data: products,
          success: true,
          requestDate: Date.now(),
        });
      } else {
        res.status(404).json({
          code: 404,
          description: "Aucune donnée n'a été trouvée",
          success: false,
          requestDate: Date.now(),
        });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  fetchProductsByLastBrand: async (req, res) => {
    try {
      const products = await ProductModel.find({ lastBrand: "Yes" });
      if (products) {
        res.status(200).json({
          code: 200,
          description: "Liste des derniéres tendances est affichée avec succés",
          data: products,
          success: true,
          requestDate: Date.now(),
        });
      } else {
        res.status(404).json({
          code: 404,
          description: "Aucune donnée n'a été trouvée",
          success: false,
          requestDate: Date.now(),
        });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  fetchProductByLastSeen: async (req, res) => {
    try {
      const products = await ProductModel.find({ lastSeen: true });
      if (products) {
        res.status(200).json({
          code: 200,
          description:
            "Liste des produits récemment vue est affichée avec succés",
          data: products,
          success: true,
          requestDate: Date.now(),
        });
      } else {
        res.status(404).json({
          code: 404,
          description: "Aucune donnée n'a été trouvée",
          success: false,
          requestDate: Date.now(),
        });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateProduit: async (req, res) => {
    try {
      const id = req.params.id;
      const { name, description, prix, lastBrand, isActive } = req.body;
      const product = await ProductModel.findOne({ id });

      if (product) {
        product.name = name || product.name;
        product.description = description || product.description;
        product.prix = prix || product.prix;
        product.lastBrand = lastBrand || product.lastBrand;

        product.isActive = isActive || product.isActive;
        await product.save();
        res.status(200).json({
          code: 200,
          description: "Produit affiché correctement",
          data: product,
          success: true,
          requestDate: Date.now(),
        });
      } else {
        res.status(404).json({
          code: 404,
          description: "produit introuvable",
          success: false,
          requestDate: Date.now(),
        });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateProductByClic: async (req, res) => {
    try {
      const id = req.params.id;
      const product = await ProductModel.findOne({ id });

      if (product) {
        product.lastSeen = true;
        await product.save();
        res.status(200).json({
          code: 200,
          description: "Produit est consulté récemment",
          data: product,
          success: true,
          requestDate: Date.now(),
        });
      } else {
        res.status(404).json({
          code: 404,
          description: "produit introuvable",
          success: false,
          requestDate: Date.now(),
        });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  fetchById: async (req, res) => {
    try {
      const id = req.params.id;
      const data = await ProductModel.findById({ id});
      if (data) {
        res.status(200).json({
          code: 200,
          description:
            "Détails du produit sont affichés",
          data: data[0],
          success: true,
          requestDate: Date.now(),
        });
      } else {
        res.status(404).json({
          code: 404,
          description: "Aucune donnée n'a été trouvée",
          success: false,
          requestDate: Date.now(),
        });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
module.exports = productsController;