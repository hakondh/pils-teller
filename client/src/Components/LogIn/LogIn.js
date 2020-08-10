import React, { useState } from "react";
import axios from "axios";
import "../../App.css";

function LogIn(props) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/auth/login", {
        name: name,
        password: password,
      })
      .then((res) => {
        console.log(res);
        props.history.push("/"); // Go to home when logged in
      })
      .catch((err) => console.log(err));
  };

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
