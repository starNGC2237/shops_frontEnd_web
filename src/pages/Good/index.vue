<template>
    <div class='good' v-loading.fullscreen.lock="loading">
        <div class='good_content'>
            <div class='good_image'>
                <el-image
                    style='width: 300px;height: 300px;margin-top: 3rem;'
                    fit="fit"
                    :src='good.imageUrl'>
                </el-image>
            </div>
            <div class='good_info'>
                <h1>{{good.goodName}}</h1>
                <p>标题：{{good.title}}</p>
                <p>内容：{{ good.content}}</p>
                <p>一级分类：{{ good.category1Name}}</p>
                <p>二级分类：{{ good.category2Name}}</p>
                <p>三级分类：{{ good.category3Name}}</p>
                <p>价格：{{ good.price}}</p>
                <p>商店内数量：{{shopNumber}}</p>
                <p>仓库内数量：{{storeNumber}}</p>
                <div style='margin-top: 1rem;'>
                    <el-button type='primary' @click='beforeDeliverShopping' :disabled='storeNumber<=0 && shopNumber<=0'>立即购买</el-button>
                    <el-button @click='addToCarBefore()' :disabled='storeNumber<=0 && shopNumber<=0'>加入购物车</el-button>
                </div>
            </div>
        </div>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            :close-on-click-modal='false'
            :show-close='false'
            :close-on-press-escape='false'
            width="30%">
            <span>订单中商品可自取，是否需要自取？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isCarry">是</el-button>
                <el-button type="primary" @click="noCarry">否</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="加入购物车中的订单或新建订单"
            :visible.sync="dialogVisibleOrderNames"
            :close-on-click-modal='false'
            :close-on-press-escape='false'
            width="30%">
            <div class='orderNames'>
                <div class='orderNameOne' v-for='item in orderNames' :key='item' @click='addToCar(item)'>
                    {{item}}
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import ApiSearch from '@/api/search/search'
import ApiShoppingCart from '@/api/shoppingCart/shoppingCart'
import ApiOrder from '@/api/order/order'
import cookie from '../../../utils/cookie'
import { Message } from 'element-ui'
export default {
    name: 'good',
    data() {
        return {
            dialogVisible: false,
            dialogVisibleOrderNames: false,
            loading: false,
            orderNames: [],
            good: {}
        }
    },
    mounted() {
        this.good = {}
        const data = {
            goodId: parseInt(this.$route.params.goodId, 10)
        }
        ApiSearch.searchGood(data).then(res => {
            if (res.code === '200') {
                this.good = res.data[0] || {}
            } else {
                this.$message({
                    type: 'error',
                    message: res.msg
                })
            }
        }).catch(() => {
            this.$message({
                type: 'error',
                message: '获取商品信息失败，网络错误'
            })
        }).finally(() => {
            this.loading = false
        })
    },
    computed: {
        shopNumber() {
            const a = this.good.numberList?.filter((item) => {
                return item.role === '商家'
            }) || []
            if (a.length === 0) {
                return 0
            } else {
                return a[0].number || 0
            }
        },
        storeNumber() {
            let number = 0
            this.good.numberList?.forEach((item) => {
                if (item.role === '仓库') {
                    number = number + item.number
                }
            })
            return number
        }
    },
    methods: {
        // 算法：找出数组中与地址最近的地址，并且number不为0,返回该后台用户
        findUser(numberList, address) {
            const threeSample = numberList.filter(item => item.address.provinceName + item.address.cityName + item.address.districtName === address.provinceName + address.cityName + address.districtName)
            const twoSample = numberList.filter(item => item.address.provinceName + item.address.cityName === address.provinceName + address.cityName)
            const oneSample = numberList.filter(item => item.address.provinceName === address.provinceName)
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
        addToCarBefore() {
            this.loading = true
            if (cookie.getCookie('token')) {
                if (this.$store.state.user.addressList.filter(item => item.isUsing === 1).length === 0) {
                    Message.warning('未填写地址，请先填写')
                    this.$router.push({ path: '/userInfo/userAddress' })
                } else {
                    ApiOrder.queryOrderName({ userName: this.$store.state.user.userName }).then(res => {
                        const newOrder = ['新增订单']
                        this.orderNames = res.data
                        this.orderNames = newOrder.concat(this.orderNames)
                    }).catch().finally(() => {
                        this.loading = false
                        this.dialogVisibleOrderNames = true
                    })
                }
            } else {
                Message.warning('未登录，请先登录')
                this.$router.push({ path: '/service/login' })
            }
        },
        addToCar(orderName) {
            if (orderName === '新增订单') {
                orderName = undefined
            }
            this.loading = true
            ApiShoppingCart.addCar(orderName, this.good.goodId).then((res) => {
                this.showMsg(res)
            }).catch(() => {
                this.$message({
                    type: 'error',
                    message: '加入购物车失败，网络错误！'
                })
            }).finally(() => {
                this.loading = false
                this.dialogVisibleOrderNames = false
            })
        },
        isCarry() {
            this.dialogVisible = false
            this.deliverShopping(this.good.goodId, 1, '6666', 1)
        },
        noCarry() {
            this.dialogVisible = false
            const toUser = this.findUser(this.good.numberList, this.$store.state.user.addressList.filter(item => item.isUsing === 1)[0])
            this.deliverShopping(this.good.goodId, 1, toUser.userName, 0)
        },
        beforeDeliverShopping() {
            const isHave = this.good.numberList.some((item) => { return item.role === '商家' && item.number > 0 })
            if (isHave) {
                this.dialogVisible = true
            } else {
                const toUser = this.findUser(this.good.numberList, this.$store.state.user.addressList.filter(item => item.isUsing === 1)[0])
                this.deliverShopping(this.good.goodId, 1, toUser.userName, 0)
            }
        },
        deliverShopping(goodId, number, toUser, isCarry, orderName) {
            if (cookie.getCookie('token')) {
                if (this.$store.state.user.addressList.filter(item => item.isUsing === 1).length === 0) {
                    Message.warning('未填写地址，请先填写')
                    this.$router.push({ path: '/userInfo/userAddress' })
                } else {
                    this.loading = true
                    const data = {
                        goodId: goodId,
                        number: number,
                        toUser: toUser,
                        isCarry: isCarry,
                        orderName: orderName
                    }
                    ApiShoppingCart.deliver(data).then((res) => {
                        this.showMsg(res)
                    }).catch(() => {
                        this.$message({
                            type: 'error',
                            message: '直接购买失败，网络错误！'
                        })
                    }).finally(() => {
                        this.loading = false
                    })
                }
            } else {
                Message.warning('未登录，请先登录')
                this.$router.push({ path: '/service/login' })
            }
        },
        showMsg(res) {
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
        }
    }
}
</script>

<style scoped lang='scss'>
.good{
    display: flex;
    align-items: center;
    justify-content: center;
    >.good_content{
        display: flex;
        width: 1226px;
        padding: 1rem;
        >.good_image{
            width: 30%;
            display: flex;
            justify-content: center;
        }
        >.good_info{
            width: 70%;
            display: flex;
            padding: 0.5rem;
            flex-direction: column;
        }
    }
}
.orderNames{
    display: flex;
    flex-direction: column;
    >div:not(:last-child){
        margin-bottom: 1rem;
    }
}
.orderNameOne{
    width: 100%;
    cursor:pointer;
    background-color: #E4E7ED;
    padding: 1rem;
    box-sizing: border-box
}
</style>
