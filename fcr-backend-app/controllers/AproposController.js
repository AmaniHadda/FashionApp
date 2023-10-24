const Apropos = require('../models/APropos');
exports.create = async (req, res) => {
  try {
    const { phoneNumber1, phoneNumber2, rue, ville } = req.body;

    const entry = await Apropos.create({
      phoneNumber1,
      phoneNumber2,
      rue,
      ville
    });

    return res.status(201).json(entry);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.read = async (req, res) => {
  try {
    const entries = await Apropos.find();
    return res.json(entries);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { phoneNumber1, phoneNumber2, rue, ville } = req.body;

    const entry = await Apropos.findByIdAndUpdate(
      id,
      {
        phoneNumber1,
        phoneNumber2,
        rue,
        ville
      },
      { new: true }
    );

    if (!entry) {
      return res.status(404).json({ error: 'Entry not found' });
    }

    return res.json(entry);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const entry = await Apropos.findByIdAndRemove(id);

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
  
      const entry = await Apropos.findById(id);
  
      if (!entry) {
        return res.status(404).json({ error: 'Entry not found' });
      }
  
      return res.json(entry);
    } catch (error) {
        console.log(error)
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };  