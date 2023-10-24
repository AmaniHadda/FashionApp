import React, { useEffect, useState } from "react";
import ReactPanZoom from "react-image-pan-zoom-rotate";
import Modal from "react-bootstrap/Modal";
import "react-multi-carousel/lib/styles.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { HabillementService } from "../../services/HabillementService";
import { Badge, Button } from "react-bootstrap";
import { FavorisService } from "../../services/FavorisService";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { ADD } from "../../redux/actions/CartAct";

import Axios from "axios";
import { DotSpinner } from "@uiball/loaders";
function DétailHabillement() {
  const { id } = useParams();
  var user = {}
  if (sessionStorage.getItem("id")) {
    user = sessionStorage.getItem("id");
  }
  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [brandFK, setBrandFK] = useState("");
  const [seasonFK, setSeasonFK] = useState("");
  const [sizes, setSizes] = useState([""]);
  const [shoesizes, setShoesizes] = useState([""]);
  const [subcategoryFK, setSubcategoryFK] = useState("");
  const [isNew_, setIsNew_] = useState();
  const [suggestions, setSuggestions] = useState([]);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [loader, setLoader] = useState(false);
  const items = useSelector((state) => state.cartRed.carts)

  const handleClose = () => setShow(false);

  const handleClose1 = () => setShow2(false);
  const handleShow = () => setShow(true);
 
  const [SousImages, setSousImages] = useState([])
  const [hbImage, sethbImage] = useState('')
  const hbs = new HabillementService();
  const fs = new FavorisService();
  const dispatch = useDispatch();
const [habillement, setHabillement]=useState({})
  const [favorisUser, setFavorisUser] = useState([]);
  const retrieveFavoris = (id) => {
    fs.retrieveByUser(id).then((res) => {
      setFavorisUser(res.data);
    });
  }
  const retrieveImage = (id) => {
    hbs.getSousImages(id).then((res) => {
      setSousImages(res.data);
      
    });
    

  }
  const addToCart = (e) => {
    for(let i=0 ;i<5 ;i++){
    if (items[i]?._id === e._id) {
      return toast.error(e.name + "est déja dans le panier ")
    }}
    dispatch(ADD(e))
      return toast.success(e.name + " Ajouté dans le panier")
  }
 
    const fetchOne = async () => {
      setLoader(true)
      hbs.getOne(id).then((res) => {
        setImg(res.data.img);
        setName(res.data.name);
        setPrice(res.data.price);
        setDescription(res.data.description);
        setBrandFK(res?.data?.brandFK?.name);
        setSeasonFK(res?.data.seasonFK?.name);
        setSizes(res?.data?.sizes);
        setShoesizes(res?.data?.shoesizes);
        setSubcategoryFK(res?.data?.subcategoryFK?.name);
        setIsNew_(res?.data?.isNew_);
        setHabillement(res.data)
        setLoader(false)
      });
    };
  useEffect(() => {
    fetchOne();
    retrieveImage(id)
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("id")) {
      retrieveFavoris(user);
    }
    const fetchSuggestions = async () => {
      await hbs.fetchBySubcategory(subcategoryFK?._id).then((res) => {
        setSuggestions(res.data);
      });
    };
    fetchSuggestions();
    favorisUser.forEach((item) => {
      if (item.habillementFK._id === id) {
        setShow1(true);
      }
    });
    
  }, [id]);
  const addToFavoris = async (idHb) => {

    await Axios.post(`/favoris/save`,{habillementFK: idHb, idUser: user})
    .then((res) => {
      if(res.status===200){
        toast.success("Ajouté au favoris")
      }   
    })
    .catch(
      (err)=>toast.error("Déjà favoris")
    )
    
  }
  const props = {
    width: 450,
    height: 200,
    zoomHeight: 100,
    img: `${process.env.REACT_APP_URL_UPLOAD}habillements/${img}`,
  };


  const handleZoom=(hb)=>{
    sethbImage(hb)
    setShow2(true)
  }
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
    <div className="container mt-5 pt-5">
      <div className="product-box row">
        <div className="col-lg-6 col-md-8 col-sm-12 mx-5" >
        <Carousel
          useKeyboardArrows={true}
          infiniteLoop={true}
          emulateTouch={true}
          dynamicHeight={true}
          showArrows={false}

          
        >
          {SousImages ? (
            <div onClick={handleShow}>
            <img
            
            src={props.img}
            //width={props.width}
            alt=""
            />

            </div>
          ) : (
            <></>
          )}
          {SousImages.map((item, index) => (

            <div key={index} className="container" onClick={()=>{handleZoom(item.hbImg)}}>
             

              <img
                
                src={`${process.env.REACT_APP_URL_UPLOAD}habillements/hb_images/${item.hbImg}`}
                alt="détail-activité-img"
                />

                
              
            </div>
          ))}
        </Carousel>
         
          <Modal show={show} onHide={handleClose}>
            <Button
              style={{
                backgroundColor: "#FEADDB",
                border: "1px solid transparent",
              }}
              onClick={handleClose}
            >
              Fermer
            </Button>
            <ReactPanZoom image={props.img} alt={name} />
          </Modal>


          <Modal show={show2} onHide={handleClose1}>
            <Button
              style={{
                backgroundColor: "#FEADDB",
                border: "1px solid transparent",
              }}
              onClick={handleClose1}
            >
              Fermer
            </Button>
            <ReactPanZoom image={`${process.env.REACT_APP_URL_UPLOAD}habillements/hb_images/${hbImage}`} alt={name} />
          </Modal>
        </div>

        <div className="product-content">
          {!isNew_ ? (
            <div className="row">
              <div className="col-12">
                <h2>{name}</h2>
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="col-8">
                <h3>{name}</h3>
              </div>
              <div className="col-3">
                <Button
                  disabled
                  style={{
                    backgroundColor: "#FEADDB",
                    border: "1px solid transparent",
                  }}
                >
                  <Badge>
                    <i className="fa fa-check" /> Nouveau
                  </Badge>
                </Button>
              </div>
            </div>
          )}

          <p>{description}</p>
          <h6>Marque de l'article</h6>
          <p>{brandFK}</p>
          <div className="price-option">
            <h2>Prix</h2>
            <p className="price">
              {price} {"TND"}
            </p>
          </div>

          {sizes.length === 0 ? (
            <p className="alert alert-info">Pas de données trouvées</p>
          ) : (
            <div>
              <h6>Les tailles disponibles</h6>
              {sizes.map((item, index) => (
                <Button
                  size="sm"
                  variant="outlined"
                  color="secondary"
                  className="mx-1"
                  key={index}
                >
                  {item}
                </Button>
              ))}
            </div>
          )}

          {shoesizes.length === 0 ? (
            <p className="alert alert-info">Pas de données trouvées</p>
          ) : (
            <div>
              <h6>Les pointures disponibles</h6>
              {shoesizes.map((item, index) => (
                <Button
                  size="sm"
                  variant="outlined"
                  color="secondary"
                  className="mx-1"
                  key={index}
                >
                  {item}
                </Button>
              ))}
            </div>
          )}
          <div className="price-option mt-2">
            <h6>Type de l'article</h6>
            <small>{subcategoryFK}</small>
          </div>
          <div className="price-option mt-2">
            <h6>Saison</h6>
            <small>{seasonFK}</small>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            {
              sessionStorage.getItem("id") && (
                <button
                  onClick={() => addToFavoris(id)}
                  style={{ border: "none", color: "white" }}
                  className="red_button shop_now_button"
                  disabled={show1}
                >

                  <i className="fas fa-heart" style={{color: "#ffffff"}}></i> Ajouter favoris
                </button>
              )
            }
            <button
                  style={{ border: "none", color: "white" }}
                  className="red_button shop_now_button mx-2"
                  onClick={()=>addToCart(habillement)}
                >

                  <i className="fas fa-cart-plus" style={{color: "#ffffff"}} ></i> Ajouter panier
                </button>

          </div>
        </div>
      </div>
      <div className="container">
        {suggestions.length !== 0 ? (
          <div className="row">
            <h3>Voici des habillements similaires</h3>
            {/*             <Carousel className="pt-4 mt-4 px-5" responsive={responsive}>
             */}{" "}
            {suggestions &&
              suggestions.map((item, index) => (
                <div key={index} data-aos="fade-up" className="mt-5 col-4">
                  <img
                    alt={item.name}
                    src={`${process.env.REACT_APP_URL_UPLOAD}habillements/${item.img}`}
                    height={290}
                    width={250}
                  />
                  <div className="red_button shop_now_button col-9 d-flex justify-content-center align-items-center">
                    <a
                      href={`/tavyissa/habillement/details/${item._id}`}
                      style={{ textTransform: "none" }}
                      className="w-100"
                    >
                      Voir détails
                    </a>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <></>
        )}
       
      </div>
    </div>
  );
}

export default DétailHabillement;
