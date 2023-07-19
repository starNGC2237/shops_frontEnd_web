<template>
    <el-carousel style='width: 1226px;height:460px;' direction="vertical" autoplay :interval="4000">
        <el-carousel-item style='width: 1226px;height: 460px;' v-for='item in 4' :key='item' :name="item+''">
            <router-link to='/search/家电'>
                    <div class="img" v-show="!load" style="background-color: transparent;"></div>
                    <el-image
                        class="img"
                        @load="handleImageLoad"
                        @error="handleImageError"
                        :src='img'
                        v-show="load"
                        alt='北京市节能减排补贴'
                    />
            </router-link>
        </el-carousel-item>
    </el-carousel>
</template>

<script>

export default {
    name: 'SwiperWrapper',
    data() {
        return {
            img: require('@/assets/1.webp'),
            load: false
        }
    },
    methods: {
        handleImageLoad() {
            console.log('图片加载成功')
            this.load = true
        },
        handleImageError() {
            console.log('图片加载失败')
            this.load = false
        }
    }
}
</script>

<style scoped lang='scss'>
.img,img{
    width: 1226px;
    height: 460px;
    cursor: pointer;
}
.el-carousel__container{
    width: fit-content;
    height: fit-content;
}
</style>
