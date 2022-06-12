const Main = () => import('/@/common/Main.vue')
export default {
  path: '/account',
  name: 'account',
  component: Main,
  redirect: '/account/manager',
  children: [
    {
      path: '/account/manager',
      name: 'accountManager',
      component: () => import('/@/pages/account/AccountManager.vue'),
      meta: {
        title: 'accountManager',
        showLink: false,
        savedPosition: true
      }
    },
    {
      path: '/account/role',
      name: 'accountRole',
      component: () => import('/@/pages/account/AccountRole.vue'),
      meta: {
        title: 'accountRole',
        showLink: false,
        savedPosition: true
      }
    },
    {
      path: '/account/permission',
      name: 'accountPermission',
      component: () => import('/@/pages/account/AccountPermission.vue'),
      meta: {
        title: 'accountPermission',
        showLink: false,
        savedPosition: true
      }
    }
  ],
  meta: {
    title: 'account',
    icon: 'el-icon-setting',
    showLink: true,
    savedPosition: false
  }
}
