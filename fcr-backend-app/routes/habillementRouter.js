const app = require("express").Router();
const multer = require('multer');
const _ = require('../controllers/habillement.controller');
const _admin = require('../middleware/authAdmin');  
const _user = require ("../middleware/auth");
const path=require("path");
const MIME_TYPES = {
    'image/jpg':'jpg',
    'image/jpeg':'jpeg',
    'image/png':'png',
    'image/svg':'svg'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const destinationPath = path.join(__dirname, "../uploads/habillements");
        callback(null, destinationPath);
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name  );
      }
});

const upload = multer({ storage: storage }).single("img");
app.get('/getShoeSizes',_.getAllshoesizes);
app.get('/getsousimages/:id',_.getSousImagesByHabillement);
app.get('/getsubcategory',_.getAllSubcategories);
app.get('/getSizes',_.getAllsizes);
app.get('/getbrand',_.getAllBrands);
app.get('/getseason',_.getAllSeasons);
app.post('/create',upload, _.create);
app.get('/retrieve', _.retrieve);
app.get('/retrieveByName/:name', _.retrieveByName);
app.get('/retrieve/subcategory/:subcategoryFK', _.retrieveByCategoryFK);
app.get('/retrieve/enable', _.retrieveByEnable);
app.get('/retrieve/disable',_admin, _.retrieveByDisable);
app.get('/recently', _.retrieveRecently);
app.get('/retrieve/:id', _.retrieveById);
app.put('/update/:id', _admin,upload, _.updateById);
app.put('/update/photo/:id', _admin, _.updatePhotoById);
app.put('/disable/:id',_admin, _.archiveById);
app.put('/enable/:id',_admin, _.restoreById);
app.put('/recentlySeen/:id', _.handleRecentlySeenById);
app.delete('/delete/:id', [_admin], _.deleteById);
app.get('/searchHabillement/:search',_.searchHabillement);
app.get('/search/:search',_.searchHabillementAdmin);

module.exports = app;