const express = require('express');
const router = express.Router();
const InventaireController = require('../controllers/inventaire.controller');


router.get('/:isArchived', InventaireController.retrieve);
router.get('/retrieveOne/:id', InventaireController.retrieveById);
router.put('/update/:id',InventaireController.updateById);
router.put('/archive/:id',InventaireController.archiveById);
router.put('/restore/:id',InventaireController.restoreById);
router.delete('/:id', InventaireController.deleteById);
router.post('/add', InventaireController.create);
router.get('/search/:search', InventaireController.searchInventaire);

module.exports = router;
