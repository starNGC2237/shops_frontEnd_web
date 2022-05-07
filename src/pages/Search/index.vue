<!--
 * @Author: zhilutianji
 * @Date: 2022-01-02 20:22:25
 * @LastEditors: zhilutianji
 * @LastEditTime: 2022-01-12 14:50:51
 * @Description: file content
 * @FilePath: \shops_frontend_web\src\pages\Search\index.vue
-->
<template>
    <div
        class='search'
        v-loading.fullscreen.lock="loading">
        <TypeNav ref='typenav'></TypeNav>
        <div class='selectNav'>
            全部结果：
            <el-tag
                style='margin-right: 1rem;'
                v-if="searchParams.categoryName"
                closable
                @close='removeCategoryName'>
                {{searchParams.categoryName}}
            </el-tag>
            <el-tag
                v-if="searchParams.keyword"
                closable
                @close='removeKeyword'>
                {{searchParams.keyword}}
            </el-tag>
        </div>
        <div class='search_content'>
            <div class='items'>
                <div v-if='goods.length === 0'
                     style='width: 100%;height:300px;display: flex;align-items: center;justify-content: center;'>
                    <span>没有数据</span>
                </div>
                <div class='item'
                     style='cursor: pointer;'
                     v-for='(item) in goods'
                     :key='item.goodId'
                     @click='gotoGoodInfo(item.goodId)'>
                    <el-card shadow="hover"  >
                        <div class='recommended-img'>
                            <img :src='item.imageUrl' alt=''>
                        </div>
                        <h3 class='title'>
                            {{ item.title }}
                        </h3>
                        <p class='desc'>{{item.content}}</p>
                        <p class='price'>
                            <span class="num">{{item.price}}</span>
                            元
                            <span>起</span>
                        </p>
                    </el-card>
                </div>

            </div>
            <div style='display: flex;justify-content: center;margin-top: 1rem'>
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="goods.length">
                </el-pagination>
            </div>

        </div>
    </div>
</template>

<script>
import TypeNav from '@/components/TypeNav'
import ApiSearch from '@/api/search/search'
export default {
    name: 'Search',
    components: {
        TypeNav
    },
    data() {
        return {
            loading: false,
            searchParams: {
                category1Id: '',
                category2Id: '',
                category3Id: '',
                categoryName: '',
                keyword: '',
                pageNo: 1,
                pageSize: 10
            },
            goods: []
        }
    },
    methods: {
        removeCategoryName() {
            this.searchParams.categoryName = undefined
            this.searchParams.category1Id = undefined
            this.searchParams.category2Id = undefined
            this.searchParams.category3Id = undefined
            // this.getData()
            this.$router.push({ name: 'search', params: this.$route.params })
        },
        removeKeyword() {
            this.searchParams.keyword = undefined
            this.$refs.typenav.clear()
            this.$router.push({ name: 'search', query: this.$route.query })
        },
        getData() {
            this.loading = true
            const data = {
                category1Id: this.searchParams.category1Id || undefined,
                category2Id: this.searchParams.category2Id || undefined,
                category3Id: this.searchParams.category3Id || undefined,
                content: this.searchParams.keyword || undefined
            }
            ApiSearch.searchGood(data).then(res => {
                if (res.code === '200') {
                    this.goods = res.data
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
        gotoGoodInfo(goodId) {
            this.$router.push({ path: `/good/${goodId}` })
        }
    },
    beforeMount() {
        Object.assign(this.searchParams, this.$route.query, this.$route.params)
    },
    mounted() {
        this.getData()
    },
    watch: {
        // 监听路由信息
        $route() {
            Object.assign(this.searchParams, this.$route.query, this.$route.params)
            this.getData()
            this.searchParams.category1Id = ''
            this.searchParams.category2Id = ''
            this.searchParams.category3Id = ''
        }
    }
}
</script>

<style scoped lang='scss'>
.search{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    >.selectNav{
        width: 1226px;
        padding: 1rem 0;
        box-sizing: border-box;
    }
}
.search_content{
    width: 1226px;
    padding: 1rem;
}
.items{
    display: flex;
    flex-wrap: wrap;
}
.item{
    width: 20%;
    margin: 1rem 0 1rem 0;
    box-sizing: border-box;
}
img{
    width: 200px;
    height: 200px;
}
.recommended-img{
    display: flex;
    justify-content: center;
    margin-bottom: 18px;
}
.title {
    margin: 0 10px 2px;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 14px;
    font-weight: 400;
    color: #333;
}
.desc{
    margin: 0 10px 10px;
    height: 18px;
    font-size: 12px;
    color: #b0b0b0;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
.price{
    margin: 0 10px 14px;
    text-align: center;
    color: #ff6700;
}
.num{
    text-align: center;
    color: #ff6700;
}
</style>
