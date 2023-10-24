import { Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, Stack, TextField, Tooltip } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BsFillArchiveFill } from 'react-icons/bs';
import { FaEdit, FaEye, FaLastfmSquare, FaSearch, FaUserTie } from 'react-icons/fa';
import Table from '../Table/Table';
import { IoMdAdd } from 'react-icons/io';
import { ImCancelCircle } from 'react-icons/im';
import { ToastContainer } from 'react-toastify';
import AddInventaire from './AddInventaire';
import UpdateInventaire from './UpdateInventaire';
import DetailsParrain from '../Parrain/DetailsParrain';
import DetailsHabillement from '../Habillements/DetailsHabillement';
function Inventaire() {
    const[inventaires, setInventaires]=useState([])
    const[liste, setListe]=useState([])
    const[query, setQuery]=useState([])
    const [openD, setOpenD] = useState(false);
    const[id, setId]=useState("")
    const [idProp, setIdProp] = useState(null);
    const [modalAdd, setModalAdd] = useState(false);
    const[name,setname]=useState("");
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalArchive, setModalArchive] = useState(false);
    const[openHD,setOpenHD]=useState(false);
    const handleOpenDetails = () => {
      setOpenD(true);
    };
  const handleOpenHDetails=()=>{
    setOpenHD(true);
  }
    const handleCloseDetails = () => {
      setOpenD(false);
    };
    const handleCloseHDetails = () => {
      setOpenHD(false);
    };
    const getInventaires = async () => {
        await axios.get('/inventaire/false').then(res => {
          console.log(res.data.data)
          const formatted = res.data.data.map((b) => ({
            ...b,
            id: b._id,
          }));
          setInventaires(formatted)
          setListe(formatted)
        }).catch(err => console.log(err))
    }
    const handleSearch = async (event) => {
      const searchTerm = event.target.value;
      setQuery(searchTerm);
    };
    const Search = async () => {
      await axios.get(` /inventaire/search/${query}`).then(res => {
        const formatted = res.data.data.map((b) => ({
          ...b,
          id: b._id,
        }));
        setInventaires(formatted)
      }).catch(err=>console.log(err));      
    }
      const handleArchive = async () => {
        await axios.put(`/inventaire/archive/${id}`).then(res=>{setModalArchive(false);getInventaires()}).catch(err=>console.log(err))
      }
    const handleOpen= ()=>{
        setModalAdd(true)
    }
    const handleClose= ()=>{
        setModalAdd(false)
    }
    useEffect(() => {      
      if (query.length > 0) {
        const delaySearch = setTimeout(Search, 100);
        return () => clearTimeout(delaySearch); 
      }
      else {
        getInventaires();
      }
    }, [query])
     
    const columns = [
        {
          field: "locataire",
          headerName: "Locataire",
          description: "This column has a value getter and is not sortable.",
          sortable: true,
          width: 250,
          renderCell: (data) => {
            const index = data.row.proprietaire?.email?.indexOf("@");
            return (
              <div>
                <Stack direction="row"  >
                  <Chip icon={<FaUserTie />} label={data.row.locataire?.email ? <Tooltip title="Détails Locataire">
                    <a href="#a" onClick={() => { setIdProp(data.row.locataire.email); handleOpenDetails() }}>{data.row.locataire?.email?.slice(0, index)}</a>
                  </Tooltip>
                    : "Indisponible"} variant="outlined" />
    
                </Stack>
              </div>
            )
          },
        },
        {
          field: "habillement",
          headerName: "Habillement",
          description: "This column has a value getter and is not sortable.",
          sortable: true,
          width: 110,
          renderCell: (data) => {
            data.row.proprietaire?.email?.indexOf("@");
            return (
              <div>
                <Stack direction="row"  >
                  <Chip label={data.row.habillement?.name? <Tooltip title="Détails Habillement">
                    <a href="#a" onClick={() => { setname(data.row.habillement.name); handleOpenHDetails() }}>{data.row.habillement?.name}</a>
                  </Tooltip>
                    : "Indisponible"} variant="outlined" />
    
                </Stack>
              </div>
            )
          },
        },
        {
          field: "etatLivraison",
          headerName: "Etat à la livraison",
          description: "This column has a value getter and is not sortable.",
          sortable: true,
          width: 140,
          renderCell: (data) => (
            <div>{data.row.etatLivraison?.etat +" %"}</div>
           ),
        },
        {
          field: "etatRecuperation",
          headerName: "Etat à la récupération",
          description: "This column has a value getter and is not sortable.",
          sortable: true,
          width: 150,
          renderCell: (data) => (
            <div>{data.row.etatRecuperation? data.row.etatRecuperation.etat +" %": <div> Non récupéré</div>}</div>
           ),
        },
        {
          field: "dateLocation",
          headerName: "Date de Location",
          description: "This column has a value getter and is not sortable.",
          sortable: true,
          width: 130,
          renderCell: (data) => (
            <div>{data.row.dateLocation?.slice(0,10)}</div>
          ),
        },
        {
          field: "dateRecuperation",
          headerName: "Date de Récuperation",
          description: "",
          sortable: true,
          width: 170,
          renderCell: (data) => (
            <div>{data.row.dateRecuperation?.slice(0,10)}</div>
          ),
        },
        {
          field: "price",
          headerName: "Prix",
          description: "",
          sortable: true,
          width: 120,
          renderCell: (data) => (
            <div>{data.row.price + " "}TND</div>
          ),
    
        },
        {
          field: "Action",
          headerName: "Actions",
          description: "",
          sortable: true,
          width: 90,
          renderCell: (data) => {
            return (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip title="Modifier">
                  <a
                    href="#"
                    onClick={() => {setId(data.row._id);setModalUpdate(true)} }
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
          Mes inventaires
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
                Ajouter un inventaire
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
        <Table columns={columns} data={inventaires} />
       
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
            Êtes-vous sûr(e) de vouloir archiver cet inventaire ?
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
            <AddInventaire  open={handleOpen} handleClose={handleClose} getInventaires={getInventaires} />}
        {modalUpdate&&
            <UpdateInventaire  open={()=>setModalUpdate(true)} handleClose={()=>setModalUpdate(false)} id={id} getInventaires={getInventaires} />}
            {openD && <DetailsParrain emailP={idProp} handleOpen={handleOpenDetails} handleClose={handleCloseDetails} />}
            {openHD && <DetailsHabillement name={name} handleOpen={handleOpenHDetails} handleClose={handleCloseHDetails} />}
      </div>
    </div>
  )
}

export default Inventaire