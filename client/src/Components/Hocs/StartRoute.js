import React from 'react';
import { Redirect, Route } from "react-router-dom";
import AuthService from "../../Services/AuthService"
import { routes } from "../../Constants/routes";

export const StartRoute = props => {
    const authenticated = AuthService.getToken()

    // If user is logged in, then redirect user to the start page
    if(authenticated) return <Redirect to={ routes.Home } />

    return <Route {...props} />
}

export default StartRoute
