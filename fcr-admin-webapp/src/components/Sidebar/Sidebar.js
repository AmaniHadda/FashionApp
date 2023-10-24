
import React, { useEffect, useState } from "react";
import { AiTwotoneShop } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { routes } from "../../data/dummy";
import { routesUser } from "../../data/dummy";
import { routesHabillemnts } from "../../data/dummy";
import { routesCRM } from "../../data/dummy";
import { routesRDV } from "../../data/dummy";
import { hbAb } from "../../data/dummy";
import { historique } from "../../data/dummy";

import "./Sidebar.scss";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import { SiCivicrm } from "react-icons/si";
import { BiCategory } from "react-icons/bi";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { FiUsers } from "react-icons/fi";

const Sidebar = () => {
  const [logo, setLogo] = useState("")
  const getLogo = async () => {
    try {
      const response = await axios.get(" /logo");
      const logo = response.data[0]
      console.log(response.data[0])
      setLogo(logo);
      console.log(logo)
    } catch (error) {
      console.error("Error retrieving logo:", error);
    }
  };
  useEffect(() => {
    getLogo()
  }, [])
  
  const history = useHistory()
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const [showDropdownType, setShowDropdownType] = useState(false);

  const toggleDropdownType = () => {
    setShowDropdownType(!showDropdownType);
  };
  const [showDropdownCRM, setShowDropdownCRM] = useState(false);

  const toggleDropdownCRM = () => {
    setShowDropdownCRM(!showDropdownCRM);
  };
  return (
    <div className="app__sidebar">
    <div className="sidebar__header">
      <div>
        {logo ? (
          <img height={70} width={150} src={` ${process.env.REACT_APP_URL_UPLOAD}/logo/${logo.logo}`} alt="Logo" />
        ) : (
          <span>Loading logo...</span>
        )}
      </div>
    </div>
    <hr style={{marginTop:"30px", height:"2px", backgroundColor:"pink"}}/>
    <div className="sidebar__routes">
      <ul>       
        {routes.map((route) => (  
          <li key={route.icon}>
            <a href="#" onClick={() => history.push(route.path)}>
              <route.icon />
              <span>{route.name}</span>
            </a>
          </li>
        ))}
        {routesRDV.map((route) => (
          <li key={route.icon}>
            <a href="#" onClick={() => history.push(route.path)}>
              <route.icon />
              <span>{route.name}</span>
            </a>
          </li>
        ))}
        <li>
          <a href="#" onClick={toggleDropdown}><FiUsers /><span>Utilisateurs et contacts</span> {!showDropdown?<MdExpandMore style={{marginLeft:"auto"}}/>:<MdExpandLess style={{marginLeft:"auto"}}/>}</a>
          {showDropdown && (
            <ul>
              {routesUser.map((route) => (
                 <li key={route.icon}>
                 <a href="#" onClick={() => {history.push(route.path)}}>
                   <route.icon style={{fontSize:"14px", marginLeft:"15px"}} />
                   <span style={{fontSize:"14px"}}>{route.name}</span>
                 </a>
               </li>
              ))}
            </ul>
          )}
        </li>
        <li>
          <a href="#" onClick={toggleDropdownType}><BiCategory /><span>Types habillements</span>{!showDropdownType?<MdExpandMore style={{marginLeft:"auto"}}/>:<MdExpandLess style={{marginLeft:"auto"}}/>}</a>
          {showDropdownType && (
            <ul>
              {routesHabillemnts.map((route) => (
                 <li key={route.icon}>
                 <a href="#" onClick={() => history.push(route.path)}>
                   <route.icon style={{fontSize:"14px", marginLeft:"15px"}}/>
                   <span style={{fontSize:"14px"}}>{route.name}</span>
                 </a>
               </li>
              ))}
            </ul>
          )}
        </li>
        {hbAb.map((route) => (
          <li key={route.icon}>
            <a href="#" onClick={() => history.push(route.path)}>
              <route.icon />
              <span>{route.name}</span>
            </a>
          </li>
        ))}
 <li>
          <a href="#" onClick={toggleDropdownCRM}><SiCivicrm /><span>CRM</span>{!showDropdownCRM?<MdExpandMore style={{marginLeft:"auto"}}/>:<MdExpandLess style={{marginLeft:"auto"}}/>}</a>
          {showDropdownCRM && (
            <ul>
              {routesCRM.map((route) => (
                 <li key={route.icon}>
                 <a  href="#" onClick={() => history.push(route.path)}>
                   <route.icon style={{fontSize:"14px", marginLeft:"15px"}} />
                   <span style={{fontSize:"14px"}}>{route.name}</span>
                 </a>
               </li>
              ))}
            </ul>
          )}
        </li>
        {historique.map((route) => (
          <li key={route.icon}>
            <a href="#" onClick={() => history.push(route.path)}>
              <route.icon />
              <span>{route.name}</span>
            </a>
          </li>
        ))}
        
      </ul>
    </div>
  </div>
  );
};

export default Sidebar;
