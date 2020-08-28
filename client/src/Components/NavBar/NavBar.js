import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "./iconfinder_Beer_Mug_drink_3017884.png";
import { useHistory } from "react-router-dom";
import UserContext from "../../UserContext";

function NavBar(props) {
  /* const user = props.user; */
  const user = useContext(UserContext);
  const history = useHistory();

  const logOut = () => {
    localStorage.removeItem("user");
    history.push("/");
    window.location.reload();
  };

  return (
    <header>
      <div>
        <div id="logo-box">
          <Link to="/">
            <img
              id="logo"
              src={logo}
              height="40px"
              width="auto"
              alt="pils"
            ></img>
          </Link>
          <p id="alpha-tag">alfa</p>
        </div>

        <nav>
          {user ? (
            <div>
              <ul>
                <li>
                  <Link to="/registrer-pils">Registrer pils</Link>
                </li>
                <li>
                  <Link to="/pilserne">Pilserne</Link>
                </li>
                <li>
                  <Link to="/statistikk">Statistikk</Link>
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
                <Link to="/pilserne">Pilserne</Link>
              </li>
              <li>
                <Link to="/statistikk">Statistikk</Link>
              </li>
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
