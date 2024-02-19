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

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
