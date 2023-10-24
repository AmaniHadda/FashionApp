import React, { useEffect, useState } from 'react'
import Table from '../Table/Table'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, NativeSelect, TextField, Tooltip } from '@mui/material';
import { FaSearch, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-phone-number-input/style.css';
import PhoneInput, { isPossiblePhoneNumber, isValidPhoneNumber } from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';
import "./style.css"
import { format } from 'date-fns';

import {

  IoMdAdd
} from "react-icons/io";
import { BsFillArchiveFill } from 'react-icons/bs';

const isEmpty = (value) => {
  if (!value) return true;
  return false;
};
const isEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export default function Parrain() {
  const [error, setErrors] = useState(null);
  const [parrain, setParrain] = useState([]);
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  const [query, setQuery] = useState("");
  const [formattedParrain, setFormattedParrain] = useState([]);
  const [email, setEmail] = useState("")
  const [showAddModal, setShowAddModal] = useState(false);
  const [phone, setPhone] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [modalArchive, setModalArchive] = useState(false)
  const [id, setId] = useState("");
  const handleCall = (phone) => {
    if (isMobile) {
      window.open(`tel:${phone}`);
    } else {
      const whatsappLink = `https://wa.me/${phone}`;
      window.open(whatsappLink, "_blank");
    }
  };
  const formatDate = (timestamp) => {
    const dateFormat = 'dd/MM/yyyy à hh:m'; // Modify the format here as per your desired date format
    if(timestamp){
      return format(new Date(timestamp), dateFormat);
    }
    else return null
   
  };
  const handleAdd = async () => {
    let emailError = "";

    if (!isEmail(email)) {
      emailError = "S'il vous plaît, mettez une adresse email valide";
    }

    if (isEmpty(email) || isEmpty(phone)) {
      toast("Merci de remplir tous les champs", {
        className: "toast-failed",
        bodyClassName: "toast-failed",

      });
      return;
    }

    if (emailError) {
      setEmailError(emailError);
      return;
    }

    if (!phone || typeof phone !== 'string' || phone.trim() === '' || !isValidPhoneNumber(phone)) {
      setErrors('');
      toast("Numéro de téléphone invalide", {
        className: "toast-failed",
        bodyClassName: "toast-failed",
      });
      return;
    }

    try {
      const response=await axios.post(` /parrain/AjouterParrain`, { email: email, phone: phone });
  if (response.data.status === "FAILED") { // Check the 'status' property in the response
    toast.error("Utilisateur non trouvé!", { autoClose: 1000 });
    return;
  } else {
      setShowModal(false);
      getParrain();
      toast.success('Parrain Ajouté avec succes', { autoClose: 2000 });

      setShowAddModal(false);
      setEmail("");
      setPhone("");
      setEmailError("");
     }
  
    }catch (error) {
   
      toast.error("Parrain déjà existant", { autoClose: 2000 });
      console.error("Erreur d'ajout de Parrain", error);
    }
  };
  const handleSearch = async(event) => {
    const searchTerm = event.target.value;
    setQuery(searchTerm);
    console.log(searchTerm)
    if (searchTerm.length > 0) {
      await axios.get(` /parrain/searchP/${searchTerm}`).then(res => {
        const searchData = res.data.data.map((b) => ({
          ...b,
          id: b._id,        
        }))
      
        setParrain(searchData)      
      });
    } else {
      setParrain(formattedParrain);
      console.log(parrain)
    }
  };
  const getParrain = async () => {
    await axios.get(' /parrain/retrieveParrain')
      .then(res => {
        const formattedata = res.data.data.map((b) => ({
          ...b,
          id: b._id,
        }));
        setParrain(formattedata);
        setFormattedParrain(formattedata)
        console.log(res.data.data)
      })
      .catch((error) => { console.log(error) })
  }
  const handleAddModalOpen = () => {
    setShowAddModal(true);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePhoneChange = (event) => {

    if (event.target.name === 'phone' && !isValidPhoneNumber(event.target.value)) {
      setErrors(<div style={{ color: 'red' }}>Please enter a valid phone number</div>);
    } else {
      setErrors(null);
    }
    setPhone(event.target.value)

  };
  const handleAddModalClose = () => {
    setShowAddModal(false);
  };
  const handleArchive = async() => {
    const response=await axios.put(` /parrain/disableP/${id}`)
    .then(res=>{setModalArchive(false); getParrain(); });
  };
  useEffect(() => {
    getParrain()
  }, [])
  const columns = [
    {
      field: "email",
      headerName: "Adresse Email",
      description: "This column has a value getter and is not sortable.",
      sortable: true,
      width: 220,
    },
    {
      field: "phone",
      headerName: "Numéro de téléphone",
      description: "",
      sortable: true,
      width: 200,
      renderCell: (data) => {
        return (
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "4px",
            border: "none",
            outline: "none",
            cursor: "pointer",
          }}>
            <Tooltip title="Appeler">
              <a
                style={{ marginRight: 15 + "px", color: "green" }}
                onClick={() => handleCall(data.row.phone)}
              >
                <i className="fa-solid fa-phone"></i>
              </a>
            </Tooltip>
            <span>{data.row.phone}</span> </div>
        )
      }
    },
    {
      field: "nb utilisateurs Parrinées",
      headerName: "Nombre des parrainés",
      description: "phone foreign key",
      sortable: true,
      width: 180,
      renderCell: (data) => {
        return (
          <div className="text-center">
            {data.row.idUser.length}
          </div>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Date De Création",
      description: "This column has a value getter and is not sortable.",
      sortable: true,
      width: 160,
      renderCell: (data) => {
        return (
          <div className="text-center">
            {formatDate(data.row.createdAt)}
          </div>
        );
      },
    },
    {


      field: "userId",
      headerName: "Utilisateurs parrainnés",
      description: "Utilisateurs Parrinnés",
      sortable: true,
      width: 200,
      renderCell: (data) => {
        return (
          <div className="text-center">
           <NativeSelect
  style={{ width: "150px" }}
  defaultValue={"default"}
  inputProps={{
    name: '',
    id: 'uncontrolled-native',
  }}
>
  <option disabled value={"default"}>Liste</option>

  {data.row.idUser && data.row.idUser.map((user, index) => (
    <option key={index} value={user.name}>
      {user.name}
    </option>
  ))}

</NativeSelect>

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
      className: "fas fa-trash-alt",
      title: "Remove",
      renderCell: (data) => {
        return (
          <div style={{ display: "flex", gap: "10px" }}>
            <Tooltip title="Archiver">
              <a
                href="#"
                onClick={() => { setId(data.row._id); setModalArchive(true) }}
                style={{
                  fontSize: 20 + "px",
                  color: "#CB94F0",
                  marginRight: 15 + "px",
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
          style={{ display: "flex", marginTop: "10px", justifyContent: "flex-start" , fontSize: "1.7rem"}}>
          Mes parrains
        </h1>

        <div style={{ display: "flex", alignItems: "center" }}>
        <Button
                 variant="contained"
                 style={{
                   backgroundColor: "#d499ac",
                   color: "white",
                   marginBottom: "10px",
                 }}
                 onClick={handleAddModalOpen}
              >
                <IoMdAdd />
                Ajouter Un Parrain
              </Button>
           <div style={{marginLeft: "auto"}} >
          <TextField
            label="Recherche"
            type="search"
            placeholder="Rechercher..."
            name="name"
            value={query}
            onChange={(e) => handleSearch(e)}
            sx={{ m: 2, width: "30ch"}}
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

       
        <div
          className=""
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Dialog open={showAddModal} onClose={handleAddModalClose} maxWidth="sm" fullWidth>
            <DialogTitle style={{ color: "#ec407a" }}>Ajouter Parrain</DialogTitle>
            <DialogContent>
              <TextField label="Email" value={email} onChange={handleEmailChange} fullWidth margin="normal" />
              {emailError && <div className="error-message" style={{ color: "red" }}>{emailError}</div>}
              <PhoneInput


                name="phone_number"
                placeholder="Phone Number *"
                value={phone}
                onChange={(phone) => setPhone(phone)}
                flags={flags}

                defaultCountry="TN" />

              {phone ? (
                !isPossiblePhoneNumber(phone) && !isValidPhoneNumber(phone) ? (

                  <div style={{ color: 'red' }}>Please enter a valid phone number</div>

                ) : null
              ) : null}
              {error && <div>{error}</div>}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleAddModalClose} style={{ color: "black" }}>
                Annuler
              </Button>
              <Button onClick={handleAdd} variant="contained" style={{ backgroundColor: "#ec407a" }}>
                Ajouter
              </Button>
            </DialogActions>
          </Dialog>
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
            Êtes-vous sûr(e) de vouloir archiver ce contact ?
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
          <div className="table-container">
            <Table columns={columns} data={parrain} />
          </div>
        </div>
      </div>
    </div>

  )
}