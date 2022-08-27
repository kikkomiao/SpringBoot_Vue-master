// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
Vue.use(elementUI)
Vue.prototype.$message = elementUI.Message;
import axios from 'axios'
Vue.prototype.$http = axios;
Vue.prototype.axios = axios;

import qs from 'qs';
Vue.prototype.qs = qs;

// 导入验证码组件
import SIdentify from "./components/Identify";
Vue.component("SIdentify", SIdentify);

// 引入echarts
import * as echarts from "echarts"
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.meta.logined) {
    if (sessionStorage.getItem("login") === "1") {
      next();
    } else {
      next({ path: "/login" });
    }
  } else {
    next();
  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
