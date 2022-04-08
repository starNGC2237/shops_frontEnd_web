<!--
 * @Author: zhilutianji
 * @Date: 2022-01-02 20:22:25
 * @LastEditors: zhilutianji
 * @LastEditTime: 2022-01-12 14:50:51
 * @Description: file content
 * @FilePath: \shops_frontend_web\src\pages\Search\index.vue
-->
<template>
    <div class='search'>
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
                <div class='item' v-for='(item,key) in 13' :key='key'>
                    <el-card shadow="hover"  >
                        <div class='recommended-img'>
                            <img src='https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e870129c5c374088bf7cc46be0b7ace2.jpg?thumb=1&w=300&h=300&f=webp&q=90' alt=''>
                        </div>
                        <h3 class='title'>
                            Xiaomi 12 Pro
                        </h3>
                        <p class='desc'>全新骁龙8｜2K AMOLED屏幕</p>
                        <p class='price'>
                            <span class="num">4699</span>
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
                    :total="1000">
                </el-pagination>
            </div>

        </div>
    </div>
</template>

<script>
import TypeNav from '@/components/TypeNav'
export default {
    name: 'Search',
    components: {
        TypeNav
    },
    data() {
        return {
            searchParams: {
                category1Id: '',
                category2Id: '',
                category3Id: '',
                categoryName: '',
                keyword: '',
                order: '',
                pageNo: 1,
                pageSize: 10,
                props: [],
                trademark: ''
            }
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
        }
    },
    beforeMount() {
        Object.assign(this.searchParams, this.$route.query, this.$route.params)
    },
    watch: {
        // 监听路由信息
        $route() {
            Object.assign(this.searchParams, this.$route.query, this.$route.params)
            // this.getData()
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
    width: 100%;
    height: 203px;
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
