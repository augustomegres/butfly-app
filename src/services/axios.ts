import axios from "axios";

const ApiInstance = axios.create({
  baseURL: 'https://621b8756faa12ee450100183.mockapi.io',
  timeout: 10000,
  headers: { 'X-Custom-Header': 'foobar' }
});

export { ApiInstance }