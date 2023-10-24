const GIF=require('../models/GIF');

exports.getGIF = async (req, res) => {
    try {
      const { id } = req.params;
      const gif = await GIF.findById(id);
      
      if (!gif) {
        return res.status(404).json({ error: 'GIF not found' });
      }
      
      return res.json(gif);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  exports.read = async (req, res) => {
    try {
      const gifs = await GIF.find();
      return res.json(gifs);
    } catch (error) {
      console.error("Error retrieving gifs:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
  exports.updateGIF = async (req, res) => {
 
      const gifid = req.params.id;
      const updategif = {gif:req.file.filename}
      GIF.findByIdAndUpdate(gifid,updategif,{new:true})
      .then(gif=>{
        if(!gif){
            return res.status(404).json({ error: "gif not found" });
        }
        res.status(200).json(gif);
      })
      
    .catch (error=> {
      return res.status(500).json({ error: 'Internal Server Error' });
    });
},
  exports.deleteGIF = async (req, res) => {
    try {
      const { id } = req.params;
      const gif = await GIF.findByIdAndRemove(id);
      if (!gif) {
        return res.status(404).json({ error: 'gif not found' });
      }
      return res.json("gif deleted successfully");
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  exports.createGIF = async (req, res,next) => {
    const create=req.body;

    create.gif=req.file.filename
    const newGIF=new GIF(create)
    try {
     const gif=await newGIF.save();
      return res.status(201).json(gif);
    } catch (error) {
        console.log(error)
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
