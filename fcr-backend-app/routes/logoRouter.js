const express = require('express');
const router = express.Router();
const multer = require('multer'); 
const path = require("path");
const LogoController = require('../controllers/logoController');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const destinationPath = path.join(__dirname, "../uploads/logo/");
        callback(null, destinationPath);
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name);
    }
});
const upload = multer({ storage: storage }).single("logo");

router.get('/:id', LogoController.getLogo);
router.get('/',LogoController.read);

router.put('/update/:id',upload, LogoController.updateLogo);

router.delete('/:id', LogoController.deleteLogo);

router.post('/addlogo', upload, LogoController.createLogo);

module.exports = router;
