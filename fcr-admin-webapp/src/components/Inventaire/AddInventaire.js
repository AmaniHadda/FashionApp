import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Rating, Select, TextField } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useTheme } from '@mui/material/styles';
import { format } from 'date-fns';

function AddInventaire({ open, handleClose, getInventaires }) {
    const [habillements, setHabillements] = useState([]);
    const [parrains, setParrains] = useState([]);
    const [locataire, setLocataires] = useState("");
    const [dateLocation, setdateLocation] = useState("");
    const [dateRecuperation, setdateRecuperation] = useState("");
    const [dateEffectifRecuperation, setdateEffectifRecuperation] = useState("");
    const [qualite, setQualite] = React.useState(0);
    const [marque, setMarque] = React.useState(0);
    const [tendance, setTendance] = React.useState(0);
    const [rarete, setRarete] = React.useState(0);
    const [price, setPrice] = useState(0);
    const [hb, setHb] = useState("");
    const [loacErr, setlocErr] = useState("")
    const [HabErr, setHabErr] = useState("")
    const [daterecerr, setdaterecErr] = useState("")
    const [datelocErr, setDatlocErr] = useState("")
    const [priceErr, setPriceErr] = useState("")
    const [etatErr, setEtatErr] = useState("")
    const getHabillements = async () => {
        await axios.get(" /habillements/retrieve/enable")
            .then(res => setHabillements(res.data.data)).catch(err => console.log(err))
    }
    const fetchParrains = async () => {
        try {
            const response = await axios.get(" /parrain/retrieveParrain");
            setParrains(response.data.data);
        } catch (error) {
            console.log("Error fetching parrains", error);
        }
    };
    const handleChangeHB = (e) => {
        setHb(e.target.value)
        if (!e.target.value) {
            setHabErr("Ce champs est requis")
        }
    };
    const handleChangeLocataire = (e) => {
        setLocataires(e.target.value)
        if (!e.target.value) {
            setlocErr("Ce champs est requis")
        } else {
            setlocErr("")
        }
    }
    const handleChangedateLocation = (e) => {
        setdateLocation(e.target.value)
        const currentDate = new Date();
        const today = format(currentDate, 'yyyy-MM-dd');
        if (!e.target.value) {
            setDatlocErr("Ce champs est requis")
        }
        else if (e.target.value < today) {
            setDatlocErr("La date doit étre supérieure à date d'aujourd'hui")
        }
        else {
            setDatlocErr("")
        }
    }
    const handleChangedateRecuperation = (e) => {
        setdateRecuperation(e.target.value)
        const currentDate = new Date();
        const today = format(currentDate, 'yyyy-MM-dd');
        if (!e.target.value) {
            setdaterecErr("Ce champs est requis")
        }
        else if (e.target.value < today) {
            setdaterecErr("La date doit étre supérieure à date d'aujourd'hui")
        }
        else {
            setdaterecErr("")
        }
    }
    const handleprice = (e) => {
        setPrice(e.target.value)
        if (!e.target.value) {
            setPriceErr("Ce champs est requis")
        } else {
            setPriceErr("")
        }
    }

    const addInventaire = async () => {
        if (!locataire || !hb || !dateLocation || !dateRecuperation || !price || !qualite || !tendance || !rarete || !marque) {
            setlocErr(locataire ? "" : "Ce champs est requis")
            setHabErr(hb ? "" : "Ce champs est requis")
            setDatlocErr(dateLocation ? "" : "Ce champs est requis")
            setdaterecErr(dateRecuperation ? "" : "Ce champs est requis")
            setPriceErr(price ? "" : "Ce champs est requis")
            setEtatErr(qualite && tendance && rarete && marque ? "" : "Ce champs est requis")
            console.log(etatErr)
            return;
        }
        const currentDate = new Date();
        const today = format(currentDate, 'yyyy-MM-dd');
        if (dateLocation < today) {
            return setDatlocErr("La date doit étre supérieure à date d'aujourd'hui")
        }
        if (dateRecuperation < today) {
            return setdaterecErr("La date doit étre supérieure à date d'aujourd'hui")
        }
        if (dateRecuperation < dateLocation) {
            return toast.error("La date du récupération doit étre supérieure à la date de location")
        }
        await axios
            .post(" /inventaire/add", {
                locataire: locataire,
                habillement: hb,
                dateLocation: dateLocation,
                dateRecuperation: dateRecuperation,
                price: price,
                qualite: qualite,
                marque: marque,
                tendance: tendance,
                rarete: rarete
            })
            .then((res) => { getInventaires(); handleClose(); toast.success("Inventaire ajouté") })
            .catch(err => {
                if (err.response.status === 400) {
                    toast.error("l'habillement n'est pas disponible, il est en location")
                }
            });
    };
    useEffect(() => {
        getHabillements();
        fetchParrains();
    }, [])

    return (
        <>
            <ToastContainer />
            <Dialog
                open={Boolean(open)}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth
            >

                <DialogTitle style={{ color: "#ec407a" }}>
                    Ajouter un inventaire
                </DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1 },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <div style={{ marginTop: "15px" }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Habillement</InputLabel>
                                    <Select
                                        id="habillement"
                                        name="habillement"
                                        onChange={handleChangeHB}
                                        fullWidth
                                        labelId="demo-simple-select-label"
                                        label="Habillement"
                                        required
                                        className="form-control"
                                        error={Boolean(HabErr)}
                                    >
                                        {habillements.map((p) => (
                                            <MenuItem key={p._id} value={p._id}>
                                                {p.name}
                                            </MenuItem>
                                        ))}
                                    </Select><FormHelperText style={{ color: "#8f170ace" }}>{HabErr}</FormHelperText></FormControl>
                            </div>
                        </div>
                        <div style={{ marginTop: "15px" }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Locataire</InputLabel>
                                <Select
                                    id="proprietaire"
                                    name="locataire"
                                    onChange={handleChangeLocataire}
                                    fullWidth
                                    labelId="demo-simple-select-label"
                                    label="Locataire"
                                    required
                                    className="form-control"
                                    error={Boolean(loacErr)}
                                >
                                    {parrains.map((p) => (
                                        <MenuItem key={p._id} value={p.email}>
                                            {p.email}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText style={{ color: "#8f170ace" }}>{loacErr}</FormHelperText>
                            </FormControl>
                        </div>
                        <div style={{ marginTop: "15px", marginLeft:-7 , marginRight:6 }}>
                            <TextField
                                type="date"
                                id="outlined-required"
                                name="Date"
                                onChange={handleChangedateLocation}
                                placeholder="Date de location"
                                label="Date de location"
                                required
                                fullWidth
                                focused
                                error={Boolean(datelocErr)}
                                helperText={datelocErr}
                            ></TextField>
                        </div>
                        <div style={{ marginTop: "15px", marginLeft:-7, marginRight:6  }}>
                            <TextField
                                type="date"
                                id="outlined-required"
                                name="Date"
                                onChange={handleChangedateRecuperation}
                                placeholder="Date de récupération"
                                label="Date de récuperation"
                                required
                                fullWidth
                                focused
                                error={Boolean(daterecerr)}
                                helperText={daterecerr}
                            ></TextField>
                        </div>

                        <div style={{ marginTop: "8px",marginBottom:"10px", marginLeft:-7, marginRight:6 }}>
                            <TextField
                                type="number"
                                id="outlined-required"
                                name="price"
                                onChange={handleprice}
                                label="Prix Total"

                                required
                                fullWidth
                                error={Boolean(priceErr)}
                                helperText={priceErr}
                            ></TextField>
                        </div>
                        <div>
                            <strong> Etat de l'habillement à la livraison: </strong><FormHelperText style={{ color: "#8f170ace" }}>{etatErr}</FormHelperText>
                            <div style={{ display: "flex", alignItems: "center", marginTop: 5 }}><label style={{ marginRight: "25px" }}><strong>Qualité</strong></label>
                                <Rating name="customized-10" style={{ color: "pink" }} defaultValue={qualite} max={10}
                                    value={qualite}
                                    onChange={(event, newValue) => {
                                        setQualite(newValue);
                                    }} />
                            </div>
                            <div style={{ display: "flex", alignItems: "center", marginTop: 5 }}><label style={{ marginRight: "20px" }}><strong>Marque</strong></label>
                                <Rating name="customized-10" style={{ color: "pink" }} defaultValue={marque} max={10}
                                    value={marque}
                                    onChange={(event, newValue) => {
                                        setMarque(newValue);
                                    }} />
                            </div>
                            <div style={{ display: "flex", alignItems: "center", marginTop: 5 }}><label style={{ marginRight: "10px" }}><strong>Tendance</strong></label>
                                <Rating name="customized-10" style={{ color: "pink" }} defaultValue={tendance} max={10}
                                    value={tendance}
                                    onChange={(event, newValue) => {
                                        setTendance(newValue);
                                    }} />
                            </div>
                            <div style={{ display: "flex", alignItems: "center", marginTop: 5 }}><label style={{ marginRight: "30px" }}><strong>Rareté</strong></label>
                                <Rating name="customized-10" style={{ color: "pink" }} defaultValue={rarete} max={10}
                                    value={rarete}
                                    onChange={(event, newValue) => {
                                        setRarete(newValue);
                                    }} />
                            </div>
                        </div>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        style={{ color: "black" }}
                    >
                        Fermer
                    </Button>
                    <Button
                        style={{ backgroundColor: "#ec407a", color: "white" }}
                        onClick={addInventaire}
                    >
                        Ajouter invantaire
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddInventaire