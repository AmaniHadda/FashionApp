/*
 ** Author: Santosh Kumar Dash
 ** Author URL: http://santoshdash.epizy.com/
 ** Github URL: https://github.com/quintuslabs/fashion-cube
 */

import React from "react";

import { Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import "./style.css";
import EmptyCart from "../../assets/images/emptyCart.png";
import jumpTo from "../../modules/Navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { DELETE } from "../../redux/actions/CartAct";
function HomeCartView(props) {

  const items = useSelector((state) => state.cartRed.carts)
  const dispatch = useDispatch();
  const DeleteItem = (id) => {
    dispatch(DELETE(id))
  }
  const goToChechout = () => {
    jumpTo("/tavyissa/cart");
  };
  const [price, setPrice] = useState(0)

  const totals = () => {
    let price = 0
    items.map((e, i) => {
      if(e.newPrice===0){
      price = parseFloat(e.price) * e.quantity + price}
      else{
        price = parseFloat(e.newPrice) * e.quantity + price
      }
    })
    setPrice(price)
  }
  useEffect(() => {
    totals()
  }, [totals])

  return (
    <Modal {...props} className="right">
      <Modal.Header closeButton>
        <Modal.Title>Votre panier</Modal.Title>
        {items !== undefined && items !== null ? (
          <span className="checkout--btn" onClick={() => goToChechout()}>
            Rendez-vous{" "}
          </span>
        ) : null}
      </Modal.Header>
      <Modal.Body className="modal-body-content">
        <div>
          {items === undefined || items === null || items.length === 0 ? (
            <div className="empty--basket">
              <img src={EmptyCart} className="img-fluid" alt="" />
              <h4 style={{ textAlign: "center" }}>Empty cart</h4>
            </div>

          ) : items.map((item,index) => {
            return (
              <div key={index} className="basket--item">
                <div className="basket--item--img">
                  <img src={`${process.env.REACT_APP_URL_UPLOAD}habillements/${item.img}`} alt="" height={100} width={"80%"}/>
                </div>
                <div className="basket--item--details">
                  <div className="basket--item--title">
                    {item.title}
                  </div>
                  <div className="basket--item--quantity">

                    <span>{item.name}</span>
                  </div>
                  <div className="basket--item--price ">
                    {" "}
                    <span>TND {item.newPrice!==0?item.newPrice:item.price}</span>
                  </div>
                  <div className="basket--item--price mt-2">
                    {" "}
                    <span>
                      <OverlayTrigger
                        placement="bottom"
                        delay={{ show: 250, hide: 400 }}
                        overlay={<Tooltip id="button-tooltip" >
                          Détails
                        </Tooltip>}
                      >
                        <a
                          href={`/tavyissa/habillement/details/${item._id}`}>
                          <i className="fas fa-eye" style={{ fontSize: "20px", color: "#5f6169" }} ></i>
                        </a></OverlayTrigger>
                    </span>
                    <span>
                      <OverlayTrigger
                        placement="bottom"
                        delay={{ show: 250, hide: 400 }}
                        overlay={<Tooltip id="button-tooltip" >
                          Supprimer
                        </Tooltip>}
                      >
                        <a
                          href="#"
                          className="mx-3"
                          onClick={() => DeleteItem(item._id)}
                        >
                          <i className="fas fa-times-circle" aria-hidden="true" style={{ fontSize: "20px", color: "#dc3545" }}></i>
                        </a></OverlayTrigger>
                    </span>
                  </div>
                </div>

              </div>

            );
          })}

          {items.length !== 0 ? (
            <>
              <div className="total--price-container">
                <h3 style={{ textAlign: "center" }}>
                  Total:
                  <span style={{ color: "#FEADDB" }}>{" " + price} TND</span>{" "}
                </h3>

              </div>
              <button
                className="btn btn-wide log-btn-cart"
                style={{ marginTop: 20 }}
                onClick={() => goToChechout()}
              >
                Prendre un rendez-vous
              </button>
            </>
          ) : null}

        </div>


      </Modal.Body>
    </Modal>
  )
}

export default HomeCartView
