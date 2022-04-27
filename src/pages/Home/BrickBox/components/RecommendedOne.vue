<template>
    <div class='recommended-two'>
        <el-card @click.native='toGood(item)' shadow="hover" :body-style='{padding:"20px 0"}'>
            <div class='recommended-img'>
                <img v-if='JSON.stringify(item) !== "{}"' :src='item.imageUrl' alt=''>
            </div>
            <h3 class='title' v-if='JSON.stringify(item) !== "{}"'>
                {{ item.goodName }}
            </h3>
            <p class='desc' v-if='JSON.stringify(item) !== "{}"'>{{ item.title }}</p>
            <p class='price' v-if='JSON.stringify(item) !== "{}"'>
                <span class="num">{{item.price}}</span>
                元
                <span>起</span>
            </p>
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'RecommendedTwo',
    props: ['item'],
    methods: {
        toGood(item) {
            if (item.goodId) {
                this.$router.push({ path: `/good/${item.goodId}` })
            }
        }
    }
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
