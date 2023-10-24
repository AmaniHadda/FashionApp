
const express = require("express");
const router = express.Router();

const meetingController = require("../controllers/meetingController");

router.post("/", meetingController.createMeeting);
router.post("/add", meetingController.createMeetingAdmin);
router.put("/:id", meetingController.updateMeeting);
router.delete("/:id", meetingController.cancelMeeting);    
router.get("/", meetingController.viewPlanningMeetings);
router.get("/disable", meetingController.viewPlanningMeetingsDisable);
router.get("/search/:search", meetingController.searchMeeting);
router.get("/user/:id", meetingController.viewPlanningMeetingsByUser);
router.put("/cancel/:id", meetingController.isCanceledMeeting);
router.delete("/delete/:id", meetingController.deleteById);
router.put("/archiver/:id", meetingController.archiver);
router.put("/restaurer/:id", meetingController.restaurer);
router.put("/approuve/:id", meetingController.ApproveMeeting);
router.put("/reject/:id", meetingController.RejectMeeting);
router.put("/report/:id", meetingController.ReportMeeting);
router.put("/approuveDate/:id", meetingController.approuveDate);
router.get("/count", meetingController.countMeetings);
router.get("/count/enattente", meetingController.countMeetings_enattente);
router.get("/count/approuve", meetingController.countMeetings_approuvé);
router.get("/count/rejete", meetingController.countMeetings_rejeté);
router.get("/count/reporte", meetingController.countMeetings_reporté);
router.get("/count/cancel", meetingController.countMeetings_annulé);
router.get("/countbymonth", meetingController.countMeetingByMonth);


module.exports = router;
