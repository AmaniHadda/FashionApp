
const router = require("express").Router();

const contactCtrl = require("../controllers/contactCtrl");

router.post("/add", contactCtrl.addcontact);
router.get("/informations/:id", contactCtrl.getContactInfor);
router.get("/allinfomrations", contactCtrl.getAllContactInfor);
router.get("/search/:search", contactCtrl.searchContact);
router.post("/searchcontact", contactCtrl.searchContact);
router.post("/pagicontact", contactCtrl.pagiContact);
router.put("/nonTraiter/:id", contactCtrl.nonTraitercontact);
router.put("/respond/:id", contactCtrl.respondtocontact);
router.put("/traiter/:id", contactCtrl.traitercontact);
router.put("/restaurer/:id", contactCtrl.Restaurercontact);
router.put("/archieve/:id", contactCtrl.Archivecontact);
router.delete("/delete/:id", contactCtrl.deleteContact);
router.get("/exportcontact", contactCtrl.exportContact);
router.get("/countbymonth", contactCtrl.countContactsByMonth);
router.get("/count/enattente", contactCtrl.countContacts_enattente);
router.get("/count/repondu", contactCtrl.countContacts_repondu);
router.get("/countbyday", contactCtrl.countContactsByDay);

router.put("/respond/:id", contactCtrl.respondtocontact);

router.get("/exportpdf", contactCtrl.contactExportPdf, async (req, res) => {
  try {
    await exportContacts();
    res.send("Contacts exported successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error exporting users");
  }
});
module.exports = router;

