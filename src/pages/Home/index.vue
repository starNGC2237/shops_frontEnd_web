<!--
 * @Author: zhilutianji
 * @Date: 2022-01-02 19:31:11
 * @LastEditors: zhilutianji
 * @LastEditTime: 2022-01-12 14:21:39
 * @Description: file content
 * @FilePath: \shops_frontend_web\src\pages\Home\index.vue
-->
<template>
    <div class='home'>
        <TypeNav></TypeNav>
        <SwiperWrapper></SwiperWrapper>
        <LongBanner></LongBanner>
        <BrickBox v-for='item in $store.state.home.categoryRecommends' :key='item.categoryId' :data='item'></BrickBox>
    </div>
</template>

<script>
import LongBanner from '@/pages/Home/LongBanner/index.vue'
import BrickBox from '@/pages/Home/BrickBox/index.vue'
import TypeNav from '@/components/TypeNav'
import SwiperWrapper from '@/pages/Home/SwiperWrapper/index.vue'
export default {
    name: 'Home',
    components: {
        LongBanner,
        BrickBox,
        TypeNav,
        SwiperWrapper
    }
}
</script>

<style scoped>
.home{
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
