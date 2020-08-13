import React, { useContext, useState } from "react";
import axios from "axios";
import UserContext from "../../UserContext";
import { useHistory } from "react-router-dom";

function BeerRegistration(props) {
  const [beers, setBeers] = useState(0);
  const user = useContext(UserContext);
  const history = useHistory();

  const handleSubmit = (e) => {
    axios
      .post("/beers", {
        amount: beers,
        user_id: user.id,
      })
      .then((res) => {
        history.push("/");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Registrer pils</h1>
        <input
          id="beerInput"
          type="number"
          min="0"
          placeholder="Antall pils"
          value={beers}
          onChange={(e) => setBeers(e.target.value)}
          required
        />
        <br />
        <br />
        {/* {error !== "" && (
          <div>
            <p className="error">{error}</p>
          </div>
        )} */}
        <input type="submit" value="Registrer pils" />
      </form>
    </div>
  );
}

export default BeerRegistration;
