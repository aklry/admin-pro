import { defineStore } from 'pinia'
import { IUserState } from '@/store/user/type'
import { loginRequest } from '@/api/user/type'
import { userLogin } from '@/api/user/user'
import { ElMessage } from 'element-plus'

const useUserStore = defineStore('user', {
  state: (): IUserState => ({
    username: '',
    accessToken: '',
    refreshToken: '',
    roles: [],
  }),
  actions: {
    async userLoginAction(data: loginRequest) {
      const userLoginResult = await userLogin(data)
      if (userLoginResult.code === 0) {
        this.username = userLoginResult.data.username
        this.accessToken = userLoginResult.data.accessToken
        this.roles = userLoginResult.data.roles
        ElMessage.success(userLoginResult.message)
      } else {
        ElMessage.error(userLoginResult.message)
      }
    },
  },
  persist: {
    key: 'user',
    paths: ['accessToken'],
    storage: sessionStorage,
  },
})

export default useUserStore
