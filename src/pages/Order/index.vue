<template>
    <div class='order'>
        <div class='order_container'>
            <el-page-header class='header' @back="goBack" content="我的订单"></el-page-header>
            <el-table :data='tableData'>
                <el-table-column width='100'>
                    <template slot-scope='scope'>
                        <el-tag>{{!!scope.row.isCarry?'自提':'发货'}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    width='150'
                    align='center'
                    prop='orderName'
                    label='订单名'>
                </el-table-column>
                <el-table-column
                    prop='goods[0].goodName'
                    label='商品名称'>
                </el-table-column>
                <el-table-column
                    align='center'
                    width='100'
                    prop='goods[0].price'
                    label='单价'>
                </el-table-column>
                <el-table-column
                    width='200'
                    align='center'
                    prop='goods[0].number'
                    label='数量'>
                </el-table-column>
                <el-table-column
                    align='center'
                    label='小计'>
                    <template slot-scope='scope'>
                        {{(scope.row.goods[0].number * scope.row.goods[0].price).toFixed(10)}}
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import ApiOrder from '@/api/order/order'
export default {
    name: 'Order',
    data() {
        return {
            tableData: []
        }
    },
    mounted() {
        this.getOrder()
    },
    methods: {
        goBack() {
            this.$router.push({ path: '/home' })
        },
        getOrder() {
            ApiOrder.allOrder(1).then(res => {
                this.tableData = res.data
            }).catch().finally()
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
