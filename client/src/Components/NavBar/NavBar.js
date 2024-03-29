import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import KeycloakAuthService from "../../Services/KeycloakAuthService";
import styles from "./NavBar.module.css";
import { routes } from "../../Constants/routes";
import logo from "./iconfinder_Beer_Mug_drink_3017884.png";
import { useHistory } from "react-router-dom";
import AuthService from "../../Services/AuthService";


function NavBar() {
  const token = AuthService.getToken();
  const user = AuthService.getUser()
  const [viewHamburger, setViewHamburger] = useState(false);
  //console.log(token)
  const history = useHistory();

  //console.log(AuthService.getName())


  const logIn = () => {
    history.push(routes.LOGIN)
  };

  const logOut = () => {
    history.push('/')
    //KeycloakAuthService.doLogout();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <nav className={styles.NavBar}>
      <ul className={styles.NavList}>
        <div className={styles.LogoElement}>
          <li >
            <NavLink to={routes.HOME} className={styles.First}>
              <img className={styles.Logo} src={logo} alt="pils"></img>
            </NavLink>
          </li>
          <li>
              <NavLink to={routes.HOME} className={styles.NavBarTitle}>Sesong 2</NavLink>
          </li>
        </div>
        
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
        
        <li className={(viewHamburger ? styles.NavElement.active : styles.NavElement)} onClick={() => setViewHamburger(false)}>
          <NavLink
            to={routes.HISTORY}
            activeClassName={styles.Active}
            className={styles.StyledLink}
          >
            Historiske data
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
                {user.name}
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
