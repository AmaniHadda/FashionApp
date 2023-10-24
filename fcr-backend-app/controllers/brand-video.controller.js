const BrandVideo = require("../models/BrandVideo");

const BrandVideoController = {
  create: async (req, res) => {
    try {
      const { linkvideo, uploadvideo } = req.body;
      const instance = new BrandVideo({
        linkvideo: linkvideo,
        uploadvideo: uploadvideo,
      });
      const persist = await instance.save();
      res.status(200).json({
        status: "SUCCESS",
        msg: "Vidéo importée",
        data: persist,
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  updatebyid: async (req, res) => {
    try {
      const id = req.params.id;
      const { linkvideo, uploadvideo } = req.body;
      const instance = await BrandVideo.findById(id);
      instance.linkvideo = linkvideo;
      instance.uploadvideo = uploadvideo;
      const saved = await instance.save();
      res.status(200).json(saved);
    } catch (error) {
      res.status(500).json({error:error});
    }   
  },
  deleteById: async (req, res) => {
    try {
      const instance = await BrandVideo.findByIdAndDelete(req.params.id);
      if (!instance) {
        res.status(404).json({
          message: "Vidéo introuvable " + instance?.title,
        });
      }
      fs.unlinkSync(
        path.join(__dirname, "../uploads/videos/", instance?.uploadvideo)
      );

      res.status(200).json({
        message:
          "Vidéo supprimé avec succés" +
          req.params.id +
          ". " +
          "Notez que cette image a été détruit de votre serveur " +
          instance?.uploadvideo,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  },
  retrieve: async (req, res) => {
    const list = await BrandVideo.find()
        res.status(200).json({
      status: "SUCCESS",
      msg: "Liste affichée",
      data: list,
    });
  },
  pickbyid: async (req, res) => {
    try {
        const list = BrandVideo.find();
        console.log(list);
        const id = req.params.id;
        const instance = await BrandVideo.findById(id);
        instance.pickVideo = true;
        const saved = await instance.save();
        res.status(200).json(saved);
      } catch (error) {
        res.status(500).json({error:error});
      }   
  },
  
};

module.exports = BrandVideoController;
