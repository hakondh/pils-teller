import React, { useState } from "react";
import axios from "axios";
import "../../App.css";
import "./UserRegistration.css";
import { useHistory } from "react-router-dom";

function UserRegistration(props) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/auth/register", {
        name: name,
        password: password,
      })
      .then((res) => {
        fileUploadHandler();
        history.push("/logg-inn");
        window.location.reload();
      })
      .catch((err) => {
        setError(err.response.data);
      });
  };

  const fileSelectedHandler = (e) => {
    e.preventDefault();
    setSelectedFile(e.target.files[0]);
  };

  const fileUploadHandler = () => {
    const fd = new FormData();
    fd.append("image", selectedFile, selectedFile.name);
    axios
      .put("/users/" + name + "/image", fd, {
        onDownloadProgress: (progressEvent) => {
          console.log(
            "Upload progress " +
              Math.round((progressEvent.loaded / progressEvent.total) * 100) +
              "%"
          );
        },
      })
      .then((res) => {
        console.log(res);
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
        <input type="file" onChange={fileSelectedHandler} />
        <br />
        <br />
        <input className="button" type="submit" value="Registrer" />
      </form>
    </div>
  );
}

export default UserRegistration;
