<template>
  <div class="error-wrapper" style="margin-left: 40%; margin-top: 7%">
    <h2 class="not-find-title">404</h2>
    <p class="not-find-desc">
      抱歉！您访问的页面
      <em>失联</em>
      啦 ...
    </p>
    <el-button @click="$router.go(-1)">返回上一页</el-button>
    <el-button type="primary" class="not-find-btn-gohome" @click="loginForm">
      进入首页
    </el-button>
  </div>
</template>
<script>
export default {
  name: "NotFOundPage",
  data() {
    return {};
  },
  components: {},
  methods: {
    loginForm() {
      console.log("跳转到登录成功");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.error-wrapper {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
}

.not-find-title {
  margin: 20px 0 15px;
  font-size: 10em;
  font-weight: 400;
  color: rgb(55, 71, 79);
}

.not-find-desc {
  margin: 0 0 30px;
  font-size: 26px;
  color: rgb(118, 131, 143);
}

.not-find-desc > em {
  font-style: normal;
  color: #ee8145;
}

.not-find-btn-gohome {
  margin-left: 30px;
}
</style>
