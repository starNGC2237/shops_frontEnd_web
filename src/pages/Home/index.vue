<!--
 * @Author: zhilutianji
 * @Date: 2022-01-02 19:31:11
 * @LastEditors: zhilutianji
 * @LastEditTime: 2022-01-07 00:36:15
 * @Description: file content
 * @FilePath: \shops_frontend_web\src\pages\Home\index.vue
-->
<template>
  <div>
    <h1>Home</h1>
    <LongBar></LongBar>
    <BrickBox></BrickBox>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/Footer";
import LongBar from "@/pages/Home/LongBar/index.vue"
import BrickBox from "@/pages/Home/BrickBox/index.vue"
export default {
  name: "Home",
  components: {
    Footer,
    LongBar,
    BrickBox
  },
};
</script>

<style scoped>
</style>