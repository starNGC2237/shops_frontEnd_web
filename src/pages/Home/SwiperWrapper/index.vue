<template>
    <el-carousel style='width: 1226px;height:460px;' direction="vertical" autoplay :interval="4000">
        <el-carousel-item style='width: 1226px;height: 460px;' v-for='item in 4' :key='item'>
            <img src='https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/328715e54aafd28fd4001b9e50ddbd87.png?thumb=1&w=1839&h=690&f=webp&q=90' alt=''>
        </el-carousel-item>
    </el-carousel>
</template>

<script>
export default {
    name: 'SwiperWrapper'
}
</script>

<style scoped lang='scss'>
img{
    width: 1226px;
    height: 460px;
    cursor: pointer;
}
.el-carousel__container{
    width: fit-content;
    height: fit-content;
}
</style>
