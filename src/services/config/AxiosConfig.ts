import axios from 'axios';

export const APILINK = 'https://api.football-data.org';

const api = axios.create({
    baseURL: APILINK,
});

const token = '6311a66f5f8746fd8860a5de6173f49f';

api.interceptors.request.use(
    (config) => {
        config.headers['X-Auth-Token'] = token;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;