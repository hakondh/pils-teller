import axios from "axios";
axios.interceptors.response.use((response) => response.data);

export default class UserRegistrationService {
  static postUsers(name, password) {
    return axios.post("/auth/register", {
      name: name,
      password: password,
    });
  }
}
