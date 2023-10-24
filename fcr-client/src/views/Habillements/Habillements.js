import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Spinner from "react-bootstrap/Spinner";
import { Button, Card, Col } from "react-bootstrap";
import { SubCategoriesService } from "../../services/SubCategoriesService";
import { HabillementService } from "../../services/HabillementService";
import { BrandService } from "../../services/BrandService";
import { SeasonService } from "../../services/SeasonService";
import { SizesService } from "../../services/SizesService";
import { ShoeSizeService } from "../../services/ShoeSizeService";
import { useDispatch, useSelector } from "react-redux";
import { ADD } from "../../redux/actions/CartAct";
import { ToastContainer, toast } from "react-toastify";
import "./Habillements.css"
import { useTranslation } from 'react-i18next'
import "react-toastify/dist/ReactToastify.css";
import Axios from "axios";
import { DotSpinner } from "@uiball/loaders";
function Habillements() {
  const subCategoryService = new SubCategoriesService();
  const habillementService = new HabillementService();
  const brandService = new BrandService();
  const seasonService = new SeasonService();
  const sizeService = new SizesService();
  const shoesizeService = new ShoeSizeService();
  const [load, setLoadMore] = useState(false)
  const dispatch = useDispatch()
  const [subCategories, setSubCategories] = useState([]);
  const [habillements, setHabillements] = useState([]);
  const [allHabillements, setAllHabillements] = useState([]);
  const [brands, setBrands] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [shoesizes, setShoesizes] = useState([]);
  const [loader, setLoader] = useState(false);
  const items = useSelector((state) => state.cartRed.carts)
  const { t } = useTranslation()
  const [isRecentlySeen, setIsRecentlySeen] = useState(false);
  const [dateRecentlySeen, setDateRecentlySeen] = useState();
  const [visibleItems, setVisibleItems] = useState(6);
  const date = new Date();


  const loadMoreItems = () => {
    setVisibleItems(prevVisibleItems => prevVisibleItems + 5);
  };
  const handleClickLoad = () => {
    setLoadMore(true);
    setTimeout(() => {
      setLoadMore(false);
      loadMoreItems();
    }, 2000);
  }
  const addToCart = (e) => {
    for(let i=0 ;i<5 ;i++){
    if (items[i]?._id === e._id) {
      return toast.error(e.name + "est déja dans le panier ")
    }}
    dispatch(ADD(e))
      return toast.success(e.name + " a été placé dans le panier.")
  }
  const handleSearch = async (e) => {
    if (e.target.value.length > 0) {
      await Axios.get(`/habillements/searchHabillement/${e.target.value}`).then(res => {
        setHabillements(res.data.data)
      }).catch(err => console.log(err))
    } else {
      setHabillements(allHabillements)
    }
  }
  const handle = (_id) => {

    habillementService.handleRecently(_id, { dateRecentlySeen: date, isRecentlySeen: true }).then((res) => {
      console.log(res);
      setIsRecentlySeen(isRecentlySeen);
      setDateRecentlySeen(dateRecentlySeen);

      window.location.href = `/tavyissa/habillement/details/${_id}`;
    });
  }

  const [isLoading, setIsLoading] = useState(true);

  const handleImgLoading = () => {
    setIsLoading(false);
  };
  const fetchSub = async () => {
    await subCategoryService.fetch().then((res) => {
      setSubCategories(res.data);
    });
  };

  const fetchHb = async () => {
    setLoader(true)
    await habillementService.fetch().then((res) => {
      setHabillements(res.data);
      setAllHabillements(res.data)
      setLoader(false)

      console.log(res.data);
    });
  };


  const fetchSeasons = async () => {
    await seasonService.fetch().then((res) => {
      setSeasons(res.data);
    });
  };

  const fetchBrands = async () => {
    await brandService.fetch().then((res) => {
      setBrands(res.data);
    });
  };

  const fetchSizes = async () => {
    await sizeService.retrieve().then((res) => {
      setSizes(res.data);
    });
  };

  const fetchShoeSizes = async () => {
    await shoesizeService.retrieve().then((res) => {
      setShoesizes(res.data);
    });
  };

  const GetSeason = async (e) => {
    await habillementService.filterBySeason(e).then((res) => {
      setHabillements(res.data);
      console.log(res.data);
    });
    console.log(e)
  }
  const GetByBrand = async (e) => {
    await habillementService.filterByBrand(e).then((res) => {
      setHabillements(res.data);
      console.log(res.data);
    });
    console.log(e)
  }
  const GetBySize = async (e) => {
    await habillementService.filterBySize(e).then((res) => {
      setHabillements(res.data);
      console.log(res.data);
    });
    console.log(e)
  }
  const GetByShoesSizes = async (e) => {
    await habillementService.filterByShoesSizes(e).then((res) => {
      setHabillements(res.data);
      console.log(res.data);
    });
    console.log(e)
  }
  const GetByPrice = (e) => {
    const value = e.target.value;
    if (value === "asc") {
      const sorted = [...habillements].sort((a, b) => a.price - b.price);
      setHabillements(sorted);
    }
    else {
      const sorted = [...habillements].sort((a, b) => b.price - a.price);
      setHabillements(sorted);
    }
  }
  const handleFilters = (id) => {
    habillementService.filterBySubcategory(id).then((res) => setHabillements(res.data));
  }
  const filterbynewest = async () => {
    await habillementService.lastTendances().then((res) => setHabillements(res.data));
  }
  const Fetching = async () => {
    fetchSub();
    fetchHb();
    fetchSeasons();
    fetchBrands();
    fetchSizes();
    fetchShoeSizes();
  }
  useEffect(() => {
    Fetching()
  }, []);

  if (loader) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>

      <DotSpinner
        size={50}
        speed={0.9}
        color="black"
      /></div>
  }

  return (
    <>
      <ToastContainer />
      <div className="container pt-1 Homeb">
        <div
          className="card bg-light w-100 mt-5 pt-5"
          style={{ height: "auto", border: "none" }}
        >

          <h2 className="text-center">{t("Habillements.title1")}</h2>
          <h1
            style={{ color: "#f1bce3", fontWeight: "bold" }}
            className="pb-3 text-center"
          >
            {t("Habillements.title2")}
          </h1>
        </div>
        <div
  className="row justify-content-center align-items-center mb-5 mt-5"
  data-aos="fade-right"
>
  <div className="col-6 col-md-2 mb-2">
    <Button
      name="category"
      variant="outline-light"
      onClick={filterbynewest}
      className="w-100"
      style={{
        borderColor: "#f1bce3",
        backgroundColor: "#f1bce3",
        fontWeight: "bold",
        height: "50px",
        fontSize: 13,
      }}
    >
      <span>
        <i
          style={{ marginRight: "10px", color: "#943278", fontSize: "17px" }}
          className="fas fa-star-half-alt"
        ></i>
        Nouveautés
      </span>
    </Button>
  </div>
  {subCategories &&
    subCategories.map((item, i) => (
      <div key={i} className="col-6 col-md-2 mb-2">
        <Button
          name="category"
          variant="outline-light"
          onClick={() => handleFilters(item._id)}
          className="w-100"
          style={{
            borderColor: "#f1bce3",
            backgroundColor: "#f1bce3",
            fontWeight: "bold",
            height: "50px",
            fontSize: 13,
          }}
        >
          <img
            alt="habillment"
            height={20}
            src={`${process.env.REACT_APP_URL_UPLOAD}subcategories/${item.img}`}
          />{" "}
          {item.name}
        </Button>
      </div>
    ))}
</div>

        <div className="row">
          <div className="col-md-3" data-aos="fade-right">
            <section className="panel mt-3">
              <div className="panel-body">
                <ul className="nav prod-cat">
                  <li >
                    {" "}
                    <form>
                      <div className="mb-4">
                        <div className="shop__sidebar__search">

                          <input type="text" placeholder="Recherche..." onChange={handleSearch} />
                          <i className="fas fa-search"></i>

                        </div>
                        <h3 className="headline">

                          <span>{t("Habillements.Saison")}</span>
                          <Button
                            type="reset"
                            variant="outline-light"
                            className="ml-4 mb-2"
                            style={{ fontSize: "12px", color: "black" }}
                            onClick={fetchHb}
                          >

                            <i className="fas fa-times" style={{ color: "#e470ba" }}></i>
                          </Button>
                        </h3>
                        <div className="seasons">
                        {seasons &&
                          seasons.map((item, index) => (
                            <div className="checkbox" key={index} >
                              <input type="radio" className="mx-2" name="season" onClick={() => GetSeason(item._id)} />
                              {item?.name}
                            </div>
                          ))}
                        </div>
                       
                      </div>
                    </form>
                  </li>
                  <li className="mar">
                    <div className="mt-4">
                      <h3 className="headline">

                        <span>{t("Habillements.Taille")}</span>
                        <Button
                          type="reset"
                          variant="outline-light"
                          className="ml-4 mb-2"
                          style={{ fontSize: "12px", color: "black" }}
                          onClick={fetchHb}
                        >
                          <i className="fas fa-times" style={{ color: "#e470ba" }}></i>
                        </Button>
                      </h3>
                      {sizes &&
                        sizes.map((item2, index2) => (
                          <Button
                            className="sizes mx-1 mt-1"
                            key={index2}
                            size="sm"
                            variant="outline-secondary"
                            onClick={() => GetBySize(item2.name)}
                          >
                            {item2.name}
                          </Button>
                        ))}
                    </div>
                  </li>
                  <li className="mar">
                    <div className="mt-4 ">
                      <form>
                        <h3 className="headline">

                          <span>{t("Habillements.Pointure")}</span>
                          <Button
                            type="reset"
                            variant="outline-light"
                            className="ml-4 mb-2"
                            style={{ fontSize: "12px", color: "black" }}
                            onClick={fetchHb}
                          >
                            <i className="fas fa-times" style={{ color: "#e470ba" }}></i>

                          </Button>
                        </h3>
                        {/* Options de pointure */}
                        {shoesizes &&
                          shoesizes.map((item1, index1) => (
                            <Button
                              className="sizes mx-1 mt-1"
                              key={index1}
                              size="sm"
                              variant="outline-secondary"
                              onClick={() => GetByShoesSizes(item1.name)}
                            >
                              {item1.name}
                            </Button>
                          ))}
                      </form>
                    </div>
                  </li>
                  <li className="mar">
                    <div className="mt-4 ">
                      <form >
                        <h3 className="headline">

                          <span>{t("Habillements.Prix")}</span>
                        </h3>
                        <select className="form-control col-12 col-md-auto" onChange={GetByPrice}>
                          <option value="asc"> Tri ascendant</option>
                          <option value="desc">Tri descendant</option>
                        </select>
                      </form>
                    </div>
                  </li>
                  <li className="mar ">
                    <div className="mt-4 seasons1">
                      <form>
                        <h3 className="headline ">

                          <span>{t("Habillements.Marque")}</span>
                          <Button
                            type="reset"
                            variant="outline-light"
                            className="ml-4 mb-2"
                            style={{ fontSize: "12px", color: "black" }}
                            onClick={fetchHb}
                          >

                            <i className="fas fa-times" style={{ color: "#e470ba" }}></i>
                          </Button>
                        </h3>
                        <div className="seasons">
                        {brands &&
                          brands.map((item, index) => (
                            <div
                              className="checkbox"
                              key={index}
                              onClick={() => GetByBrand(item._id)}
                            >
                              <input type="radio" className="mx-2" name="brand" />
                              {item?.name}
                            </div>
                          ))}</div>
                      </form>
                    </div>
                  </li>
                </ul>
              </div>
            </section>
          </div>

          <div className="col-lg-9 mt-3" data-aos="fade-left">
            <div className="row product-list">
              {habillements.length !== 0 ? (
                habillements.slice(0, visibleItems).map((habillement, i) => (
                  <div key={i} className="col-lg-4 col-md-8 col-sm-12 product__item" >
                    <Card className="img_habillement" style={{ cursor: "pointer" }} onClick={() => handle(habillement._id)}>
                      {isLoading && (
                        <Spinner
                          className="d-flex justify-content-center align-items-center"
                          animation="border"
                          variant="secondary"
                        />
                      )}
                      {habillement.isVenteFlash && <span className="label">Promotion</span>}
                      <img
                        onLoad={handleImgLoading}
                        src={`${process.env.REACT_APP_URL_UPLOAD}habillements/${habillement.img}`}
                        alt={habillement.description}
                        title={habillement.title}
                        height={300}
                        
                      />

                    </Card>
                    <Card.Body className="img_habillement">
                      <div className="row">
                        <div className="col-lg-11 col-md-11 col-sm-11">
                          <div className="product__item__text">
                            <button onClick={() => addToCart(habillement)}>+ Ajouter au panier</button>
                            <small style={{ fontWeight: "600" }}>{habillement.name}</small>
                          </div>



                          <div style={{ textDecoration: habillement.isVenteFlash ? "line-through" : "none" }} className="a">
                            {habillement.price}
                            {"TND"}
                          </div>
                          <b className="a">
                            {habillement.isVenteFlash && habillement.newPrice + "TND"}

                          </b>

                        </div>

                      </div>
                    </Card.Body>
                    <div className="pt-4" />

                  </div>
                ))) : (
                <>
                  <Col className="col-offset-1"></Col>

                  <Col className="col-md-9" style={{ marginTop: "200px" }}>
                    <Card body bg="light" style={{ fontSize: "25px", color: "#ed6fcc", fontWeight: "bold" }}>Aucun article n'est disponible pour le moment.</Card>
                  </Col>
                  <Col className="col-offset-1"></Col>
                </>
              )
              }

            </div>
            <div className="row" style={{ display: 'flex', justifyContent: 'center' }}>
              {visibleItems < habillements.length && (

                <button style={{ border: "none", color: "white", width: "200px" }} className="red_button shop_now_button" disabled={load} onClick={() => handleClickLoad()}>
                  {load && <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />}
                  Afficher plus...
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Habillements;
