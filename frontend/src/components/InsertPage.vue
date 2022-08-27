<template>
  <div class="ms-register">
    <el-breadcrumb separator="/" class="crumbs">
      <el-breadcrumb-item>志愿者管理</el-breadcrumb-item>
      <el-breadcrumb-item>新增志愿者</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <h3 class="title">新增志愿者</h3>
      <div class="form">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          size="medium"
        >
          <el-input type="hidden" v-model="ruleForm.userId" />
          <el-form-item label="姓名" prop="userName" style="margin-left:20px">
            <el-input
              v-model="ruleForm.userName"
              style="width:60%"
              placeholder="请填写姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="userPhone" style="margin-left:20px">
            <el-input
              v-model="ruleForm.userPhone"
              style="width:60%"
              placeholder="请填写联系电话"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="userEmail" style="margin-left:20px">
            <el-input
              v-model="ruleForm.userEmail"
              style="width:60%"
              placeholder="请填写邮箱"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="住址"
            prop="userAddress"
            style="margin-left:20px"
          >
            <el-input
              v-model="ruleForm.userAddress"
              style="width:60%"
              placeholder="请填写家庭住址"
            ></el-input>
          </el-form-item>

          <el-row>
            <el-col :span="8">
              <el-form-item
                label="性别"
                prop="userGender"
                style="margin-left:20px"
              >
                <el-select v-model="ruleForm.userGender">
                  <el-option label="男" value="男" />
                  <el-option label="女" value="女" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="年龄" prop="userAge">
                <el-input
                  v-model="ruleForm.userAge"
                  type="number"
                  style="width:37%"
                  placeholder="请填写年龄"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item
                label="服务时长"
                prop="numTime"
                style="margin-left:20px"
              >
                <el-input
                  v-model="ruleForm.numTime"
                  type="number"
                  placeholder="请填写服务时长"
                ></el-input> </el-form-item
            ></el-col>
            <el-col :span="16">
              <el-form-item label="加入时间" prop="userDate">
                <el-date-picker
                  type="date"
                  v-model="ruleForm.userDate"
                   value-format="yyyy-MM-dd"
                  style="width: 37%;"
                  placeholder="请填写加入时间"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item
                label="政治身份"
                prop="userPoli"
                style="margin-left:20px"
              >
                <el-select v-model="ruleForm.userPoli">
                  <el-option label="中共党员" value="中共党员" />
                  <el-option label="中共预备党员" value="中共预备党员" />
                  <el-option label="共青团员" value="共青团员" />
                  <el-option label="群众" value="群众" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="教育背景" prop="userEdu">
                <el-select v-model="ruleForm.userEdu">
                  <el-option label="研究生及以上" value="研究生及以上" />
                  <el-option label="本科" value="本科" />
                  <el-option label="专科" value="专科" />
                  <el-option label="高中" value="高中" />
                  <el-option label="初中及以下" value="初中及以下" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item style="margin-left:400px">
            <div>
              <el-button @click="addUser()" type="primary">确 定</el-button>
              <el-button @click="resetForm">重 置</el-button>
            </div>
          </el-form-item>
          <!-- <div
            class="dialog-footer"
            style="float:right;margin-bottom:40px"
          ></div> -->
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
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
      ruleForm: {
        userId: "",
        userName: "",
        userDate: "",
        userAddress: "",
        userPhone: "",
        userPoli: "",
        numTime: "",
        userAge: "",
        userGender: "",
        userEmail: "",
        userEdu: ""
      },
      rules: {
        userName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 6, message: "长度在2到6个字符", trigger: "blur" }
        ],
        userAddress: [
          { required: true, message: "请输入住址", trigger: "blur" },
          { min: 5, max: 25, message: "长度在5到25个字符", trigger: "blur" }
        ],
        userPhone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" }
        ],
        userEmail: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur"]
          }
        ],
        numTime: [
          { required: true, message: "服务时长不能为空", trigger: "blur" }
        ],
        userAge: [{ required: true, message: "年龄不能为空", trigger: "blur" }],
        userDate: [
          { required: true, message: "加入时间不能为空", trigger: "blur" }
        ],
        userGender: [
          { required: true, message: "性别不能为空", trigger: "change" }
        ],
        userPoli: [
          { required: true, message: "政治身份不能为空", trigger: "change" }
        ],
        userEdu: [{ required: true, message: "教育背景不能为空", trigger: "change" }]
      },
      tableData: []
    };
  },
  methods: {
    addUser() {
      this.$refs.ruleForm.validate(valid => {
        if (!valid) {
          return;
        }
        let postData = this.qs.stringify({
          userDate: this.ruleForm.userDate,
          userName: this.ruleForm.userName,
          userAddress: this.ruleForm.userAddress,
          userPhone: this.ruleForm.userPhone,
          userPoli: this.ruleForm.userPoli,
          numTime: this.ruleForm.numTime,
          userGender: this.ruleForm.userGender,
          userEmail: this.ruleForm.userEmail,
          userAge: this.ruleForm.userAge,
          userEdu: this.ruleForm.userEdu
        });
        this.axios({
          method: "post",
          url: "/insert",
          data: postData
        })
          .then(response => {
            // this.onSearch();
            this.resetForm();
            // this.$refs.ruleForm.resetFields();
            this.$message({
              type: "success",
              message: "志愿者信息添加成功"
            });
            this.dialogVisible = false;
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    }
  }
};
</script>

<style>
.form {
  margin-left: 200px;
}
.title {
  text-align: center;
  margin: 0 auto 20px -20px;
  color: #303133;
}
</style>
