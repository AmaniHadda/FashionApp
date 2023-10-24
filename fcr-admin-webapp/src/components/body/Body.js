
import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ActivationEmail from "./auth/ActivationEmail";
import ForgotPass from "../body/auth/ForgotPassword";
import ResetPass from "../body/auth/ResetPassword";
import Profile from "../body/profile/Profile";
import EditUser from "./profile/EditUser";
import Home from "../../Pages/Home/Home";
import { useSelector } from "react-redux";

function Body() {
  const auth = useSelector((state) => state.auth);
  const { isLogged, isAdmin } = auth;
  return (
    <section>
      <Switch>
        <Route
          path="/"
          component={isLogged ? (isAdmin ? Home : "") : Login}
          exact
        />

        <Route path="/register" component={isLogged ? "" : Register} exact />
        <Route
          path="/forgot_password"
          component={isLogged ? "" : ForgotPass}
          exact
        />

        <Route
          path="/user/reset/:token"
          component={isLogged ? "" : ResetPass}
          exact
        />
        <Route
          path="/user/activate/:activation_token"
          component={ActivationEmail}
          exact
        />
        <Route path="/profile" component={isLogged ? Profile : ""} exact />
        <Route
          path="/edit_user/:id"
          component={isAdmin ? EditUser : ""}
          exact
        />
      </Switch>
    </section>
  );
}

export default Body;

