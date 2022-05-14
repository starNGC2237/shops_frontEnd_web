<template>
    <div class='expand'>
        <el-table :data='props' border>
            <el-table-column
                align='center'
                label='状态'>
                <template slot-scope='scope'>
                    <span v-if='scope.row.orderStatus === 0'>订单未提交</span>
                    <span v-if='scope.row.orderStatus === 1'>订单已提交</span>
                    <span v-if='scope.row.orderStatus === 2'>订单已发</span>
                    <span v-if='scope.row.orderStatus === 3'>订单已完成</span>
                </template>
            </el-table-column>
            <el-table-column
                width='150'
                align='center'
                prop='orderName'
                label='订单名'>
            </el-table-column>
            <el-table-column
                align='center'
                prop='goods.goodName'
                label='商品名称'>
            </el-table-column>
            <el-table-column
                align='center'
                width='100'
                prop='goods.price'
                label='单价'>
            </el-table-column>
            <el-table-column
                width='200'
                align='center'
                prop='goods.number'
                label='数量'>
            </el-table-column>
            <el-table-column
                align='center'
                label='小计'>
                <template slot-scope='scope'>
                    {{(scope.row.goods.number * scope.row.goods.price).toFixed(4)}}
                </template>
            </el-table-column>
            <el-table-column
                align='center'
                label='操作'>
                <template slot-scope='scope'>
                    <el-button
                        type="danger"
                        size='mini'
                        icon="el-icon-delete"
                        circle
                        @click='deleteOrderId(scope.row.orderId)'>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import ApiShoppingCart from '@/api/shoppingCart/shoppingCart'

export default {
    name: 'ShoppingCartExpand',
    props: ['props'],
    methods: {
        deleteOrderId(orderId) {
            ApiShoppingCart.deleteCar(orderId).then(res => {
                if (res.code === '200') {
                    this.$message({
                        type: 'success',
                        message: res.msg
                    })
                } else {
                    this.$message({
                        type: 'error',
                        message: res.msg
                    })
                }
            }).catch(() => {
                this.$message({
                    type: 'error',
                    message: '删除订单中商品失败，网络错误'
                })
            }).finally(() => {
                this.$emit('fatherMethod')
            })
        }
    }
}
</script>

<style scoped lang='scss'>
.expand{
    width: 100%;
    box-sizing: border-box;
    padding: 0 10px;
}
</style>
