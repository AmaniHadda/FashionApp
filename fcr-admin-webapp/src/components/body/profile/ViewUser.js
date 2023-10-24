import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./viewUser.css";
import { Button, Grid } from "@mui/material";
import {
  FaCalendar,
  FaEnvelope,
  FaGenderless,
  FaHome,
  FaPhone,
  FaUser,
} from "react-icons/fa";
import {ImBlocked} from "react-icons/im";
import {FiUsers} from "react-icons/fi";
import {AiOutlineFileProtect} from "react-icons/ai";
const ViewUser = ({ handleClose, id }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/user/getuser/${id}`);
        setUser(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError("Error fetching user data");
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  function formatDate(dateString) {
    if (!dateString) return "";

    const date = new Date(dateString);
    const year = date.getFullYear();
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");

    return `${year}/${day}/${month}`;
  }

  return (
     
      <Grid container spacing={1} >
        <Grid item xs={5} >
          <img
            src={user.avatar} 
            alt="User Profile"
            height={200}
            width={200}
            style={{ borderRadius: 200, marginTop:"50px",marginLeft:5}}
          />
        </Grid>
        <Grid item xs={7}>
         
              <div className="mb-3" style={{ marginTop: 20 }}>
                <FaUser style={{ marginRight: 10 }} />{" "}
                <strong>Nom et Prénom</strong> {user.name}
              </div>
              <div className="mb-3" style={{ marginTop: 20 }}>
                <FaEnvelope style={{ marginRight: 10 }} />{" "}
                <strong>Email</strong> {user.email}
              </div>

              <div className="mb-3" style={{ marginTop: 20 }}>
                <FaHome style={{ marginRight: 10 }} /> <strong>Adresse</strong>{" "}
                {user.address}
              </div>

              <div className="mb-3" style={{ marginTop: 20 }}>
                <FaCalendar style={{ marginRight: 10 }} />{" "}
                <strong>Date de naissance</strong> {formatDate(user.birthday)}
              </div>

              <div className="mb-3" style={{ marginTop: 20 }}>
                <FaPhone style={{ marginRight: 10 }} />{" "}
                <strong>Téléphone</strong> {user.phone}
              </div>

              <div className="mb-3" style={{ marginTop: 20 }}>
                <FaGenderless style={{ marginRight: 10 }} />{" "}
                <strong>Genre</strong> {user.gender}
              </div>
              
              <div className="mb-3" style={{ marginTop: 20 }}>
                <FiUsers style={{ marginRight: 10 }} />{" "}
                <strong>Status Parrain</strong> {user.statusParrain? "Parrainé": "Non parrainé"}
              </div>
              <div className="mb-3" style={{ marginTop: 20 }}>
                <ImBlocked style={{ marginRight: 10 }} />{" "}
                <strong>Status blockage</strong> {user.blocked? "Bloqué": "Non bloqué"}
              </div>
              <div className="mb-3" style={{ marginTop: 20 }}>
               <div style={{ marginRight: 10, marginBottom:15 }} > <AiOutlineFileProtect style={{ marginRight: 10 }} />{" "}
                <strong>Justificatif :</strong> </div>
                <div>
                {user.justificatif?  <div   className="image-container"><img
          src={`${process.env.REACT_APP_URL_UPLOAD}/justificatifs/${user.justificatif}`}
          alt="BannerImg"
          className="hover-image"
          style={{ width:"150px", height:"100px"}}
        /></div> : "N'est pas disponible"}
                  </div>
              </div>
              
              <div className="mb-3" style={{ marginTop: 20 , display:"flex", justifyContent:"end" }}>
                <Button style={{ color: "black" }} onClick={handleClose}>Fermer</Button>
              </div>
           
        </Grid>
      </Grid>
  );
};

export default ViewUser;
