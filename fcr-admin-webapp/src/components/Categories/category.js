
import React, { useEffect, useState } from "react";
import { Link, Route, useHistory } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Table from "../Table/Table";
import { FaTrash, FaEdit, FaUndo, FaArchive, FaSearch } from "react-icons/fa";

import {
  Button,
  Badge,
  InputAdornment,
  TextField,
  Select,
  MenuItem,
  Tooltip,
} from "@mui/material";
import AddCategoryForm from "./AddCategoryForm";
import UpdateCategoryForm from "./updateCategory";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { IoMdAdd } from "react-icons/io";
const Categories = () => {
  const [data, setData] = useState([]);
  const [formattedCategories, setFormattedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [callback, setCallback] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { err, success } = data;
  const history = useHistory();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [modalArchive, setModalArchive] = useState(false)
  const [idCat, setIdCat] = useState('')
  const [isArchived, setIsArchived] = useState(false)


  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const response = await axios.get("/admin/fetchCategory/");
      if (response.status === 200) {
        const activeCategories = response.data.data.filter(
          (category) => category.isArchived === false
        );
        setData(response.data);
        const formattedCategories = activeCategories.map((category) => {
          return { ...category, id: category._id };
        });
        setFormattedCategories(formattedCategories);
        setCategories(formattedCategories);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddCategory = async (name, description) => {
    try {
      const response = await axios.post("/admin/addCategory", {
        name,
        description,
      });

      toast.success("Category ajoutée avec succès");

      closeAddModal();
      fetchCategory(); // Mettre à jour le tableau en appelant la fonction fetchCategory
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleUpdate = (formData) => {
    setIsUpdateModalOpen(true);
    setFormData(formData);
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this account?")) {
        setLoading(true);
        await axios.delete(`/admin/deleteCategory/${id}`);
        toast.success("Category supprimée avec succès", {
          className: "toast-success",
          bodyClassName: "toast-success",
        });
        setLoading(false);
        setFormattedCategories((prevCategories) =>
          prevCategories.filter((category) => category.id !== id)
        );
      }
    } catch (err) {
      console.error(err);
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };
  const handleArchive = async () => {
    try {
      const res = await axios.put(`/admin/categories/${idCat}/archive`, {
        isArchived: !isArchived,
      });

      if (res.status === 200) {
        const updatedCategories = formattedCategories.filter(
          (category) => category.id !== idCat
        );
        setFormattedCategories(updatedCategories);
        if (isArchived) {
          toast.success("Category désarchivée avec succès");
        } else {
          toast.success("Category archivée avec succès");
          setModalArchive(false)
        }
      } else {
        toast.error("Échec de l'archivage/désarchivage de la catégorie");
        // Gérer la réponse d'erreur
      }

    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de l'archivage/désarchivage de la catégorie");
      // Gérer l'erreur
    }
  };

  const handleSearch = async (event) => {
    const searchTerm = event.target.value;
    setQuery(searchTerm);

    if (searchTerm.length > 0) {
      await axios.get(` /admin/search/${searchTerm}`).then(res => {
        const searchData = res.data.data.map((category) => ({
          ...category, id: category._id
        }))
        setFormattedCategories(searchData);
      });

    } else {
      setFormattedCategories(categories);
    }
  };

  const handleStatusFilter = (event, selectedStatus) => {
    event.preventDefault();
    setStatusFilter(selectedStatus);

    if (selectedStatus === "archived") {
      const archivedCategories = categories.filter(
        (category) => category.isArchived === true
      );
      setFormattedCategories(archivedCategories);
    } else if (selectedStatus === "not-archived") {
      const activeCategories = categories.filter(
        (category) => category.isArchived === false
      );
      setFormattedCategories(activeCategories);
    } else {
      setFormattedCategories(categories);
    }
  };

  const updateCategories = () => {
    fetchCategory();
  };
  const handleUpdateSuccess = () => {
    // Fetch updated categories after successful update
    fetchCategory();
  };

  const handleChange = (event) => {
    const selectedStatus = event.target.value;
    handleStatusFilter(event, selectedStatus);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const openUpdateModal = (formData) => {
    setIsUpdateModalOpen(true);
    setFormData(formData);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  const columns = [
    {
      field: "name",
      headerName: "Nom catégorie",
      description: "This column has a value getter and is not sortable.",
      sortable: true,
      width: 300,
    },
    {
      field: "description",
      headerName: "Description",
      description: "This column has a value getter and is not sortable.",
      sortable: true,
      width: 450,
    },

    {
      field: "Action",
      headerName: "Action",
      description: "",
      sortable: true,
      width: 300,
      renderCell: (data) => (
        <div style={{ display: "flex", alignItems:"center"}}>
         <Tooltip title="Modifier"> 
         <a
            style={{
              fontSize: 20 + "px",
              color: "#f5e277",
              marginRight: 15 + "px",
              cursor: "pointer",
            }}
            variant="contained"
            onClick={() => openUpdateModal(data.row)}
          >
            <FaEdit />
          </a></Tooltip>
          <Tooltip title="Archiver">
            <a
            style={{
              fontSize: 20 + "px",
              color: "#CB94F0",
              marginRight: 15 + "px", cursor: "pointer",
            }}
            variant="contained"
            onClick={() => { setIdCat(data.row._id); setModalArchive(true); setIsArchived(data.row.isArchived) }}
          >
            {data.row.isArchived ? <FaUndo /> : <FaArchive />}
          </a></Tooltip>
        </div>
      ),
    },
  ];

  const notify = (message) => {
    toast.success(message, {
      className: "toast-success",
      bodyClassName: "toast-success",
    });
  };

  return (
    <>
      <ToastContainer />

      <div className="profile_page">
        <div className="col-left"></div>
        <div className="col-right">
          <h1
            style={{
              fontSize: "1.7rem",
              color: "black",
              margin: "10px 0",
            }}
          >
            Mes Categories
          </h1>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="col-md-8">
            <Button
                variant="contained"
                style={{
                  backgroundColor: "#d499ac",
                  color: "white",
                  marginBottom: "10px",
                }}
                onClick={openAddModal}
              >
                <IoMdAdd />
                Ajouter une catégorie
              </Button>
            </div>
            <div style={{ marginLeft: "auto" }}>
            <TextField
                label="Recherche"
                type="search"
                placeholder="Rechercher..."
                name="name"
                value={query}
                onChange={(e) => handleSearch(e)}
                sx={{ m: 2, width: "30ch" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaSearch />
                    </InputAdornment>
                  ),
                }}
              ></TextField>
              
            </div>
          </div>
          <Table
            columns={columns}
            data={formattedCategories}
            updateCategories={updateCategories}
          />
        </div>
      </div>

      <Dialog
        fullWidth
        open={isAddModalOpen}
        onClose={closeAddModal}
      >
        <DialogTitle>Ajouter une catégorie</DialogTitle>
        <DialogContent>
          <AddCategoryForm
            closeModal={closeAddModal}
            handleAddCategory={handleAddCategory}
          />
        </DialogContent>
      </Dialog>
      <Dialog
        open={modalArchive}
        onClose={() => setModalArchive(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Confirmation
        </DialogTitle>
        <DialogContent>
          Êtes-vous sûr(e) de vouloir archiver cette catégorie ?
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setModalArchive(false)}
            style={{ color: "black" }}
          >
            Fermer
          </Button>
          <Button
            style={{ backgroundColor: "#ec407a", color: "white" }}
            onClick={handleArchive}
          >
            Archiver
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog fullWidth open={isUpdateModalOpen} onClose={closeUpdateModal}>
        <DialogTitle style={{color:"#ec407a", fontSize:"30px"}}>Mettre à jour une catégorie</DialogTitle>
        <DialogContent>
          <UpdateCategoryForm
            formData={formData}
            closeModal={closeUpdateModal}
            handleUpdateSuccess={handleUpdateSuccess}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Categories;
