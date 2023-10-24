const VenteFlash = require("../models/VenteFlash");
const Habillement = require("../models/Habillement");
const VenteFlashController = {
  create: async (req, res) => {
    try {
      const { reduction } = req.body;
      const { date } = req.body;

      const habillementFK = req.params.habillementFK;
      const habillement = await Habillement.findById(habillementFK);
      let convertPromotion = 0;
      let convertedPrice = 0;
      let priceWithPromotion = 0;
      let OldPrice=habillement.price;
      if (reduction != 0) {
        convertPromotion = reduction / 100;
        convertedPrice = OldPrice * convertPromotion;
        priceWithPromotion = (OldPrice - convertedPrice).toPrecision(6);
      } else {
        priceWithPromotion = OldPrice;
      }
        habillement.isVenteFlash=true
        habillement.newPrice=priceWithPromotion
        habillement.save()
        const instance = new VenteFlash({
        habillementFK : habillementFK,
        reduction : reduction,
        priceWithPromotion: priceWithPromotion,
        dateLimite:date
      });

      console.log(habillement?.price);

      const persist = await instance.save();
      res.status(200).json({
        status: "SUCCESS",
        msg: "Opération effectuée avec succés",
        data: persist,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  },
  retrieve: async (req, res) => {
    const list = await VenteFlash.find()
    .populate({
        path: 'habillementFK',
        populate: {
          path: 'brandFK',
          model: 'Brands'
        }
      });
    res.status(200).json({
      status: "SUCCESS",
      msg: "Liste affichée",
      data: list,
    });
  },
  retrieveOne: async (req, res) => {
    const list = await VenteFlash.find({ dateLimite: { $gt: new Date() } })
    .populate("habillementFK");
    res.status(200).json({
      status: "SUCCESS",
      msg: "Liste affichée",
      data: list,
    });
  },
  DeleteVenteFlash: async (req, res) => {
    try {
      console.log(req.params.habillementFK)
      const habillement=await Habillement.findById(req.params.habillementFK);
      console.log(habillement._id)
        habillement.isVenteFlash=false;
        habillement.newPrice=0;
        await habillement.save()
        await VenteFlash.findOneAndDelete({ habillementFK: req.params.habillementFK });
        res.status(200).json({
          status: "SUCCESS",
          msg: "Supprimé promo",
        });
    } catch (error) {
      res.status(500).json(error);
      console.log(error)
    }
  },
  retrieveOneFlash: async (req, res) => {
    try{
    const statusFlash = await VenteFlash.findOne({habillementFK:req.params.habillementFK})
    if(statusFlash){
    res.status(200).json({
      status: "SUCCESS",
      msg: "SUCCESS",
      data:true
    })}
    
    }
    catch(error){
     res.status(500).json({error})
    }
  }
};
module.exports = VenteFlashController;