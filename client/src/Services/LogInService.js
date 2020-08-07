import axios from "axios";
axios.interceptors.response.use((response) => response.data);

export default class LogInService {
  static postUsersLogin(name, password) {
    const users = axios.get("/users");
    /* Check if the user name exists */
    if (users.find((user) => user.name == name)) {
      return false;
    }
    return axios.post("/users/login", {
      name: name,
      password: password,
    });
  }
}
