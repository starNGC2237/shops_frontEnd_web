<template>
    <div class='shopping_cart' v-loading.fullscreen.lock="allLoading">
        <div class='shopping_cart_container'>
            <el-page-header class='header' @back="goBack" content="我的购物车"></el-page-header>
            <!--<el-table
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
                    align='center'
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
            -->
            <el-table
                :data='orderNames'
                v-loading='loading'
                :default-expand-all='true'
                @selection-change="handleSelectionChange">
                <el-table-column
                    type="selection"
                    :selectable='selectable'
                    width='50'>
                </el-table-column>
                <el-table-column type="expand" width='100px'>
                    <template slot-scope="scope">
                        <ShoppingCartExpand @fatherMethod="getShoppingCartOrder" :props='scope.row.goodList'></ShoppingCartExpand>
                    </template>
                </el-table-column>
                <el-table-column
                    align='center'
                    prop='orderName'
                    label='订单名'>
                </el-table-column>
            </el-table>
            <div class='settle'>
                <div class='settle_selected'>
                    <router-link to='/home'>继续购物</router-link>
                    <el-divider direction="vertical"></el-divider>
                    <span>已选择{{multipleSelection.length}}个订单</span>
                </div>
                <div class='settle_total'>
                    总计：{{allMoney}}
                    <el-button type='primary' :disabled='multipleSelection.length===0' @click='sendOrederNamesBefore'>去结算</el-button>
                </div>
            </div>
            <el-dialog
                title="是否需要商店自取"
                :visible.sync="dialogVisible"
                :close-on-click-modal='false'
                :close-on-press-escape='false'
                width="30%">
                <span slot="footer" class="dialog-footer" >
                <el-button @click="isCarry = true;sendOrderNames()">是</el-button>
                <el-button type="primary" @click="isCarry = false;sendOrderNames()">否</el-button>
            </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import ApiShoppingCart from '@/api/shoppingCart/shoppingCart'
