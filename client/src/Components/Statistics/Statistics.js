import React from "react";
import TotalBeerSumPerUser from "./TotalBeerSumPerUser";
import BeerOverTime from "./BeerOverTime";
import "./Statistics.css";

function Statistics(props) {
  return (
    <div id="statistics-container">
      <TotalBeerSumPerUser />
      <BeerOverTime />
    </div>
  );
}

export default Statistics;
