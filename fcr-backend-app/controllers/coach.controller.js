const User = require("../models/userModel");
const Coach= require("../models/Coach");
exports.ajouterCoach=async(req,res)=>{
   try {
    const {name, email, phone, description, preferences}= req.body;
    const instance= new Coach({name, email, phone, description,preferences});
    const coach=await Coach.findOne({name:name});
    if(!coach){
      await instance.save();
      res.status(201).json({ message: "Un coach est crée avec succés" });
    }else{
      res.status(400).json({ message: "Ce coach existe déjà" });
    }   
   } catch (error) {
    console.error("Problème lors de la création du coach", error);
    res.status(500).json({ error: "Erreur serveur" });
   }
}
exports.retrieveCoach=async(req,res)=>{
    try {
        const coaches=await Coach.find({status:req.params.isArchived}).sort({createdAt:-1})
        res.status(201).json(coaches);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

exports.retrieveCoachdisable=async(req,res)=>{
    try {
        const coaches=await Coach.find({status:true})
        res.status(201).json(coaches);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}
exports.deleteCoach=async(req,res)=>{
    try {
        const coaches=await Coach.findByIdAndDelete(req.params.id)
        res.status(201).json(coaches);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}
exports.updatebyid= async (req, res) => {
    try {
      const id = req.params.id;
      const { name, email, phone, description, preferences} =req.body;
      const coach = await Coach.findOne({ name: name.trim(), _id: { $ne: req.params.id } });
      if(!coach)
       { const instance = await Coach.findById(id);
        instance.name = name;
        instance.email = email;
        instance.phone = phone;
        instance.description=description;
        instance.preferences=preferences;
        const saved = await instance.save();
        res.status(200).json(saved);}
        else{
          res.status(400).json("ce nom existe");
        }
    } catch (error) {
      res.status(500).json({ message: error });
    }
}
exports.getbyid= async (req, res) => {
    try {
      const id = req.params.id;
      const instance = await Coach.findById(id);
      res.status(200).json(instance);
    } catch (error) {
      console.log(error)
    }
}
exports.getOne= async (req, res) => {
  try {
    const instance = await Coach.findOne();
    res.status(200).json(instance);
  } catch (error) {
    console.log(error)
  }
}
exports.enablebyid= async (req, res) => {
  try {
    const id = req.params.id;
    const instance = await Coach.findById(id);
    instance.status = false;
    const saved = await instance.save();
    res.status(200).json(saved);
  } catch (error) {
    res.status(500).json({ error: error });
  }
},
exports.disablebyid= async (req, res) => {
  try {
    const id = req.params.id;
    const instance = await Coach.findById(id);
    instance.status = true;
    const saved = await instance.save();
    res.status(200).json(saved);
  } catch (error) {
    res.status(500).json({ error: error });
  }
},
exports.searchCoaches= async (req, res, next) => {
  try {
    console.log(req.params.search.trim())
    const instance=await Coach.find({
     $or:[
      {name: { $regex: `${req.params.search.trim()}`, $options: "i" }}, 
      {email: { $regex: `${req.params.search.trim()}`, $options: "i" }},
      {description: { $regex: `${req.params.search.trim()}`, $options: "i" }},
      {preferences: { $regex: `${req.params.search.trim()}`, $options: "i" }},
      {
        $expr: {
          $regexMatch: {
            input: { $toString: "$phone" },
            regex: req.params.search.trim(),
            options: "i",
          },
        },
      }
     ] , status:false                     
    });
    res.json({
      status: "SUCCESS",
      data:instance,
      message:"données affichées avec succees .",
    });
  } catch (error) {
    res.json({
      status: "Failed",
      message:error
    });
  }
}