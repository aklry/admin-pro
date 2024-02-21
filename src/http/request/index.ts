import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { RYRequestConfig } from './type'
import { getMessageInfo } from './status'
import { ElMessage } from 'element-plus'

class RYRequest {
  instance: AxiosInstance

  constructor(config: RYRequestConfig) {
    // request实例 => axios实例
    this.instance = axios.create(config)

    // 每个instance实例都要有拦截器
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (error) => {
        return error
      },
    )
    this.instance.interceptors.response.use(
      (res) => {
        if (res.status === 200) {
          return res.data
        }
        ElMessage({
          message: getMessageInfo(res.status),
          type: 'error',
        })
        return res
      },
      (error) => {
        const { response } = error
        if (response) {
          // 请求已发出，但是不在2xx的范围
          ElMessage({
            message: getMessageInfo(response.status),
            type: 'error',
          })
          return Promise.reject(response.data)
        }
        ElMessage({
          message: '网络异常,请稍后再试!',
          type: 'error',
        })
      },
    )
    // 针对特定的hyRequest实例添加拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccess,
      config.interceptors?.requestFail,
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccess,
      config.interceptors?.responseFail,
    )
  }

  // 封装网络请求的方法
  request<T>(config: RYRequestConfig<T>) {
    if (config.interceptors?.requestSuccess) {
      // 单次请求的成功请求处理
      config = config.interceptors.requestSuccess(config)
    }
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单次响应成功的拦截器
          if (config.interceptors?.responseSuccess) {
            res = config.interceptors.responseSuccess(res)
          }
          resolve(res)
        })
        .catch((err) => reject(err))
    })
  }

  get<T = any>(config: RYRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }

  post<T = any>(config: RYRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }

  delete<T = any>(config: RYRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: RYRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default RYRequest
