export interface IParamsType {
  pageNum: number
  pageSize: number
}

export interface IProjectListItemType {
  userId: number
  id: number
  title: string
  introduce: string
}

export interface IProjectListType {
  list: IProjectListItemType[]
  total: number
  pageNum: number
  pageSize: number
  totalPage: number
}
