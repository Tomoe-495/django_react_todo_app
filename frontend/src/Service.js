import axios from "axios";


const API = "https://tomoe495.pythonanywhere.com/api/";


// const username = 'hasnain';
// const password = '12345678';
// const token = btoa(`${username}:${password}`);

// const instance = axios.create({
//     baseURL: "https://tomoe495.pythonanywhere.com/",
//     headers: {
//         'Authorization': `Basic ${token}`
//     }
// });


const Service = {
    getData: (api) => {
        return axios.get(`${API}${api}/`);
    },
    getItem: (api, id) => {
        return axios.get(`${API}${api}/${id}/`)
    },
    editItem: (api, id, data) => {
        return axios.put(`${API}${api}/${id}/`, data);
    },
    deleteItem: (api, id) => {
        return axios.delete(`${API}${api}/${id}/`);
    },
    addItem: (api, item) => {
        return axios.post(`${API}${api}/`, item);
    }
}

export default Service;
