import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

export default function Description() {
    const boxShadowStyle = {
        marginLeft: "10px",
        width: "500px",
        marginTop: "20px",
        height: "580px",
        backgroundColor: "#f4e7f0",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px",
    };
    const [InfoShow, setInfoShow] = useState(true);
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
    const [updesc, setupdatedDesc] = useState("");
    const [uptitre, setupdatedTitre] = useState("");
    const [Description, setDescription] = useState(null);
    const [iseditingtitre, setiseditingtitre] = useState(false);
    const [iseditingdesc, setiseditingdesc] = useState(false);
    useEffect(() => {
        fetchDescription();
    }, []);

    const handleUpdateClick = () => {
        setOpenUpdateDialog(true);
    };

    const handleUpdateClose = () => {
        setOpenUpdateDialog(false);
    };

    const fetchDescription = async () => {
        try {
            const response = await axios.get("/desc/getAlldesc");
            const fetchedDescription = response.data[0];
            setDescription(fetchedDescription);
            setupdatedTitre(fetchedDescription.titre);
            setupdatedDesc(fetchedDescription.description);
        } catch (error) {
            console.error("Error retrieving Description:", error);
        }
    };

    const handleUpdateSubmit = async () => {
        try {
            await axios.put(`/desc/${Description._id}`, { description: updesc, titre: uptitre });
            setOpenUpdateDialog(false);
            toast.success('Description modifiée avec succès!');
            fetchDescription();
        } catch (error) {
            toast.error('Erreur de modification de la description!');
            console.error('Error updating description:', error);
        }
    };

    return (
        <div style={boxShadowStyle}>
            <ToastContainer />
            <Typography variant="h4" gutterBottom style={{ marginLeft: "19vh", marginTop: "3vh" }}>
                Description
            </Typography>
            <Typography >
                <img
                    src={`${process.env.REACT_APP_URL_UPLOAD}exemple.png`}
                    alt="exemple"
                    style={{ width: "58vh", height: "25vh", marginLeft: "5vh" }}
                /></Typography>
            {Description && (
                <div>
                    <br /><br />
                    <Typography variant="body1" gutterBottom>
                        <span style={{ paddingLeft: "5vh", fontWeight: 'bold' }}>Titre:</span>
                    </Typography>
                        <div style={{paddingLeft:"5vh" , paddingRight:"5vh"}}>{Description.titre}</div>
                    <br />
                    <Typography variant="body1" gutterBottom>
                        <span style={{ paddingLeft: "5vh", fontWeight: 'bold' }}>Description:</span>
                    </Typography>
                        <div style={{paddingLeft:"5vh" , paddingRight:"5vh"}}>{Description.description}</div>
                </div>

            )}
            <Button onClick={handleUpdateClick} variant="contained" style={{ backgroundColor: "#d499ac", marginLeft: "5vh", marginTop: "40px" }}>
                Modifier
            </Button>
            <Dialog open={openUpdateDialog} onClose={handleUpdateClose} fullWidth>
                <DialogTitle>Modifier Description</DialogTitle>
                <DialogContent>
                {InfoShow && <Stack sx={{ width: '100%', marginTop: "15px", marginBottom: "10px" }} spacing={2}>
              <Alert severity="info">Clique simplement sur l'élément et effectue les modifications souhaitées. !</Alert>
            </Stack>}
                    <form>
                    <div onClick={() => setiseditingtitre(true)}>{!iseditingtitre && <div style={{ marginTop: "15px" }}><strong>Titre :</strong>{Description?.titre}</div>}</div>
                    {iseditingtitre &&<div>
                        <TextField
                            type="text"
                            name="titre"
                            label="Titre"
                            value={uptitre}
                            onChange={(e) => setupdatedTitre(e.target.value)}
                            required
                            fullWidth
                            style={{marginBottom:"20px"}}
                        /></div>}
                        <div onClick={()=>setiseditingdesc(true)}>{!iseditingdesc && <div style={{ marginTop: "15px" }}><strong>Description :</strong>{Description?.description}</div>}</div>
                        {iseditingdesc&& <div>
                            <TextField
                            type="text"
                            name="description"
                            label="Description"
                            multiline
                            maxRows={4}
                            value={updesc}
                            onChange={(e) => setupdatedDesc(e.target.value)}
                            required
                            fullWidth
                            style={{marginBottom:"20px"}}
                            
                        />
                        </div>}
             
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleUpdateClose} style={{ color: 'black' }}>
                        Annuler
                    </Button>
                    <Button onClick={handleUpdateSubmit} variant="contained" style={{ backgroundColor: '#ec407a' }}>
                        Modifier
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
