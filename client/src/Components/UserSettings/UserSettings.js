import React, { useState } from "react";
import axios from "axios";
import styles from "./UserSettings.module.css";

function UserSettings(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [selectedFile, setSelectedFile] = useState(null);
  const [changed, setChanged] = useState(false);
  const [error, setError] = useState("");

  const fileSelectedHandler = (e) => {
    e.preventDefault();
    setSelectedFile(e.target.files[0]);
  };

  const fileUploadHandler = () => {
    if (!selectedFile) {
      setError("Vennligst velg et bilde først");
      return;
    }
    const fd = new FormData();
    fd.append("image", selectedFile, selectedFile.name);
    console.log(user.image);
    axios
      .put("/users/" + user.id + "/image", fd, {
        onDownloadProgress: (progressEvent) => {
          console.log(
            "Upload progress " +
              Math.round((progressEvent.loaded / progressEvent.total) * 100) +
              "%"
          );
        },
      })
      .then((res) => {
        // Delete the old pic from /images to save space
        const imageName = JSON.parse(localStorage.getItem("user")).image;
        if (imageName)
          axios.delete("/images/" + imageName).catch((err) => console.log(err));

        // Set the new image in localStorage
        const user = JSON.parse(localStorage.getItem("user"));
        user.image = res.data.image;
        localStorage.setItem("user", JSON.stringify(user));
        setChanged(true);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
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
