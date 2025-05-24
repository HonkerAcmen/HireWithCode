import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 5000,
})

http.interceptors.request.use(
  (config) => {
    return config
  },
  (e) => Promise.reject(e),
)
http.interceptors.response.use(
  (res) => {
    return res
  },
  (e) => {
    return Promise.reject(e)
  },
)

export default http
