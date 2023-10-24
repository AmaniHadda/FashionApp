import React, { useEffect, useState } from "react";
import "./ChartContainer.scss";
import Chart from "react-apexcharts";
import axios from "axios";

const UserChart = () => {
  const [statistics, setStatistics] = useState({
    totalParraine: 0,
    totalNonParraine: 0,
  });

  useEffect(() => {
    const fetchParraineUsers = async () => {
      try {
        const response = await axios.get("/parrain/users/parrainés");
        if (response.status === 200) {
          const totalParraine = response.data.data.length;
          setStatistics((prevStatistics) => ({
            ...prevStatistics,
            totalParraine,
          }));
        }
      } catch (error) {}
    };
    fetchParraineUsers();

    const fetchNonParraineUsers = async () => {
      try {
        const response = await axios.get("/parrain/users/nonparrainés");
        if (response.status === 200) {
          const totalNonParraine = response.data.data.length;
          setStatistics((prevStatistics) => ({
            ...prevStatistics,
            totalNonParraine,
          }));
        }
      } catch (error) {}
    };
    fetchNonParraineUsers();
  }, []);

  const chartData = {
    series: [
      {
        name: "Nombre d'utilisateurs",
        data: [statistics.totalParraine, statistics.totalNonParraine],
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
        categories: ["Parrainé", "Non Parrainé"],
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
      <h3>Utilisateurs Parrainés</h3>
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

export default UserChart;