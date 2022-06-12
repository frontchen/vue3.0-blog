export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('/@/common/Login.vue'),
    meta: {
      title: '登陆',
      showLink: false
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('/@/common/Register.vue'),
    meta: {
      title: '注册',
      showLink: false
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('/@/common/NotFound.vue'),
    meta: {
      title: '404',
      showLink: false,
      savedPosition: true
    }
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404',
    meta: {
      title: '404',
      showLink: false
    }
  }
]
