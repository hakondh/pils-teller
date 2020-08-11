import axios from "axios";

class AuthService {
  static async login(name, password) {
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
  }

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
