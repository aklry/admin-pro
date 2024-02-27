import ryRequest from '@/http'
import { BaseResponse } from '@/http/request/type'
import { IAuth } from '@/api/auth/type'

export const getAuthList = () =>
  ryRequest.get<BaseResponse<IAuth[]>>({
    url: '/getAuthList',
  })
