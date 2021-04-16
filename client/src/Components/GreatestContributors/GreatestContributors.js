import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from './GreatestContributors.module.css'

function GreatestContributors(props) {
  const [greatestContributors, setGreatestContributor] = useState([]);
  const [titleText, setTitleText] = useState(
    "Pils-tellers største bidragsyter"
  );

  useEffect(() => {
    axios
      .get("/beers/greatest-contributor")
      .then((res) => {
        setGreatestContributor(res.data.rows);
        if (res.data.rows.length > 1)
          setTitleText("Pils-tellers største bidragsytere");
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="box">
      <h2 className={styles.Header}>{titleText} denne sesongen</h2>
      <div className="gc-div">
        {greatestContributors.length > 0 && (
          <div>
            {greatestContributors.map((greatestContributor) => (
              <img
                className="decorated-img"
                src={"/images/" + greatestContributor.image}
                alt={greatestContributor.name + "s profilbilde"}
                width="40%"
                height="auto"
              />
            ))}
          </div>
        )}
        <p>
          {greatestContributors.length > 0
            ? greatestContributors.map((greatestContributor, i) => (
                <span key={greatestContributor.name} className={styles.SpanStyle}>
                  {greatestContributor.name}
                  {i < greatestContributors.length - 1
                    ? [i === greatestContributors.length - 2 ? " og " : ", "]
                    : ", med totalt " +
                      greatestContributor.count +
                      " pils" +
                      [greatestContributors.length > 1 ? " hver." : "."]} Bra (?) jobbet!
                </span>
                
                
              ))
            : "Hva i alle dager. Det er ikke registrert en eneste pils. "}
        </p>
      </div>
    </div>
  );
}

export default GreatestContributors;
