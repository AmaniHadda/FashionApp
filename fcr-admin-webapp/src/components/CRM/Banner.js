import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tabs, Tab, Input, Tooltip, Stack, Alert, Typography, IconButton, FormHelperText } from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { GiVerticalBanner } from "react-icons/gi";
import { AiFillTags } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Table from "../Table/Table";
import "./banner.css";
import Logo from "./logo";

import { IoMdAdd } from "react-icons/io";


function CRM() {
  const [logo, setLogo] = useState(null);
  const [logoId, setLogoId] = useState("");
  const [showlogoModal, setShowlogoModal] = useState(false);
  const [banners, setBanners] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [description1, setDescription1] = useState("");
  const [description2, setDescription2] = useState("");
  const [description3, setDescription3] = useState("");
  const [isEditingTag, setisEditingTag] = useState(false);
  const [isEditingImg, setisEditingImg] = useState(false);
  const [isEditingTitre, setisEditingTitre] = useState(false);
  const [isEditingDescription, setisEditingDescription] = useState(false);
  const [image, setImage] = useState("");
  const [InfoShow, setInfoShow] = useState(true);
  const [bannerId, setBannerId] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [hovering, setHovering] = useState(false);
  // const [modalDelete, setModaldelete] = useState(false);
  // const [id, setId] = useState('');

  useEffect(() => {
    axios.get(" /logo")
      .then((response) => {
        const fetchedLogo = response.data[0];
        setLogo(fetchedLogo);
        setLogoId(fetchedLogo._id);
        console.log(fetchedLogo);
      })
      .catch((error) => {
        console.error("Error retrieving logo:", error);
      });
    fetchBanners();
    console.log(banners);
    setTimeout(() => {
      setInfoShow(false)
    }, 5002);
  }, []);
  const handleDescription1Change = (event) => {
    setDescription1(event.target.value);
  };
  const handleDescription2Change = (event) => {
    setDescription2(event.target.value);
  };
  const handleDescription3Change = (event) => {
    setDescription3(event.target.value);
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };
  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("description1", description1);
      formData.append("description2", description2);
      formData.append("description3", description3);
      formData.append("image", image);
      await axios.put(
        ` /banner/updatebanner/${bannerId}`,
        formData
      );
      toast.success("Bannière modifiée avec succès!");
      setShowModal(false);
      fetchBanners();
    } catch (error) {
      toast.error("Erreur de modifier la bannière!");
      console.error("Error updating banner:", error);
    }
  };
  const handleAdd = async () => {
    try {
      const formData = new FormData();
      formData.append("description1", description1);
      formData.append("description2", description2);
      formData.append("description3", description3);
      formData.append("image", image);

      await axios.post(`/banner/addbanner`, formData);
      setShowAddModal(false);
      toast.success("Bannière ajoutée avec succès!");
      fetchBanners();
    } catch (error) {
      toast.error("Erreur d'ajout de bannière!");
      console.error("Erreur d'ajout de bannière", error);
    }
  };
  const fetchBanners = async () => {
    try {
      const response = await axios.get(
        " /banner/getbanner"
      );
      const formattedBannier = response.data.map((b) => ({
        ...b,
        id: b._id,
      }));
      setBanners(formattedBannier);
    } catch (error) {
      console.error("Error retrieving banners:", error);
    }
  };
  const deleteBanner = async (id) => {
    try {
      const confirmDelete = window.confirm("Êtes-vous sûr(e) de vouloir supprimer cette bannière ?");
      if (confirmDelete) {

        await axios.delete(` /banner/${id}`);
        // setModaldelete(false)
        fetchBanners();
        toast.success("Bannière supprimée avec succès!");
      }
    } catch (error) {
      console.error("Error deleting banner:", error);
      toast.error("Erreur lors de la suppression de la bannière!");
    }
  };
  const updateBanner = async (id) => {
    try {
      const bannerToUpdate = banners.find((banner) => banner._id === id);

      setDescription1(bannerToUpdate.description1);
      setDescription2(bannerToUpdate.description2);
      setDescription3(bannerToUpdate.description3);
      setImage(bannerToUpdate.image);
      setBannerId(id);
      setShowModal(true);
    } catch (error) {
      console.error("Error updating banner:", error);
    }
  };
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  const handleAddModalOpen = () => {
    setShowAddModal(true);
  };
  const handleAddModalClose = () => {
    setShowAddModal(false);
  };
  const handleImagelogoChange = (event) => {
    const file = event.target.files[0];
    setLogo(file);
  };
  const handlelogoSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("logo", logo);

      await axios.put(` /logo/update/${logoId}`, formData);

      setShowlogoModal(false);
    } catch (error) {
      console.error("Error updating logo:", error);
    }
  };
  const handleImageClick = () => {
    setShowlogoModal(true);
  };
  const columns = [
    {
      field: "description1",
      headerName: "Tag",
      description: "This column has a value getter and is not sortable.",
      sortable: true,
      width: 300,
    },
    {
      field: "description2",
      headerName: "Titre",
      description: "This column has a value getter and is not sortable.",
      sortable: true,
      width: 200,
    },
    {
      field: "description3",
      headerName: "Description",
      description: "",
      sortable: true,
      width: 200,
    },
    {
      field: "image",
      headerName: "Image",
      description: "",
      sortable: true,
      width: 200,
      renderCell: (data) => (
        <img
          src={`${process.env.REACT_APP_URL_UPLOAD}/banner/${data.row.image}`}
          alt="BannerImg"
          className="banner-image"
          style={{ margin: "2px", width: "120px" }}
        />
      ),
    },
    {
      field: "Action",
      headerName: "Actions",
      description: "",
      sortable: true,
      width: 150,
      renderCell: (data) => {
        return (
          <div className="text-center">
            <Tooltip title="Modifier">
              <a
                href="#"
                onClick={() => updateBanner(data.row._id)}
                style={{ fontSize: 23 + "px", color: "#f5e277", marginRight: 10 + "px", cursor: "pointer" }}

              >
                <FaEdit />
              </a>
            </Tooltip>
            <Tooltip title="Supprimer">
              <a
                href="#"
                //  onClick={() => {setModaldelete(true);setId(data.row._id)} }
                onClick={() => deleteBanner(data.row._id)}
                style={{ fontSize: 20 + "px", color: "#e68181", marginRight: 15 + "px", cursor: "pointer" }}
              >
                <FaTrash />
              </a>
            </Tooltip>
          </div>
        );
      },
    },
  ];
  return (
    <div className="banner-list-page">
      <div className="banner-list-container">
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          className="custom-tabs"
          centered
        >
          <Tab icon={<GiVerticalBanner />} label="Bannières" />

          <Tab icon={<AiFillTags />} label="Logo" />
        </Tabs>
        {activeTab === 0 && (
          <div>
            <div style={{ alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <h1 style={{ fontSize: "1.7rem", color: "black", margin: "10px 0" }}>Mes Bannières </h1>
                {/* <h1 style={{ fontSize: "1.7rem", color: "black", marginLeft: "90vh" }}>Mon logo </h1>*/}
                <br /></div> 
              <div style={{ display: "flex", alignItems: "center" }}>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#d499ac",
                    color: "white",
                    marginBottom: "10px",
                  }}
                  onClick={handleAddModalOpen}
                >
                  <IoMdAdd />
                  Ajouter une bannière
                </Button>

                {/* <div style={{ position: 'relative', display: 'inline-block' }}>
                  {logo && (
                    <img
                      src={` /uploads/logo/${logo.logo}?${Date.now()}`}
                      alt="logo"
                      style={{ width: "100px", height: "80px", marginLeft: "85vh", cursor: "pointer" }}
                      onClick={handleImageClick}
                      onMouseEnter={() => setHovering(true)}
                      onMouseLeave={() => setHovering(false)}
                    />
                  )}
                  {hovering && (
                    <IconButton
                      style={{
                        position: 'absolute',
                        top: '5px',
                        right: '5px',
                        color: 'white',
                        backgroundColor: '#d499ac',
                      }}
                      onClick={handleImageClick}
                    >
                      <FaEdit />
                    </IconButton>
                  )}

                </div> */}

              </div>
              <br />
              <Dialog open={showlogoModal} onClose={() => setShowlogoModal(false)} maxWidth="sm" fullWidth>
                <DialogTitle style={{ color: '#ec407a' }}>Modifier Logo</DialogTitle>
                <DialogContent>
                  <Typography variant="subtitle1" gutterBottom>
                    Veuillez choisir une nouvelle image de logo :
                  </Typography>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImagelogoChange}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setShowlogoModal(false)} style={{ color: "black" }}>Annuler</Button>
                  <Button onClick={handlelogoSubmit} variant="contained" style={{ backgroundColor: '#ec407a' }}>Enregistrer</Button>
                </DialogActions>
              </Dialog>

            </div>

            <br />
            <div className="table-container">
              <Table columns={columns} data={banners} />
            </div>
          </div>
        )}
        {activeTab === 1 && (
          <div className=" row flex-d">
            {" "}
            <div style={{ flex: 1, marginTop: "20px", marginLeft: "35vh" }}>
              <Logo />
            </div>
          </div>
        )}
        <Dialog
          open={showModal}
          onClose={() => { setShowModal(false); setisEditingDescription(false); setisEditingTag(false); setisEditingTitre(false); setisEditingImg(false) }}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle style={{ color: "#ec407a" }}>
            Modifier Bannière
          </DialogTitle>
          <DialogContent>
            {InfoShow && <Stack sx={{ width: '100%', marginTop: "15px", marginBottom: "10px" }} spacing={2}>
              <Alert severity="info">Clique simplement sur l'élément et effectue les modifications souhaitées. !</Alert>
            </Stack>}
            <div onClick={() => setisEditingImg(true)}>
              <img
                src={`${process.env.REACT_APP_URL_UPLOAD}banner/${image}`}
                alt="Img"
                className="banner-image"
                style={{ margin: "2px", width: "100%", height: "40%" }}
              /></div>
            {isEditingImg && <div >
              <Input
                type="file"
                accept="image/*"
                fullWidth
               
                onChange={handleImageChange}
              />
            </div>}
            <div onClick={() => setisEditingTag(true)}>{!isEditingTag && <div style={{ marginTop: "15px" }}><strong>Tag :</strong>{description1}</div>}</div>
            {isEditingTag && <TextField
              label="Tag"
              value={description1}
              onChange={handleDescription1Change}
              fullWidth
             
            />}
            <div onClick={() => setisEditingTitre(true)}>{!isEditingTitre && <div style={{ marginTop: "15px" }}><strong>Titre :</strong>{description2}</div>}</div>
            {isEditingTitre && <TextField
              label="Titre"
              value={description2}
              onChange={handleDescription2Change}
              fullWidth
             
            />}
            <div onClick={() => setisEditingDescription(true)}>{!isEditingDescription && <div style={{ marginTop: "15px" }}><strong>Description :</strong>{description3}</div>}</div>
            {isEditingDescription && <TextField
              label="Description"
              value={description3}
              onChange={handleDescription3Change}
              fullWidth
            
            />}


          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => { setShowModal(false); setisEditingDescription(false); setisEditingTag(false); setisEditingTitre(false); setisEditingImg(false) }}
              style={{ color: "black" }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              style={{ backgroundColor: "#ec407a" }}
            >
              Enregistrer les modifications
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={showAddModal}
          onClose={handleAddModalClose}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle style={{ color: "#ec407a" }}>Ajouter Bannière</DialogTitle>
          <DialogContent>
            <TextField
              label="Tag"
              value={description1}
              onChange={handleDescription1Change}
              fullWidth
              style={{marginBottom:"20px"}}
              required
            />
            <TextField
              label="Titre"
              value={description2}
              onChange={handleDescription2Change}
              fullWidth
              style={{marginBottom:"20px"}}
              required 
            />
            <TextField
              label="Description"
              value={description3}
              onChange={handleDescription3Change}
              fullWidth
              style={{marginBottom:"20px"}}
              required 
            />
            <p>Image</p>
            <Input
              type="file"
              accept="image/*"
              fullWidth
         
              onChange={handleImageChange}
              required 
            />
            <FormHelperText
              error
              hidden={Boolean(description1 && description2 && description3 && image)}
            >
              Tous les champs sont obligatoires !
            </FormHelperText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddModalClose} style={{ color: "black" }}>
              Annuler
            </Button>
            <Button
              onClick={handleAdd}
              variant="contained"
              style={{ backgroundColor: "#ec407a" }}
              disabled={!description1 || !description2 || !description3 || !image} // Disable the button if any field is empty
            >
              Ajouter
            </Button>
          </DialogActions>
        </Dialog>
        {/* <Dialog
          open={modalDelete}
          onClose={() => setModaldelete(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            Confirmation
          </DialogTitle>
          <DialogContent>
            Êtes-vous sûr(e) de vouloir supprimer cette bannière ?
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setModaldelete(false)}
              style={{ color: "black" }}
            >
              Fermer
            </Button>
            <Button
              style={{ backgroundColor: "#ec407a", color: "white" }}
              onClick={deleteBanner(id)}
            >
              Supprimer
            </Button>
          </DialogActions>
        </Dialog> */}
      </div>
      <ToastContainer />
    </div>
  );
}

export default CRM;