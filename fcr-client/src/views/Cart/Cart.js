/*
 ** Author: Santosh Kumar Dash
 ** Author URL: http://santoshdash.epizy.com/
 ** Github URL: https://github.com/quintuslabs/fashion-cube
 */


import React from "react";
import Heading from "../../components/Heading";
import CartItem from "./CartItem";

import EmptyCart from "../../assets/images/empty_cart.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { EMPTYCART } from "../../redux/actions/CartAct";
import jumpTo from "../../modules/Navigation";

import LoginRegister from "../../components/LoginRegisterModal";

function Cart(props) {
  const items = useSelector((state) => state.cartRed.carts)
  const[modalShow1, setModalShow1]=useState(false)
  const[login, setLogin]=useState(false)
  const dispatch = useDispatch()
  const [price, setPrice] = useState(0)
  const totals = () => {
    let price = 0
    items.map((e, i) => {
      if(e.newPrice==0){
      price = parseFloat(e.price) * e.quantity + price}
      else{
        price = parseFloat(e.newPrice) * e.quantity + price
      }
    })
    setPrice(price)
  }
  const VerifyLogin=()=>{
    if(sessionStorage.getItem("name")){
      jumpTo("/tavyissa/rendezvous") 
    }else{
      setModalShow1(true);
      setLogin(true)
    }
  }
  const loginClicked = () => {
    setModalShow1(true)
    setLogin(true)
  };
  const registerClicked = () => {
    setModalShow1(true)
    setLogin(false)
  };
  const showHideModal1 = () => {
    setModalShow1(!modalShow1)
  };
  const Clear = () => {
    dispatch(EMPTYCART())
    console.log("clear")
  }
  useEffect(() => {
    totals()
  }, [totals])
  return (
    <div className="shopping--cart" data-aos="fade-up">
      <div className="container">
        <div className="shopping--cart--container">
          <div className="row ">
            <Heading title={items !== undefined && items.length !== 0 ?"Votre Panier" :"Votre panier est vide"}data-aos="fade-up" />
          </div>
          <div style={{ height: 30 }}></div>
          <CartItem
            items={items || {}}
          />
          {items !== undefined && items.length !== 0 ? (
            <>
              <span
                className="minus"
                onClick={() => Clear()}
              >
                <button style={{ border: "none", borderRadius: "3px", color: "white", backgroundColor: "#FEADDB", height: "50px", width: "120px" }}>Tout vider  <i className="fa fa-trash" aria-hidden="true"></i></button>
              </span>
              <div
                className="d-flex flex-column justify-content-end align-items-end"
                style={{ paddingRight: 50 }}
              >

               
                <p>
                  Rendez-vous : <span className="text-danger">Free</span>
                </p>

                <h3 style={{ textAlign: "center" }}>
                  Total:{" "}
                  <span className="text-danger">
                    TND {price}
                  </span>
                </h3>
                <button style={{ border: "none", color: "white" }} className="red_button shop_now_button px-2" onClick={VerifyLogin}>
                  Prendre un rendez-vous
                </button>
                {modalShow1 ? (
          <LoginRegister
            show={modalShow1}
            login={login}
            registerClicked={() => registerClicked()}
            loginClicked={() =>loginClicked()}
            onHide={() => showHideModal1()}
          />
        ) : null}
              </div></>
          ) : (
            <div style={{ textAlign: "center", marginTop:"-50px" }}>
              <img
                src={EmptyCart}
                alt=""
                style={{ width:"50%" }}
                className="img-fluid"
              />
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default Cart
