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
                <span class='welcome_word'
                ><router-link to='/home'>某商城欢迎您！</router-link></span
                >
                <span><router-link to='/service/login'>登录</router-link></span>
                <span class='welcome_split'>|</span>
                <span><router-link to='/service/register'>注册</router-link></span>
            </div>
            <div class='functions'>
                <span><a href='#'>我的订单</a></span>
                <span class='welcome_split'>|</span>
                <span><a href='#'>我的购物车</a></span>
                <span class='welcome_split'>|</span>
                <span><a href='#'>我的某商城</a></span>
                <span class='welcome_split'>|</span>
                <span><a href='#'>某商城会员</a></span>
                <span class='welcome_split'>|</span>
                <span><a href='#'>关注某商城</a></span>
                <span class='welcome_split'>|</span>
                <span><a target='_blank' href='https://shopsadmin.starlibrary.online'>商家后台</a></span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Header'
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
            > a {
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
