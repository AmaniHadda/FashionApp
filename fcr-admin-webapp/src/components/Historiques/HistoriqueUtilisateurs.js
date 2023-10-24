import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import { Alert, Backdrop, Button, Card, CardContent, CardHeader, CircularProgress, Grid, Menu, MenuItem, Stack } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import { FaUser, FaArchive, FaTrash } from "react-icons/fa";
import { useState } from 'react';
import {
  MdDashboard,
  MdContacts,
  MdOutlineProductionQuantityLimits,
  MdContactPage,
  MdOutlineRestore,
} from "react-icons/md";
import {
  fetchAllUsers,
  dispatchGetAllUsers,
} from "../../redux/actions/usersAction";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
export default function HistoriqueUtilisateur() {
  const [checked, setChecked] = React.useState([0]);
  const [id, setId] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [users, setUsers] = useState([]);
  const [groupedData, setGroupedData] = useState(users);
  //////////////
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);
  const listUsers = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const handleCloseB = () => {
    setOpenBackdrop(false);
  };
  const handleOpenB = () => {
    setOpenBackdrop(true);
  };
  const { user, isAdmin } = auth;
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (id) => {
    setAnchorEl(null);
  };
  const handleDelete = async (id) => {
    const response = await axios.delete(`/user/delete/${id}`, {
      headers: { Authorization: token },
    }).then(res => {
      handleOpenB();
      setTimeout(() => {
        toast.success("Ce compte est supprimé avec succées");
        getAllUsersInfor();
        handleClose();
      }, 1000);
    }).catch(err => console.log(err)
    );
    console.log(id)
  };
  const handleRestaurer = async (id) => {
    const response = await axios.put(`/user/restaurer/${id}`)
      .then(res => {
        handleOpenB();
        setTimeout(() => {
          toast.success("Le compte est restauré avec succées");
          getAllUsersInfor();
          handleClose();
          handleCloseB();
        }, 1000);
      })
      .catch(err => console.log(err))
  };
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    console.log(checked)
  };
  const groupedUsers = () => {
    const grouped = users.reduce((groups, item) => {
      const groupKey = item.updatedAt.slice(0, 10);
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(item);
      return groups;
    }, {});
    setGroupedData(grouped)
    console.log(groupedData)
    console.log(grouped)
  }
  const getAllUsersInfor = async () => {
    if (isAdmin) {
      fetchAllUsers(token).then((res) => {
        dispatch(dispatchGetAllUsers(res));
        const formattedData = res.data
          .filter((user) => (user._id !== auth.user._id && user.isArchived === true))
          .map((user, index) => {
            return { ...user, id: user._id, registrationDate: user.createdAt };
          });

        setUsers(formattedData);
      });
    }
  };
  React.useEffect(() => {
    groupedUsers();
  }, [users])
  React.useEffect(() => {
    getAllUsersInfor();
  }, [])

  return (
    Object.entries(groupedData).length !== 0 ? (
      <div>
        <ToastContainer />
        <Grid container spacing={2}>
          {Object.entries(groupedData)
            .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA))
            .map(([date, users]) => (
              <Grid item xs={12} key={date}>
                <Card sx={{ borderRadius: 3 }} elevation={3}>
                  <CardHeader title={date} />
                  <hr style={{ opacity: '0.5' }} />
                  <CardContent>
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                      {users.map((value) => {
                        const labelId = `checkbox-list-label-${value._id}`;
                        return (
                          <ListItem
                            key={value._id}
                            secondaryAction={
                              <div style={{ display: "flex", alignItems: "center" }}>
                                <Button onClick={() => { setId(value._id); handleRestaurer(value._id) }} style={{ color: "grey", fontSize: "20px", cursor: "pointer" }}><MdOutlineRestore /></Button>
                                <Button onClick={() => { setId(value._id); handleDelete(value._id) }} style={{ color: "red", cursor: "pointer" }}><FaTrash /></Button>
                              </div>
                            }
                            disablePadding
                          >
                            <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                              <ListItemIcon sx={{ display: 'flex', alignItems: 'center', marginRight: 5 }}>
                                <div>{value.updatedAt.slice(11, 16)}</div>
                              </ListItemIcon>
                              <ListItemText
                                id={labelId}
                                primary={
                                  <div sx={{ display: 'flex', alignItems: 'center' }}>
                                    <FaUser style={{ fontSize: "2.3vh", color: "blueviolet" }} /> Vous avez archivé ce compte {value.name}
                                  </div>
                                }
                                secondary={value.email}
                              />
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openBackdrop}
          onClick={handleCloseB}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    ) : (
      <Grid container spacing={2}>
        <Stack sx={{ width: '100%', marginTop: "50px", display: "flex", justifyContent: "center", alignItems: "center" }} spacing={2}>
          <Alert severity="warning">Pour le moment, aucun utilisateur n'a été enregistré dans nos archives !</Alert>
        </Stack>
      </Grid>
    )
    
  );
}
