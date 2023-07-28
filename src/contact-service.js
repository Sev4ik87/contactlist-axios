import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:5000/watch',
  headers: {'Content-Type': 'application/json'},
})