import axios from "axios";
axios.interceptors.response.use((response) => response.data);

export default class LogInService {

  static getUser(name) {
    return axios.get("/users/" + name, {
      
    });
  }
}
