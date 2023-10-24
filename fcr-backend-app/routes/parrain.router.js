const router = require("express").Router();
const parrainCtrl = require("../controllers/parrainController");


router.post("/AjouterParrain", parrainCtrl.sendCodeParrain);
router.post("/verificationCodeParrin", parrainCtrl.verificationCodeParrin);
router.put("/RegenererCodeParrain", parrainCtrl.RegenererCodeParrain);
router.get("/retrieveParrain", parrainCtrl.retrieveParrain);
router.get("/retrieve/:id", parrainCtrl.retrieveParrainById);
router.get("/retrieve/disable", parrainCtrl.retrieveDisableParrain);
router.get("/searchP/:search", parrainCtrl.searchParrains);
router.get("/users/:statusParrain", parrainCtrl.getUserByStatusParrain);
router.get("/nombre-parrains", parrainCtrl.getNombreParrainsParUtilisateur);
router.put("/disableP/:id", parrainCtrl.ArchiveParrainById);
router.put("/enableP/:id", parrainCtrl.DisableParrainById);
router.delete("/:id", parrainCtrl.deleteById);



module.exports = router;
