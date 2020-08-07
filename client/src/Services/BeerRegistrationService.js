import axios from "axios";
axios.interceptors.response.use((response) => response.data);

export default class BeerRegistrationService {
  static postUsers(name, password) {
    return axios.post("/users", {
      name: name,
      password: password,
    });
  }
}
