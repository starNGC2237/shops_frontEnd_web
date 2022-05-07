<template>
    <div class='shopping_cart'>
        <div class='shopping_cart_container'>
            <el-page-header class='header' @back="goBack" content="我的购物车"></el-page-header>
            <el-table
                v-loading='loading'
                :data='tableData'
                @selection-change="handleSelectionChange">
                <el-table-column
                    type="selection"
                    width='100'>
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
                <el-table-column
                    align='center'
                    width='100'
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
            <div class='settle'>
                <div class='settle_selected'>
                    <router-link to='/home'>继续购物</router-link>
                    <el-divider direction="vertical"></el-divider>
                    <span>已选择{{multipleSelection.length}}件</span>
                </div>
                <div class='settle_total'>
                    总计{{multipleSelection.length}}
                    <el-button type='primary' :disabled='multipleSelection.length===0'>去结算</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ApiShoppingCart from '@/api/shoppingCart/shoppingCart'
export default {
    name: 'ShoppingCart',
    data() {
        return {
            checked: false,
            loading: false,
            tableData: [],
            multipleSelection: []
        }
    },
    mounted() {
        this.getShoppingCartOrder()
    },
    methods: {
        handleSelectionChange(val) {
            this.multipleSelection = val
        },
        goBack() {
            this.$router.push({ path: '/home' })
        },
        getShoppingCartOrder() {
            this.loading = true
            ApiShoppingCart.allOrder(0).then(res => {
                this.tableData = res.data
            }).catch(() => {
                this.$message({
                    type: 'error',
                    message: '获取购物车信息失败，网络错误'
                })
            }).finally(() => {
                this.loading = false
            })
        },
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
                this.getShoppingCartOrder()
            })
        }
    }
}
</script>

<style scoped lang='scss'>
    .shopping_cart{
        display: flex;
        align-items: center;
        flex-direction: column;
        >.shopping_cart_container{
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 1226px;
            padding: 1rem;
            > div:not(:last-child){
                margin-bottom: 1.5rem;
            }
            > .header{
                width: 100%;
                height: 5rem;
                background-color: white;
                display: flex;
                align-items: center;
                padding: 1rem;
                box-sizing: border-box;
            }
            > .settle{
                display: flex;
                width: 100%;
                height: 4.8rem;
                background-color: white;
                box-sizing: border-box;
                justify-content: space-between;
                >.settle_selected{
                    padding: 1rem;
                    box-sizing: border-box;
                    display: flex;
                    align-items: center;
                    font-size: 1.2rem;
                    >a{
                        display: flex;
                        color: #b0b0b0;
                        height: 100%;
                        line-height: 100%;
                        align-items: center;
                        text-decoration: none;
                        &:hover{
                            color: #409EFF;
                        }
                    }
                }
                >.settle_total{
                    display: flex;
                    align-items: center;
                    font-size: 1.5rem;
                    height: 100%;
                    button{
                        margin-left: 5rem;
                        width: 20rem;
                        height: 100%;
                    }
                }
            }
        }
    }
</style>
