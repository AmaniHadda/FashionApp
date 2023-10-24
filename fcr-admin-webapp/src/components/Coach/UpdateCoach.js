import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-phone-number-input/style.css';
import PhoneInput, { isPossiblePhoneNumber, isValidPhoneNumber } from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';
function UpdateCoach({ open, handleClose, getCoaches, id }) {
    const [phone, setPhone] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [description, setDesc] = useState("")
    const [preferences, setPre] = useState("")
    const [Editphone, setEditPhone] = useState(false)
    const [Editname, setEditName] = useState(false)
    const [Editemail, setEditEmail] = useState(false)
    const [EditDesc, setEditDesc] = useState(false)
    const [EditPre, setEditPre] = useState(false)
    const [phoneErr, setPhoneErr] = useState("")
    const [nameErr, setNameErr] = useState("")
    const [emailErr, setEmailErr] = useState("")
    const [InfoShow, setInfoShow] = useState(true)
    const [descErr, setDescErr] = useState("")
    const [preErr, setPreErr] = useState("")
    const isEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };
    const handleChangeName = (e) => {
        setName(e.target.value)
        if (!e.target.value) {
            setNameErr("Ce champs est requis")
        } else {
            setNameErr("")
        }
    }
    const handleChangeDesc = (e) => {
        setDesc(e.target.value)
        if (!e.target.value) {
            setDescErr("Ce champs est requis")
        } else {
            setDescErr("")
        }
    }
    const handleChangePre = (e) => {
        setPre(e.target.value)
        if (!e.target.value) {
            setPreErr("Ce champs est requis")
        } else {
            setPreErr("")
        }
    }
    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
        if (!isEmail(e.target.value)) {
            setEmailErr("Ce format n'est pas valide")
        } else {
            setEmailErr("")
        }
    }
    const getCoach = async () => {
        await axios.get(` /coach/get/${id}`).then(res => {
            setName(res.data.name)
            setPhone(res.data.phone)
            setEmail(res.data.email)
            setPre(res.data.preferences)
            setDesc(res.data.description)
        }).catch(err => console.log(err))
    }
    const Update = async () => {
        console.log(isEmail(email))
        try {
            if (!phone || !name || !email || !description|| !preferences) {
                return toast.error("Veuillez vérifier tous les champs s'il vous plait .")
            } else if (isEmail(email) === false) {
                return toast.error("Veuillez vérifier le format du mail .")
            }else if ( !isPossiblePhoneNumber(phone) && !isValidPhoneNumber(phone)){
                return toast.error("Veuillez vérifier le numéro de téléphone .")
            } else {
                const response = await axios.put(` /coach/update/${id}`, { name: name, phone: phone, email: email, description:description, preferences:preferences })
                getCoaches()
                handleClose()
                toast.success("Coach modifié avec succées")
            }
        } catch (error) {
            if (error.response.status === 400) {
                toast.error("Ce nom existe déjà.");
            } else {
                toast.error("Ce mail existe déjà.");
            }
        }
    }
    useEffect(() => {
        getCoach()
        setTimeout(() => {
            setInfoShow(false)
        }, 5000);
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
                <DialogTitle style={{ color: "#ec407a" , fontSize:"30px"}}>
                    Modifier Coach
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
                        {InfoShow&&<Stack sx={{ width: '100%', marginTop:"15px" , marginBottom:"10px" }} spacing={2}>     
      <Alert severity="info">Clique simplement sur l'élément et effectue les modifications souhaitées. !</Alert>
    </Stack>}
                        <div onClick={() => setEditName(true)}>
                            {!Editname && <div><strong>Nom du coach : </strong>{name}</div>}
                            {Editname && <TextField
                                type="text"
                                id="outlined-required"
                                name="name"
                                value={name}
                                onChange={handleChangeName}
                                placeholder="Nom du coach"
                                label="Nom du coach"
                                required
                                fullWidth
                                error={Boolean(nameErr)}
                                helperText={nameErr}
                            ></TextField>
                            }

                        </div>
                        <div style={{marginTop:"15px"}} onClick={() => setEditEmail(true)}>
                            {!Editemail && <div ><strong>Email du coach : </strong>{email}</div>}
                            {Editemail &&
                                <TextField
                                    id="description"
                                    name="email"
                                    value={email}
                                    onChange={handleChangeEmail}
                                    placeholder="Email du coach"
                                    label="Email du coach"
                                    required
                                    fullWidth
                                    error={Boolean(emailErr)}
                                    helperText={emailErr}
                                ></TextField>}
                        </div>
                        <div style={{marginTop:"15px"}} onClick={() => setEditDesc(true)}>
                            {!EditDesc && <div ><strong>Description du coach : </strong>{description}</div>}
                            {EditDesc &&
                            <TextField
                                id="description"
                                name="description"
                                onChange={handleChangeDesc}
                                placeholder="Description du coach"
                                label="Description du coach"
                                multiline
                                maxRows={4}
                                required
                                fullWidth
                                error={Boolean(descErr)}
                                helperText={descErr}
                                value={description}
                            ></TextField>}
                        </div>
                        <div style={{marginTop:"15px"}} onClick={() => setEditPre(true)}>
                            {!EditPre && <div ><strong>Préférences du coach : </strong>{preferences}</div>}
                            {EditPre &&
                            <TextField
                                id="description"
                                name="preferences"
                                onChange={handleChangePre}
                                value={preferences}
                                multiline
                                maxRows={4}
                                placeholder="Préférences du coach"
                                label="Préférences"
                                required
                                fullWidth
                                error={Boolean(preErr)}
                                helperText={preErr}
                            ></TextField>}
                        </div>
                        <div onClick={() => setEditPhone(true)}>
                            {!Editphone && <div  style={{marginTop:"15px"}}><strong>Numéro du coach : </strong>{phone}</div>}
                            {Editphone &&
                                <PhoneInput
                                    name="phone_number"
                                    placeholder="Numéro du téléphone *"
                                    value={phone}
                                    onChange={(phone) => setPhone(phone)}
                                    flags={flags}
                                    onFocus={() => setPhoneErr("Ce champs est requis")}
                                    defaultCountry="TN" />}
                            {phone ? (
                                !isPossiblePhoneNumber(phone) && !isValidPhoneNumber(phone) ? (
                                    <p style={{ color: "#8f170ace", fontSize: "12px", marginTop: "5px", marginLeft: "10px" }}>Entrer un numéro valide</p>
                                ) : null
                            ) : <p style={{ color: "#8f170ace", fontSize: "12px", marginTop: "5px", marginLeft: "10px" }}>{phoneErr}</p>}

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
                        onClick={Update}
                    >
                        Modifier coach
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default UpdateCoach