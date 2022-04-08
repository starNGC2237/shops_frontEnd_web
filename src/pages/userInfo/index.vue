<template>
    <div>
        <div class='userInfo'>
            <div class='userInfo_container'>
                <el-page-header class='header' @back="goBack" content="用户信息"></el-page-header>
                <div class='body'>
                    <div class='nav'>
                        <div v-for='item in navs'
                             :key='item.key'
                             @click='userBox(item.key)'
                             :style='("/userInfo/"+item.key) === $route.path?active:""'>
                            <i :class='item.image'></i>
                            <span>{{item.name}}</span>
                        </div>
                    </div>
                    <div class='container'>
                        <router-view>
                        </router-view>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="40%">
            <p>确认退出吗？</p>
            <span slot="footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="quit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'userInfo',
    data() {
        return {
            dialogVisible: false,
            active: {
                backgroundColor: '#e8f3ff',
                color: '#409EFF'
            },
            navs: [
                {
                    key: 'user',
                    name: '个人资料',
                    image: 'el-icon-s-custom'
                },
                {
                    key: 'rePassWord',
                    name: '修改密码',
                    image: 'el-icon-s-check'
                },
                {
                    key: 'userAddress',
                    name: '地址管理',
                    image: 'el-icon-s-data'
                },
                {
                    key: 'quit',
                    name: '退出登录',
                    image: 'el-icon-error'
                }
            ]
        }
    },
    methods: {
        userBox(key) {
            if (key === 'quit') {
                this.dialogVisible = true
            } else {
                this.$router.push({ path: `/userInfo/${key}` })
            }
        },
        quit() {
            this.$store.commit('QUIT')
        },
        goBack() {
            this.$router.push({ path: '/home' })
        }
    }
}
</script>

<style scoped lang='scss'>
    .userInfo{
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        >.userInfo_container{
            width: 1226px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            >div:not(:last-child){
                margin-bottom: 1rem;
            }
            >.header{
                height: 5rem;
                background-color: white;
                display: flex;
                align-items: center;
                padding: 1rem;
                box-sizing: border-box;
            }
            >.body{
                min-height: 500px;
                height: fit-content;
                display: flex;
                justify-content: space-between;
                >.nav{
                    width: 20%;
                    display: flex;
                    flex-direction: column;
                    padding: 0.5rem;
                    box-sizing: border-box;
                    background-color: white;
                    >div{
                        font-size: 1.4rem;
                        width: 100%;
                        height: 5rem;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        cursor: pointer;
                        &:hover{
                            background-color: #e8f3ff;
                            color: #409EFF;
                        }
                        >i{
                            margin-right: 0.3rem;
                        }
                    }
                    >div:not(:last-child){
                        margin-bottom: 1rem;
                    }
                }
                >.container{
                    width: 78.3%;
                    display: flex;
                    background-color: white;
                    padding: 2rem;
                    box-sizing: border-box;
                }
            }
        }
    }
</style>
