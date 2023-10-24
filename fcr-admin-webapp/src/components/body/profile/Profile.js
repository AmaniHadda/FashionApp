
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  FaEye,
  FaArchive,
  FaSearch,
  FaTrash,
  FaUndo,
  FaUnlock,
  FaLock,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import Table from "../../Table/Table";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import "./profile.css";
import {
  showSuccessMsg,
  showErrMsg,
} from "../../utils/notifications/Notification";
import {
  fetchAllUsers,
  dispatchGetAllUsers,
} from "../../../redux/actions/usersAction";
import { toast, ToastContainer } from "react-toastify";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, TextField, Tooltip } from "@mui/material";
import Badge from "@mui/material/Badge";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import ViewUser from "./ViewUser";
import { AiFillWarning, AiOutlineCheckCircle } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";

const initialState = {
  name: "",
  password: "",
  cf_password: "",
  err: "",
  success: "",
};

function Profile() {
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);
  const users = useSelector((state) => state.users);
  const { user, isAdmin } = auth;
  const [modalBlockage, setModalBlockage] = useState(false);
  const [data, setData] = useState(initialState);
  const [id, setId] = useState('');
  const [formattedUsers, setFormattedUsers] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [query, setQuery] = useState("");
  const { err, success } = data;
  const [isArchived, setIsArchived] = useState(user.isArchived);
  const [modalJustified, setModalJustified] = useState(false);
  const [modalJustifiedAnnuler, setModalJustifiedAnnuler] = useState(false);
  const [blocked, setBlocked] = useState(user.blocked);
  const [loading, setLoading] = useState(false);
  const [callback, setCallback] = useState(false);
  const [open, setOpen] = useState(false);
  const [archivedUsers, setArchivedUsers] = useState([]);
  const [birthday, setBirthday] = useState(
    localStorage.getItem("birthday") || ""
  );
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  const dispatch = useDispatch();
  const [modalArchive, setModalArchive] = useState(false)
  const getUsersEnableandNotBlocked = async () => {
    await axios.get("/user/users").then(res => {
      const formattedData = res.data
        .filter((user) => user._id !== auth.user._id)
        .map((user, index) => {
          return { ...user, id: user._id, registrationDate: user.createdAt };
        });

      setFormattedUsers(formattedData);
    }).catch(err => console.log(err))
  }
  useEffect(() => {
    if (isAdmin) {
      fetchAllUsers(token).then((res) => {
        dispatch(dispatchGetAllUsers(res));
        const formattedData = res.data
          .filter((user) => user._id !== auth.user._id && !user.isArchived)
          .map((user, index) => {
            return { ...user, id: user._id, registrationDate: user.createdAt };
          });

        setFormattedUsers(formattedData);
        setFilterData(formattedData);
        localStorage.setItem("formattedUsers", JSON.stringify(formattedData));
      });

      const filteredArchivedUsers = users.filter((user) => user.isArchived);
      setArchivedUsers(filteredArchivedUsers);
      getUsersEnableandNotBlocked()
    }
  }, [user, token, isAdmin, dispatch, callback]);

  useEffect(() => {
    const storedFormattedUsers = localStorage.getItem("formattedUsers");
    if (storedFormattedUsers) {
      setFormattedUsers(JSON.parse(storedFormattedUsers));
      setFilterData(JSON.parse(storedFormattedUsers));
    }
  }, []);
  const handleCall = (phone) => {
    if (isMobile) {
      window.open(`tel:${phone}`);
    } else {
      const whatsappLink = `https://wa.me/${phone}`;
      window.open(whatsappLink, "_blank");
    }
  };
  const handleJustified = async (etat) => {
    await axios.put(`/user/updateEtatJustificatif/${id}/${etat}`).then(res => {
      toast.success(`Le justificatif est ${etat} avec succées`);
      getUsersEnableandNotBlocked();
      if(etat==="Justifié"){
        setModalJustified(false)
        return;
      }else{
        setModalJustifiedAnnuler(false)
        return;
      }
    }).catch(err => console.log(err))
  };
  const handleBlockUser = async () => {
    try {
      let res;

      if (blocked) {
        res = await axios.put(`/user/unblock/${id}`);
      } else {
        res = await axios.put(`/user/block/${id}`);
      }

      if (res.status === 200) {
        const updatedBlocked = !blocked;
        toast.success(`Utilisateur ${updatedBlocked ? "bloqué" : "débloqué"} avec succées`);

        const updatedUsers = formattedUsers.map((user) => {
          if (user._id === id) {
            return { ...user, blocked: updatedBlocked };
          }
          return user;
        });

        setFormattedUsers(updatedUsers);
        setModalBlockage(false)
      } else {
        toast.error("Failed to block/unblock user");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error block/unblock user");
    }
  };
  const handleArchive = async () => {
    try {
      let res;
      if (isArchived) {
        res = await axios.put(`/user/enable/${id}`);
      } else {
        res = await axios.put(`/user/disable/${id}`);
      }
      if (res.status === 200) {
        const updatedIsArchived = !isArchived; // Toggle the value of isArchived
        const updatedUsers = formattedUsers.map((user) => {
          if (user._id === id) {
            return { ...user, isArchived: updatedIsArchived };
          }
          return user;
        });
        const activeUsers = updatedUsers.filter(
          (user) => user.isArchived === false
        );

        setFormattedUsers(activeUsers);

        toast(
          `Utilisateur ${updatedIsArchived ? "archivé" : "désarchivé"
          } avec succès`
        );
        setModalArchive(false)
      } else {
        toast.error("Failed to archive/unarchive user");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error archiving/unarchiving user");
    }
  };
  const handleSearch = async (event) => {
    const getSearch = event.target.value.toLowerCase();
    if (getSearch.length > 0) {
      await axios.get(` /user/search/${getSearch}`).then(res => {
        const searchData = res.data.data.map((b) => ({
          ...b,
          id: b._id,
        }))
        setFormattedUsers(searchData);
      }
      );
    } else {
      setFormattedUsers(filterData);
    }
    setQuery(getSearch);
  };
  const handleUpdate = (id) => {
    setId(id);
    setOpen(true);
  };
  const handleClose = (id) => {
    setOpen(false);
  };
  const columns = [
    {
      field: "avatar",
      sortable: false,
      headerName: "Photo",
      width: 70,
      renderCell: (params) => (
        <img
          src={params.value}
          alt=""
          className=""
          style={{ width: 40, borderRadius: "50%" }}
        />
      ),
    },
    { field: "name", headerName: "Nom et prénom", sortable: true, width: 140 },

    { field: "email", headerName: "Email", sortable: true, width: 200 },
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
      field: "registrationDate",
      headerName: "Date d'inscription",
      sortable: true,
      width: 130,
      renderCell: (params) => (
        <Moment locale="fr" format="YYYY/MM/DD">
          {params.value}
        </Moment>
      ),
    },
    {
      field: "isJustified",
      headerName: "Justificatif",
      sortable: true,
      width: 110,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          {params.value === "En attente" &&
            <>
              <AiFillWarning style={{ color: "orange", marginRight: "30px" }} />
              <Badge style={{ color: "orange" }} badgeContent="En attente" />
            </>}
          {params.value === "Pas de justificatif" &&
            <>
              <FaTimesCircle style={{ color: "#f36980", marginRight: "43px" }} />
              <Badge style={{ color: "#f36980" }} badgeContent="Non disponible" />
            </>
          }
          {params.value === "Justifié" &&
            <>
            <FaCheckCircle style={{ color: "#269e26", marginRight: "30px" }} />
              <Badge style={{ color: "#269e26" }} badgeContent="Justifié" />
            </>
          }

        </div>
      ),
    },

    {
      field: "statusParrain",
      headerName: "Status Parrain",
      sortable: true,
      width: 120,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          {params.value ? (
            <>
              <FaCheckCircle style={{ color: "#65a4e8", marginRight: "30px" }} />
              <Badge style={{ color: "#65a4e8" }} badgeContent="Parrainé" />
            </>
          ) : (
            <>
              <FaTimesCircle style={{ color: "#f36980", marginRight: "43px" }} />
              <Badge style={{ color: "#f36980" }} badgeContent="Non parrainé" />
            </>
          )}
        </div>
      ),
    },
  
    {
      field: "blocked",
      headerName: "Status",
      sortable: true,
      width: 120,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          {params.value ? (
            <>
              <FaTimesCircle style={{ color: "#d74848", marginRight: "30px" }} />
              <Badge style={{ color: "#d74848", fontSize: "30px" }} badgeContent="Bloqué" />
            </>
          ) : (
            <>
              <FaCheckCircle style={{ color: "green", marginRight: "43px" }} />
              <Badge style={{ color: "green", fontSize: "30px" }} badgeContent="Non Bloqué" />
            </>
          )}
        </div>
      ),
    },
    {
      field: "Action",
      headerName: "Action",
      sortable: true,
      width: 200,
      renderCell: (params) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <span
            style={{
              fontSize: 20 + "px",
              color: "#85b2e2",
              marginRight: 15 + "px",
              cursor: "pointer",
            }}
            variant="contained"
            color="primary"
            onClick={() => handleUpdate(params.row.id)}
          >
            <FaEye />
          </span>
          <span
            style={{
              fontSize: 20 + "px",
              color: "#CB94F0",
              marginRight: 15 + "px",
              cursor: "pointer",
            }}
            variant="contained"
            title={params.row.isArchived ? "Unarchive" : "Archive"}
            onClick={() => { setId(params.row.id); setModalArchive(true); setIsArchived(params.row.isArchived) }}
          >
            {params.row.isArchived ? <FaUndo /> : <FaArchive />}
          </span>
          {params.row.isJustified==="Pas de justificatif"&&<span
            style={{
              fontSize: 20 + "px",
              color: "green",
              marginRight: 20 + "px",
              cursor: "pointer",
            }}
            variant="contained"
          >
            -
          </span>}
          {params.row.isJustified==="En attente"&&<span
            style={{
              fontSize: 20 + "px",
              color: "green",
              marginRight: 9 + "px",
              cursor: "pointer",
            }}
            variant="contained"
            title="Valider justificatif"
            onClick={() => { setId(params.row.id); setModalJustified(true) }}
          >
            <AiOutlineCheckCircle />
          </span>}
          {params.row.isJustified==="Justifié"&&<span
            style={{
              fontSize: 20 + "px",
              color: "red",
              marginRight: 9 + "px",
              cursor: "pointer",
            }}
            variant="contained"
            title="Annuler justificatif"
            onClick={() => { setId(params.row.id); setModalJustifiedAnnuler(true) }}
          >
            <ImCancelCircle />
          </span>}

          <span
            style={{
              fontSize: 20 + "px",
              color: "#ED8C90",
              marginRight: 15 + "px",
              cursor: "pointer",
            }}
            variant="contained"
            title={params.row.blocked ? "Débloquer" : "Bloquer"}
            onClick={() => { setModalBlockage(true); setId(params.row._id); setBlocked(params.row.blocked) }}
          >
            {params.row.blocked ? <FaLock /> : <FaUnlock />}
          </span>



        </div>
      ),
    },
  ];

  return (
    <>
      <ToastContainer />
      <div>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        {loading && <h3 style={{ marginLeft: "500px" }}>Loading.....</h3>}
      </div>
      <div className="profile_page">
        <div className="col-left"></div>
        <div className="col-right">
          <h2 style={{ textTransform: "none" }}>
            {isAdmin ? "Mes utilisateurs" : ""}
          </h2>
          <div style={{ display: "flex", alignItems: "center" }}>
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
            </div></div>
          <Table columns={columns} data={formattedUsers} />
          <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle style={{ color: "#ec407a", fontSize: "25px" }}>
              Détails utilisateur
            </DialogTitle>
            <DialogContent>
              <ViewUser
                id={id}
                handleClose={handleClose} />
            </DialogContent>
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
              Êtes-vous sûr(e) de vouloir archiver ce compte ?
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
          <Dialog
            open={modalJustified}
            onClose={() => setModalJustified(false)}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>
              Confirmation
            </DialogTitle>
            <DialogContent>
              Êtes-vous sûr(e) de vouloir accepter ce fichier ?
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setModalJustified(false)}
                style={{ color: "black" }}
              >
                Fermer
              </Button>
              <Button
                style={{ backgroundColor: "#ec407a", color: "white" }}
                onClick={()=>handleJustified("Justifié")}
              >
                Accepter
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={modalJustifiedAnnuler}
            onClose={() => setModalJustifiedAnnuler(false)}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>
              Confirmation
            </DialogTitle>
            <DialogContent>
              Êtes-vous sûr(e) de vouloir annuler ce fichier ?
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setModalJustifiedAnnuler(false)}
                style={{ color: "black" }}
              >
                Fermer
              </Button>
              <Button
                style={{ backgroundColor: "#ec407a", color: "white" }}
                onClick={()=>handleJustified("En attente")}
              >
                Annuler le fichier
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={modalBlockage}
            onClose={() => setModalBlockage(false)}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>
              Confirmation
            </DialogTitle>
            <DialogContent>
              Êtes-vous sûr(e) de vouloir {blocked ? " débloquer" : " bloquer"} ce compte ?
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setModalBlockage(false)}
                style={{ color: "black" }}
              >
                Fermer
              </Button>
              <Button
                style={{ backgroundColor: "#ec407a", color: "white" }}
                onClick={handleBlockUser}
              >
                {blocked ? " Débloquer" : " Bloquer"}
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </>
  );
}

export default Profile;

