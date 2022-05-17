<template>
    <div class='order'>
        <div class='order_container'>
            <el-page-header class='header' @back="goBack" content="我的订单"></el-page-header>
            <el-table :data='orders' v-loading='loading' :default-expand-all='true'>
                <el-table-column type="expand" width='100px'>
                    <template slot-scope="scope">
                        <ShoppingCartExpand :props='scope.row.goodList'></ShoppingCartExpand>
                    </template>
                </el-table-column>
                <el-table-column
                    align='center'
                    prop='orderName'
                    label='订单名'>
                </el-table-column>
                <el-table-column
                    align='center'
                    label='操作'>
                    <template slot-scope='scope'>
                        <el-button v-if='scope.row.goodList.every(item=>item.orderStatus === 2)' type='text' @click='receiveOrderName(scope.row.orderName)'>确认全部收货</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import ShoppingCartExpand from '@/pages/ShoppingCart/ShoppingCartExpand'
import ApiOrder from '@/api/order/order'
export default {
    name: 'Order',
    components: {
        ShoppingCartExpand
    },
    data() {
        return {
            orders: [],
            tableData: [],
            loading: false
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
            this.loading = true
            const haveCommit = ApiOrder.allOrder(1)
            const haveAgree = ApiOrder.allOrder(2)
            const haveDone = ApiOrder.allOrder(3)
            Promise.all([haveCommit, haveAgree, haveDone]).then(res => {
                this.tableData = res[0].data
                this.tableData = this.tableData.concat(res[1].data)
                this.tableData = this.tableData.concat(res[2].data)
                this.tableData.forEach(item => {
                    if (item.goods.length === 1) {
                        item.goods = item.goods[0]
                    }
                    item.number = item.goods.number
                    if (this.orders.some(itemO => itemO.orderName === item.orderName)) {
                        this.orders.forEach(itemO => {
                            if (itemO.orderName === item.orderName) {
                                itemO.goodList.push(item)
                            }
                        })
                    } else {
                        this.orders.push({ orderName: item.orderName, goodList: [item] })
                    }
                })
            }).catch().finally(() => {
                this.loading = false
            })
        },
        receiveOrderName(orderName) {
            ApiOrder.receive(orderName).finally(() => {
                this.getOrder()
            })
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
