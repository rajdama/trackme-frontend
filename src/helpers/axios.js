import axios from 'axios'
import { server, foodApi, imageApi, excerciseApi } from '../urlConfig'

const serverAxiosInstance = axios.create({
  baseURL: server,
})

const foodApiAxiosInstance = axios.create({
  baseURL: foodApi,
})

const imageApiAxiosInstance = axios.create({
  baseURL: imageApi,
})

const excerciseApiAxiosInstance = axios.create({
  baseURL: excerciseApi,
  headers: {
    'x-app-id': 'e5b776ef',
    'x-app-key': '1ef5634342681492d8d3bfcac5af205c',
  },
})

export {
  serverAxiosInstance,
  foodApiAxiosInstance,
  imageApiAxiosInstance,
  excerciseApiAxiosInstance,
}
