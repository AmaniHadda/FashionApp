const Contacts = require("../models/contactModel");
const CsvParser = require("json2csv").Parser;
const PDFDocument = require("pdfkit");
const sendMailContact=require("./sendMailContact")


const contactCtrl = {
  getContactInfor: async (req, res) => {
    try {
      const contact = await Contacts.findById(req.params.id).select(
        "-password"
      );
      res.json(contact);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAllContactInfor: async (req, res) => {
    try {
      const contacts = await Contacts.find().select("-password");
      res.json(contacts);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  addcontact: async (req, res) => {
    try {
      const newContact = await Contacts.create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        object: req.body.object,
        message: req.body.message,
        status: "En attente",
      });
      res.json({ newContact });
    } catch (err) {
      console.log(err)
      return res.status(500).json({ msg: err.message });
    }
  },
  searchContact: async (req, res, next) => {
    try {
      console.log(req.params.search.trim())
      const instance=await Contacts.find({
       $or:[
        {name: { $regex: `${req.params.search.trim()}`, $options: "i" }}, 
        {email: { $regex: `${req.params.search.trim()}`, $options: "i" }},
        {object: { $regex: `${req.params.search.trim()}`, $options: "i" }},
        {message: { $regex: `${req.params.search.trim()}`, $options: "i" }},
        {status: { $regex: `${req.params.search.trim()}`, $options: "i" }},
        {
          $expr: {
            $regexMatch: {
              input: { $toString: "$phone" },
              regex: req.params.search.trim(),
              options: "i",
            },
          },
        },
        {
          $expr: {
            $regexMatch: {
              input: { $toString: "$createdAt" },
              regex: req.params.search.trim(),
              options: "i",
            },
          },
        },
       ] , status:["Traité", "En attente", "Répondu"]
                       
      });
      console.log(instance)
      res.json({
        status: "SUCCESS",
        data:instance,
        message:"données affichées avec succees .",
      });
    } catch (error) {
      console.log(error)
      res.json({
        status: "Failed",
        message:error
      });
    }
  },
  pagiContact: async (req, res, next) => {
    try {
      if (!req.body) {
        response = {
          status: "error",
          msg: "Input is missing",
          body: {},
        };
        res.status(500).send(response);
      } else {
      
        const currentPage = req.body.currentPage; //2
        const pageSize = req.body.pageSize; //10

        const skip = pageSize * (currentPage - 1);
        const limit = pageSize;

        Contacts.find({})
          .skip(skip)
          .limit(limit)
          .exec((err, docs) => {
            if (err) {
              response = {
                status: "error",
                msg: "Input is missing",
                body: {},
              };
              res.status(500).send(response);
            } else {
              response = {
                status: "success",
                msg: "Contact found",
                body: docs,
              };
              res.status(200).send(response);
            }
          });
      }
    } catch (error) {
      console.log("error::", error);
    }
  },
  exportContact: async (req, res) => {
    try {
      let contacts = [];

      var contactData = await Contacts.find({});

      contactData.forEach((contact) => {
        const { name, email, phone, object, message } = contact;
        contacts.push({ name, email, phone, object, message });
      });

      const csvFields = ["Name", "Email", "Phone", "Object", "Message"];
      const csvParser = new CsvParser({ csvFields });
      const csvData = csvParser.parse(contacts);

      res.setHeader("Content-Type", "text/csv");
      res.setHeader(
        "Content-Disposition",
        "attachement: filename=userData.csv"
      );
      res.status(200).end(csvData);
    } catch (error) {
      res.send({ status: 400, success: false, msg: error.message });
    }
  },
  contactExportPdf: async (req, res) => {
    res.setHeader("Content-Disposition", "attachment; filename=contact.pdf");
    res.set("Content-Type", "application/pdf");
    const doc = new PDFDocument();
    var ContactData = await Contacts.find({});
    ContactData.forEach((contact) => {
      doc.text(`Name: ${contact.name}`);
      doc.text(`Email: ${contact.email}`);
      doc.text(`Phone: ${contact.address}`);
      doc.text(`Object: ${contact.object}`);
      doc.text(`Message: ${contact.message}`);
      doc.moveDown();
    });
    doc.pipe(res);
    doc.end();
  },
  deleteContact: async (req, res) => {
    try {
      await Contacts.findByIdAndDelete(req.params.id);

      res.json({ msg: "Deleted Success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  nonTraitercontact: async (req, res) => {
    const id = req.params.id;
    const instance = await Contacts.findById(id);
    instance.status = "Répondu";
    sendMailContact(req.body.user, "Nous vous prions de nous excuser pour la confusion. Votre demande n'a pas encore été traitée.", req.body.objet)
    const persist = await instance.save();
    res.json({
      status: "SUCCESS",
      msg: "Vous avez répondu à ce contact.",
      data: persist,
    });
  },
  respondtocontact: async (req, res) => {
    const id = req.params.id;
    const respond = req.body.respond;
    const instance = await Contacts.findById(id);
    instance.respond = respond;
    instance.status = "Répondu";
    const persist = await instance.save();
    sendMailContact(req.body.user, respond, req.body.objet);
    res.json({
      status: "SUCCESS",
      msg: "Vous avez répondu à ce contact.",
      data: persist,
    });
  },
  Archivecontact: async (req, res) => {
    const id = req.params.id;
    const instance = await Contacts.findById(id);
    instance.status = "Archivé";
    const persist = await instance.save();
    res.json({
      status: "SUCCESS",
      msg: "Vous avez archivé ce contact.",
      data: persist,
    });
  },
  Restaurercontact: async (req, res) => {
    const id = req.params.id;
    const instance = await Contacts.findById(id);
    instance.status = "En attente";
    const persist = await instance.save();
    res.json({
      status: "SUCCESS",
      msg: "Vous avez restauré ce contact.",
      data: persist,
    });
  },
  traitercontact: async (req, res) => {
    try {
      const id = req.params.id;
      const instance = await Contacts.findById(id);
      instance.status = "Traité";
      const persist = await instance.save();
      sendMailContact(req.body.email,"Chèr(e) client(e), nous tenons à vous informer que votre demande a été traitée avec succès. Si vous avez des questions supplémentaires, n'hésitez pas à nous contacter","Demande traité");
      res.json({
        status: "SUCCESS",
        msg: "Vous avez traité ce contact.",
        data: persist,
      });
    } catch (error) {
      res.json({
        status: "FAILED",
        msg: error,
      });
    }
  },
  countContactsByMonth: async (req, res) => {
    try {
      const result = await Contacts.aggregate([
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
        "Erreur lors de la récupération du nombre de contacts par mois",
        error
      );
      res.status(500).json({ error: "Une erreur est survenue" });
    }
  },
  countContactsByDay: async (req, res) => {
    try {
      const result = await Contacts.aggregate([
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              day: {$dayOfMonth:"$createdAt"}
            },
            count: { $sum: 1 },
          },
        },
      ]);

      res.json(result);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération du nombre de contacts par mois",
        error
      );
      res.status(500).json({ error: "Une erreur est survenue" });
    }
  },
  countContacts_enattente: async (req, res) => {
    try {
      const count_ = await Contacts.countDocuments({ status: "En attente" });
      if (count_ === 0) {
        res.status(400).json({ msg: "Aucune valeur n'a été trouvée" });
      } else {
        res.status(200).json({ data: count_ });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  countContacts_repondu: async (req, res) => {
    try {
      const count_ = await Contacts.countDocuments({ status: "Répondu" });
      if (count_ === 0) {
        res.status(400).json({ msg: "Aucune valeur n'a été trouvée" });
      } else {
        res.status(200).json({ data: count_ });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
};

module.exports = contactCtrl;