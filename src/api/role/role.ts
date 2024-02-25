import ryRequest from '@/http'
import { BaseResponse } from '@/http/request/type'
import { IRoleList } from '@/api/role/type'

export const getRoles = () =>
  ryRequest.get<BaseResponse<IRoleList[]>>({
    url: '/getRoles',
  })
