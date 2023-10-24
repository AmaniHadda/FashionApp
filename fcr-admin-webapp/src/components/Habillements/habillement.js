import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Table from "../Table/Table";
import AddHabillementForm from "./AddHabillementForm";
import { Route } from "react-router-dom";
import { Badge, Button, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputAdornment, InputLabel, MenuItem, Select, Stack, TextField, Tooltip } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { FaTrash, FaEdit, FaUndo, FaArchive, FaSearch, FaEye, FaUserTie } from "react-icons/fa";
import { MdFiberNew, MdFlashOff } from "react-icons/md";
import {
  IoIosFlash,
  IoIosFlashOff,
  IoMdAdd, IoMdFlashOff
} from "react-icons/io";
import VenteFlash from "./VenteFlash";
import DetailUpdate from "./DetailUpdate";
import DetailsParrain from "../Parrain/DetailsParrain";
const Habillement = () => {
  const [id, setId] = useState(null);
  const [idProp, setIdProp] = useState(null);
  const [data, setData] = useState([]);
  const [habillements, setHabillements] = useState([]);
  const [query, setQuery] = useState("");
  const [formattedHabillements, setFormattedHabillements] = useState([]);
  const [selectedHabillement, setSelectedHabillement] = useState(null)
  const [open, setOpen] = useState(false);
  const [openD, setOpenD] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [ModalVenteFlash, setModalVenteFlash] = useState(false);
  const [dropdownData, setDropdownData] = useState(null);
  const [sousImages, setSousImages] = useState([]);
  const [isArchived, setIsArchived] = useState(false)
  const [modalArchive, setModalArchive] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedPrice, setEditedPrice] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [filtre, setFilter] = useState("");
  const [selectedImageId, setSelectedImageId] = useState(null);
  const handleCloseUpdateDialog = () => {
    setOpenUpdateDialog(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenDetails = () => {
    setOpenD(true);
  };

  const handleCloseDetails = () => {
    setOpenD(false);
  };
  useEffect(() => {
    const fetchDropdownData = async () => {
      const data = await getHabillements();
      setDropdownData(data);
    };
    fetchDropdownData();
  }, []);
  const getHabillements = async () => {
    try {
      const response = await axios.get(" /habillements/retrieve/enable");
      if (response.status === 200) {
        const habillementsData = response.data.data;
        setData(habillementsData);
        const formattedData = habillementsData.map((habillement) => {
          const brandName = habillement.brandFK ? habillement.brandFK.name : "";
          const seasonName = habillement.seasonFK ? habillement.seasonFK.name : "";
          const subcategoryName = habillement.subcategoryFK
            ? habillement.subcategoryFK.name
            : "";
          return {
            ...habillement,
            id: habillement._id,
            brandName,
            seasonName,
            subcategoryName,
          };
        });

        setFormattedHabillements(formattedData);
        setHabillements(formattedData);
        return {
          subcategories: response.data.subcategoryFK,
          brands: response.data.brandFK,
          seasons: response.data.seasonFK,
        };
      }

    } catch (error) {
      console.error(error, "error retrieving habillement");
    }
  };
  const handleUpdate = (id) => {
    setId(id);
    setOpenUpdateDialog(true);
  };
  const handleSearch = async (event) => {
    const searchTerm = event.target.value;
    setQuery(searchTerm);
  };
  const Search = async () => {
    await axios.get(`/habillements/search/${query}`).then(res => {
      console.log(res.data.data)
      const searchData = res.data.data.map((habillement) => {
        const brandName = habillement.brandFK ? habillement.brandFK.name : "";
        const seasonName = habillement.seasonFK ? habillement.seasonFK.name : "";
        const subcategoryName = habillement.subcategoryFK
          ? habillement.subcategoryFK.name
          : "";

        return {
          ...habillement,
          id: habillement._id,
          brandName,
          seasonName,
          subcategoryName,
        };
      });
      setFormattedHabillements(searchData);
    })
  }
  useEffect(() => {
    if (query.length > 0) {
      const delaySearch = setTimeout(Search, 100);
      return () => clearTimeout(delaySearch);
    }
    else {
      getHabillements()
    }
  }, [query])
  const handleArchive = async () => {
    try {
      let res;

      if (isArchived) {
        res = await axios.put(`/habillements/enable/${id}`);
      } else {
        res = await axios.put(`/habillements/disable/${id}`);
      }
      if (res.status === 200) {
        const updatedIsArchived = isArchived;
        toast.success(`Habillement ${updatedIsArchived ? "inarchivé" : "archivé"
          } avec succès`);
        const updatedHabillements = habillements.map((habillement) => {
          if (habillement._id === id) {
            return { ...habillement, isArchived: updatedIsArchived };
          }
          return habillement;
        });
        setHabillements(updatedHabillements);
        getHabillements();
        setModalArchive(false);
      } else {
        toast.error("erreur d' archiver/unarchiver habillement");
      }
    } catch (err) {
      console.error(err);
      toast.error("erreur d' archiver/unarchiver habillement");
    }
    getHabillements()
  };
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };
  const handleUpdateData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", editedName);
      formData.append("description", editedDescription);
      formData.append("price", editedPrice);
      const response = await axios.put(
        ` /habillements/update/${selectedHabillement._id}`,
        formData
      );
      setSelectedHabillement((prevHabillement) => ({
        ...prevHabillement,
        name: editedName,
        description: editedDescription,
        price: editedPrice,
      }));
      setIsEditing(false);
      toast.success("Habillement modifié avec succès")
      getHabillements();
    } catch (error) {
      console.error('Error updating habillement data:', error);
      toast.error("Erreur De Modification d'Habillement")
    }
  };
  const deleteSelectedImage = async () => {
    try {
      if (selectedImageId) {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette image ?")) {
          const response = await axios.delete(
            ` /hbs/images/delete/${selectedImageId}`
          );
          toast.success("Image supprimée avec succès", {
            className: "toast-success",
            bodyClassName: "toast-success",
          });
          if (sousImages.some((item) => item._id === selectedImageId && item.isMainImage)) {
            setSelectedImageId(null);
          }
          const updatedSousImages = sousImages.filter(
            (sousImage) => sousImage._id !== selectedImageId
          );
          setSousImages(updatedSousImages);
        }
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error("Erreur lors de la suppression de l'image");
    }
  };
  const FilterByIsNew = async () => {
    await axios.get("/filterHabillement/filterbynewest").then(res => {
      console.log(res.data.data)
      const searchData = res.data.data.map((habillement) => {
        const brandName = habillement.brandFK ? habillement.brandFK.name : "";
        const seasonName = habillement.seasonFK ? habillement.seasonFK.name : "";
        const subcategoryName = habillement.subcategoryFK
          ? habillement.subcategoryFK.name
          : "";

        return {
          ...habillement,
          id: habillement._id,
          brandName,
          seasonName,
          subcategoryName,
        };
      });
      setFormattedHabillements(searchData);
    }).catch(err => console.log(err))
  }
  const FilterByIsVenteFlash = async () => {
    await axios.get("/filterHabillement/filterbyventeflash").then(res => {
      console.log(res.data.data)
      const searchData = res.data.data.map((habillement) => {
        const brandName = habillement.brandFK ? habillement.brandFK.name : "";
        const seasonName = habillement.seasonFK ? habillement.seasonFK.name : "";
        const subcategoryName = habillement.subcategoryFK
          ? habillement.subcategoryFK.name
          : "";

        return {
          ...habillement,
          id: habillement._id,
          brandName,
          seasonName,
          subcategoryName,
        };
      });
      setFormattedHabillements(searchData);
    }).catch(err => console.log(err))
  }
  const handleDeleteVenteFlash = async () => {
    await axios.get(` /venteflash/delete/${id}`)
      .then(res => {
        toast.success("L'habillement est supprimé du vente flash.");
        getHabillements()
      })
      .catch(err => console.log(err))
  }
  const columns = [
    {
      field: "name",
      headerName: "Nom",
      description: "This column has a value getter and is not sortable.",
      sortable: true,
      width: 150,
    },
    {
      field: "proprietaire",
      headerName: "Propriétaire",
      description: "Propriétaire",
      sortable: true,
      width: 190,
      renderCell: (data) => {
        const index = data.row.proprietaire?.email?.indexOf("@");
        return (
          <div>
            <Stack direction="row"  >
              <Chip icon={<FaUserTie />} label={data.row.proprietaire?.email ? <Tooltip title="Détails propriétaire">
                <a href="#" onClick={() => { setIdProp(data.row.proprietaire.email); handleOpenDetails() }}>{data.row.proprietaire?.email?.slice(0, index)}</a>
              </Tooltip>
                : "Indisponible"} variant="outlined" />

            </Stack>
          </div>
        )
      },
    },

    {
      field: "price",
      headerName: "Prix",
      description: "",
      sortable: true,
      width: 100,
      renderCell: (data) => (
        <div>{data.row.price + " "} DT</div>
      ),
    },
    {
      field: "newPrice",
      headerName: "Promotion",
      description: "",
      sortable: true,
      width: 95,
      renderCell: (data) => (
        data.row.newPrice !== 0 ? (<div>{data.row.newPrice + " "} DT</div>) : (<div style={{ fontSize: "20px" }}>-</div>)
      ),
    },
    {
      field: "img",
      headerName: "Image",
      description: "Habillement image",
      sortable: true,
      width: 130,
      renderCell: (data) => (
        <img src={` ${process.env.REACT_APP_URL_UPLOAD}habillements/${data.row.img}`} alt="Habillement" style={{ width: 90, height: 100 }} />
      ),
    },
    {
      field: "etat",
      headerName: "Etat du dépot",
      description: "etat du dépot",
      sortable: true,
      width: 110,
      renderCell: (data) => (
        <div>{data.row.etatDepot?.etat + " %"} </div>
      ),
    },
    {
      field: "isNew_",
      headerName: "Nouveautés",
      description: "Brand foreign key",
      sortable: true,
      width: 110,
      renderCell: (data) => (
        data.row.isNew_ ? (<div style={{ fontSize: "25px", color: "green" }}><MdFiberNew /></div>) : (<div>-</div>)
      )
    },
    {
      field: "Action",
      headerName: "Action",
      description: "",
      sortable: true,
      width: 190,
      renderCell: (data) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Tooltip title="Modifier">
            <a
              variant="contained"
              style={{ fontSize: 23 + "px", color: "#f5e277", marginRight: 10 + "px", cursor: "pointer" }}
              onClick={() => handleUpdate(data.row._id)}>

              <FaEdit />
            </a></Tooltip>
          {!data.row.isVenteFlash && <Tooltip title="Vente Flash"><a
            variant="contained"
            style={{ fontSize: 25 + "px", color: "#ea6469", marginRight: 10 + "px", cursor: "pointer" }}
            onClick={() => { setId(data.row._id); setModalVenteFlash(true) }}
          >
            <IoIosFlash />
          </a></Tooltip>}
          {data.row.isVenteFlash && <Tooltip title="Annuler le vente flash"><a
            variant="contained"
            style={{ fontSize: 25 + "px", color: "#ea6469", marginRight: 10 + "px", cursor: "pointer" }}
            onClick={() => { setId(data.row._id); handleDeleteVenteFlash() }}
          >
            <IoIosFlashOff />
          </a></Tooltip>}
          <Tooltip title="Archiver">
            <a
              variant="contained"
              style={{ fontSize: 20 + "px", color: "#CB94F0", marginRight: 10 + "px", cursor: "pointer" }}
              onClick={() => { setId(data.row._id); setModalArchive(true); setIsArchived(data.row.isArchived) }}
            >
              {data.row.isArchived ? <FaUndo /> : <FaArchive />}
            </a></Tooltip>


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
            Mes Habillements
          </h1>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#d499ac",
                color: "white",
                marginBottom: "10px",
              }}
              onClick={handleOpen}
            >
              <IoMdAdd />
              Ajouter un Habillement
            </Button>
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }} >
              <FormControl sx={{ m: 1, minWidth: 120, marginBottom: "17px" }}>
                <InputLabel id="demo-select-small-label">Filtre</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  label="Filtre"
                  value={filtre}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <MenuItem value="Tous" onClick={getHabillements}>Tous</MenuItem>
                  <MenuItem value="Ventes Flash" onClick={FilterByIsVenteFlash}>Ventes flash</MenuItem>
                  <MenuItem value="Nouveautés" onClick={FilterByIsNew}>Nouveautés</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Recherche"
                type="search"
                placeholder="Rechercher..."
                name="name"
                value={query}
                onChange={(e) => handleSearch(e)}
                sx={{ width: "30ch", marginBottom: "10px" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaSearch />
                    </InputAdornment>
                  ),
                }}
              ></TextField>
            </div>

            <AddHabillementForm open={open} handleClose={handleClose} dropdownData={dropdownData} getHabillements={getHabillements} />
            {openUpdateDialog && <DetailUpdate id={id} openUpdate={openUpdateDialog} onClose={handleCloseUpdateDialog} getHabillements={getHabillements} />
            }
            <Dialog open={showModal} style={{ height: "100%" }} onClose={() => setShowModal(false)}>
              <DialogTitle style={{ fontStyle: "bold", fontSize: "30px", textAlign: "center", color: "#ec407a" }}>Aperçu</DialogTitle>
              <DialogContent>
                {selectedHabillement && (
                  <div className="container mt-5 pt-5">
                    <div className="product-box row" data-aos="fade-left">
                      <div className="col-lg-6 col-md-8 col-sm-12 mx-5" >
                        <Carousel
                          useKeyboardArrows={true}
                          infiniteLoop={true}
                          emulateTouch={true}
                          dynamicHeight={true}
                          showArrows={false}
                          selectedItem={selectedImageId !== null ? sousImages.findIndex((item) => item._id === selectedImageId) + 1 : 0} // Step 1: Add +1 to the index
                          onChange={(index) => setSelectedImageId(index === 0 ? null : sousImages[index - 1]?._id)} // Step 1: Subtract 1 from the index

                        >
                          <div>
                            <img
                              src={` ${process.env.REACT_APP_URL_UPLOAD}habillements/${selectedHabillement.img}?${Date.now()}`}
                              alt=""
                            // style={{ width: "150px", height: "200px" }} // Adjust the size for the main image
                            />
                          </div>
                          {sousImages.map((sousImage) => (
                            <div className="container" style={{ height: "20px" }} key={sousImage._id}>
                              <img
                                src={` ${process.env.REACT_APP_URL_UPLOAD}habillements/hb_images/${sousImage.hbImg}?${Date.now()}`}

                                alt=""
                              />

                            </div>
                          ))}
                        </Carousel>
                        {selectedImageId && (
                          <button onClick={deleteSelectedImage} style={{ height: "20px", color: "#e68181", cursor: "pointer" }}>
                            Supprimer la sous image sélectionnée <FaTrash />
                          </button>
                        )}

                        <div>
                          <div>
                            <strong>Nom: </strong>
                            {isEditing ? (
                              <TextField
                                value={editedName}
                                onChange={(e) => setEditedName(e.target.value)}
                              />
                            ) : (
                              <span onClick={toggleEditMode}>{selectedHabillement.name}</span>
                            )}
                          </div>
                          <div>
                            <strong>Description: </strong>
                            {isEditing ? (
                              <TextField
                                value={editedDescription}
                                onChange={(e) => setEditedDescription(e.target.value)}
                              />
                            ) : (
                              <span onClick={toggleEditMode}>{selectedHabillement.description}</span>
                            )}
                          </div>

                          <div>
                            <strong>Prix: </strong>
                            {isEditing ? (
                              <TextField
                                value={editedPrice}
                                onChange={(e) => setEditedPrice(e.target.value)}
                              />
                            ) : (
                              <span onClick={toggleEditMode}>{selectedHabillement.price}</span>
                            )}
                          </div>
                          {selectedHabillement.subcategoryFK?.name && (
                            <p><strong>Subcategory:</strong> {selectedHabillement.subcategoryFK.name}</p>
                          )}
                          {selectedHabillement.seasonFK?.name && (
                            <p><strong>Saison:</strong> {selectedHabillement.seasonFK.name}</p>
                          )}
                          {selectedHabillement.brandFK?.name && (
                            <p><strong>Marque:</strong> {selectedHabillement.brandFK.name}</p>
                          )}
                          {selectedHabillement.subcategoryFK?.name === "chaussures" ? (
                            <p><strong>Tailles de chaussures:</strong> {Array.isArray(selectedHabillement.shoesizes) ? selectedHabillement.shoesizes.join("/") : selectedHabillement.shoesizes}</p>
                          ) : (
                            <p><strong>Tailles:</strong> {Array.isArray(selectedHabillement.sizes) ? selectedHabillement.sizes.join("/") : selectedHabillement.sizes}</p>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="contained"
                        onClick={isEditing ? handleUpdateData : toggleEditMode}
                        style={{
                          backgroundColor: isEditing ? "green" : "blue",
                          color: "white",
                        }}
                      >
                        {isEditing ? "Update" : "Edit"}
                      </Button>
                    </div>
                  </div>
                )}
              </DialogContent>

              <DialogActions>
                <Button onClick={() => setShowModal(false)} style={{ fontStyle: "bold", color: "#ec407a" }}>
                  Fermer
                </Button>
              </DialogActions>
            </Dialog>

          </div>

          {ModalVenteFlash && <VenteFlash handleClose={() => setModalVenteFlash(false)} getHabillements={getHabillements} id={id} />}


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
              Êtes-vous sûr(e) de vouloir archiver cet habillement ?
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
          <Table columns={columns} data={formattedHabillements} />
        </div></div>
      {openD && <DetailsParrain emailP={idProp} handleOpen={handleOpenDetails} handleClose={handleCloseDetails} />}
    </>
  );
};

export default Habillement;