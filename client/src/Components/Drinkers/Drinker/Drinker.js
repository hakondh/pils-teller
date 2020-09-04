import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import "./Drinker.css";

function Drinker(props) {
  const date = moment(props.user.reg_date).format("DD/MM/YYYY");
  const [consumedBeers, setConsumedBeers] = useState(0);
  const [averageBeers, setAverageBeers] = useState(0);

  useEffect(() => {
    axios
      .get("/users/" + props.user.id + "/beers")
      .then((res) => {
        const fetchedSum = res.data[0].sum;
        if (fetchedSum) setConsumedBeers(fetchedSum);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getAverage();
  }, [consumedBeers]);

  const getAverage = () => {
    if (consumedBeers === 0) return setAverageBeers(0); // Avoid all this logic if the amount is 0
    const regDate = Date.parse(props.user.reg_date);
    console.log(regDate);
    const todayDate = Date.parse(new Date());
    console.log(todayDate);
    const timeDiff = todayDate - regDate;
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 2;
    console.log("days: " + days);
    console.log("consumed beers: " + consumedBeers);
    if (days <= 1) return setAverageBeers(consumedBeers);
    let avg = Math.round((consumedBeers / days) * 100) / 100;
    avg = (avg + "").replace(".", ",");
    setAverageBeers(avg);
  };

  return (
    <div className="drinker-container">
      <h1 id="name-title">{props.user.name}</h1>
      <p>Registrerte seg {date}</p>
      <img
        className="drinker-image"
        src={"../../../../../images/" + props.user.image}
        alt={props.user.name + "s profilbilde"}
      />
      <div className="info-div">
        <p>
          Antall pils konsumert: <span>{consumedBeers}</span>
        </p>
        {averageBeers !== Infinity && (
          <p>
            Det er i gjennomsnitt <span>{averageBeers}</span> pils per dag
            (siden {props.user.name} registrerte seg).
          </p>
        )}
      </div>
    </div>
  );
}

export default Drinker;
