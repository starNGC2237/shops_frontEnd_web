<template>
    <div class='recommended-two'>
        <el-card shadow="hover" :body-style='{padding:"20px 0"}'>
            <div class='recommended-img'>
                <img src='https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e870129c5c374088bf7cc46be0b7ace2.jpg?thumb=1&w=300&h=300&f=webp&q=90' alt=''>
            </div>
            <h3 class='title'>
                Xiaomi 12 Pro
            </h3>
            <p class='desc'>全新骁龙8｜2K AMOLED屏幕</p>
            <p class='price'>
                <span class="num">4699</span>
                元
                <span>起</span>
            </p>
        </el-card>
        <el-card shadow="hover" :body-style='{padding:"20px 0"}'>
            <div class='recommended-img'>
                <img src='https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e870129c5c374088bf7cc46be0b7ace2.jpg?thumb=1&w=300&h=300&f=webp&q=90' alt=''>
            </div>
            <h3 class='title'>
                Xiaomi 12 Pro
            </h3>
            <p class='desc'>全新骁龙8｜2K AMOLED屏幕</p>
            <p class='price'>
                <span class="num">4699</span>
                元
                <span>起</span>
            </p>
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'RecommendedTwo'
}
</script>

<style scoped lang='scss'>
img{
    width: 160px;
    height: 160px;
    margin: 0 auto;
}
.recommended-two{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    >div{
        height: 300px;
        cursor: pointer;
    }
}
.recommended-img{
    display: flex;
    width: 100%;
    justify-content: center;
    margin-bottom: 18px;
}
.title {
    margin: 0 10px 2px;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 14px;
    font-weight: 400;
    color: #333;
}
.desc{
    margin: 0 10px 10px;
    height: 18px;
    font-size: 12px;
    color: #b0b0b0;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
.price{
    margin: 0 10px 14px;
    text-align: center;
    color: #ff6700;
}
.num{
    text-align: center;
    color: #ff6700;
}
</style>
