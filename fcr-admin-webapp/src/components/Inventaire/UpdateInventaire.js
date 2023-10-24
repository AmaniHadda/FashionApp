import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Rating, Select, TextField } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useTheme } from '@mui/material/styles';
import { format } from 'date-fns';

function UpdateInventaire({ open, handleClose, getInventaires, id }) {
    const [habillements, setHabillements] = useState([]);
    const [parrains, setParrains] = useState([]);

    const [locataire, setLocataires] = useState("");
    const [dateLocation, setdateLocation] = useState("");
    const [dateRecuperation, setdateRecuperation] = useState("");
    const [dateEffectifRecuperation, setdateEffectifRecuperation] = useState("");
    const [price, setPrice] = useState(0);
    const [hb, setHb] = useState({});
    const [hbName, setHbName] = useState("");
    const [IdRec, setIdRec] = useState("");
    const [IdEtatLivraison, setIdEtatLivraison] = useState("");
    const [etatLiv, setEtatLiv] = useState(0);
    const [qualite, setQualite] = React.useState(0);
    const [marque, setMarque] = React.useState(0);
    const [tendance, setTendance] = React.useState(0);
    const [rarete, setRarete] = React.useState(0);
    const [qualiteRec, setQualiteRec] = React.useState(0);
    const [marqueRec, setMarqueRec] = React.useState(0);
    const [tendanceRec, setTendanceRec] = React.useState(0);
    const [rareteRec, setRareteRec] = React.useState(0);
    const [etatRec, setEtatRec] = React.useState(0);

    const [isEditingHab, setIsEditingHab]=useState(false)
    const [isEditingloc, setIsEditingloc]=useState(false)
    const [isEditingdateloc, setIsEditingdateloc]=useState(false)
    const [isEditingdaterec, setIsEditingdaterec]=useState(false)
    const [isEditingdateeff, setIsEditingdateeff]=useState(false)
    const [isEditingprice, setIsEditingprice]=useState(false)
    const [isEditingEtatLiv, setisEditingEtatLiv]=useState(false)
    const [isEditingEtatRec, setisEditingEtatRec]=useState(false)

    const [loacErr, setlocErr] = useState("")
    const [HabErr, setHabErr] = useState("")
    const [daterecerr, setdaterecErr] = useState("")
    const [datelocErr, setDatlocErr] = useState("")
    const [priceErr, setPriceErr] = useState("")
    const [etatErr, setEtatErr] = useState("")
    const [dateEffErr, setdateEffErr] = useState("")

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
         if(!e.target.value){
            setHabErr("Ce champs est requis")  
        }
    };
    const handleChangeLocataire = (e) => {
        setLocataires(e.target.value)
        if(!e.target.value){
            setlocErr("Ce champs est requis")  
        }else{
            setlocErr("")
        }
    }
    const handleChangedateLocation = (e) => {
        setdateLocation(e.target.value)
        if(!e.target.value){
            setDatlocErr("Ce champs est requis")  
        }
       else{
            setDatlocErr("")
        }
    }
    const handleChangedateRecuperation = (e) => {
        setdateRecuperation(e.target.value)          
        if(!e.target.value){
            setdaterecErr("Ce champs est requis")  
        }       
        else{
            setdaterecErr("") 
        }
    }
    const handledateEffectifRecuperation = (e) => {
        setdateEffectifRecuperation(e.target.value)     
        if(!e.target.value){
            setdateEffErr("Ce champs est requis")  
        }
        else{
            setdateEffErr("") 
        }
    }
    const handleprice = (e) => {
        setPrice(e.target.value)
        if(!e.target.value){
            setPriceErr("Ce champs est requis")  
        }else{
            setPriceErr("") 
        }
    }
    const getInventaireById = async () => {
        const res = await axios.get(` /inventaire/retrieveOne/${id}`).then(res => {
            console.log(res.data.data)
            setLocataires(res.data.data.locataire.email)
            setHb(res.data.data.habillement?._id)
            setHbName(res.data.data.habillement?.name)
            setdateRecuperation(res.data.data.dateRecuperation?.slice(0, 10))
            setdateLocation(res.data.data.dateLocation?.slice(0, 10))
            setPrice(res.data.data.price)
            setdateEffectifRecuperation(res.data.data.dateEffectifRecuperation?.slice(0, 10))
            setIdEtatLivraison(res.data.data.etatLivraison)
            setIdRec(res.data.data.etatRecuperation)
            setMarque(res.data.data.etatLivraison?.marque)
            setQualite(res.data.data.etatLivraison?.qualite)
            setRarete(res.data.data.etatLivraison?.rarete)
            setTendance(res.data.data.etatLivraison?.tendance)
            setEtatRec(res.data.data.etatRecuperation?.etat)
            setEtatLiv(res.data.data.etatLivraison?.etat)
            setMarqueRec(res.data.data.etatRecuperation?.marque)
            setQualiteRec(res.data.data.etatRecuperation?.qualite)
            setRareteRec(res.data.data.etatRecuperation?.rarete)
            setTendanceRec(res.data.data.etatRecuperation?.tendance)
        })
    }
    const UpdateInventaire = async () => {
        if (!locataire || !hb || !dateLocation || !dateRecuperation || !price || !qualite|| !tendance|| !rarete || !marque) {
            setlocErr(locataire ? "" : "Ce champs est requis")
            setHabErr(hb ? "" : "Ce champs est requis")
            setDatlocErr(dateLocation ? "" : "Ce champs est requis")
            setdaterecErr(dateRecuperation ? "" : "Ce champs est requis")
            setPriceErr(price ? "" : "Ce champs est requis")
            setEtatErr(qualite&& tendance&& rarete&& marque? "" : "Ce champs est requis")
            return;
        }
        if(dateRecuperation<dateLocation){
            return toast.error("La date du récupération doit étre supérieure à la date de location")
        }
       else if(dateEffectifRecuperation&& dateEffectifRecuperation<dateLocation){
            return toast.error("La date effectif du récupération doit étre supérieure à la date de location")
        }        
        await axios
            .put(`/inventaire/update/${id}`, {
                locataire: locataire,
                habillement: hb,
                dateLocation: dateLocation,
                dateRecuperation: dateRecuperation,
                dateEffectifRecuperation: dateEffectifRecuperation,
                idRec:IdRec,
                price: price,
                qualite: qualite,
                marque: marque,
                tendance: tendance,
                rarete: rarete,
                idEtatLiv:IdEtatLivraison,
                qualiteRec: qualiteRec,
                marqueRec: marqueRec,
                tendanceRec: tendanceRec,
                rareteRec: rareteRec
            })
            .then((res) => { getInventaires(); handleClose(); toast.success("Inventaire modifié");
            setMarque(0)
            setQualite(0)
            setRarete(0)
            setTendance(0) })
            .catch(err => {
                if (err.response.status === 400) {
                    toast.error("l'habillement n'est pas disponible, il est en location")
                }
                console.log(err)});
    };
    useEffect(() => {
        getHabillements();
        fetchParrains();
        getInventaireById();
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
                    Modifier un inventaire
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
                        <div onClick={()=>setIsEditingHab(true)}>
                            {!isEditingHab&&<div><strong>Le nom du l'habillement :</strong>{hbName}</div>}
                            {isEditingHab&&<div style={{ marginTop: "15px" }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Habillement</InputLabel>
                                    <Select
                                        id="proprietaire"
                                        name="locataire"
                                        onChange={handleChangeHB}
                                        value={hb}
                                        fullWidth
                                        labelId="demo-simple-select-label"
                                        label="Habillement"
                                        required
                                        className="form-control"
                                        error={Boolean(HabErr)}
                                    >
                                        {habillements.map((p,index) => (
                                            <MenuItem key={p._id} value={p._id}>
                                                {p.name}
                                            </MenuItem>
                                        ))}
                                </Select><FormHelperText style={{color:"#8f170ace"}}>{HabErr}</FormHelperText></FormControl>
                            </div>}
                        </div>
                        <div style={{ marginTop: "15px" }} onClick={()=>setIsEditingloc(true)}>
                        {!isEditingloc&&<div><strong>Le locataire:</strong>{locataire}</div>}
                           { isEditingloc&&<FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Locataire</InputLabel>
                                <Select
                                    id="habillement"
                                    name="habillement"
                                    onChange={handleChangeLocataire}
                                    value={locataire}
                                    fullWidth
                                    labelId="demo-simple-select-label"
                                    label="Habillement"
                                    required
                                    className="form-control"
                                    error={Boolean(loacErr)}
                                >
                                    {parrains.map((p) => (
                                        <MenuItem key={p._id} value={p.email}>
                                            {p.email}
                                        </MenuItem>
                                    ))}
                                </Select><FormHelperText style={{color:"#8f170ace"}}>{loacErr}</FormHelperText></FormControl>}
                        </div>
                        <div style={{ marginTop: "15px" }}  onClick={()=>setIsEditingdateloc(true)}>
                        {!isEditingdateloc&&<div><strong>Date de location :</strong>{dateLocation}</div>}
                           { isEditingdateloc&&<TextField
                                type="date"
                                id="outlined-required"
                                name="Date"
                                value={dateLocation}
                                onChange={handleChangedateLocation}
                                placeholder="Date de location"
                                label="Date de location"
                                required
                                fullWidth
                                focused
                                error={Boolean(datelocErr)}
                                helperText={datelocErr}
                            ></TextField>}
                        </div>
                        <div style={{ marginTop: "15px" }} onClick={()=>setIsEditingdaterec(true)}>
                        {!isEditingdaterec&&<div><strong>Date de récupération :</strong>{dateRecuperation}</div>}
                           {isEditingdaterec&& <TextField
                                type="date"
                                id="outlined-required"
                                name="Date"
                                value={dateRecuperation}
                                onChange={handleChangedateRecuperation}
                                placeholder="Date de récupération"
                                label="Date de récuperation"
                                required
                                fullWidth
                                focused
                                error={Boolean(daterecerr)}
                                helperText={daterecerr}
                            ></TextField>}
                        </div>
                        <div style={{ marginTop: "15px" }} onClick={()=>setIsEditingdateeff(true)}>
                        {!isEditingdateeff&&<div><strong>Date effectif de récupération :</strong>{dateEffectifRecuperation? dateEffectifRecuperation:"pas de récupération"}</div>}
                           {isEditingdateeff&& <TextField
                                type="date"
                                id="outlined-required"
                                value={dateEffectifRecuperation}
                                name="dateEffectifRecuperation"
                                onChange={handledateEffectifRecuperation}
                                placeholder="Date effectif de récupération"
                                label="Date effectif"
                                required
                                fullWidth
                                focused
                                error={Boolean(dateEffErr)}
                                helperText={dateEffErr}
                            ></TextField>}
                        </div>
                        <div style={{ marginTop: "15px" }} onClick={()=>setIsEditingprice(true)}>
                        {!isEditingprice&&<div><strong>Prix total :</strong>{price}</div>}
                            {isEditingprice&&<TextField
                                type="number"
                                id="outlined-required"
                                name="price"
                                onChange={handleprice}
                                value={price}
                                label="Total prix"
                                required
                                fullWidth
                                error={Boolean(priceErr)}
                                helperText={priceErr}
                            ></TextField>}
                        </div>
                        <div style={{ marginTop: "15px" }} onClick={()=>setisEditingEtatLiv(true)}>
                        {!isEditingEtatLiv&&<div>
                            <strong>Etat de livraison :</strong>{etatLiv +" %"}</div>

                            }
                        {isEditingEtatLiv&&<div>
                            <strong> Etat de l'habillement à la livraison: </strong><FormHelperText style={{color:"#8f170ace"}}>{etatErr}</FormHelperText>
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
                        </div>}</div>
                        <div style={{ marginTop: "15px" }} onClick={()=>setisEditingEtatRec(true)}>
                        {!isEditingEtatRec&&<div ><strong>Etat de récupération :</strong>{etatRec? etatRec +" %": "non récupéré"}</div>}
                        </div>
                        {isEditingEtatRec&&
                        <div>
                            <strong> Etat de l'habillement à la récupération : </strong>
                            <div style={{ display: "flex", alignItems: "center", marginTop: 5 }}><label style={{ marginRight: "25px" }}><strong>Qualité</strong></label>
                                <Rating name="customized-10" style={{ color: "pink" }} defaultValue={qualiteRec} max={10}
                                    value={qualiteRec}
                                    onChange={(event, newValue) => {
                                        setQualiteRec(newValue);
                                    }} />
                            </div>
                            <div style={{ display: "flex", alignItems: "center", marginTop: 5 }}><label style={{ marginRight: "20px" }}><strong>Marque</strong></label>
                                <Rating name="customized-10" style={{ color: "pink" }} defaultValue={marqueRec} max={10}
                                    value={marqueRec}
                                    onChange={(event, newValue) => {
                                        setMarqueRec(newValue);
                                    }} />
                            </div>
                            <div style={{ display: "flex", alignItems: "center", marginTop: 5 }}><label style={{ marginRight: "10px" }}><strong>Tendance</strong></label>
                                <Rating name="customized-10" style={{ color: "pink" }} defaultValue={tendanceRec} max={10}
                                    value={tendanceRec}
                                    onChange={(event, newValue) => {
                                        setTendanceRec(newValue);
                                    }} />
                            </div>
                            <div style={{ display: "flex", alignItems: "center", marginTop: 5 }}><label style={{ marginRight: "30px" }}><strong>Rareté</strong></label>
                                <Rating name="customized-10" style={{ color: "pink" }} defaultValue={rareteRec} max={10}
                                    value={rareteRec}
                                    onChange={(event, newValue) => {
                                        setRareteRec(newValue);
                                    }} />
                            </div>
                        </div>}
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
                        onClick={UpdateInventaire}
                    >
                        Modifier inventaire
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default UpdateInventaire