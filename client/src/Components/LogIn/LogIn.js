import React, { useState } from "react";
import "../../App.css";

function LogIn(props) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {};

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Logg inn</h1>
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
        <input type="submit" value="Logg inn" />
      </form>
    </div>
  );
}

export default LogIn;
