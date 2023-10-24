
import React, { useState } from "react";
import Facebook_ from "../../assets/images/facebook.png";
import Instagram_ from "../../assets/images/Instagram.png";
import Tiktok_ from "../../assets/images/tiktok.png";
import Email from "../../assets/images/Email.png";
import { NewsletterService } from "../../services/NewsletterService";
import Contact from "./Contact";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useEffect } from "react";
import { useTranslation } from 'react-i18next';
import {isEmail} from "../utils/Validation";

function Footer() {
  const year = new Date().getFullYear();
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  const nws = new NewsletterService();
  const { t } = useTranslation()
  const [reseauxData, setReseauxData] = useState([""]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    object: "",
    message: "",
  });
  const handleCall = (phone) => {
    if (isMobile) {
      window.open(`tel:${phone}`);
    } else {
      const p = phone.replace(/\s/g, "");
      const whatsappLink = `https://wa.me/${p.slice(4, 15)}`;
      window.open(whatsappLink, "_blank");
    }

  };
  const handleEmailClick = () => {
    if (reseauxData.lienEmail) {
      window.open(`mailto:${reseauxData.lienEmail}`);
    }
  };
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!isEmail(formData.email))
      return toast("S'il vous plaît, mettez une adresse email valide", {
        className: "toast-failed",
        bodyClassName: "toast-failed",
      });
     nws.subscribe({ email: formData.email }).then(() => {
      setFormData({ ...formData, email: "" });
      toast.success(
        "L'inscription à la newsletter a été effectué avec succés."
      );
    }).catch((err) => toast.error("Vous êtes déjà inscrit ! "));
  };
  const [aproposData, setAproposData] = useState([]);

  useEffect(() => {
    axios
      .get("/apropos/getAllApropos") // Update the endpoint URL here
      .then((response) => {
        setAproposData(response.data[0]);
      })
      .catch((error) => {
        console.error("Error retrieving apropos:", error);
      });
    axios
      .get("/ResSoc/getAll/")
      .then((response) => {
        setReseauxData(response.data[0]);
        console.log(response.data[0])
      })
      .catch((error) => {
        console.error("Error retrieving reseaux data:", error);
      });
  }, []);
  return (
    <>
      <ToastContainer />

      <footer className="footer">
        <div className="container pt-4">
          <div className="row">
            <div className="col-lg-3  pt-4 col-md-6 col-sm-12" data-aos="fade-right">
              <div className="p">

                <h5 className="text-white ">{t("Footer.Appelez")}</h5>
                <span className=" mt-5">
                  {" "}
                  <i className="fa fa-phone text-white" /> <a className="text-white" href={`tel:${aproposData.phoneNumber1}`} onClick={() => handleCall(aproposData.phoneNumber1)} style={{ textDecoration: 'none' }} > {aproposData.phoneNumber1}{" "}</a>
                </span>
                <br />
                <span className="text-white mt-3">
                  {" "}
                  <i className="fa fa-phone text-white" /> <a className="text-white" href={`tel:${aproposData.phoneNumber2}`} onClick={() => handleCall(aproposData.phoneNumber2)} style={{ textDecoration: 'none' }} > {aproposData.phoneNumber2}{" "}</a>
                </span>
                <h5 className="text-white mt-3">{t("Footer.Suivez")}</h5>
                <div className="row">
                  <div className="col-1">
                  <div onClick={handleEmailClick} style={{cursor:"pointer"}}>
                      <img height={20} alt="Facebook" src={Email} />
                    </div>
                  </div>
                  <div className="col-1">
                    <a href={reseauxData.lienFacebook}><img height={20} alt="Facebook" src={Facebook_} /> </a>
                  </div>
                  <div className="col-1">
                    <a href={reseauxData.lienInstagram}> <img height={20} alt="instagram" src={Instagram_} /></a>
                  </div>
                  <div className="col-1">
                    <a href={reseauxData.lienTiktok}><img height={27} alt="instagram" src={Tiktok_} /></a>
                  </div>
                </div>
                <div className="p">
                  <br />
                  <h5 className="text-white">{t("Footer.Notre")}</h5>

                  <p className="text-white">
                    {aproposData.rue} <br />
                    {aproposData.ville}
                  </p>
                </div>
                <div>
                  <a href='https://play.google.com/store/apps?hl=fr&gl=US&pli=1&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'>
                    <img width={"50%"} alt='Disponible sur Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/fr_badge_web_generic.png' /></a>
                </div>

                <a href='https://www.apple.com/fr/app-store/'>
                  <img width={"50%"} alt='Disponible sur Google Play' src='https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg' /></a>
              </div>
            </div>
            <div className="col-lg-6 pt-4" data-aos="fade-up">
              <h5 className="text-white text-center">

                {t("Footer.Recevez")}
              </h5>

              <form onSubmit={handleNewsletterSubmit}>
                <input
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  style={{ fontSize: 16, height: 60 }}
                  placeholder="Saisir votre adresse email"
                  className="form-control-lg w-100 mt-3"
                />
                <div className=" col-md-12  d-flex justify-content-center align-items-center">
                  <button
                    type="submit"
                    style={{ border: "none", color: "white", marginTop: 5 }}
                    className="red_button shop_now_button w-50 "
                  >

                   <span>{t("Footer.insc")}</span> 
                  </button>
                </div>
              </form>

            </div>
            <div className="col-lg-3  pt-4" data-aos="fade-left">
              <Contact />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="footer_nav_container">
              <div className="cr pt-5 mt-5 text-white">

                ©{year} {t("Footer.cop")}{" "}
                <i className="fa fa-heart-o" aria-hidden="true"></i>{" "}
                <a href="https://ipactconsult.com/" rel="noreferrer" target="_blank">
                  IPACT Consult
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer></>
  );
}

export default Footer;

