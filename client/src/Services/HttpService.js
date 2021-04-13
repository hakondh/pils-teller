import axios from "axios";
import AuthService from "./AuthService";

const HttpMethods = {
    GET: 'GET',
    POST: 'POST',
    DELETE: 'DELETE'
}

const axiosClient = axios.create()

const configure = () => {
    axiosClient.interceptors.request.use((config) => {
        // Add bearer token to request before it's sent if the user is logged in
        if(AuthService.isLoggedIn()) {
            // This callback will be called if the token could be updated (it was not expired)
            const configCallback = () => {
                config.headers.Authorization = `Bearer ${AuthService.getToken()}`
                return Promise.resolve(config)
            }
            // Update the token
            return AuthService.updateToken(configCallback)
        }
    })
}

// Method to get the common axios client for HTTP request
const getAxiosClient = () => axiosClient

const HttpService = {
    HttpMethods,
    configure,
    getAxiosClient
}

export default HttpService
