<template>
  <div class="login-wrap">
    <h3 class="ms-title">智慧志愿</h3>
    <div class="ms-login">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item prop="idcard">
          <el-input v-model="ruleForm.idcard" placeholder="身份证号"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            placeholder="密码"
          ></el-input>
        </el-form-item>

        <el-form-item prop="validate">
          <el-input
            class="validate-code"
            v-model="ruleForm.validate"
            placeholder="验证码"
          ></el-input>
          <div class="code" @click="refreshCode">
            <s-identify :identifyCode="identifyCode"> </s-identify>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">登录</el-button>
          <el-button type="primary" @click="registerForm">注册</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
        <div style="text-align: center;color: white;">
          <el-link href="/#/register" target="_blank"
            >没有账号？点我注册</el-link
          >
        </div>
      </el-form>
    </div>
  </div>
</template>

<script scoped>
export default {
  data() {
    var validateV = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (value !== this.identifyCode) {
        callback(new Error("验证码输入错误"));
      } else {
        callback();
      }
    };
    return {
      radio: "",
      identifyCodes: "1234567890",
      identifyCode: "",
      ruleForm: {
        idcard: "",
        password: "",
        validate: ""
      },
      rules: {
        idcard: [
          { required: true, message: "请输入身份证号", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        validate: [{ validator: validateV, trigger: "blur" }]
      }
    };
  },
  components: {},
  mounted() {
    this.makeCode(this.identifyCodes, 4);
  },
  methods: {
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
      // floor下取整 从min到max
    },
    makeCode(s, l) {
      for (let i = 0; i < l; i++)
        this.identifyCode += s[this.randomNum(0, s.length)];
      // this.identifyCode += s[this.randomNum(0,s.length)];
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    submitForm() {
      this.$refs.ruleForm.validate(async valid => {
        if (!valid) {
          return;
        }
        // 前后交互
        console.log("成功");
        const ret = await this.$http.get("/selectinfo/", {
          params: {
            idcard: this.ruleForm.idcard,
            password: this.ruleForm.password
          }
        });

        console.log(ret.data);

        if (ret.data.name != null) {
          console.log("object not null");
        }else{
           console.log("null!!!!!!!");
        }

        if (ret.status === 200&&ret.data.name != null) {
          sessionStorage.setItem("name", ret.data.name);
          sessionStorage.setItem("idcard", ret.data.idcard);
          sessionStorage.setItem("password", ret.data.password);
          sessionStorage.setItem("email", ret.data.email);
          sessionStorage.setItem("phone", ret.data.phone);
          sessionStorage.setItem("gender", ret.data.gender);
          sessionStorage.setItem("login", 1);
          this.$router.push("/show");
        } else if(ret.data.name == null) {
          this.$message.error("用户名或密码错误");
        }else if(ret.status !== 200){
          this.$message.error("网络出错了~请重试");
        }
      });
    },

    registerForm() {
      console.log("跳转到注册成功");
      this.$router.push("/register");
    }
  }
};
</script>

<style scoped>
.login-wrap {
  /* position: relative;
  width: 100%;
  height: 100%; */
  font-family: Arial, "PingFang SC", "Microsoft YaHei";
  width: 100%;
  height: 100%;
  background: url(../assets/img/login-bg.jpg) no-repeat fixed;
  background-size: cover;
}
.ms-title {
  position: absolute;
  top: 50%;
  width: 100%;
  margin-top: -230px;
  text-align: center;
  font-size: 30px;
  color: black;
  font-family: "Microsoft YaHei";
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  border-radius: 5px;
  height: 240px;
  margin: -150px 0 0 -190px;
  padding: 40px;
  background: #fff;
}
.code {
  width: 112px;
  height: 35px;
  border: 1px solid #ccc;
  float: right;
  border-radius: 2px;
}
.validate-code {
  width: 136px;
  float: left;
}
.remember {
  font-size: 14px;
  /* margin-bottom: 10px; */
  margin: -10px 0 10px;
}
</style>
