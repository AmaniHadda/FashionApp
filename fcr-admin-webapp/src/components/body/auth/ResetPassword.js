
import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AiOutlineUnlock } from "react-icons/ai";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import {
  isLength,
  isMatch,
  regularExpression,
} from "../../utils/validation/Validation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  password: "",
  cf_password: "",
  err: "",
  success: "",
};
function ResetPassword() {
  const [data, setData] = useState(initialState);
  const { token } = useParams();
  const [visible, setVisible] = useState(false);

  const { password, cf_password } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const handleClick = () => {
    setVisible(!visible);
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
      <div className="fg_pass">
        <h2>Réinitialisez votre mot de passe</h2>

        <div className="row">
          <label htmlFor="password" className="input-icon">
            <AiOutlineUnlock color="palevioletred" />
            <input
              placeholder=" Nouveau Mot de passe"
              type={passwordShown ? "text" : "password"}
              name="password"
              id="password"
              value={password}
              handleClick={handleClick}
              onChange={handleChangeInput}
              required
            />
            {
              <i
                style={{
                  position: "absolute",
                  right: "35px",
                  top: "18px",
                  fontSize: "25px",
                  zIndex: 1,
                  color: "#808080",
                }}
                onClick={togglePasswordVisiblity}
              >
                {passwordShown ? <RiEyeLine /> : <RiEyeOffLine />}
              </i>
            }
          </label>
          <label htmlFor="password" className="input-icon">
            <AiOutlineUnlock color="palevioletred" />
            <input
              placeholder="Confirmer votre nouveau mot de passe"
              type={passwordShown ? "text" : "password"}
              name="cf_password"
              id="cf_password"
              value={cf_password}
              handleClick={handleClick}
              onChange={handleChangeInput}
              required
            />
            {
              <i
                style={{
                  position: "absolute",
                  right: "35px",
                  top: "18px",
                  fontSize: "25px",
                  zIndex: 1,
                  color: "#808080",
                }}
                onClick={togglePasswordVisiblity}
              >
                {passwordShown ? <RiEyeLine /> : <RiEyeOffLine />}
              </i>
            }
          </label>
          <button onClick={handleResetPass}>
            réinitialiser le mot de passe
          </button>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;

