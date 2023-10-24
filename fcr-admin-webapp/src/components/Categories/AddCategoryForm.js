import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Button, TextField } from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const AddCategoryForm = ({ closeModal, handleAddCategory }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [formError, setFormError] = useState(false);

  const history = useHistory();

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    setNameError(
      value === "" ? "Ce champ est requis et doit contenir uniquement des lettres et des espaces."
        : ""
    );
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setDescription(value);
    setDescriptionError(
      value === ""  ? "Ce champ est requis et doit contenir uniquement des lettres et des espaces."
        : ""
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name === "") {
      setNameError("Ce champ est requis");
    }

    if (description === "") {
      setDescriptionError("Ce champ est requis");
    }

    if (name === "" || description === "") {
      return;
    }

    try {
      handleAddCategory(name, description); // Appeler la fonction pour ajouter la nouvelle catégorie
      setName("");
      setDescription("");
      closeModal();
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <form style={{ marginTop: 10 }} onSubmit={handleSubmit}>
        <TextField
          label="Name"
          type="text"
          value={name}
          size="large"
          fullWidth
          color="primary"
          onChange={handleNameChange}
          error={nameError !== ""}
          helperText={nameError}
        />
        <br />
        <br />
        <TextField
          multiline
          maxRows={3}
          label="Description"
          type="text"
          value={description}
          size="large"
          fullWidth
          color="primary"
          onChange={handleDescriptionChange}
          error={descriptionError !== ""}
          helperText={descriptionError}
        />
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
          <Button type="submit" style={{ backgroundColor: "#ec407a", color: "white" }}>
            Sauvegarder
          </Button>
        </div>
      </form>
    </>
  );
};

export default AddCategoryForm;
