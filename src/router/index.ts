import {
  createRouter,
  createWebHashHistory,
  RouteRecordNormalized,
  RouteRecordRaw,
} from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useSettingStore } from '@/store/setting'

const settingStore = useSettingStore()
const routes: Array<RouteRecordRaw> = []

const modules: Record<string, any> = import.meta.glob('./modules/*.ts', {
  eager: true,
})
type handleRouterType = (currentName: string) => void
type getNameType = (
  name: string,
  routes: Array<RouteRecordNormalized>,
) => Array<string>
const getName: getNameType = (
  name: string,
  routes: Array<RouteRecordNormalized>,
) => {
  const names: Array<string> = []
  while (true) {
    names.push(name)
    const currentRouteObj = routes.find((route) => route.name === name)
    const parentRouteObj = routes.find(
      (route) => route.name === currentRouteObj?.meta.parentRouter,
    )
    if (!parentRouteObj) {
      break
    } else {
      name = parentRouteObj.name as string
      continue
    }
  }
  return names.reverse()
}
const handleRouter: handleRouterType = (currentName: string) => {
  const names = getName(currentName, router.getRoutes())
  settingStore.setTitlesAction(names)
}

Object.keys(modules).forEach((key) => {
  const module = modules[key]
  routes.push(module.default)
})

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const whiteList = ['/login', '/404']
// @ts-expect-error from is optional
router.beforeEach((to, from, next) => {
  NProgress.start()
  const token = sessionStorage.getItem('user')
  if (whiteList.includes(to.path) || token) {
    next()
  } else {
    next('/login')
  }
  handleRouter(to.name as string)
})

router.afterEach(() => {
  NProgress.done()
})

export default router
