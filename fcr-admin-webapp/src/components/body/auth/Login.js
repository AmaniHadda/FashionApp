
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { isEmail } from "../../utils/validation/Validation";
import { HiOutlineMailOpen } from "react-icons/hi";
import { AiOutlineUnlock } from "react-icons/ai";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { FaFacebook, FaInfoCircle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notifications/Notification";
import { dispatchLogin } from "../../../redux/actions/authAction";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import classNames from "classnames";
import {CardActions,Card, CardContent, Box, Paper} from "@mui/material"
const initialState = {
  email: "",
  password: "",
  err: "",
  success: "",
};

function Login() {
  const [user, setUser] = useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { email, password, rememberMe, err, success } = user;
  const [logo, setLogo] = useState("")
  const getLogo = async () => {
    try {
      const response = await axios.get(" /logo");
      const logo = response.data[0]
      console.log(response.data[0])
      setLogo(logo);
      console.log(logo)
    } catch (error) {
      console.error("Error retrieving logo:", error);
    }
  };
  useEffect(() => {
    getLogo()
  }, [])
  const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const PASSWORD = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  const handleClick = () => {
    setVisible(!visible);
  };

  const handleChangeInput = (e) => {
    const { name, value, type, checked } = e.target;
    setUser({
      ...user,
      [name]: type === "checkbox" ? checked : value,
      err: "",
      success: "",
    });
  };

// ...

// ...

const handleSubmit = async (e) => {
  e.preventDefault();
  setSubmitted(true);

  if (!email || EMAIL_REGEX.test(!email))
    return toast("S'il vous plaît, mettez une adresse email valide", {
      className: "toast-failed",
      bodyClassName: "toast-failed",
    });
  try {
    const res = await axios.post("/user/login", { email, password });
    localStorage.setItem("firstLogin", true);
    localStorage.setItem("refresh_token", res && res?.data?.refresh_token);
    localStorage.setItem("id", res && res?.data?.id);
    localStorage.setItem("name", res?.data?.name);

    localStorage.setItem("email", res && res?.data?.email);
    localStorage.setItem("role", res && res?.data?.role);

    localStorage.setItem("address", res?.data?.address);
    localStorage.setItem("birthday", res?.data?.birthday);
    localStorage.setItem("phone", res?.data?.phone);
    localStorage.setItem("avatar", res?.data?.avatar);
    localStorage.setItem("gender", res?.data?.gender);
    localStorage.setItem("verified", res?.data?.verified);
    localStorage.setItem("statusParrain", res?.data?.statusParrain);
    console.log(res?.data);
    toast(res.data.msg, {
      className: "toast-success",
      bodyClassName: "toast-success",
    });

    localStorage.setItem("firstLogin", true);
    dispatch(dispatchLogin());
  } catch (err) {
    err.response.data.msg &&
      toast(err.response.data.msg, {
        className: "toast-failed",
        bodyClassName: "toast-failed",
      });
  }
};

  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };
  const responseGoogle = async (response) => {
    try {
      const res = await axios.post("/user/google_login", {
        tokenId: response.tokenId,
      });
      toast(res.data.msg, {
        className: "toast-success",
        bodyClassName: "toast-success",
      });
      localStorage.setItem("firstLogin", true);
      dispatch(dispatchLogin());
      history.push("/");
    } catch (err) {
      err.response.data.msg &&
        toast(err.response.data.msg, {
          className: "toast-failed",
          bodyClassName: "toast-failed",
        });
    }
  };
  const responseFacebook = async (response) => {
    try {
      const { accessToken, userID } = response;
      const res = await axios.post("/user/facebook_login", {
        accessToken,
        userID,
      });

      toast(res.data.msg, {
        className: "toast-success",
        bodyClassName: "toast-success",
      });
      localStorage.setItem("firstLogin", true);
      dispatch(dispatchLogin());
      history.push("/home");
    } catch (err) {
      err.response.data.msg &&
        toast(err.response.data.msg, {
          className: "toast-failed",
          bodyClassName: "toast-failed",
        });
    }
  };

  return (
   <div >
     <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <ToastContainer />
      <Paper sx={{ minWidth: 400, width: 700, height:500}} elevation={4}>
      <div className="login_page">
      
        <div style={{ display: 'flex', justifyContent: 'center'}}>
        {logo ? (
          <img height={70} width={150} src={` ${process.env.REACT_APP_URL_UPLOAD}/logo/${logo.logo}`} alt="Logo" />
        ) : (
          <span>Loading logo...</span>
        )}
      </div>
        <h1 style={{display:"flex", justifyContent:"center"}}>Bienvenue à Tavyissa</h1>
        <p>Les champs suivis d'un * sont obligatoires</p>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        <div>
          <label htmlFor="email" className="input-icon">
            <HiOutlineMailOpen color="palevioletred" />
            <input
              type="text"
              placeholder="Adresse e-mail *"
              id="email"
              value={email}
              name="email"
              onChange={handleChangeInput}
              pattern={EMAIL_REGEX}
              className={classNames({
                "p-invalid border-danger": submitted && !email,
              })}
              required
            />
          </label>
          {submitted && !email && (
            <small className="p-invalid text-danger">
              <FaInfoCircle color="red" /> Champs requis
            </small>
          )}
          <br />
          {submitted && !EMAIL_REGEX.test(email) && (
            <small className="p-invalid text-danger">
              <FaInfoCircle color="red" /> Merci de respecter le format d'email
              approprié
            </small>
          )}
        </div>

        <div>
          <label htmlFor="password" className="input-icon">
            <AiOutlineUnlock color="palevioletred" />

            <input
              type={passwordShown ? "text" : "password"}
              placeholder="Mot de passe *"
              id="password"
              handleClick={handleClick}
              name="password"
              value={password}
              pattern={PASSWORD}
              onChange={handleChangeInput}
              className={classNames({
                "p-invalid border-danger": submitted && !password,
              })}
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
          {submitted && !password && (
            <small className="p-invalid text-danger">
              <FaInfoCircle color="red" /> Champs requis
            </small>
          )}
          <br />
          {submitted && !PASSWORD.test(password) && (
            <small className="p-invalid text-danger">
              <FaInfoCircle color="red" /> le mot de passe est incorrect.
              Essayez à nouveau.
            </small>
          )}
        </div>
          {/* <Link to="/forgot_password">Mot de passe oublié?</Link> */}
        <div className="row">
          <button onClick={handleSubmit} type="button">
            Se Connecter
          </button>
        </div>
      </div>
       

      </Paper>
    </Box>
   </div>
  );
}

export default Login;
