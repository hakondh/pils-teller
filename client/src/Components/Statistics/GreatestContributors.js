import React, { useEffect, useState } from "react";
import axios from "axios";

function GreatestContributors(props) {
  const [greatestContributors, setGreatestContributor] = useState([]);
  const [titleText, setTitleText] = useState(
    "Pils-tellers største bidragsyter"
  );

  useEffect(() => {
    axios
      .get("/beers/greatest-contributor")
      .then((res) => {
        setGreatestContributor(res.data);
        if (res.data.length > 1)
          setTitleText("Pils-tellers største bidragsytere");
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="chart-div">
      <h2 className="chart-title">{titleText}</h2>
      <div className="gc-div">
        {greatestContributors.length > 0 && (
          <div>
            {greatestContributors.map((greatestContributor) => (
              <img
                className="gc-image"
                src={"/images/" + greatestContributor.image}
                alt={greatestContributor.name + "s profilbilde"}
                width="100px"
                height="auto"
              />
            ))}
          </div>
        )}
        <p>
          {greatestContributors.length > 0
            ? greatestContributors.map((greatestContributor, i) => (
                <span key={greatestContributor.name}>
                  {greatestContributor.name}
                  {i < greatestContributors.length - 1
                    ? [i === greatestContributors.length - 2 ? " og " : ", "]
                    : ", med " +
                      greatestContributor.count +
                      " pils" +
                      [greatestContributors.length > 1 ? " hver." : "."]}
                </span>
              ))
            : "Hva i alle dager. Det er ikke registrert en eneste pils. "}
        </p>
      </div>
    </div>
  );
}

export default GreatestContributors;
