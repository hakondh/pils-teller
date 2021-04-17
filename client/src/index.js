import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import KeycloakAuthService from './Services/KeycloakAuthService'
import HttpService from './Services/HttpService'
import Loader from './Components/Shared/Loader/Loader';

// Loader while keycloak initializes
ReactDOM.render(
  <React.StrictMode>
    <h1>Laster inn...</h1>
  </React.StrictMode>,
  document.getElementById('root')
);


const renderApp = () => ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

KeycloakAuthService.initKeycloak(renderApp) // Initiate keycloak, then call renderApp in callback
//HttpService.configure() // Configure axios to add tokens to requests


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
