import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

const ParrainChart = () => {
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get("/parrain/nombre-parrains");
        if (response.status === 200) {
          setStatistics(response.data.data);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des statistiques:",
          error
        );
      }
    };
    fetchStatistics();
  }, []);

  const chartData = {
    series: [
      {
        name: "Nombre d'utilisateurs",
        data: statistics.map((stat) => stat.nombreUtilisateurs),
      },
    ],
    options: {
      colors: ["#e28998"],
      chart: {
        background: "transparent",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: statistics.map((stat) => {const index=stat.parrain.indexOf("@"); return stat.parrain.slice(0,index)}),
      },
      legend: {
        name: "test",
        label: "test",
        position: "top",
      },
      grid: {
        show: false,
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.5,
          //gradientToColors: [""],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      }
    },
  };

  return (
    <div>
      <h3>Nombre de parrains par utilisateur</h3>
      <div style={{ height: 300, marginTop: 48 }} className="barChat">
        <Chart
          options={chartData.options}
          series={chartData.series}
          height={"100%"}
          type="bar"
        />
      </div>
    </div>
  );
};

export default ParrainChart;