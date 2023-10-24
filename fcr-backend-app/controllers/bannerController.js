const Banner = require('../models/banner');
exports.createBanner = async(req, res,next) => {

  const banner = req.body;
  console.log(req.body)
  banner.image=req.file.filename;
  const newBanner = new Banner(banner);
    try{
      const bannersave=await newBanner.save();
      res.status(201).json(bannersave);
  }catch(error) {
      console.error("Error creating banner:", error);
      res.status(500).json({ error: "Failed to create banner" });
    };
  };
exports.getBanner = (req, res) => {
  Banner.find({})
    .then(banners => {
      console.log("Banners:", banners);
      res.status(200).json(banners);
    })
    .catch(error => {
      console.error("Error retrieving banners:", error);
      res.status(500).json({ error: "Failed to retrieve banners" });
    });
};

exports.updateBanner = (req, res) => {
  const bannerId = req.params.id; 

  const updatedBanner = {
    description1: req.body.description1,
    description2: req.body.description2,
    description3: req.body.description3
  };

  if (req.file) {
    updatedBanner.image = req.file.filename;
  }

  Banner.findByIdAndUpdate(bannerId, updatedBanner, { new: true })
    .then(banner => {
      if (!banner) {
        return res.status(404).json({ error: "Banner not found" });
      }
      console.log("Updated banner:", banner);
      res.status(200).json(banner);
    })
    .catch(error => {
      console.error("Error updating banner:", error);
      res.status(500).json({ error: "Failed to update banner" });
    });
};

exports.deleteBanner = (req, res) => {
  Banner.findOneAndDelete({})
    .then(banner => {
      console.log("Banner deleted successfully.");
      res.status(200).json({ message: "Banner deleted successfully" });
    })
    .catch(error => {
      console.error("Error deleting banner:", error);
      res.status(500).json({ error: "Failed to delete banner" });
    });
};

exports.deleteBannerById = (req, res) => {
  const bannerId = req.params.id;

  Banner.findByIdAndDelete(bannerId)
    .then((banner) => {
      if (!banner) {
        return res.status(404).json({ message: "Banner not found" });
      }
      console.log("Banner deleted successfully.");
      res.status(200).json({ message: "Banner deleted successfully" });
    })
    .catch((error) => {
      console.error("Error deleting banner:", error);
      res.status(500).json({ error: "Failed to delete banner" });
    });
};
