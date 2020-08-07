import React from "react";
import { NavLink } from "react-router-dom";
import logo from "./iconfinder_Beer_Mug_drink_3017884.png";

function NavBar(props) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark ">
        {/* bg-dark */}

        <ul className="navbar-nav mr-auto">
          <NavLink className="navbar-brand" to="/">
            <img
              id="logo"
              src={logo}
              height="50px"
              width="auto"
              alt="pils"
            ></img>
          </NavLink>
          <NavLink className="navbar nav nav-link" to="/registrer-pils">
            Registrer pils
          </NavLink>
        </ul>

        {/* Hamburger menu */}
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/logg-inn">
                Logg inn
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/registrer-deg">
                Registrer deg
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
