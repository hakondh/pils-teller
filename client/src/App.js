import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import UserRegistration from "./Components/UserRegistration/UserRegistration";
import LogIn from "./Components/LogIn/LogIn";
import NavBar from "./Components/NavBar/NavBar";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/registrer-deg" component={UserRegistration} />
        <Route path="/logg-inn" component={LogIn} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
