import axios from 'axios'

export default axios.create({
  baseURL: 'http://192.168.20.20',
  // headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
})
