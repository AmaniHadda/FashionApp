/*
 ** Author: Santosh Kumar Dash
 ** Author URL: http://santoshdash.epizy.com/
 ** Github URL: https://github.com/quintuslabs/fashion-cube
 */

import React, { Component } from "react";
import PropTypes from "prop-types";

class MobileMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:sessionStorage.getItem("name")
    };
  }
  handleLogout = () => {
    sessionStorage.clear();
    window.location.reload();
  }

  render() {
    return (
      <div
        className={
          this.props.activeClass ? "hamburger_menu active" : "hamburger_menu"
        }
      >
        <div className="hamburger_close" onClick={this.props.onClose}>
          <i className="fa fa-times" aria-hidden="true"></i>
        </div>
        <div className="hamburger_menu_content text-right">
          <ul className="menu_top_nav">
            <li className="menu_item has-children">
              <a href="/tavyissa">
              Accueil
              </a>
            </li>
            <li className="menu_item has-children">
              <a href="/tavyissa/abonnements">Abonnements</a>
            </li>
            <li className="menu_item has-children">
              <a href="/tavyissa/habillements">Habillements</a>
            </li>
            <li className="menu_item has-children">
              <a href={this.state.name?"/tavyissa/rendezvous":"/login"}>Rendez-Vous</a>
            </li>
            <li className="menu_item has-children">
              <a href="/tavyissa/aide">Comment ça marche</a>
            </li>
            {!this.state.name && 
              <li className="menu_item has-children">
                <a href="/login">
                  Se connecter
                </a>
              </li>
            }
            {this.state.name && 
              <li className="menu_item has-children">
                <a href="/profile">
                  Mon compte
                </a>
              </li>
            }
            {this.state.name && 
              <li className="menu_item has-children">
                <a href="#" onClick={this.handleLogout}>
                  Déconnexion
                </a>
              </li>
            }
          </ul>
        </div>
      </div>
    );
  }
}
MobileMenu.propTypes = {
  activeClass: PropTypes.bool,
  onClose: PropTypes.func,
};

export default MobileMenu;
