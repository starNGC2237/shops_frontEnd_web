<!--
 * @Author: zhilutianji
 * @Date: 2022-01-06 23:58:46
 * @LastEditors: zhilutianji
 * @LastEditTime: 2022-01-07 00:37:50
 * @Description: file content
 * @FilePath: \shops_frontend_web\src\pages\Home\LongBar\index.vue
-->
<template>
  <div class="long_bar">
    <div class="container">
      <router-link to="/search">
        <img
          src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/88e35cffc82cd98cd53172460067af17.jpg?thumb=1&w=1839&h=180&f=webp&q=90"
          alt=""
        />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "LongBar",
};
</script>

<style scoped>
.long_bar {
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: center;
  margin: 1.5rem 0;
}
.long_bar >.container {
  width: 1226px;
  height: 120px;
}
.long_bar >.container>a>img {
  width: 1226px;
  height: 120px;
}
</style>