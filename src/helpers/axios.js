import axios from 'axios'
import {
  server,
  foodImageApi,
  foodNutrientsApi,
  imageApi,
  excerciseApi,
} from '../urlConfig'

const serverAxiosInstance = axios.create({
  baseURL: server,
})

const foodImageApiAxiosInstance = axios.create({
  baseURL: foodImageApi,
})

const foodNutrientsApiAxiosInstance = axios.create({
  baseURL: foodNutrientsApi,
  headers: {
    'X-Api-Key': 'ucEV12GPPboZ2fNVpbMRug==xSlYlXvvkCXk1yx1',
  },
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
  foodImageApiAxiosInstance,
  foodNutrientsApiAxiosInstance,
  imageApiAxiosInstance,
  excerciseApiAxiosInstance,
}
