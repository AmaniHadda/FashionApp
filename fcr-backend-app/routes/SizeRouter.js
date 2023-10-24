const app = require('express').Router();
const _ = require('../controllers/size.controller');
const _admin = require('../middleware/authAdmin');   
const _user = require ("../middleware/auth");

app.post('/create', _admin, _.create)
app.get('/retrieve', _.find);
app.get('/retrieve/enable',_.retrieveEnabled);
app.get('/retrieve/disable',_.retrieveDisabled);
app.get('/retrieve/:id',_.restoreById);
app.put('/update/:id',_.updateById);
app.put('/archive/:id',_.updateById);
app.put('/restore/:id',_.updateById);


module.exports = app;