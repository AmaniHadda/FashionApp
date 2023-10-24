import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, TextField, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { FaArchive, FaEdit, FaSearch } from 'react-icons/fa'
import { ToastContainer } from 'react-toastify'
import Table from '../Table/Table'
import axios from 'axios'
import { IoMdAdd } from 'react-icons/io'
import AddCoach from './AddCoach'
import UpdateCoach from './UpdateCoach'

function Coach() {
    const [coach, setCoach]=useState([])
    const [formattedData, setFormattedData]=useState([])
    const [modalAdd, setmodalAdd]=useState(false)
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    const [modalUpdate, setmodalUpdate]=useState(false)
    const [modalArchive, setModalArchive]=useState(false)
    const [query, setQuery]=useState("")
    const [id, setId]=useState("")
    const handleOpen = () => {
      setmodalAdd(true);
    };
    const handleCall = (phone) => {
      if (isMobile) {
        window.open(`tel:${phone}`);
      } else {
        const whatsappLink = `https://wa.me/${phone}`;
        window.open(whatsappLink, "_blank");
      }
    };
    const handleClose = () => {
      setmodalAdd(false);
    };
    const handleOpenUpdate = () => {
      setmodalUpdate(true);
    };
    const handleCloseUpdate = () => {
      setmodalUpdate(false);
    };
    const getCoach=async()=>{
        await axios.get(" /coach/getall/false").then(response=>{
            const formatted= response.data.map((c) => ({
                ...c,
                id: c._id,
              }));
              setFormattedData(formatted);
              setCoach(formatted);
        }).catch(err=>console.log(err));
    }
    const ArchiveCoach=async()=>{
        await axios.put(` /coach/disable/${id}`).then(response=>{
              setModalArchive(false)
              getCoach() 
        }).catch(err=>console.log(err));
    }
    const handleSearch = async (event) => {
      var searchTerm = event.target.value;
      setQuery(searchTerm);  
    };
    const Search = async () => {
      await axios.get(` /coach/search/${query}`).then(res => {
        console.log(res.data.data)
        const formatted= res.data.data.map((c) => ({
          ...c,
          id: c._id,
        }));
        setFormattedData(formatted);
      });
    }
    const columns = [
        {
          field: "name",
          headerName: "Nom du coach",
          description: "This column has a value getter and is not sortable.",
          sortable: true,
          width: 150,
        },
        {
          field: "email",
          headerName: "Mail du coach",
          description: "This column has a value getter and is not sortable.",
          sortable: true,
          width: 200,
        },
        {
          field: "description",
          headerName: "Description du coach",
          description: "This column has a value getter and is not sortable.",
          sortable: true,
          width: 200,
        },
        {
          field: "preferences",
          headerName: "Preferences",
          description: "This column has a value getter and is not sortable.",
          sortable: true,
          width: 200,
        },
        {
          field: "phone",
          headerName: "Numéro de téléphone",
          description: "This column has a value getter and is not sortable.",
          sortable: true,
          width: 200,
          renderCell: (data) => {
            return (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "4px",
                  border: "none",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                <Tooltip title="Appeler">
                  <a
                    style={{ marginRight: 15 + "px", color: "green" }}
                    onClick={() => handleCall(data.row.phone)}
                  >
                    <i className="fa-solid fa-phone"></i>
                  </a>
                </Tooltip>
                <span>{data.row.phone}</span>{" "}
              </div>
            );
          },
        },
    
        {
          field: "Action",
          headerName: "Action",
          description: "",
          sortable: true,
          width: 100,
          renderCell: (data) => (
            <div style={{ display: "flex", alignItems:"center"}}>
             <Tooltip title="Modifier"> 
             <a
                style={{
                  fontSize: 20 + "px",
                  color: "#f5e277",
                  marginRight: 15 + "px",
                  cursor: "pointer",
                }}
                variant="contained"
                onClick={() => {handleOpenUpdate(); setId(data.row._id)}}
              >
                <FaEdit />
              </a></Tooltip>
              <Tooltip title="Archiver">
                <a
                style={{
                  fontSize: 20 + "px",
                  color: "#CB94F0",
                  marginRight: 15 + "px", cursor: "pointer",
                }}
                variant="contained"
                onClick={() => { setId(data.row._id); setModalArchive(true);}}
              >
                <FaArchive />
              </a></Tooltip>
            </div>
          ),
        },
      ];
      useEffect(() => {
        if (query.length > 0) {
          Search()
        }
        else {
        getCoach()}
      }, [query])
     
  return (
    <>
    <ToastContainer />

    <div className="profile_page">
      <div className="col-left"></div>
      <div className="col-right">
        <h1
          style={{
            fontSize: "1.7rem",
            color: "black",
            margin: "10px 0",
          }}
        >
          Mes Coach
        </h1>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="col-md-8">
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
              Ajouter un coach
            </Button>
          </div>
          <div style={{ marginLeft: "auto" }}>
          <TextField
              label="Recherche"
              type="search"
              placeholder="Rechercher..."
              name="name"
              value={query}
              onChange={(e) => handleSearch(e)}
              sx={{ m: 2, width: "30ch" }}
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
        {
          modalAdd&&<AddCoach open={handleOpen} handleClose={handleClose} getCoaches={getCoach}/>
        }
        {
          modalUpdate&&<UpdateCoach open={handleOpenUpdate} handleClose={handleCloseUpdate} getCoaches={getCoach} id={id}/>
        }
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
            Êtes-vous sûr(e) de vouloir archiver ce coach ?
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
              onClick={ArchiveCoach}
            >
              Archiver
            </Button>
          </DialogActions>
        </Dialog>
        <Table
          columns={columns}
          data={formattedData}
        />
      </div>
    </div>
  </>
  )
}

export default Coach