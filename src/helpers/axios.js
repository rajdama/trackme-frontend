import axios from 'axios'
import { server } from '../urlConfig'

const axiosInstance = axios.create({
  baseURL: server,
  // headers : {
  //     "Authorization" : ""
  // }
})

export default axiosInstance
