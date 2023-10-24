import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Collapsible from "react-collapsible";
import RecemmentVu from "../../components/RecemmentVu/RecemmentVu";
import { useTranslation } from 'react-i18next'
import Axios from "axios";
import { DotSpinner } from "@uiball/loaders";

function Aide() {
  const [liste, setListe] = useState([]);
  const [isOpen, setIsOpen] = useState([]);
  const [loader, setLoader] = useState(false);


  const aide = async () => {
    setLoader(true)
      await Axios.get("/ccmarche/getcommentcamarche")
        .then((res) => {
          setListe(res.data.data);
          setIsOpen(new Array(res.data.data.length).fill(false));
          setLoader(false)
        })
   
  }

  useEffect(() => {
    aide()
  }, []);

  const { t } = useTranslation()

  const handleCollapsibleOpen = (index) => {
    const newIsOpen = [...isOpen];
    newIsOpen[index] = true;
    setIsOpen(newIsOpen);
  };

  const handleCollapsibleClose = (index) => {
    const newIsOpen = [...isOpen];
    newIsOpen[index] = false;
    setIsOpen(newIsOpen);
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
    <div className="container pt-5 mt-3">
      <Container>
        <Row className="mt-4">
          <Col>
            <h1 className="title text-center">
              {t("Aide.title")}
            </h1>
            <div className="m-6 mt-5">
              {liste.map((e, index) => (
                <Collapsible
                  key={index}
                  trigger={
                    <div
                      className={`collapsible-header ${isOpen[index] ? "active" : ""}`}
                    >
                      <span>
                        {e.title}
                      </span>
                      <i
                        className={`fa fa-chevron-down ${isOpen[index] ? "open" : ""}`}
                      />
                    </div>
                  }
                  onOpen={() => handleCollapsibleOpen(index)}
                  onClose={() => handleCollapsibleClose(index)}
                >
                  {e.descriptions.map((f, idx) => (
                    <div className="collapsible-content " key={idx}>
                      <p style={{ marginLeft: "10px" }}>
                        {f}
                      </p>
                    </div>
                  ))}
                </Collapsible>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
      <RecemmentVu />
    </div>
  );
}

export default Aide;
