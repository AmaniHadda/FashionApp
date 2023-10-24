
import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button } from "@mui/material";
import { FaGlobe, FaUserAlt } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";

function Header() {
  const auth = useSelector((state) => state.auth);
  const { user, isLogged } = auth;
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await axios.get("/user/logout");
      localStorage.removeItem("firstLogin");
      localStorage.clear();
      window.location.reload();
      window.location.href = "/";
    } catch (err) {
      window.location.href = "/";
    }
  };

  const handleProfileClick = () => {
    history.push("/info");
  };

  const userLink = () => {
    return (
      <ul>
        <li>
          <a
            style={{ marginRight: "80vh" }}
            href={"http://185.192.96.18:31981/tavyissa"}
            target="_blank"
          >
            <Button variant="contained" style={{ backgroundColor: "#d499ac" }}>
              <FaGlobe />{" "}
              <span style={{ marginLeft: "2px" }}> Accéder au site web</span>
            </Button>
          </a>
        </li>
        <li className="drop-nav">
          <NavLink to="#" className="avatar">
            <img src={user.avatar} alt="" /> {user.name}           
          </NavLink>

          <ul className="dropdown">
            <li>
              <NavLink to="/info" onClick={handleProfileClick}>
               <FaUserAlt /> Profil
              </NavLink>
            </li>
            <li>
              <NavLink to="/" onClick={handleLogout}>
                <BiLogOut /> Logout
              </NavLink>
            </li>
          </ul>
        </li>
      </ul>
    );
  };

  const transform = {
    transform: isLogged ? "translateY(-5px)" : 0,
  };

  return (
    <header>
      <div className="logo">
        <h1>
          <NavLink to="/"></NavLink>
        </h1>
      </div>
      <ul style={transform}>
        {isLogged ? (
          userLink()
        ) : (
          <li>
            <NavLink to="/"></NavLink>
          </li>
        )}
      </ul>
    </header>
  );
}

export default Header;
