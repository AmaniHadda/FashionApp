import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, Input, InputLabel, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

export default function ReseauxSociaux() {

    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
    const [ResSoc, setResSoc] = useState(null);
    const [upFacebook, setupdatedFacebook] = useState("");
    const [upInstagram, setupdatedInstagram] = useState("");
    const [upTiktok, setupdatedTiktok] = useState("");
    const [upEmail, setupdatedEmail] = useState("");
    const [iseditingEmail, setiseditingEmail] = useState(false);
    const [iseditingTiktok, setiseditingTiktok] = useState(false);
    const [iseditingInstagram, setiseditingInstagram] = useState(false);
    const [iseditingFacebook, setiseditingFacebook] = useState(false);
    const [InfoShow, setInfoShow] = useState(true);
    
    const isFacebookValid = /^(https?:\/\/)?(www\.)?facebook.com\/.*$/i.test(upFacebook);
    const isInstagramValid = /^(https?:\/\/)?(www\.)?instagram.com\/.*$/i.test(upInstagram);
    const isTiktokValid = /^(https?:\/\/)?(www\.)?tiktok.com\/.*$/i.test(upTiktok);
    const isEmailValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i.test(upEmail);

    const boxShadowStyle = {
        marginTop: "80px",
        width: "500px",
        height: "350px",
        backgroundColor: "#f4e7f0",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px",
    };
    useEffect(() => {
        fetchReseauxSociaux();
    }, [])
    const handleUpdateClick = () => {
        setOpenUpdateDialog(true);
    };
    const handleUpdateClose = () => {
        setOpenUpdateDialog(false);
    };
    const fetchReseauxSociaux = async () => {
        try {
            const response = await axios.get("/ResSoc/getAll");
            const fetchedRes = response.data[0];
            setResSoc(fetchedRes);
            setupdatedFacebook(fetchedRes.lienFacebook);
            setupdatedInstagram(fetchedRes.lienInstagram);
            setupdatedTiktok(fetchedRes.lienTiktok);
            setupdatedEmail(fetchedRes.lienEmail);
        } catch (error) {
            console.error("Error retrieving Description:", error);
        }
    };
    const handleUpdateSubmit = async () => {
        try {
            if (isFacebookValid && isInstagramValid && isTiktokValid && isEmailValid) {
                await axios.put(`/ResSoc/${ResSoc._id}`, {
                    lienFacebook: upFacebook,
                    lienInstagram: upInstagram,
                    lienTiktok: upTiktok,
                    lienEmail:upEmail
                });
                setOpenUpdateDialog(false);
                toast.success('Réseau Social modifiée avec succès!');
                fetchReseauxSociaux();
            } else {
                toast.error('Veuillez corriger les liens invalides avant de modifier.');
            }
        } catch (error) {
            toast.error('Erreur de modification de Réseau Social!');
            console.error('Error updating Réseau Social:', error);
        }
    };

    return (
        <div className="">
            <div className="">
                <div style={boxShadowStyle}>
                    <ToastContainer />
                    <Typography variant="h4" gutterBottom style={{ marginLeft: "15vh", marginTop: "3vh", paddingTop: "3vh" }}>
                        Réseaux Sociaux
                    </Typography>
                    {ResSoc && (
                        <div>
                            <Typography variant="body1" gutterBottom>
                                <span style={{ paddingLeft: "10vh", fontWeight: 'bold' }}>Lien Facebook:</span>
                                <span >{ResSoc.lienFacebook}</span>
                            </Typography>
                            <br />
                            <Typography variant="body1" gutterBottom>
                                <span style={{ paddingLeft: "10vh", fontWeight: 'bold' }}>Lien Instagram:</span>
                                <span>{ResSoc.lienInstagram}</span>
                            </Typography>
                            <br />
                            <Typography variant="body1" gutterBottom>
                                <span style={{ paddingLeft: "10vh", fontWeight: 'bold' }}>Lien Tiktok:</span>
                                <span>{ResSoc.lienTiktok}</span>
                            </Typography>
                            <br/>
                            <Typography variant="body1" gutterBottom>
                                <span style={{ paddingLeft: "10vh", fontWeight: 'bold' }}>Email:</span>
                                <span>{ResSoc.lienEmail}</span>
                            </Typography>
                        </div>

                    )}
                    <Button onClick={handleUpdateClick} variant="contained" style={{ backgroundColor: "#d499ac", marginLeft: "20px",marginTop:"3vh" }}>
                        Modifier
                    </Button>
                    <Dialog open={openUpdateDialog} onClose={handleUpdateClose} fullWidth>
                        <DialogTitle>Modifier Réseaux Sociaux</DialogTitle>

                        <DialogContent>
                            {InfoShow && <Stack sx={{ width: '100%', marginTop: "15px", marginBottom: "10px" }} spacing={2}>
                                <Alert severity="info">Clique simplement sur l'élément et effectue les modifications souhaitées. !</Alert>
                            </Stack>}
                            <form>
                                <div onClick={() => setiseditingFacebook(true)}>
                                    {!iseditingFacebook && (
                                        <div style={{ marginTop: "15px" }}>
                                            <strong>Lien Facebook :</strong>
                                            {ResSoc?.lienFacebook}
                                        </div>
                                    )}
                                </div>
                                {iseditingFacebook && (
                                    <div>
                                        <FormControl fullWidth margin="normal">
                                            <TextField
                                                id="facebook"
                                                type="text"
                                                name="Facebook"
                                                label="Lien Facebook"
                                                focused
                                                value={upFacebook}
                                                onChange={(e) => setupdatedFacebook(e.target.value)}
                                                error={!isFacebookValid}
                                            />
                                            {!isFacebookValid && (
                                                <FormHelperText error>Lien Facebook invalide</FormHelperText>
                                            )}
                                        </FormControl>
                                    </div>
                                )}
                                <div onClick={() => setiseditingInstagram(true)}>
                                    {!iseditingInstagram && (
                                        <div style={{ marginTop: "15px" }}>
                                            <strong>Lien Instagram :</strong>
                                            {ResSoc?.lienInstagram}
                                        </div>
                                    )}
                                </div>
                                {iseditingInstagram && (
                                    <div>
                                        <FormControl fullWidth margin="normal">

                                            <TextField
                                                id="instagram"
                                                type="text"
                                                name="Instagram"
                                                label="Lien Instagram"
                                                value={upInstagram}
                                                focused
                                                onChange={(e) => setupdatedInstagram(e.target.value)}
                                                error={!isInstagramValid}
                                            />
                                            {!isInstagramValid && (
                                                <FormHelperText error>Lien Instagram invalide</FormHelperText>
                                            )}
                                        </FormControl>
                                    </div>
                                )}
                                <div onClick={() => setiseditingTiktok(true)}>
                                    {!iseditingTiktok && (
                                        <div style={{ marginTop: "15px" }}>
                                            <strong>Lien Tiktok :</strong>
                                            {ResSoc?.lienTiktok}
                                        </div>
                                    )}
                                </div>
                                {iseditingTiktok && (
                                    <div>
                                        <FormControl fullWidth margin="normal">
                                            <TextField
                                                id="tiktok"
                                                type="text"
                                                label="Lien Tiktok"
                                                name="Tiktok"
                                                value={upTiktok}
                                                onChange={(e) => setupdatedTiktok(e.target.value)}
                                                error={!isTiktokValid}
                                                focused
                                            />
                                            {!isTiktokValid && (
                                                <FormHelperText error>Lien Tiktok invalide</FormHelperText>
                                            )}
                                        </FormControl>
                                    </div>
                                )}
                                 <div onClick={() => setiseditingEmail(true)}>
                                    {!iseditingEmail && (
                                        <div style={{ marginTop: "15px" }}>
                                            <strong>Email :</strong>
                                            {ResSoc?.lienEmail}
                                        </div>
                                    )}
                                </div>
                                {iseditingEmail && (
                                    <div>
                                        <FormControl fullWidth margin="normal">
                                            <TextField
                                                id="Email"
                                                type="text"
                                                name="Email"
                                                label="Email"
                                                focused
                                                value={upEmail}
                                                onChange={(e) => setupdatedEmail(e.target.value)}
                                                error={!isEmailValid}
                                            />
                                            {!isEmailValid && (
                                                <FormHelperText error>Email Invalide</FormHelperText>
                                            )} 
                                        </FormControl>
                                    </div>
                                )}
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
            </div>
        </div>
    )
}
