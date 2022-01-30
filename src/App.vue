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
    </div>
</template>

<script>
import Header from '@/components/Header'

export default {
    name: 'App',
    components: {
        Header
    }
}
</script>

<style>
html {
    font-size: 12px;
}
</style>
