


import axios from 'axios'

const ViaCepInstance = axios.create({
  baseURL: 'https://viacep.com.br/ws/',
  timeout: 5000,
})

export { ViaCepInstance }
