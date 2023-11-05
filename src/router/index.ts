import * as VueRouter from "vue-router";
/** 页面顶部进度条 */
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { type RouteRecordRaw } from "vue-router";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: "/home",
    meta: { title: "首页" },
    component: () => import("@/pages/home.vue"),
  },
  {
    path: "/todoList",
    meta: { title: "todoList" },
    component: () => import('@/pages/todoList.vue'),
  }
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
  NProgress.done();
});

router.onError((error, to) => {
  if (error.message.includes('Failed to fetch dynamically imported module')) {
    window.location.href = to.fullPath
  }
})

export default router;
