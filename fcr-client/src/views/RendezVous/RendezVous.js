
import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactiveButton from "reactive-button";
import "react-calendar/dist/Calendar.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Calendar from "react-calendar";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { EMPTYCART } from "../../redux/actions/CartAct";
import "./style.css";

import { useTranslation } from 'react-i18next'
import CodeParrain from "./CodeParrain";
import { DotSpinner } from "@uiball/loaders";


function RendezVous() {
  const [showPopup, setShowPopup] = useState(false);
  const [coachNames, setcoachNames] = useState([]);
  const [coachSelected, setcoachSelected] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [showPop, setShowPop] = useState(false);
  const [state, setState] = useState("idle");
  const [isParrin, setParrin] = useState(false);
  const [eventType, setEventType] = useState("");
  const [date, setDate] = useState(new Date());
  const [loader, setLoader] = useState(false);
  const [coachInfo, setCoachInfo] = useState({});
  const [msg, setMsg] = useState("");

  const { t } = useTranslation()

  const name = sessionStorage.getItem("name");
  const gender = sessionStorage.getItem("gender");
  const id = sessionStorage.getItem("id");
  const code = sessionStorage.getItem("statusParrain")
  const habillements = useSelector((state) => state.cartRed.carts)
  const dispatch = useDispatch()
  const onChangeDate = (e) => {
    if(e < Date.now()){
      return toast.error("La date choisie doit être postérieure à aujourd'hui. Veuillez sélectionner une date valide.");
    }
    setDate(e);
    if(sessionStorage.getItem("justificatif")==="undefined" ||sessionStorage.getItem("justificatif")==="" ){
      setShowPop(true)
      setMsg("Merci de bien vouloir ajouter le justificatif à votre profil afin de pouvoir planifier un rendez-vous.")
      setTimeout(() => {
        window.location.href="/profile"
      }, 4000);
      return;
    }
    if(sessionStorage.getItem("isJustified")==="undefined"|| sessionStorage.getItem("isJustified")==="En attente"){
      setShowPop(true)
      setMsg("En attendant la validation de l'administrateur concernant votre justificatif, nous vous répondrons dès que possible.")
      setTimeout(() => {
        window.location.href="/profile"
      }, 4000);
      return;
    }
    if (code === "false") {
      setShowCode(true)
    } else {
      setShowPopup(true);
    }
  };
  const Clear = () => {
    dispatch(EMPTYCART())
    console.log("clear")
  }
 
  const fetchCoachById=async(id)=>{
    if(id){
    await axios.get("/coach/get/"+id).then((res)=>setCoachInfo(res.data))
    }else{
      setCoachInfo({})
    }
  }
  const fetchCoachNames=async()=>{
    await axios.get("/coach/getall/false").then((res)=>{
      setcoachNames(res.data)
      console.log(res.data)
    })
  }
  useEffect(() => {
    fetchCoachNames()
    if(code==="true"){
      setParrin(true)
      setTimeout(()=>setParrin(false),[10000])
    }
  }, [code])
 

  const handleCoach=(e)=>{
    setcoachSelected(e.target.value)
    fetchCoachById(e.target?.value)
  }
  const handleRandomSelection = () => {
    const randomIndex = Math.floor(Math.random() * coachNames.length);
    setcoachSelected(coachNames[randomIndex]?._id);
    fetchCoachById(coachNames[randomIndex]?._id)
  }; 
  const [shops, setShops] = useState([]);


  async function fetchShops() {
    setLoader(true)
    try {
      const shopsData = await axios.get("/shop/shops");
      setShops(shopsData.data[0]);
      setLoader(false)
    } catch (error) {
      console.error("Erreur lors de la récupération des magasins :", error);
    }
  }
  useEffect(() => {
    fetchShops();
    handleRandomSelection()
  }, [coachNames]);



  useEffect(() => {
    fetchShops();
  }, []);

  const handleConfirmMeeting = async () => {
    try {
      setState("En cours ... !!");
      const data = {
        date: date.toISOString(),
        eventType: eventType,
        coachName: coachSelected?coachSelected:null,
        userId: id,

        habillements: habillements.map((e) => e._id)
      };
      await axios.post("/api/meetings", data);
      setTimeout(() => {
        setState("Rendez-vous confirmé ...");
        toast.success("Rendez-vous confirmé avec succès!");
        setShowPopup(false)
        Clear();
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };
  const handleEventTypeChange = (event) => {
    setEventType(event.target.value);
  };
  const getFirstName = (fullName) => {
    const names = fullName.split(" ");
    return names[0];
  };



  if(loader){
    return  (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
    <DotSpinner
      size={50}
      speed={0.9}
      color="black"
    />
    </div>
    );
  }
  return (

    name ? (<div className="container pt-2">
      <div className="deal_ofthe_week pt-5">
        <h1 className="text-center" style={{ color: "#000" }}>
          {t("RendezVous.title")}
        </h1>
        {isParrin&&(
          <div
          className="card bg-light w-100 mt-2 pt-5"
          style={{ height: "auto", border: "none" }}
        >
          <h2 className="text-center">Bienvenue {name},</h2>
          <h2
            style={{ color: "#f1bce3", fontWeight: "bold" }}
            className="pb-3 text-center"
          >
            Nous sommes ravis de t'accueillir. Tu as un parrain parmi nous !
          </h2>
        </div>
        )}
        
      </div>
      <div className="row align-items-center mt-4">
        <div className="col-lg-6 text-center">
          <span style={{ fontSize: "22px", fontWeight: "bold" }}>

            {t("RendezVous.calend1")}
          </span>
          <br />
          <span style={{ fontSize: "12px", fontWeight: "bold" }}>
            {" "}

            {t("RendezVous.calend2")}
          </span>
          <Calendar
            className={"mx-auto mb-3 mt-5 "}
            onChange={(e) => onChangeDate(e)}
            value={date}
          />

          <div className="col-1">{/*  */}</div>
          <Modal
            style={{ opacity: 0.95 }}
            show={showPopup}
            onHide={() => setShowPopup(false)}
            className="mt-5"
          >
            <Modal.Header
              style={{
                fontSize: "24px",
                lineHeight: 1,
                justifyContent: "center",
              }}
            >
              <h3 className="text-center">
                Ravis de vous voir{" "}
                {!name ? (
                  <i className="fa fa-spinner" style={{ color: "#f1bce3" }} />
                ) : (
                  <>
                    <span className="text-dark">
                      {gender === "male" ? "Monsieur" : "Madame"}
                    </span>{" "}
                    <span className="text-dark"> {getFirstName(name)}</span>
                  </>
                )}
              </h3>
            </Modal.Header>
            <Modal.Body className="mt-3">
              <p className="text-center text-dark">
                Veuillez s'il vous plaît confirmer votre présence en date du {" "}
                {date.toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <div className="col-12 d-flex justify-content-center align-items-center mb-2 mt-2">
                {!coachNames ? (
                  <div></div>
                ) : (
                  <div className="row mt-3">
                    <div className="col-2">
                      <button
                        className="btn btn-lg "
                        style={{
                          borderRadius: 3,
                          height: 50,
                          width: 50,
                          color: "#000",
                          backgroundColor: "#f1bce3",
                        }}
                        disabled
                      >
                        <i className="fa fa-user" />
                      </button>
                    </div>
                    <div className="col-10">
                      <select
                        style={{
                          borderRadius: 3,
                          height: 50,
                          border: "3px solid #f1bce3",
                          backgroundColor: "transparent",
                          justifyContent: "center",
                          textAlign: "center",
                          alignItems: "center",
                        }}
                        className="w-100"
                        onChange={handleCoach}
                        value={coachSelected}
                      >
                        {coachNames?.map((coach,index)=>{
                          return (
                            <option key={index} value={coach._id}>
                          Rdv avec Coach {coach.name}
                        </option>
                          )
                        })}
                        <option value={""}>
                          Aucun Coach 
                        </option>
                      </select>
                      {coachSelected&&<div className="mt-2">
                        <span style={{fontSize:"15px" ,fontWeight:"bold"}}>
                        Preferences
                        </span>
                        {": "+coachInfo.preferences}</div>}
                    </div>
                  </div>
                )}
              </div>
              <b className=" d-flex justify-content-center align-items-center mt-3">
                Pour quel type d'événement souhaitez-vous louer nos vêtements ?
              </b>
              <br />

              <div className="row  ">
                <div className="col-6 mt-1">
                  <div className="d-flex">
                    <input
                      type="checkbox"
                      value="Travail"
                      className="col-1 form-control mx-1"
                      style={{ height: 25 }}
                      onChange={handleEventTypeChange}
                    />
                    Travail{" "}
                  </div>
                </div>
                <div className="col-6 mt-1">
                  <div className="d-flex">
                    <input
                      type="checkbox"
                      value="Quotidien"
                      onChange={handleEventTypeChange}
                      className="col-1 form-control mx-1"
                      style={{ height: 25 }}
                    />
                    Quotidien{" "}
                  </div>
                </div>
                <div className="col-6 mt-1">
                  <div className="d-flex">
                    <input
                      type="checkbox"
                      value="Soirée"
                      onChange={handleEventTypeChange}
                      className="col-1 form-control mx-1"
                      style={{ height: 25 }}
                    />
                    Soirée{" "}
                  </div>
                </div>
                <div className="col-6 mt-1">
                  <div className="d-flex">
                    <input
                      type="checkbox"
                      value="Pas de Préférence"
                      onChange={handleEventTypeChange}
                      className="col-1 form-control mx-1"
                      style={{ height: 25 }}
                    />
                    Pas de Préférence{" "}
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <span>
                Nous utiliserons ces renseignements pour vous suggérer des
                vêtements qui pourraient vous plaire.
              </span>
              <div className="col-12 d-flex justify-content-center align-items-center">

                <ReactiveButton
                  buttonState={state}
                  idleText="Confirmer mon rendez-vous"
                  loadingText="Loading"
                  successText="Failed"
                  onClick={handleConfirmMeeting}
                  style={{
                    borderColor: "#f1bce3",
                    backgroundColor: "#f1bce3",
                    marginTop: "-0.3rem",
                    textTransform: "none",
                    height: 50,
                    color: "#000",
                    fontWeight: "bold",
                  }}
                />


              </div>
            </Modal.Footer>
          </Modal>
          <div className=" d-flex justify-content-center align-items-center">
            <div className="row ">
              <div className="col-11"></div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 text-center">
          <span style={{ fontSize: "22px", fontWeight: "bold" }}>
{shops.titre}
            {/* {t("RendezVous.map1")} */}
          </span>
          <br />
          <span style={{ fontSize: "12px", fontWeight: "bold" }}>
            {" "}
            {shops.description}
            {/* {t("RendezVous.map2")} */}
            {" "}
            <b> {shops.heure1} à {shops.heure2}</b>{" "}
          </span>
          <div className="d-flex justify-content-center">
            <iframe
              title="boutique"
              className="pt-2"
              src={shops.lienMap}
              // src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.0647871937153!2d2.3053019120052767!3d48.87604147121489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fc7474b4847%3A0xbd413bc4a106441b!2s45%20Rue%20de%20Courcelles%2C%2075008%20Paris%2C%20France!5e0!3m2!1sfr!2stn!4v1683212435894!5m2!1sfr!2stn"
              height="300"
              style={{ border: 0, width: "70%", marginBottom: "4px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
        <Modal
            style={{ opacity: 0.95 }}
            show={showPop}
            onHide={() => setShowPop(false)}
            className="mt-5"
          >
            <Modal.Header
              style={{
                fontSize: "24px",
                lineHeight: 1,
                justifyContent: "center",
              }}
            >
              <h3 className="text-center">
                Ravis de vous voir {name}
              </h3>
            </Modal.Header>
            <Modal.Body className="mt-3">
              <p className="text-center text-dark">
              {msg}            </p>
             
            </Modal.Body>
          </Modal>
      <CodeParrain show={showCode} onHide={() => setShowCode(false)} />
    </div>) : (window.location.href = "/tavyissa")

  );
}

export default RendezVous;
