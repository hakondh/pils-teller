import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import UserRegistration from "./Components/UserRegistration/UserRegistration";
import LogIn from "./Components/LogIn/LogIn";
import NavBar from "./Components/NavBar/NavBar";
import Profile from "./Components/Profile/Profile";
import BeerRegistration from "./Components/BeerRegistration/BeerRegistration";
import Statistics from "./Components/Statistics/Statistics";
import UserSettings from "./Components/UserSettings/UserSettings";
import Drinkers from "./Components/Drinkers/Drinkers";
import { UserProvider } from "./UserContext";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/registrer-deg" component={UserRegistration} />
          <Route path="/logg-inn" component={LogIn} />
          <Route path="/profil" component={Profile} />
          <Route path="/registrer-pils" component={BeerRegistration} />
          <Route path="/statistikk" component={Statistics}></Route>
          <Route path="/innstillinger" component={UserSettings}></Route>
          <Route path="/pilserne" component={Drinkers}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
