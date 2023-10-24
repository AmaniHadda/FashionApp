const express = require('express');
const router = express.Router();
const ResController = require('../controllers/ResSocController');

router.post('/create', ResController.create);

router.get('/getAll', ResController.read);

router.put('/:id', ResController.update);

router.delete('/delete/:id', ResController.delete);

router.get('/:id', ResController.getById);

module.exports = router;