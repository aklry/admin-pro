export interface loginRequest {
  username: string
  password: string
}

export interface loginResponse {
  username: string
  accessToken: string
  roles: string[]
}

export interface reLoginRequest {
  accessToken: string
}

export interface IUserList {
  id: number
  nickName: string
  userName: string
  role: IRole[]
}

export interface IRole {
  role: number
  roleName: string
}
