
import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../Table/Table";
import { ToastContainer, toast } from "react-toastify";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  InputAdornment,
  Tooltip,
  Chip,
} from "@mui/material";
import { format } from 'date-fns';

import { FaTrash, FaSearch, FaEye } from "react-icons/fa";
import {
  BsFillCheckCircleFill,
  BsCalendarDayFill,
  BsCalendarEventFill,
  BsFillCalendarCheckFill,
  BsFillArchiveFill,
} from "react-icons/bs";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { IoMdAdd } from "react-icons/io";
import AjouterMeeting from "./AjouterMeeting";

const Meeting = () => {
  const [data, setData] = useState([]);
  const [idRow, setIdRow] = useState(0);
  const [formattedMeeting, setFormattedMeeting] = useState([]);
  const [meeting, setMeeting] = useState([]);
  const [query, setQuery] = useState("");
  const [modalShow, setModalShow] = React.useState(false);
  const [modalAdd, setModalAdd] = React.useState(false);
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');
  const [date3, setDate3] = useState('');
  const [modelReject, setModelReject] = useState(false);
  const [modalArchive, setModalArchive] = useState(false);
  const [Raison, setRaison] = useState("");
  const history = useHistory();
  const [date1Error, Setdate1Error] = useState("");
  const [date2Error, Setdate2Error] = useState("");
  const [date3Error, Setdate3Error] = useState("");
  const [RehjectError, SetRejectError] = useState("");
  useEffect(() => {
    getMeeting();
  }, []);
  const handleOpen = () => {
    setModalAdd(true);
  };
  const handleClose = () => {
    setModalAdd(false);
  };
  const handleRaisonChange = (e) => {
    setRaison(e.target.value);
    if (e.target.value === "") {
      SetRejectError('Ce champs est requis')
    }
  };
  const handleDate1Change = (e) => {
    setDate1(e.target.value);
    const currentDate = new Date();
    const today = format(currentDate, 'yyyy-MM-dd');
    if (e.target.value < today) {
      Setdate1Error("la date doit étre supérieure à date d'aujourd'hui")
    }
  };
  const handleDate2Change = (e) => {
    setDate2(e.target.value);
    const currentDate = new Date();
    const today = format(currentDate, 'yyyy-MM-dd');
    if (e.target.value < today) {
      Setdate2Error("la date doit étre supérieure à date d'aujourd'hui")
    }
  };
  const handleDate3Change = (e) => {
    setDate3(e.target.value);
    const currentDate = new Date();
    const today = format(currentDate, 'yyyy-MM-dd');
    if (e.target.value < today) {
      Setdate3Error("la date doit étre supérieure à date d'aujourd'hui")
    }
  };
  const getMeeting = async () => {
    try {
      const response = await axios.get("/api/meetings/");
      if (Array.isArray(response.data.meetings)) {
        const formattedMeeting = response.data.meetings.map((meeting) => ({
          ...meeting,
          date: meeting.date.slice(0, 10),
          id: meeting._id,
          userName: meeting.userId ? meeting.userId.name : "",
        }));
        console.log(formattedMeeting); // Check the value of formattedMeeting
        setFormattedMeeting(formattedMeeting);
        setMeeting(formattedMeeting);
      } else {
        console.error("Invalid response data format. Expected an array.");
      }
    } catch (err) {
      console.error(err);
    }
  };
  const approuve = async (id) => {
    const response = await axios
      .put(`/api/meetings/approuve/${id}`)
      .then((res) => toast.success("Rendez-vous approuvé"));
    getMeeting();
  };
  const archiver = async () => {
    const response = await axios
      .put(`/api/meetings/archiver/${idRow}`)
      .then((res) => { setModalArchive(false); getMeeting(); toast.success("Rendez-vous archivé") })
      .catch(err => console.log(err));
  };
  const rejeter = async () => {
    if (Raison.trim() === "") {
      return toast.error("Veuillez remplir le champs du raison s'il vous plait . ")
    }
    setModelReject(false);
    const response = await axios
      .put(`/api/meetings/reject/${idRow}`, { rejectedReason: Raison })
      .then((res) => toast.success("Rendez-vous reporté"));
    getMeeting();
  };
  const reporter = async (id) => {
    const currentDate = new Date();
    const today = format(currentDate, 'yyyy-MM-dd');
    console.log(today)
    console.log(date1)
    if ((date1.trim() === "") || (date2.trim() === "") || (date3.trim() === "")) {
      return toast.error("Veuillez remplir tous les champs s'il vous plait")
    }
    if (date1 < today) {
      return toast.error(date1 + "est inférieure à date d'aujourd'hui veuillez vérifier s'il vous plait")
    }
    if (date2 < today) {
      return toast.error(date2 + "est inférieure à date d'aujourd'hui veuillez vérifier s'il vous plait")
    }
    if (date3 < today) {
      return toast.error(date3 + "est inférieure à date d'aujourd'hui veuillez vérifier s'il vous plait")
    }
    if (date1 === date2 || date2 === date3 || date1 === date3) {
      return toast.error("Il y'a 2 dates identiques veuillez vérifier s'il vous plait")
    }
    await axios
      .put(`/api/meetings/report/${id}`, { otherDates: [date1, date2, date3] })
      .then((res) => {
        toast.success("Le rendez-vous a été reporté avec succés");
        setModalShow(false);
        Setdate1Error("");
        Setdate2Error("");
        Setdate3Error("")
      });
    getMeeting();


  };
  const handleSearch = async (event) => {  
    var searchTerm = event.target.value;
    setQuery(searchTerm);

  };
  const Search = async () => {
    await axios.get(` /api/meetings/search/${query}`).then(res => {
      const searchData = res.data.data.map((meeting) => ({
        ...meeting,
        date: meeting.date.slice(0, 10),
        id: meeting._id,
        userName: meeting.userId ? meeting.userId.name : "",
      }))
      setFormattedMeeting(searchData);
    });
  }
  useEffect(() => {
    if (query.length > 0) {
      const delaySearch = setTimeout(Search, 100);
      return () => clearTimeout(delaySearch);
    }
    else {
      getMeeting()
    }
  }, [query])

  const columns = [
    {
      field: "userName",
      headerName: "Client",
      description: "This column has a value getter and is not sortable.",
      sortable: true,
      width: 150,
      renderCell: (data) => <div>{data.row.userId? data.row.userId?.name: "Indisponible"}</div>
    },
    {
      field: "coachName",
      headerName: "Coach",
      description: "Subcategory foreign key",
      sortable: true,
      width: 200,
      renderCell: (data) => <div>{data.row.coachName? data.row.coachName?.name: "Indisponible"}</div>
    },
    {
      field: "eventType",
      headerName: "Type d'événement",
      description: "Category status: Archived or Not Archived",
      sortable: true,
      width: 170,
    },
    {
      field: "status",
      headerName: "Status",
      description: "Category status: Archived or Not Archived",
      sortable: true,
      width: 170,
      renderCell: (data) => {
        let chipColor = "";
        if (data.row.status === "Reporté") {
          chipColor = "primary";
        } else if (data.row.status === "Approuvé") {
          chipColor = "success";
        } else if (data.row.status === "Rejeté") {
          chipColor = "secondary";
        }
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
            {data.row.status && (
              <Chip
                label={data.row.status}
                color={chipColor || "default"}
                variant="outlined"
              />
            )}
          </div>
        );
      },
    },
    {
      field: "date",
      headerName: "Date",
      description: "Category status: Archived or Not Archived",
      sortable: true,
      width: 150,
    },
    // {
    //   field: "isCanceled",
    //   headerName: "Annulation",
    //   description: "",
    //   sortable: true,
    //   width: 100,
    //   renderCell:(data)=>data.row.isCanceled===true? "Annulé": "Confirmé"

    // },
    {
      field: "Action",
      headerName: "Action",
      description: "",
      sortable: true,
      width: 170,
      className: "fas fa-trash-alt",
      title: "Remove",
      renderCell: (data) => {
        return (
          <div className="text-center">
            <span
              style={{
                fontSize: 20 + "px",
                marginRight: 15 + "px",
                color: data.row.isCanceled === true ? "#71d181" : "#30843e",
                pointerEvents: data.row.isCanceled === true ? "none" : "auto",
                textDecoration: "underline",
                cursor:
                  data.row.isCanceled === true ? "not-allowed" : "pointer",
              }}
              onClick={() => {
                if (data.row.isCanceled === false) {
                  approuve(data.row._id)
                }
              }}
            >
              <Tooltip title="Approuver">
                <a

                >
                  <BsFillCalendarCheckFill />
                </a>
              </Tooltip></span>

            <span
              style={{
                fontSize: 20 + "px",
                marginRight: 15 + "px",
                color: (data.row.status === "Reporté" || data.row.isCanceled === true) ? "#bed5ed" : "#85b2e2",
                pointerEvents: (data.row.status === "Reporté" || data.row.isCanceled === true) ? "none" : "auto",
                textDecoration: "underline",
                cursor:
                  (data.row.status === "Reporté" || data.row.isCanceled === true) ? "not-allowed" : "pointer",
              }}
              onClick={() => {
                if (data.row.status !== "Reporté" && data.row.isCanceled === false) {
                  setModalShow(true);
                  setIdRow(data.row._id);
                }
              }}
            >
              <Tooltip title="Reporter">
                <a>
                  <BsCalendarDayFill />
                </a>
              </Tooltip>
            </span>

            <Tooltip title="Archiver">
              <a
                href="#"
                onClick={() => { setIdRow(data.row._id); setModalArchive(true) }}
                style={{
                  fontSize: 20 + "px",
                  color: "#CB94F0",
                  marginRight: 15 + "px",
                }}
              >
                <BsFillArchiveFill />
              </a>
            </Tooltip>
            <span
              style={{
                fontSize: 20 + "px",
                color: data.row.status === "Approuvé" ? "#e68181" : "#e85b5b",
                pointerEvents: data.row.status === "Approuvé" ? "none" : "auto",
                textDecoration: "underline",
                cursor:
                  data.row.status === "Approuvé" ? "not-allowed" : "pointer",
              }}
              onClick={() => {
                if (data.row.status !== "Approuvé") {
                  setModelReject(true);
                  setIdRow(data.row._id);
                }
              }}
            >
              <Tooltip title="Rejeter">
                <a>
                  <FaTrash />
                </a>
              </Tooltip>
            </span>
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
          <h1 style={{ fontSize: "1.7rem", color: "black", margin: "10px 0" }}>
            Mes Rendez-Vous
          </h1>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              style={{
                backgroundColor: "#d499ac",
                color: "white",
                marginBottom: "10px",
              }}
              onClick={handleOpen}
            >
              <IoMdAdd />
              Ajouter un rendez-vous
            </Button>
            <Button
              style={{
                backgroundColor: "#d499ac",
                color: "white",
                marginBottom: "10px",
                marginLeft: "10px"
              }}
              onClick={() => history.push("/calendar")}
            >
              <BsCalendarEventFill
                style={{
                  marginRight: 10 + "px",
                  fontSize: 18 + "px",
                  color: "white",
                }}
              />{" "}
              Calendrier
            </Button>
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
              <TextField
                label="Recherche"
                color="primary"
                type="search"
                placeholder="Rechercher..."
                name="name"
                value={query}
                onChange={handleSearch}
                sx={{ m: 2, width: "30ch" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaSearch />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>

          <Table columns={columns} data={formattedMeeting} />
          <Dialog
            open={modalShow}
            onClose={() => {
              setModalShow(false); Setdate1Error("");
              Setdate2Error("");
              Setdate3Error("")
            }}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle style={{ color: "#ec407a" }}>
              Proposer 3 dates pour le rendez-vous
            </DialogTitle>

            <DialogContent>
              <div> Autres dates : </div>
              <TextField
                required
                type="date"
                onChange={handleDate1Change}
                fullWidth
                margin="normal"
                error={Boolean(date1Error)}
                helperText={date1Error}
              />
              <TextField
                required
                type="date"
                onChange={handleDate2Change}
                fullWidth
                margin="normal"
                error={Boolean(date2Error)}
                helperText={date2Error}
              />
              <TextField
                required
                type="date"
                onChange={handleDate3Change}
                fullWidth
                margin="normal"
                error={Boolean(date3Error)}
                helperText={date3Error}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setModalShow(false); Setdate1Error("");
                  Setdate2Error("");
                  Setdate3Error("")
                }}
                style={{ color: "black" }}
              >
                Fermer
              </Button>
              <Button
                variant="contained"
                onClick={() => reporter(idRow)}
                style={{ backgroundColor: "#ec407a" }}
              >
                Reporter
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={modelReject}
            onClose={() => setModelReject(false)}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle style={{ color: "#ec407a" }}>
              Remplir la raison de rejet
            </DialogTitle>
            <DialogContent>
              <TextField
                color="primary"
                id="outlined-multiline-static"
                onChange={handleRaisonChange}
                margin="normal"
                fullWidth
                label="Raison"
                multiline
                rows={4}
                required
                error={Boolean(RehjectError)}
                helperText={RehjectError}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => { setModelReject(false); SetRejectError(""); }}
                style={{ color: "black" }}
              >
                Fermer
              </Button>
              <Button
                variant="contained"
                onClick={rejeter}
                style={{ backgroundColor: "#ec407a" }}
              >
                Rejeter
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
              Êtes-vous sûr(e) de vouloir archiver ce rendez-vous ?
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
                onClick={archiver}
              >
                Archiver
              </Button>
            </DialogActions>
          </Dialog>
          {modalAdd &&
            <AjouterMeeting open={handleOpen} handleClose={handleClose} getMeetings={getMeeting} />}
        </div>
      </div>
    </>
  );
};

export default Meeting;
