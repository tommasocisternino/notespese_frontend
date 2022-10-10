import axios from "axios";

const CategoryService = {
    index: () => {
        let url = process.env.REACT_APP_BACKEND_URL + process.env.REACT_APP_API_URL + process.env.REACT_APP_CATEGORY_API_URL;
        return axios.get(url, {headers: {Authorization: `Bearer ${localStorage.getItem('access_token')}`}});
    },
    create: (payload) => {
        let url = process.env.REACT_APP_BACKEND_URL + process.env.REACT_APP_API_URL + process.env.REACT_APP_CATEGORY_API_URL;
        return axios.post(url, payload,{headers: {Authorization: `Bearer ${localStorage.getItem('access_token')}`}});
    },
}

export default CategoryService;