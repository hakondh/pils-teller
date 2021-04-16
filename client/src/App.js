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
import PrivateRoute from "./Components/Hocs/PrivateRoute"
import StartRoute from "./Components/Hocs/StartRoute";
import { routes } from "./Constants/routes";
import History from "./Components/History/History"

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <StartRoute path="/registrer-deg" component={UserRegistration} />
          <StartRoute path="/logg-inn" component={LogIn} />
          <PrivateRoute path="/profil" component={Profile} />
          <PrivateRoute path="/registrer-pils" component={BeerRegistration} />
          <Route path="/statistikk" component={Statistics}></Route>
          <PrivateRoute path="/innstillinger" component={UserSettings}/>
          <Route path="/pilserne" component={Drinkers}></Route>
          <Route path={routes.HISTORY} component={History}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
