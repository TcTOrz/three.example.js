/*
 * @Author: Li Jian
 * @Date: 2022-03-10 10:09:47
 * @LastEditTime: 2022-03-10 11:54:58
 * @LastEditors: Li Jian
 */
import axios, { AxiosRequestConfig } from 'axios'

type AbortControllers = Array<{ abortController: AbortController; config: AxiosRequestConfig }>

const instance = axios.create({
  baseURL: '',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
  transformRequest: [
    function (data, headers) {
      return JSON.stringify(data)
    },
  ],
  transformResponse: [
    function (data) {
      data = JSON.parse(data)
      return data
    },
  ],
  validateStatus: function (status) {
    return status >= 200 && status < 300
  },
})

let abortController: AbortController
let abortControllers: AbortControllers = []

// 取消上一个相同请求
const abortSameRequest = () => {
  const theLastRequest = abortControllers[abortControllers.length - 1]
  const config = theLastRequest?.config
  config.signal = theLastRequest.abortController.signal
  if (abortControllers.length <= 1) return
  if (abortControllers.length > 2) {
    abortControllers.splice(0, 1)
  }
  if (abortControllers[0]?.config.url === abortControllers[1]?.config.url) {
    abortControllers[0].abortController.abort()
  }
}

instance.interceptors.request.use(
  function (config) {
    abortController = new AbortController()
    abortControllers.push({ abortController, config })
    abortSameRequest()
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)

const get = (url: string, params?: Object) => {
  return instance
    .get(url, { params })
    .then(function (res) {
      return res.data
    })
    .catch(function (error) {
      if (error.response) {
        // console.log('ErrorResponse', error.response.data,
        //   error.response.status, error.response.headers)
      } else if (error.request) {
        // console.log('ErrorRequest', error.request)
      } else {
        // console.log('Error', error.message)
      }
      console.log('ErrorConfig', error.config, error)
    })
}

const post = (url: string, params?: Object) => {
  return instance
    .post(url, { params })
    .then(function (res) {
      return res.data
    })
    .catch(function (error) {
      if (error.response) {
        // console.log('ErrorResponse', error.response.data,
        //   error.response.status, error.response.headers)
      } else if (error.request) {
        // console.log('ErrorRequest', error.request)
      } else {
        // console.log('Error', error.message)
      }
      // console.log('ErrorConfig', error.config)
    })
}

export { get, post, abortController }
