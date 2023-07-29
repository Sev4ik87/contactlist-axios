import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:5000/contact',
  headers: {'Content-Type': 'application/json'},
})

