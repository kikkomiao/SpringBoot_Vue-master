<template>
  <div>
    <el-breadcrumb separator="/" class="crumbs">
      <el-breadcrumb-item>志愿者管理</el-breadcrumb-item>
      <el-breadcrumb-item>志愿者列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            clearable
            placeholder="输入志愿者姓名检索"
            v-model="userName"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getSearchFromTop"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button
            class="el-icon-circle-plus-outline"
            type="primary"
            @click="dialogVisible = true"
            >添加志愿者</el-button
          >
        </el-col>
      </el-row>
      <br />
      <!-- 显示 -->
      <el-table
        :data="tableData"
        highlight-current-row
        border
        style="width: 100%"
         :default-sort = "{prop: 'userDate', order: ''}"
      >
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column label="姓名">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="right">
              <p>邮箱: {{ scope.row.userEmail }}</p>
              <p>电话：{{ scope.row.userPhone }}</p>
              <div slot="reference" class="name-wrapper">
                <el-button type="text">{{ scope.row.userName }}</el-button>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="userDate"
          label="加入时间"
          sortable
          :formatter="FormatDate"
        ></el-table-column>

        <el-table-column prop="userAddress" label="住址"></el-table-column>
        <el-table-column prop="userPhone" label="电话"> </el-table-column>
        <el-table-column prop="numTime" label="服务时长"> </el-table-column>
        <el-table-column prop="userPoli" label="政治身份"> </el-table-column>

        <el-table-column label="操作" fixed="right" width="300">
          <template slot-scope="scope">
            <el-button
              size="mini"
              icon="el-icon-share"
              @click="handleLook(scope.$index, scope.row)"
              >详情
            </el-button>
            <el-button
              size="mini"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)"
              >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 查看 -->
      <el-dialog
        title="志愿者卡片"
        :append-to-body="true"
        :visible.sync="dialogLook"
        width="40%"
        :before-close="handleClose"
      >
        <el-card class="box-card">
          <div class="name-role">
            <span class="sender">志愿者 - {{ Form.userName }}</span>
          </div>
          <div class="registe-info">
            <span class="registe-info">
              性别：
              {{ Form.userGender }}
            </span>&emsp;
            <span class="registe-info">
              年龄：
              {{ Form.userAge }}
            </span>
          </div>
          <div class="registe-info">
            <span class="registe-info">
              加入时间：
              {{ Form.userDate }}
            </span>
          </div>
          <el-divider></el-divider>
          <div class="personal-relation">
            <div class="relation-item">
              电话:
              <div style="float: right; padding-right:20px;">
                {{ Form.userPhone }}
              </div>
            </div>
            <div class="relation-item">
              邮箱:
              <div style="float: right; padding-right:20px;">
                {{ Form.userEmail }}
              </div>
            </div>
            <div class="relation-item">
              住址:
              <div style="float: right; padding-right:20px;">
                {{ Form.userAddress }}
              </div>
            </div>
          </div>
          <div class="personal-relation">
            <div class="relation-item">
              政治背景:
              <div style="float: right; padding-right:20px;">
                {{ Form.userPoli }}
              </div>
            </div>
            <div class="relation-item">
              教育背景:
              <div style="float: right; padding-right:20px;">
                {{ Form.userEdu }}
              </div>
            </div>
            <div class="relation-item">
              服务时长:
              <div style="float: right; padding-right:20px;">
                {{ Form.numTime }}小时
              </div>
            </div>
          </div>
        </el-card>
      </el-dialog>

      <!-- 添加 -->
      <el-dialog
        title="添加志愿者"
        :append-to-body="true"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose"
        @close="resetForm"
        top="40px"
      >
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
              style="width:80%"
              placeholder="请填写姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="userPhone" style="margin-left:20px">
            <el-input
              v-model="ruleForm.userPhone"
             style="width:80%"
              placeholder="请填写联系电话"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="userEmail" style="margin-left:20px">
            <el-input
              v-model="ruleForm.userEmail"
              style="width:80%"
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
              style="width:80%"
              placeholder="请填写家庭住址"
            ></el-input>
          </el-form-item>

          <el-row>
            <el-col :span="10">
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
            <el-col :span="14">
              <el-form-item label="年龄" prop="userAge">
                <el-input
                  v-model="ruleForm.userAge"
                  type="number"
                  style="width:62%"
                  placeholder="请填写年龄"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="10">
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
            <el-col :span="14">
              <el-form-item label="加入时间" prop="userDate">
                <el-date-picker
                  type="date"
                  value-format="yyyy-MM-dd"
                  v-model="ruleForm.userDate"
                  style="width: 62%;"
                  placeholder="请填写加入时间"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="10">
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
            <el-col :span="14">
              <el-form-item label="教育背景" prop="userEdu">
                <el-select v-model="ruleForm.userEdu"  style="width: 62%;">
                  <el-option label="研究生及以上" value="研究生及以上" />
                  <el-option label="本科" value="本科" />
                  <el-option label="专科" value="专科" />
                  <el-option label="高中" value="高中" />
                  <el-option label="初中及以下" value="初中及以下" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item style="margin-left:350px">
            <span>
              <el-button @click="addUser()" type="primary">确 定</el-button>
              <el-button @click="cancel()">取 消</el-button>
            </span>
          </el-form-item>
        </el-form>
      </el-dialog>

      <!-- 编辑 -->
      <el-dialog
        title="编辑志愿者信息"
        :append-to-body="true"
        :visible.sync="dialogUpdate"
        :before-close="handleClose"
        width="50%"
        @close="resetForm"
        top="40px"
      >
        <el-form
          :model="Form"
          :rules="rules"
          ref="Form"
          label-width="100px"
          size="medium"
        >
          <el-input type="hidden" v-model="Form.userId" />

          <el-form-item label="姓名" prop="userName" style="margin-left:20px">
            <el-input v-model="Form.userName" style="width:80%"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="userPhone" style="margin-left:20px">
            <el-input v-model="Form.userPhone" style="width:80%"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="userEmail" style="margin-left:20px">
            <el-input v-model="Form.userEmail" style="width:80%"></el-input>
          </el-form-item>

          <el-form-item
            label="住址"
            prop="userAddress"
            style="margin-left:20px"
          >
            <el-input v-model="Form.userAddress" style="width:80%"></el-input>
          </el-form-item>

          <el-row>
            <el-col :span="10">
              <el-form-item
                label="性别"
                prop="userGender"
                style="margin-left:20px"
              >
                <el-select v-model="Form.userGender">
                  <el-option label="男" value="男" />
                  <el-option label="女" value="女" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label="年龄" prop="userAge">
                <el-input
                  v-model="Form.userAge"
                  type="number"
                  style="width:62%"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="10">
              <el-form-item
                label="服务时长"
                prop="numTime"
                style="margin-left:20px"
              >
                <el-input
                  v-model="Form.numTime"
                  type="number"
                ></el-input> </el-form-item
            ></el-col>
            <el-col :span="14">
              <el-form-item label="加入时间" prop="userDate">
                <el-date-picker
                value-format="yyyy-MM-dd"
                  type="date"
                  v-model="Form.userDate"
                  style="width: 62%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="10">
              <el-form-item
                label="政治身份"
                prop="userPoli"
                style="margin-left:20px"
              >
                <el-select v-model="Form.userPoli">
                  <el-option label="中共党员" value="中共党员" />
                  <el-option label="中共预备党员" value="中共预备党员" />
                  <el-option label="共青团员" value="共青团员" />
                  <el-option label="群众" value="群众" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label="教育背景" prop="userEdu">
                <el-select v-model="Form.userEdu"  style="width: 62%;">
                  <el-option label="研究生及以上" value="研究生及以上" />
                  <el-option label="本科" value="本科" />
                  <el-option label="专科" value="专科" />
                  <el-option label="高中" value="高中" />
                  <el-option label="初中及以下" value="初中及以下" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item style="margin-left:350px">
            <span>
              <el-button @click="updateUser()" type="primary">提 交</el-button>
              <el-button @click="cancel()">取 消</el-button>
            </span>
          </el-form-item>
        </el-form>
      </el-dialog>

      <!-- 分页 -->
      <br />
      <div style="padding: 10px 0">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[2, 5, 10, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
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
      Form: {
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
        userEdu: [
          { required: true, message: "教育背景不能为空", trigger: "change" }
        ]
      },
      tableData: [],
      userName: "",
      total: 0,
      pageNum: 1,
      pageSize: 5,
      dialogVisible: false,
      dialogUpdate: false,
      dialogLook: false,
      disablePage: false
    };
  },
  mounted() {
    this.onSearch();
  },
  methods: {
    FormatDate(row, colum, cellValue) {
      let datetime = cellValue;
      if (datetime) {
        datetime = new Date(datetime);
        let y = datetime.getFullYear() + "-";
        let mon = (datetime.getMonth() + 1).toString().padStart(2, "0") + "-";
        let d = datetime
          .getDate()
          .toString()
          .padStart(2, "0");
        return y + mon + d;
      }
      return "";
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    cancel() {
      this.dialogUpdate = false;
      this.dialogVisible = false;
      this.emptyUserData();
    },
    emptyUserData() {
      this.ruleForm = {
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
      };
      this.Form = {
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
      };
    },
    resetForm() {
      if (this.$refs.ruleForm !== undefined) {
        this.$refs["ruleForm"].resetFields();
      }
      if (this.$refs.Form !== undefined) {
        this.$refs["Form"].resetFields();
      }
    },
    handleEdit(index, row) {
      this.dialogUpdate = true;
      this.Form = Object.assign({}, row); //这句是关键！！！
    },
    handleLook(index, row) {
      this.dialogLook = true;
      this.Form = Object.assign({}, row); //这句是关键！！！
    },

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
            this.onSearch();
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
    updateUser() {
      this.$refs.Form.validate(valid => {
        if (!valid) {
          return;
        }
        let postData = this.qs.stringify({
          userId: this.Form.userId,
          userDate: this.Form.userDate,
          userName: this.Form.userName,
          userAddress: this.Form.userAddress,
          userPhone: this.Form.userPhone,
          userPoli: this.Form.userPoli,
          numTime: this.Form.numTime,
          userGender: this.Form.userGender,
          userEmail: this.Form.userEmail,
          userAge: this.Form.userAge,
          userEdu: this.Form.userEdu
        });
        this.axios({
          method: "post",
          url: "/update",
          data: postData
        })
          .then(response => {
            // this.handleCurrentChange();
            this.onSearch();
            this.cancel();
            this.$message({
              type: "success",
              message: "修改志愿者信息成功!"
            });
            console.log(response);
          })
          .catch(error => {
            this.$message({
              type: "error",
              message: "修改志愿者信息失败!"
            });
            console.log(error);
          });
      });
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("确定移除该志愿者信息？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let postData = this.qs.stringify({
            userId: row.userId
          });
          this.axios({
            method: "post",
            url: "/delete",
            data: postData
          })
            .then(response => {
              this.onSearch();
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              console.log(response);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    async onSearch() {
      await this.$http
        .get(
          "/user/page?pageNum=" +
            this.pageNum +
            "&pageSize=" +
            this.pageSize +
            "&userName=" +
            this.userName
        )
        .then(res => {
          this.tableData = res.data.data;
          this.total = res.data.total;
        });
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.onSearch();
    },
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum;
      this.onSearch();
    },
    getSearchFromTop() {
      this.pageNum = 1;
      this.onSearch();
    }
  }
};
</script>

<style lang="scss" scoped>
.search_name {
  width: 200px;
}
.pages {
  margin: 0px;
  padding: 0px;
  text-align: right;
}
// .inputDeep >>> .el-input__inner {
//   border: 0;
// }

.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}
.box-card {
  width: 100%;
}

//文本样式区
.name-role {
  font-size: 16px;
  padding: 5px;
  text-align: center;
}
.sender {
  text-align: center;
}
.registe-info {
  text-align: center;
  padding-top: 10px;
}
.personal-relation {
  font-size: 16px;
  padding: 0px 5px 15px;
  margin-right: 1px;
  width: 100%;
}
.relation-item {
  padding: 12px;
}
.dialog-footer {
  padding-top: 10px;
  padding-left: 10%;
}
//布局样式区
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
