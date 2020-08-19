import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [consumedBeers, setConsumedBeers] = useState(null);

  useEffect(() => {
    axios
      .get("/users/" + user.id + "/beers")
      .then((res) => {
        setConsumedBeers(res.data[0].sum);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      <br />
      <img
        src={"/images/" + user.image}
        width="300px"
        height="auto"
        alt="Profilbilde"
      />
      <h1>{user.name}</h1>
      <p>
        Antall pils konsumert: <span>{consumedBeers}</span>
      </p>
    </div>
  );
}

export default Profile;
