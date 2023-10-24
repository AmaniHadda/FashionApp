/*
 ** Author: Santosh Kumar Dash
 ** Author URL: http://santoshdash.epizy.com/
 ** Github URL: https://github.com/quintuslabs/fashion-cube
 */

import React, { Component } from "react";

import Auth from "../../modules/Auth";
import HomeBanner from "../../components/HomeBanner";

import LoginRegister from "../../components/LoginRegisterModal";
import About from "../../components/About/About";
import Help from "../../components/Help/Help";
import Abonnements from "../../components/Abonnements/Abonnements";
import ScrollToTop from "react-scroll-to-top";
import VenteFlash from "../../components/VenteFlash/VenteFlash";
import Rec from "../../components/recemment/Rec";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      modalShow: false,
      login: true,

      show:this.props.show
    };
    this.addToBag = this.addToBag.bind(this);
  }

  componentDidMount() {
    if (!this.props.products) {
      this.props.getAllProducts();
    }
  }

  showHideModal = () => {
    this.setState({ modalShow: false });

    this.setState({ show: false });
  };

  loginClicked = () => {
    this.setState({ modalShow: true, login: true });
  };
  registerClicked = () => {
    this.setState({ modalShow: true, login: false });
  };

  addToBag = (params) => {
    if (
      Auth.getUserDetails() !== undefined &&
      Auth.getUserDetails() !== null &&
      Auth.getToken() !== undefined
    ) {
      let cart = this.props.postCart(params);
      cart.then((res) => {
        console.log(res);
      });
    } else {
      this.setState({ modalShow: true });
    }
  };

  render() {
    return (
      <div className="Homeb">
        <HomeBanner />
        <About />
        <hr
          style={{
            border: "1px solid #f1bce3",
            width: "80%",
            marginRight: "10%",
            marginLeft: "10%",
            marginTop: 80,
          }}
          className="d-flex justify-centent-center align-items-center text-center"
        />
        <Help />
        
        <VenteFlash/>
        <hr
          style={{
            border: "1px solid #f1bce3",
            width: "80%",
            marginRight: "10%",
            marginLeft: "10%",
            marginTop: 80,
          }}
          className="d-flex justify-centent-center align-items-center text-center"
        />
        <Abonnements />
        <hr
          style={{
            border: "1px solid #f1bce3",
            width: "80%",
            marginRight: "10%",
            marginLeft: "10%",
            marginTop: 80,
          }}
          className="d-flex justify-centent-center align-items-center text-center"
        />
        
          <Rec />

        <LoginRegister

          show={this.state.modalShow || this.state.show}
          login={this.state.login}
          registerClicked={() => this.registerClicked()}
          loginClicked={() => this.loginClicked()}
          onHide={() => this.showHideModal()}
        />

        <ScrollToTop smooth />
      </div>
    );
  }
}

export default Home;
