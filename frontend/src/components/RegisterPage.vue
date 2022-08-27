<template>
  <div class="register-wrap">
    <h3 class="ms-title">Register</h3>
    <div class="ms-register">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名" style="width:70%"/>
        </el-form-item>
        <el-form-item label="身份证号" prop="idcard">
          <el-input v-model="form.idcard" placeholder="请输入身份证号" style="width:70%"/>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号" style="width:70%"/>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱" style="width:70%"/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="form.password"
            placeholder="请输入密码"
            style="width:70%"
          />
        </el-form-item>
        <el-form-item label="确认密码" prop="pwdAgain">
          <el-input
            type="password"
            v-model="form.pwdAgain"
            placeholder="请确认密码"
            style="width:70%"
          />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="form.gender" placeholder="请选择性别">
            <el-option label="男" value="1" />
            <el-option label="女" value="2" />
          </el-select>
        </el-form-item>
      </el-form>
      <!-- </el-dialog> -->
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">注 册</el-button>
        <el-button @click="cancel">取 消</el-button>
        <el-button @click="resetForm">重 置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterPage",
  components: {},
  data() {
    var validatePass = (rule, value, callback) => {
      if (this.form.password !== "") {
        this.$refs.form.validateField("pwdAgain");
      }
      callback();
    };
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validatePhone = (rule, value, callback) => {
      if (value && value != "") {
        if (!/^1[0-9]{10}$/.test(value)) {
          callback(new Error("请输入正确的手机号"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    var validateIdcard = (rule, value, callback) => {
      if (value && value != "") {
        if (
          !/^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(
            value
          )
        ) {
          callback(new Error("请输入正确的身份证号"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    return {
      form: {
        // 弹出层标题
        idcard: "",
        password: "",
        pwdAgain: "",
        email: "",
        phone: "",
        name: "",
        gender: ""
        // title: "",
        // 是否显示弹出层
        // open: false,
        // 表单校验
      },
      rules: {
        name: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          {
            min: 2,
            max: 6,
            message: "长度在 2 到 6 个字符",
            trigger: "blur"
          }
        ],
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" }
        ],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur"]
          }
        ],
        idcard: [
          { required: true, message: "身份证号不能为空", trigger: "blur" },
          { validator: validateIdcard, trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "密码长度在 6到 16 个字符",
            trigger: "blur"
          },
          { validator: validatePass, trigger: "blur" }
        ],
        pwdAgain: [
          { required: true, message: "请确认密码", trigger: "blur" },
          { validator: validatePass2, trigger: "blur" }
        ],
         gender: [
          { required: true, message: "性别不能为空", trigger: "blur" },
        ],
      }
    };
  },
  created() {},
  methods: {
    // eslint-disable-next-line vue/no-dupe-keys
    // open() {
    //   this.open = true;
    // },
    submitForm() {
      this.$refs.form.validate(async valid => {
        if (!valid) {
          return;
        } else {
          console.log("注册成功");
          const ret = await this.$http.get("/insertinfo/", {
            params: {
              idcard: this.form.idcard,
              password: this.form.password,
              name: this.form.name,
              phone: this.form.phone,
              email: this.form.email,
              gender: this.form.gender
            }
          });
          console.log("注册成功1");
          console.log(ret.data);
          if (ret.status === 200&&ret.data === 1) {
            this.$message.success("注册成功！请登录");
            console.log("成功！转到登录");
            this.$router.push("/login");
          } else if (ret.data === -1) {
            this.$message.error("该身份证号已注册！注册失败");
          }else{
            this.$message.error("网络出错了，请重试");
          }
        }
      });
    },
    resetForm() {
      this.$refs.form.resetFields();
    },
    cancel() {
      console.log("取消跳转到登录");
      this.$router.push("/login");
    }
  }
};
</script>
<style scoped>
.ms-register {
  position: absolute;
  left: 37%;
  top: 40%;
  width: 700px;
  border-radius: 5px;
  height: 460px;
  margin: -190px 0 0 -190px;
  padding: 40px;
  background: #fff;
}
.ms-title {
  position: absolute;
  top: 5%;
  width: 100%;
  /* margin-top: 250px; */
  text-align: center;
  font-size: 30px;
  color: black;
  font-family: "Microsoft YaHei";
  /* margin-left: -px; */
  /* font-weight: bold; */
}
.register-wrap {
  /* position: relative;
  width: 100%;
  height: 100%; */
  font-family: Arial, "PingFang SC", "Microsoft YaHei";
  width: 100%;
  height: 100%;
  background: url(../assets/img/login-bg.jpg) no-repeat fixed;
  background-size: cover;
}
.app-container {
  margin-top: 100px;
  margin-left: 400px;
  margin-right: 400px;
}
.dialog-footer {
  margin-left: 60%;
}
</style>
