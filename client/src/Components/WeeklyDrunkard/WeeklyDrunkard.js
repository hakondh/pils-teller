import React, { useEffect, useState } from "react";
import axios from "axios";
import "./WeeklyDrunkard.css";
function WeeklyDrunkard(props) {
  const [drunkards, setDrunkards] = useState([]);
  const [titleText, setTitleText] = useState("Ukens dranker");

  useEffect(() => {
    axios
      .get("/beers/weekly-drunkard")
      .then((res) => {
        setDrunkards(res.data.rows);
        if (res.data.rows.length > 1) setTitleText("Ukens drankere");
        /* getImages(res.data); */
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h2>{titleText}</h2>
      <div>
        {drunkards.length > 0 && (
          <div>
            {drunkards.map((drunkard, i) => (
              (drunkard.image &&
                <img
                key={i}
                className="decorated-img"
                src={"/images/" + drunkard.image}
                alt={drunkard.name + "s profilbilde"}
                width="100px"
                height="auto"
              />
              )
            ))}
          </div>
        )}
        <div>
          {drunkards.length > 0 ? (
            <div>
              {
                drunkards.map((drunkard, i) => (
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
              }
            </div>
          ) : (
            <div>
              <img
                id="beer-gif"
                className="decorated-gif"
                src="https://media1.tenor.com/images/23c5e7ba7a670ed6f95346231a0f317e/tenor.gif?itemid=14267244"
                alt="pils-gif"
              />
              <br />
              <span>
                Hva i alle dager. Det er ikke registrert en eneste pils denne
                uken.{" "}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WeeklyDrunkard;
