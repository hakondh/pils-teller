import React, { useState } from "react";
import axios from "axios";
import styles from "./UserSettings.module.css";

function UserSettings(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [selectedFile, setSelectedFile] = useState(null);
  const [changed, setChanged] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState();

  const fileSelectedHandler = (e) => {
    e.preventDefault();
    setSelectedFile(e.target.files[0]);
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const fileUploadHandler = async () => {
    if (!selectedFile) {
      setError("Vennligst velg et bilde først");
      return;
    }
    const encoded = await toBase64(selectedFile);
    console.log(encoded);

    const body = {
      data: encoded,
    };
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    let url = "";
    axios
      .post("/images", body, config)
      .then((res) => {
        url = res.data.url;
        return axios.put(`/users/${user.id}/image`, {
          image: url,
        });
      })
      .then((res) => {
        // Set the new image in localStorage
        const user = JSON.parse(localStorage.getItem("user"));
        user.image = url;
        localStorage.setItem("user", JSON.stringify(user));
        setChanged(true);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <h1>Innstillinger</h1>
      <p>Velg et nytt profilbilde</p>
      <label className={"file-input " + styles.FileInput} for="image-input">
        <i class="fas fa-upload"></i> Trykk for å velge bilde
      </label>
      {selectedFile && <span id="file-selected">{selectedFile.name}</span>}
      <input id="image-input" type="file" onChange={fileSelectedHandler} />
      <br />
      <br />
      <button className="button" onClick={fileUploadHandler}>
        Last opp
      </button>
      {changed && <p>Profilbilde endret!</p>}
      {error && <p>{error}</p>}
      <br />
      <br />
    </div>
  );
}

export default UserSettings;
