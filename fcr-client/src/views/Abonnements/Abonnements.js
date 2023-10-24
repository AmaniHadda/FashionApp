import React, { useEffect, useState } from "react";
import RecemmentVu from "../../components/RecemmentVu/RecemmentVu";
import { Card } from "react-bootstrap";
import { AbonnementService } from "../../services/AbonnementService";
import { DotSpinner } from "@uiball/loaders";
import CustomButtonGroup from "./ButtonA";
import './Abonnements.css'; 

function Abonnements() {
  const abs = new AbonnementService();
  const [abonnements, setAbonnements] = useState([]);
  const [loader, setLoader] = useState(false);

  const fetch = async () => {
    setLoader(true)
    await abs.fetchenabled().then((res) => {
      setAbonnements(res.data); setLoader(false)
    });
  };
  useEffect(() => {
    fetch();
    console.log(selectedPeriod)
  }, []);

  const [selectedPeriod, setSelectedPeriod] = useState({});
  const timePeriods = ['1 mois','3 mois','6 mois','1 an'];
 
  
  const handlePeriodChange = (index,period) => {
    setSelectedPeriod(prevState => ({
      ...prevState,
      [index]: period,
    }));
    console.log(selectedPeriod)
  };
  if (loader) {
    return (
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
    <div className="container pt-5">
      {abonnements &&
        abonnements.map((item, i) => (
          <div className="row" key={i}>
            <div className="col-lg-4 col-sm-12" data-aos="fade-up">
              <Card>
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
                      marginLeft: "45%",
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
            <div className="col-lg-8 col-sm-12 pt-5 mt-5">
              <h2 className="text-center">{item.title}</h2>
              <p className="text-center">
                {item.description}
              </p>
            </div>
            <hr style={{ border: "1px solid #f1bce3", width: "100%" }} />
          </div>
        ))}
      <RecemmentVu />
    </div>
  );
}

export default Abonnements;
