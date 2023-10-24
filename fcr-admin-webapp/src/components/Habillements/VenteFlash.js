import React, { useState } from 'react'
import { Badge, Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, MenuItem, Select, TextField } from "@mui/material";
import { format } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { AiOutlinePercentage } from 'react-icons/ai';

function VenteFlash({ handleClose, getHabillements, id }) {
    const [reduction, setReduction] = useState(0)
    const [duration, setDuration] = useState("")
    const [Errorduration, setErrorDuration] = useState("")
    const [Errorreduction, setErrorReduction] = useState("")
    const HandleChangeReduction = (e) => {
        if (e.target.value.trim() === "") {
          setErrorReduction("Ce champs est requis")
        }else{
            setReduction(e.target.value)
            setErrorReduction("")
        }
      }
    const HandleChangeDuration = (e) => {
        const currentDate = new Date();
        const today = format(currentDate, 'yyyy-MM-dd');
        if(e.target.value<today){
            setErrorDuration("la date doit étre supérieure à date d'aujourd'hui")
        }else if (e.target.value.trim() === "") {
          setErrorDuration("Ce champs est requis")
        } else {
          setDuration(e.target.value)
          setErrorDuration("")
        }
      }
    const AddVenteFlash=async()=>{
        const currentDate = new Date();
        const today = format(currentDate, 'yyyy-MM-dd');
        if(reduction===0 || duration.trim()===""|| duration<today){
            toast.error("Veuillez remplir tous les champs s'il vous plait .")
        }else{
            axios.post(` /venteflash/create/${id}`,{reduction: reduction, date:duration})
            .then(res=>{toast.success("l'habillement est marqué comme vente flash ."); getHabillements(); handleClose()} )
            .catch(err=>console.log(err))
            
        }
    }
    return (
        <Dialog
            open={true}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
        >
            <ToastContainer />
            <DialogTitle style={{color:"#ec407a"}}>
               Ajouter aux ventes Flash
            </DialogTitle>
            <DialogContent>
                <div>
                    <label>Réduction</label>
                    <TextField
                        type="number"
                        id="outlined-required"
                        name="pricePromotion"
                        onChange={HandleChangeReduction}
                        placeholder="Réduction de l'habillement"
                        required
                        fullWidth
                        error={Boolean(Errorreduction)}
                        helperText={Errorreduction}
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="end">
                                <AiOutlinePercentage />
                            </InputAdornment>
                            ),
                        }}
                    />
                </div>
                <div style={{ marginTop: "10px" }}>
                <label>Date limite de promotion</label>
                    <TextField
                        type="date"
                        id="outlined-required"
                        name="duree"
                        onChange={HandleChangeDuration}
                        required
                        fullWidth
                      error={Boolean(Errorduration)}
                      helperText={Errorduration}
                    ></TextField>
                </div>

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
                    onClick={AddVenteFlash}
                >
                    Vente Flash
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default VenteFlash