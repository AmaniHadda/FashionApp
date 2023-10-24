/*
 ** Author: Santosh Kumar Dash
 ** Author URL: http://santoshdash.epizy.com/
 ** Github URL: https://github.com/quintuslabs/fashion-cube
 */

import React, { Component } from "react";
import { Link } from "react-router-dom";
import HomeCartView from "../HomeCartView";
import MobileMenu from "../MobileMenu";
import device from "../../modules/mediaQuery";
import MediaQuery from "react-responsive";
import LoginRegister from "../LoginRegisterModal";
import { FavorisService } from "../../services/FavorisService";

import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Axios from "axios";
import { withTranslation } from 'react-i18next';
import jumpTo from "../../modules/Navigation";
import { NavLink } from 'react-router-dom';


import "./navbar.css"

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      modalShow1: false,
      activeclass: false,

      login: true,
      favoris: [],
      logo: null,
    };
  }
  favorisService = new FavorisService();
  loginClicked = () => {
    this.setState({ modalShow1: true });
    this.setState({ login: true });
  };

  VerifyLogin = () => {
    if (sessionStorage.getItem("name")) {
      jumpTo("/tavyissa/rendezvous")
    } else {
      this.setState({ modalShow1: true });
      this.setState({ login: true });
    }
  }
  registerClicked = () => {
    this.setState({ modalShow1: true });
    this.setState({ login: false });
  };

  getLogo = async () => {
    try {
      const response = await Axios.get("/logo");
      const logo = response.data[0]
      this.setState({ logo });
    } catch (error) {
      console.error("Error retrieving logo:", error);
    }
  };
  componentDidMount() {
    this.getLogo()
    if (Object.keys(this.props.cart).length < 1) {
      this.props.getCartByUserId();
      if (sessionStorage.getItem("id")) {
        this.favorisService.retrieveByUser(sessionStorage.getItem("id")).then(res => this.setState({ favoris: res.data }))
      }
    }
  }
  componentDidUpdate() {
    if (sessionStorage.getItem("id")) {
      this.favorisService.retrieveByUser(sessionStorage.getItem("id")).then(res => this.setState({ favoris: res.data }))
    }
  }
  showHideModal = () => {
    this.setState({ modalShow: !this.state.modalShow });
  };
  showHideModal1 = () => {

    if (sessionStorage.getItem("name")) {
      window.location.href = "/tavyissa/favoris"
    } else {
      this.setState({ modalShow1: !this.state.modalShow1 });
    }
    console.log(this.state.modalShow1)
  };
  handleMenuClicked = () => {
    this.setState({ activeclass: !this.state.activeclass });
  };
  render() {

    const { t } = this.props;
    const { cart } = this.props;
    const { logo } = this.state;
    return (
      <div className="main_nav_container">
        <div className="container">
          <div className="row">    
            <div className="col-lg-12 text-right">
              <div className="logo_container">
                <Link to="/tavyissa">

                  {logo ? ( 
                    <img height={70} width={140} src={`${process.env.REACT_APP_URL_UPLOAD}logo/${logo.logo}`} alt="Logo" />
                  ) : (
                    <span></span>
                  )}
                </Link>
              </div>
              <nav className="navbar ">
                <ul className="navbar_menu">
                  <li>
                    <NavLink exact to="/tavyissa" activeClassName="activeLink">
                      {t('navbar.Accueil')}
                    </NavLink>                  
                    </li>
                  
                    <li className="mega-drop-down">
                      <NavLink to="/tavyissa/abonnements" activeClassName="activeLink">
                        {t('navbar.Abonnements')}
                      </NavLink>
                    </li>                  
                    
                  <li className="mega-drop-down">
                    <NavLink to="/tavyissa/habillements" activeClassName="activeLink">{t('navbar.Habillements')}</NavLink>
                  </li>

                  <li>
                    <NavLink to="/tavyissa/aide" activeClassName="activeLink">{t('navbar.Comment')}</NavLink>
                  </li>
                  <li>
                    <a className="rdv" onClick={this.VerifyLogin}>{t('navbar.Rendez-Vous')}</a>
                  </li>
                </ul>
                <ul className="navbar_user">
                  <li className="checkout ">

                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 250, hide: 400 }}
                      overlay={<Tooltip id="button-tooltip" >
                        Favoris
                      </Tooltip>}
                    >
                      <a href="#" onClick={() => this.showHideModal1()}>
                        <i className="fas fa-heart"></i>
                        {this.state.favoris !== undefined && (
                          <span id="checkout_items" className="checkout_items">
                            {this.state.favoris.length}
                          </span>
                        )}
                      </a>
                    </OverlayTrigger>
                  </li>


                  <li className="checkout mx-1">
                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 250, hide: 400 }}
                      overlay={<Tooltip id="button-tooltip" >
                        Panier
                      </Tooltip>}
                    >
                      <a href="#" onClick={() => this.showHideModal()}>
                        <i className="fas fa-shopping-bag"></i>
                        {cart.length !== undefined && (
                          <span id="checkout_items" className="checkout_items">
                            {cart.length}
                          </span>
                        )}
                      </a></OverlayTrigger>
                  </li>

                </ul>
                <div
                  className="hamburger_container"
                  onClick={() => this.handleMenuClicked()}
                >
                  <i className="fa fa-bars" aria-hidden="true"></i>
                </div>
              </nav>
            </div>
          </div>
        </div>
        <MediaQuery query={device.max.tabletL}>
          <MobileMenu
            activeClass={this.state.activeclass}
            onClose={() => this.handleMenuClicked()}
          />
        </MediaQuery>
        {this.state.modalShow ? (
          <HomeCartView
            cart={cart}
            show={this.state.modalShow}
            onHide={() => this.showHideModal()}
          />
        ) : null}
        {this.state.modalShow1 ? (

          <LoginRegister
            show={this.state.modalShow1}
            login={this.state.login}
            registerClicked={() => this.registerClicked()}
            loginClicked={() => this.loginClicked()}
            onHide={() => this.showHideModal1()}
          />
        ) : null}
      </div>
    );
  }
}


const TranslatedComponent = withTranslation()(NavBar);

export default TranslatedComponent;
