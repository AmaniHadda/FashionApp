import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Card } from "react-bootstrap";
import { AbonnementService } from "../../services/AbonnementService";
import { useTranslation } from 'react-i18next'
import CustomButtonGroup from "../../views/Abonnements/ButtonA";


function Abonnements() {
  const abs = new AbonnementService();
  const { t } = useTranslation()

  const [abonnements, setAbonnements] = useState([]);

  const fetch = async () => {
    await abs.fetchenabled().then((res) => {
      setAbonnements(res.data);
    });
  };
  useEffect(() => {
    fetch();
  }, []);

  const history = useHistory();
  const [selectedPeriod, setSelectedPeriod] = useState({});
  const timePeriods = ['1 mois','3 mois','6 mois','1 an'];
  const handlePeriodChange = (index,period) => {
    setSelectedPeriod(prevState => ({
      ...prevState,
      [index]: period,
    }));
    console.log(selectedPeriod)
  };
  const goto = () => {
    history.push("/tavyissa/abonnements");
  }
 
  return (
    <div className="container pt-4 mt-4" id="abonnements">
      <div className="col-12  d-flex justify-content-center align-items-center">

        <h1 className="text-center">{t("Abonnements.abnm")}</h1>
      </div>
      <div className="row pt-5">
        {abonnements &&
          abonnements.slice(0,3).map((item, i) => (
            <div
              key={i}
              className="col-lg-4 col-sm-12"
              data-aos="fade-left"
            >
              <Card style={{height:"450px"}}>
                <Card.Header
                  style={{
                    backgroundImage: `url(${process.env.REACT_APP_URL_UPLOAD}abonnements/${item.cover})`,
                    height: 60,
                  }}
                />
                <Card.Body className="text-center">
                  <h1 style={{ fontSize: 26 }}>{item.title}</h1>
                  <hr
                    style={{
                      width: 40,
                      marginTop: 50,
                      marginLeft: "40%",
                      border: "2px solid gray",
                    }}
                  />
                  <CustomButtonGroup
                    options={timePeriods}
                    selectedOption={selectedPeriod[i]||timePeriods[0]}
                    onOptionChange={(period)=>handlePeriodChange(i,period)}
                  />
                  <p>à la formule inspiré</p>
                  {timePeriods.map((e,index)=>
                      (e===(selectedPeriod[i]?selectedPeriod[i]:"1 mois"))&&<h6 key={index}>{item.reduction[index]===0?("Sans réduction"):(item.reduction[index]+"% de réduction")}</h6>
                      )}
                    {timePeriods.map((e,index)=>
                      (e===(selectedPeriod[i]?selectedPeriod[i]:"1 mois"))&&
                      <div key={index}>
                  {item.price[index] === item.pricePromotion[index] ? (
                    <React.Fragment>
                      <h2 style={{ color: "#B98C57	" }}>
                        {item.price[index]} TND
                      </h2>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <h2
                        style={{
                          color: "#B98C57",
                          textDecoration: "line-through",
                        }}
                      >
                        {item.price[index]} TND
                      </h2>
                      <h2 style={{ color: "#B98C57	" }}>
                        {item.pricePromotion[index].toFixed(0)} TND
                      </h2>
                    </React.Fragment>
                  )}</div>
                    )}
                </Card.Body>
              </Card>
            </div>
          ))}

        <div className="pt-4 col-12 d-flex justify-content-end align-items-end">
          <button
            onClick={goto}
            style={{ border: "none", color: "white" }}
            className="red_button shop_now_button"
          >

           {t("Abonnements.btn")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Abonnements;
