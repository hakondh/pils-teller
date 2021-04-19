import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import AuthService from "../../Services/AuthService";

function BeerRegistration(props) {
  const [beers, setBeers] = useState(1);
  const [date, setDate] = useState(0);
  const history = useHistory();
  const user = AuthService.getUser();

  useEffect(() => {
    setDate(getTodaysDate());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/beers", {
        amount: beers,
        reg_date: date,
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

  const getTodaysDate = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; // January is 0
    var yyyy = today.getFullYear();

    // Add "0" to the 1-digit months
    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    today = yyyy + "-" + mm + "-" + dd;
    return today;
  };

  

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Registrer pils</h1>
        <input
          id="beerInput"
          type="number"
          min="1"
          placeholder="Antall pils"
          value={beers}
          onChange={(e) => setBeers(e.target.value)}
          required
          
        />
        <br />
        <br />
        <label htmlFor="beerTime">
          Dato (dagens dato vil brukes som standard)
        </label>
        <br />

        <input
          type="date"
          id="beerTime"
          name="beerTime"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        ></input>
        <br />
        <br />
        {/* {error !== "" && (
          <div>
            <p className="error">{error}</p>
          </div>
        )} */}
        <input className="button" type="submit" value="Registrer pils" />
      </form>
    </div>
  );
}

export default BeerRegistration;
