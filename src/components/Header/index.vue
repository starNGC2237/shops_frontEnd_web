<!--
 * @Author: zhilutianji
 * @Date: 2022-01-02 19:34:04
 * @LastEditors: zhilutianji
 * @LastEditTime: 2022-01-12 14:51:23
 * @Description: file content
 * @FilePath: \shops_frontend_web\src\components\Header\index.vue
-->
<template>
    <div class='header'>
        <div class='container'>
            <div class='welcome'>
                <span class='welcome_word'><router-link to='/home'>某商城欢迎您！</router-link></span>
                <span v-if='token===""'><router-link to='/service/login'>登录</router-link></span>
                <span v-if='token===""' class='welcome_split'>|</span>
                <span v-if='token===""'><router-link to='/service/register'>注册</router-link></span>
            </div>
            <div class='functions'>
                <span><a href='#'>我的订单</a></span>
                <span class='welcome_split'>|</span>
                <span><router-link to='/shoppingcart'>我的购物车</router-link></span>
                <span class='welcome_split'>|</span>
                <span><router-link to='/message'>我的通知</router-link></span>
                <span class='welcome_split'>|</span>
                <span><router-link to='/userInfo/user'>用户信息</router-link></span>
                <span class='welcome_split'>|</span>
                <span><router-link to='/service/feedback'>用户反馈</router-link></span>
                <span class='welcome_split'>|</span>
                <span><a target='_blank' href='https://backstage.starlibrary.online'>商家后台</a></span>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Header',
    computed: {
        ...mapState({
            // 右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
            // 注入一个参数state，其实即为大仓库中的数据
            token: ($state) => {
                return $state.cookie.token
            }
        })
    }
}
</script>

<style scoped lang='scss'>
.header {
    width: 100%;
    background-color: #333;
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: center;
    font-size: 1rem;
}

.container {
    width: 1226px;
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    > .welcome {
        width: fit-content;
        height: 40px;
        line-height: 40px;
        > .welcome_word {
            color: #b0b0b0;
            margin-right: 2rem;
            > a {
                display: inline-block;
                line-height: 40px;
                height: 40px;
                color: #b0b0b0;
            }
        }
        >span {
            display: inline-block;
            height: 40px;
            line-height: 40px;
            color: #b0b0b0;
            > a {
                display: inline-block;
                height: 40px;
                text-decoration: none;
                line-height: 40px;
                color: #b0b0b0;
                &:hover {
                    color: #ffffff;
                }
            }
        }
    }
    > .functions {
        width: fit-content;
        height: 40px;
        line-height: 40px;
        > span {
            color: #b0b0b0;
            display: inline-block;
            height: 40px;
            line-height: 40px;
            >a {
                cursor: pointer;
                text-decoration: none;
                color: #b0b0b0;
                display: inline-block;
                height: 40px;
                line-height: 40px;
                &:hover{
                    color: #ffffff;
                }
            }
        }
    }
}
.welcome_split {
    color: #b0b0b0;
    margin: 0 0.3rem;
}
</style>
