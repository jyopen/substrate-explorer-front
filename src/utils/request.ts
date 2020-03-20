import axios from 'axios';

const request = axios.create({
    timeout: 15000,
});
request.defaults.baseURL = '/api';
request.defaults.headers.post['Content-Type'] = 'application/json';
request.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        // Do something with request error
        return Promise.reject(error);
    },
);
request.interceptors.response.use(
    response => {
        if (response.data.code === 0) {
            return response.data.data;
        }
        return Promise.reject(response.data.msg);
    },
    error => {
        return Promise.reject(error);
    },
);

export default request
