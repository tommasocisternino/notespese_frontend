import axios from "axios";

const AuthService = {
    checkUser: (token) => {
        let url = process.env.REACT_APP_BACKEND_URL + process.env.REACT_APP_API_URL + process.env.REACT_APP_USER_API_URL;
        return axios.get(url, {headers: {Authorization: `Bearer ${token}`}});
    },
    login: (payload) => {
        let url = process.env.REACT_APP_BACKEND_URL + process.env.REACT_APP_API_URL + process.env.REACT_APP_LOGIN_API_URL;
        return axios.post(url, payload);
     } ,
    register: (payload) => {
        let url = process.env.REACT_APP_BACKEND_URL + process.env.REACT_APP_API_URL + process.env.REACT_APP_REGISTER_API_URL;
        return axios.post(url, payload);
     } ,
    logout: (token) => {
        let url = process.env.REACT_APP_BACKEND_URL + process.env.REACT_APP_API_URL + process.env.REACT_APP_LOGOUT_API_URL;
        return axios.get(url, {headers: {Authorization: `Bearer ${token}`}});
    }
}

export default AuthService;