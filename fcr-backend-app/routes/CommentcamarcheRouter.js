const express = require('express');
const router = express.Router();
const CommentcamarcheController = require('../controllers/CommentcamarcheControlller');

router.post('/ccamarche',CommentcamarcheController.createCommentcamarcheWithDescriptions);

router.get('/getcommentcamarche/:id',CommentcamarcheController.getCommentcamarcheById);
router.get('/getcommentcamarche',CommentcamarcheController.retrieve);
router.put('/updatecommentcamarche/:id',CommentcamarcheController.updateCommentcamarcheById);
router.delete('/commentcamarche/:id',CommentcamarcheController.deleteCommentcamarcheById);

module.exports = router;