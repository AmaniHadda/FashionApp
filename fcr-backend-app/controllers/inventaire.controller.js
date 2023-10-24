const InventaireModel = require("../models/Inventaire");
const ParrainSchema = require("../models/Parrainage");
const etat = require("../models/etat");
const HabillementModel = require("../models/Habillement");
const InventaireController = {
    create: async (req, res) => {
        try {
            const { locataire, habillement, dateLocation, dateRecuperation, dateEffectifRecuperation, price, qualite, tendance, rarete, marque } = req.body;
            const loc = await ParrainSchema.findOne({ email: locataire });
            const habInventaire = await InventaireModel.findOne({ habillement: habillement, dateRecuperation: { $gt: dateLocation } })
            if (!habInventaire) {
                const etatLivraison = new etat({
                    qualite: qualite,
                    tendance: tendance,
                    rarete: rarete,
                    marque: marque,
                    etat: ((qualite + tendance + rarete + marque) / 40) * 100
                })
                const instanceetat = await etatLivraison.save()
                const instance = new InventaireModel({ locataire: loc._id, habillement: habillement, dateLocation: dateLocation, dateRecuperation: dateRecuperation, dateEffectifRecuperation: dateEffectifRecuperation, price: price, etatLivraison: instanceetat._id });
                const persist = await instance.save();
                return res.status(201).json({
                    success: "SUCCESS",
                    msg: "Opération effectuée avec succés",
                    data: persist,
                });
            } else {
                return res.status(400).json({
                    success: "Failed",
                    msg: "l'habillemnt est loué",
                });
            }

        } catch (error) {
            console.log(error)
            res.status(500).json({ error: error });
        }
    },
    retrieve: async (req, res) => {
        try {
            const list = await InventaireModel.find({ isArchived: req.params.isArchived })
                .populate("locataire")
                .populate({
                    path: 'habillement',
                    populate: {
                        path: 'etatDepot',
                        model: 'etat'
                    }
                })
                .populate("etatLivraison")
                .populate("etatRecuperation");
            if (!list) {
                res.status(401).json({ message: "Liste vide" });
            }
            res.status(201).json({
                status: "SUCCESS",
                msg: "Liste des inventaires est affichée avec succés.",
                data: list,
            });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    },
    retrieveById: async (req, res) => {
        try {
            const list = await InventaireModel.findById(req.params.id)
                .populate("locataire")
                .populate({
                    path: 'habillement',
                    populate: {
                        path: 'etatDepot',
                        model: 'etat'
                    }
                })
                .populate("etatLivraison")
                .populate("etatRecuperation");
            if (!list) {
                res.status(401).json({ message: "Liste vide" });
            }
            res.status(201).json({
                status: "SUCCESS",
                msg: "Liste des inventaires est affichée avec succés.",
                data: list,
            });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    },
    updateById: async (req, res) => {
        const id = req.params.id;
        const { locataire, habillement, dateLocation, dateRecuperation, dateEffectifRecuperation, idEtatLiv, price, qualite, tendance, rarete, marque, qualiteRec, tendanceRec, rareteRec, marqueRec, idRec } = req.body;
        try {
            const habInventaire = await InventaireModel.findOne({
                habillement: habillement,
                dateRecuperation: { $gt: dateLocation },
                _id: { $ne: req.params.id },
            });
            if (!habInventaire) {
                const instance = await InventaireModel.findById(id);
                const loc = await ParrainSchema.findOne({ email: locataire });
                const etatLiv = await etat.findById(idEtatLiv);
                etatLiv.qualite = qualite
                etatLiv.tendance = tendance
                etatLiv.marque = marque
                etatLiv.rarete = rarete
                etatLiv.etat = ((qualite + tendance + rarete + marque) / 40) * 100
                console.log(((qualite + tendance + rarete + marque) / 40) * 100)
                const liv = await etatLiv.save();
                let etatInstanceRec;
                if (qualiteRec && tendanceRec && rareteRec && marqueRec) {

                    if (instance.etatRecuperation) {
                        const rec = await etat.findById(idRec)
                        rec.qualite = qualiteRec
                        rec.tendance = tendanceRec
                        rec.marque = marqueRec
                        rec.rarete = rareteRec
                        rec.etat = ((qualiteRec + tendanceRec + rareteRec + marqueRec) / 40) * 100
                        console.log(rec.etat)
                        etatInstanceRec = await rec.save();
                    } else {
                        const etatRec = new etat({
                            qualite: qualiteRec,
                            tendance: tendanceRec,
                            rarete: rareteRec,
                            marque: marqueRec,
                            etat: ((qualiteRec + tendanceRec + rareteRec + marqueRec) / 40) * 100
                        })
                        etatInstanceRec = await etatRec.save();
                    }
                }
                instance.locataire = loc._id;
                console.log(loc._id)
                instance.habillement = habillement;
                instance.dateLocation = dateLocation;
                instance.dateRecuperation = dateRecuperation;
                instance.dateEffectifRecuperation = dateEffectifRecuperation;
                instance.price = price;
                instance.etatLivraison = liv._id;
                instance.etatRecuperation = etatInstanceRec?._id
                const saved = await instance.save();
                res.status(200).json(saved);
            } else {
                res.status(400).json({msg: "erreur habillement"});
            }

        } catch (error) {
            console.log(error)
            res.status(500).json({ error: error });
        }
    },
    deleteById: async (req, res) => {
        try {
            const id = req.params.id;
            const response = await InventaireModel.findById(id);
            await etat.findByIdAndDelete(response.etatLivraison)
            await etat.findByIdAndDelete(response.etatRecuperation)
            await response.remove()
            res.status(200).json({
                message: "Opération effectuée avec succés.",
            });
        } catch (error) {
            res.json({ error: error });
        }
    },
    archiveById: async (req, res) => {
        const id = req.params.id;
        const instance = await InventaireModel.findById(id);
        instance.isArchived = true;
        const saved = await instance.save();
        res.json(saved);
    },
    restoreById: async (req, res) => {
        const id = req.params.id;
        const instance = await InventaireModel.findById(id);
        instance.isArchived = false;
        const saved = await instance.save();
        res.json(saved);
    },
    searchInventaire: async (req, res, next) => {
        try {
            const [habillement, locataire, EtatLiv] = await Promise.all([
                HabillementModel.findOne({ name: { $regex: `${req.params.search.trim()}`, $options: "i" } }),
                ParrainSchema.findOne({ email: { $regex: `${req.params.search.trim()}`, $options: "i" } }),
                etat.findOne({
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
                                input: { $toString: "$dateLocation" },
                                regex: req.params.search.trim(),
                                options: "i",
                            },
                        },
                    },
                    {
                        $expr: {
                            $regexMatch: {
                                input: { $toString: "$dateRecuperation" },
                                regex: req.params.search.trim(),
                                options: "i",
                            },
                        },
                    }
                ],
                isArchived: false
            }
            if (habillement) {
                query.$or.push({ habillement: habillement._id })
            } else if (locataire) {
                query.$or.push({ locataire: locataire._id })
            } else if (EtatLiv) {
                query.$or.push({ etatLivraison: EtatLiv._id });
                query.$or.push({ etatRecuperation: EtatLiv._id });
            }
            const instance = await InventaireModel.find(query)
                .populate("locataire")
                .populate({
                    path: 'habillement',
                    populate: {
                        path: 'etatDepot',
                        model: 'etat'
                    }
                })
                .populate("etatLivraison")
                .populate("etatRecuperation");
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
};
module.exports = InventaireController;
