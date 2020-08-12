import React, { useState } from "react";
import "../../Services/AuthService";
import "../../App.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

function LogIn(props) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/auth/login", {
        name: name,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data)); // Set token in localStorage
        history.push("/"); // Go to home after login
        window.location.reload();
      })
      .catch((err) => {
        setError(err.response.data);
      });
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
        {error !== "" && (
          <div>
            <p className="error">{error}</p>
          </div>
        )}
        <input type="submit" value="Logg inn" />
      </form>
    </div>
  );
}

export default LogIn;
