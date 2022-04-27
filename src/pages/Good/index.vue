<template>
    <div class='good'>
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
                    <el-button type='primary'>立即购买</el-button>
                    <el-button>加入购物车</el-button>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import ApiSearch from '@/api/search/search'

export default {
    name: 'good',
    data() {
        return {
            good: {}
        }
    },
    mounted() {
        const data = {
            goodId: this.$route.params.goodId
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
