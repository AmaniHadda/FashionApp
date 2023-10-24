import React, { useEffect, useState } from 'react'

import { Card, Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import { FavorisService } from '../../services/FavorisService';
import { useDispatch, useSelector } from 'react-redux';
import { ADD } from '../../redux/actions/CartAct';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import { DotSpinner } from '@uiball/loaders';

function Favoris() {
    const fs = new FavorisService();
    const [favoris, setFavoris]= useState([]);
    const [loader, setLoader] = useState(false);
    const items = useSelector((state) => state.cartRed.carts)
    const idUser=sessionStorage.getItem("id");
    const dispatch=useDispatch()

    const addToCart = (e) => {
    for(let i=0 ;i<5 ;i++){
    if (items[i]?._id === e._id) {
      return toast.error(e.name + "est déja dans le panier ")
    }}
    dispatch(ADD(e))
      return toast.success(e.name + " Ajouté dans le panier")
  }
    const retrieveFavoris=(id)=>{
      setLoader(true)
        fs.retrieveByUser(id).then((res) => {
            setFavoris(res.data);
            setLoader(false)

          });
    }
    const deleteFavoris=(id, idU)=>{
        fs.deleteByUser(id).then((res) => {
           retrieveFavoris(idU)
           toast.success("Supprimé de la liste des favoris")
          });
    }
    useEffect(() => {
        retrieveFavoris(idUser);
        
        console.log(favoris);
    }, [])
    if(loader){
      return  (
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
    (sessionStorage.getItem("name"))?(
        <div className="container pt-5 ">
        <div
          className="card bg-light w-100 mt-2 pt-5 mb-5"
          style={{ height: "auto", border: "none" }}
        >
          <h2 className="text-center">FAVORIS </h2>
          <h1
            style={{ color: "#f1bce3", fontWeight: "bold" }}
            className="pb-3 text-center"
          >
            La liste de vos envies ! 
          </h1>
        </div>
        {favoris.length !==0? (favoris.map((item,index)=>{
           return  <Card key={index}>
        <Card.Header>{item.habillementFK.name}</Card.Header>
        <Card.Body>

            <Row className='d-flex align-items-center'>

            <Col xs={12} className='col-md-2'>
                <img alt='im'  src={`${process.env.REACT_APP_URL_UPLOAD}habillements/${item.habillementFK.img}`}  height={150} width={100} ></img>
            </Col>
            <Col xs={12} className='col-md-8 '>
            <blockquote className="blockquote mb-0">
            <p>
              {' '}
              {item.habillementFK.description}{' '}
            </p>
            <footer className="blockquote-footer">
              Prix <cite title="Source Title">{item.habillementFK.price} TND</cite>
            </footer>
          </blockquote>
            </Col>


          <Col xs={12} className='col-md-2 text-center'>  
         
            <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 250, hide: 400 }}
                      overlay={<Tooltip id="button-tooltip" >
                        Ajouter au panier
                      </Tooltip>}
                    >
            <a className=' ' style={{ fontSize: "20px", color: "#000"}} href="#" onClick={()=>addToCart(item.habillementFK)}><i className="fas fa-shopping-bag"></i></a>
          </OverlayTrigger>
          <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 250, hide: 400 }}
                      overlay={<Tooltip id="button-tooltip" >
                        Supprimer
                      </Tooltip>}
                    >   
            <a className=' mx-3 'style={{ fontSize: "20px", color: "#FF69B4"}} href="#"  onClick={()=>{deleteFavoris(item._id, idUser)}}>
              <i className="fas fa-heart"
              onMouseOver={(e) => (e.target.className = "far fa-heart")}
              onMouseOut={(e) => (e.target.className = "fas fa-heart")}
              ></i></a>
              {/* <i class="far fa-heart"></i> */}
            </OverlayTrigger> 
          </Col></Row>
        </Card.Body>
      </Card>
        })):(<h2
          style={{fontWeight: "bold" }}
          className="pb-3 text-center text-secondary" 
        >Aucun produit n'a été ajouté à la liste des favoris. </h2>)}       
        </div>
    ):(
        window.location.href="/tavyissa"
    )
  
  )
}

export default Favoris