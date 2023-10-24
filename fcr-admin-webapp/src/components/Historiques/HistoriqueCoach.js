import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Alert, Backdrop, Button, Card, CardContent, CardHeader, CircularProgress, Grid, Menu, MenuItem, Stack } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import {
  MdOutlineRestore,
} from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { FaTrash, FaUsers } from 'react-icons/fa';
export default function HistoriqueCoach() {
  const [checked, setChecked] = React.useState([0]);
  const [id, setId] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [coachs, setcoachs] = useState([]);
  const [groupedData, setGroupedData] = useState(coachs);
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
        const response = await axios.delete(`/coach/delete/${id}`).then(res=>{
          handleOpenB();
          setTimeout(() => {
            toast.success("Le coach est supprimé avec succées");
            getCoachs();
          handleCloseB(); }, 1000);
      });
    console.log(id)
  };
  const handleRestaurer = async(id) => { 
        const response = await axios.put(`/coach/enable/${id}`)
        .then(res=>{ 
          handleOpenB();
            setTimeout(() => {
          toast.success("Le coach est restauré avec succées");
          getCoachs();
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
  const groupedCoachs=()=>{
    const grouped = coachs.reduce((groups, item) => {
      const groupKey = item.updatedAt.slice(0,10);
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(item);
      return groups;
    }, {});
    setGroupedData(grouped)
  }
  const getCoachs = async () => {
    await axios.get(' /coach/getall/true').then(res => {
      const formatted = res.data.map((b) => ({
        ...b,
        id: b._id,
      }));
      setcoachs(formatted)
    }).catch(err => console.log(err))
  }
  React.useEffect(() => {
    groupedCoachs();   
  }, [coachs])
  React.useEffect(() => {
    getCoachs();  
  }, [])
  
  return (   
    Object.entries(groupedData).length !==0 ? (
      <Grid container spacing={2}>
      <ToastContainer />
      {Object.entries(groupedData).sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA)).map(([date, coach]) => (
         <Grid item xs={12} key={date}>
        <Card key={date} sx={{borderRadius: 3 }} elevation={3} >
        <CardHeader title={date} />
        <hr style={{ opacity: "0.5" }} />
        <CardContent>
        <List sx={{ width: '100%',  bgcolor: 'background.paper' }}>
            {coach.map((value) => {
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
                      <div>{value.updatedAt.slice(11,16)}</div>
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={<div sx={{display: "flex", alignItems:"center"}}><FaUsers style={{fontSize:"2.3vh", color:"blueviolet"}} /> Vous avez archivé ce coach {value.email} </div>} />
                    <ListItemText id={labelId} sx={{color:"grey"}} primary={"Contact du coach : "+value.phone}  />
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
    <Alert severity="warning">Pour le moment, aucun coach n'a été enregistré dans nos archives !</Alert>
  </Stack></Grid>)
     
  );
}
