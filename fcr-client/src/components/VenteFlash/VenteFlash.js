import React from 'react'
import "./vente.css"
import jumpTo from '../../modules/Navigation'
import Countdown from 'react-countdown';
import Axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function VenteFlash() {

    const [VenteFlash,setVenteFlash]=useState([])
    const { t } = useTranslation()
    const fetchVenteFlashs=async()=>{
        await Axios.get("/venteflash/retrieveOne")
        .then((res)=>{setVenteFlash(res.data.data)})
      }
      useEffect(()=>{
        fetchVenteFlashs()
      },[])
    const renderCountdown = ({ days, hours, minutes, seconds, completed  }) => {
      if (completed) {
        fetchVenteFlashs();
      }else{
        return (
        <>
          <div className="cd-item">
            <span>{days}</span>
            <p>Jours</p>
          </div>
          <div className="cd-item">
            <span>{hours}</span>
            <p>Heures</p>
          </div>
          <div className="cd-item">
            <span>{minutes}</span>
            <p>Minutes</p>
          </div>
          <div className="cd-item">
            <span>{seconds}</span>
            <p>Secondes</p>
          </div>
        </>
        
        );
      }
      };
      
  return (
    VenteFlash?(
      <>
      <hr
        style={{
          border: "1px solid #f1bce3",
          width: "80%",
          margin: "80px auto 0",
        }}
        className="text-center"
      />
      <h1 className="text-center pt-5">Offre de la semaine</h1>
    
      <Carousel interval={5000} pause={false}>
        {VenteFlash.map((venteFlash, index) => (
          <Carousel.Item key={index}>
            <div style={{ position: "relative" }} className="w-100 main_slider">
              <section className="categories spad">
                <div className="container">
                  <div className="row d-flex flex-column-reverse flex-lg-row align-items-center">
                    <div className="col-lg-4" data-aos="fade-left">
                      <div className="categories__hot__deal">
                        <img
                          src={`${process.env.REACT_APP_URL_UPLOAD}habillements/${venteFlash.habillementFK?.img}`}
                          style={{ borderRadius: "10px", maxWidth: "100%", minWidth: "100%" }}
                          alt=""
                          height="auto"
                        />
    
                        <div className="hot__deal__sticker">
                          <span>OFFRE</span>
                          <h5>{venteFlash.priceWithPromotion} DT</h5>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3" data-aos="fade-right">
                      <div className="categories__text">
                        <h2>
                          Habillements <br /> <span>Collections</span> <br /> Accessoires
                        </h2>
                      </div>
                    </div>
                    <div className="col-lg-4" data-aos="fade-right">
                      <div className="categories__deal__countdown">
                        <span>Exclusivité hebdomadaire </span>
                        <h2>{venteFlash.habillementFK?.name}</h2>
                        <div className="categories__deal__countdown__timer" id="countdown">
                          <Countdown date={new Date(venteFlash.dateLimite)} renderer={renderCountdown} />
                        </div>
                        <button
                          style={{ border: "none", color: "white", textTransform: "none" }}
                          className="red_button shop_now_button"
                          onClick={() => jumpTo("/tavyissa/habillements")}
                        >
                          {t("button.btn")}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
    
    ):<div></div>
  )
}

export default VenteFlash