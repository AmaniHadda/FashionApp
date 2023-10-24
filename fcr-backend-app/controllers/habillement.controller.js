const HabillementModel = require("../models/Habillement");
const fs = require("fs");
const path = require("path");
const { SendNewsletter } = require("./newsletter.controller");
const BrandModel = require('../models/Brand')
const SubcategoryModel = require("../models/SubCategories")
const SeasonModel = require("../models/Season")
const Sizes = require("../models/Size")
const shoeSizes = require("../models/ShoeSize")
const HabillementImage = require("../models/HabillementImage")
const Etat = require("../models/etat")
const Parrain = require("../models/Parrainage");
const VenteFlash = require("../models/VenteFlash");

const HabillementController = {
  create: async (req, res) => {
    try {
      const {
        name,
        description,
        price,
        subcategoryFK,
        seasonFK,
        brandFK,
        isNew_,
        sizes,
        shoesizes,
        proprietaire,
        dateDepot,
        dateEffectifRamacage,
        lieu,
        qualite,
        marque,
        tendance,
        rarete
      } = req.body;
      const img = req.file.filename;

      if (!name || !price || !subcategoryFK || !brandFK) {
        res.status(401).json({ message: "Champs obligatoires." });
      } else {
        const brand = await BrandModel.findOne({ name: brandFK });
        const subcategory = await SubcategoryModel.findOne({ name: subcategoryFK });
        const season = await SeasonModel.findOne({ name: seasonFK });
        const parrain = await Parrain.findOne({ email: proprietaire });
        if (!brand || !subcategory || !season || !parrain) {
          res.status(400).json({ message: "Brand, subcategory, or season not found." });
        } else {
          const moy =(parseFloat(qualite)*0.25 + parseFloat(tendance)*0.25 + parseFloat(rarete)*0.25 + parseFloat(marque)*0.25);
          const etat = new Etat({
            qualite: qualite,
            marque: marque,
            tendance: tendance,
            rarete: rarete,
            etat: moy
          })
          const instanceEtat = await etat.save();
          const instance = new HabillementModel({
            name: name,
            img: img,
            description: description,
            price: price,
            subcategoryFK: subcategory._id,
            seasonFK: season._id,
            brandFK: brand._id,
            sizes: sizes.split(","),
            shoesizes: shoesizes.split(",") || null,
            isNew_: isNew_,
            proprietaire: parrain._id,
            dateDepot: dateDepot,
            dateEffectifRamacage: dateEffectifRamacage,
            lieu: lieu,
            etatDepot: instanceEtat._id
          });
          console.log(instance)
          const persist = await instance.save();
          SendNewsletter(persist)
          res.json({
            status: "SUCCESS",
            msg: "L'opération a été effectuée avec succès.",
            data: persist,
          });
        }
      }
    } catch (error) {
      console.log("Erreur" + error);
      res.status(500).json(error);
    }
  },
  retrieve: async (req, res) => {
    try {
      const habillements = await HabillementModel.find()
        .populate("brandFK")
        .populate("seasonFK")
        .populate("subcategoryFK");
      if (!habillements) {
        res.status(401).json({ message: "Liste vide" });
      }

      res.status(200).json({
        status: "SUCCESS",
        msg: "Liste des habillements est affichée avec succés.",
        data: habillements,
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  retrieveByDisable: async (req, res) => {
    try {
      const habillements = await HabillementModel.find({ isArchived: true })
        .populate("brandFK")
        .populate("seasonFK")
        .populate("subcategoryFK");
      if (!habillements) {
        res.status(401).json({ message: "Liste vide" });
      }
      res.status(200).json({
        status: "SUCCESS",
        msg: "Liste des habillements est affichée avec succés.",
        data: habillements,
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  retrieveByEnable: async (req, res) => {
    try {
      const habillements = await HabillementModel.find({ isArchived: false })
        .populate("brandFK")
        .populate("seasonFK")
        .populate("subcategoryFK")
        .populate("proprietaire")
        .populate("etatDepot");
      if (!habillements) {
        res.status(401).json({ message: "Liste vide" });
      }
      res.status(200).json({
        status: "SUCCESS",
        msg: "Liste des habillements est affichée avec succés.",
        data: habillements,
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  retrieveRecently: async (req, res) => {
    try {
      const habillements = await HabillementModel.find({ isRecentlySeen: true, isArchived: false }).sort({dateRecentlySeen:-1})
        .populate("brandFK")
        .populate("seasonFK")
        .populate("subcategoryFK");
      if (!habillements) {
        res.status(401).json({ message: "Liste vide" });
      }
      res.status(201).json({
        status: "SUCCESS",
        msg: "Liste des habillements est affichée avec succés.",
        data: habillements,
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  retrieveByCategoryFK: async (req, res) => {
    try {
      const subcategoryFK = req.params.subcategoryFK;
      const habillements = await HabillementModel.find({
        subcategoryFK: subcategoryFK._id,
      })
        .populate("brandFK")
        .populate("seasonFK")
        .populate("subcategoryFK");
      if (!habillements) {
        res.status(401).json({ message: "Liste vide" });
      }
      res.status(201).json({
        status: "SUCCESS",
        msg: "Liste des habillements par catégorie est affichée avec succés.",
        data: habillements,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  },
  retrieveById: async (req, res) => {
    try {
      const id = req.params.id;
      const response = await HabillementModel.findById(id)
        .populate("brandFK")
        .populate("seasonFK")
        .populate("subcategoryFK")
        .populate("proprietaire")
        .populate("etatDepot");
      res.json({
        status: "SUCCESS",
        msg: "Détails de l'habillement est affiché.",
        data: response,
      });
    } catch (error) {
      res.status(500).json({ error: "Erreur serveur." });
    }
  },
  handleRecentlySeenById: async (req, res) => {
    try {
      const id = req.params.id;
      const _ = new Date();
      const instance = await HabillementModel.findById(id);
      instance.isRecentlySeen = true;
      instance.dateRecentlySeen = _;
      const saved = await instance.save();
      res.json(saved);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erreur serveur." });
    }
  },
  updateById: async (req, res) => {
    try {
      const id = req.params.id;
      const {
        name,
        description,
        price,
        subcategoryName,
        seasonName,
        brandName,
        isNew_,
        sizes,
        shoesizes,
        proprietaire,
        dateDepot,
        dateEffectifRamacage,
        lieu,
        qualite,
        marque,
        tendance,
        rarete
      } = req.body;
      const personName = JSON.parse(shoesizes);
      const sizesName = JSON.parse(sizes);
      const subcategoryFK = await SubcategoryModel.findOne({ name: subcategoryName });
      const parrain = await Parrain.findOne({ email: proprietaire });
      const seasonFK = await SeasonModel.findOne({ name: seasonName });
      const brandFK = await BrandModel.findOne({ name: brandName });
      const instance = await HabillementModel.findById(id);
      let instanceEtat;
      let etat;
      if (instance.etatDepot) {
        etat = await Etat.findById(instance.etatDepot);
        etat.qualite = qualite;
        etat.marque = marque;
        etat.tendance = tendance;
        etat.rarete = rarete;
        etat.etat = (parseFloat(qualite)*0.25 + parseFloat(tendance)*0.25 + parseFloat(rarete)*0.25 + parseFloat(marque)*0.25);
        await etat.save();
        console.log("etat"+tendance);
        console.log("etat"+rarete);
        console.log("etat"+marque);
        console.log("etat"+qualite);
        console.log("etat"+(qualite + tendance + rarete + marque));
      } else {
        const moy = (parseFloat(qualite)*0.25 + parseFloat(tendance)*0.25 + parseFloat(rarete)*0.25 + parseFloat(marque)*0.25);
        const etatD = new Etat({
          qualite: qualite,
          marque: marque,
          tendance: tendance,
          rarete: rarete,
          etat: moy
        })
        instanceEtat = await etatD.save();
        console.log(qualite + tendance + rarete + marque);
      }
      instance.name = name;
      instance.description = description;
      instance.price = price;
      instance.subcategoryFK = subcategoryFK ? subcategoryFK._id : instance.subcategoryFK;
      instance.seasonFK = seasonFK ? seasonFK._id : instance.seasonFK;
      instance.brandFK = brandFK ? brandFK._id : instance.brandFK;
      instance.sizes = sizesName || [];
      instance.shoesizes = personName || [];
      instance.isNew_ = isNew_ || false;
      instance.dateDepot = dateDepot;
      instance.dateEffectifRamacage = dateEffectifRamacage;
      instance.lieu = lieu;
      instance.etatDepot = etat?._id || instanceEtat?._id
      instance.proprietaire = parrain ? parrain._id : instance.proprietaire;
      if (req.file) {
        instance.img = req.file.filename;
      }
      const saved = await instance.save();
      res.json(saved);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  },
  updatePhotoById: async (req, res) => {
    try {
      const id = req.params.id;
      const img = req.body.img;
      const instance = await HabillementModel.findById(id);
      instance.img = img;
      const saved = await instance.save();
      res.json(saved);
    } catch (error) {
      res.status(500).json({ error: "Erreur serveur." });
    }
  },
  archiveById: async (req, res) => {
    const id = req.params.id;
    const instance = await HabillementModel.findById(id);
    instance.isArchived = true;
    const saved = await instance.save();
    res.json(saved);
  },
  restoreById: async (req, res) => {
    const id = req.params.id;
    const instance = await HabillementModel.findById(id);
    instance.isArchived = false;
    const saved = await instance.save();
    res.json(saved);
  },
  deleteById: async (req, res) => {
    try {
      const instance = await HabillementModel.findById(req.params.id);
      if (!instance) {
        res.status(404).json({
          message: "Article introuvable " + instance?.name,
        });
      }
      await VenteFlash.findOneAndDelete({ habillementFK: instance._id })
      await Etat.findByIdAndDelete(instance.etatDepot)
      await instance.remove()
      fs.unlinkSync(
        path.join(__dirname, "../uploads/habillements/", instance?.img)
      );
      res.status(200).json({
        message:
          "Article supprimé avec succés" +
          req.params.id +
          ". " +
          "Notez que cette image a été détruit de votre serveur " +
          instance?.img,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  },
  getAllSubcategories: async (req, res) => {
    try {
      const subcategories = await SubcategoryModel.find();
      res.status(200).json(subcategories);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching subcategories.' });
    }
  },
  getAllSeasons: async (req, res) => {
    try {
      const seasons = await SeasonModel.find();
      res.status(200).json(seasons);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching seasons.' });
    }
  },
  getAllBrands: async (req, res) => {
    try {
      const Brand = await BrandModel.find();
      res.status(200).json(Brand);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching Brand.' });
    }
  },
  getAllsizes: async (req, res) => {
    try {
      const size = await Sizes.find();
      res.status(200).json(size);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching sizes.' });
    }
  },
  getAllshoesizes: async (req, res) => {
    try {
      const shoesize = await shoeSizes.find();
      res.status(200).json(shoesize);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching shoesize.' });
    }
  },
  getSousImagesByHabillement: async (req, res) => {
    try {
      const habillementId = req.params.id;

      const habillement = await HabillementModel.findById(habillementId);

      if (!habillement) {
        return res.status(404).json({ error: 'Habillement not found' });
      }

      const sousImages = await HabillementImage.find({ habillementFK: habillement._id });

      return res.json(sousImages);
    } catch (error) {
      console.error('Error retrieving sousImages by habillement:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
  searchHabillement: async (req, res, next) => {
    try {
      console.log(req.params.search.trim())
      const instance = await HabillementModel.find({
        $or: [
          { name: { $regex: `${req.params.search.trim()}`, $options: "i" } },
          {
            $expr: {
              $regexMatch: {
                input: { $toString: "$price" },
                regex: req.params.search.trim(),
                options: "i",
              },
            },
          },
          {
            $expr: {
              $regexMatch: {
                input: { $toString: "$newPrice" },
                regex: req.params.search.trim(),
                options: "i",
              },
            },
          }
        ],
        isArchived: false
      });
      console.log(instance)
      res.json({
        status: "SUCCESS",
        data: instance,
        message: "données affichées avec succees .",
      });
    } catch (error) {
      res.json({
        status: "Failed",
        message: error
      });
    }
  },
  searchHabillementAdmin: async (req, res, next) => {
    try {
      console.log(req.params.search.trim())
      const [proprietaire, EtatDepot] = await Promise.all([
        Parrain.findOne({ email: { $regex: `${req.params.search.trim()}`, $options: "i" } }),
        Etat.findOne({
          $expr: {
            $regexMatch: {
              input: { $toString: "$etat" },
              regex: req.params.search.trim(),
              options: "i",
            },
          },
        }),
      ])
      const query = {
        $or: [
          { name: { $regex: `${req.params.search.trim()}`, $options: "i" } },
          {
            $expr: {
              $regexMatch: {
                input: { $toString: "$price" },
                regex: req.params.search.trim(),
                options: "i",
              },
            },
          },
          {
            $expr: {
              $regexMatch: {
                input: { $toString: "$newPrice" },
                regex: req.params.search.trim(),
                options: "i",
              },
            },
          }
        ],
        isArchived: false
      }
      if (proprietaire) {
        query.$or.push({ proprietaire: proprietaire._id })
      } else if (EtatDepot) {
        query.$or.push({ etatDepot: EtatDepot._id })
      }
      const instance = await HabillementModel.find(query)
        .populate("brandFK")
        .populate("seasonFK")
        .populate("subcategoryFK")
        .populate("proprietaire")
        .populate("etatDepot");
      console.log(instance)
      res.json({
        status: "SUCCESS",
        data: instance,
        message: "données affichées avec succees .",
      });
    } catch (error) {
      console.log(error)
      res.json({
        status: "Failed",
        message: error
      });
    }
  },
  retrieveByName:async(req,res,next)=>{
    const { name } = req.params;
console.log(name)
  try {
    const habillement = await HabillementModel.findOne({ name });

    if (!habillement) {
      console.log('Aucun habillement trouvé avec ce nom.')
      return res.status(404).json({ message: 'Aucun habillement trouvé avec ce nom.' });
    }

    res.json(habillement);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'habillement par son nom :', error);
    res.status(500).json({ message: 'Une erreur s\'est produite lors de la récupération de l\'habillement.' });
  }

  }


};
module.exports = HabillementController;