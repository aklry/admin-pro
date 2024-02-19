import type { AxiosRequestConfig, AxiosResponse } from 'axios'
//针对AxiosRequestConfig配置进行扩展
export interface RYInterceptor<T = AxiosResponse> {
  requestSuccess?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestFail?: (error: any) => any
  responseSuccess?: (res: T) => T
  responseFail?: (error: any) => any
}

export interface RYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: RYInterceptor<T>
}

export interface BaseResponse<T = any> {
  code: number | string
  message: string
  data: T
}
