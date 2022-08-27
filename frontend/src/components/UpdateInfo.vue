<template>
  <div class="box">
    <el-breadcrumb separator="/" class="crumbs">
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>修改个人信息</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- <el-card> -->
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <h3 class="title">修改个人信息</h3>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱" />
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-select v-model="form.gender" placeholder="请选择性别">
          <el-option label="男" value="1" />
          <el-option label="女" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item style="float:right">
        <el-button type="primary" @click="submitForm()">保 存</el-button>
        <!-- <el-button @click="$refs['form'].resetFields()">重 置</el-button> -->
        <el-button @click="cancel()">取 消</el-button>
      </el-form-item>
    </el-form>
    <!-- </el-dialog> -->
    <!-- </el-card> -->
  </div>
</template>

<script>
export default {
  name: "UpdateInfo",
  data() {
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
    return {
      form: {
        idcard: "",
        name: sessionStorage.getItem("name"),
        phone: sessionStorage.getItem("phone"),
        email: sessionStorage.getItem("email"),
        gender: sessionStorage.getItem("gender")
      },
      update: "true",
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
        ]
      }
    };
  },
  // activated: function() {
  //   this.getData();
  // },
  inject: ["reload"],
  methods: {
    submitForm() {
      this.$refs.form.validate(async valid => {
        if (!valid) {
          return;
        } else {
          console.log("验证成功");
          //   this.idcard = sessionStorage.getItem('idcard');
          const ret = await this.$http.get("/updateinfo/", {
            params: {
              idcard: sessionStorage.getItem("idcard"),
              name: this.form.name,
              phone: this.form.phone,
              email: this.form.email,
              gender: this.form.gender
            }
          });
          console.log("1111");
          console.log(ret.data);
          if (ret.status === 200) {
            sessionStorage.setItem("name", this.form.name);
            sessionStorage.setItem("email", this.form.email);
            sessionStorage.setItem("phone", this.form.phone);
            sessionStorage.setItem("gender", this.form.gender);
            this.$message.success("修改信息成功");

            console.log("success");

            this.reload();
            // location.reload(true);
            // reload();
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
    // reload() {
    //   // 移除组件
    //   this.update = false;
    //   // 在组件移除后，重新渲染组件
    //   // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
    //   this.$nextTick(() => {
    //     this.update = true;
    //   });
    // }
  }
};
</script>

<style lang="scss">
.demo-ruleForm {
  border: 1px solid #dcdfe6;
  width: 500px;
  height: 400px;
  margin: 80px auto;
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
