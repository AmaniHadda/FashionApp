import React, { useEffect, useState } from 'react'
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormHelperText, FormLabel, Grid, InputAdornment, Stack, TextField, Tooltip } from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function DetailsUpdate({ open, handleClose, id, getAbonnements }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingTitle, setIsEditingtitle] = useState(false);
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [isEditingPrice, setIsEditingPrice] = useState(false);
  const [isEditingReduction, setIsEditingReduction] = useState(false);
  const [SingleAbonnement, setSingleAbonnement] = useState([]);
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(0)
  const [photo, setPhoto] = useState("")
  const [reduction, setReduction] = useState(0)
  const [cover, setCover] = useState(null)
  const [errortitle, setErrorTitle] = useState("")
  const [Errordescription, setErrorDescription] = useState("")
  const [Errorprice, setErrorPrice] = useState("")
  const [PriceWithPromotion, setPriceWithPromotion] = useState([])
  const [price1, setPrice1] = useState(0)
  const [price3, setPrice3] = useState(0)
  const [price6, setPrice6] = useState(0)
  const [price12, setPrice12] = useState(0)
  const [Redprice1, setRedPrice1] = useState(0)
  const [Redprice3, setRedPrice3] = useState(0)
  const [Redprice6, setRedPrice6] = useState(0)
  const [Redprice12, setRedPrice12] = useState(0)
  const [InfoShow, setInfoShow] = useState(true)
  const HandleChangeTitle = (e) => {
    if (e.target.value.trim() === "") {
      setErrorTitle("Ce champs est requis")
    } else {
      setTitle(e.target.value)
      setErrorTitle("")
    }
  }
  const HandleChangeDescription = (e) => {
    setDescription(e.target.value)
    if (e.target.value.trim() === "") {
      setErrorDescription("Ce champs est requis")
    }
    else {
      setErrorDescription("")
    }
  }
  const HandleChangeCover = (e) => {
    const selectedCover = e.target.files[0];
    if (selectedCover) {
      setCover(selectedCover);
    }
  };
  const getAbonnementById = async () => {
    await axios
      .get(` /abonnements/retrieve/${id}`)
      .then((res) => {
        setSingleAbonnement(res.data.data);
        setTitle(res.data.data.title);
        setDescription(res.data.data.description);
        setPrice(res.data.data.price);
        setReduction(res.data.data.reduction);
        setPriceWithPromotion(res.data.data.pricePromotion);
        setCover(res.data.data.cover);
        setPhoto(res.data.data.cover);
        setPrice1(res.data.data.price[0])
        setPrice3(res.data.data.price[1])
        setPrice6(res.data.data.price[2])
        setPrice12(res.data.data.price[3])
        setRedPrice1(res.data.data.reduction[0])
        setRedPrice3(res.data.data.reduction[1])
        setRedPrice6(res.data.data.reduction[2])
        setRedPrice12(res.data.data.reduction[3])
      })
      .catch((err) => console.log(err));
  };
  const HandleUpdate = async (e) => {
    if (!title|| !description|| !cover || !price1 || !price3 || !price6 || !price12) {
      setErrorTitle(!title&& "Ce champs est requis")
      setErrorDescription(!description&& "Ce champs est requis")
      setErrorPrice((!price1 || !price3 || !price6 || !price12)&& "Ce champs est requis")
      toast.error("Veuillez remplir tous les champs s'il vous plait .")
    } else {
      e.preventDefault();
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('cover', cover);
      formData.append('cover', photo);
      formData.append('price1', price1);
      formData.append('price3', price3);
      formData.append('price6', price6);
      formData.append('price12', price12);
      formData.append('priceRed1', Redprice1);
      formData.append('priceRed3', Redprice3);
      formData.append('priceRed6', Redprice6);
      formData.append('priceRed12', Redprice12);
      await axios.put(`/abonnements/update/${id}`, formData)
        .then(res => { handleClose(); getAbonnements(); toast.success("L'abonnement est modifié avec succées"); })
        .catch(err => toast.error("Vérifier si le nom et l'image de l'abonnement sont uniques"))
    }
  }
  const HandleChangePrice1 = (e) => {
    setPrice1(e.target.value)
    if (!e.target.value) {
      setErrorPrice("Ce champs est requis")
    } else {
      setErrorPrice("")
    }
  }
  const HandleChangePrice3 = (e) => {
    setPrice3(e.target.value)
    if (!e.target.value) {
      setErrorPrice("Ce champs est requis")
    } else {
      setErrorPrice("")
    }
  }
  const HandleChangePrice6 = (e) => {
    setPrice6(e.target.value)
    if (!e.target.value) {
      setErrorPrice("Ce champs est requis")
    } else {
      setErrorPrice("")
    }
  }
  const HandleChangePrice12 = (e) => {
    setPrice12(e.target.value)
    if (!e.target.value) {
      setErrorPrice("Ce champs est requis")
    } else {
      setErrorPrice("")
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
  useEffect(() => {
    getAbonnementById()
    setTimeout(() => {
      setInfoShow(false)
    }, 5000);
  }, [])
  return (
    <Dialog
      open={true}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <ToastContainer />
      <DialogTitle> <div style={{ fontSize: "30px", color: "#ec407a" }}>Modifier abonnement</div></DialogTitle>
      <DialogContent>
        <div onClick={() => setIsEditingtitle(true)}>{!isEditingTitle && <div ><strong>Titre : </strong>{SingleAbonnement.title}</div>}
          {InfoShow && <Stack sx={{ width: '100%', marginTop: "15px", marginBottom: "10px" }} spacing={2}>
            <Alert severity="info">Clique simplement sur l'élément et effectue les modifications souhaitées. !</Alert>
          </Stack>}
          {isEditingTitle &&
            <>
              <TextField
                type="text"
                id="outlined-required"
                name="title"
                value={title}
                onChange={HandleChangeTitle}
                placeholder="Titre de l'abonnement"
                label="Titre"
                required
                fullWidth
                style={{ marginTop: "15px", marginBottom: "15px" }}
                error={errortitle}
                helperText={errortitle}
              ></TextField>
            </>
          }</div>
        <div onClick={() => setIsEditing(true)}>
          <img
            src={` ${process.env.REACT_APP_URL_UPLOAD}/abonnements/${photo}`}
            alt="Img"
            className="banner-image"
            style={{ margin: "2px", width: "100%", height: "40%" }}
          />
          {isEditing && <div >
            <label for="file" style={{ marginTop: "15px", marginLeft: "15px" }}>
              Couverture abonnement
            </label>
            <TextField
              type="file"
              fullWidth
              name="cover"
              onChange={HandleChangeCover}
            />
          </div>}
        </div>
        <div onClick={() => setIsEditingDesc(true)} style={{ marginTop: "20px" }}>
          {!isEditingDesc && <div> <strong>Description :</strong> {SingleAbonnement.description}</div>}
          {isEditingDesc && <div><TextField
            id="description"
            name="description"
            onChange={HandleChangeDescription}
            placeholder="Description de l'abonnement"
            label="Description"
            required
            value={description}
            multiline
            maxRows={4}
            fullWidth
            error={Errordescription}
            helperText={Errordescription}
          ></TextField></div>}
        </div>
        <div onClick={() => setIsEditingPrice(true)}>
          {
            !isEditingPrice &&
            <div>
              <div style={{ marginTop: "15px", marginBottom: "15px" }}> <strong >Prix de l'abonnement</strong></div>
              <Grid container spacing={1}>
                <Grid item xs>
                  <div style={{fontSize:"15px"}}><strong>1 mois: </strong>{price[0]} TND</div>
                </Grid>
                <Grid item xs>
                  <div style={{fontSize:"15px"}}><strong>3 mois: </strong>{price[1]} TND</div>
                </Grid>
                <Grid item xs>
                  <div style={{fontSize:"15px"}}><strong>6 mois: </strong>{price[2]} TND</div>
                </Grid>
                <Grid item xs>
                  <div style={{fontSize:"15px"}}><strong>1 an: </strong>{price[3]} TND</div>
                </Grid>
              </Grid>
            </div>

          }
          {
            isEditingPrice &&
            <div style={{  marginTop:"15px" }}>
              <FormLabel style={{ marginLeft: "12px"}}>Prix de l'abonnement</FormLabel>
              <Box
                sx={{
                  '& > :not(style)': { m: 1, width: '13ch' },
                }}
              >
                <TextField id="outlined-basic" type='number' value={price1} onChange={HandleChangePrice1} label="1 mois" variant="outlined" />
                <TextField id="outlined-basic" type='number' value={price3} onChange={HandleChangePrice3} label="3 mois" variant="outlined" />
                <TextField id="outlined-basic" type='number' value={price6} onChange={HandleChangePrice6} label="6 mois" variant="outlined" />
                <TextField id="outlined-basic" type='number' value={price12} onChange={HandleChangePrice12} label="1 an" variant="outlined" />
              </Box>
              <FormHelperText error style={{ marginLeft:"15px"}}>{Errorprice}</FormHelperText>
            </div>
          }
        </div>
        <div onClick={() => setIsEditingReduction(true)}>
          {
            !isEditingReduction &&
            <div>
              <div style={{ marginTop: "15px", marginBottom: "15px" }}> <strong >Reduction de l'abonnement</strong></div>
              <Grid container spacing={3}>
                <Grid item xs>
                  <div style={{fontSize:"15px"}}><strong>1 mois: </strong>{reduction[0]} %</div>
                </Grid>
                <Grid item xs>
                  <div style={{fontSize:"15px"}}><strong>3 mois: </strong>{reduction[1]} %</div>
                </Grid>
                <Grid item xs>
                  <div style={{fontSize:"15px"}}><strong>6 mois: </strong>{reduction[2]} %</div>
                </Grid>
                <Grid item xs>
                  <div style={{fontSize:"15px"}}><strong>1 an: </strong>{reduction[3]} %</div>
                </Grid>
              </Grid>
            </div>

          }
          {
            isEditingReduction &&
            <div>
              <FormLabel style={{ marginLeft: "12px" }}>Reduction de l'abonnement</FormLabel>
              <Box
                sx={{
                  '& > :not(style)': { m: 1, width: '13ch' },
                }}
              >
                <TextField id="outlined-basic" type='number' value={Redprice1} onChange={HandleChangeRedPrice1} label="1 mois" variant="outlined" />
                <TextField id="outlined-basic" type='number' value={Redprice3} onChange={HandleChangeRedPrice3} label="3 mois" variant="outlined" />
                <TextField id="outlined-basic" type='number' value={Redprice6} onChange={HandleChangeRedPrice6} label="6 mois" variant="outlined" />
                <TextField id="outlined-basic" type='number' value={Redprice12} onChange={HandleChangeRedPrice12} label="1 an" variant="outlined" />
              </Box>
              <div>{" "}</div>
            </div>

          }



        </div>
        <div>
          <div style={{ marginTop: "15px", marginBottom: "15px" }}> <strong >Prix avec promotion de l'abonnement</strong></div>
          <Grid container spacing={1}>
            <Grid item xs>
              <div style={{fontSize:"15px"}}><strong>1 mois: </strong>{PriceWithPromotion[0]} TND</div>
            </Grid>
            <Grid item xs>
              <div style={{fontSize:"15px"}}><strong>3 mois: </strong>{PriceWithPromotion[1]} TND</div>
            </Grid>
            <Grid item xs>
              <div style={{fontSize:"15px"}}><strong>6 mois: </strong>{PriceWithPromotion[2]} TND</div>
            </Grid>
            <Grid item xs>
              <div style={{fontSize:"15px"}}><strong>1 an: </strong>{PriceWithPromotion[3]} TND</div>
            </Grid>
          </Grid>
        </div>
      </DialogContent>
      <DialogActions>

        <Button
          onClick={handleClose}
          style={{ color: "black" }}
        >
          Fermer
        </Button>
        {(isEditing || isEditingDesc || isEditingTitle || isEditingPrice || isEditingReduction) && <Button
          style={{ backgroundColor: "#ec407a", color: "white" }}
          onClick={HandleUpdate}
        >
          Modifier abonnement
        </Button>}
      </DialogActions>
    </Dialog>
  )
}

export default DetailsUpdate