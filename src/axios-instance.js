import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:3100',
    timeout: 2000
});

export default instance;