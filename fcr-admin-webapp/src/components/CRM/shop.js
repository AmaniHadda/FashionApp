import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Stack,
  Alert,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ShopDetails = () => {
  const boxShadowStyle = {
    marginLeft: "10px",
    marginTop: "20px",
    paddingLeft:"5vh",
    width: "1070px",
    height: "580px",
    backgroundColor: "#f4e7f0",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px",
  };
  const [iseditingtitre, setiseditingtitre] = useState(false);
  const [iseditingdesc, setiseditingdesc] = useState(false);
  const [iseditingh1, setiseditingh1] = useState(false);
  const [iseditingh2, setiseditingh2] = useState(false);
  const [iseditinglien, setiseditinglien] = useState(false);
  const [shop, setShop] = useState(null);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [InfoShow, setInfoShow] = useState(true);
  const [updatedShop, setUpdatedShop] = useState({
    titre: '',
    description: '',
    heure1: '',
    heure2: '',
    lienMap: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchShopDetails();
  }, []);

  const fetchShopDetails = async () => {
    try {
      const response = await axios.get('/shop/shops');
      setShop(response.data[0]);
    } catch (error) {
      console.error('Error fetching shop details:', error);
    }
  };

  const handleUpdateClick = () => {
    setOpenUpdateDialog(true);
    setUpdatedShop(shop);
  };

  const handleUpdateClose = () => {
    setOpenUpdateDialog(false);
    setErrors({});
  };


  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdatedShop((prevShop) => ({
      ...prevShop,
      [name]: value,
    }));
  };
  const handleUpdateSubmit = async () => {
    if (validateForm()) {
      try {
        await axios.put(`/shop/shops/${shop._id}`, updatedShop);
        setOpenUpdateDialog(false);
        toast.success('Boutique modifiée avec succès!');
        fetchShopDetails();
      } catch (error) {
        toast.error('Erreur de modification de boutique!');
        console.error('Error updating shop:', error);
      }
    } else {
      toast.error('Veuillez remplir tous les champs obligatoires correctement!');
    }
  };
  const validateForm = () => {
    const newErrors = {};

    if (!updatedShop.titre.trim()) {
      newErrors.titre = 'Le titre est requis';
    }
    if (!updatedShop.description.trim()) {
      newErrors.description = 'La description est requise';
    }
    if (!updatedShop.heure1.trim()) {
      newErrors.heure1 = "L'heure 1 est requise";
    }
    if (!updatedShop.heure2.trim()) {
      newErrors.heure2 = "L'heure 2 est requise";
    }
    if (!updatedShop.lienMap.trim()) {
      newErrors.lienMap = 'Le lien Map est requis';
    } else if (! /^https?:\/\/(?:www\.)?google\.com\/maps\/.*$/.test(updatedShop.lienMap)) {
      newErrors.lienMap = 'Veuillez fournir un lien Google Maps valide';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  if (!shop) {
    return <div>Pas d'informations sur le shop</div>;
  }

  return (
    <div className="banner-list-page">
      <div className="banner-list-container">
        <div style={boxShadowStyle} >

          <Typography variant="h4" gutterBottom style={{ marginLeft: "60vh", paddingTop: "1ch" }}>
            Localisation
          </Typography>
          <div className="row">
            <span style={{ fontWeight: 'bold' }}>Titre :</span>
            {shop.titre}
          </div>
          <div className="row">
            <span style={{ fontWeight: 'bold' }}>Description: </span>
            {shop.description}
          </div>
          <div className="row">
            <span style={{ fontWeight: 'bold' }}>Heure d'ouverture : </span>
            {shop.heure1}
          </div>
          <div className="row">
            <span style={{ fontWeight: 'bold' }}>Heure de fermiture :</span> {shop.heure2}
          </div>
          <span style={{ fontWeight: 'bold' }}>
            Lien Map:
            <div className="d-flex justify-content-center">
              <iframe
                title="boutique"
                className="pt-2"
                src={shop.lienMap}
                height="300"
                style={{ border: 0, width: '70%', marginBottom: '4px', marginLeft: "10vh" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </span>

          <Button onClick={handleUpdateClick} variant="contained" style={{ backgroundColor: "#d499ac", marginLeft: "" }}>
            Modifier
          </Button>

          <Dialog open={openUpdateDialog} onClose={handleUpdateClose} fullWidth>
            <DialogTitle>Modifier Boutique</DialogTitle>
            <DialogContent>
              {InfoShow && <Stack sx={{ width: '100%', marginTop: "15px", marginBottom: "10px" }} spacing={2}>
                <Alert severity="info">Clique simplement sur l'élément et effectue les modifications souhaitées. !</Alert>
              </Stack>}
              <form onSubmit={handleUpdateSubmit}>
                <div onClick={() => setiseditingtitre(true)}>
                  {!iseditingtitre && (
                    <div style={{ marginTop: "15px" }}>
                      <strong>Titre:</strong>
                      {shop?.titre}
                    </div>
                  )}
                </div>
                {iseditingtitre && (
                  <div>
                    <TextField
                      type="text"
                      name="titre"
                      label="Titre"
                      value={updatedShop.titre}
                      onChange={handleUpdateChange}
                      required
                      fullWidth
                      margin="normal"
                      error={!!errors.titre}
                      helperText={errors.titre}
                    /></div>)}
                <div onClick={() => setiseditingdesc(true)}>
                  {!iseditingdesc && (
                    <div style={{ marginTop: "15px" }}>
                      <strong>Description:</strong>
                      {shop?.description}
                    </div>
                  )}
                </div>
                {iseditingdesc && (
                  <div>
                    <TextField
                      type="text"
                      name="description"
                      label="Description"
                      value={updatedShop.description}
                      onChange={handleUpdateChange}
                      required
                      fullWidth
                      multiline
                      maxRows={4}
                      margin="normal"
                      error={!!errors.description}
                      helperText={errors.description}
                    /></div>)}
                <div onClick={() => setiseditingh1(true)}>
                  {!iseditingh1 && (
                    <div style={{ marginTop: "15px" }}>
                      <strong>Heure d'ouverture :</strong>
                      {shop?.heure1}
                    </div>
                  )}
                </div>
                {iseditingh1 && (
                  <div><TextField
                    type="time"
                    name="heure1"
                    label="Heure d'ouverture"
                    value={updatedShop.heure1}
                    onChange={handleUpdateChange}
                    required
                    fullWidth
                    margin="normal"
                    error={!!errors.heure1}
                    helperText={errors.heure1}
                  /></div>)}
                <div onClick={() => setiseditingh2(true)}>
                  {!iseditingh2 && (
                    <div style={{ marginTop: "15px" }}>
                      <strong>Heure de fermiture :</strong>
                      {shop?.heure2}
                    </div>
                  )}
                </div>

                {iseditingh2 && (
                  <div><TextField
                    type="time"
                    name="heure2"
                    label="Heure de fermiture"
                    value={updatedShop.heure2}
                    onChange={handleUpdateChange}
                    required
                    fullWidth
                    margin="normal"
                    error={!!errors.heure2}
                    helperText={errors.heure2}
                  /></div>)}
                <div onClick={() => setiseditinglien(true)}>
                  {!iseditinglien && (
                    <div style={{ marginTop: "15px", wordWrap: "break-word" }}>
                      <strong>Lien Map :</strong>
                      {shop?.lienMap}
                    </div>
                  )}
                </div>
                {iseditinglien && (
                  <div><TextField
                    type="text"
                    name="lienMap"
                    label="Lien Map"
                    value={updatedShop.lienMap}
                    onChange={handleUpdateChange}
                    required
                    fullWidth
                    margin="normal"
                    error={!!errors.lienMap}
                    helperText={errors.lienMap}
                  /></div>)}
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleUpdateClose} style={{ color: 'black' }}>
                Cancel
              </Button>
              <Button onClick={handleUpdateSubmit} variant="contained" style={{ backgroundColor: '#ec407a' }}>
                Modifier
              </Button>
            </DialogActions>
          </Dialog>
          <ToastContainer />
        </div></div></div>
  );
};

export default ShopDetails;

