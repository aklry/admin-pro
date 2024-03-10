import RYRequest from '@/http'
import {
  IAddUser,
  IEditUser,
  IUserList,
  loginRequest,
  loginResponse,
} from './type'
import { BaseResponse } from '@/http/request/type'

export const userLogin = (data: loginRequest) =>
  RYRequest.post<BaseResponse<loginResponse>>({ url: '/login', data })

export const getUserList = () =>
  RYRequest.get<BaseResponse<IUserList[]>>({ url: '/getUserList' })

export const editUser = (data: IEditUser) =>
  RYRequest.post<BaseResponse<IUserList[]>>({
    url: '/editUser',
    data,
  })

export const addUser = (data: IAddUser) =>
  RYRequest.post<BaseResponse<null>>({
    url: '/addUser',
    data,
  })

export const deleteUser = (id: number) =>
  RYRequest.get<BaseResponse<IUserList>>({
    url: '/deleteUser',
    params: {
      id,
    },
  })
