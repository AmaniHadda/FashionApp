import axios from "axios";
import React, { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import { ContactService } from "../../services/ContactService";
import { useTranslation } from 'react-i18next'
import ReCAPTCHA from "react-google-recaptcha";
import {
  isEmpty,
  isEmail,
} from "../utils/Validation";

const Contact = () => {
  const cs = new ContactService();
  const [isVerified, setIsVerified] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    object: "",
    message: "",
  });

  const { t } = useTranslation()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleVerification = () => {
    setIsVerified(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name.trim() ==="" || formData.phone.trim() ==="" || formData.object.trim() ==="" ||formData.message.trim() ==="" )
      return toast("Merci de remplir tous les champs de contact", {
        className: "toast-failed",
        bodyClassName: "toast-failed",
      });
    if (!isEmail(formData.email))
      return toast("S'il vous plaît, mettez une adresse email valide", {
        className: "toast-failed",
        bodyClassName: "toast-failed",
      });
    if (!isVerified ){
      return toast("Veuiller cocher la case je ne suis pas un robot", {
        className: "toast-failed",
        bodyClassName: "toast-failed",
      });
    }
    try {
      cs.addContact(formData).then((res) => {
        toast.success("Votre message a été envoyé avec succès!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          object: "",
          message: "",
        });
      });
    } catch (error) {
      console.log(error)
      toast.error("Problème lors de l'envoi de votre message !");
    }
  };
  return (

    <>
          <ToastContainer />

    <div className="footer-section">
      <div className="contact-us-section">
        <h5 className="text-white text-center">{t("Footer.contact")}</h5>
        <form onSubmit={handleSubmit}>
          <input
            style={{ fontSize: 16, height: 50 }}
            className="form-control mt-2"
            type="text"
            name="name"
            placeholder="Nom"
            value={formData.name}
            onChange={handleChange}
            
          />
          <input
            style={{ fontSize: 16, height: 50 }}
            className="form-control mt-2"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            
          />
          <input
            style={{ fontSize: 16, height: 50 }}
            className="form-control mt-2"
            type="Number"
            name="phone"
            placeholder="Téléphone"
            value={formData.phone}
            onChange={handleChange}
            />
          <input
            style={{ fontSize: 16, height: 50 }}
            className="form-control mt-2"
            type="text"
            name="object"
            placeholder="Objet"
            value={formData.object}
            onChange={handleChange}
            
          />
          <textarea
            style={{ fontSize: 16, height: 50 }}
            className="form-control mt-2"
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            
          ></textarea>

          <div style={{marginTop:"10px"}}>
          <ReCAPTCHA
            sitekey="6LcjfMsnAAAAAEB9nW40xkVm2r5oFLTKHPV4yiAe"
            onChange={handleVerification}
            className="c-recaptcha"
            theme="dark"
          />
        </div>
          <button
                className="red_button shop_now_button"
                style={{ fontWeight: "bold", color: "whitesmoke", border:"none", marginTop: 10 }}
            type="submit"
          >
            {t('button.btn3')}
          </button>
        </form>
      </div>
    </div>
            </>
  );
};

export default Contact;
