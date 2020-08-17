import React, { useEffect, useState } from "react";
//import "../../App.css";
import "./Home.css";
import axios from "axios";
import WeeklyDrunkard from "../WeeklyDrunkard/WeeklyDrunkard";

function Home(props) {
  const [beers, setBeers] = useState(0);

  useEffect(() => {
    axios
      .get("/beers")
      .then((res) => {
        var count = 0;
        res.data.forEach((b) => {
          count += b.amount;
        });
        setBeers(count);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section id="main">
      <div className="container">
        <h1 className="header">{beers} pils</h1>
        <p className="text">har blitt drukket siden 13/8/2020.</p>
        <br />
        <WeeklyDrunkard></WeeklyDrunkard>
      </div>
    </section>
  );
}

export default Home;
