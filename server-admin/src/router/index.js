import { createRouter, createWebHistory } from 'vue-router'
import i18n from '/@/services/i18n'
const Main = () => import('/@/common/Main.vue')
import article from './article'
import account from './account'
import common from './common'
const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('/@/common/MainHome.vue'),
        meta: {
          title: 'home',
          showLink: true,
          savedPosition: false
        }
      }
    ],
    meta: {
      icon: 'el-icon-s-home',
      showLink: true,
      savedPosition: false
    }
  },
  article,
  account,
  ...common
]
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      if (savedPosition) {
        return savedPosition
      } else {
        if (from.meta.saveSrollTop) {
          const top =
            document.documentElement.scrollTop || document.body.scrollTop
          resolve({ left: 0, top })
        }
      }
    })
  }
})

import NProgress from '/@/services/progress'

// const whiteList = ["/login", "/register"]

router.beforeEach((to, _from, next) => {
  NProgress.start()
  document.title = i18n.global.t(to.meta.title) || '' // 动态title
  //whiteList.indexOf(to.path) !== -1 || window.sessionStorage.getItem("info") ? next() : next("/login") // 全部重定向到登录页
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
