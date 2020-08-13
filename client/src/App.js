import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import UserRegistration from "./Components/UserRegistration/UserRegistration";
import LogIn from "./Components/LogIn/LogIn";
import NavBar from "./Components/NavBar/NavBar";
import Profile from "./Components/Profile/Profile";
import BeerRegistration from "./Components/BeerRegistration/BeerRegistration";
import { UserProvider } from "./UserContext";

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);
  /* const history = useHistory(); */

  useEffect(() => {
    // Check if there is a user in localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <div>
      {/* {loggedIn && <h1>You are logged in!</h1>} */}

      <BrowserRouter>
        <UserProvider value={currentUser}>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/registrer-deg" component={UserRegistration} />
            <Route path="/logg-inn" component={LogIn} />
            <Route
              path="/profil"
              render={(props) => (
                <Profile {...props} user={currentUser}></Profile>
              )}
            />
            <Route
              path="/registrer-pils"
              render={(props) => (
                <BeerRegistration
                  {...props}
                  user={currentUser}
                ></BeerRegistration>
              )}
            />
          </Switch>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
