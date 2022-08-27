<!-- 系统介绍组件 Readme.vue -->
<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/" class="crumbs">
        <el-breadcrumb-item>关于我们</el-breadcrumb-item>
        <el-breadcrumb-item>系统概述</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="ms-doc">
      <h3>智慧志愿-志愿者管理系统</h3>
      <article>
        <h1>Volunteer Management System</h1>
        <ul>
          <li>
            <p>前端技术栈：Vue.js 2.x、Vue-Router、Element UI axios、Echarts</p>
          </li>
          <li><p>后端技术栈：java、SpringBoot框架</p></li>
          <li><p>数据库及管理工具：MySQL、Navicat for MySQL</p></li>
        </ul>
        <h2>前言</h2>
        <ul>
          <li>
            <p>
              本系统包括注册、登录、数据分析、志愿者管理、个人中心5个个功能模块，志愿者管理包括对志愿者的增添、删除、修改、搜索操作，个人中心包括管理员修改个人信息，修改密码。
            </p>
          </li>
          <li>
            <p>
              该系统是一套多功能的简易后台框架模板，适用于绝大部分的后台管理系统（Web
              Management
              System）开发。基于vue.js，使用vue-cli脚手架快速生成项目目录，引用Element
              UI组件库，方便开发快速简洁的组件。
            </p>
          </li>
          <li>
            <p>
              使用WebStorage（sessionStorage）存储会话信息，如管理员信息等。
            </p>
          </li>
        </ul>
        <h2>安装步骤</h2>
        <p>cd projectName //projectName为项目文件名，进入项目目录</p>
        <p>npm install //安装项目依赖，等待安装完成</p>
        <h2>本地开发</h2>
        <p>//开启前端服务，浏览器访问 http://localhost:8080</p>
        <p>命令行输入npm run dev</p>
      </article>
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {};
  }
};
</script>
<style scoped>
.ms-doc {
  width: 100%;
  max-width: 1240px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
    sans-serif;
}
.ms-doc h3 {
  padding: 9px 10px 10px;
  margin: 0;
  font-size: 14px;
  line-height: 17px;
  background-color: #f5f5f5;
  border: 1px solid #d8d8d8;
  border-bottom: 0;
  border-radius: 3px 3px 0 0;
}
.ms-doc article {
  padding: 45px;
  word-wrap: break-word;
  background-color: #fff;
  border: 1px solid #ddd;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
}
.ms-doc article h1 {
  font-size: 32px;
  padding-bottom: 10px;
  margin-bottom: 15px;
  border-bottom: 1px solid #ddd;
}
.ms-doc article h2 {
  margin: 24px 0 16px;
  font-weight: 600;
  line-height: 1.25;
  padding-bottom: 7px;
  font-size: 24px;
  border-bottom: 1px solid #eee;
}
.ms-doc article p {
  margin-bottom: 15px;
  line-height: 1.5;
}
</style>
