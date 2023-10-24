/*
 ** Author: Santosh Kumar Dash
 ** Author URL: http://santoshdash.epizy.com/
 ** Github URL: https://github.com/quintuslabs/fashion-cube
 */

import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import { userLogin } from "../../redux/actions/LoginAction";
import PropTypes from "prop-types";
import { useState } from "react";
import { LoginService } from "../../services/LoginService";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { dispatchLogin } from "../../redux/actions/authAction";
import { useDispatch } from "react-redux";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";

import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import ReCAPTCHA from "react-google-recaptcha";

function LoginForm(props) {
  const ls = new LoginService();
  const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i;

  const [isVerified, setIsVerified] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();


  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };


  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };
  const handleSubmit = async () => {
    if (!isVerified ){
      return toast("Veuillez cocher la case je ne suis pas un robot", {
        className: "toast-failed",
        bodyClassName: "toast-failed",
      });
    }

    setSubmitted(true);

    if (!email || !EMAIL_REGEX.test(email) || !password) {
      console.log("verify your fields");
      return toast("S'il vous plaît, mettez une adresse email valide", {
        className: "toast-failed",
        bodyClassName: "toast-failed",
      });

    } else {
      setLoading(true);
      try {
        const res = await ls.login({ email: email, password: password });
        setLoading(false);
        sessionStorage.setItem("firstLogin", true);
        sessionStorage.setItem("refresh_token", res?.refresh_token);
        sessionStorage.setItem("id", res?.id);
        sessionStorage.setItem("name", res?.name);
        sessionStorage.setItem("email", res?.email);
        sessionStorage.setItem("role", res?.role);
        sessionStorage.setItem("address", res?.address);
        sessionStorage.setItem("birthday", res?.birthday);
        sessionStorage.setItem("phone", res?.phone);
        sessionStorage.setItem("avatar", res?.avatar);
        sessionStorage.setItem("gender", res?.gender);
        sessionStorage.setItem("justificatif", res?.justificatif);
        sessionStorage.setItem("isJustified", res?.isJustified);

        sessionStorage.setItem("verified", res?.verified);
        sessionStorage.setItem("statusParrain", res?.statusParrain);
        window.location.href='/tavyissa';
        toast("Bienvenue à tavyissa ", {
          className: "toast-success",
          bodyClassName: "toast-success",
        })
      } catch (error) {
        toast(error.response.data.msg, {
          className: "toast-failed",
          bodyClassName: "toast-failed",
        });
        console.log(error.response);
        setLoading(true);

      }
    }
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
      console.log(res?.data);
      sessionStorage.setItem("refresh_token", res?.data?.refresh_token);
      sessionStorage.setItem("name", res?.data?.name);
      sessionStorage.setItem("email", res?.data?.email);
      sessionStorage.setItem("picture", res?.data?.avatar);
      sessionStorage.setItem("firstLogin", true);
      sessionStorage.setItem("id", res?.data?.id);
      sessionStorage.setItem("statusParrain", res?.data?.statusParrain);
      dispatch(dispatchLogin());
      window.location.reload();
    } catch (err) {
      err.response.data.msg &&
        toast(err.response.data.msg, {
          className: "toast-failed",
          bodyClassName: "toast-failed",
        });
    }
  };
  const handleVerification = () => {
    setIsVerified(true);
  }

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
      console.log(res?.data);
      sessionStorage.setItem("refresh_token", res?.data?.refresh_token);
      sessionStorage.setItem("name", res?.data?.name);
      sessionStorage.setItem("email", res?.data?.email);
      sessionStorage.setItem("avatar", res?.data?.avatar);
      sessionStorage.setItem("firstLogin", true);
      sessionStorage.setItem("id", res?.data?.id);
      sessionStorage.setItem("statusParrain", res?.data?.statusParrain);
      dispatch(dispatchLogin());
      window.location.reload();
    } catch (err) {
      err.response.data.msg &&
        toast(err.response.data.msg, {
          className: "toast-failed",
          bodyClassName: "toast-failed",
        });
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="login-form">
        <h2 className="mb-4">Connexion</h2>
        <div className="form-group ">
          <input
            type="text"
            placeholder="Email "
            id="UserName"
            name="email"
            value={email}

            style={{ border: "1px solid pink",  fontSize: "13px",height:"50px" }}
            onChange={handleEmail}
            autoComplete="true"
            pattern={EMAIL_REGEX}
            className={
              "form-control-lg w-100" +
              classNames({
                " p-invalid  border-danger": submitted && !email,
              })
            }
          />
          <i className="fa fa-user mt-1"></i>
        </div>
        {submitted && !email && (
          <small className="p-invalid text-danger">
            {" "}
            <i className="fa fa-info" /> Champ obligatoire.
          </small>
        )}
        <br />
        {submitted && !EMAIL_REGEX.test(email) && (
          <small className="p-invalid text-danger">
            <i className="fa fa-info" /> Vous devez respecter le format requis.
          </small>
        )}
        <div className="form-group log-status">

          <i className="fa fa-lock mt-1"></i>
          <input
            type={passwordShown ? "text" : "password"}
            style={{ border: "1px solid pink", fontSize: "13px",height:"50px" }}
            placeholder="Mot de passe"
            id="Passwod"
            name="password"
            value={password}
            onChange={handlePassword}
            autoComplete="false"
            className={
              "form-control-lg w-100" +
              classNames({
                " p-invalid  border-danger": submitted && !password,
              })
            }
          />

          <span
            style={{
              position: "absolute",
              top: "23px",
              right: "30px",
              transform: "translateY(-50%)",
            }}
            onClick={togglePasswordVisiblity}
          >
            {passwordShown ? <RiEyeLine /> : <RiEyeOffLine />}
          </span>
        </div>
        {submitted && !password && (
          <small className="p-invalid text-danger">
            {" "}
            <i className="fa fa-info" /> Mot de passe erroné.
          </small>
        )}
        <span className="alert">Coordonnées invalides</span>
        <a
          className="link text-dark"

          href="/forgot_password"
        //    onClick={forgotPasswordClicked}
        >
          Mot de passe oublié?
        </a>
        
        <button
          type="button"
          style={{ border: "none", marginTop: -10 }}
          className="red_button shop_now_button w-100"
          loading={loading}
          onClick={() => handleSubmit()}
        >

          Se connecter
        </button>
        <br /> <br />
        <div className="amani">
          <ReCAPTCHA
            sitekey="6LcjfMsnAAAAAEB9nW40xkVm2r5oFLTKHPV4yiAe"
            onChange={handleVerification}
            className="g-recaptcha "
          />
        </div>
        <GoogleLogin
          clientId="445662560917-fd8tln17tv60hthoksql81lj112c963u.apps.googleusercontent.com"
          buttonText="Se connecter avec Google"
          onSuccess={responseGoogle}
          cookiePolicy={"single_host_origin"}
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              style={{
                marginBottom: "10px",
                color: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start", // Align icon and text to the left
                width: "100%",
                height: "48px",
                padding: "10px",
                fontSize: "16px",
                fontWeight: "bold",
                background: "#fff",
                border: "1px solid #f1bce3",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              <FcGoogle
                style={{
                  marginRight: "10px",
                  width: "20px",
                  height: "20px",
                }}
              />
              <span style={{ whiteSpace: "nowrap" }}>
                Se connecter avec Google
              </span>
            </button>
          )}
        />
        <FacebookLogin
          appId="1206868563051705"
          autoLoad={false}
          fields="name,email,picture"
          callback={responseFacebook}
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              className="btn-facebook"
              style={{
                marginBottom: "10px",
                color: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                width: "100%",
                height: "48px",
                padding: "10px",
                fontSize: "16px",
                fontWeight: "bold",
                background: "#fff",
                border: "1px solid #f1bce3",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <FaFacebook
                  style={{
                    marginRight: "10px",
                    color: "#5182e4",
                    fontSize: "20px",
                  }}
                />
                <span style={{ whiteSpace: "nowrap" }}>
                  Se connecter avec Facebook
                </span>
              </div>
            </button>
          )}
        />
        
        <div
          // onClick={registerClicked}
          onClick={props.registerClicked}
          style={{
            textAlign: "center",
            fontSize: 12,
            color: "#000",
            cursor: "pointer",
          }}
        >

          Nouveau membre ? {" "}
          <span style={{ color: "#ba158e" }}>inscrivez-vous</span>
        </div>
      </div>
    </div>
  );
}

LoginForm.propTypes = {
  forgotPasswordClicked: PropTypes.func,
  registerClicked: PropTypes.func,
};

const mapDispatchToProps = {
  userLogin,
};
const mapStoreToProps = (state) => ({
  login_loading: state.login.login_loading,
  login_error: state.login.error,
});

export default connect(mapStoreToProps, mapDispatchToProps)(LoginForm);
