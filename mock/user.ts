import type { MockMethod } from 'vite-plugin-mock'

const userList = [
  {
    id: 1,
    nickName: '张三',
    userName: '张三',
    role: [
      {
        role: 1,
        roleName: '管理员',
      },
      {
        role: 2,
        roleName: '普通用户',
      },
    ],
  },
  {
    id: 2,
    nickName: '李四',
    userName: '李四',
    role: [
      {
        role: 1,
        roleName: '管理员',
      },
    ],
  },
  {
    id: 3,
    nickName: '王五',
    userName: '王五',
    role: [
      {
        role: 2,
        roleName: '普通用户',
      },
    ],
  },
]
export default [
  {
    url: '/mock/api/login',
    method: 'post',
    response: ({ body }) => {
      if (body.username !== body.password) {
        return {
          code: 1,
          message: '密码错误',
          data: {
            username: '',
            roles: [],
            accessToken: '',
          },
        }
      }
      if (body.username === 'admin') {
        return {
          code: 0,
          message: '登录成功',
          data: {
            username: 'admin',
            roles: ['admin'],
            accessToken: 'admin',
          },
        }
      } else {
        return {
          code: 0,
          message: '登录成功',
          data: {
            username: 'common',
            roles: ['common'],
            accessToken: 'common',
          },
        }
      }
    },
  },
  {
    url: '/mock/api/getUserList',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: 'success',
        data: userList,
      }
    },
  },
  {
    url: '/mock/api/editUser',
    method: 'post',
    response: ({ body }) => {
      const { id, nickName, role } = body
      const user = userList.find((item) => item.id === Number(id))
      if (user) {
        user.nickName = nickName
        user.role = role.map((item: number) => {
          return {
            role: item,
            roleName: item === 1 ? '管理员' : '普通用户',
          }
        })
      }
      const newUserList = userList.map((item) => {
        if (item.id === user?.id) {
          return user
        }
        return item
      })
      return {
        code: 0,
        message: '修改成功',
        data: newUserList,
      }
    },
  },
  {
    url: '/mock/api/addUser',
    method: 'post',
    response: ({ body }) => {
      const { nickName, role } = body
      const user = userList.find((item) => item.nickName === nickName)
      if (!user) {
        const id = userList.length + 1
        userList.push({
          id,
          nickName,
          userName: nickName,
          role: role.map((item: number) => ({
            role: item,
            roleName: item === 1 ? '管理员' : '普通用户',
          })),
        })
        return {
          code: 0,
          message: '添加成功',
          data: null,
        }
      } else {
        return {
          code: -1,
          message: '该用户已存在',
          data: null,
        }
      }
    },
  },
  {
    url: '/mock/api/deleteUser',
    method: 'get',
    response: ({ query }) => {
      const { id } = query
      let index = 0
      if (id > 0) {
        index = userList.findIndex((item) => item.id === Number(id))
        if (index > -1) {
          userList.splice(index, 1)
        }
      }
      return {
        code: 0,
        message: '删除成功',
        data: userList,
      }
    },
  },
] as MockMethod[]
