import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import { Alert, Backdrop, Card, CardContent, CardHeader, CircularProgress, Grid, Menu, MenuItem, Stack, Button } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import { MdCategory, MdOutlineRestore } from "react-icons/md";
import { FaUser, FaArchive, FaTrash } from "react-icons/fa";
import { useState } from 'react';
import { GiClothes } from "react-icons/gi";
import { BiCategoryAlt } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import {  useSelector } from 'react-redux';
export default function HistoriqueCategory() {
  const [checked, setChecked] = React.useState([0]);
  const [id, setId] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [categories, setCatégories] = useState([]);
  const [groupedData, setGroupedData] = useState(categories);
  const token = useSelector((state) => state.token);
  const open = Boolean(anchorEl);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const handleCloseB = () => {
    setOpenBackdrop(false);
  };
  const handleOpenB = () => {
    setOpenBackdrop(true);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (id) => {
    setAnchorEl(null);
  };
  const handleDelete = async (id) => {
    const response = await axios.delete(` /admin/deleteCategory/${id}`).then(res => {
      handleOpenB();
      setTimeout(() => {
        toast.success("Catégorie a été supprimé avec succées");
        getAllCatInfor();
        handleCloseB();
      }, 1000);
    });

    console.log(id)
  };
  const handleRestaurer = async (id) => {
    const response = await axios.put(` /admin/categories/${id}/archive`)
      .then(res => {
        handleOpenB();
        setTimeout(() => {
          toast.success("La catégorie est restauré avec succées");
          getAllCatInfor();
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
  const groupedCat = () => {
    const grouped = categories.reduce((groups, item) => {
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
  const getAllCatInfor = async () => {
    const response = await axios.get(" /admin/fetchCategory/")
      .then(res => setCatégories(res.data.data.filter((e) => e.isArchived))).catch(err => console.log(err))
  }
  React.useEffect(() => {
    groupedCat();
  }, [categories])
  React.useEffect(() => {
    getAllCatInfor();
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
                                    <BiCategoryAlt style={{ fontSize: "2.3vh", color: "green" }} /> Vous avez archivé cette catégorie {value.name}
                                  </div>
                                }
                              />
                              <ListItemText id={labelId} sx={{ color: 'grey' }} primary={value.description} />
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={openBackdrop}
            onClick={handleCloseB}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Grid>
      </div>) : (
      <Grid container spacing={2}> <Stack sx={{ width: '100%', marginTop: "50px", display: "flex", justifyContent: "center", alignItems: "center" }} spacing={2}>
        <Alert severity="warning">Pour le moment, aucune catégorie n'a été enregistré dans nos archives !</Alert>
      </Stack></Grid>
    ))
}
