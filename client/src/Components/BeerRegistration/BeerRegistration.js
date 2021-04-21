import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import AuthService from "../../Services/AuthService";

function BeerRegistration(props) {
  const [beers, setBeers] = useState(1);
  const [drinkTypes, setDrinkTypes] = useState([]);
  const [selectedDrinkType, setSelectedDrinkType] = useState(0);
  const [date, setDate] = useState(0);
  const [success, setSuccess] = useState("");
  const history = useHistory();
  const user = AuthService.getUser();

  useEffect(() => {
    setDate(getTodaysDate());
    axios.get("/drink-types").then((res) => {
      setDrinkTypes(res.data.rows);
      setSelectedDrinkType(res.data.rows[0].id);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/beers", {
        amount: beers,
        reg_date: date,
        user_id: user.id,
        drink_type: selectedDrinkType,
      })
      .then((res) => {
        setSuccess("Enheter registrert!");
        setBeers(1);
        setSelectedDrinkType(drinkTypes[0].id);
        setDate(getTodaysDate());
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
      <div className="reg-container">
        <form onSubmit={handleSubmit}>
          <h1>Registrer pils</h1>
          <label for="beerInput">Antall enheter</label>
          <input
            id="beerInput"
            type="number"
            min="1"
            placeholder="0"
            value={beers}
            onChange={(e) => setBeers(e.target.value)}
            required
          />
          <br />
          <label>Enhetstype</label>
          <br />
          <div className="select-wrapper">
            <select
              value={selectedDrinkType}
              onChange={(evt) => setSelectedDrinkType(evt.target.value)}
            >
              {drinkTypes.map((drinkType) => (
                <option value={drinkType.id}>{drinkType.name}</option>
              ))}
            </select>
          </div>
          <label htmlFor="beerTime">Dato (la stå for dagens dato)</label>
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
          <input type="submit" value="Registrer pils" />
          {success && <p>{success}</p>}
        </form>
      </div>
    </div>
  );
}

export default BeerRegistration;
