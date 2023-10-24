
import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./image.css"
import "react-toastify/dist/ReactToastify.css";
import { Box, Grid, LinearProgress, TextField } from "@mui/material";
import {
  FaCalendar,
  FaEnvelope,
  FaGenderless,
  FaHome,
  FaPhone,
  FaUser,
} from "react-icons/fa";
const calculateAge = (birthdate) => {
  const today = new Date();
  const birthDate = new Date(birthdate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};
const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const id = localStorage.getItem("id");
  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");

  const [address, setAddress] = useState(localStorage.getItem("address") || "");
  const [birthday, setBirthday] = useState(
    localStorage.getItem("birthday") || ""
  );
  const [phone, setPhone] = useState(localStorage.getItem("phone") || "");

  const [avatar, setAvatar] = useState(localStorage.getItem("avatar") || "");
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setAvatar(reader.result);
    };

    reader.onerror = (error) => {
      console.error("Error:", error);
    };
    setIsEditing(true)
  };
  const editProfile = async () => {
    setLoading(true)
   

    const response = await axios
      .put(" /user/update", {
        id: id,
        name: name,
        email: email,
        address: address,
        phone: phone,
        birthday: birthday,
        avatar: avatar,
      })

      .then(() => {
        setIsEditing(false);
        setLoading(false)
        localStorage.setItem("id", id);
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("address", address);
        localStorage.setItem("phone", phone);
        localStorage.setItem("birthday", birthday);
        localStorage.setItem("avatar", avatar);

        toast.success("Vous avez modifié vos informations avec succès");
      })
      .catch((err) => console.log(err.message));
  };
  const boxShadowStyle = {
    marginLeft: "10px",
    marginTop:"80px",
    width: "100%",
    height:"100%",
    paddingTop:"20px",
    paddinLeft:"20px",
    backgroundColor:"#f4e7f0",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px",
  };

  return (
    <div className="profile_page">
    <div className="col-left"></div>
    <div className="col-right">
    <h2>
     <strong>Profil Admin</strong>
    </h2> 
    <div style={boxShadowStyle}>
    {loading && (
 <Box sx={{ width: '100%', marginTop:-3}}>
 <LinearProgress color="secondary"  sx={{ height: 8}} />
</Box>
    )}
    <Grid container spacing={2} marginTop={3} marginLeft={3}>
      
          <Grid item xs={12} md={5}>
            <div style={{marginRight:"50px"}}>
            <img
              alt=""
              height={250}
              width={300}
              src={
                avatar || "https://bootdey.com/img/Content/avatar/avatar7.png"
              }
              data-original-title="Usuario"
            />

            <input
              type="file"
              className="form-control"
              onChange={handleAvatarChange}
              accept="image/*"
              id="file"
            />
             <label className="label" for="file">
              <i className="fa fa-upload" /> Choisir un fichier
            </label>
            </div>
            
            <ToastContainer />
          </Grid>
          <Grid item xs={12} md={7}>                      
              <table>
                <tbody>
                  <tr>
                    <td >
                      <strong style={{marginRight:"80px", display: "flex", alignItems: "center"}}>
                        <i
                          className="fas fa-user-circle"
                          style={{ marginRight: "10px", fontSize: "20px" }}
                        ></i>
                        <h4>Nom complet</h4>
                      </strong>
                    </td>
                    <td style={{marginLeft:"50px"}}>
                      {isEditing ? (                     
                        <TextField 
                        size="small"
                        id="outlined-basic" 
                        label="Nom" variant="outlined" value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth />

                      ) : !name ? (
                        <i className="fa fa-spinner" />
                      ) : (
                        <p style={{ fontSize: 18 }}>{name}</p>
                      )}
                    </td>
                  </tr>
                  <br />
                  <tr>
                    <td>
                      <strong style={{marginRight:"80px", display: "flex", alignItems: "center"}}>
                        <span className="glyphicon glyphicon-envelope text-primary"></span>
                        <i
                          className="fas fa-at"
                          style={{ marginRight: "7px", fontSize: "20px" }}
                        ></i>
                        <h4> Adresse Email</h4>
                      </strong>
                    </td>
                    <td className="text-primary">
                      {isEditing ? (
                        <TextField 
                        disabled
                        size="small"
                        id="outlined-basic" 
                        label="Email" variant="outlined" 
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                       
                      ) : !email ? (
                        <i className="fa fa-spinner" />
                      ) : (
                        <p style={{ fontSize: 18 }}>{email}</p>
                      )}
                    </td>
                  </tr>
                  <br />
                  <tr>
                    <td>
                      <strong style={{marginRight:"80px", display: "flex", alignItems: "center"}}>
                        <i
                          class="fas fa-phone"
                          style={{ marginRight: "8px", fontSize: "20px" }}
                        ></i>{" "}
                        <h4> Téléphone</h4>
                      </strong>
                    </td>
                    <td className="text-primary">
                      {isEditing ? (
                        <TextField 
                        size="small"
                        id="outlined-basic" 
                        label="Téléphone" variant="outlined" 
                        fullWidth
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)} />                       
                      ) : !phone ? (
                        <i className="fa fa-spinner" />
                      ) : (
                        <p style={{ fontSize: 18 }}>{phone}</p>
                      )}
                    </td>
                  </tr>
                  <br />

                  <tr>
                    <td>
                      <strong style={{marginRight:"80px", display: "flex", alignItems: "center"}}>
                        <i
                          class="fas fa-map-marker-alt"
                          style={{ marginRight: "20px", fontSize: "20px" }}
                        ></i>
                        <h4>Adresse</h4>
                      </strong>
                    </td>
                    <td className="text-primary">
                      {isEditing ? (
                         <TextField 
                         size="small"
                         id="outlined-basic" 
                         label="Adresse" variant="outlined" 
                         fullWidth
                         value={address}
                          onChange={(e) => setAddress(e.target.value)}/>  
                        
                      ) : !address ? (
                        <i className="fa fa-spinner" />
                      ) : (
                        <p style={{ fontSize: 18 }}>{address}</p>
                      )}
                    </td>
                  </tr>
                  <br />

                  <tr>
                    <td>
                      <strong style={{marginRight:"80px", display: "flex", alignItems: "center"}}>
                        <i
                          class="fas fa-birthday-cake"
                          style={{ marginRight: "9px", fontSize: "20px" }}
                        ></i>{" "}
                        <h4>Âge</h4>
                      </strong>
                    </td>
                    <td >
                      {isEditing ? (
                        <TextField 
                        size="small"
                        id="outlined-basic" 
                        label="Âge" 
                        variant="outlined" 
                        fullWidth
                        type="date"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}/>                         
                      ) : !birthday ? (
                        <i className="fa fa-spinner" />
                      ) : (
                        <p style={{ fontSize: 18 }}>
                          {calculateAge(birthday)} ans
                        </p>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>
                      <br />
                      {isEditing ? (
                        <button
                          style={{
                            border: "none",
                            width: "100%",
                            height: 50,
                            backgroundColor: "#d499ac",
                            color:"white",
                          }}
                          className="red_button shop_now_button"
                          onClick={editProfile}
                        >
                          <i className="fa fa-check" /> Enregistrer les
                          modifications
                        </button>
                      ) : (
                        <button
                          style={{
                            border: "none",
                            width: "100%",
                            height: 50,
                            backgroundColor: "#d499ac",
                            color:"white",
                            marginTop:"10px", marginLeft:"100px"
                          }}
                          onClick={handleEditClick}
                        >
                          <i className="fa fa-edit" /> Modifier
                        </button>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
          
          </Grid>

    </Grid>
   
   
    </div>
    </div></div>
  );
};

export default UserProfile;

