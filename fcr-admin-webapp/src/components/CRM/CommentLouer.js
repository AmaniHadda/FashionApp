import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Stack, TextField, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';
import Table from "../Table/Table";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import { IoMdAdd } from 'react-icons/io';
export default function CommentLouer() {
  const [commentlouer, setcommentlouer] = useState([]);
  const [selectedCommentLouer, setSelectedCommentLouer] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedTypeDevice, setUpdatedTypeDevice] = useState('');
  const [newTitle, setNewTitle] = useState(''); // New state for creating a new item
  const [newDescription, setNewDescription] = useState(''); // New state for creating a new item
  const [newTypeDevice, setNewTypeDevice] = useState(''); // New state for creating a new item
  const [newTitleError, setNewTitleError] = useState('');
  const [newDescriptionError, setNewDescriptionError] = useState('');
  const [newTypeDeviceError, setNewTypeDeviceError] = useState('');
  const [IsEditTitle, setIsEditTitle] = useState('');
  const [IsEditDescription, setIsEditDescription] = useState('');
  const [IsEditTypeDevice, setIsEditTypeDevice] = useState('');
  const [id, setId] = useState('');
  const [InfoShow, setInfoShow] = useState(true)
  const[modalDelete,setModaldelete]=useState(false);
  useEffect(() => {
    fetchCommentLouerData();
    setTimeout(() => {
      setInfoShow(false)
  }, 5002);
  }, []);
  const fetchCommentLouerData = async () => {
    try {
      const response = await axios.get('/commentlouer/retrieve');
      const formattedcommentlouer = response.data.data.map((b) => ({
        ...b,
        id: b._id
      }))
      setcommentlouer(formattedcommentlouer);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }; 
  const handleUpdate = async () => {
    if(!updatedTitle||!updatedDescription||!updatedTypeDevice){
      
      return toast.error("Veuillez remplir tous les champs s'il vous plait .");
    }
    try {
      const id = selectedCommentLouer.id;
      const updatedData = {
        title: updatedTitle,
        description: updatedDescription,
        typeDevice: updatedTypeDevice,
      };
      const response = await axios.put(`/commentlouer/update/${id}`, updatedData);
      toast.success("Comment Louer modifiée avec succès")
      console.log('Update successful:', response.data);
      handleCloseDialog();
      fetchCommentLouerData();
    } catch (error) {
      toast.error("Erreur de modification de Comment Louer!")
      console.error('Error updating data:', error);
    }
  };
  const handleDelete = async () => {
    try {
        const response = await axios.delete(`/commentlouer/delete/${id}`);
        toast.success("comment louer supprimée avec succès")
        // Handle success, update the state with the updated data if needed
        console.log('Delete successful:', response.data);
        setModaldelete(false)
        fetchCommentLouerData();
      
    } catch (error) {
      toast.error("Erreur de suppression de comment ca marche")
      console.error('Error deleting data:', error);
    }
  };
  const handleClickEdit = (row) => {
    setSelectedCommentLouer(row);
    setUpdatedTitle(row.title);
    setUpdatedDescription(row.description);
    setUpdatedTypeDevice(row.typeDevice);
    setOpenDialog(true);
  };
  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };
  const handleTypeDeviceChange = (e) => {
    const value = e.target.value;
    setNewTypeDevice(value);
    if (value.trim() === '') {
      setNewTypeDeviceError("Ce champ est requis");
    } else {
      setNewTypeDeviceError("");
    }
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setIsEditDescription(false);
    setIsEditTitle(false);
    setIsEditTypeDevice(false);
  };
  const handleCreate = async () => {
    setNewTitleError('');
    setNewDescriptionError('');
    setNewTypeDeviceError('');

    
    const titleExists = commentlouer.some(item => item.title === newTitle);
    if (titleExists) {
      // Display an error message or perform any necessary actionscd 
      toast.error("Le titre doit étre unique");
      return;
    }
    if(!newTitle||!newDescription||!newTypeDevice){
      
      return toast.error("Veuillez remplir tous les champs s'il vous plait .");
    }
    // Validation checks
    try {
      
      const newCommentLouer = {
        title: newTitle,
        description: newDescription,
        typeDevice: newTypeDevice,
      };

      const response = await axios.post('/commentlouer/create', newCommentLouer);
      console.log('Create successful:', response.data);
      toast.success("Comment Louer ajouté avec succès")
      fetchCommentLouerData();
      handleCloseAddDialog();
    } catch (error) {
      toast.error("Erreur d'ajout De Comment Louer ")
      console.error('Error creating data:', error);
    }
  };

  const handleAddModalOpen = () => {
    setOpenAddDialog(true);
  };
  const columns = [
    {
      field: "title",
      headerName: "Titre",
      description: "This column has a value getter and is not sortable.",
      sortable: true,
      width: 340,
    },
    {
      field: "description",
      headerName: "Description",
      description: "This column has a value getter and is not sortable.",
      sortable: true,
      width: 280,
    },
    {
      field: "typeDevice",
      headerName: "Type d'appareil",
      description: "",
      sortable: true,
      width: 260,
    },
    {
      field: "Action",
      headerName: "Actions",
      description: "",
      sortable: true,
      width: 200,
      renderCell: (data) => {
        return (
          <div className="text-center">
            <Tooltip title="Modifier">
              <a
                href="#"
                onClick={() => handleClickEdit(data.row)}
                style={{ fontSize: 23 + "px", color: "#f5e277", marginRight: 10 + "px", cursor: "pointer" }}

              >
                <FaEdit />
              </a>
            </Tooltip>
            <Tooltip title="Supprimer">
              <a
                href="#"
                onClick={() => {setModaldelete(true);setId(data.row._id)} }
                style={{ fontSize: 20 + "px", color: "#e68181", marginRight: 15 + "px", cursor: "pointer" }}
              >
                <FaTrash />
              </a>
            </Tooltip>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <ToastContainer/>
      <div style={{ alignItems: "center" }}>
        <h2 style={{ display: "flex", justifyContent: "flex-start" }}>
          LISTE DE COMMENT LOUER
        </h2>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#d499ac",
              color: "white",
              marginBottom: "10px",
            }} onClick={handleAddModalOpen}
          ><IoMdAdd />
            Ajouter Comment Louer
          </Button>
        </div>
      </div>
      <div className="table-container" >
        <Table columns={columns} data={commentlouer} />
      </div>
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
        <DialogTitle>Ajouter Comment Louer</DialogTitle>
        <DialogContent>
          <TextField
            label="Titre"
            value={newTitle}
            fullWidth
            margin="normal"
            error={!!newTitleError}
            helperText={newTitleError}
            onChange={(e) => { 
            if(e.target.value.trim()===""){
              setNewTitleError("Ce champs est requis")
            }else{
              
              setNewTitleError("")
            }setNewTitle(e.target.value);}}
          />
          <TextField
            label="Description"
            value={newDescription}
            fullWidth
            margin="normal"
            error={!!newDescriptionError} 
            helperText={newDescriptionError}
            onChange={(e) =>{ 
              if(e.target.value.trim()===""){
                setNewDescriptionError("Ce champs est requis")
              }else{                
                setNewDescriptionError("")
              }setNewDescription(e.target.value);} }
          />
          <TextField
      label="Type d'appareil"
      value={newTypeDevice}
      fullWidth
      margin="normal"
      error={!!newTypeDeviceError}
      helperText={newTypeDeviceError}
      select
      onChange={handleTypeDeviceChange}
    >
      <MenuItem value="Mobile">Mobile</MenuItem>
      <MenuItem value="Web">Web</MenuItem>
    </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog} style={{ color: "black" }}>
            Annuler
          </Button>
          <Button
            onClick={handleCreate}
            variant="contained"
            style={{ backgroundColor: "#ec407a" }}
          >
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDialog}  onClose={handleCloseDialog} maxWidth="sm"
    fullWidth>
        <DialogTitle style={{color:"#ec407a", fontSize:"30px"}}>Modifier Comment Louer</DialogTitle>
        <DialogContent>
        {InfoShow&&<Stack sx={{ width: '100%', marginTop:"15px" , marginBottom:"10px" }} spacing={2}>     
      <Alert severity="info">Clique simplement sur l'élément et effectue les modifications souhaitées. !</Alert>
    </Stack>}
          <div style={{marginTop:"15px"}} onClick={()=>setIsEditTitle(true)}>
          {!IsEditTitle&&<div ><strong>Le titre : </strong>{updatedTitle}</div>}</div>
         {IsEditTitle&& <TextField
            label="Titre"
            value={updatedTitle}
            fullWidth
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />}
          
          <div style={{marginTop:"15px"}} onClick={()=>setIsEditDescription(true)}>
          {!IsEditDescription&&<div ><strong>La Description : </strong>{updatedDescription}</div>}</div>
         {IsEditDescription&&
          <TextField
            label="Description"
            value={updatedDescription}
            fullWidth
            multiline
            maxRows={4}
            onChange={(e) => setUpdatedDescription(e.target.value)}
          />
          }
          <div style={{marginTop:"15px"}} onClick={()=>setIsEditTypeDevice(true)}>
          {!IsEditTypeDevice&&<div ><strong>Le Type d'appareil : </strong>{updatedTypeDevice}</div>}
         {IsEditTypeDevice&&
          <TextField
            label="Type d'appareil"
            value={updatedTypeDevice}
            fullWidth
            select
            onChange={(e) => setUpdatedTypeDevice(e.target.value)}
          >
                  <MenuItem value="Mobile">Mobile</MenuItem>
      <MenuItem value="Web">Web</MenuItem>
          </TextField>
            }</div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} style={{ color: "black" }}>
            Annuler
          </Button>
          <Button onClick={handleUpdate} variant="contained"
            style={{ backgroundColor: "#ec407a" }}>
            Mettre à jour
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
          open={modalDelete}
          onClose={() => setModaldelete(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            Confirmation
          </DialogTitle>
          <DialogContent>
            Êtes-vous sûr(e) de vouloir supprimer ce comment louer ?
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setModaldelete(false)}
              style={{ color: "black" }}
            >
              Fermer
            </Button>
            <Button
              style={{ backgroundColor: "#ec407a", color: "white" }}
              onClick={handleDelete}
            >
              Supprimer
            </Button>
          </DialogActions>
        </Dialog>
    </div>
  )
}
