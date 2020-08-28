import React, { useEffect, useState } from "react";
import axios from "axios";
import Drinker from "./Drinker/Drinker";
import "./Drinkers.css";

function Drinkers(props) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("/users")
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1 id="main-title">Pilserne</h1>
      {users.map((user) => (
        <Drinker user={user} />
      ))}
    </div>
  );
}

export default Drinkers;
