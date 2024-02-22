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
      meta: {},
    },
    {
      path: 'user',
      name: 'User',
      component: () => import('@/views/user/index.vue'),
      meta: {},
    },
    {
      path: 'role',
      name: 'Role',
      component: () => import('@/views/role/index.vue'),
      meta: {},
    },
    {
      path: 'auth',
      name: 'Auth',
      component: () => import('@/views/auth/index.vue'),
      meta: {},
    },
  ],
}
