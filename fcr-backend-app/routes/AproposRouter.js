const express = require('express');
const router = express.Router();
const AproposController = require('../controllers/AproposController');
const _admin = require("../middleware/authAdmin");

router.post('/createApropos',_admin, AproposController.create);

router.get('/getAllApropos', AproposController.read);

router.put('/:id',_admin, AproposController.update);

router.delete('/deleteApropos/:id',_admin, AproposController.delete);

router.get('/:id',_admin, AproposController.getById);

module.exports = router;
