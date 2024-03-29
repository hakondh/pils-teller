import React, { useEffect, useState } from "react";
//import "../../App.css";
import styles from "./Home.module.css";
import axios from "axios";
import WeeklyDrunkard from "../WeeklyDrunkard/WeeklyDrunkard";
import GreatestContributors from "../GreatestContributors/GreatestContributors";
import Loader from "../Shared/Loader/Loader";

function Home(props) {
  const [beers, setBeers] = useState(0);
  const gifs = [
    "https://media.giphy.com/media/e6TR9n00dL3JS/giphy.gif",
    "https://media.giphy.com/media/h8NdYZJGH1ZRe/giphy.gif",
    "https://media.giphy.com/media/7bx7ZHokGnofm/giphy.gif",
    "https://media.giphy.com/media/l0HlwREiJ3HA3QTo4/giphy.gif",
    "https://media.giphy.com/media/26tP21xUQnOCIIoFi/giphy.gif",
    "https://media.giphy.com/media/1esoXMqqOjYGm5Bdqt/giphy.gif",
    "https://media.giphy.com/media/ixCowc31ZeKuIHuhFe/giphy.gif",
    "https://media.giphy.com/media/3ehKQ7ZELVUhq/giphy.gif",
    "https://media.giphy.com/media/DmzUp9lX7lHlm/giphy.gif",
    "https://media.giphy.com/media/Tbj1X2js8WPOE/giphy.gif",
    "https://media.giphy.com/media/6b8D22vANc2mPzs178/giphy.gif",
  ];
  const [gif, setGif] = useState(
    gifs[Math.floor(Math.random() * (gifs.length - 1))]
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/beers")
      .then((res) => {
        console.log(res.data.rows);
        var count = 0;
        res.data.rows.forEach((beer) => {
          count += beer.amount;
        });
        setBeers(count);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  if (loading) return <Loader />;
  else
    return (
      <section id="main">
        <div className="container">
          <h1 className="header">{beers} pils</h1>
          <p className="text">
            ...og andre enheter har blitt drukket siden 21/4/2021.
          </p>
          <br />
          <br />
          <div className="info-container">
            <WeeklyDrunkard></WeeklyDrunkard>
            <GreatestContributors />
          </div>
        </div>
      </section>
    );
}

export default Home;
