import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { defineStore } from 'pinia'

const sendRequest = (options: AxiosRequestConfig) => {
  const mergedOptions = {
    // defaults
    method: 'get',
    withCredentials: true,

    ...options
  } as AxiosRequestConfig

  mergedOptions.headers = mergedOptions.headers || {}
  mergedOptions.url = `${import.meta.env.VITE_API_BASE_URL}${options.url}`

  if (
    mergedOptions.method &&
    ['get', 'delete'].includes(mergedOptions.method) &&
    Object.prototype.hasOwnProperty.call(mergedOptions, 'data')
  ) {
    mergedOptions.params = options.data
    delete mergedOptions.data
  }

  return axios(mergedOptions)
    .then(res => res.data)
    .catch(err => {
      throw err
    })
}

export const useAPI = defineStore('api', () => {
  const baseURL = import.meta.env.VITE_API_BASE_URL

  // api methods
  const ping = () => sendRequest({
    method: 'get',
    url: '/ping'
  })

  return { baseURL, ping }
})
