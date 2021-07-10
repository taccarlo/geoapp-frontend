import axios from 'axios'

const API_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_URI
    : 'http://localhost:5000'

export default axios.create({
  baseURL: API_URL,
  // headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
})
