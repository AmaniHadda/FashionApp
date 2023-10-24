/*
 ** Author: Santosh Kumar Dash
 ** Author URL: http://santoshdash.epizy.com/
 ** Github URL: https://github.com/quintuslabs/fashion-cube
 */

import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import BaseLayout from "../layouts/BaseLayout";

// Route Views
import Home from "../views/Home/HomeContainer";
import CategoryContainer from "../views/Category/CategoryContainer";
import Abonnements from "../views/Abonnements/Abonnements";
import Aide from "../views/Aide/Aide";
import RendezVous from "../views/RendezVous/RendezVous";
import Habillements from "../views/Habillements/Habillements";
import DétailHabillement from "../views/Habillements/DétailHabillement";
import UserProfile from "../components/Profile/UserProfile";
import Cart from "../views/Cart/Cart";
import Favoris from "../components/Favoris/Favoris";

import ActivationEmail from "../components/LoginRegisterModal/ActivationEmail";
import RegisterForm from "../components/LoginRegisterModal/RegisterForm";
import ResetPassword from "../components/LoginRegisterModal/ResetPassword";
import ForgotPassword from "../components/LoginRegisterModal/ForgotPassword";
import PageNotFound from "../views/PageNotFound";
var routes = [
  {
    path: "/tavyissa",
    exact: true,
    layout: BaseLayout,
    component: Home,
  },

  {
    path: "/home",
    layout: BaseLayout,
    component: () => <Redirect to="/tavyissa" />,
  },
  {
    path: "/tavyissa/category",
    layout: BaseLayout,
    component: CategoryContainer,
  },
  {
    path: "/tavyissa/abonnements",
    layout: BaseLayout,
    component: Abonnements,
  },
  {
    path: "/tavyissa/habillements",
    layout: BaseLayout,
    component: Habillements,
  },
  {
    path: "/tavyissa/habillement/details/:id",
    layout: BaseLayout,
    component: DétailHabillement,
  },
  {
    path: "/tavyissa/cart",
    layout: BaseLayout,
    component: Cart,
  },
  {
    path: "/tavyissa/favoris",
    layout: BaseLayout,
    component: Favoris,
  },
  {
    path: "/tavyissa/aide",
    layout: BaseLayout,
    component: Aide,

  },
  
  {
    path: "/profile",
    layout: BaseLayout,
    component: UserProfile,
  },
  {
    path: "/tavyissa/rendezvous",
    layout: BaseLayout,
    component: RendezVous,
  },

  {
    path: "/user/activate/:activation_token",
    component: ActivationEmail,
    layout: BaseLayout,
  },
  {
    path: "/forgot_password",
    layout: BaseLayout,
    component: ForgotPassword,
  },
  {
    path: "/user/reset/:token",
    layout: BaseLayout,
    component: ResetPassword,
  },
  {
    path: "/login",
    layout: BaseLayout,
    component: () => {if(!sessionStorage.getItem('id')){ return<Home show={true}/> }else{ return <PageNotFound/>}},
  },
  {
    path: "/registarion",
    layout: BaseLayout,
    component: RegisterForm,
  },
  {
    path: "/",
    layout: BaseLayout,
    component: () => <Redirect to="/tavyissa" />,
  }
];

export default routes;
