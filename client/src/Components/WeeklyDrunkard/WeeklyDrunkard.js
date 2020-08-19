import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

function WeeklyDrunkard(props) {
  const [drunkards, setDrunkards] = useState([]);
  const [titleText, setTitleText] = useState("Ukens topp-drikker:");
  const [imagePaths, setImagePaths] = useState([]);

  useEffect(() => {
    axios
      .get("/beers/weekly-drunkard")
      .then((res) => {
        setDrunkards(res.data);
        if (res.data.length > 1) setTitleText("Ukens topp-drikkere:");
        /* getImages(res.data); */
      })
      .catch((err) => console.log(err));
  }, []);

  /* const getImages = (drunkards) => {
    let imagePathsArr = [];
    drunkards.forEach((drunkard, i) => {
      let path = "/images/";
      axios
        .get("/users/" + drunkard.id + "/image")
        .then((res) => {
          imagePathsArr.push(path + res.data[0].image);
        })
        .catch((err) => console.log(err));
    });
    console.log(imagePathsArr);
    setImagePaths(imagePathsArr);
  }; */

  return (
    <div>
      <h2>{titleText}</h2>
      {drunkards.length > 0 && (
        <div>
          {drunkards.map((drunkard) => (
            <img
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
                  : ", med " + drunkard.count + " pils."}
              </span>
            ))
          : "Hva i alle dager. Det er ikke registrert noen pils denne uken. "}
      </p>
    </div>
  );
}

export default WeeklyDrunkard;
