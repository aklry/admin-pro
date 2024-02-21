import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const routes: Array<RouteRecordRaw> = []

const modules: Record<string, any> = import.meta.glob('./modules/*.ts', {
  eager: true,
})

Object.keys(modules).forEach((key) => {
  const module = modules[key]
  routes.push(module.default)
})

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const whiteList = ['/login', '/404']
// @ts-ignore
router.beforeEach((to, from, next) => {
  NProgress.start()
  const token = sessionStorage.getItem('user')
  if (whiteList.includes(to.path) || token) {
    next()
  } else {
    next('/login')
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
