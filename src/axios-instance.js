import axios from 'axios';

const instance = axios.create({
    baseURL: '/api',
    timeout: 15000
});

export default instance;