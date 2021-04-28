import { createRouter, createWebHistory } from "vue-router";
const Main = () => import("/@/common/Main.vue");

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("/@/common/MainHome.vue"),
        meta: {
          title: "home",
          showLink: true,
          savedPosition: false,
        },
      },
  
     
    ],
    meta: {
      icon: "el-icon-s-home",
      showLink: true,
      savedPosition: false,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("/@/common/Login.vue"),
    meta: {
      title: "登陆",
      showLink: false,
    },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("/@/common/Register.vue"),
    meta: {
      title: "注册",
      showLink: false,
    },
  },
  {
    path: "/404",
    name: "404",
    component: () => import("/@/common/NotFound.vue"),
    meta: {
      title: "404",
      showLink: false,
      savedPosition: true,
    },
  },
  {
    path: "/:pathMatch(.*)",
    redirect: "/404",
    meta: {
      title: "404",
      showLink: false,
    },
  },

 
];
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      if (savedPosition) {
        return savedPosition;
      } else {
        if (from.meta.saveSrollTop) {
          const top =
            document.documentElement.scrollTop || document.body.scrollTop;
          resolve({ left: 0, top });
        }
      }
    });
  },
});

import NProgress from "/@/services/progress";

// const whiteList = ["/login", "/register"]

router.beforeEach((to, _from, next) => {
  NProgress.start();
  document.title = to.meta.title || "等闲若得东风顾,不负春光不负卿"; // 动态title
  //whiteList.indexOf(to.path) !== -1 || window.sessionStorage.getItem("info") ? next() : next("/login") // 全部重定向到登录页
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
