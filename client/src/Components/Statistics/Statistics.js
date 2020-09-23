import React from "react";
import TotalBeerSumPerUser from "./TotalBeerSumPerUser";
import BeerOverTime from "./BeerOverTime";
import GreatestContributors from "./GreatestContributors";
import "./Statistics.css";

function Statistics(props) {
  return (
    <div id="statistics-container">
      <TotalBeerSumPerUser />
      <BeerOverTime />
      {/* <GreatestContributors /> */}
    </div>
  );
}

export default Statistics;
