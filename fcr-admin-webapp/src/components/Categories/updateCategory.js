import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Stack, Alert } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateCategoryForm = ({ formData, closeModal, handleUpdateSuccess }) => {
  const { id } = useParams();
  const history = useHistory();
  const [InfoShow, setInfoShow] = useState(true);

  const [category, setCategory] = useState({
    name: formData.name,
    description: formData.description,
  });
  const [nameError, setNameError] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [descriptionError, setDescriptionError] = useState("");

  useEffect(() => {
    fetchCategory();
    setTimeout(() => {
      setInfoShow(false)
  }, 5000);
  }, []);

  const fetchCategory = async () => {
    try {
      if (!id) {
        return;
      }
      const response = await axios.get(`/admin/getCategory/${formData.id}`);
      const { name, description } = response.data;
      setCategory({ name, description });
    } catch (error) {
      console.error("Error retrieving category:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
    if (name === "name") {
      setNameError("");
    }
    if (name === "description") {
      setDescriptionError("");
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (category.name.trim() === "") {
      setNameError("Ce champ est obligatoire");
      isValid = false;
    } else {
      setNameError("");
    }

    if (category.description.trim() === "") {
      setDescriptionError("Ce champ est obligatoire");
      isValid = false;
    } else {
      setDescriptionError("");
    }

    return isValid;
  };

  const handleUpdate = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const { name, description } = category;
      const response = await axios.put(`/admin/updateCategory/${formData.id}`, {
        name,
        description,
      });
      toast.success("Catégorie modifiée avec succès");
      closeModal();
      handleUpdateSuccess();
    } catch (error) {
      toast.error("Erreur lors de la mise à jour de la catégorie");
      console.error("Error updating category:", error);
    }
  };

  return (
    <>
      <ToastContainer />
      {InfoShow && <Stack sx={{ width: '100%', marginTop: "15px", marginBottom: "10px" }} spacing={2}>
              <Alert severity="info">Clique simplement sur l'élément et effectue les modifications souhaitées. !</Alert>
            </Stack>}
      <div className="container" style={{ marginTop: "10px" }}>
        <div onClick={()=>setIsEditingName(true)} style={{ marginLeft:"15px"}} >
          {!isEditingName&&<div><strong>Nom de catégorie :</strong> {category.name}</div>}
          {isEditingName&&<div>
            <TextField
              label="Nom catégorie"
              type="text"
              name="name"
              value={category.name}
              onChange={handleInputChange}
              size="large"
              fullWidth
              color="primary"
              required
              error={nameError !== ""}
              helperText={nameError}
            />
            </div>}
        </div>
        <div onClick={()=>setIsEditingDesc(true)} style={{marginTop:"15px", marginLeft:"15px"}}>
        {!isEditingDesc&&<div><strong>Description du catégorie :</strong> {category.description}</div>}
        {isEditingDesc&&<div>
            <TextField
              multiline
              maxRows={3}
              label="Description"
              type="text"
              name="description"
              value={category.description}
              onChange={handleInputChange}    
              size="large"   
              fullWidth
              color="primary"
              required
              error={descriptionError !== ""}
              helperText={descriptionError}
            /></div>}
          </div>
          <div
            style={{
              marginTop: 20,
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <Button onClick={closeModal} style={{ color: "black" }}>
              Fermer
            </Button>
            <Button
              style={{ backgroundColor: "#ec407a", color: "white" }}
              onClick={handleUpdate}
            >
              Sauvegarder les données
            </Button>
          </div>
      </div>
    </>
  );
};

export default UpdateCategoryForm;
