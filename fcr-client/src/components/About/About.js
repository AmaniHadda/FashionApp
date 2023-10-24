import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next'
import jumpTo from "../../modules/Navigation";
import Axios from "axios";


function About() {
  const { t } = useTranslation()
const[GIF,setGIF]=useState("")
const [descriptionEntries, setDescriptionEntries] = useState([]);
useEffect(() => {
  Axios.get("/desc/getAlldesc/")
    .then((response) => {
      setDescriptionEntries(response.data[0]);
    })
    .catch((error) => {
      console.error("Error retrieving description:", error);
    });

  Axios.get("/gif/") 
    .then((response) => {
      setGIF(response.data[0]);
    })
    .catch((error) => {
      console.error("Error retrieving banner:", error);
    });
}, []);
  return (
    <div className="deal_ofthe_week" >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6" data-aos="fade-right">
            <div className="deal_ofthe_week_img">
              {GIF?(
                <img src={process.env.REACT_APP_URL_UPLOAD+"gif/"+GIF.gif} alt="GIF" />
              ):(<div></div>)}
              
            </div>
          </div>
          <div className="col-lg-6 text-right deal_ofthe_week_col" data-aos="fade-left">
            <div className="deal_ofthe_week_content d-flex flex-column align-items-center float-right">
              <div className="section_title">

                <h2>
                {descriptionEntries.titre}
                  {/* {t("about.Portez")} */}
                  </h2>
                <p className="marge-aide">
                 {descriptionEntries.description}
                {/* {t("about.Desc")} */}
                </p>
              </div>

            
              <div className="marge-aide">

              <div >
                <button 
                style={{ border: "none", color: "white",textTransform: "none" }}
                className="red_button shop_now_button"
                  onClick={()=>jumpTo("/tavyissa/aide")} 
                >
                {t("about.Comment")}
                </button>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
