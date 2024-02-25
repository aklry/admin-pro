import RYRequest from '@/http'
import { IUserList, loginRequest, loginResponse } from './type'
import { BaseResponse } from '@/http/request/type'

export const userLogin = (data: loginRequest) =>
  RYRequest.post<BaseResponse<loginResponse>>({ url: '/login', data })

export const getUserList = () =>
  RYRequest.get<BaseResponse<IUserList[]>>({ url: '/getUserList' })
