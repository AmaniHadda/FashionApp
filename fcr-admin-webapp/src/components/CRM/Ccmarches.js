import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, NativeSelect, Select, Stack, TextField, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';
import Table from '../Table/Table';
import axios from 'axios';
import { IoMdAdd } from 'react-icons/io';
import { format } from 'date-fns';
import { ToastContainer, toast } from "react-toastify";
export default function Ccmarches() {
  const [ccmarche, setccmarche] = useState([]);
  const [titleError, setTitleError] = useState('');
  const [descriptionsError, setDescriptionsError] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [editTitle, setEditTitle] = useState(''); // New state variable for editing title
  const [editDescriptions, setEditDescriptions] = useState(['']); // New state variable for editing descriptions
  const [modalDelete, setModaldelete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [descriptions, setDescriptions] = useState(['']);
  const [selectedCcmarche, setSelectedCcmarche] = useState([]);
  const [InfoShow, setInfoShow] = useState(true)

  const [id, setId] = useState("");
  const handleEditModalOpen = (data) => {
    setSelectedCcmarche(data);
    setEditTitle(data.title);
    setEditDescriptions([...data.descriptions]);
    setEditOpen(true);
  };
  const validateAddForm = () => {
    let valid = true;

    // Validate the title field
    if (title.trim() === '') {
      setTitleError('Le titre est requis');
      valid = false;
    } else {
      setTitleError('');
    }

    // Validate each description field
    const descriptionsErrors = descriptions.map((description, index) => {
      if (description.trim() === '') {
        return 'La description est requise';
      }
      return '';
    });

    setDescriptionsError(descriptionsErrors);

    return valid;

  };
  const validateEditForm = () => {
    let valid = true;

    // Validate the title field
    if (editTitle.trim() === '') {
      setTitleError('Le titre est requis');
      valid = false;
    } else {
      setTitleError('');
    }

    // Validate each description field
    if (editDescriptions.every((description) => description.trim() === '')) {
      setDescriptionsError(['Il doit y avoir au moins une description']);
      valid = false;
    } else {
      // Clear the description errors when there is at least one non-empty description
      setDescriptionsError(new Array(editDescriptions.length).fill(''));
    }

    return valid;
  };
  // Function to handle closing the edit dialog
  const handleEditModalClose = () => {
    setEditOpen(false);
    setIsEditing(false);
    setIsEditingTitle(false)
  };

  const handleUpdateCcmarche = async () => {
    const isValid = validateEditForm();

    if (!editTitle || !editDescriptions[0]) {
      return toast.error("Veuillez remplir tous les champs s'il vous plait .")
    }
    try {
      const response = await axios.put(`/ccmarche/updatecommentcamarche/${id}`, { title: editTitle, editDescriptions: editDescriptions });
      toast.success('Comment Ca Marche modifiée avec succès');
      console.log('Comment Ca Marche updated successfully:', response.data);
      setEditOpen(false);
      fetchData();
      setIsEditing(false);
      setIsEditingTitle(false)
    } catch (error) {
      toast.error('Erreur de modification de comment ça marche!!');
      console.error('Error updating Comment Ca Marche:', error);
    }

  };
  useEffect(() => {
    fetchData();
    setTimeout(() => {
      setInfoShow(false)
    }, 5002);
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/ccmarche/getcommentcamarche');
      const formattedcommentcamarche = response.data.data.map((b) => ({
        ...b,
        id: b._id
      }))
      setccmarche(formattedcommentcamarche);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleAddModalOpen = () => {
    setOpen(true);
  };

  const handleAddModalClose = () => {
    setOpen(false);
    setTitle('');
    setDescriptions(['']);
  };

  const handleAddDescription = () => {
    setDescriptions([...descriptions, '']);
  };
  const handleSave = async () => {
    const isValid = validateAddForm();
    if (!title || !descriptions[0]) {
      return toast.error("Veuillez remplir tous les champs s'il vous plait .")
    }
    else {
      try {
        const response = await axios.post('/ccmarche/ccamarche', {
          title,
          descriptions,
        });
        console.log('Comment Ca Marche added successfully:', response.data.data);
        toast.success('Comment Ca Marche ajoutée avec succès');
        handleAddModalClose();
        fetchData();
      } catch (error) {
        toast.error("Erreur d'ajout de comment ça marche!!");
        console.error('Error adding Comment Ca Marche:', error);
      }
    }
  };
  const formatDate = (timestamp) => {
    const dateFormat = 'dd/MM/yyyy à hh:m';
    if (timestamp) {
      return format(new Date(timestamp), dateFormat);
    }
    else return null

  };
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/ccmarche/commentcamarche/${id}`);
      toast.success('Comment Ca Marche supprimée avec succès');
      setModaldelete(false)
      fetchData();
    } catch (error) {
      toast.error('Erreur de suppression de comment ça marche!!');
      console.error('Error deleting Comment Ca Marche:', error);
    }
  };
  const handleDeleteConfirmation = (id) => {
    setId(id);
    setModaldelete(true);
  };
  const columns = [
    {
      field: "title",
      headerName: "Titre",
      description: "This column has a value getter and is not sortable.",
      sortable: true,
      width: 300,
    },
    {
      field: "descriptions",
      headerName: "Descriptions",
      description: "This column has a value getter and is not sortable.",
      sortable: true,
      width: 280,
      renderCell: (data) => {
        return (
          <div>
            <NativeSelect
              style={{ width: "150px" }}
              defaultValue={"default"}
              inputProps={{
                name: '',
                id: 'uncontrolled-native',
              }}
            >
              <option defaultValue="default" disabled value={"default"} >Liste</option>
              {data.row.descriptions && data.row.descriptions.map((description, index) => (
                <option key={index} value={description}>
                  {description}
                </option>
              ))}

            </NativeSelect>
          </div>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Date De Création",
      description: "This column has a value getter and is not sortable.",
      sortable: true,
      width: 200,
      renderCell: (data) => {
        return (
          <div className="text-center">
            {formatDate(data.row.createdAt)}
          </div>
        );
      },
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
                onClick={() => { setId(data.row._id); handleEditModalOpen(data.row) }} // Pass the row data to the function
                style={{ fontSize: 23 + "px", color: "#f5e277", marginRight: 10 + "px", cursor: "pointer" }}

              >
                <FaEdit />
              </a>
            </Tooltip>
            <Tooltip title="Supprimer">
              <a
                href="#"

                onClick={() => handleDeleteConfirmation(data.row._id)}
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
  const handleAddEditDescription = () => {
    setEditDescriptions([...editDescriptions, '']);
  };
  return (
    <div>
      <ToastContainer />
      <div style={{ alignItems: "center" }}>
        <h2 style={{ display: "flex", justifyContent: "flex-start" }}>
          LISTE DE COMMENT CA MARCHE
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
            Ajouter Comment Ca Marche
          </Button>
        </div>
      </div>
      <div className="table-container" >
        <Table columns={columns} data={ccmarche} />
        {/* Add Modal */}

        <Dialog open={open} onClose={handleAddModalClose} maxWidth="sm"
          fullWidth>
          <DialogTitle>Ajouter Comment Ca Marche</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Titre"
              value={title}
              error={Boolean(titleError)}
              helperText={titleError}
              fullWidth
              onChange={(e) => {
                if (e.target.value.trim() === "") {
                  setTitleError("Ce champs est requis")
                } else {
                  setTitleError("")
                }
                setTitle(e.target.value)
              }}
            />
            {descriptions.map((description, index) => (
              <div>
                <TextField
                  key={index}
                  margin="dense"
                  label={`Description ${index + 1}`}
                  value={description}
                  fullWidth
                  onChange={(e) => {
                    const newDescriptions = [...descriptions];
                    newDescriptions[index] = e.target.value;

                    if (newDescriptions.every((description) => description.trim() === '')) {
                      setDescriptionsError(['Il doit y avoir au moins une description']);
                    } else {
                      // Clear the description errors when there is at least one non-empty description
                      setDescriptionsError(new Array(editDescriptions.length).fill(''));
                    }
                    setDescriptions(newDescriptions);
                  }}
                  error={Boolean(descriptionsError[index])}
                  helperText={descriptionsError[index]}
                />
              </div>
            ))}
            <Button onClick={handleAddDescription} style={{ color: "#d499ac" }} disabled={descriptionsError.some((error) => Boolean(error))}>
              Ajouter une autre description
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddModalClose} style={{ color: "black" }}>
              Annuler
            </Button>
            <Button onClick={handleSave} variant="contained"
              style={{ backgroundColor: "#ec407a" }}>
              Ajouter
            </Button>
          </DialogActions>
        </Dialog>

        {/*Edit dialog */}
        <Dialog open={editOpen} onClose={handleEditModalClose} maxWidth="sm"
          fullWidth>
          <DialogTitle>Modifier Comment Ca Marche</DialogTitle>
          <DialogContent>
            {InfoShow && <Stack sx={{ width: '100%', marginTop: "15px", marginBottom: "10px" }} spacing={2}>
              <Alert severity="info">Clique simplement sur l'élément et effectue les modifications souhaitées. !</Alert>
            </Stack>}
            <div onClick={() => setIsEditingTitle(true)}>{!isEditingTitle && <div style={{ marginTop: "15px" }}><strong>Titre : </strong>{editTitle}</div>}</div>
            {isEditingTitle && <TextField
              style={{ marginTop: "15px" }}
              autoFocus
              margin="dense"
              label="Titre"
              value={editTitle}
              fullWidth
              onChange={(e) => setEditTitle(e.target.value)} // Update the editTitle state
            />}
            {editDescriptions.map((description, index) => (
              <div key={index}>
                <div onClick={() => setIsEditing(true)}>{!isEditing && <div style={{ marginTop: "15px" }}><strong>Description {index} :</strong>{description}</div>}</div>
                {isEditing &&
                  <TextField
                    style={{ marginTop: "15px" }}
                    key={index}
                    margin="dense"
                    label={`Description ${index + 1}`}
                    multiline
                    maxRows={4}
                    value={description}
                    fullWidth

                    onChange={(e) => {
                      const newDescriptions = [...editDescriptions];
                      newDescriptions[index] = e.target.value;
                      setEditDescriptions(newDescriptions); // Update the editDescriptions state
                    }}
                  />}
              </div>
            ))}
            <Button onClick={handleAddEditDescription} style={{ color: "#d499ac", marginTop: "15px" }}>
              Ajouter une autre description
            </Button>

          </DialogContent>
          <DialogActions >
            <Button onClick={handleEditModalClose} style={{ color: "black" }}>
              Annuler
            </Button>
            <Button onClick={handleUpdateCcmarche} variant="contained" style={{ backgroundColor: "#ec407a" }}>
              Mettre à jour
            </Button>
          </DialogActions>
        </Dialog>
        {/* confirm  */}
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
            Êtes-vous sûr(e) de vouloir supprimer ce comment ça marche ?
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
    </div>
  )
}
