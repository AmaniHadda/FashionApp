const app = require('express').Router();
const _ = require ('../controllers/commentlouer.controller');

app.post('/create', _.create);
app.put('/update/:id', _.updatebyid);
app.get('/retrievebyid/:id',_.retrievebyid);
app.get('/retrieve', _.retrieve);
app.get('/get/enable', _.retrieveenabled);
app.get('/get/disable',_.retrievedisabled);
app.get('/get/web/enable', _.retrieveenabledweb);
app.get('/get/mobile/enable',_.retrieveenabledmobile);
app.delete('/delete/:id', _.deletebyid);
app.put('/archive/:id',_.archivebyid);
app.put('/restore/:id',_.restorebyid);

module.exports = app;