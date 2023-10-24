const app = require("express").Router();
const _ = require('../controllers/subcategories.controller');
const _admin = require('../middleware/authAdmin');   
const _user = require ("../middleware/auth");
const multer = require ("multer");
const path=require("path");
const MIME_TYPES = {
    'image/jpg':'jpg',
    'image/jpeg':'jpeg',
    'image/png':'png',
    'image/svg':'svg'
};
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      const destinationPath = path.join(__dirname, "../uploads/subcategories");
      callback(null, destinationPath);
    },
    filename: (req, file, callback) => {
      const name = file.originalname.split(' ').join('_');
      const extension = MIME_TYPES[file.mimetype];
      const timestamp = Date.now(); 
      const uniqueFilename = `${name}_${timestamp}.${extension}`; 
      callback(null, uniqueFilename);
    }
  });
  

const upload = multer({ storage: storage }).single("img");
app.post('/create',upload,_admin, _.create);
app.get('/retrieve',_admin, _.retrieve);
app.get('/search/:search', _.searchSubCategory);
app.get('/retrieve/category/:categoryFK', _.retrieveByCategoryFK);
app.get('/retrieve/enable', _.retrieveEnabled);
app.get('/:id', _.retrieveById);
app.get('/retrieve/disable',_admin, _.retrieveDisabled);
app.get('/retrieve/:id', [_admin || _user], _.restoreById);
app.put('/update/:id',upload, _.updateById);
app.put('/disable/:id',_admin, _.archiveById);
app.put('/enable/:id',_admin, _.restoreById);
app.put('/image/:id', _.updatephotoById);
app.delete('/delete/:id', _.deleteById);

module.exports = app;