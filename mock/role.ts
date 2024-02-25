import type { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/mock/api/getRoles',
    method: 'get',
    response: () => ({
      code: 0,
      message: 'success',
      data: [
        {
          roleName: '管理员',
          roleId: 1,
          authority: [1, 2, 4, 5, 6, 7, 8, 9, 11, 13, 14, 15, 16],
        },
        {
          roleName: '普通用户',
          roleId: 2,
          authority: [1, 3, 4, 6, 7, 8, 9, 11, 12, 13],
        },
      ],
    }),
  },
] as MockMethod[]
