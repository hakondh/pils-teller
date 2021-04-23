import React from "react";
import TotalBeerSumPerUser from "./TotalBeerSumPerUser";
import BeerOverTime from "./BeerOverTime";
import "./Statistics.css";
import DrinkTypeCount from "./DrinkTypeCount";

function Statistics(props) {
  return (
    <div id="statistics-container">
      <TotalBeerSumPerUser />
      <BeerOverTime />
      <DrinkTypeCount />
    </div>
  );
}

export default Statistics;
