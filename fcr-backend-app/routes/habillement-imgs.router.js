const app = require('express').Router();
const multer = require('multer');
const _ = require('../controllers/habillement-image.controller');
const _admin = require('../middleware/authAdmin');   
const path=require("path");
const MIME_TYPES = {
    'image/jpg':'jpg',
    'image/jpeg':'jpeg',
    'image/png':'png',
    'image/svg':'svg',
    'image/jfif':'jfif'
};
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const destinationPath = path.join(__dirname, "../uploads/habillements/hb_images");
        callback(null, destinationPath);
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name  );
      }
});
const upload = multer({ storage: storage }).single("hbImg");
app.post('/add/:name', upload, _admin, _.create);
app.put('/update/:id', [upload, _admin], _.updatebyid);
app.delete('/delete/:id', _.deletebyid);
app.get('/retrieve/:habillementFK', _.viewbyforeignkey);

module.exports = app;