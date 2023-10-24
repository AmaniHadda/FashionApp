const Meeting = require("../models/meeting");
const User = require("../models/userModel");
const Coach= require("../models/Coach");
const HabillementModel = require("../models/Habillement");
exports.createMeeting = async (req, res) => {
  try {
    const { date, eventType, coachName, userId, habillements } = req.body;
    const meeting = new Meeting({
      date,
      eventType,
      coachName,
      status: "En attente",
      userId,
      habillements,
    });
    await meeting.save();
    res.status(201).json({ message: "Un rendez vous est crée avec succés" });
  } catch (error) {
    console.error("Problème lors de la création du rendez-vous", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
exports.createMeetingAdmin = async (req, res) => {
  try {
    const { date, eventType, coachEmail, userEmail, habillements } = req.body;
    const coach= await Coach.findOne({email:coachEmail});
    console.log(coach)
    const user= await User.findOne({email:userEmail});
    console.log(user)
    const meeting = new Meeting({
      date,
      eventType,
      coachName:coach._id,
      status: "Approuvé",
      userId: user._id,
      habillements:habillements,
    });
    await meeting.save();
    res.status(201).json({ message: "Un rendez vous est crée avec succés" });
  } catch (error) {
    console.error("Problème lors de la création du rendez-vous", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
(exports.approuveDate = async (req, res) => {
  try {
    const id = req.params.id;
    const rdv = await Meeting.findById(id);
    rdv.date = req.body.date;
    rdv.status = "En attente";
    rdv.otherDates = [];
    await rdv.save();
    res.json({
      status: "SUCCESS",
      message:
        "Votre rendez-vous a été confirmé par l'administrateur. Merci de consulter votre boîte email pour plus de détails .",
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}),
exports.ApproveMeeting = async (req, res) => {
    try {
      const id = req.params.id;
      const rejectInstance = await Meeting.findById(id);
      rejectInstance.status = "Approuvé";
      rejectInstance.otherDates = [];
      await rejectInstance.save();
      res.json({
        status: "SUCCESS",
        message:
          "Votre rendez-vous a été confirmé par l'administrateur. Merci de consulter votre boîte email pour plus de détails .",
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
},
exports.ReportMeeting = async (req, res) => {
    try {
      const id = req.params.id;
      const otherDates = req.body.otherDates;
      const reportInstance = await Meeting.findById(id);
      reportInstance.otherDates = otherDates;
      reportInstance.status = "Reporté";

      await reportInstance.save();
      res.json({
        status: "SUCCESS",
        message:
          "Une modification a été effectué sur le planning qui concerne votre rendez. Veuillez consulter votre boîte email pour confirmer les changements effectués.",
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
},
exports.RejectMeeting = async (req, res) => {
    try {
      const id = req.params.id;
      const rejectedReason = req.body.rejectedReason;
      const rejectInstance = await Meeting.findById(id);
      rejectInstance.status = "Rejeté";
      rejectInstance.rejectedReason = rejectedReason;

      await rejectInstance.save();
      res.json({
        status: "ERROR",
        message:
          "Votre rendez-vous n'a été confirmé par l'administrateur. Merci de ressayer ultérieurement.",
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
},
exports.cancelMeeting = async (req, res) => {
    try {
      const id = req.params.id;
      const cancel = await Meeting.findById(id);
      cancel.isCanceled = true;
      await cancel.save();
      res.json({
        status: "SUCCESS",
        message: "Vous avez annulé cet rendez-vous.",
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
},
exports.updateMeeting = async (req, res) => {
    try {
      const { id, date, eventType, coachName } = req.body;
      const meeting = await Meeting.findById(id);
      if (!meeting) {
        return res.status(404).json({ error: "Meeting not found" });
      }
      meeting.date = date || meeting.date;
      meeting.eventType = eventType || meeting.eventType;
      meeting.coachName = coachName || meeting.coachName;
      await meeting.save();
      res.status(200).json({ message: "Meeting updated successfully" });
    } catch (error) {
      console.error("Error updating meeting", error);
      res.status(500).json({ error: "An error occurred" });
    }
};
exports.cancelMeeting = async (req, res) => {
  try {
    const { id } = req.body;
    const meeting = await Meeting.findById(id);
    if (!meeting) {
      return res.status(404).json({ error: "Meeting not found" });
    }
    await meeting.remove();
    res.status(200).json({ message: "Meeting canceled successfully" });
  } catch (error) {
    console.error("Error canceling meeting", error);
    res.status(500).json({ error: "An error occurred" });
  }
};
exports.isCanceledMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);
    if (!meeting) {
      return res.status(404).json({ error: "Meeting not found" });
    }
    meeting.isCanceled = true;
    await meeting.save();
    res.status(200).json({ message: "Meeting canceled" });
  } catch (error) {
    console.error("Error updating meeting", error);
    res.status(500).json({ error: "An error occurred" });
  }
};
exports.viewPlanningMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find({ status: { $ne: "Rejeté" }, isArchived: false , isCanceled: false})
      .populate("userId")
      .populate("habillements")
      .populate("coachName");
    res.status(200).json({ meetings });
  } catch (error) {
    console.error("Error retrieving meetings", error);
    res.status(500).json({ error: "An error occurred" });
  }
};
exports.viewPlanningMeetingsDisable = async (req, res) => {
  try {
    const meetings = await Meeting.find({isArchived: true})
      .populate("userId")
      .populate("habillements")
      .populate("coachName");
      console.log(meetings)
    res.status(200).json({ meetings });
  } catch (error) {
    console.error("Error retrieving meetings", error);
    res.status(500).json({ error: "An error occurred" });
  }
};
exports.archiver = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);
    console.log(meeting)
    meeting.isArchived=true;
    await meeting.save();
    res.status(200).json({ meeting });
  } catch (error) {
    console.error("Error retrieving meetings", error);
    res.status(500).json({ error: "An error occurred" });
  }
};
exports.restaurer = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);
    meeting.isArchived=false;
    await meeting.save();
    res.status(200).json({ meeting });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};
exports.searchMeeting = async (req, res, next) => {
  try {
    const searchTerm = req.params.search.trim();
    const [coach, user] = await Promise.all([
      Coach.findOne({ name: { $regex: searchTerm, $options: "i" } }),
      User.findOne({ name: { $regex: searchTerm, $options: "i" } }),
    ]);
    let instance;
    const query = {
      $or: [
        { status: { $regex: searchTerm, $options: "i" } },
        { eventType: { $regex: searchTerm, $options: "i" } },
        {
          $expr: {
            $regexMatch: {
              input: { $toString: "$date" },
              regex: searchTerm,
              options: "i",
            },
          },
        },
      ],isArchived:false, isCanceled:false, status: {$ne:"Rejeté"}
    };
    if (coach) {
      query.$or.push({ coachName: coach._id });
    } else if (user) {
      query.$or.push({ userId: user._id });
    }
    instance = await Meeting.find(query)
      .populate("userId") 
      .populate("coachName"); 

    res.json({
      status: "SUCCESS",
      data: instance,
      message: "Données affichées avec succès.",
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "Failed",
      message: error.message,
    });
  }
};
exports.viewPlanningMeetingsByUser = async (req, res) => {
    try {
      const meetings = await Meeting.find({ userId: req.params.id })
        .populate("habillements")
        .populate("coachName")
        .sort({ date: -1 });
      res.status(200).json({ meetings });
    } catch (error) {
      console.error("Error retrieving meetings", error);
      res.status(500).json({ error: "An error occurred" });
    }
};
exports.countMeetings = async (req, res) => {
  try {
    const count_ = await Meeting.countDocuments({});
    if (count_ === 0) {
      res.status(400).json({ msg: "Aucune valeur n'a été trouvée" });
    } else {
      res.status(200).json({ data: count_ });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
exports.countMeetings_enattente = async (req, res) => {
  try {
    const count_ = await Meeting.countDocuments({ status: "En attente" });
    if (count_ === 0) {
      res.status(400).json({ msg: "Aucune valeur n'a été trouvée" });
    } else {
      res.status(200).json({ data: count_ });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
exports.countMeetings_approuvé = async (req, res) => {
  try {
    const count_ = await Meeting.countDocuments({ status: "Approuvé" });
    if (count_ === 0) {
      res.status(400).json({ msg: "Aucune valeur n'a été trouvée" });
    } else {
      res.status(200).json({ data: count_ });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
exports.countMeetings_rejeté = async (req, res) => {
  try {
    const count_ = await Meeting.countDocuments({ status: "Rejeté" });
    if (count_ === 0) {
      res.status(400).json({ msg: "Aucune valeur n'a été trouvée" });
    } else {
      res.status(200).json({ data: count_ });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
exports.countMeetings_annulé = async (req, res) => {
  try {
    const count_ = await Meeting.countDocuments({ isCanceled: true });
    if (count_ === 0) {
      res.status(400).json({ msg: "Aucune valeur n'a été trouvée" });
    } else {
      res.status(200).json({ data: count_ });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
exports.countMeetings_reporté = async (req, res) => {
  try {
    const count_ = await Meeting.countDocuments({ status: "Reporté" });
    if (count_ === 0) {
      res.status(400).json({ msg: "Aucune valeur n'a été trouvée" });
    } else {
      res.status(200).json({ data: count_ });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
exports.countMeetingByMonth = async (req, res) => {
  try {
    const result = await Meeting.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
    ]);

    res.json(result);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du nombre d'utilisateurs par mois",
      error
    );
    res.status(500).json({ error: "Une erreur est survenue" });
  }
  
};
exports.deleteById= async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Meeting.findByIdAndDelete(id);
    if (!response) {
      res.status(404).json({ message: "Meeting Introuvable " });
    }
    res.status(200).json({
      message: "Opération effectuée avec succés.",
    });
  } catch (error) {
    res.json({ error: error });
  }
};