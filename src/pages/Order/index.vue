<template>
    <div class='order'>
        <div class='order_container'>
            <el-page-header class='header' @back="goBack" content="我的订单"></el-page-header>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Order',
    methods: {
        goBack() {
            this.$router.push({ path: '/home' })
        }
    }
}
</script>

<style scoped lang='scss'>
.order{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    >.order_container{
        width: 1226px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        >div:not(:last-child){
            margin-bottom: 1.5rem;
        }
        >.header{
             height: 5rem;
             background-color: white;
             display: flex;
             align-items: center;
             padding: 1rem;
             box-sizing: border-box;
        }
    }
}

</style>
