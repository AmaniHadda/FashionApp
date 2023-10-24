import React from "react";
import "./ChartContainer.scss";
import LineChart from "./LineChart";
import BarChart from "./BarChart";

import ContactChart from "./ContactChart";
import MeetingChart from "./MeetingChart";
import ParrainChart from "./ParrainChart";
import UserChart from "./UserChart";

const ChartContainer = () => {
  return (
    <div className="chartContainer">
      <LineChart />

      <ContactChart />
      <MeetingChart />
      <BarChart />
      <UserChart />
      <ParrainChart />

    </div>
  );
};

export default ChartContainer;
