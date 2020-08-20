import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [consumedBeers, setConsumedBeers] = useState(null);
  const [averageBeers, setAverageBeers] = useState(null);

  useEffect(() => {
    axios
      .get("/users/" + user.id + "/beers")
      .then((res) => {
        setConsumedBeers(res.data[0].sum);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getAverage();
  }, [consumedBeers]);

  const getAverage = () => {
    const regDate = Date.parse(
      JSON.parse(localStorage.getItem("user")).reg_date
    );
    const todayDate = Date.parse(new Date());
    const timeDiff = todayDate - regDate;
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    let avg = Math.round((consumedBeers / days) * 100) / 100;
    avg = (avg + "").replace(".", ",");
    setAverageBeers(avg);
  };

  return (
    <div className="container">
      <br />
      <img
        className="decorated-img"
        src={"/images/" + user.image}
        width="295px"
        height="auto"
        alt="Profilbilde"
      />
      <h1>{user.name}</h1>
      <p>
        Antall pils konsumert: <span>{consumedBeers}</span>
      </p>
      {averageBeers && averageBeers !== Infinity && (
        <p>
          Det er i gjennomsnitt <span>{averageBeers}</span> pils per dag.
        </p>
      )}
    </div>
  );
}

export default Profile;
