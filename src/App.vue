<!--
 * @Author: zhilutianji
 * @Date: 2022-01-02 18:49:33
 * @LastEditors: zhilutianji
 * @LastEditTime: 2022-01-12 14:47:54
 * @Description: file content
 * @FilePath: \shops_frontend_web\src\App.vue
-->
<template>
    <div id='app'>
        <Header></Header>
        <router-view></router-view>
        <Footer v-show="$route.meta.show"></Footer>
    </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { socket } from '../utils/socket'
export default {
    name: 'App',
    components: {
        Header,
        Footer
    },
    mounted() {
        this.$store.dispatch('categoryList')
    },
    methods: {
        socketOpen(token) {
            // 发起连接
            this.$store.dispatch('categoryList')
            socket.init()
        }

    }
}
</script>

<style>
html {
    font-size: 12px;
    background-color: #F5F5F5;
    min-width: 1226px;
    line-height: 1.5 !important;
    overflow-y: scroll;
}
body{
    padding: 0!important;
}
</style>
