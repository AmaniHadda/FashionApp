import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormHelperText, FormLabel, TextField } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

function AjouterAbonnement({ open, handleClose, getAbonnements }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState([])
  const [reduction, setReduction] = useState(0)
  const [duration, setDuration] = useState(0)
  const [cover, setCover] = useState(null)
  const [errortitle, setErrorTitle] = useState("")
  const [Errordescription, setErrorDescription] = useState("")
  const [Errorprice, setErrorPrice] = useState("")
  const [Errorreduction, setErrorReduction] = useState("")
  const [Errorduration, setErrorDuration] = useState("")
  const [Errorcover, setErrorCover] = useState(null)
  const[price1, setPrice1]=useState(0)
  const[price3, setPrice3]=useState(0)
  const[price6, setPrice6]=useState(0)
  const[price12, setPrice12]=useState(0)
  const[Redprice1, setRedPrice1]=useState(0)
  const[Redprice3, setRedPrice3]=useState(0)
  const[Redprice6, setRedPrice6]=useState(0)
  const[Redprice12, setRedPrice12]=useState(0)

  const HandleChangeTitle = (e) => {

    if (e.target.value.trim() === "") {
      setErrorTitle("Ce champs est requis")
    } else {
      setTitle(e.target.value)
      setErrorTitle("")
    }
  }
  const HandleChangeDescription = (e) => {
    if (e.target.value.trim() === "") {
      setErrorDescription("Ce champs est requis")
    }
    else {
      setDescription(e.target.value)
      setErrorDescription("")
    }
  }
  const HandleChangePrice1 = (e) => {
    setPrice1(e.target.value)
    if (!e.target.value) {
      setErrorPrice("Ce champs est requis")
    } 
  }
  const HandleChangePrice3 = (e) => {
    setPrice3(e.target.value)
    if (!e.target.value) {
      setErrorPrice("Ce champs est requis")
    } 
  }
  const HandleChangePrice6 = (e) => {
    setPrice6(e.target.value)
    if (!e.target.value) {
      setErrorPrice("Ce champs est requis")
    } 
  }
  const HandleChangePrice12 = (e) => {
    setPrice12(e.target.value)
    if (!e.target.value) {
      setErrorPrice("Ce champs est requis")
    } 
  }
  const HandleChangeRedPrice1 = (e) => {
    setRedPrice1(e.target.value)
  }
  const HandleChangeRedPrice3 = (e) => {
    setRedPrice3(e.target.value)
  }
  const HandleChangeRedPrice6 = (e) => {
    setRedPrice6(e.target.value)
  }
  const HandleChangeRedPrice12 = (e) => {
    setRedPrice12(e.target.value)
  }
  const HandleChangeCover = (e) => {
    const selectedCover = e.target.files[0];
    if (!selectedCover) {
      setErrorCover('Ce champ est requis');
    } else {
      setCover(selectedCover);
      setErrorCover('');
    }
  };
  const addAbonnement = async (e) => {
    if (!title|| !description|| !cover || !price1 || !price3 || !price6 || !price12) {
      setErrorTitle(!title&& "Ce champs est requis")
      setErrorCover(!cover&& "Ce champs est requis")
      setErrorDescription(!description&& "Ce champs est requis")
      setErrorPrice((!price1 || !price3 || !price6 || !price12)&& "Ce champs est requis")
      toast.error("Veuillez remplir tous les champs s'il vous plait .")
    } else {
      e.preventDefault();
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('cover', cover);
      formData.append('price1', price1);
      formData.append('price3', price3);
      formData.append('price6', price6);
      formData.append('price12', price12);     
      formData.append('priceRed1', Redprice1);
      formData.append('priceRed3', Redprice3);
      formData.append('priceRed6', Redprice6);
      formData.append('priceRed12', Redprice12);
      await axios.post("/abonnements/create", formData)
        .then(res => { handleClose(); getAbonnements(); toast.success("Abonnement ajouté avec succées"); })
        .catch(err => toast.error("Vérifier si le nom et l'image de l'abonnement sont uniques"))
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
        <DialogTitle style={{ fontSize: "30px", color: "#ec407a" }}>
          Ajouter abonnement
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
                name="title"
                onChange={HandleChangeTitle}
                placeholder="Titre de l'abonnement"
                label="Titre"
                required
                fullWidth
                error={Boolean(errortitle)}
                helperText={errortitle}
              ></TextField>
            </div>
            <div>
              <TextField
                id="description"
                name="description"
                onChange={HandleChangeDescription}
                placeholder="Description de l'abonnement"
                label="Description"
                required
                multiline
                maxRows={4}
                fullWidth
                error={Boolean(Errordescription)}
                helperText={Errordescription}
              ></TextField>
            </div>
            <div>
              <FormLabel style={{marginLeft:"12px"}}>Prix de l'abonnement</FormLabel>
              <Box
                sx={{
                  '& > :not(style)': { m: 5, width: '14ch' },
                }}
              >
                <TextField id="outlined-basic" type='number' onChange={HandleChangePrice1} label="1 mois" variant="outlined" />
                <TextField id="outlined-basic" type='number' onChange={HandleChangePrice3} label="3 mois" variant="outlined" />
                <TextField id="outlined-basic" type='number'  onChange={HandleChangePrice6} label="6 mois" variant="outlined" />
                <TextField id="outlined-basic" type='number' onChange={HandleChangePrice12} label="1 an" variant="outlined" />
              </Box>
                <FormHelperText error style={{ marginLeft:"15px"}}>{Errorprice}</FormHelperText>
            </div>
            <div>
              <FormLabel style={{marginLeft:"12px"}}>Réduction de l'abonnement</FormLabel>
              <Box
                sx={{
                  '& > :not(style)': { m: 5, width: '14ch' },
                }}
              >
                <TextField id="outlined-basic" type='number' onChange={HandleChangeRedPrice1} label="1 mois" variant="outlined" />
                <TextField id="outlined-basic" type='number' onChange={HandleChangeRedPrice3} label="3 mois" variant="outlined" />
                <TextField id="outlined-basic" type='number'  onChange={HandleChangeRedPrice6} label="6 mois" variant="outlined" />
                <TextField id="outlined-basic" type='number' onChange={HandleChangeRedPrice12} label="1 an" variant="outlined" />
              </Box>
              <FormHelperText error style={{ marginLeft:"15px"}}>{Errorprice}</FormHelperText>
            </div>
            <div >
              <FormLabel style={{ marginTop: "15px", marginLeft: "15px" }}>
                Couverture abonnement
              </FormLabel>
              <TextField
                type="file"
                fullWidth
                name="cover"
                // accept="image/*"
                onChange={HandleChangeCover}
                helperText={Errorcover}
                error={Boolean(Errorcover)}
              />
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
            onClick={addAbonnement}
          >
            Ajouter abonnement
          </Button>
        </DialogActions>
      </Dialog>
    </>

  )
}

export default AjouterAbonnement