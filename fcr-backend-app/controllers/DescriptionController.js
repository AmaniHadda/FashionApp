const Description = require('../models/description');

exports.create = async (req, res) => {
  try {
    const { titre, description} = req.body;

    const entry = await Description.create({
        titre, description
    });
    console.log("description created successfully")
    return res.status(201).json(entry);
    
  } catch (error) {
    console.log("error creating description")
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
exports.read = async (req, res) => {
  try {
    const entries = await Description.find();
    return res.json(entries);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
exports.update = async (req, res) => {
    try {
      const { id } = req.params;
      const { titre, description } = req.body;
      const existingEntry = await Description.findById(id);
      if (!existingEntry) {
        return res.status(404).json({ error: 'Entry not found' });
      }
      if (titre !== undefined) {
        existingEntry.titre = titre;
      }
      if (description !== undefined) {
        existingEntry.description = description;
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

    const entry = await Description.findByIdAndRemove(id);

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
  
      const entry = await Description.findById(id);
  
      if (!entry) {
        return res.status(404).json({ error: 'Entry not found' });
      }
  
      return res.json(entry);
    } catch (error) {
        console.log(error)
      return res.status(500).json({ error: 'Internal Server Error' });
    }
};  