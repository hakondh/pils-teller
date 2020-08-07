import React, { useState } from "react";
import "../../App.css";
import "./UserRegistration.css";
import BeerRegistrationService from "../../Services/BeerRegistrationService";

function UserRegistration(props) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    BeerRegistrationService.postUsers(name, password);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Registrer deg</h1>
        <br />
        <input
          id="nameInput"
          type="text"
          placeholder="Navn"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <br />
        <input
          id="passwordInput"
          type="password"
          placeholder="Passord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <br />
        <input type="submit" value="Registrer" />
      </form>
    </div>
  );
}

export default UserRegistration;
