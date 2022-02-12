<template>
    <div class='swiper-wrapper'>
        <div class='container'>
            <img src='https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/328715e54aafd28fd4001b9e50ddbd87.png?thumb=1&w=1839&h=690&f=webp&q=90' alt=''>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SwiperWrapper'
}
</script>

<style scoped lang='scss'>
.swiper-wrapper{
    width: 100%;
    display: flex;
    justify-content: center;
    >.container{
        width: 1226px;
        height: 460px;
        img{
            width: 1226px;
            height: 460px;
        }
    }
}

</style>
