import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Chart from "react-apexcharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faTshirt,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import "./HomeCount.scss";

const HomeCount = () => {
  const [statistics, setStatistics] = useState({
    totalUtilisateurs: 0,
    totalContacts: 0,
    totalHabillements: 0,
    totalRendezvous: null, // Initialize as null
  });
  const [total, setTotal] = useState(0);
  const [month, setMonth] = useState("");

  useEffect(() => {
    const fetch = async () => {    
      try {
        const response = await axios.get("/contact/countbyday");
        console.log(response.data)
        if (response.status === 200) {
          const total = response.data.map((item) => item.count);
          const month = response.data.map((item) => item._id.day);
          setTotal(total);
          setMonth(month);
        }
      } catch (error) {}
    };
    fetch();
  }, []);

  const chartOptions = {
    series: [
      {
        name: "Contacts créés",
        data: total,
        fill: {
          colors: ["#56ce56"], 
          backgroundColor: ["#56ce56"], 
          type: 'gradient', 
          zoom: false,
        },
      },
    ],
    options: {
      colors: ["#56ce56"],
      chart: {
        background: "transparent",
        stacked: true,
        toolbar: {
          show: false, // Cacher la barre d'outils
        },
      },
      dataLabels: {
        enabled: false,
        show: false,
      },
      stroke: {
        curve: "smooth",
        background: "#ff0000",
      },
      xaxis: {
        labels: {
          show: false, // Cacher les étiquettes de l'axe X
        },
        axisBorder: {
          show: false, // Cacher la bordure de l'axe X
        },
        axisTicks: {
          show: false, // Cacher les ticks de l'axe X
        },
      },
      yaxis: {
        show: false,
      },
      markers: {
        size: 0,
      },
      grid: {
        show: false,
      },
      toolbar: {
        show: false, // Cacher le zoom
      },
    },
  };
  
  
  const users = useSelector((state) => state.users);

  useEffect(() => {
    const totalUtilisateurs = users.length;
    setStatistics((prevStatistics) => ({
      ...prevStatistics,
      totalUtilisateurs,
    }));
  }, [users]);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const UsersResponse = await axios.get("/user/count");
        if (UsersResponse.status === 200) {
          const totalUtilisateurs = UsersResponse.data.data;
          setStatistics((prevStatistics) => ({
            ...prevStatistics,
            totalUtilisateurs,
          }));
        }

        const habillementsResponse = await axios.get("/habillements/retrieve/");
        if (habillementsResponse.status === 200) {
          const totalHabillements = habillementsResponse.data.data.length;
          setStatistics((prevStatistics) => ({
            ...prevStatistics,
            totalHabillements,
          }));
        }

        const contactsResponse = await axios.get("/contact/allinfomrations/");
        if (contactsResponse.status === 200) {
          const totalContacts = contactsResponse.data.length;
          setStatistics((prevStatistics) => ({
            ...prevStatistics,
            totalContacts,
          }));
        }

        const RendezvousResponse = await axios.get("/api/meetings/", {
          params: {
            page: 1,
            perPage: 100, // Set a larger value to fetch more rendezvous
          },
        });

        if (RendezvousResponse.status === 200) {
          const responseData = RendezvousResponse.data;
          const totalRendezvous =
            responseData &&
            responseData.meetings &&
            Array.isArray(responseData.meetings)
              ? responseData.meetings.length
              : 0;

          setStatistics((prevStatistics) => ({
            ...prevStatistics,
            totalRendezvous,
          }));
        } else {
          setStatistics((prevStatistics) => ({
            ...prevStatistics,
            totalRendezvous: 0,
          }));
        }
      } catch (error) {
        console.error("Erreur lors du chargement des statistiques :", error);
      }
    };

    fetchStatistics();
  }, []);
  return (
    <>
      <div className="home__count">
        <div className="home__items" style={{backgroundColor: "#E0F7D8"}}>
          <div className="item__title">Total Utilisateurs</div>
          <div className="item__count">
            <FontAwesomeIcon
              style={{ color: "black" }}
              icon={faUser}
              className="item__icon"
            />
            <p>{statistics.totalUtilisateurs} Utilisateurs</p>
          </div>
        </div>
        <div className="home__items" style={{backgroundColor: "pink"}}>
          <div className="item__title">Total Messages</div>
          <div className="item__count item__count--small">
            <FontAwesomeIcon
              style={{ color: "black" }}
              icon={faEnvelope}
              className="item__icon"
            />

            <p>{statistics.totalContacts} Messages</p>
          </div>
        </div>
        <div className="home__items" style={{backgroundColor:"#FFFFE0"}}>
          <div className="item__title">Total Habillements</div>

          <div className="item__count item__count--small">
            <FontAwesomeIcon
              style={{ color: "black" }}
              icon={faTshirt}
              className="item__icon"
            />

            <p>{statistics.totalHabillements} Habillements</p>
          </div>
        </div>
        <div className="home__items" style={{backgroundColor:"#ADD8E6"}}>
          <div className="item__title">Total Rendez-vous</div>
          <div className="item__count">
            <FontAwesomeIcon
              style={{ color: "black" }}
              icon={faCalendarAlt}
              className="item__icon"
            />
            <p>{statistics.totalRendezvous} Rendez-vous</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeCount;