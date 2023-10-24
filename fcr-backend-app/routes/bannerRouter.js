const express = require('express');
const router = express.Router();
const path = require("path");
const bannerController = require('../controllers/bannerController');
const multer = require("multer");
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png':'png'
}
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const destinationPath = path.join(__dirname, "../uploads/banner/");
    callback(null, destinationPath);
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name  );
  }
});
const upload = multer({storage:storage}).single("image");

router.post('/addbanner',upload, bannerController.createBanner);


router.get('/getbanner', bannerController.getBanner);

router.put('/updatebanner/:id', upload,bannerController.updateBanner);

router.delete('/deletebanner', bannerController.deleteBanner);
router.delete('/:id',bannerController.deleteBannerById);
module.exports = router;
