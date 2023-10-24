import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

export default function DetailsHabillement({ name, handleOpen, handleClose }) {
  const [habillement, setHabillement] = useState(null);
console.log(name)
  useEffect(() => {
    const fetchHabillement = async () => {
      try {
        const response = await axios.get(`/habillements/retrieveByName/${name}`);
        setHabillement(response.data);
      } catch (error) {
        console.error('Error fetching habillement details:', error);
      }
    };

    fetchHabillement();
  }, [name]);

  return (
    <Dialog open={handleOpen} onClose={handleClose}>
      <DialogTitle>Details Habillements</DialogTitle>
      <DialogContent>
        {habillement ? (
          <div>
            <img src={`${process.env.REACT_APP_URL_UPLOAD}habillements/${habillement.img}`} alt="Habillement" style={{marginLeft:"20px",width:"20ch",height:"20vh"}}/>
           <div><strong>Nom de L'article:</strong></div> 
            <p>{habillement.name}</p> 
            <div><strong>Prix:</strong></div> 
            <p>{habillement.price}</p>
            <div><strong>Nouveauté:</strong></div> 
            <p>{habillement.isNew_?"Nouveau Article":"Ancien Article"}</p>
            <div><strong>Date de Dépot:</strong></div> 
            <p>{habillement.dateDepot.slice(0,10)}</p>
            <div><strong>Date Effectif de Ramassage:</strong></div> 
            <p>{habillement.dateEffectifRamacage.slice(0,10)}</p>
          </div>
        ) : (
          <p>Loading habillement details...</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
