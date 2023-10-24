const express = require('express');
const router = express.Router();
const DescriptionController = require('../controllers/DescriptionController');

router.post('/createdescription', DescriptionController.create);

router.get('/getAlldesc', DescriptionController.read);

router.put('/:id', DescriptionController.update);

router.delete('/deleteDesc/:id', DescriptionController.delete);

router.get('/:id', DescriptionController.getById);

module.exports = router;
