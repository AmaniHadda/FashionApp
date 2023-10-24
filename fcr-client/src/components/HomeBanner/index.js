//*
//  ** Author: Santosh Kumar Dash
//  ** Author URL: http://santoshdash.epizy.com/
//  ** Github URL: https://github.com/quintuslabs/fashion-cube
//  */

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel } from "react-bootstrap";
import jumpTo from "../../modules/Navigation";
import { DotSpinner } from '@uiball/loaders'
import { FaTiktok,FaFacebookF,FaInstagram } from "react-icons/fa";
import { useTranslation } from "react-i18next";

function HomeBanner() {
  const [bannerData, setBannerData] = useState(null);
  const [reseauxData, setReseauxData] = useState([""]);
  const { t } = useTranslation()

  useEffect(() => {
    axios
      .get("/banner/getbanner")
      .then((response) => {
        setBannerData(response.data);
      })
      .catch((error) => {
        console.error("Error retrieving banner:", error);
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
  if (bannerData === null || reseauxData.length === 0) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>

      <DotSpinner
        size={50}
        speed={0.9}
        color="black"
      /></div>
  }

  return (
    <Carousel interval={3000} pause={false} className="carousel-fade">
      {bannerData.map((banner, index) => (
        <Carousel.Item key={index}>
          <div
            style={{ position: "relative" }}
            className="w-100 main_slider"
          >
            <img
              className="img-fluid"
              src={`${process.env.REACT_APP_URL_UPLOAD}banner/${banner.image}`}
              alt="banner"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            <div className="container fill_height"
              style={{
                animation: "slideInFromRight 1s",
              }}>
              <div className="row align-items-center fill_height">
                <div className="col">
                  <div className="main_slider_content" data-aos="fade-right">
                    <h6>{banner.description1}</h6>
                    <h1 className="text-justify">{banner.description2}</h1>
                    <h4>
                      <em>{banner.description3}</em>
                    </h4>

                    <div>
                      <button
                        style={{ border: "none", color: "white", textTransform: "none" }}
                        className="red_button shop_now_button "
                        onClick={() => jumpTo("/tavyissa/habillements")}

                      >

                        <span>{t("button.btn")}<i style={{ marginLeft: "10px" }} className="fas fa-arrow-right"></i></span>
                      </button>

                      <div className="hero__social" >
                        {console.log(reseauxData.lienFacebook)}
                        <a href="#"></a>
                        <a href={reseauxData.lienInstagram}><FaInstagram/></a>
                        <a href={reseauxData.lienTiktok}><FaTiktok /></a>
                        <a href={reseauxData.lienFacebook}><FaFacebookF/></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default HomeBanner;