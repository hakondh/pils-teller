import Keycloak from "keycloak-js";

const kc = new Keycloak("/keycloak.json");

const initKeycloak = (renderAfterInit) => {
  console.log("BRUH")
  kc.init({
    onLoad: "check-sso", // Always go to login if user is not authenticated,
    silentCheckSsoRedirectUri:
      window.location.origin + "/silent-check-sso.html",
    pkceMethod: "S256", // Prevent Authorization Code Interception Attacks
  }).then((authenticated) => {
    console.log("done")
    renderAfterInit();
  });
};

const doLogin = () => {
  kc.login({
    redirectUri: process.env.CLIENT_URL, // Go to home after successful login
  });
};

const doLogout = kc.logout;

const getToken = () => kc.token;

const isLoggedIn = () => !!kc.token; // Returns true if there is a token

const minExpLeft = 5;
const updateToken = (successCallback) =>
  kc
    .updateToken(minExpLeft)
    .then(successCallback) // If the token has not expired, then it is updated and callback is called
    .catch(doLogin); // If the token expires in less time than minExpLeft, then the user must log in again

const getRole = () =>
  kc.tokenParsed
    ? kc.tokenParsed.roles
      ? kc.tokenParsed.roles[0]
      : "No role"
    : "No token";

const getIdToken = () => kc.idToken;

const getDbId = () =>
  kc.idTokenParsed ? kc.idTokenParsed.dbId : "Invalid token";

const getRoleDbId = () =>
  kc.idTokenParsed ? kc.idTokenParsed.roleDbId : "Invalid token";

const getName = () =>
  kc.idTokenParsed ? kc.tokenParsed.given_name : "Invalid token";

const AuthService = {
  initKeycloak,
  doLogin,
  doLogout,
  isLoggedIn,
  getToken,
  updateToken,
  getIdToken,
  getRole,
  getDbId,
  getName,
  getRoleDbId,
};

export default AuthService;
