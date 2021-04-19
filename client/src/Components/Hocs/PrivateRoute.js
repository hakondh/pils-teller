import React from 'react';
import { Redirect, Route } from "react-router-dom";
import { routes } from "../../Constants/routes";
import AuthService from "../../Services/AuthService"

export const PrivateRoute = (props) => {
  const authenticated = AuthService.getToken()

  // If user is not logged in, then redirect user to the start page
  if (!authenticated) return <Redirect to={routes.HOME} />;

  return <Route {...props} />;
};

export default PrivateRoute;
