import React, { useEffect, useState } from "react";
import axios from "axios";

function WeeklyDrunkard(props) {
  const [drunkards, setDrunkards] = useState([]);
  const [titleText, setTitleText] = useState("Ukens topp-drikker:");

  useEffect(() => {
    axios
      .get("/beers/weekly-drunkard")
      .then((res) => {
        setDrunkards(res.data);
        if (res.data.length > 1) setTitleText("Ukens topp-drikkere:");
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h2>{titleText}</h2>
      <p>
        {drunkards.length > 0
          ? drunkards.map((drunkard, i) => (
              <span key={drunkard.NAME}>
                {drunkard.NAME}
                {i < drunkards.length - 1
                  ? [i == drunkards.length - 2 ? " og " : ", "]
                  : ", med " + drunkard.count + " pils."}
              </span>
            ))
          : "Hva i alle dager. Det er ikke registrert noen pils denne uken. "}
      </p>
    </div>
  );
}

export default WeeklyDrunkard;
