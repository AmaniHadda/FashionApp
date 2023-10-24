/*
 ** Author: Santosh Kumar Dash
 ** Author URL: http://santoshdash.epizy.com/
 ** Github URL: https://github.com/quintuslabs/fashion-cube
 */

import React from "react";
import { DELETE, } from "../../redux/actions/CartAct";
import { useDispatch } from "react-redux";

import { OverlayTrigger, Tooltip } from "react-bootstrap";

function CartItem({ items }) {
  const dispatch= useDispatch();
  const DeleteItem = (id) => {
    dispatch(DELETE(id))
}
  return (
    <div style={{ marginTop: 30 }}>
      {items !== undefined &&
        items !== null &&
        items?.map((item,index) => (
          <div key={index} className="row shopping--cart--item" data-aos="fade-up">
            <div className="col-sm-2">
              <div className="cart--item--img">
              <img src={`${process.env.REACT_APP_URL_UPLOAD}habillements/${item.img}`} height={150} width={"70%"} alt="" />
              </div>
            </div>
            <div className="col-sm-5">
              <div
                className="basket--item--title"
                style={{ marginTop: 10, marginBottom: 10 }}
              >
                {item.title}
              </div>
              <div
                className="basket--item--quantity"
                style={{ marginTop: 10, marginBottom: 10 }}
              >
                Nom de l'article : <span>{item.name}</span>
              </div>
              <div
                className="basket--item--price"
                style={{ marginTop: 10, marginBottom: 10 }}
              >
                {" "}
                Prix de location : <span>TND {item.newPrice!==0?item.newPrice:item.price}</span>
              </div>
            </div>
            <div className="col-sm-5">
              <div className="quantity d-flex flex-column flex-sm-row ">
                <div style={{ marginLeft: "auto" }} className="px-5">

                <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 250, hide: 400 }}
                      overlay={<Tooltip id="button-tooltip" >
                        Détails
                      </Tooltip>}
                    >
                <a
                  href={`/tavyissa/habillement/details/${item._id}`}
                  
                  >

                  <i className="fas fa-eye" style={{fontSize:"25px", color:"#748be7"}} ></i>
                  </a></OverlayTrigger>
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

                  <i className="fas fa-times-circle" aria-hidden="true" style={{ fontSize: "25px", color: "#dc3545" }}></i>

                  </a>
                  </OverlayTrigger>
                  
                </div>
               
              </div>
              
            </div>
            
          </div>

        ))}
           
    </div>
  );
}

export default CartItem;
