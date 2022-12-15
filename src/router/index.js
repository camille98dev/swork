import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../pages/LoginPage/LoginPage.vue";
import MainPage from "../pages/MainPage/MainPage.vue";
import CheckCodePage from "../pages/CheckCodePage/CheckCodePage.vue";

const routes = [
  {
    path: "/",
    name: "LoginPage",
    component: LoginPage,
  },
  {
    path: "/main",
    name: "MainPage",
    component: MainPage,
  },
  {
    path: "/code",
    name: "CheckCodePage",
    component: CheckCodePage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});


router.beforeEach((to, from, next) => {
  const { requiresAuth } = to.meta;
  let hasToken = localStorage.getItem("api_token");
  if (requiresAuth) {
    if (!hasToken) {
      return next({ path: '/' });
    }

  }

  if (to.name === 'LoginPage' && hasToken) {
    return next({ path: '/main' });
  }

  return next();

})

export default router;
