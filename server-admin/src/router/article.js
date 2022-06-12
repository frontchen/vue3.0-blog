const Main = () => import('/@/common/Main.vue')
export default {
  path: '/article',
  name: 'article',
  component: Main,
  redirect: '/article/manager',
  children: [
    {
      path: '/article/manager',
      name: 'articleManagerList',
      component: () => import('/@/pages/article/ArticleList.vue'),
      meta: {
        title: 'articleManager',
        showLink: false,
        savedPosition: true
      }
    },
    {
      path: '/article/edit',
      name: 'articleManagerEdit',
      component: () => import('/@/pages/article/ArticleEdit.vue'),
      meta: {
        title: 'articleEdit',
        showLink: false,
        savedPosition: true
      }
    }
  ],
  meta: {
    title: 'article',
    icon: 'el-icon-document',
    showLink: true,
    savedPosition: false
  }
}
