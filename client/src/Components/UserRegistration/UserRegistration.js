import React, { useState } from "react";
import axios from "axios";
import "../../App.css";
import "./UserRegistration.css";
import { useHistory } from "react-router-dom";

function UserRegistration(props) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/auth/register", {
        name: name,
        password: password,
      })
      .then((res) => {
        history.push("/logg-inn");
        window.location.reload();
      })
      .catch((err) => {
        setError(err.response.data);
      });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Registrer deg</h1>
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
        {!error && <br />}
        <br />
        {error !== "" && (
          <div>
            <p className="error">{error}</p>
          </div>
        )}
        <input type="submit" value="Registrer" />
      </form>
    </div>
  );
}

export default UserRegistration;
