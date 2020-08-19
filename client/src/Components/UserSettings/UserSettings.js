/* import React, { useState } from "react";
import axios from "axios";

function UserSettings(props) {
  const [selectedFile, setSelectedFile] = useState(null);

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
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="container">
      <h1>Innstillinger</h1>
      <input type="file" onChange={fileSelectedHandler} />
      <button className="button"></button>
    </div>
  );
}

export default UserSettings;
 */
