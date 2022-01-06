<!--
 * @Author: zhilutianji
 * @Date: 2022-01-02 19:31:11
 * @LastEditors: zhilutianji
 * @LastEditTime: 2022-01-07 00:53:06
 * @Description: file content
 * @FilePath: \shops_frontend_web\src\pages\Home\index.vue
-->
<template>
  <div>
    <h1>Home</h1>
    <LongBanner></LongBanner>
    <BrickBox></BrickBox>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/Footer";
import LongBanner from "@/pages/Home/LongBanner/index.vue"
import BrickBox from "@/pages/Home/BrickBox/index.vue"
export default {
  name: "Home",
  components: {
    Footer,
    LongBanner,
    BrickBox
  },
};
</script>

<style scoped>
</style>