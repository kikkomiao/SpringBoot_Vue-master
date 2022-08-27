import Vue from "vue";
import Router from "vue-router";
// import MainPage from "../components/MainPage.vue";
import MainPage from "../components/MainsPage.vue";
import LoginPage from "../components/LoginPage.vue";
import RegisterPage from "../components/RegisterPage.vue";
import NotFound from "../components/NotFound.vue";
import HomePage from "../components/HomePage.vue";
import ReadMe from "../components/ReadMe.vue";
import UpdatePwd from "../components/UpdatePwd.vue";
// import LookInfo from "../components/LookInfo.vue";
import UpdateInfo from "../components/UpdateInfo.vue";
import InsertPage from "../components/InsertPage.vue";
import DataPage from "../components/DataPage.vue";

Vue.use(Router);

export default new Router({
  routes: [
    // {
    //   path: "/main",
    //   component: MainPage
    // },
    {
      path: "/login",
      component: LoginPage
    },
    {
      path: "/register",
      component: RegisterPage
    },
    {
      path: "*",
      component: NotFound
    },
    {
      path: "/",
      component: HomePage,
      // component: MainPage,
      meta: { logined: true },
      // userspage在home的占位符中出现
      children: [
        // path为空说明路由技术readme
        { path: "/show", component: ReadMe, meta: { logined: true } },
        { path: "/main", component: MainPage, meta: { logined: true } },
        { path: "/updatepwd", component: UpdatePwd, meta: { logined: true } },
        // { path: "/lookinfo", component: LookInfo, meta: { logined: true } },
        { path: "/updateinfo", component: UpdateInfo, meta: { logined: true } },
        { path: "/insert", component: InsertPage, meta: { logined: true } },
        { path: "/data", component: DataPage, meta: { logined: true } },
      ]
    },
  ]
});
