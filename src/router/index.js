import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "首页"
    }
  },
  {
    path: "/about",
    name: "About",
    meta: {
      title: "关于我们"
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "登录"
    },
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue")
  },
  {
    path: "/logout",
    name: "Logout",
    meta: {
      title: "注销"
    },
    component: () =>
      import(/* webpackChunkName: "logout" */ "../views/Logout.vue")
  },
  {
    path: "/register",
    name: "Register",
    meta: {
      title: "注册"
    },
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Register.vue")
  },
  {
    path: "/console",
    name: "Console",
    redirect: "console/dashboard",
    meta: {
      title: "控制台",
      requireAuth: true,
      requireStaff: true
    },
    component: () =>
      import(/* webpackChunkName: "console" */ "../views/console/Console.vue"),
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        meta: {
          title: "控制台 - 总览",
          requireAuth: true,
          requireStaff: true
        },
        component: () =>
          import(
            /* webpackChunkName: "console-dashboard" */ "../views/console/Dashboard.vue"
          )
      },
      {
        path: "notices",
        name: "Notices",
        meta: {
          title: "控制台 - 公告管理",
          requireAuth: true,
          requireStaff: true
        },
        component: () =>
          import(
            /* webpackChunkName: "console-notices" */ "../views/console/Notices.vue"
          )
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title + " | Labman";
  }
  // 需要登录才可访问的页面
  if (to.meta.requireAuth && !store.state.logged) {
    next("/login");
    return;
  }
  // 需要管理员权限可访问的页面
  if (to.meta.requireStaff && (!store.state.logged || !store.state.is_staff)) {
    next("/");
    return;
  }
  next();
});

export default router;
