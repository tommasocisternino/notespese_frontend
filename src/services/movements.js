import axios from "axios";

const MovementService = {
    index: () => {
        let url = process.env.REACT_APP_BACKEND_URL + process.env.REACT_APP_API_URL + process.env.REACT_APP_MOVEMENT_API_URL;
        return axios.get(url, {headers: {Authorization: `Bearer ${localStorage.getItem('access_token')}`}});
    },
    create: (payload) => {
        let url = process.env.REACT_APP_BACKEND_URL + process.env.REACT_APP_API_URL + process.env.REACT_APP_MOVEMENT_API_URL;
        return axios.post(url,payload, {headers: {Authorization: `Bearer ${localStorage.getItem('access_token')}`}});
    },
    delete: (id) => {
        let url = process.env.REACT_APP_BACKEND_URL + process.env.REACT_APP_API_URL + process.env.REACT_APP_MOVEMENT_API_URL + `${id}`;
        return axios.delete(url, {headers: {Authorization: `Bearer ${localStorage.getItem('access_token')}`}});
    },
}

export default MovementService;