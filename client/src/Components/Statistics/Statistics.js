import React from "react";
import TotalBeerSumPerUser from "./TotalBeerSumPerUser";
import BeerOverTime from "./BeerOverTime";
import GreatestContributor from "./GreatestContributor";
import "./Statistics.css";

function Statistics(props) {
  return (
    <div id="statistics-container">
      <TotalBeerSumPerUser />
      <BeerOverTime />
      <GreatestContributor />
    </div>
  );
}

export default Statistics;
