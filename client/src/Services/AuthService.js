import axios from "axios";
import jwt_decode from "jwt-decode";

class AuthService {
  /* static async login(name, password) {
    const res = await axios.post("/auth/login", {
      name: name,
      password: password,
    });
    //Set token in localstorage if we got it
    if (res.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(res.data));
      return;
    }
    return res.data;
  } */

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  getToken() {
    return JSON.parse(localStorage.getItem("token"));
  }
  
  getUser() {
    const token = JSON.parse(localStorage.getItem("token"));
    if(!token) return null
    const decoded = jwt_decode(token.accessToken);
    return decoded.user;
  }
}

export default new AuthService();
