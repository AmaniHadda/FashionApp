import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Button, Box, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Stack, Alert } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";

function Apropos() {
  const [apropos, setApropos] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [phoneNumber1, setPhoneNumber1] = useState("");
  const [phoneNumber2, setPhoneNumber2] = useState("");
  const [rue, setRue] = useState("");
  const [ville, setVille] = useState("");
  const [iseditingtel1, setiseditingtel1] = useState(false);
  const [iseditingtel2, setiseditingtel2] = useState(false);
  const [iseditingadd1, setiseditingadd1] = useState(false);
  const [iseditingadd2, setiseditingadd2] = useState(false);
  const [InfoShow, setInfoShow] = useState(true);
  const boxShadowStyle = {
    marginLeft: "10px",
    width: "500px",
    height: "350px",
    marginTop: "80px",
    backgroundColor: "#f4e7f0",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px",
  };
  useEffect(() => {
    fetchApropos();
  }, []);
  const fetchApropos = async () => {
    try {
      const response = await axios.get("/apropos/getAllApropos");
      setApropos(response.data[0]);
    } catch (error) {
      console.error("Error retrieving A propos:", error);
    }
  };
  const fetchAproposById = async (id) => {
    try {
      const response = await axios.get(` /apropos/${id}`);
      setApropos(response.data);
      setPhoneNumber1(response.data.phoneNumber1);
      setPhoneNumber2(response.data.phoneNumber2);
      setRue(response.data.rue);
      setVille(response.data.ville);
    } catch (error) {
      console.error("Error retrieving A propos:", error);
    }
  };
  const handleUpdate = () => {
    fetchAproposById(apropos._id);
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleUpdateApropos = async () => {
    try {
      const updatedAproposData = {
        phoneNumber1,
        phoneNumber2,
        rue,
        ville,
      };

      const response = await axios.put(` /apropos/${apropos._id}`, updatedAproposData);
      toast.success("Apropos modifié avec success");
      setModalOpen(false);
      fetchApropos();
    } catch (error) {
      toast.success("Erreur de modification de APROPOS");
      console.error("Error updating A propos:", error);
    }
  };
  const handleDelete = async () => {
    // Open the confirmation dialog
    setDeleteConfirmationOpen(true);
  };
  const handleCloseDeleteConfirmation = () => {
    setDeleteConfirmationOpen(false);
  };
  const handleConfirmDelete = async () => {
    try {
      await axios.delete(` /apropos/deleteApropos/${apropos._id}`);
      setDeleteConfirmationOpen(false);
      fetchApropos();
    } catch (error) {
      console.error("Error deleting A propos:", error);
    }
  };

  return (
    <div className="banner-list-page">
      <div className="banner-list-container">
        <div style={boxShadowStyle} >
          <ToastContainer />
          <Typography variant="h4" gutterBottom style={{ paddingTop: "1ch", paddingLeft: "10vh" }}>
            Boutique Infos
          </Typography>
          {apropos ? (
            <Box>
              <Typography variant="body1" gutterBottom>
                <span style={{ paddingLeft: "10vh", fontWeight: 'bold' }}>Premier Numéro De Téléphone:</span> <span >{apropos.phoneNumber1}</span>
              </Typography><br />
              <Typography variant="body1" gutterBottom>
                <span style={{ paddingLeft: "10vh", fontWeight: 'bold' }}>Deuxième Numéro De Téléphone:</span><span > {apropos.phoneNumber2}</span>
              </Typography><br />
              <Typography variant="body1" gutterBottom>
                <span style={{ paddingLeft: "10vh", fontWeight: 'bold' }}>Première Adresse:</span><span >{apropos.ville}</span>
              </Typography><br />
              <Typography variant="body1" gutterBottom>
                <span style={{ paddingLeft: "10vh", fontWeight: 'bold' }}>Deuxième Adresse:</span><span >{apropos.rue}</span>
              </Typography><br />
              <Button variant="contained"
                style={{
                  backgroundColor: "#d499ac",
                  color: "white",
                  marginRight: "8px",
                  marginLeft: "5vh"
                }}
                onClick={handleUpdate}>
                Modifier
              </Button>
            </Box>
          ) : (
            <Typography variant="body1" gutterBottom>
              A propos est Vide
            </Typography>
          )}
          <Dialog open={modalOpen} onClose={handleCloseModal} maxWidth="sm" fullWidth>
            <DialogTitle>Actualiser A propos</DialogTitle>
            <DialogContent>
            {InfoShow && <Stack sx={{ width: '100%', marginTop: "15px", marginBottom: "10px" }} spacing={2}>
              <Alert severity="info">Clique simplement sur l'élément et effectue les modifications souhaitées. !</Alert>
            </Stack>}
              <div onClick={() => setiseditingtel1(true)}>{!iseditingtel1 && (
                <div style={{ marginTop: "15px" }}>
                  <strong>Premier Numéro de Téléphone :</strong>
                  {apropos?.phoneNumber1}
                </div>
              )}</div>
              {iseditingtel1 && (<div>
                <TextField
                  label="Premier Numero De Telephone"
                  variant="outlined"
                  value={phoneNumber1}
                  onChange={(e) => setPhoneNumber1(e.target.value)}
                  fullWidth
                  margin="normal"
                />
              </div>)}
              <div onClick={() => setiseditingtel2(true)}>{!iseditingtel2 && (
                <div style={{ marginTop: "15px" }}>
                  <strong>Deuxième Numéro de Téléphone :</strong>
                  {apropos?.phoneNumber2}
                </div>
              )}</div>
              {iseditingtel2 && (<div>
                <TextField
                  label="Second Numero De Telephone"
                  variant="outlined"
                  value={phoneNumber2}
                  onChange={(e) => setPhoneNumber2(e.target.value)}
                  fullWidth
                  margin="normal"
                />
              </div>)}
              <div onClick={() => setiseditingadd1(true)}>{!iseditingadd1 && (
                <div style={{ marginTop: "15px", cursor: "pointor" }}>
                  <strong>Première Adresse :</strong>
                  {apropos?.ville}
                </div>
              )}</div>
              {iseditingadd1 && (<div >
                <TextField
                  label="Premiere Adresse"
                  variant="outlined"
                  value={ville}
                  onChange={(e) => setVille(e.target.value)}
                  fullWidth
                  margin="normal"
                /></div>)}
              <div onClick={() => setiseditingadd2(true)}>{!iseditingadd2 && (
                <div style={{ marginTop: "15px", cursor: "pointor" }}>
                  <strong>Deuxième Adresse :</strong>
                  {apropos?.rue}
                </div>
              )}</div>
              {iseditingadd2 && (<div >
                <TextField
                  label="Deuxieme Adresse"
                  variant="outlined"
                  value={rue}
                  onChange={(e) => setRue(e.target.value)}
                  fullWidth
                  margin="normal"
                /></div>)}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal} style={{ color: 'black' }}>
                Annuler
              </Button>
              <Button onClick={handleUpdateApropos} variant="contained" style={{ backgroundColor: '#ec407a' }}>
                Modifier
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog open={deleteConfirmationOpen} onClose={handleCloseDeleteConfirmation}>
            <DialogTitle>Confirmation</DialogTitle>
            <DialogContent>
              <Typography>Êtes-vous certain(e) de vouloir supprimer A propos?</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDeleteConfirmation} style={{ color: "purple" }}>Annuler</Button>
              <Button onClick={handleConfirmDelete} color="error">
                Supprimer
              </Button>
            </DialogActions>
          </Dialog>
        </div></div></div>
  );
}

export default Apropos;

