import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../Table/Table";
import { ToastContainer, toast } from "react-toastify";
import {
  useHistory,
  Link,
  Route,
} from "react-router-dom/cjs/react-router-dom.min";
import { FaEdit, FaUndo, FaArchive, FaSearch } from "react-icons/fa";
import {
  IoMdAdd
} from "react-icons/io";
import {
  Button,
  Badge,
  InputAdornment,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
} from "@mui/material";
import AddSubCategoryForm from "./AddSubCategoryForm";

import UpdateSUBCategory from "./updateSubCategory";
const SubCategoryList = () => {
  const [data, setData] = useState([]);
  const [formattedSubCategory, setFormattedSubCategory] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const { err, success } = data;
  const [id, setId] = useState(null);
  const [callback, setCallback] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const history = useHistory();
  const [open, setOpenModal] = useState(false);
  const [openUpdate, setOpen] = useState(false);
  const [modalArchive, setModalArchive] = useState(false)
  const [isArchived, setIsArchived] = useState(false)
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  useEffect(() => {
    getSubCategory();
  }, []);

  const getSubCategory = async () => {
    try {
      const response = await axios.get(
        " /subcategories/retrieve/"
      );
      if (response.status === 200) {
        const subcategoryData = response.data.data;

        // Filter subcategories by isArchived property
        const nonArchivedSubcategories = subcategoryData.filter(
          (subcategory) => !subcategory.isArchived
        );

        setData(subcategoryData);

        const formattedData = nonArchivedSubcategories.map((subcategory) => {
          const categoryName = subcategory.categoryFK
            ? subcategory.categoryFK.name
            : "";

          return {
            ...subcategory,
            id: subcategory._id,
            categoryName,
          };
        });

        setFormattedSubCategory(formattedData);
        setSubCategory(formattedData);

        return;
      }

    } catch (error) {
      console.error(error, "error retrieving habillement");
    }
  };

  const handleUpdate = (id) => {
    setId(id);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this account?")) {
        setLoading(true);
        const res = await axios.delete(`/subcategories/delete/${id}`);
        toast.success("souscategorie supprimé avec success");
        setLoading(false);
        setCallback(!callback);
        getSubCategory();
      }
    } catch (err) {
      console.error(err);
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  const handleArchive = async () => {
    try {
      let res;
      if (!isArchived) {
        res = await axios.put(`/subcategories/disable/${id}`);
      } else {
        res = await axios.put(`/subcategories/enable/${id}`);
      }
      if (res.status === 200) {
        const updatedIsArchived = isArchived;
        toast(
          `SousCategorie ${!updatedIsArchived ? "archivé" : "unarchivé"
          } avec succès`
        );
        const updatedSubCategories = subcategory.map((subcategories) => {
          if (subcategories._id === id) {
            return { ...subcategories, isArchived: !isArchived };
          }
          return subcategories;
        });
        setSubCategory(updatedSubCategories);
        getSubCategory();
        setModalArchive(false)
      } else {
        toast.error("erreur dans l'archivage/unarchivage de sous-catégorie");
        // Handle error response
      }
    } catch (err) {
      console.error(err);
      toast.error("erreur dans l'archivage/unarchivage de sous-catégorie");
      // Handle error
    }
  };
  const handleSearch = async (event) => {
    const searchTerm = event.target.value;
    setQuery(searchTerm);
  };
  const Search = async () => {
    await axios.get(` /subcategories/search/${query}`).then(res => {
      const searchData = res.data.data.map((subcategory) => {
        const categoryName = subcategory.categoryFK
          ? subcategory.categoryFK.name
          : "";

        return {
          ...subcategory,
          id: subcategory._id,
          categoryName,
        };
      });
      setFormattedSubCategory(searchData);
    });
  }
  useEffect(() => {
    if (query.length > 0) {
      const delaySearch = setTimeout(Search, 300);
      return () => clearTimeout(delaySearch);
    }
    else {
      getSubCategory()
    }
  }, [query])

  const columns = [
    {
      field: "name",
      headerName: "Nom",
      description: "This column has a value getter and is not sortable.",
      sortable: true,
      width: 250,
    },

    {
      field: "categoryName",
      headerName: "Category",
      description: "Subcategory foreign key",
      sortable: true,
      width: 300,
    },
    {
      field: "img",
      headerName: "Image Sous-Catégorie",
      description: "This column has a value getter and is not sortable.",
      sortable: true,
      width: 300,
      renderCell: (data) => (
        <img src={` ${process.env.REACT_APP_URL_UPLOAD}/subcategories/${data.row.img}`} alt="sous catégorie" style={{ width: 70, height: 50 }} />
      ),
    },
    // {
    //   field: "isArchived",
    //   headerName: "Status",
    //   description: "Category status: Archived or Not Archived",
    //   sortable: true,
    //   width: 200,
    //   renderCell: (data) => (
    //     <div
    //       style={{
    //         display: "inline-flex",
    //         alignItems: "center",
    //         border: "1px solid",
    //         borderRadius: "20px",
    //         padding: "4px 8px",
    //         borderColor: data.row.isArchived ? "purple" : "#ec407a",
    //         color: data.row.isArchived ? "é" : "#ec407a",
    //         cursor: "pointer",
    //       }}
    //       badgeContent={data.row.isArchived ? "Archivé" : "Non archivé"}
    //     >
    //       <span style={{ marginRight: "4px" }}>
    //         {data.row.isArchived ? "Archivé" : "Actif"}
    //       </span>
    //       <Badge color="default" />
    //     </div>
    //   ),
    // },
    {
      field: "Action",
      headerName: "Action",
      description: "",
      sortable: true,
      width: 200,
      className: "fas fa-trash-alt",
      title: "Remove",
      renderCell: (data) => (
        <div style={{ display: "flex",display:"flex", alignItems:"center" }}>
          <a
            variant="contained"
            title="Update"
            style={{
              fontSize: 23 + "px",
              color: "#f5e277",
              marginRight: 15 + "px",
              cursor: "pointer",
              //#f5e277
            }}
            onClick={() => handleUpdate(data.row.id)}
          >
            <FaEdit />
          </a>
          <a
            style={{
              fontSize: 20 + "px",
              color: "#CB94F0",
              marginRight: 15 + "px",
              cursor: "pointer",
            }}
            variant="contained"
            title={data.row.isArchived ? "Unarchive" : "Archive"}
            onClick={() => { setId(data.row._id); setModalArchive(true); setIsArchived(data.row.isArchived) }}
          >
            {data.row.isArchived ? <FaUndo /> : <FaArchive />}
          </a>
        </div>
      ),
    },
  ];

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
            Mes Sous Categories
          </h1>
          <div style={{ display: "flex", alignItems: "center" }}>
          <Button
                variant="contained"
                style={{
                  backgroundColor: "#d499ac",
                  color: "white",
                  marginBottom: "10px",
                }}
                onClick={handleOpenModal}
              >

                <IoMdAdd />
                Ajouter sous catégorie

              </Button>
            <div style={{ marginLeft: "auto" }} >
            <div className="col-2">
              <TextField
                label="Recherche"
                type="search"
                placeholder="Rechercher..."
                name="name"
                value={query}
                onChange={(e) => handleSearch(e)}
                sx={{ m: 1, width: "30ch" }}
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
          </div>
          <AddSubCategoryForm open={open} handleClose={handleCloseModal} getSubCategory={getSubCategory} />
          <UpdateSUBCategory
            id={id}
            openUpdate={openUpdate}
            handleClose={handleClose}
            getSubCategory={getSubCategory}
          />
          <Table columns={columns} data={formattedSubCategory} />
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
              Êtes-vous sûr(e) de vouloir archiver cette sous catégorie ?
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
        </div>
      </div>
    </>
  );
};
export default SubCategoryList;
