<!--
 * @Author: zhilutianji
 * @Date: 2022-01-02 19:34:04
 * @LastEditors: zhilutianji
 * @LastEditTime: 2022-01-02 22:43:56
 * @Description: file content
 * @FilePath: \shops_frontend_web\src\components\Header\index.vue
-->
<template>
  <div class="header">
    <div class="container">
      <div class="welcome">
        <span class="welcome_word">某商城欢迎您！</span>
        <span><router-link to="/login">登录</router-link></span>
        <span class="welcome_split">|</span>
        <span><router-link to="/register">注册</router-link></span>
      </div>
      <div class="functions">
        <span><a href="#">我的订单</a></span>
        <span class="welcome_split">|</span>
        <span><a href="#">我的购物车</a></span>
        <span class="welcome_split">|</span>
        <span><a href="#">我的某商城</a></span>
        <span class="welcome_split">|</span>
        <span><a href="#">某商城会员</a></span>
        <span class="welcome_split">|</span>
        <span><a href="#">关注某商城</a></span>
        <span class="welcome_split">|</span>
        <span><a href="#">商家后台</a></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
.header {
  width: 100%;
  background-color: #333;
  height: 40px;
  line-height: 40px;
  display: flex;
  justify-content: center;
  font-size: 1rem;
}
.container {
  width: 1226px;
  height: 40px;
  line-height: 40px;
  display: flex;
  justify-content: space-between;
}
.container > .welcome {
  width: fit-content;
  height: 40px;
  line-height: 40px;
}
.container > .welcome > .welcome_word {
  color: #b0b0b0;
  margin-right: 1rem;
}
.welcome_split {
  color: #b0b0b0;
  margin: 0 0.3rem;
}
.container > .welcome > span {
  display: inline-block;
  height: 40px;
  line-height: 40px;
  color: #b0b0b0;
}
.container > .welcome > span > a {
  display: inline-block;
  height: 40px;
  text-decoration: none;
  line-height: 40px;
  color: #b0b0b0;
}
.container > .welcome > span > a:hover {
  color: #ffffff;
}
/*功能 */
.container > .functions {
  width: fit-content;
  height: 40px;
  line-height: 40px;
}
.container > .functions > span {
  color: #b0b0b0;
  display: inline-block;
  height: 40px;
  line-height: 40px;
}
.container > .functions > span > a {
  text-decoration: none;
  color: #b0b0b0;
  display: inline-block;
  height: 40px;
  line-height: 40px;
}
.container > .functions > span > a:hover {
  color: #ffffff;
}
</style>