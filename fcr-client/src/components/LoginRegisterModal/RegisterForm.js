
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import axios from "axios";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { FaInfoCircle } from "react-icons/fa";
import "./style.css";
import {
  isEmpty,
  isEmail,
  isLength,
  isMatch,
  regularExpression,
} from "../utils/Validation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Terms from "./Terms/Terms";
import classNames from "classnames";
import { Modal } from "react-bootstrap";
const initialState = {
  name: "",
  email: "",
  address: "",
  birthday: "",
  phone: "",
  gender: "",
  password: "",
  cf_password: "",
  terms: false,
  err: "",
  success: "",
  termsAccepted: false,
};

function RegistrationForm(props) {
  const [user, setUser] = useState(initialState);
  const [visible, setVisible] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const handleClick = () => {
    setVisible(!visible);
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/subscribe/addSubscriber", { email: email });
      toast.success("Vous êtes inscrit à la newsletter!");
    } catch (error) {
      console.error(error);
      toast.error("Vous êtes déjà inscrit ! ");
    }
  };
  const [gender, setGender] = useState(false);

  const {
    name,
    email,
    address,
    birthday,

    password,

    cf_password,
  } = user;

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
    if (!termsAccepted)
      return toast("Veuillez accepter les conditions d'utilisation", {
        className: "toast-failed",
        bodyClassName: "toast-failed",
      });

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
      console.log(res);
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
  const [termsAccepted, setTermsAccepted] = useState(true);

  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordShown1, setPasswordShown1] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };
  const togglePasswordVisiblity1 = () => {
    setPasswordShown1(!passwordShown1);
  };

  const [phone, setPhone] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const handleTermsClick = () => {
    setShowPopup(true);
  };

  const handleCheckboxChange = (e) => {
    setTermsAccepted(e.target.checked);
  };

  return (
    <div>
      <ToastContainer />

      <h1>S'inscrire</h1>
      <div className="registration-form-container">
        <form className="form-container" onSubmit={handleSubmit}>
          <label htmlFor="name">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Nom & prénom"
              value={name}
              onChange={handleChangeInput}
              className={classNames({
                "p-invalid border-danger": submitted && !name,
              })}
            />

            {submitted && !name && (
              <small className="p-invalid text-danger">
                <FaInfoCircle color="red" /> Champs requis
              </small>
            )}
            <br />
            
          </label>
          <div>
            <label htmlFor="email" className="input-icon">
              {" "}
            </label>
            <input
              type="text"
              placeholder="Adresse e-mail "
              id="email"
              value={email}
              name="email"
              onChange={handleChangeInput}
              pattern={isEmail}
              className={classNames({
                "p-invalid border-danger": submitted && !email,
              })}
            />

            {submitted && !email && (
              <small className="p-invalid text-danger">
                <FaInfoCircle color="red" /> Champs requis
              </small>
            )}
            <br />
            {submitted && !isEmail(email) && (
              <small className="p-invalid text-danger">
                <FaInfoCircle color="red" /> Merci de respecter le format
                d'email approprié
              </small>
            )}
          </div>

          <label htmlFor="password"></label>
          <div className="password-input-flex">
          <input
            type={passwordShown ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Mot de passe (!@#$%^&*)"
            value={password}
            pattern={regularExpression}
            onClick={handleClick}
            onChange={handleChangeInput}
            className={classNames({
              "p-invalid border-danger": submitted && !password,
            })}
          />
          <span
            onClick={togglePasswordVisiblity}
            className="input-group-text"
            style={{paddingTop:"10px",paddingBottom:"10px",marginLeft:"-40px"}}
          >
            {passwordShown ? <RiEyeLine /> : <RiEyeOffLine />}
          </span>
          </div>
          {submitted && !password && (
            <small className="p-invalid text-danger">
              <FaInfoCircle color="red" /> Champs requis
            </small>
          )}
          <br />

          {submitted && !regularExpression(password) && (
            <div className="mb-3">
            <small className="p-invalid text-danger">
              <FaInfoCircle color="red" /> Le mot de passe doit contenir des
              lettres en majuscules, minuscules, des caractéres speciaux et des
              chiffres
            </small>
            </div>
          )}

          <div className="password-input-flex">
            <label htmlFor="password"></label>
          <input
            type={passwordShown1 ? "text" : "password"}
            id="cf_password"
            name="cf_password"
            placeholder="Confirmer mot de passe"
            pattern={regularExpression}
            onClick={handleClick}
            value={cf_password}
            onChange={handleChangeInput}
            className={classNames({
              "p-invalid border-danger": submitted && !password,
            })}
          />
          <span
            className="input-group-text"
            style={{paddingTop:"10px",paddingBottom:"10px",marginLeft:"-40px"}}
            onClick={togglePasswordVisiblity1}
          >
            {passwordShown1 ? <RiEyeLine /> : <RiEyeOffLine />}
          </span>
          </div>
          
          {submitted && !password && (
            <div className="mb-1">
            <small className="p-invalid text-danger">
              <FaInfoCircle color="red" /> Champs requis
            </small>
          </div>
          )}
          {submitted && password !== cf_password && (
            <div className="mb-1">

            <small className="p-invalid text-danger">
              <FaInfoCircle color="red" /> Les deux mots de passes ne sont pas
              identiques
            </small>
            </div>
          )}
          <br/>
          <div className="mb-3" style={{marginTop:"-20px"}}>
          <label htmlFor="address"></label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Adresse"
            value={address}
            onChange={handleChangeInput}
            className={classNames({
              "p-invalid border-danger": submitted && !address,
            })}
            />
          {submitted && !address && (
            <small className="p-invalid text-danger">
              <FaInfoCircle color="red" /> Champs requis
            </small>
          )}
            </div>

          <div className="mt-2">
            <PhoneInput
              defaultCountry="TN"
              value={phone}
              name="phone"
              id="phone"
              placeholder="Numéro de téléphone"
              onChange={(phone) => setPhone(phone)}
              className={classNames({
                "p-invalid border-danger": submitted && !phone,
              })}
            />

            {submitted && !phone && (
              <small className="p-invalid text-danger">
                <FaInfoCircle color="red" /> Champs requis
              </small>
            )}
          </div>

          <label htmlFor="birthday" style={{marginBottom:"10px", marginTop:"20px"}}>  
          Date de naissance :
          </label>        
          <input
            type="date"
            id="birthday"
            name="birthday"
            placeholder="Date de naissance"
            value={birthday}
            onChange={handleChangeInput}
            className={classNames({
              "p-invalid border-danger": submitted && !birthday,
            })}
          />
          {submitted && !birthday && (
            <small className="p-invalid text-danger">
              <FaInfoCircle color="red" /> Champs requis
            </small>
          )}


          <div className="gender-radio-buttons mt-4">
            <label htmlFor="male">
              <input
              
                type="radio"
                id="male"
                name="gender"
                value="male"
                placeholder="Homme"
                onChange={(e) => setGender(e.target.value)}
                className={classNames({
                  "p-invalid border-danger": submitted && !gender,
                })}
              />
              Homme
            </label>
            <label htmlFor="female">
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                placeholder="Femme"
                onChange={(e) => setGender(e.target.value)}
              />
              Femme
            </label>
          </div>
          <div style={{marginTop:"-30px",marginBottom:"20px"}}>
            {submitted && !gender && (
              <small className="p-invalid text-danger">
                <FaInfoCircle color="red" /> Champs requis
              </small>
            )}
            </div>

          <label htmlFor="newsletter" id="news">
            <input
              type="checkbox"
              id="newsletter"
              name="newsletter"
              onChange={handleNewsletterSubmit}
            />
            S'inscrire à la newsletter
          </label>

          <div className="m-6 pt-2">
            <label htmlFor="termsCheckbox" id="termsLabel">
              <input
                type="checkbox"
                id="termsCheckbox"
                name="termsCheckbox"
                className="mr-2"
                onChange={handleCheckboxChange}
                checked={termsAccepted}
              />
              J'accepte les Conditions d'utilisation
            </label>

            <span
              className="terms-link"
              style={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={handleTermsClick}
            >
              Voir les Conditions d'utilisation
            </span>
            <Modal show={showPopup} onHide={() => setShowPopup(false)} closeButton>
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Les conditions d'utilisations
                </Modal.Title>
              </Modal.Header>
              <div className="container">
                <div className="text-justify">
                  <p>
                    <Terms />
                  </p>
                </div>
              </div>
              <div className="mb-4"></div>
            </Modal>
          </div>
          <button  style={{ border: "none", marginTop: -10 }}
          className="red_button w-100 mt-4" type="submit" disabled={!termsAccepted}>
            S'inscrire
          </button>
          <div
            // onClick={registerClicked}
            onClick={props.loginClicked}
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "#000",
              cursor: "pointer",
            }}
          >
            Déja inscrit ? {" "}
            <span style={{ color: "#ba158e" }}>Connecter</span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
