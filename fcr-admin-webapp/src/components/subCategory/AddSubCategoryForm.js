import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, Select } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom";
const AddSubCategoryForm = ({ open, handleClose, getSubCategory }) => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [nameError, setNameError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [img, setImage] = useState(null);
  const history = useHistory();

  useEffect(() => {
    fetchCategories();
    
  }, []);

  const handleNameChange = (e) => {
    const { value } = e.target;
    setName(value);
    setNameError(""); // Reset the name error message
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setSelectedCategory(value);
    setCategoryError(""); // Reset the category error message
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (/^\d+$/.test(name)) {
      setNameError(name ? "Le nom ne doit pas contenir des chiffres seulement" : "Le nom est requis");
      return;
    }
  
    if (!name || selectedCategory === "") {
      // Check if the name or category is not selected
      setNameError(name ? "" : "Le nom est requis");
      setCategoryError(selectedCategory !== "" ? "" : "La catégorie est requise");
      return;
    }
  
    if (!img || !img.name) {
      console.error("No image selected.");
      toast("Veuillez sélectionner une image.", {
        autoClose: 1000,
      });
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", selectedCategory);
      formData.append("img", img);
  
      const response = await axios.post(" /subcategories/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      toast.success("Sous-catégorie ajoutée avec succès", {
        autoClose: 1000,
      });
  
      console.log(response.data);
      history.push("/souscategory");
      setName("");
      setSelectedCategory("");
      handleClose();
      getSubCategory();
    } catch (error) {
      toast("Erreur d'ajout de Sous-catégorie", {
        autoClose: 1000,
      });
      console.error("Error adding subcategory:", error);
    }
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    
  };
  const fetchCategories = async () => {
    try {
      const response = await axios.get(" /admin/fetchUnarchivedCategory/");
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <>
      <ToastContainer />

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle style={{ color: "#ec407a" }}>Créer une nouvelle Sous Catégorie</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              placeholder="Nom de Sous Catégorie"
              label="Nom"
              type="text"
              value={name}
              style={{ marginTop: "14px" }}
              fullWidth
              color="primary"
              error={Boolean(nameError)}
              helperText={nameError}
              onChange={handleNameChange}
            />
            <Select
              value={selectedCategory}
              onChange={handleCategoryChange}
              fullWidth
              color="primary"
              style={{ marginTop: "16px" }}
              displayEmpty
              inputProps={{ "aria-label": "Category" }}
              renderValue={(value) => (value ? value : "Sélectionnez une catégorie")}
              error={Boolean(categoryError)}
            >
              <MenuItem disabled value="">
                <em>Sélectionnez une catégorie</em>
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category._id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
            {Boolean(categoryError) && <p style={{ color: "#8f170ace", fontSize:"12px",marginTop:"5px", marginLeft:"10px" }}>{categoryError}</p>}
            <div className="form-group">
            <input
              type="file"
              style={{ marginTop:"17px", height: "50px" }}
              name="img"
              onChange={handleImageChange}
              className="form-control-file"
            /></div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: "black" }}>
            Annuler
          </Button>
          <Button onClick={handleSubmit} variant="contained" style={{ backgroundColor: "#ec407a" }}>
            Sauvegarder les données
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddSubCategoryForm;
