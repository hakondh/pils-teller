import React, { useState } from "react";
import axios from "axios";

function UserSettings(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [selectedFile, setSelectedFile] = useState(null);
  const [changed, setChanged] = useState(false);

  const fileSelectedHandler = (e) => {
    e.preventDefault();
    setSelectedFile(e.target.files[0]);
  };

  const fileUploadHandler = () => {
    const fd = new FormData();
    fd.append("image", selectedFile, selectedFile.name);
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
        const imageName = user.image;
        axios.delete("/images/" + imageName).catch((err) => console.log(err));

        // Set the new image in localStorage
        const user = JSON.parse(localStorage.getItem("user"));
        user.image = res.data.image;
        localStorage.setItem("user", JSON.stringify(user));
        setChanged(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <h1>Innstillinger</h1>
      <p>Velg et nytt profilbilde</p>
      <input type="file" onChange={fileSelectedHandler} />
      <br />
      <br />
      <button className="button" onClick={fileUploadHandler}>
        Last opp
      </button>
      {changed && <p>Profilbilde endret!</p>}
      <br/>
      <br/>
    </div>
  );
}

export default UserSettings;
