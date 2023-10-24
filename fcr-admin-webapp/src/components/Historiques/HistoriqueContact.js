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
import { useState } from 'react';
import {
  MdDashboard,
  MdContacts,
  MdOutlineProductionQuantityLimits,
  MdContactPage,
  MdOutlineRestore,
} from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { FaTrash } from 'react-icons/fa';
export default function HistoriqueContact() {
  const [checked, setChecked] = React.useState([0]);
  const [id, setId] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [contacts, setContacts] = useState([]);
  const [groupedData, setGroupedData] = useState(contacts);
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
  const handleDelete = async(id) => {
        const response = await axios.delete(`/contact/delete/${id}`).then(res=>{
          handleOpenB();
          setTimeout(() => {
            toast.success("Le contact est supprimé avec succées");
            getAllContactInfor();
            handleClose(); 
            handleCloseB();          
          }, 1000);
        }).catch(err=>console.log(err));
  };
  const handleRestaurer = async(id) => { 
        const response = await axios.put(`/contact/restaurer/${id}`)
        .then(res=>{ 
          handleOpenB();
          setTimeout(() => {
            toast.success("Le contact est restauré avec succées");
            getAllContactInfor();
            handleClose(); 
            handleCloseB();          
          }, 1000);
        })
          .catch(err=>console.log(err))  
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
  const groupedContact=()=>{
    const grouped = contacts.reduce((groups, item) => {
      const groupKey = item.updatedAt.slice(0,10);
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
  const getAllContactInfor = async () => {
      await axios.get("/contact/allinfomrations/")
      .then(res =>{
        setContacts(res.data.filter(e => e.status === "Archivé"))
      } )
      .catch(err=>console.log(err));
  };
  React.useEffect(() => {
    groupedContact();   
  }, [contacts])
  React.useEffect(() => {
    getAllContactInfor();  
    console.log(groupedData.length) 
  }, [])
  
  return (   
    Object.entries(groupedData).length !==0 ? (
      <Grid container spacing={2}>
      <ToastContainer />
      {Object.entries(groupedData).sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA)).map(([date, contacts]) => (
         <Grid item xs={12} key={date}>
        <Card key={date} sx={{borderRadius: 3 }} elevation={3} >
        <CardHeader title={date} />
        <hr style={{ opacity: "0.5" }} />
        <CardContent>
        <List sx={{ width: '100%',  bgcolor: 'background.paper' }}>
            {contacts.map((value) => {
              const labelId = `checkbox-list-label-${value._id}`;
              return (
                <ListItem
                  key={value._id}
                  secondaryAction={
                    <div style={{display:"flex", alignItems:"center"}}>
                     <Button onClick={()=>{setId(value._id);handleRestaurer(value._id)}} style={{color:"grey", fontSize:"20px", cursor:"pointer"}}><MdOutlineRestore /></Button>
                     <Button onClick={()=>{setId(value._id);handleDelete(value._id)}} style={{color:"red", cursor:"pointer"}}><FaTrash  /></Button>
                     </div>
                   }
                  disablePadding
                >
                  <ListItemButton role={undefined} onClick={handleToggle(value)} dense >
                    <ListItemIcon sx={{display: "flex", alignItems:"center", marginRight:5}}>
                      {/* <Checkbox
                        edge="start"
                        checked={checked.indexOf(value) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                      />  */}
                      <div>{value.updatedAt.slice(11,16)}</div>
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={<div sx={{display: "flex", alignItems:"center"}}><MdContacts style={{fontSize:"2.3vh", color:"pink"}} /> Vous avez archivé ce contact {value.name} </div>} />
                    <ListItemText id={labelId} sx={{color:"grey"}} primary={value.email} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </CardContent></Card></Grid>
  
      ))}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
        onClick={handleCloseB}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      </Grid>

    ):(<Grid container spacing={2}> <Stack sx={{ width: '100%', marginTop:"50px", display:"flex", justifyContent:"center", alignItems:"center" }} spacing={2}>
    <Alert severity="warning">Pour le moment, aucun contact n'a été enregistré dans nos archives !</Alert>
  </Stack>
  </Grid>)
     
  );
}
