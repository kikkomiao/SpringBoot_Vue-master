<template>
  <el-container>
    <div class="controlPanel-sidebar" width="220px">
      <el-menu
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        background-color="rgb(32,34,42)"
        text-color="rgba(255, 255, 255, 0.8)"
        active-text-color="#fff"
        :default-active="onRoutes"
        router
      >
        <div class="Title1" v-if="!isCollapse"><span>智慧志愿平台</span></div>
        <div class="Title2" v-if="isCollapse" style="width: 60px">V</div>

        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-data-board"></i>
            <span slot="title">关于我们</span>
          </template>
          <el-menu-item index="show">
            <div class="barstyle"></div>
            系统概述
          </el-menu-item>
          <el-menu-item index="data">
            <div class="barstyle"></div>
            数据分析
          </el-menu-item>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">志愿者管理</span>
          </template>
          <el-menu-item index="main">
            <div class="barstyle"></div>
            志愿者列表
          </el-menu-item>
          <el-menu-item index="insert">
            <div class="barstyle"></div>
            新增志愿者
          </el-menu-item>
        </el-submenu>
        <el-submenu index="6">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span slot="title">个人中心</span>
          </template>
          <!-- <el-menu-item index="lookinfo">
            <div class="barstyle"></div>
            查看个人信息
          </el-menu-item> -->
          <el-menu-item index="updateinfo">
            <div class="barstyle"></div>
            修改个人信息
          </el-menu-item>
          <el-menu-item index="updatepwd">
            <div class="barstyle"></div>
            修改密码
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <el-container class="controlPanel-mainbar">
      <el-header height="55px">
        <i
          class="el-icon-s-fold"
          @click="CollapseTrue()"
          id="CollapseTrueIcon"
        ></i>
        <i
          class="el-icon-s-unfold"
          @click="CollapseFalse()"
          id="CollapseFalseIcon"
        ></i>
        <div class="userinfo">
          <el-dropdown :hide-on-click="false" @command="handleCommand">
            <!-- <div class="el-dropdown-link">
              admin
              <i class="el-icon-arrow-down el-icon--right"></i>
            </div> -->
            <span class="el-dropdown-link">
                <span class="user-name">  {{ name }}</span>
              <img
                class="user-logo"
                v-if="gender === '1'"
                src="@/assets/img/man.png"
              />
              <img class="user-logo" v-else src="@/assets/img/woman.png" />
            </span>

            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="show">首页</el-dropdown-item>
              <!-- <el-dropdown-item command="lookinfo"
                >查看个人信息</el-dropdown-item
              > -->
              <el-dropdown-item command="updateinfo"
                >修改个人信息</el-dropdown-item
              >
              <el-dropdown-item command="updatepwd">修改密码</el-dropdown-item>
              <el-dropdown-item command="lougout" divided
                >退出系统</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
          <!-- <div class="avater"></div> -->
        </div>
      </el-header>
      <el-main>
        <el-scrollbar style="height: 100%">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {

  name: "HomePage",
  data() {
    return {
      name:"",
      gender:"",
      isCollapse: false,
      input: ""
    };
  },
  mounted() {
    this.gender = sessionStorage.getItem("gender");
    console.log(this.gender);
    this.name = sessionStorage.getItem("name");
  },

  // activated(){
  //   this.gender = sessionStorage.getItem("gender");
  //   console.log(this.gender);
  //   this.name = sessionStorage.getItem("name");
  // },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
      //   分割route字符串并把斜杠去掉 routers是数组 route是一个路由 即当前路由
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    //收起
    CollapseTrue() {
      this.isCollapse = true;
      var show1 = document.getElementById("CollapseTrueIcon");
      var show2 = document.getElementById("CollapseFalseIcon");
      show2.style.display = "block";
      show1.style.display = "none";
    },
    //展开
    CollapseFalse() {
      this.isCollapse = false;
      var show1 = document.getElementById("CollapseTrueIcon");
      var show2 = document.getElementById("CollapseFalseIcon");
      show1.style.display = "block";
      show2.style.display = "none";
    },
    handleCommand(cmditem) {
      if (!cmditem) {
        this.$message("菜单选项缺少command属性");
        return;
      }
      switch (cmditem) {
        case "show":
          this.show();
          break;
        case "lookinfo":
          this.lookInfo();
          break;
        case "updateinfo":
          this.updateInfo();
          break;
        case "lougout":
          this.lougout();
          break;
        case "updatepwd":
          this.updatePwd();
          break;
      }
    },
    show() {
      this.$router.push("/show");
    },
    updateInfo() {
      this.$router.push("/updateinfo");
    },
    lookInfo() {
      this.$router.push("/lookinfo");
    },
    updatePwd() {
      this.$router.push("/updatepwd");
    },
    lougout() {
      sessionStorage.clear();
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="scss" scoped>
.controlPanel-sidebar {
  height: 100vh;
  .Title1 {
    background: rgb(32, 34, 42);
    width: 219px;
    height: 55px;
    border-bottom: 2px rgb(6, 7, 8) solid;
    span {
      display: block;
      text-align: center;
      font-weight: 300;
      font-size: 18px;
      color: white;
      font-family: "YouYuan";
      padding-top: 15px;
    }
  }
  .Title2 {
    background: rgb(32, 34, 42);
    width: 219px;
    height: 55px;
    border-bottom: 2px rgb(6, 7, 8) solid;
    display: block;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: #fff;
    padding-top: 15px;
  }
  .el-menu-vertical-demo {
    // width: 220px;
    min-height: 100%;
    height: 100%;
    .barstyle {
      width: 4px;
      background: #409eff;
      height: 50px;
      float: left;
      margin-left: -40px;
      display: none;
    }
    .el-menu-item:hover {
      background: rgb(6, 7, 8) !important;
      color: #fff !important;
      i {
        color: #fff !important;
      }
      .barstyle {
        display: block;
      }
    }
    .el-menu-item.is-active {
      background: rgb(6, 7, 8) !important;
      .barstyle {
        display: block;
      }
    }
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 220px;
  }
}
.user-logo {
  position: absolute;
  left: -50px;
  top: 8px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.user-name{
  position: relative;
  display: inline-block;
  padding-top:20px;
  padding-left:20px;
  padding-right: 50px;
  cursor: pointer;
  vertical-align: middle;
}

.controlPanel-mainbar {
  padding: 0px;
  height: 100vh;
  background: rgb(242, 242, 242);
  .el-header {
    background: white !important;
    .el-icon-s-fold {
      font-size: 28px;
      color: rgb(144, 147, 153);
      padding-top: 13px;
      display: block;
      width: 20px;
      float: left;
    }
    .el-icon-s-unfold {
      font-size: 28px;
      color: rgb(144, 147, 153);
      padding-top: 13px;
      display: none;
      width: 20px;
      float: left;
    }
    .el-input {
      width: 250px;
      padding-left: 30px;
      padding-top: 12px;
      .el-button {
        padding-left: 13px;
        padding-right: 6px;
      }
    }
    .userinfo {
      float: right;
      .avater {
        width: 35px;
        height: 35px;
        background: rgb(56, 161, 242);
        -moz-border-radius: 50px;
        -webkit-border-radius: 50px;
        border-radius: 50px;
        margin-top: 10px;
        float: right;
        margin-right: 15px;
      }
      // .el-dropdown {
      //   float: right;
      //   .el-dropdown-link {
      //     color: black !important;
      //     // float: right;
      //     margin-right: 5px;
      //     margin-top: 18px;
      //   }
      // }
    }
  }
}
</style>
