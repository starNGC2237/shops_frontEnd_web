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

</style>
