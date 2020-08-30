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
      .then(async (res) => {
        if (selectedFile) {
          await fileUploadHandler(res.data.insertId);
        }

        history.push("/logg-inn");
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
      .then(console.log("Uploaded!"))
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
