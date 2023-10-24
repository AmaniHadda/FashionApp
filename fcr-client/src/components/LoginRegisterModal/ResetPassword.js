
import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AiOutlineUnlock } from "react-icons/ai";
import { isLength, isMatch, regularExpression } from "../utils/Validation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { NavLink } from 'react-router-dom';


// import "../style.css";
const initialState = {
  password: "",
  cf_password: "",
  err: "",
  success: "",
};
function ResetPassword() {
  const [data, setData] = useState(initialState);
  const { token } = useParams();
  const history = useHistory();
  const { password, cf_password } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };
  const handleResetPass = async () => {
    if (isLength(password))
      return toast("Mot de passe doit être d'au moins 8 caractères", {
        className: "toast-failed",
        bodyClassName: "toast-failed",
      });
    if (!isMatch(password, cf_password))
      return toast("Le mot de passe ne correspond pas", {
        className: "toast-failed",
        bodyClassName: "toast-failed",
      });
    if (!regularExpression(password))
      return toast(
        "Le mot de passe doit avoir une longeur superieur ou egal a 8 avec majuscules, miniscules, Caracteres speciaux et chiffres",
        {
          className: "toast-failed",
          bodyClassName: "toast-failed",
        }
      );
    try {
      const res = await axios.post(
        "/user/reset",
        { password },
        {
          headers: { Authorization: token },
        }
      );
      toast(res.data.msg, {
        className: "toast-success",
        bodyClassName: "toast-success",
      });
      history.push("/login");

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
      <div className="d-flex justify-content-center " style={{marginTop:"200px"}}>
      <div
        className="card text-center"
        style={{ width: "600px", float: "none" }}
      >
        <div
          className="card-header h5 text-white"
          style={{ backgroundColor: "#FEADDB" }}
        >
          Réinitialisez votre mot de passe
        </div>
        <label className="form-label h6 mt-3" htmlFor="email">
          Saisir votre mot de passe
        </label>
        <div style={{ position: "relative" }}>
          <input
            className="form-control my-3 p-4"
            placeholder="Nouveau mot de passe"
            name="password"
            type={passwordShown ? "text" : "password"}
            id="password"
            value={password}
            onChange={handleChangeInput}
            style={{ paddingLeft: "30px" }}
            required
          />
          <AiOutlineUnlock
            color="#f1bce3"
            style={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              left: "8px",
            }}
          />
          <span
            style={{
              position: "absolute",
              top: "40px",
              right: "10px",
              transform: "translateY(-50%)",
            }}
            onClick={togglePasswordVisiblity}
          >
            {passwordShown ? <RiEyeLine /> : <RiEyeOffLine />}
          </span>
        </div>
        
        <div style={{ position: "relative" }}>
          <input
            className="form-control my-3 p-4"
            type={passwordShown ? "text" : "password"}
            placeholder="Confirmer mot de passe"
            name="cf_password"
            id="cf_password"
            value={cf_password}
            onChange={handleChangeInput}
            style={{ paddingLeft: "30px" }}
            required
          />
          <AiOutlineUnlock
            color="#f1bce3"
            style={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              left: "8px",
            }}
          />
          <span
            style={{
              position: "absolute",
              top: "40px",
              right: "10px",
              transform: "translateY(-50%)",
            }}
            onClick={togglePasswordVisiblity}
          >
            {passwordShown ? <RiEyeLine /> : <RiEyeOffLine />}
          </span>
        </div>
        <button
        className="red_button shop_now_button mt-4"
          style={{
            border: "none", color: "white",textTransform: "none",
            width:"100%"
          }}
          onClick={handleResetPass}
        >
          Changer votre mot de passe
        </button>
      </div>
      </div>
      <div className="forgot d-flex justify-content-around">
        <NavLink style={{color:"#000"}} to="/login"> <i className="fas fa-angle-left mx-2"></i> Retour vers la page d'accueil</NavLink>
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

export default ResetPassword;
