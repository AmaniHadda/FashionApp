const Users = require("../models/userModel");
const ParrainSchema = require("../models/Parrainage");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const sendMailParrain = require("./sendMailParrain");



const parrainCtrl = {
  getUserByStatusParrain: async (req, res) => {
    const { statusParrain } = req.params;

    try {
      let users;

      if (statusParrain === "parrainés") {
        users = await Users.find({ statusParrain: true }).populate("idParrain");
      } else if (statusParrain === "nonparrainés") {
        users = await Users.find({ statusParrain: false }).populate(
          "idParrain"
        );
      } else {
        return res.status(400).json({
          message:
            'Le paramètre statusParrain doit être soit "true" ou "false".',
        });
      }

      if (users.length === 0) {
        return res.status(401).json({ message: "Aucun utilisateur trouvé." });
      }

      res.status(200).json({
        status: "SUCCESS",
        msg: `Liste des utilisateurs ${statusParrain === "true" ? "parrainés" : "non parrainés"
          } est affichée avec succès.`,
        data: users,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.log(error);
    }
  },
  sendCodeParrain: async (req, res) => {
    try {
      const CodeParrain = `${Math.floor(100000 + Math.random() * 900000)}`;
      const user = await Users.findOne({ email: req.body.email });

      if (user) {
        const saltRounds = 12;
        const hashedCP = await bcrypt.hash(CodeParrain, saltRounds);
        const Parrain = await new ParrainSchema({
          codeParrain: hashedCP,
          email: req.body.email,
          phone: req.body.phone,
        });
        // save the otp record
        user.statusParrain = true;
        await user.save();
        await Parrain.save();
        sendMailParrain(req.body.email, CodeParrain);

        res.json({
          status: "PENDING",
          message: "Inscription Parrain réussie!",
        });
      } else {
        return res.json({
          status: "FAILED",
          msg: "Le mail n'existe pas dans la la liste d'utilisateur",
        });
      }
    } catch (err) {
      return res.status(500).json({ status: "FAILED", msg: err.message });
    }
  },
  searchParrains: async (req, res, next) => {
    try {
      console.log(req.params.search.trim())
      const instance = await ParrainSchema.find({
        $or: [
          { email: { $regex: `${req.params.search.trim()}`, $options: "i" } },
          {
            $expr: {
              $regexMatch: {
                input: { $toString: "$phone" },
                regex: req.params.search.trim(),
                options: "i",
              },
            },
          }
          ,
          {
            $expr: {
              $regexMatch: {
                input: { $toString: "$createdAt" },
                regex: req.params.search.trim(),
                options: "i",
              },
            },
          },
        ]
      });
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
  RegenererCodeParrain: async (req, res) => {
    try {
      const CodeParrain = `${Math.floor(100000 + Math.random() * 900000)}`;
      const parrain = await ParrainSchema.findOne({ email: req.body.email });

      if (parrain) {
        const saltRounds = 12;
        const hashedCP = await bcrypt.hash(CodeParrain, saltRounds);

        parrain.codeParrain = hashedCP;
        // save the otp record
        await parrain.save();
        sendMailParrain(req.body.email, CodeParrain);
        res.json({
          status: "PENDING",
          message: "Regeneration Code Parrain réussie!",
        });
      } else {
        return res
          .status(400)
          .json({ status: "FAILED", msg: "Le mail de parrain n'existe pas " });
      }
    } catch (err) {
      return res.status(500).json({ status: "FAILED", msg: err.message });
    }
  },
  verificationCodeParrin: async (req, res) => {
    const code = req.body.codeParrain;
    const parrain = await ParrainSchema.findOne({ email: req.body.email });
    const user = await Users.findById(req.body.idUser);

    if (parrain) {
      const isMatch = await bcrypt.compare(code, parrain.codeParrain);
      if (isMatch) {
        parrain.idUser.push(req.body.idUser);
        parrain.save();
        user.statusParrain = true;
        user.save();
        return res.status(200).json({
          status: "Succes",
          msg: "le code parrain est correct.",
        });
      } else {
        return res.status(400).json({
          status: "FAILED",
          msg: "le code parrain est incorrect. Essayez à nouveau.",
        });
      }
    } else {
      return res.status(500).json({
        status: "FAILED",
        msg: "le mail parrain est incorrect. Essayez à nouveau.",
      });
    }
  },
  retrieveParrain: async (req, res) => {
    try {
      const list = await ParrainSchema.find({ status: false }).populate("idUser");
      if (!list) {
        res.status(401).json({ message: "Liste vide" });
      }
      res.status(200).json({
        status: "SUCCESS",
        msg: "Liste des parrains est affichée avec succés.",
        data: list,
      });
    } catch (error) {
      res.status(500).json({ error: error });
      console.log(error);
    }
  },
  retrieveParrainById: async (req, res) => {
    try {
      const list = await ParrainSchema.findById(req.params.id).populate("idUser");
      if (!list) {
        res.status(401).json({ message: "Liste vide" });
      }
      res.status(200).json({
        status: "SUCCESS",
        msg: "Liste des parrains est affichée avec succés.",
        data: list,
      });
    } catch (error) {
      res.status(500).json({ error: error });
      console.log(error);
    }
  },
  retrieveDisableParrain: async (req, res) => {
    try {
      const list = await ParrainSchema.find({ status: true }).populate("idUser");
      if (!list) {
        res.status(401).json({ message: "Liste vide" });
      }
      res.status(200).json({
        status: "SUCCESS",
        msg: "Liste des parrains est affichée avec succés.",
        data: list,
      });
    } catch (error) {
      res.status(500).json({ error: error });
      console.log(error);
    }
  },
  ArchiveParrainById: async (req, res) => {
    try {
      const id = req.params.id;
      const response = await ParrainSchema.findById(id);
      response.status = true
      await response.save()
      res.status(200).json({
        message: "Opération effectuée avec succés.",
      });
    } catch (error) {
      res.json({ error: error });
    }
  },
  DisableParrainById: async (req, res) => {
    try {
      const id = req.params.id;
      const response = await ParrainSchema.findById(id);
      response.status = false
      await response.save()
      res.status(200).json({
        message: "Opération effectuée avec succés.",
      });
    } catch (error) {
      res.json({ error: error });
    }
  },
  getNombreParrainsParUtilisateur: async (req, res) => {
    try {
      const parrains = await ParrainSchema.find().populate("idUser");
      const parrainsParUtilisateur = {};

      for (const parrain of parrains) {
        const parrainEmail = parrain.email;
        const nombreUtilisateurs = parrain.idUser.length;
        if(nombreUtilisateurs !==0){
          parrainsParUtilisateur[parrainEmail] = {
            parrain: parrainEmail,
            nombreUtilisateurs,
          };
        }

      }

      const result = Object.values(parrainsParUtilisateur);

      res.status(200).json({ data: result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  deleteById: async (req, res) => {
    try {
      const id = req.params.id;
      const response = await ParrainSchema.findByIdAndDelete(id);
      if (!response) {
        res.status(404).json({ message: "Parrain Introuvable " });
      }

      res.status(200).json({
        message: "Opération effectuée avec succés.",
      });
    } catch (error) {
      res.json({ error: error });
    }
  },
}
module.exports = parrainCtrl;
