import React from 'react';
import { Redirect, Route } from "react-router-dom";
import KeycloakAuthService from "../../Services/KeycloakAuthService"
import { routes } from "../../Constants/routes";

export const PrivateRoute = (props) => {
  const authenticated = KeycloakAuthService.isLoggedIn();

  // If user is not logged in, then redirect user to the start page
  if (!authenticated) return <Redirect to={routes.HOME} />;

  return <Route {...props} />;
};

export default PrivateRoute;
