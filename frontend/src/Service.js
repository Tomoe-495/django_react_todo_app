import axios from "axios";


const API = "http://192.168.0.111:8000/api/";
// const API = "https://tomoe495.pythonanywhere.com/api/"

const username = "tomoe";
const password = "562001";
const token = btoa(`${username}:${password}`);

const axiosInstance = axios.create({
    baseURL: API,
    withCredentials: true,
    headers: {
        'Authorization': `Basic ${token}`
    }
})

const Service = {
    getData: (api) => {
        return axiosInstance.get(`${API}${api}/`);
    },
    getItem: (api, id) => {
        return axiosInstance.get(`${API}${api}/${id}/`)
    },
    editItem: (api, id, data) => {
        return axiosInstance.put(`${API}${api}/${id}/`, data, {
            headers: {
                'Content-Type': "multipart/form-data"
            }
        });
    },
    deleteItem: (api, id) => {
        return axiosInstance.delete(`${API}${api}/${id}/`);
    },
    addItem: (api, item) => {
        return axiosInstance.post(`${API}${api}/`, item, {
            headers: {
                'Content-Type': "multipart/form-data"
            }
        });
    }
}

export default Service;
