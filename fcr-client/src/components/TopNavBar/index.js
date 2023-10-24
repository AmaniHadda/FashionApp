import React, { useState } from "react";
import QRCode from "react-qr-code";
import { Modal, Button } from "react-bootstrap";
import {FR,US,IT,PT,ES} from 'country-flag-icons/react/3x2'
import LoginRegister from "../LoginRegisterModal";

import { useTranslation } from 'react-i18next'

import { useEffect } from "react";

function TopNavBar(props) {
  const [modalShow, setModalShow] = useState(false);
  const [login, setLogin] = useState(true);

  const showHideModal = () => {
    setModalShow(false);
  };

  const loginClicked = () => {
    setModalShow(true);
    setLogin(true);
  };
  const registerClicked = () => {
    setModalShow(true);
    setLogin(false);
  };

  const [isShow, invokeModal] = useState(false);
  const [lg, setLg] = useState(localStorage.getItem('selectedLang') || 'fr');
 
  const initModal = () => {
    return invokeModal(!false);
  };

  const closeModal = () => {
    return invokeModal(false);
  };

  const playlink = "https://play.google.com/store/apps?hl=fr&gl=US&pli=1";
  const storelink = "https://www.apple.com/fr/app-store/";

  const refreshToken = sessionStorage.getItem("refresh_token");
  const name = sessionStorage.getItem("name");

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.reload();
  }

  const { t, i18n } = useTranslation()

  const [selectedLang, setSelectedLang] = useState(localStorage.getItem('selectedLang') || 'fr');

  const onChangeLang = (e) => {
    
    i18n.changeLanguage(e.target.value)
    const selectedLanguage = e.target.value;
    setSelectedLang(selectedLanguage);
    localStorage.setItem('selectedLang', selectedLanguage);

    setLg(selectedLanguage)

  }
 
  useEffect(() => {
    i18n.changeLanguage(selectedLang)
    const storedLang = localStorage.getItem('selectedLang');
    if (storedLang) {
      setSelectedLang(storedLang);
    }
  }, []);


  return (
    <div className={`top_nav ${props.className}`}>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div
              className="top_nav_left"
              style={{ cursor: "pointer" }}
              onClick={initModal}
            >

              <i className="fa fa-qrcode mx-1" /> 
              {t("topNavbar.qr")}
            </div>
            <Modal show={isShow} onHide={closeModal} style={{ opacity: 0.8, marginTop: "6%" }} >

              <Modal.Body>
                <div className="row">
                  <div className="col-md-6">
                  <div className="d-flex flex-column justify-content-center align-items-center">
                  <img alt="" src={require("../../assets/images/android1.png")} width={50} height={50} className="mb-2"></img>
                  <QRCode
                    size={400}
                    style={{
                      height: "auto",
                      maxWidth: "100%",
                      width: 100,
                      minHeight: 100,
                    }}
                    value={playlink}
                    viewBox={`0 0 256 256`}
                  />


                </div>
                  </div>
                  <div className="col-md-6">
                <div className="d-flex flex-column justify-content-center align-items-center">
                <img alt="" src={require("../../assets/images/Apple-Logo.png")} width={80} height={50} className="mb-2"></img>
                  <QRCode
                    size={400}
                    style={{
                      height: "auto",
                      maxWidth: "100%",
                      width: 100,
                      minHeight: 100,
                    }}
                    value={storelink}
                    viewBox={`0 0 256 256`}
                  />


                </div>
                  </div>
                </div>
               
             
                
              </Modal.Body>
              <Modal.Footer>
                <div className=" d-flex justify-content-end align-items-end">
                  <Button
                  style={{
                    position: "relative",
                    borderColor: "#f1bce3",
                    backgroundColor: "#f1bce3",
                    height: "50px",
                    fontSize: 20,
                    minWidth: 100,
                  }}
                  
                    onClick={closeModal}
                  >
                    {" "}
                    Fermer
                  </Button>
                </div>
              </Modal.Footer>
            </Modal>


          </div>
          <div className="col-md-5">
            <div className="text-center top_nav_left">
              {t("topNavbar.register")}
            
              {/* Inscrivez-vous et bénéificier d'une remise de 20% pour votre premiére location */}
            </div>
          </div>
          <div className="col-md-3 text-right">
            <div className="top_nav_right">
              <ul className="top_nav_menu">

                {refreshToken ? (
                  <li className="account">
                    <a href="#">
                      {`Bienvenue ${name}`}
                      <i className="fa fa-angle-down"></i>
                    </a>
                    <ul className="account_selection">
                      <li>
                        <a href="#" onClick={() => handleLogout()}>
                          <i
                            className="fas fa-sign-in-alt"
                            aria-hidden="true"
                          ></i>

                          {t("topNavbar.dcnx")}
                        </a>
                      </li>
                      <li>
                        <a href="/profile" >
                          <i
                            className="fas fa-user"
                            aria-hidden="true"
                          ></i>

                          {t("topNavbar.compte")}
                        </a>
                      </li>
                    </ul>
                  </li>
                ) : (
                  <li className="account" style={{ paddingLeft: 100 }}>
                    <a href="#">

                    {t("topNavbar.compte")}
                      <i className="fa fa-angle-down"></i>                      
                    </a>
                    <ul className="account_selection">
                      <li>
                        <a href="#" onClick={() => loginClicked()}>
                          <i
                            className="fas fa-sign-in-alt"
                            aria-hidden="true"
                          ></i>

                          {t("topNavbar.cnx")}
                        </a>
                      </li>
                      <li>
                        <a href="#" onClick={() => registerClicked()}>
                          <i className="fa fa-user-plus" aria-hidden="true"></i>

                          {t("topNavbar.ins")}
                        </a>
                      </li>
                     
                    </ul>
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div className="col-md-1 d-flex align-items-center mb-4" >
            {lg==="fr" && <div ><FR title="France" style={{width:"20px",marginLeft:"30px"}}/></div>}
            {lg==="en" && <div ><US title="United States" style={{width:"20px",marginLeft:"30px"}}/></div>}
            {lg==="por" && <div ><PT title="Portugais" style={{width:"20px",marginLeft:"30px"}}/></div>}
            {lg==="it" && <div ><IT title="Italie" style={{width:"20px",marginLeft:"30px"}}/></div>}
            {lg==="es" && <div ><ES title="Spain" style={{width:"20px",marginLeft:"30px"}}/></div>}
            <div className="text-center top_nav_left ">
              <select className="language"
              style={{cursor: "pointer"}}
              value={selectedLang}
              onChange={onChangeLang} >
                <option value="fr" className="lang">Français</option>
                <option value="en" className="lang">English</option>
                <option value="por"className="lang">Portugais</option>
                <option value="es" className="lang">Espagnol</option>
                <option value="it" className="lang">Italien</option>
              </select>
             
            </div>
          </div>
        </div>
      </div>
      {modalShow ? (
        <LoginRegister

          show={modalShow}
          login={login}
          registerClicked={() => registerClicked()}
          loginClicked={() => loginClicked()}
          onHide={() => showHideModal()}
        />

      ) : null}
    </div>
  );
}

export default TopNavBar;
