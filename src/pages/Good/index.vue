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
                    <el-button type='primary' @click='beforeDeliverShopping'>立即购买</el-button>
                    <el-button @click='addToCar(good.goodId)'>加入购物车</el-button>
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
    </div>
</template>

<script>
import ApiSearch from '@/api/search/search'
import ApiShoppingCart from '@/api/shoppingCart/shoppingCart'
import cookie from '../../../utils/cookie'
import { Message } from 'element-ui'
export default {
    name: 'good',
    data() {
        return {
            dialogVisible: false,
            loading: false,
            good: {}
        }
    },
    mounted() {
        this.good = {}
        const data = {
            goodId: parseInt(this.$route.params.goodId, 10)
        }
        // todo 获得单个商品信息
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
            return this.good.numberList?.filter((item) => {
                return item.role === '商家'
            })[0].number || 0
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
        addToCar(goodId) {
            this.loading = true
            ApiShoppingCart.addCar(goodId).then((res) => {
                this.showMsg(res)
            }).catch(() => {
                this.$message({
                    type: 'error',
                    message: '加入购物车失败，网络错误！'
                })
            }).finally(() => {
                this.loading = false
            })
        },
        isCarry() {
            this.dialogVisible = false
            this.deliverShopping(this.good.goodId, 1, '6666', 1)
        },
        noCarry() {
            this.dialogVisible = false
            this.deliverShopping(this.good.goodId, 1, '6666', 0)
        },
        beforeDeliverShopping() {
            const isHave = this.good.numberList.some((item) => { return item.role === '商家' && item.number > 0 })
            if (isHave) {
                this.dialogVisible = true
            } else {
                this.deliverShopping(this.good.goodId, 1, this.good.numberList.filter((item) => { return item.role !== '商家' })[0].userName, 0)
            }
        },
        deliverShopping(goodId, number, toUser, isCarry, orderName) {
            if (cookie.getCookie('token')) {
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
</style>
