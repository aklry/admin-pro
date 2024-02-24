import ryRequest from '@/http'
import {
  IParamsType,
  IProjectListItemType,
  IProjectListType,
} from '@/api/project/type'
import { BaseResponse } from '@/http/request/type'

export const getProjectList = (params: IParamsType) => {
  return ryRequest.get<BaseResponse<IProjectListType>>({
    url: '/project',
    params,
  })
}

export const getProjectItem = (title: string) => {
  return ryRequest.get<BaseResponse<IProjectListItemType[]>>({
    url: '/project/search',
    params: {
      title,
    },
  })
}
