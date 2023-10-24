
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import "./ChartContainer.scss";
import axios from "axios";

const LineChart = () => {
  const [total, setTotal] = useState(0);
  const [month, setMonth] = useState("");

  useEffect(() => {
    const fetch = async () => {    
      try {
        const response = await axios.get("/user/countbymonth");
        if (response.status === 200) {
          const total = response.data.map((item) => item.count);
          const month = response.data.map((item) => item._id.month);

          setTotal(total);
          //console.log(monthString);
          setMonth(month);
        }
      } catch (error) {}
    };
    fetch();
  }, []);

  const chartOptions = {
    series: [
      {
        name: "Utilisateurs créés",
        data: total,
      },
    ],
    options: {
      colors: ["#56ce56"],
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
        categories: month,
      },
      legend: {
        position: "top",
      },
      grid: {
        show: false,
      },
    },
  };

  return (
    <div>
      <h3>Utilisateurs</h3>
      <small>
        {" "}
        <b style={{ color: "pink" }}>1</b> : Janvier
      </small>
      <small>
        {" "}
        <b style={{ color: "pink" }}>2</b> : Février
      </small>
      <small>
        {" "}
        <b style={{ color: "pink" }}>3</b> : Mars
      </small>
      <small>
        {" "}
        <b style={{ color: "pink" }}>4</b> : Avril
      </small>
      <small>
        {" "}
        <b style={{ color: "pink" }}>5</b> : Mai
      </small>
      <small>
        {" "}
        <b style={{ color: "pink" }}>6</b> : Juin
      </small>
      <small>
        {" "}
        <b style={{ color: "pink" }}>7</b> : Juillet
      </small>
      <small>
        {" "}
        <b style={{ color: "pink" }}>8</b> : Août
      </small>
      <small>
        {" "}
        <b style={{ color: "pink" }}>9</b> : Septembre
      </small>
      <small>
        {" "}
        <b style={{ color: "pink" }}>10</b> : Octobre
      </small>
      <small>
        {" "}
        <b style={{ color: "pink" }}>11</b> : Novembre
      </small>
      <small>
        {" "}
        <b style={{ color: "pink" }}>12</b> : Décembre
      </small>

      <div style={{ height: 300, marginTop: 5 }} className="barChat">
        <Chart
          options={chartOptions.options}
          series={chartOptions.series}
          height={"100%"}
          type="line"
        />
      </div>
    </div>
  );
};

export default LineChart;
