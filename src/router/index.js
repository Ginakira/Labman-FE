import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Labman"
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
      import(/* webpackChunkName: "about" */ "../views/Login.vue")
  },
  {
    path: "/logout",
    name: "Logout",
    meta: {
      title: "注销"
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Logout.vue")
  },
  {
    path: "/register",
    name: "Register",
    meta: {
      title: "注册"
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Register.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title + " | AutoWA Studio";
  }
  next();
});

export default router;
