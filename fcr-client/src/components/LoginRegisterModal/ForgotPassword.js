
import React, { useState } from "react";
import axios from "axios";
import { isEmail } from "../utils/Validation";
import { AiOutlineMail } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from 'react-router-dom';

const initialState = {
  email: "",
  err: "",
  success: "",
};

function ForgotPassword() {
  const [data, setData] = useState(initialState);
  const [show, setShow] = useState(true);

  const { email } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const forgotPassword = async () => {
    if (!isEmail(email))
      return toast("Please enter a valid email address", {
        className: "toast-failed",
        bodyClassName: "toast-failed",
      });
      setShow(false)
    try {
      const res = await axios.post("/user/forgot", { email });
      toast("Le mot de passe a été envoyé avec succés, vérifiez votre mail s'il vous plait .", {
        className: "toast-success",
        bodyClassName: "toast-success",
      });
    } catch (err) {
      err.response.data.msg &&
        toast(err.response.data.msg, {
          className: "toast-failed",
          bodyClassName: "toast-failed",
        });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="d-flex justify-content-center" style={{marginTop:"200px"}} >

      <div
        className="card text-center "
        style={{ width: "600px", float: "none" }}
      >
        <div
          className="card-header h5 text-white"
          style={{ backgroundColor: "#FEADDB" }}
        >
          Mot de passe oublié
        </div>
        <div className="card-body px-5">
          <p className="card-text py-2">
            Entrez votre adresse e-mail et nous vous enverrons un e-mail avec
            des instructions pour réinitialiser votre mot de passe.
          </p>
          <label className="form-label h6" htmlFor="email">
            Entrez votre Email :
          </label>
          <div style={{ position: "relative" }}>
            <input
              className="form-control my-3 p-4"
              placeholder="Adresse e-mail"
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={handleChangeInput}
              style={{ paddingLeft: "30px" }}
              required
            />
            <AiOutlineMail
              color="#f1bce3"
              style={{
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                left: "8px",
              }}
            />
          </div>
          <div className="d-flex flex-column flex-sm-row justify-content-sm-between">
            <button
            disabled={!show}
              style={{ border: "none", color: "white",textTransform: "none" }}
              className="red_button shop_now_button"
              
              onClick={forgotPassword}
            >
              Envoyer   
            </button>
            <button
              disabled={show}
              style={{ border: "none", color: "white",textTransform: "none" }}
              className="red_button shop_now_button"
              onClick={forgotPassword}
            >
              Renvoyer
            </button>
          </div>
        </div>
      </div>
      </div>
      <div className="forgot d-flex justify-content-around">
        <NavLink style={{color:"#000"}} to="/login"> <i className="fas fa-angle-left mx-2"></i> Retour À La Connexion</NavLink>
      </div>
      <hr
          style={{
            border: "1px solid #f1bce3",
            width: "80%",
            marginRight: "10%",
            marginLeft: "10%",
            marginTop: 80,
          }}
          className="d-flex justify-centent-center align-items-center text-center"
        />
    </>
  );
}

export default ForgotPassword;
