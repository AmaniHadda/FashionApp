import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, FormControl, FormHelperText, InputLabel, Alert, Stack } from "@mui/material";
const UpdateSUBCategory = ({ openUpdate, handleClose, id, getSubCategory }) => {
  const history = useHistory();
  const [img, setImg] = useState(null);
  const [categories, setCategories] = useState([]);
  const [nameError, setNameError] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [isEditingImg, setIsEditingImg] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subcategory, setSubCategory] = useState({});
  const [InfoShow, setInfoShow] = useState(true);
  useEffect(() => {
    if (openUpdate) {
      fetchSubCategory();
      fetchCategories();
      setTimeout(() => {
        setInfoShow(false)
    }, 5000);
    }
  }, [openUpdate]);

  const fetchSubCategory = async () => {
    try {
      const response = await axios.get(` /subcategories/${id}`);
      console.log(response.data)
      setSubCategory(response.data);
    } catch (error) {
      console.error("Error retrieving subcategory:", error);
    }
  };

  const handleInputChange = (e) => {
    setSubCategory({ ...subcategory, [e.target.name]: e.target.value });
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(" /admin/fetchUnarchivedCategory/");
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  const handleUpdate = async () => {
    if (/^\d+$/.test(subcategory.name)) {
      setNameError("Le nom ne doit pas contenir uniquement des chiffres");
      return;
    }
    try {
      const { name } = subcategory;
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", selectedCategory);
  
      if (img instanceof File && img.size > 0) {
        formData.append("img", img); // Append the image file to the FormData
      }
    
      const response = await axios.put(` /subcategories/update/${id}`, formData
      );
  
      toast("Subcategorie modifiée avec succès", {
        autoClose: 1000,
      });
      console.log(response.data);
      history.push("/souscategory");
      handleClose();
      getSubCategory();
    } catch (error) {
      toast("Erreur de mise à jour de la sous-catégorie", {
        autoClose: 1000,
      });
      console.error("Error updating subcategory:", error);
    }
  };
  const handleImgChange = (e) => {
    const file = e.target.files[0];
    setImg(file);
  };
  return (
    <>
      <ToastContainer />

      <Dialog open={openUpdate} onClose={()=>{handleClose(); setIsEditingCategory(false); setIsEditingImg(false); setIsEditingName(false)}}>
        <DialogTitle style={{ color: "#ec407a", fontSize: "30px" }}>Modifier votre Sous Catégorie</DialogTitle>
        <DialogContent>
        {InfoShow && <Stack sx={{ width: '100%', marginTop: "15px", marginBottom: "10px" }} spacing={2}>
              <Alert severity="info">Clique simplement sur l'élément et effectue les modifications souhaitées. !</Alert>
            </Stack>}
            <div onClick={()=>setIsEditingImg(true)} style={{marginTop:"15px"}}>  
                <img
          src={` ${process.env.REACT_APP_URL_UPLOAD}/subcategories/${subcategory.img}`}
          alt="Img"
          className="banner-image"
          width={"70px"}
          style={{ margin: "2px", height:"100px" }}
        />
               {isEditingImg&& <div className="form-group">
            <input
              type="file"
              style={{ marginTop:"17px", height: "50px" }}
              name="habillementImage"
              accept="image/*"
              onChange={handleImgChange}
              className="form-control-file"
            />
          </div>}</div>
            <div onClick={()=>setIsEditingName(true)} >
            {!isEditingName&&<div><strong>Nom de sous catégorie :</strong> {subcategory.name}</div>}          
            {isEditingName&&<div>
              <FormControl fullWidth error={Boolean(nameError)}>
                <TextField                 
                  type="text"
                  name="name"
                  value={subcategory.name}
                  onChange={handleInputChange}
                  fullWidth
                  label="Nom sous catégorie"
                />
                {nameError && <FormHelperText>{nameError}</FormHelperText>}
              </FormControl>          
            </div>} </div>
            <div onClick={()=>setIsEditingCategory(true)} style={{marginTop:"10px"}}>
            {!isEditingCategory&&<div><strong>Catégorie :</strong> {subcategory.categoryFK?.name}</div>}          
            {isEditingCategory&&<div>
              <FormControl fullWidth style={{ marginTop: "16px" }}>
              <InputLabel id="demo-simple-select-helper-label">Catégorie</InputLabel>
                <Select
                  //labelId="Catégorie"
                  //value={subcategory.categoryFK?.name}
                  onChange={handleCategoryChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Category" }}
                  renderValue={(value) => (value ? value : "Sélectionnez une catégorie")}
                  defaultValue={subcategory.categoryFK?.name}
                  label="Catégorie"
                >
                  {categories.map((category) => (
                    <MenuItem key={category._id} value={category.name}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select> </FormControl> </div>}</div>
              
             
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{handleClose(); setIsEditingCategory(false); setIsEditingImg(false); setIsEditingName(false)}} style={{ color: "black" }}>
            Annuler
          </Button>
          <Button onClick={handleUpdate} style={{ backgroundColor: "#ec407a", color: "white" }}>
            Mettre à jour
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UpdateSUBCategory;
