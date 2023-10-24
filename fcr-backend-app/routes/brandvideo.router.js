const app = require('express').Router();
const  _ = require('../controllers/brand-video.controller');

app.post('/create', _.create);
app.get('/retrieve',_.retrieve);

module.exports = app;