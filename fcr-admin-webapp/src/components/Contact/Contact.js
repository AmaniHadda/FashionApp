
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Table from "../Table/Table";

import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  TextField,
  Tooltip,
} from "@mui/material";
import { FaTrash, FaSearch, FaEye } from "react-icons/fa";
import { BsFillSendFill, BsFillArchiveFill } from "react-icons/bs";

const Contact = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [formattedContacts, setFormattedContacts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [query, setQuery] = useState("");
  const [reponse, setReponse] = useState("");
  const [modalShow, setModalShow] = React.useState(false);
  const [contact, setContact] = React.useState({});
  const [modalRespond, setmodalRespond] = React.useState(false);
  const { err, success } = data;
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  const [idContact, setIdContact] = useState("");
  const [email, setEmail] = useState("");
  const [objet, setObjet] = useState("");
  const [SendError, setSendError] = useState("");
  const [modalArchive, setModalArchive] = useState(false)
  useEffect(() => {
    getAllContactInfor();
  }, []);

  const getContactById = async (id) => {
    setModalShow(true);
    await axios
      .get(`/contact/informations/${id}`)
      .then((res) => setContact(res.data))
      .catch((err) => console.log(err));
  };
  const handleCall = (phone) => {
    if (isMobile) {
      window.open(`tel:${phone}`);
    } else {
      const whatsappLink = `https://wa.me/${phone}`;
      window.open(whatsappLink, "_blank");
    }
  };
  const handleReponseChange = (e) => {
    setReponse(e.target.value);
    if (e.target.value === "") {
      setSendError("Ce champs est requis")
    }
  };
  const getAllContactInfor = async () => {
    try {
      const response = await axios.get("/contact/allinfomrations/");
      if (response.status === 200) {
        setData(response.data);
        const formattedContacts = response.data.map((contact) => ({
          ...contact,
          id: contact._id,
        }));
        setFormattedContacts(formattedContacts.filter(e => e.status !== "Archivé"));
        setContacts(formattedContacts.filter(e => e.status !== "Archivé"));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRespond = async () => {
    if (reponse.trim() === "") {
      toast.error("Remplir le champs de réponse s'il vous plait .")
    } else {
      axios
        .put(`/contact/respond/${idContact}`, {
          user: email,
          objet: objet,
          respond: reponse,
        })
        .then(() => {
          console.log("mail envoyé");
          setmodalRespond(false);
          setSendError('')
          toast.success("Un mail est envoyé avec succées");
          getAllContactInfor();
        })
        .catch((err) => console.log(err));
    }


  };
  const handleArchive = async () => {
    axios
      .put(`/contact/archieve/${idContact}`)
      .then(() => {
        console.log("archieved");
        setModalArchive(false)
        getAllContactInfor();
      })
      .catch((err) => console.log(err));
    getAllContactInfor();


  };
  const handleSearch = async (event) => {
    const searchTerm = event.target.value;
    setQuery(searchTerm);

    if (searchTerm.length > 0) {
      await axios.get(` /contact/search/${searchTerm}`).then(res => {
        const searchData = res.data.data.map((b) => ({
          ...b,
          id: b._id,
        }))
        setFormattedContacts(searchData);
      })
    } else {
      setFormattedContacts(contacts);
    }
  };
  const handleTraiter = async (id, email) => {
    axios.put(`/contact/traiter/${id}`, { email: email }).then(() => getAllContactInfor()).catch(err => console.log(err))
  };
  const handleNonTraiter = async () => {
    axios.put(`/contact/nonTraiter/${idContact}`, {
      user: email,
      objet: objet,
    }).then(() => getAllContactInfor()).catch(err => console.log(err))
  };
  const columns = [
    {
      field: "name",
      headerName: "Utilisateur",
      description: "This column has a value getter and is not sortable.",
      sortable: true,
      width: 110,
    },
    {
      field: "email",
      headerName: "Email",
      description: "This column has a value getter and is not sortable.",
      sortable: true,
      width: 160,
    },
    {
      field: "phone",
      headerName: "Num de téléphone",
      description: "",
      sortable: true,
      width: 150,
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
      field: "object",
      headerName: "Objet",
      description: "",
      sortable: true,
      width: 90,
    },
    {
      field: "message",
      headerName: "Message",
      description: "",
      sortable: true,
      width: 160,
    },
    {
      field: "createdAt",
      headerName: "Envoyé à",
      description: "",
      sortable: true,
      width: 150,
      renderCell: (data) => {
        return (<div>{data.row.createdAt.slice(0, 10) + " " + data.row.createdAt.slice(11, 16)}</div>)
      }
    },
    {
      field: "status",
      headerName: "Status",
      description: "This column has a value getter and is not sortable.",
      sortable: true,
      width: 140,
      renderCell: (data) => {
        let chipColor = "";
        if (data.row.status === "En attente") {
          chipColor = "primary";
        } else if (data.row.status === "Traité") {
          chipColor = "success";
        } else if (data.row.status === "Répondu") {
          chipColor = "secondary";
        } else {
          chipColor = "default";
        }

        return (
          < div style={{
            display: "flex",
            alignItems: "center",
          }}>

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
              {data.row.status && (
                <Chip label={data.row.status} color={chipColor} style={{backgroundColor: data.row.status==="Traité"? "#89DF98" : "", color:data.row.status==="Traité"? "black" : ""}} variant="outlined" />
              )}

            </div>
            {data.row.status === "Répondu" && (
              <div >
                <Tooltip title="Traiter">
                  <a
                    href="#"
                    style={{ marginLeft: 15 + "px", color: "green", fontSize: 18 + "px" }}
                    onClick={() => handleTraiter(data.row._id, data.row.email)}
                  >
                    <i className="fa fa-check" aria-hidden="true"></i>
                  </a>
                </Tooltip></div>

            )}
            {data.row.status === "Traité" && (
              <div >
                <Tooltip title="Non traiter">
                  <a
                    href="#"
                    style={{ marginLeft: 15 + "px", color: "red", fontSize: 18 + "px" }}
                    onClick={() =>{ setEmail(data.row.email);
                      setIdContact(data.row._id);
                      setObjet(data.row.object); handleNonTraiter()}}
                  >
                    <i className="fa fa-ban" aria-hidden="true"></i>
                  </a>
                </Tooltip></div>

            )}
          </div>
        );
      },
    },
    {
      field: "Action",
      headerName: "Actions",
      description: "",
      sortable: true,
      width: 120,
      renderCell: (data) => {
        return (
          <div className="text-center">
            <Tooltip title="Détails">
              <a
                href="#"
                onClick={() => getContactById(data.row._id)}
                style={{
                  fontSize: 23 + "px",
                  color: "#85B2E2",
                  marginRight: 15 + "px",
                }}
              >
                <FaEye />
              </a>
            </Tooltip>
            <span
              style={{
                fontSize: 20 + "px",
                marginRight: 15 + "px",
                color: data.row.status === "Traité" ? "#88df97" : "#30843e",
                pointerEvents: data.row.status === "Traité" ? "none" : "auto",
                textDecoration: "underline",
                cursor:
                  data.row.status === "Traité" ? "not-allowed" : "pointer",
              }}
              onClick={() => {
                if (data.row.status !== "Traité") {
                  setmodalRespond(true);
                  setName(data.row.name);
                  setEmail(data.row.email);
                  setIdContact(data.row._id);
                  setObjet(data.row.object);
                }
              }}
            >
              <Tooltip title="Répondre">
                <a>
                  <BsFillSendFill />
                </a>
              </Tooltip>
            </span>
            <Tooltip title="Archiver">
              <a
                href="#"
                onClick={() => { setIdContact(data.row._id); setModalArchive(true) }}
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
            Mes Contacts
          </h1>
          <div style={{ display: "flex" }}>
            <div style={{ marginLeft: "auto" }}>
              <TextField
                label="Recherche"
                type="search"
                placeholder="Rechercher..."
                name="name"
                value={query}
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
          <Table columns={columns} data={formattedContacts} />
        </div>
        <Dialog
          open={modalShow}
          onClose={() => setModalShow(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle style={{ color: "#ec407a" }}>
            De {contact.name}
          </DialogTitle>
          <DialogContent>
            <div>Email : {contact.email}</div>
            <div>Numéro de tél : {contact.phone}</div>
            <div style={{ marginTop: "30px" }}>Objet : {contact.object}</div>
            <div style={{ marginTop: "30px" }}>{contact.message}</div>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setModalShow(false)}
              style={{ color: "black" }}
            >
              Fermer
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={modalRespond}
          onClose={() => { setmodalRespond(false); setSendError("") }}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle style={{ color: "#ec407a" }}>
            Repondre à {name}
          </DialogTitle>
          <DialogContent>
            <TextField
              color="primary"
              id="outlined-multiline-static"
              onChange={handleReponseChange}
              margin="normal"
              fullWidth
              label="Réponse"
              multiline
              rows={4}
              error={Boolean(SendError)}
              helperText={SendError}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => { setmodalRespond(false); setSendError("") }}
              style={{ color: "black" }}
            >
              Fermer
            </Button>
            <Button
              style={{ backgroundColor: "#ec407a", color: "white" }}
              onClick={handleRespond}
            >
              Envoyer un email
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
      </div>
    </>
  );
};

export default Contact;

