const app = require("express").Router();
const _ = require('../controllers/vente-flash.controller')
app.post("/create/:habillementFK", _.create);
app.get("/delete/:habillementFK", _.DeleteVenteFlash);
app.get("/retrieve", _.retrieve);
app.get("/retrieveOne", _.retrieveOne);
app.get("/retrieveOneFlash/:habillementFK", _.retrieveOneFlash);

module.exports = app;