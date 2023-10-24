import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControlLabel,
  NativeSelect,
  TextField,
  Rating,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import axios from "axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "./AddHabillementForm";
import { pink } from "@mui/material/colors";
import { format } from "date-fns";
const AddHabillementForm = ({ open, handleClose, dropdownData, getHabillements }) => {
  const [subcategories, setSubcategories] = useState([]);
  const [Brands, setBrands] = useState([]);
  const [Seasons, setSeasons] = useState([]);
  const [Size, setSizes] = useState([]);
  const [ShoeSizes, setShoeSizes] = useState([]);
  const [Proprietaires, setProprietaires] = useState([]);
  const [qualite, setQualite] = React.useState(0);
  const [marque, setMarque] = React.useState(0);
  const [tendance, setTendance] = React.useState(0);
  const [rarete, setRarete] = React.useState(0);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    subcategoryFK: subcategories.length > 0 ? subcategories[0]._id : "",
    seasonFK: Seasons.length > 0 ? Seasons[0]._id : "",
    brandFK: Brands.length > 0 ? Brands[0]._id : "",
    isNew_: false,
    sizes: [],
    shoesizes: [],
    proprietaire:"",
    dateDepot:"",
    dateEffectifRamacage:"",
    lieu:"",
    qualite:0,
    marque:0,
    tendance:0,
    rarete:0
  });
  const [hbImg, sethbImg] = useState([]);
  const [img, setImage] = useState(null);
  const [err, setErr] = useState("");
  const history = useHistory();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
    if(!formData[name]){
      console.log("ce champs est requis")
    }
  };
  const handleSizesChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setFormData((prevData) => ({
        ...prevData,
        sizes: [...prevData.sizes, name],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        sizes: prevData.sizes.filter((size) => size !== name),
      }));
    }
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };
  const handleShoeSizesChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setFormData((prevData) => ({
        ...prevData,
        shoesizes: [...prevData.shoesizes, name],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        shoesizes: prevData.shoesizes.filter((shoesize) => shoesize !== name),
      }));
    }
  };
  const handleSousImageChange = (event) => {
    const files = Array.from(event.target.files);
    sethbImg((prevHbImg) => [...prevHbImg, ...files]);
    console.log(hbImg);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const today = format(currentDate, 'yyyy-MM-dd');
    if (!formData.name || !formData.description || !formData.price || !img || !formData.subcategoryFK || !formData.seasonFK || !formData.brandFK || !formData.sizes || !formData.shoesizes || !formData.proprietaire || !formData.dateDepot||!formData.dateEffectifRamacage || !qualite || !marque || !tendance || !rarete) {
      return toast.error("Veuillez remplir tous les champs s'il vous plait .");
    }
    if (formData.dateDepot <today) {
      return toast.error("Date dépot doit étre supérieure à date d'aujourd'hui .");
    }
    if (formData.dateEffectifRamacage <today) {
      return toast.error("Date effectif du ramaçage doit étre supérieure à date d'aujourd'hui .");
    }
    if (formData.dateEffectifRamacage <formData.dateDepot) {
      return toast.error("Date effectif du ramaçage doit étre supérieure à date du dépot d'aujourd'hui .");
      }
    try {
      const formData1 = new FormData();
      formData1.append("name", formData.name);
      formData1.append("description", formData.description);
      formData1.append("price", formData.price);
      formData1.append("img", img);
      formData1.append("subcategoryFK", formData.subcategoryFK);
      formData1.append("seasonFK", formData.seasonFK);
      formData1.append("brandFK", formData.brandFK);
      formData1.append("isNew_", formData.isNew_);
      formData1.append("sizes", formData.sizes);
      formData1.append("shoesizes", formData.shoesizes);
      formData1.append("proprietaire", formData.proprietaire);
      formData1.append("dateDepot", formData.dateDepot);
      formData1.append("dateEffectifRamacage", formData.dateEffectifRamacage);
      formData1.append("lieu", formData.lieu);
      formData1.append("qualite", qualite);
      formData1.append("marque", marque);
      formData1.append("tendance", tendance);
      formData1.append("rarete", rarete);
      await axios.post(" /habillements/create", formData1);
      for (const file of hbImg) {
        const imageFormData = new FormData();
        imageFormData.append("hbImg", file);
        await axios.post(` /hbs/images/add/${formData.name}`, imageFormData);
      }
      toast.success("habillement ajouté avec succès");
      history.push("/habillement");
      handleClose();
      getHabillements();
      setMarque(0)
      setQualite(0)
      setTendance(0)
      setRarete(0)
      setFormData({
        name: "",
        description: "",
        price: "",
        subcategoryFK: subcategories.length > 0 ? subcategories[0]._id : "",
        seasonFK: Seasons.length > 0 ? Seasons[0]._id : "",
        brandFK: Brands.length > 0 ? Brands[0]._id : "",
        isNew_: false,
        sizes: [],
        shoesizes: [],
        dateDepot:"",
        proprietaire:"",
        dateEffectifRamacage:"",
        lieu:"",
        qualite:0,
        marque:0,
        tendance:0,
        rarete:0
      });
      sethbImg([]);
      setImage(null);
    } catch (error) {
      toast.error("An error occurred");
      console.error(error);
    }
  };
  useEffect(() => {
    const fetchSizes = async () => {
      try {
        const response = await axios.get(" /habillements/getSizes");
        setSizes(response.data);
      } catch (error) {
        console.log("Error fetching sizes:", error);
      }
      if(!formData.name){
        setErr("Ce champs est requis")
      }
    };
    const fetchShoeSizes = async () => {
      try {
        const response = await axios.get(" /habillements/getShoeSizes");
        setShoeSizes(response.data);
        console.log(response.data)
      } catch (error) {
        console.log("Error fetching getShoeSizes", error);
      }
    };
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get(" /habillements/getsubcategory");
        setSubcategories(response.data);
      } catch (error) {
        console.log("Error fetching subcategories:", error);
      }
    };
    const fetchBrands = async () => {
      try {
        const response = await axios.get(" /habillements/getbrand");
        setBrands(response.data);
      } catch (error) {
        console.log("Error fetching subcategories:", error);
      }
    };
    const fetchProprietaire = async () => {
      try {
        const response = await axios.get(" /parrain/retrieveParrain");
        setProprietaires(response.data.data);
      } catch (error) {
        console.log("Error fetching parrains:", error);
      }
    };
    const fetchSeasons = async () => {
      try {
        const response = await axios.get(" /habillements/getseason");
        setSeasons(response.data);

      } catch (error) {
        console.log("Error fetching subcategories:", error);
      }
    };
    fetchBrands();
    fetchSubcategories();
    fetchSeasons();
    fetchSizes();
    fetchShoeSizes();
    fetchProprietaire();
  }, []);

  return (

    <Dialog open={open} onClose={handleClose} maxWidth="lg">
      <DialogTitle style={{ color: "#ec407a", fontSize: "30px" }}>Ajouter Habillement</DialogTitle>
      <DialogContent className="centered-form">
        <form onSubmit={handleSubmit} >
          <div className="row">
            <div className="row">
              <div className="col-md-6">
                <div style={{marginTop:5}}>
                  <TextField
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nom de l'habillement"
                    required
                    fullWidth
                    label="Nom habillement"
                  ></TextField>
                </div>               
                <div style={{marginTop:"10px"}}>
                <FormControl fullWidth>
                 <InputLabel id="demo-simple-select-label">Propriétaire</InputLabel>
                    <Select
                    id="demo-simple-select-label"
                    label="Propriétaire"
                    name="proprietaire"
                    value={formData.proprietaire}
                    onChange={handleChange}
                    required
                    
                    className="form-control"
                  >
                    {Proprietaires.map((p) => (
                      <MenuItem key={p._id} value={p.email}>
                        {p.email}
                      </MenuItem>
                    ))}

                  </Select></FormControl>
                </div>
                 
                <div style={{marginTop:"10px"}}>
                  <TextField
                    type="number"
                    id="price"
                    name="price"
                    label="Prix habillement"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Prix de l'habillement"
                    required
                    fullWidth
                  ></TextField>
                </div>
               <div style={{marginTop:"10px"}}>
                  <TextField
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description de l'habillement"
                    required
                    multiline
                    maxRows={4}
                    fullWidth
                    label="Description habillement"
                  ></TextField></div> 
                   <div style={{marginTop:"10px"}}>
                  <TextField
                    id="dateDepot"
                    name="dateDepot"
                    value={formData.dateDepot}
                    onChange={handleChange}
                    placeholder="Date du dépot de l'habillement"
                    label="Date du dépot"
                    type="date"
                    focused
                    required
                    fullWidth
                  ></TextField></div> 
                   <div style={{marginTop:"10px"}}>
                  <TextField
                    id="dateEffectifRamacage"
                    name="dateEffectifRamacage"
                    value={formData.dateEffectifRamacage}
                    onChange={handleChange}
                    placeholder="Date effectif du ramaçage de l'habillement"
                    label="Date du ramaçage"
                    type="date"
                    focused
                    required
                    fullWidth
                  ></TextField></div> 
                   <div style={{marginTop:"10px"}}>
                  <TextField
                    id="lieu"
                    name="lieu"
                    value={formData.lieu}
                    onChange={handleChange}
                    placeholder="Le lieu"
                    label="lieu"
                    type="text"
                    required
                    fullWidth
                  ></TextField></div> 
                <div style={{marginTop:"10px"}}>
                <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Marque</InputLabel>
                                <Select
                    id="brandFK"
                    name="brandFK"
                    value={formData.brandFK}
                    onChange={handleChange}
                    fullWidth
                    required
                    labelId="demo-simple-select-label"
                    label="Marque"
                    className="form-control"
                  >
                    {Brands.map((brand) => (
                      <MenuItem key={brand._id} value={brand.name}>
                        {brand.name}
                      </MenuItem>
                    ))}

                  </Select></FormControl>
                </div>
               
                <div style={{marginTop:"10px"}}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Sous catégorie</InputLabel>
                      <Select
                    id="subcategoryFK"
                    name="subcategoryFK"
                    value={formData.subcategoryFK}
                    onChange={handleChange}
                    labelId="demo-simple-select-label"
                    label="Sous catégorie"
                    required
                    fullWidth
                    className="form-control"
                  >
                    {subcategories.map((subcategory) => (
                      <MenuItem key={subcategory._id} value={subcategory.name}>
                        {subcategory.name}
                      </MenuItem>
                    ))}
                  </Select></FormControl>
                </div>
                <div style={{marginTop:"10px"}}>
                <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Saison</InputLabel>
                                <Select
                    id="seasonFK"
                    name="seasonFK"
                    value={formData.seasonFK}
                    onChange={handleChange}
                    style={{ width: "540px" }}
                    required
                    className="form-control"
                  >
                    {Seasons.map((season) => (
                      <MenuItem key={season._id} value={season.name}>
                        {season.name}
                      </MenuItem>
                    ))}
                   </Select></FormControl>

                </div>
                 
              </div>
            </div>
          </div>
          <div style={{marginTop:"10px"}}>
            <label>Tailles disponibles:</label>
            <div className="row">
              {Size.map((size) => (
                <div key={size._id} value={size.name}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name={size.name}
                        checked={formData.sizes.includes(size.name)}
                        onChange={handleSizesChange}
                        sx={{
                          color: pink[800],
                          '&.Mui-checked': {
                            color: pink[600],
                          },
                        }}
                      />
                    }
                    label={size.name}
                  />
                </div>
              ))}
            </div>
          </div>
          {formData.subcategoryFK === "chaussures" && <div>
            <label>Pointures disponibles:</label>
            <div className="row">
              {ShoeSizes.map((shoesize) => (
                <div key={shoesize._id} value={shoesize.name}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name={shoesize.name}
                        checked={formData.shoesizes.includes(shoesize.name)}
                        onChange={handleShoeSizesChange}
                        style={{ marginRight: "1px" }}
                        sx={{
                          color: pink[800],
                          '&.Mui-checked': {
                            color: pink[600],
                          },
                        }}
                      />
                    }
                    label={shoesize.name}
                  />
                </div>
              ))}
            </div>
          </div>}

          <div>
            <label>Nouveau Article:</label>
            <FormControlLabel
              control={
                <Checkbox
                  type="checkbox"
                  id="isNew_"
                  name="isNew_"
                  checked={formData.isNew_}
                  onChange={handleCheckboxChange}
                  icon={<AiOutlineHeart />}
                  checkedIcon={<AiFillHeart color="#ec407a" />}
                />
              }
            />

          </div>
          <div>
            Etat de l'habillement :
            <div style={{ display: "flex", alignItems: "center", marginTop: 5 }}><label style={{ marginRight: "25px" }}><strong>Qualité</strong></label>
              <Rating name="customized-10" style={{color:"pink"}} defaultValue={qualite} max={10}
                value={qualite}
                onChange={(event, newValue) => {
                  setQualite(newValue);
                }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", marginTop: 5 }}><label style={{ marginRight: "20px" }}><strong>Marque</strong></label>
              <Rating name="customized-10" style={{color:"pink"}} defaultValue={marque} max={10}
                value={marque}
                onChange={(event, newValue) => {
                  setMarque(newValue);
                }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", marginTop: 5 }}><label style={{ marginRight: "10px" }}><strong>Tendance</strong></label>
              <Rating name="customized-10" style={{color:"pink"}} defaultValue={tendance} max={10}
                value={tendance}
                onChange={(event, newValue) => {
                  setTendance(newValue);
                }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", marginTop: 5 }}><label style={{ marginRight: "30px" }}><strong>Rareté</strong></label>
              <Rating name="customized-10" style={{color:"pink"}} defaultValue={rarete} max={10}
                value={rarete}
                onChange={(event, newValue) => {
                  setRarete(newValue);
                }} />
            </div>
          </div>
           
          <label>Image Principale</label>
          <div className="form-group">
            <input
              type="file"
              style={{ width: "500px", height: "50px" }}
              name="habillementImage"
              // accept="image/*"
              onChange={handleImageChange}
              className="form-control-file"
            />

          </div>
          <label>Sous-Images</label>
          <div className="form-group">
            <input multiple
              type="file"
              name="habillementSousImage"
              style={{ width: "500px", height: "50px" }}
              // accept="image/*"
              onChange={handleSousImageChange}
              className="form-control-file"
            />

          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} style={{ color: "black" }}>
          Annuler
        </Button>
        <Button type="submit" onClick={handleSubmit} variant="contained" style={{ backgroundColor: "#ec407a", color: "white" }}>
          Ajouter
        </Button>
      </DialogActions>
    </Dialog>

  );
};

export default AddHabillementForm;
