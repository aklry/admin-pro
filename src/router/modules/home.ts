export default {
  path: '/',
  name: 'Layout',
  component: () => import('@/layout/index.vue'),
  redirect: '/home',
  children: [
    {
      path: 'home',
      name: 'Home',
      component: () => import('@/views/home/index.vue'),
      meta: {
        title: '项目介绍',
        isShow: true,
        parentRouter: 'Layout',
      },
    },
    {
      path: 'user',
      name: 'User',
      component: () => import('@/views/user/index.vue'),
      meta: {
        title: '用户列表',
        isShow: true,
        parentRouter: 'Layout',
      },
    },
    {
      path: 'role',
      name: 'Role',
      component: () => import('@/views/role/index.vue'),
      meta: {
        title: '角色列表',
        isShow: true,
        parentRouter: 'Layout',
      },
    },
    {
      path: 'auth',
      name: 'Auth',
      component: () => import('@/views/auth/index.vue'),
      meta: {
        title: '权限列表',
        isShow: true,
        parentRouter: 'Layout',
      },
    },
  ],
}
