import React, { useEffect, useState } from "react";
import axios from "axios";

function WeeklyDrunkard(props) {
  const [drunkards, setDrunkards] = useState([]);
  const [titleText, setTitleText] = useState("Ukens topp-drikker");

  useEffect(() => {
    axios
      .get("/beers/weekly-drunkard")
      .then((res) => {
        setDrunkards(res.data);
        if (res.data.length > 1) setTitleText("Ukens topp-drikkere");
        /* getImages(res.data); */
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h2>{titleText}</h2>
      {drunkards.length > 0 && (
        <div>
          {drunkards.map((drunkard) => (
            <img
              className="decorated-img"
              src={"/images/" + drunkard.image}
              alt={drunkard.name + "s profilbilde"}
              width="100px"
              height="auto"
            />
          ))}
        </div>
      )}
      <p>
        {drunkards.length > 0
          ? drunkards.map((drunkard, i) => (
              <span key={drunkard.name}>
                {drunkard.name}
                {i < drunkards.length - 1
                  ? [i === drunkards.length - 2 ? " og " : ", "]
                  : ", med " +
                    drunkard.count +
                    " pils" +
                    [drunkards.length > 1 ? " hver." : "."]}
              </span>
            ))
          : "Hva i alle dager. Det er ikke registrert en eneste pils denne uken. "}
      </p>
    </div>
  );
}

export default WeeklyDrunkard;
