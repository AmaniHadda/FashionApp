const app = require('express').Router();
const _ = require('../controllers/brandController');
const _admin = require('../middleware/authAdmin');   
const _user = require ("../middleware/auth");

app.post('/create', _admin, _.create)
app.get('/retrieve',_admin, _.retrieve);
app.get('/retrieve/enable', _.retrieveEnabled);
app.get('/retrieve/disable',_admin, _.retrieveDisabled);
app.get('/retrieve/:id', [_admin || _user], _.restoreById);
app.put('/update/:id', _admin, _.updateById);
app.put('/disable/:id',_admin, _.archiveById);
app.put('/enable/:id',_admin, _.restoreById);
app.delete('/delete/:id', [_admin], _.deleteById);

module.exports = app;