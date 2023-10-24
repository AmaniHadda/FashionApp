const app = require("express").Router();
const _ = require("../controllers/favoris.controller");
const auth = require("../middleware/auth")
app.post("/save", _.save_);
app.get("/retrieve/:id", _.retrieve);
app.delete("/delete/:id", _.deleteById);

module.exports = app;

//Favoris router