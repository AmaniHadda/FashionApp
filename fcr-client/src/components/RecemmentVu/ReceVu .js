import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { HabillementService } from "../../services/HabillementService";
import { useState } from "react";
import { useEffect } from "react";

import { useTranslation } from 'react-i18next'
import jumpTo from "../../modules/Navigation";

import { DotSpinner } from "@uiball/loaders";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
function ReceVu() {
  const hbs = new HabillementService();
  const [list, setList] = useState([]);

  const [loader, setLoader] = useState(false);

  const { t } = useTranslation()

  const fetch = async () => {
    setLoader(true)
    hbs.viewRecently().then((res) => {
      setList(res.data);
      setLoader(false)
    });
  };

  useEffect(() => {
    fetch();
  }, []);

  if(loader){
    return  (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
    <DotSpinner
      size={50}
      speed={0.9}
      color="black"
    />
    </div>
    );
  }
  return (
    <div className="container pt-4 mt-1">

      <Carousel className="pt-4 mt-4 px-5" responsive={responsive}>
        {list &&
          list.map((item, index) => (
            <div key={index} data-aos="fade-up">
              <img alt={item.name} src={`${process.env.REACT_APP_URL_UPLOAD}habillements/${item.img}`} height={350} width={275} />

              <div className="col-9 d-flex justify-content-center align-items-center">
                <button 
                style={{ border: "none", color: "white",textTransform: "none" }}
                className="red_button shop_now_button"
                  onClick={()=>jumpTo(`/tavyissa/habillement/details/${item._id}`)} 
                 >
                {t("RecemmentVu.btn")}
                </button>
              </div>
            </div>
          ))}
      </Carousel>
    </div>
  );
}

export default ReceVu;
