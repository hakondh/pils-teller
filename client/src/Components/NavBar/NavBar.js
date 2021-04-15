import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import KeycloakAuthService from "../../Services/KeycloakAuthService";
import styles from "./NavBar.module.css";
import { routes } from "../../Constants/routes";
import logo from "./iconfinder_Beer_Mug_drink_3017884.png";

function NavBar() {
  const token = KeycloakAuthService.getToken();
  const [viewHamburger, setViewHamburger] = useState(false);
  console.log(token)

  const logIn = () => {
    KeycloakAuthService.doLogin();
  };

  const logOut = () => {
    localStorage.removeItem("user");
    KeycloakAuthService.doLogout();
  };

  return (
    <nav className={styles.NavBar}>
      <ul className={styles.NavList}>
        <li className={styles.LogoElement}>
          <NavLink to={routes.HOME} className={styles.First}>
            <img className={styles.Logo} src={logo} alt="pils"></img>
          </NavLink>
        </li>
        {token && (
          <li className={(viewHamburger ? styles.NavElement.active : styles.NavElement)} onClick={() => setViewHamburger(false)}>
            <NavLink
              to={routes.REGISTER_BEER}
              activeClassName={styles.Active}
              className={styles.StyledLink}
            >
              Registrer pils
            </NavLink>
          </li>
        )}
        <li className={(viewHamburger ? styles.NavElement.active : styles.NavElement)} onClick={() => setViewHamburger(false)}>
          <NavLink
            to={routes.DRINKERS}
            activeClassName={styles.Active}
            className={styles.StyledLink}
          >
            Pilserne
          </NavLink>
        </li>
        <li className={(viewHamburger ? styles.NavElement.active : styles.NavElement)} onClick={() => setViewHamburger(false)}>
          <NavLink
            to={routes.STATISTICS}
            activeClassName={styles.Active}
            className={styles.StyledLink}
          >
            Statistikk
          </NavLink>
        </li>

        {/* End of navbar */}
        {token ? (
          <div className={styles.Last}>
            <li className={(viewHamburger ? styles.NavElement.active : styles.NavElement)} onClick={() => setViewHamburger(false)}>
              <NavLink
                to={routes.PROFILE}
                activeClassName={styles.Active}
                className={styles.StyledLink}
              >
                {KeycloakAuthService.getName()}
              </NavLink>
            </li>
            <li className={(viewHamburger ? styles.NavElement.active : styles.NavElement)} onClick={() => setViewHamburger(false)}>
              <div className={styles.StyledLink} onClick={logOut}>
                Logg ut
              </div>
            </li>
          </div>
        ) : (
          <div className={styles.Last}>
            <li className={(viewHamburger ? styles.NavElement.active : styles.NavElement)} onClick={() => setViewHamburger(false)}>
              <div className={styles.StyledLink} onClick={logIn}>
                Logg inn
              </div>
            </li>
          </div>
        )}
        <a href="#" className={styles.ToggleButton} onClick={() => setViewHamburger(!viewHamburger)}>
          <span className={styles.Bar}></span>
          <span className={styles.Bar}></span>
          <span className={styles.Bar}></span>
        </a>
      </ul>
    </nav>
  );
}

export default NavBar;
