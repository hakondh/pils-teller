import React, { useState } from "react";
import axios from "axios";
import "../../App.css";
import "./UserRegistration.css";
import { useHistory } from "react-router-dom";
import AuthService from "../../Services/AuthService";

function UserRegistration(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/auth/register", {
        name: name,
        email: email,
        password: password,
      })
      .then(async (res) => {
        // Upload image if added
        // Set token and user in localStorage
        localStorage.setItem("token", JSON.stringify(res.data)); // Set token in localStorage
        localStorage.setItem("user", JSON.stringify(AuthService.getUser()))

        if (selectedFile) {
          await fileUploadHandler(res.data.insertId);
        }

        history.push("/"); // Go to home after login
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data);
      });
  };

  const fileSelectedHandler = (e) => {
    e.preventDefault();
    setSelectedFile(e.target.files[0]);
  };

  const fileUploadHandler = async (id) => {
    const fd = new FormData();
    fd.append("image", selectedFile, selectedFile.name);
    await axios
      .put("/users/" + id + "/image", fd, {
        onDownloadProgress: (progressEvent) => {
          console.log(
            "Upload progress " +
              Math.round((progressEvent.loaded / progressEvent.total) * 100) +
              "%"
          );
        },
      })
      .then((res) => {
        // Set the new image in localStorage
        const user = JSON.parse(localStorage.getItem("user"));
        user.image = res.data.image;
        localStorage.setItem("user", JSON.stringify(user));
      })
      .catch((err) => {
        console.log(err);
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
          id="emailInput"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <label for="image-input">Profilbilde</label>
        <br />
        <input id="image-input" type="file" onChange={fileSelectedHandler} />
        <br />
        <br />
        <input className="button" type="submit" value="Registrer" />
      </form>
    </div>
  );
}

export default UserRegistration;
