import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import UserRegistration from "./Components/UserRegistration/UserRegistration";
import LogIn from "./Components/LogIn/LogIn";
import NavBar from "./Components/NavBar/NavBar";
import Profile from "./Components/Profile/Profile";

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    // Check if there is a user in localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) setCurrentUser(user);
  }, []);

  return (
    <div>
      {/* {loggedIn && <h1>You are logged in!</h1>} */}

      <BrowserRouter>
        <NavBar user={currentUser} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/registrer-deg" component={UserRegistration} />
          <Route path="/logg-inn" component={LogIn} />
          <Route path="/profil" component={Profile} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
