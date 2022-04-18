import axios from 'axios'

const ApiInstance = axios.create({
  baseURL: 'http://localhost:3333',
  timeout: 10000
})

export { ApiInstance }
