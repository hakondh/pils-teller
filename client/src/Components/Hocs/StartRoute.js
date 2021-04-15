import React from 'react';
import { Redirect, Route } from "react-router-dom";
import KeycloakAuthService from "../../Services/KeycloakAuthService"
import { routes } from "../../Constants/routes";

export const StartRoute = props => {
    const authenticated = KeycloakAuthService.isLoggedIn();

    // If user is logged in, then redirect user to the start page
    if(authenticated) return <Redirect to={ routes.Home } />

    return <Route {...props} />
}

export default StartRoute
