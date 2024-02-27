export interface IAuth {
  name: string
  roleId: number
  roleList: IAuth[]
  viewRole?: string
}
