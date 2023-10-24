const Logo=require('../models/logo');
exports.getLogo = async (req, res) => {
    try {
      const { id } = req.params;
      const logo = await Logo.findById(id);
      
      if (!logo) {
        return res.status(404).json({ error: 'Logo not found' });
      }
      
      return res.json(logo);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  exports.read = async (req, res) => {
    try {
      const logos = await Logo.find();
      return res.json(logos);
    } catch (error) {
      console.error("Error retrieving logos:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  exports.updateLogo = async (req, res) => {
 
      const logoid = req.params.id;
      const updatelogo = {logo:req.file.filename}
      Logo.findByIdAndUpdate(logoid,updatelogo,{new:true})
      .then(logo=>{
        if(!logo){
            return res.status(404).json({ error: "logo not found" });
        }
        res.status(200).json(logo);
      })
      
    .catch (error=> {
      return res.status(500).json({ error: 'Internal Server Error' });
    });
},
  
  exports.deleteLogo = async (req, res) => {
    try {
      const { id } = req.params;
      const logo = await Logo.findByIdAndRemove(id);
      
      if (!logo) {
        return res.status(404).json({ error: 'Logo not found' });
      }      
      return res.json("logo deleted successfully");
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  exports.createLogo = async (req, res,next) => {
    const create=req.body;

    create.logo=req.file.filename
    const newLogo=new Logo(create)
    try {
     const logo=await newLogo.save();
      return res.status(201).json(logo);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
