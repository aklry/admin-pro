import ryRequest from '@/http'
import { BaseResponse } from '@/http/request/type'
import { IRoleList } from '@/api/role/type'

export const getRoles = () =>
  ryRequest.get<BaseResponse<IRoleList[]>>({
    url: '/getRoles',
  })

export const addRole = (roleName: string) =>
  ryRequest.get<BaseResponse<null>>({
    url: '/addRole',
    params: {
      roleName,
    },
  })
