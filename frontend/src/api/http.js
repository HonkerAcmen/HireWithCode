import axios from 'axios'

const http = axios.create({
  baseURL: '/api',
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
