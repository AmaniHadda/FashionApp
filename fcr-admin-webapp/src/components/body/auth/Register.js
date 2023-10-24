
import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { FaRegAddressCard, FaBirthdayCake, FaInfoCircle } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Select from "react-select";
import countryList from "react-select-country-list";

import {
  isEmpty,
  isEmail,
  isLength,
  isMatch,
  regularExpression,
} from "../../utils/validation/Validation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classNames from "classnames";
const initialState = {
  name: "",
  email: "",
  address: "",
  birthday: "",
  phone: "",
  gender: "",
  password: "",
  cf_password: "",
  err: "",
  success: "",
};

function Register() {
  const [user, setUser] = useState(initialState);
  const [visible, setVisible] = useState(true);
  const [termsOpen, setTermsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [country, setCountry] = useState([]);
  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);
  const changeHandler = (e) => {
    setValue(e);
  };

  const handleClick = () => {
    setVisible(!visible);
  };
  const [gender, setGender] = useState(false);

  const { name, email, address, birthday, rememberMe, password, cf_password } =
    user;

  const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const PASSWORD = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  const NOM = /^[a-zA-Z]+$/;

  const handleChangeInput = (e) => {
    const { name, value, type, checked } = e.target;
    setUser({
      ...user,
      [name]: type === "checkbox" ? checked : value,
      err: "",
      success: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (isEmpty(name) || isEmpty(password))
      return toast("Merci de remplir tous les champs", {
        className: "toast-failed",
        bodyClassName: "toast-failed",
      });

    if (!isEmail(email))
      return toast("S'il vous plaît, mettez une adresse email valide", {
        className: "toast-failed",
        bodyClassName: "toast-failed",
      });

    if (isLength(password))
      return toast("Le Mot de passe doit contenir au moins 8 caractéres", {
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
      const res = await axios.post("/user/register", {
        name,
        email,
        address,
        birthday,
        phone,
        gender,
        password,
      });
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
      setUser({
        ...user,
        err: err.response.data.msg,
        success: "",
      });
    }
  };
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };
  const [phone, setPhone] = useState();
  return (
    <>
      <ToastContainer />
      <div className="login_page">
        <h2>S'inscrire</h2>

        <p style={{ color: "palevioletred" }}>
          Vous avez déjà un compte? <Link to="/">S'identifier</Link>
        </p>
        <div className="row">
          <p>Les champs suivis d'un * sont obligatoires</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="input-icon">
              <AiOutlineUser color="palevioletred" />

              <input
                type="text"
                placeholder="Nom et Prénom *"
                id="name"
                value={name}
                name="name"
                onChange={handleChangeInput}
              />
            </label>
          </div>
          <div>
            <label htmlFor="name" className="input-icon">
              <AiOutlineMail color="palevioletred" />

              <input
                type="text"
                placeholder="Adresse e-mail *"
                id="email"
                value={email}
                name="email"
                onChange={handleChangeInput}
              />
            </label>
          </div>
          <div>
            <label htmlFor="name" className="input-icon">
              <FaRegAddressCard color="palevioletred" />

              <input
                type="text"
                placeholder="Adresse *"
                id="address"
                value={address}
                name="address"
                onChange={handleChangeInput}
              />
            </label>
          </div>

          <div>
            <label htmlFor="name" className="input-icon">
              <FaBirthdayCake color="palevioletred" />

              <input
                style={{ color: "#808080" }}
                type="date"
                placeholder="Date de naissance *"
                id="birthday"
                value={birthday}
                name="birthday"
                onChange={handleChangeInput}
              />
            </label>
          </div>
          {/* <div>
            <Select options={options} value={value} onChange={changeHandler} />
          </div> */}
          <div>
            <PhoneInput
              className="phoneInput *"
              defaultCountry="TN"
              value={phone}
              name="phone"
              id="phone"
              onChange={(phone) => setPhone(phone)}
            />
          </div>
          <div>
            <label htmlFor="name" className="input-icon">
              <RiLockPasswordLine color="palevioletred" />

              <input
                type={passwordShown ? "text" : "password"}
                placeholder="Mot de passe * "
                id="password"
                handleClick={handleClick}
                name="password"
                value={password}
                onChange={handleChangeInput}
              />
              {
                <i
                  style={{
                    position: "absolute",
                    right: "35px",
                    fontSize: "25px",
                    top: "18px",
                    zIndex: 1,
                    color: "#808080",
                  }}
                  onClick={togglePasswordVisiblity}
                >
                  {passwordShown ? <RiEyeLine /> : <RiEyeOffLine />}
                </i>
              }
            </label>
          </div>
          <div>
            <label htmlFor="name" className="input-icon">
              <RiLockPasswordLine color="palevioletred" />

              <input
                type={passwordShown ? "text" : "password"}
                placeholder="Confirmer votre mot de passe *"
                id="cf_password"
                value={cf_password}
                name="cf_password"
                onChange={handleChangeInput}
                handleClick={handleClick}
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
          </div>

          <div className="container">
            <label htmlFor="gender"></label>
            <div
              className="checkbox-group"
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <input
                id="Homme"
                type="checkbox"
                name="gender"
                value="Homme"
                onChange={(e) => setGender(e.target.value)}
              />
              <label htmlFor="Homme">Homme</label>
              <input
                id="Femme"
                type="checkbox"
                name="gender"
                value="Femme"
                onChange={(e) => setGender(e.target.value)}
              />
              <label htmlFor="Femme">Femme</label>
            </div>
          </div>

          <div>
            <label htmlFor="rememberMe">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={rememberMe}
                onChange={handleChangeInput}
              />
            </label>{" "}
            J'ai lu et accepté les{" "}
            <Link to="#" onClick={() => setTermsOpen(true)}>
              Termes d'utilisations
            </Link>
          </div>
          <div
            className="terms-overlay"
            style={{ display: termsOpen ? "block" : "none" }}
          >
            <div className="terms-modal">
              <h2> Termes d'utilisations</h2>
              <p>Quelques termes et conditions ici...</p>

              <br />
              <button
                style={{ background: "palevioletred" }}
                onClick={() => setTermsOpen(false)}
              >
                Fermer
              </button>
            </div>
          </div>

          <div className="row">
            <button type="submit">S'inscrire</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;

