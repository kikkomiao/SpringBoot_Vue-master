<template>
  <div class="box">
    <el-breadcrumb separator="/" class="crumbs">
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>修改密码</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      class="box1"
      ref="form"
      :model="form"
      :rules="rules"
      label-width="100px"
    >
      <h3 class="title">修改密码</h3>
      <el-form-item label="原密码" prop="oldpassword">
        <el-input
          type="password"
          show-password
          auto-complete="off"
          placeholder="请输入原密码"
          v-model="form.oldpassword"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input
          type="password"
          show-password
          auto-complete="off"
          placeholder="请设置新密码"
          v-model="form.password"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="password2">
        <el-input
          type="password"
          show-password
          auto-complete="off"
          placeholder="请确认新密码"
          v-model="form.password2"
        ></el-input>
      </el-form-item>
      <el-form-item style="float:right">
        <el-button type="primary" @click="submitForm()">保 存</el-button>
        <el-button @click="$refs['form'].resetFields()">重 置</el-button>
        <el-button @click="cancel()">取 消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "UpdatePwd",
  data() {
    const validateNewPassword = (rule, value, callback) => {
      if (value === this.form.oldpassword) {
        callback(new Error("新密码不能与原密码相同!"));
      } else {
        callback();
      }
    };
    const validateNewPassword2 = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        idcard: "",
        oldpassword: "",
        // 新密码
        password: "",
        // 确认密码
        password2: ""
      },

      // 表单校验
      rules: {
        oldpassword: [
          { required: true, message: "请输入原密码", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请设置新密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "密码长度在 6到 16 个字符",
            trigger: "blur"
          },
          { validator: validateNewPassword, trigger: "blur" }
        ],
        password2: [
          { required: true, message: "请确认新密码", trigger: "blur" },
          { validator: validateNewPassword2, trigger: "blur" }
        ]
      }
    };
  },
  created() {
    // this.getCookie()
  },
  methods: {
    submitForm() {
      this.$refs.form.validate(async valid => {
        if (!valid) {
          return;
        } else {
          console.log("验证成功");
          //   this.idcard = sessionStorage.getItem('idcard');
          const ret = await this.$http.get("/updatepwd/", {
            params: {
              idcard: sessionStorage.getItem("idcard"),
              password: this.form.password,
              oldpassword: this.form.oldpassword
            }
          });
          console.log("1111");
          console.log(ret.data);
          if (ret.status === 200 && ret.data === 1) {
            sessionStorage.setItem("password", this.form.password);
            this.$message.success("修改密码成功,请重新登录");
            sessionStorage.clear();
            this.$router.push("/login");
            console.log("success");
          } else if (ret.data === 2) {
            this.$message.error("原密码错误！请重试");
          } else {
            this.$message.error("网络出错了！请重试");
          }
        }
      });
    },
    cancel() {
      // console.log("取消跳转到登录");
      this.$router.push("/main");
    }
  }
};
</script>
<style lang="scss">
.user-account-key {
  width: 500px;
  margin: 100px auto;
}
.box1 {
  border: 1px solid #dcdfe6;
  width: 500px;
  height: 330px;
  margin: 120px auto;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
  background-color: white;
}
.title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
}
.box {
  // width:100%;
  height: 50px;
}
</style>
