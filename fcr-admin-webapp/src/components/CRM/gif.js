import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';

export default function GIF() {
  const boxShadowStyle = {
    marginLeft: "20px",
    marginTop:"20px",
    marginRight: "10px",
    width: "500px",
    height:"580px",
    backgroundColor:"#f4e7f0",
    boxShadow:  "rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px",
  };
  const [Gif, setGif] = useState(null);
  const [GifId, setGifId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
    axios.get("/gif")
      .then((response) => {
        const fetchedGif = response.data[0];
        setGif(fetchedGif);
        setGifId(fetchedGif._id);
        console.log(fetchedGif);
      })
      .catch((error) => {
        console.error("Error retrieving Gif:", error);
      });
  }, []);
  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setGif(file);
  };
  
  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("gif", Gif);

      await axios.put(`/gif/update/${GifId}`, formData);

      setShowModal(false);
    } catch (error) {
      console.error("Error updating Gif:", error);
    }
  };

  return (
    
    <div className="banner-list-page">
    <div className="banner-list-container">
    <div style={boxShadowStyle}>
      <br/>
      <Typography variant="h4"  gutterBottom style={{marginLeft:"19vh"}}>
          Image animée
      </Typography>
      <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setShowModal(true)}
            style={{ position: 'relative', cursor: 'pointer',display: 'inline-block' }}
          >
            {Gif && (
              <>
                <img
                  src={`${process.env.REACT_APP_URL_UPLOAD}gif/${Gif.gif}?${Date.now()}`}
                  alt="Gif"
                  style={{ width: "58vh", height: "60vh", marginLeft: "5vh" }}
                />
                {isHovered && (
                  <IconButton
                  style={{
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    color: 'white',
                    backgroundColor: '#d499ac',
                  }}
                  onClick={() => setShowModal(true)}
                  >
                    <FaEdit fontSize="large" />
                    </IconButton>
                )}
              </>
            )}
          </div>
 

      <br/>
      <Dialog open={showModal} onClose={() => setShowModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle style={{ color: '#ec407a' }}>Update Gif</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" gutterBottom>
          Veuillez choisir une nouvelle image de Gif :
          </Typography>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{
              width: "100%", // Adjust the width as needed
              height: "100%", // Adjust the height as needed
            }}
          
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowModal(false)} style={{ color: "black" }}>Annuler</Button>
          <Button onClick={handleSubmit} variant="contained" style={{ backgroundColor: '#ec407a' }}>Enregistrer</Button>
        </DialogActions>
      </Dialog>
    </div></div></div>
  );
}

