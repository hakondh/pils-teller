import React, { useEffect, useState } from "react";
import axios from "axios";

function WeeklyDrunkard(props) {
  const [drunkard, setDrunkard] = useState(undefined);
  useEffect(() => {
    axios.get("/beers/weekly-drunkard").then((res) => {
      console.log(res);
      setDrunkard(res.data[0]);
    });
  });

  return (
    <div>
      <h2>Ukens fyllik(er):</h2>
      {drunkard && <p>{drunkard}</p>}
    </div>
  );
}

export default WeeklyDrunkard;
