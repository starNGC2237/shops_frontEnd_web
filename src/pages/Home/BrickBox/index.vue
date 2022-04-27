<!--
 * @Author: zhilutianji
 * @Date: 2022-01-07 00:28:45
 * @LastEditors: zhilutianji
 * @LastEditTime: 2022-01-12 14:20:42
 * @Description: file content
 * @FilePath: \shops_frontend_web\src\pages\Home\BrickBox\index.vue
-->
<template>
    <div class='brick_box'>
        <div class='container'>
            <div class='container-top'>
                <h2>{{ data.categoryName }}</h2>
                <div class='watchMore' @click='gotoSearch(data)'>查看更多<i class="el-icon-arrow-right rem_margin"></i></div>
            </div>
            <div class='container-content'>
                <RecommendedOne v-for='(item,index) in currentDate' :key='index' :item='item'>
                </RecommendedOne>
            </div>
        </div>
    </div>
</template>

<script>
import RecommendedOne from '@/pages/Home/BrickBox/components/RecommendedOne'
import ApiSearch from '@/api/search/search'
export default {
    name: 'BrickBok',
    props: ['data'],
    components: {
        RecommendedOne
    },
    data() {
        return {
            currentDate: []
        }
    },
    mounted() {
        const data = {
            category1Id: this.data.categoryId
        }
        ApiSearch.searchGood(data).then(res => {
            if (res.code === '200') {
                this.currentDate = res.data || []
            } else {
                this.$message({
                    type: 'error',
                    message: res.msg
                })
            }
            while (this.currentDate.length < 5) {
                this.currentDate.push({})
            }
        }).catch(() => {
            this.$message({
                type: 'error',
                message: '获取商品信息失败，网络错误'
            })
        })
    },
    methods: {
        gotoSearch(data) {
            const location = { name: 'search', query: { category1Id: data.categoryId, categoryName: data.categoryName }}
            this.$router.push(location)
        }
    }
}
</script>

<style scoped lang='scss'>
img{
    width: 100%;
    line-height: 0;
    display: block;
}
.rem_margin{
    margin-left: 0.5rem;
}
.brick_box {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 1.5rem 0;
    >.container {
        display: flex;
        flex-direction: column;
        > .container-top {
            width: 1226px;
            display: flex;
            justify-content: space-between;
            text-align: center;
            >.watchMore{
                cursor: pointer;
                &:hover{
                    color: #409EFF;
                }
            }
            > h2 {
                margin: 0;
                font-size: 22px;
                line-height: 58px;
                color: #333;
                font-weight: 200;
            }
            > div {
                display: flex;
                align-items: center;
            }
        }
        >.container-content{
            display: flex;
            justify-content: space-between;
            > div{
                display: flex;
                width: 234px;
                &:first-child{
                    background-color: white;
                    cursor: pointer;
                }
            }
        }
    }
}

</style>
