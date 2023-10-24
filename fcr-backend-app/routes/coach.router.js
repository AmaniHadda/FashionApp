const express = require('express');
const router = express.Router();
const coachctrl = require('../controllers/coach.controller');

router.post('/create', coachctrl.ajouterCoach);
router.get('/getall/:isArchived', coachctrl.retrieveCoach);
router.get('/search/:search', coachctrl.searchCoaches);
router.put('/update/:id', coachctrl.updatebyid);
router.put('/enable/:id', coachctrl.enablebyid);
router.put('/disable/:id', coachctrl.disablebyid);
router.delete('/delete/:id', coachctrl.deleteCoach);
router.get('/get/:id', coachctrl.getbyid);
router.get('/getOne', coachctrl.getOne);
module.exports = router;
