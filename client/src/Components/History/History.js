import React from "react";
import HistoricTotalBeerSumPerUser from '../History/HistoricTotalBeerSumPerUser'

function History(props) {
    const total  = 478;
  return (
    <div id="statistics-container">
        <h1>Data fra sesong 1</h1>
        <p>Fra 27/8/2020 til 31/1/2021 </p>
        <p>Totalt {total} pils drukket</p>
      <HistoricTotalBeerSumPerUser />
    </div>
  );
}

export default History;