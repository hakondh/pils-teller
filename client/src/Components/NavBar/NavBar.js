import React from "react";
import { Link } from "react-router-dom";
import logo from "./iconfinder_Beer_Mug_drink_3017884.png";

function NavBar(props) {
  const user = props.user;

  const logOut = () => {
    localStorage.removeItem("user");
    props.history.push("/home");
    window.location.reload();
  };

  return (
    <header>
      <div class="container">
        <Link id="logo" to="/">
          <img id="logo" src={logo} height="40px" width="auto" alt="pils"></img>
        </Link>
        <nav>
          {user ? (
            <div>
              <ul>
                <li>
                  <Link to="/registrer-pils">Registrer pils</Link>
                </li>
                <li className="dropdown">
                  <a href="javascript:void(0)" className="dropbtn">
                    {user.name}
                  </a>
                  <div className="dropdown-content">
                    <Link to="/profil">Profil</Link>
                    <Link to="/innstillinger">Innstillinger</Link>
                    <Link onClick={logOut}>Logg ut</Link>
                  </div>
                </li>
              </ul>
            </div>
          ) : (
            <ul>
              <li>
                <Link to="/logg-inn">Logg inn</Link>
              </li>
              <li>
                <Link to="/registrer-deg">Registrer deg</Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
}

export default NavBar;
