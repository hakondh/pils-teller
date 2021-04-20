import React, { useState } from "react";
import "../../Services/AuthService";
import "../../App.css";
import axios from "axios";
import { useHistory, NavLink } from "react-router-dom";
import { routes } from "../../Constants/routes";
import styles from './Login.module.css'
import AuthService from "../../Services/AuthService";

function LogIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/auth/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data)); // Set token in localStorage
        localStorage.setItem("user", JSON.stringify(AuthService.getUser()))
        history.push("/"); // Go to home after login
        window.location.reload();
      })
      .catch((err) => {
        setError(err.response.data);
      });
  };

  return (
    <div className="container">
      <div className="reg-container">
      <form onSubmit={handleSubmit}>
        <h1>Logg inn</h1>
        <label for="nameInput">Email</label>
        <input
          id="nameInput"
          type="email"
          placeholder="din@email.no"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label for="passwordInput">Passord</label>
        <input
          id="passwordInput"
          type="password"
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
        <input type="submit" value="Logg inn" />
        <NavLink className={styles.StyledLink} to={routes.REGISTER}>Ny bruker? Registrer deg her</NavLink>
      </form>
      </div>
      
    </div>
  );
}

export default LogIn;
