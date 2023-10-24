import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-phone-number-input/style.css';
import PhoneInput, { isPossiblePhoneNumber, isValidPhoneNumber } from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';
function AddCoach({ open, handleClose, getCoaches }) {
    const [phone, setPhone] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [description, setDescription] = useState("")
    const [prefernces, setPreferences] = useState("")
    const [phoneErr, setPhoneErr] = useState("")
    const [nameErr, setNameErr] = useState("")
    const [emailErr, setEmailErr] = useState("")
    const [descErr, setDescErr] = useState("")
    const [preErr, setPreErr] = useState("")
    const isEmail = (email) => {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    const handleChangeName = (e) => {
        if (!e.target.value) {
            setNameErr("Ce champs est requis")
        } else {
            setName(e.target.value)
            setNameErr("")
        }
    }
    const handleChangeEmail = (e) => {
        if (!e.target.value) {
            setEmailErr("Ce champs est requis")
        } else if (!isEmail(e.target.value)) {

            setEmailErr("Vérifier le format de l'email")
        } else {
            setEmailErr("")
            setEmail(e.target.value)
        }
    }
    const handleChangeDesc = (e) => {
        if (!e.target.value) {
            setDescErr("Ce champs est requis")
        } else {
            setDescErr("")
            setDescription(e.target.value)
        }
    }
    const handleChangePre = (e) => {
        if (!e.target.value) {
            setPreErr("Ce champs est requis")
        } else {
            setPreErr("")
            setPreferences(e.target.value)
        }
    }
    const Add = async () => {
        try {
            if (!phone || !name || !email || !description|| !prefernces) {
                return toast.error("Veuillez vérifier tous les champs s'il vous plait .")
            }else if (isEmail(email) === false) {
                return toast.error("Veuillez vérifier le format du mail .")
            } else if( !isPossiblePhoneNumber(phone) && !isValidPhoneNumber(phone)){
                return toast.error("Veuillez vérifier le numéro de téléphone .")
            }else {
                const response = await axios.post(' /coach/create', { name: name, phone: phone, email: email, description:description,preferences: prefernces })
                getCoaches()
                handleClose()
                toast.success("Coach ajouté avec succées")
            }
        } catch (error) {
            if (error.response.status === 400) {
                toast.error("Ce nom existe déjà.");
            } else {
                toast.error("Ce mail existe déjà.");
            }
        }
    }

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
                    Ajouter Coach
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
                            <TextField
                                type="text"
                                id="outlined-required"
                                name="name"
                                onChange={handleChangeName}
                                placeholder="Nom du coach"
                                label="Nom du coach"
                                required
                                fullWidth
                                error={Boolean(nameErr)}
                                helperText={nameErr}
                            ></TextField>
                        </div>
                        <div>
                            <TextField
                                id="description"
                                name="email"
                                onChange={handleChangeEmail}
                                placeholder="Email du coach"
                                label="Email du coach"
                                required
                                fullWidth
                                error={Boolean(emailErr)}
                                helperText={emailErr}
                            ></TextField>
                        </div>
                        <div>
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
                            ></TextField>
                        </div>
                        <div>
                            <TextField
                                id="description"
                                name="email"
                                onChange={handleChangePre}
                                multiline
                                maxRows={4}
                                placeholder="Préférences du coach"
                                label="Préférences"
                                required
                                fullWidth
                                error={Boolean(preErr)}
                                helperText={preErr}
                            ></TextField>
                        </div>
                        <div>
                            <PhoneInput
                                name="phone_number"
                                placeholder="Numéro du téléphone *"
                                value={phone}
                                onChange={(phone) => setPhone(phone)}
                                flags={flags}
                                onFocus={() => setPhoneErr("Ce champs est requis")}
                                defaultCountry="TN" />
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
                        onClick={Add}
                    >
                        Ajouter coach
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddCoach