const Reseaux = require('../models/reseauxsociaux');

exports.create = async (req, res) => {
  try {
    const { lienInstagram, lienFacebook,lienTiktok,lienEmail} = req.body;

    const entry = await Reseaux.create({
        lienInstagram, lienFacebook,lienTiktok,lienEmail
    });
    console.log("reseau created successfully")
    return res.status(201).json(entry);
    
  } catch (error) {
    console.log("error creating reseau")
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
exports.read = async (req, res) => {
  try {
    const entries = await Reseaux.find();
    return res.json(entries);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
exports.update = async (req, res) => {
    try {
      const { id } = req.params;
      const { lienInstagram, lienFacebook,lienTiktok ,lienEmail} = req.body;
      const existingEntry = await Reseaux.findById(id);
      if (!existingEntry) {
        return res.status(404).json({ error: 'Entry not found' });
      }
      if (lienInstagram !== undefined) {
        existingEntry.lienInstagram = lienInstagram;
      }
      if (lienFacebook !== undefined) {
        existingEntry.lienFacebook = lienFacebook;
      }
      if (lienTiktok !== undefined) {
        existingEntry.lienTiktok = lienTiktok;
      }
      if (lienEmail !== undefined) {
        existingEntry.lienEmail = lienEmail;
      }
      const updatedEntry = await existingEntry.save();
  
      return res.json(updatedEntry);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const entry = await Reseaux.findByIdAndRemove(id);

    if (!entry) {
      return res.status(404).json({ error: 'Entry not found' });
    }

    return res.json(entry);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
exports.getById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const entry = await Reseaux.findById(id);
  
      if (!entry) {
        return res.status(404).json({ error: 'Entry not found' });
      }
  
      return res.json(entry);
    } catch (error) {
        console.log(error)
      return res.status(500).json({ error: 'Internal Server Error' });
    }
};  