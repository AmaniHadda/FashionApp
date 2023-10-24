const app = require('express').Router();
const _ = require('../controllers/abonnement.controller');
const multer = require ('multer');
const _admin = require('../middleware/authAdmin');  
const path = require("path");
const MIME_TYPES = {
    'image/jpg':'jpg',
    'image/jpeg':'jpeg',     
    'image/png':'png',
    'image/svg':'svg'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const destinationPath = path.join(__dirname, "../uploads/abonnements");
        callback(null, destinationPath);
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name  );
      }
});

const upload = multer({ storage: storage }).single("cover");
  

app.post('/create',upload, _.create);
app.get('/retrieve', _.retrieve);
app.get('/retrieve/enable', _.retrievebyenable);
app.get('/retrieve/disable', _.retrievebydisable);
app.get('/retrieve/:id',_.retrievebyid);
app.get('/search/:search',_admin,_.searchAbonnement);
app.put('/update/:id',upload,_admin, _.updatebyid);
app.put('/disable/:id',_admin, _.disablebyid);
app.put('/enable/:id',_admin, _.enablebyid);
app.delete('/delete/:id',_admin, _.deleteById);


module.exports = app;