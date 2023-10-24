import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, TextField, Tooltip } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BsFillArchiveFill } from 'react-icons/bs';
import { FaEdit, FaEye, FaSearch } from 'react-icons/fa';
import Table from '../Table/Table';
import { IoMdAdd } from 'react-icons/io';
import AjouterAbonnement from './AjouterAbonnement';
import DetailsUpdate from './DetailsUpdate';
import { ToastContainer } from 'react-toastify';

const Abonnements = () => {
  const [Listeabonnements, setAbonnements] = useState([]);
  const [Liste, setListe] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalArchive, setModalArchive] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);

  const [id, setId] = useState("");
  const handleOpen = () => {
    setModalAdd(true);
  };
  const handleClose = () => {
    setModalAdd(false);
  };
  const getAbonnements = async () => {
    await axios.get('/abonnements/retrieve/enable').then(res => {
      console.log(res.data.data)
      const formattedAbonnements = res.data.data.map((b) => ({
        ...b,
        id: b._id,
      }));
      setAbonnements(formattedAbonnements)
      setListe(formattedAbonnements)
    }).catch(err => console.log(err))
  }
 
  const handleArchive = async () => {
    await axios
      .put(` /abonnements/disable/${id}`)
      .then(() => {
        setModalArchive(false)
        getAbonnements();
      })
      .catch((err) => console.log(err));
  };
  const handleSearch = async (e) => {
    console.log(e.target.value)
    if (e.target.value.length > 0) {
      await axios.get(` /abonnements/search/${e.target.value}`).then(res => {
        const formattedAbonnements = res.data.data.map((b) => ({
          ...b,
          id: b._id,
        }));
        setAbonnements(formattedAbonnements)
      }).catch(err => console.log(err))
    } else {
      setAbonnements(Liste)
    }
  }
  useEffect(() => {
    getAbonnements()
  }, [])

  const columns = [
    {
      field: "cover",
      headerName: "Photo",
      description: "This column has a value getter and is not sortable.",
      sortable: true,
      width: 200,
      renderCell: (data) => (
        <img
          src={`${process.env.REACT_APP_URL_UPLOAD}/abonnements/${data.row.cover}`}
          alt="BannerImg"
          className="banner-image"
          style={{ margin: "2px", width: "120px" }}
        />
      ),
    },
    {
      field: "title",
      headerName: "Titre",
      description: "This column has a value getter and is not sortable.",
      sortable: true,
      width: 300,
    },
    {
      field: "description", 
      headerName: "Description",
      description: "This column has a value getter and is not sortable.",
      sortable: true,
      width: 400,
    },
    {
      field: "Action",
      headerName: "Actions",
      description: "",
      sortable: true,
      width: 150,
      renderCell: (data) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Modifier">
              <a
                href="#"
                onClick={() => {setId(data.row._id);setModalShow(true)} }
                style={{
                  fontSize: 23 + "px",
                  color: "#f5e277",
                  marginRight: 15 + "px",
                }}
              >
                <FaEdit />
              </a>
            </Tooltip>
           
            <Tooltip title="Archiver">
              <a
                href="#"
                onClick={() => { setId(data.row._id); setModalArchive(true) }}
                style={{
                  fontSize: 20 + "px",
                  color: "#CB94F0",
                }}
              >
                <BsFillArchiveFill />
              </a>
            </Tooltip>

          </div>
        );
      },
    },
  ];
  return (
    <div className="profile_page">
      <ToastContainer />
      <div className="col-left"></div>
      <div className="col-right">
        <h1
          style={{
            fontSize: "1.7rem",
            color: "black",
            margin: "10px 0",
          }}
        >
          Mes abonnements
        </h1>
        <div style={{ display: "flex", alignItems: "center" }}>
           
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#d499ac",
                  color: "white",
                  marginBottom: "10px",
                }}
                onClick={handleOpen}
              >
                <IoMdAdd />
                Ajouter un abonnement
              </Button>
             <div style={{ marginLeft: "auto" }} >
              <TextField
              label="Recherche"
              type="search"
              placeholder="Rechercher..."
              name="name"
              onChange={(e) => handleSearch(e)}
              sx={{ m: 1, width: "30ch" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaSearch />
                  </InputAdornment>
                ),
              }}
            ></TextField>
          </div>
        </div>
        <Table columns={columns} data={Listeabonnements} />
       
        <Dialog
          open={modalArchive}
          onClose={() => setModalArchive(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            Confirmation
          </DialogTitle>
          <DialogContent>
            Êtes-vous sûr(e) de vouloir archiver cet abonnement ?
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setModalArchive(false)}
              style={{ color: "black" }}
            >
              Fermer
            </Button>
            <Button
              style={{ backgroundColor: "#ec407a", color: "white" }}
              onClick={handleArchive}
            >
              Archiver
            </Button>
          </DialogActions>
        </Dialog>
        {modalAdd&&
            <AjouterAbonnement  open={handleOpen} handleClose={handleClose} getAbonnements={getAbonnements} />}
        {modalShow&&
            <DetailsUpdate  open={()=>setModalShow(true)} handleClose={()=>setModalShow(false)} getAbonnements={getAbonnements} id={id} />}
         
      </div>
    </div>
  )
}

export default Abonnements