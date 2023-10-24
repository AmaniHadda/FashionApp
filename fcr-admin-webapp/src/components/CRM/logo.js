import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';

export default function Logo() {
  const boxShadowStyle = {
    marginLeft: "10px",
    marginTop:"80px",
    width: "500px",
    height:"350px",
    backgroundColor:"#f4e7f0",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px",
  };
  const [hovering, setHovering] = useState(false);

  const handleImageClick = () => {
    setShowModal(true);
  };

  const [logo, setLogo] = useState(null);
  const [logoId, setLogoId] = useState("");
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    axios.get(" /logo")
      .then((response) => {
        const fetchedLogo = response.data[0];
        setLogo(fetchedLogo);
        setLogoId(fetchedLogo._id);
        console.log(fetchedLogo);
      })
      .catch((error) => {
        console.error("Error retrieving logo:", error);
      });
  }, []);
  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setLogo(file);
  };
  
  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("logo", logo);

      await axios.put(` /logo/update/${logoId}`, formData);

      setShowModal(false);
    } catch (error) {
      console.error("Error updating logo:", error);
    }
  };

  return (

    <div style={boxShadowStyle}>

            <br/>
      <Typography variant="h4" gutterBottom style={{marginLeft:"12px"}}>
          Logo
      </Typography>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        {logo && (
          <img
            src={`${process.env.REACT_APP_URL_UPLOAD}/logo/${logo.logo}?${Date.now()}`}
            alt="logo"
            style={{ width: "200px", height: "150px", marginLeft: "150px", cursor: "pointer" }}
            onClick={handleImageClick}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          />
        )}
        {hovering && (
          <IconButton
            style={{
              position: 'absolute',
              top: '5px',
              right: '5px',
              color: 'white',
              backgroundColor: '#d499ac',
            }}
            onClick={handleImageClick}
          >
            <FaEdit />
          </IconButton>
        )}
      </div>
      <br/>
      <Dialog open={showModal} onClose={() => setShowModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle style={{ color: '#ec407a' }}>Modifier Logo</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" gutterBottom>
          Veuillez choisir une nouvelle image de logo :
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
    </div>
  );
}

