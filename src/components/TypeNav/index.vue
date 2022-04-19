<template>
    <div class='typenav'>
        <div class='typenav-container'>
            <div class='links'>
                <div class='logo'>
                    <a href='https://shops.starlibrary.online'>
                        <img src='../../assets/logo.png' alt='某商城'>
                    </a>
                </div>
                <div class='all'>
                    <span class='all-h2' v-show='!show'>全部商品分类</span>
                    <div v-show='show'  class='all-show' :style='autoHeight' @click="gotoSearch">
                        <ul>
                            <li v-for="(c1) in categoryList.slice(0,10)" :key="c1.categoryId">
                                <a :data-categoryName="c1.categoryName"
                                   :data-category1id="c1.categoryId">
                                    <span :data-categoryName="c1.categoryName"
                                          :data-category1id="c1.categoryId">{{c1.categoryName}}</span>
                                    <i :data-categoryName="c1.categoryName"
                                       :data-category1id="c1.categoryId" class='el-icon-arrow-right'></i>
                                </a>
                                <div class='c1-container'>
                                    <dl class="fore" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                                        <dt class='fore-dt'>
                                            <a
                                                :data-categoryName="c2.categoryName"
                                                :data-category2id="c2.categoryId"
                                            >{{ c2.categoryName }}</a>
                                        </dt>
                                        <dd>
                                            <em v-for="c3 in c2.categoryChild" :key="c3.categoryId" class='fore-em'>
                                                <a
                                                    :data-categoryName="c3.categoryName"
                                                    :data-category3id="c3.categoryId"
                                                >{{ c3.categoryName }}</a>
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <nav @click='gotoSearch'>
                    <a v-for='c1 in categoryList.slice(10,categoryList.length)'
                       :key='c1.categoryId'>
                        <span style='cursor: pointer;' :data-categoryName="c1.categoryName" :data-category1id="c1.categoryId">{{ c1.categoryName }}</span>
                        <div class='all-show-remaining'>
                            <dl class="fore" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                                <dt class='fore-dt'>
                                    <a
                                        :data-categoryName="c2.categoryName"
                                        :data-category2id="c2.categoryId"
                                    >{{ c2.categoryName }}</a>
                                </dt>
                                <dd>
                                    <em v-for="c3 in c2.categoryChild" :key="c3.categoryId" class='fore-em'>
                                        <a
                                            :data-categoryName="c3.categoryName"
                                            :data-category3id="c3.categoryId"
                                        >{{ c3.categoryName }}</a>
                                    </em>
                                </dd>
                            </dl>
                        </div>
                    </a>
                </nav>
            </div>
            <div class='search'>
                <el-input type='text' v-model='keyword' @keydown.enter.native='gotoSearch' size='large'>
                    <el-button slot="append" icon="el-icon-search" @click='gotoSearch'></el-button>
                </el-input>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'TypeNav',
    data() {
        return {
            show: true,
            autoHeight: {
                height: '420px'
            },
            keyword: ''
        }
    },
    methods: {
        gotoSearch(event) {
            const element = event.target
            // dataset可以获取到自定义属性
            const { categoryname, category1id, category2id, category3id } = element.dataset
            const queryRoute = this.$route.query
            if (this.keyword !== '' || categoryname || JSON.stringify(queryRoute) !== '{}') {
                const location = { name: 'search' }
                if (categoryname || JSON.stringify(queryRoute) !== '{}') {
                    if (categoryname) {
                        const query = { categoryName: categoryname }
                        if (category1id) {
                            query.category1Id = category1id
                        } else if (category2id) {
                            query.category2Id = category2id
                        } else if (category3id) {
                            query.category3Id = category3id
                        }
                        location.query = query
                    } else {
                        location.query = queryRoute
                    }
                }
                location.params = this.$route.params
                if (this.keyword !== '') {
                    location.params.keyword = this.keyword
                }
                this.$router.push(location)
            }
        },
        clear() {
            this.keyword = ''
        }
    },
    mounted() {
        if (this.$route.path !== '/home') {
            this.show = false
        }
        if (this.$route.params.keyword) {
            this.keyword = this.$route.params.keyword
        }
    },
    computed: {
        ...mapState({
            // 右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
            // 注入一个参数state，其实即为大仓库中的数据
            categoryList: ($state) => {
                return $state.home.categoryList
            }
        })
    }
}
</script>

<style scoped lang='scss'>

.typenav{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100px;
    background-color: white;
}
.typenav-container{
    width: 1226px;
    align-items: center;
    height: 100%;
    display: flex;
    justify-content: space-between;
    position: relative;
}
.links{
    display: flex;
    height: 100%;
    align-items: center;
    >nav{
        display: flex;
        align-items: center;
        >a{
            color: black;
            text-decoration:none;
            line-height: 100px;
            &:hover{
                color: #409EFF;
            }
            >.all-show-remaining{
                width: 992px;
                height: fit-content;
                background-color: white;
                position: absolute;
                top: 100px;
                left: 234px;
                display: none;
                color: black;
                cursor: default;
                line-height: 18px;
                z-index: 999;
                &:hover{
                    display: block !important;
                }
            }
            >span{
                margin-left: 1rem;
                font-size: 1.5rem;
                display: block;
                line-height: 100px;
                &:hover{
                    + .all-show-remaining{
                        display: block !important;
                    }
                }
            }
        }
    }
    >.all{
        height: 100%;
        width: 178px;
    }
}
.all-h2{
    display: flex;
    align-items: center;
    height: 100%;
    margin: 0 0 0 70px;
    font-size: 1.5rem;
    cursor: default;
    &:hover ~ .all-show{
        display: block !important;
    }
}
.all-show{
    position: absolute;
    width: 234px;
    height: 420px;
    background-color: rgba(105,101,101,.6);
    top: 100px;
    left: 0;
    padding: 20px 0;
    z-index: 999;
    min-height: 420px;
    &:hover{
        display: block !important;
    }
    >ul{
        list-style: none;
        padding: 0;
        margin: 0;
        border: 0;
        >li{
            >.c1-container{
                position: absolute;
                width: 992px;
                height: fit-content;
                min-height: 460px;
                background-color: white;
                left: 234px;
                top: 0;
                padding: 0 4px 0 8px;
                box-sizing: border-box;
                display: none;
                &:hover{
                    display: block !important;
                }
            }
            >a{
                display: flex;
                align-items: center;
                height: 42px;
                line-height: 42px;
                justify-content: space-between;
                padding-left: 30px;
                cursor: pointer;
                font-size: 14px;
                color: white;
                &:hover{
                    background-color: #ff6700;
                    +.c1-container{
                        display: block !important;
                    }
                }
                >i{
                    margin-right: 20px;
                }
            }
        }
    }
}
.logo{
    display: flex;
    img{
        width: 56px;
        height: 56px;
    }
}
.fore-dt{
    cursor: pointer;
    width: fit-content;
    >a{
        color: #409EFF;
    }
}
.fore-em{
    cursor: pointer;
    margin-right: 1rem;
}
</style>
