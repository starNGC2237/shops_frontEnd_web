<template>
    <div class='expand'>
        <el-table :data='props' border>
            <el-table-column width='100' label='取货形式' align='center'>
                <template slot-scope='scope'>
                    <el-tag>{{!!scope.row.isCarry?'自提':'发货'}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                align='center'
                label='状态'>
                <template slot-scope='scope'>
                    <span v-if='scope.row.orderStatus === 1'>已提交订单</span>
                    <span v-if='scope.row.orderStatus === 2'>已发订单</span>
                    <span v-if='scope.row.orderStatus === 3'>已完成订单</span>
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
                    {{(scope.row.goods.number * scope.row.goods.price).toFixed(10)}}
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'ShoppingCartExpand',
    props: ['props']
}
</script>

<style scoped lang='scss'>
.expand{
    width: 100%;
    box-sizing: border-box;
    padding: 0 10px;
}
</style>
