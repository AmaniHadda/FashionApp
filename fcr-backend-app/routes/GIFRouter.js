const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require("path");
const GIFController = require('../controllers/GIFController');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif' 
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const destinationPath = path.join(__dirname, "../uploads/gif/");
        callback(null, destinationPath);
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name ); 
    }
});

const upload = multer({ storage: storage }).single("gif");

router.get('/:id', GIFController.getGIF);
router.get('/', GIFController.read);

router.put('/update/:id', upload, GIFController.updateGIF);

router.delete('/:id', GIFController.deleteGIF);

router.post('/addGIF', upload, GIFController.createGIF);

module.exports = router;
