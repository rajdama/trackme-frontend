import axios from 'axios'
import { server, foodApi } from '../urlConfig'

const serverAxiosInstance = axios.create({
  baseURL: server,
  // headers : {
  //     "Authorization" : ""
  // }
})

const apiAxiosInstance = axios.create({
  baseURL: foodApi,
})

// const instances = { serverAxiosInstance, apiAxiosInstance }
export { serverAxiosInstance, apiAxiosInstance }
