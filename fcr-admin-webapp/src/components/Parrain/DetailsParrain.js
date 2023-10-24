import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControlLabel,
  NativeSelect,
  TextField,
  Rating,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
function DetailsParrain({ emailP, handleOpen, handleClose }) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const getParrainById = async () => {
    await axios
      .get(`/user/proprietaire/${emailP}`)
      .then((res) => {
        setEmail(res.data.data.email);
        setPhone(res.data.data.phone);
        setName(res.data.data.name);
        setImg(res.data.data.avatar)
        console.log(res.data.data)
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getParrainById()
  }, [])

  return (
    <>
      <Dialog
        open={Boolean(handleOpen)}
        onClose={handleClose}
        maxWidth="sm"
      >
        <DialogTitle style={{ color: "#ec407a", fontSize: "30px" }}>
          Détails proprietaire
        </DialogTitle>
        <DialogContent>
          <div ><img src={img} alt="Habillement" style={{marginLeft:"40px",width:"20ch",height:"20vh"}}/></div>
          <div style={{ marginTop: "15px" }}><strong>Nom et prénom : </strong> {name}</div>
          <div style={{ marginTop: "15px" }}><strong>Email : </strong>{email}</div>
          <div style={{ marginTop: "15px" }}><strong>Contact : </strong> {phone}</div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            style={{ color: "black" }}
          >
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DetailsParrain