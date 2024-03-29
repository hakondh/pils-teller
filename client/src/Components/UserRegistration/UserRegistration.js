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
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== repeatedPassword) {
      setError("Passordene du fylte inn er ikke like.");
      return;
    }
    setLoading(true);
    axios
      .post("/auth/register", {
        name: name,
        email: email,
        password: password,
      })
      .then(async (res) => {
        // Set token and user in localStorage
        localStorage.setItem("token", JSON.stringify(res.data)); // Set token in localStorage
        const user = AuthService.getUser();
        localStorage.setItem("user", JSON.stringify(user));

        // Upload image if added

        if (selectedFile) {
          await fileUploadHandler(user.id);
        }

        history.push("/"); // Go to home after login
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  };

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

  const fileUploadHandler = async (id) => {
    if (!selectedFile) return;
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
    await axios
      .post("/images", body, config)
      .then((res) => {
        url = res.data.url;
        return axios.put(`/users/${id}/image`, {
          image: url,
        });
      })
      .then((res) => {
        // Set the new image in localStorage
        const user = JSON.parse(localStorage.getItem("user"));
        user.image = url;
        localStorage.setItem("user", JSON.stringify(user));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Registrer deg</h1>
        <label for="nameInput">Navn</label>
        <input
          id="nameInput"
          type="text"
          placeholder="pilsenavn"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <label for="emailInput">Email</label>
        <input
          id="emailInput"
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
        <label for="repeatedPasswordInput">Gjenta passord</label>
        <input
          id="repeatedPasswordInput"
          type="password"
          value={repeatedPassword}
          onChange={(e) => setRepeatedPassword(e.target.value)}
          required
        />
        <br />
        <label for="image-input">Profilbilde</label>
        <br />
        <label className="file-input" for="image-input">
          <i class="fas fa-upload"></i> Trykk for å laste opp
        </label>
        {selectedFile && <span id="file-selected">{selectedFile.name}</span>}
        <input id="image-input" type="file" onChange={fileSelectedHandler} />
        <br />
        <br />
        <input disabled={loading} type="submit" value="Registrer" />
        {loading && <p>Oppretter bruker...</p>}
        {error !== "" && <span className="error">{error}</span>}
      </form>
    </div>
  );
}

export default UserRegistration;
