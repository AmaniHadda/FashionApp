
import React, { useEffect, useState } from "react";
import "./ChartContainer.scss";
import Chart from "react-apexcharts";
import axios from "axios";

const BarChart = () => {
  const [statistics, setStatistics] = useState({
    totalWaiting: 0,
    totalApprouve: 0,
    totalReport: 0,
    totalCancel: 0,
    totalReject: 0,
  });
  useEffect(() => {
    const fetchWaiting = async () => {
      try {
        const response = await axios.get("/api/meetings/count/enattente");
        if (response.status === 200) {
          const totalWaiting = response.data.data;
          setStatistics((prevStatistics) => ({
            ...prevStatistics,
            totalWaiting,
          }));
        }
      } catch (error) {}
    };
    fetchWaiting();

    const fetchApprouve = async () => {
      try {
        const response = await axios.get("/api/meetings/count/approuve");
        if (response.status === 200) {
          const totalApprouve = response.data.data;
          setStatistics((prevStatistics) => ({
            ...prevStatistics,
            totalApprouve,
          }));
        }
      } catch (error) {}
    };
    fetchApprouve();

    const fetchReporte = async () => {
      try {
        const response = await axios.get("/api/meetings/count/reporte");
        if (response.status === 200) {
          const totalReport = response.data.data;
          setStatistics((prevStatistics) => ({
            ...prevStatistics,
            totalReport,
          }));
        }
      } catch (error) {}
    };
    fetchReporte();

    const fetchReject = async () => {
      try {
        const response = await axios.get("/api/meetings/count/rejete");
        if (response.status === 200) {
          const totalReject = response.data.data;
          setStatistics((prevStatistics) => ({
            ...prevStatistics,
            totalReject,
          }));
        }
      } catch (error) {}
    };
    fetchReject();

    const fetchCancel = async () => {
      try {
        const response = await axios.get("/api/meetings/count/cancel");
        if (response.status === 200) {
          const totalCancel = response.data.data;
          setStatistics((prevStatistics) => ({
            ...prevStatistics,
            totalCancel,
          }));
        }
      } catch (error) {}
    };
    fetchCancel();
  }, []);

  const chartData = {
    series: [
      {
        name: "Nombre de rendez-vous",
        data: [
          statistics.totalWaiting,
          statistics.totalApprouve,
          statistics.totalReport,
          statistics.totalReject,
          statistics.totalCancel,
        ],
      },
    ],
    options: {
      colors: ["#2196F3"],
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
        categories: ["En attente", "Approuvé", "Reporté", "Rejeté", "Annulé"],
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
     <h3>Nombre de Rendez-vous par état</h3>
      <div style={{ height: 330, marginTop: 48 }} className="barChat">
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

export default BarChart;
