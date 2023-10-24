const app = require('express').Router();
const _ = require ('../controllers/filter-habillement.controller');

app.get("/filterbyseason/:seasonFK", _.filterBySeason);
app.get("/filterbybrand/:brandFK", _.filterByBrand);
app.get("/filterbysizes/:size", _.filterBySize);
app.get("/filterbyshoesizes/:shoesizes", _.filterByShoeSize);
app.get("/filterbynewest", _.filterByNewest);
app.get("/filterbyventeflash", _.filterByIsVenteFlash);
app.get("/filterbysubcategory/:id", _.filterBySubCategory)


module.exports = app;