import ShoppingCartExpand from '@/pages/Order/ShoppingCartExpand'
export default {
    name: 'ShoppingCart',
    components: {
        ShoppingCartExpand
    },
    data() {
        return {
            allLoading: false,
            orderNames: [],
            isCarry: true,
            dialogVisible: false,
            checked: false,
            loading: false,
            tableData: [],
            multipleSelection: []
        }
    },
    computed: {
        allMoney() {
            let money = 0
            this.multipleSelection.forEach(item => {
                item.goodList.forEach(itemChild => {
                    money = this.addFunc(money, (itemChild.goods.number * itemChild.goods.price).toFixed(4))
                })
            })
            return money
        }
    },
    mounted() {
        this.getShoppingCartOrder()
    },
    methods: {
        selectable(row) {
            return !row.goodList.some(item => {
                let number = 0
                item.goods.numberList.forEach(itemChild => {
                    number = number + itemChild.number
                })
                return item.goods.number > number
            })
        },
        // 浮点加
        addFunc(arg1, arg2) {
            var r1, r2, m, c
            try {
                r1 = arg1.toString().split('.')[1].length
            } catch (e) {
                r1 = 0
            }
            try {
                r2 = arg2.toString().split('.')[1].length
            } catch (e) {
                r2 = 0
            }
            c = Math.abs(r1 - r2)
            m = Math.pow(10, Math.max(r1, r2))
            if (c > 0) {
                var cm = Math.pow(10, c)
                if (r1 > r2) {
                    arg1 = Number(arg1.toString().replace('.', ''))
                    arg2 = Number(arg2.toString().replace('.', '')) * cm
                } else {
                    arg1 = Number(arg1.toString().replace('.', '')) * cm
                    arg2 = Number(arg2.toString().replace('.', ''))
                }
            } else {
                arg1 = Number(arg1.toString().replace('.', ''))
                arg2 = Number(arg2.toString().replace('.', ''))
            }
            return (arg1 + arg2) / m
        },
        // 算法：找出数组中与地址最近的地址，并且number不为0
        findUser(numberList, address) {
            const threeSample = numberList.filter(item => (item.address.provinceName + item.address.cityName + item.address.districtName === address.provinceName + address.cityName + address.districtName) && item.number > 0)
            const twoSample = numberList.filter(item => (item.address.provinceName + item.address.cityName === address.provinceName + address.cityName) && item.number > 0)
            const oneSample = numberList.filter(item => (item.address.provinceName === address.provinceName) && item.number > 0)
            if (threeSample.length !== 0) {
                return threeSample[0]
            }
            if (twoSample.length !== 0) {
                return twoSample[0]
            }
            if (oneSample.length !== 0) {
                return oneSample[0]
            }
            return numberList[0]
        },
        handleSelectionChange(val) {
            this.multipleSelection = val
        },
        goBack() {
            this.$router.push({ path: '/home' })
        },
        getShoppingCartOrder() {
            this.loading = true
            this.tableData = []
            this.orderNames = []
            ApiShoppingCart.allOrder(0).then(res => {
                this.tableData = res.data
                this.tableData.forEach(item => {
                    if (item.goods.length === 1) {
                        item.goods = item.goods[0]
                    }
                    item.number = item.goods.number
                    if (this.orderNames.some(itemO => itemO.orderName === item.orderName)) {
                        this.orderNames.forEach(itemO => {
                            if (itemO.orderName === item.orderName) {
                                itemO.goodList.push(item)
                            }
                        })
                    } else {
                        this.orderNames.push({ orderName: item.orderName, goodList: [item] })
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'error',
                    message: '获取购物车信息失败，网络错误'
                })
            }).finally(() => {
                this.loading = false
            })
        },
        sendOrederNamesBefore() {
            this.dialogVisible = true
        },
        // 发送大订单
        async sendOrderNames() {
            this.dialogVisible = false
            this.allLoading = true
            let numberList = []
            let orderName = ''
            await this.multipleSelection.forEach(item => {
                orderName = item.orderName
                item.goodList.forEach(itemChild => {
                    numberList = itemChild.goods.numberList
                    for (let i = 0; i < itemChild.goods.number; i++) {
                        if (this.isCarry) {
                            const isHave = itemChild.goods.numberList.some((itemW) => {
                                return itemW.role === '商家' && itemW.number > 0
                            })
                            if (isHave) {
                                const data = {
                                    orderName: orderName,
                                    goodId: itemChild.goods.goodId,
                                    number: 1,
                                    toUser: '6666',
                                    isCarry: 1
                                }
                                ApiShoppingCart.submitOrder(data)
                            } else {
                                const data = {
                                    orderName: orderName,
                                    goodId: itemChild.goods.goodId,
                                    number: 1,
                                    toUser: this.findUser(numberList, this.$store.state.user.addressList.filter(itemQ => itemQ.isUsing === 1)[0]).userName,
                                    isCarry: 0
                                }
                                ApiShoppingCart.submitOrder(data)
                            }
                        } else {
                            const data = {
                                orderName: orderName,
                                goodId: itemChild.goods.goodId,
                                number: 1,
                                toUser: this.findUser(numberList, this.$store.state.user.addressList.filter(itemQ => itemQ.isUsing === 1)[0]).userName,
                                isCarry: 0
                            }
                            ApiShoppingCart.submitOrder(data)
                        }
                        numberList.forEach(itemT => {
                            if (this.isCarry) {
                                const isHave = itemChild.goods.numberList.some((itemW) => {
                                    return itemW.role === '商家' && itemW.number > 0
                                })
                                if (itemT.username === (isHave ? '6666' : this.findUser(numberList, this.$store.state.user.addressList.filter(itemQ => itemQ.isUsing === 1)[0]).userName)) {
                                    itemT.number -= 1
                                }
                            } else {
                                if (itemT.username === this.findUser(numberList, this.$store.state.user.addressList.filter(itemQ => itemQ.isUsing === 1)[0]).userName) {
                                    itemT.number -= 1
                                }
                            }
                        })
                    }
                })
            })
            setTimeout(() => {
                this.allLoading = false
                this.getShoppingCartOrder()
            }, 1000)
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
