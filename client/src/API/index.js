import axios from 'axios';

export default axios.create({
    baseURL: `http://52.86.115.88`,
    headers: { 'Content-Type': 'application/json' },
})