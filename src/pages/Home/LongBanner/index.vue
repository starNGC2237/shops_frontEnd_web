<!--
 * @Author: zhilutianji
 * @Date: 2022-01-06 23:58:46
 * @LastEditors: zhilutianji
 * @LastEditTime: 2022-01-12 14:50:10
 * @Description: file content
 * @FilePath: \shops_frontend_web\src\pages\Home\LongBanner\index.vue
-->
<template>
    <div class='long_bar'>
        <div class='container'>
            <router-link to='/search/K40'>
                <img
                    src='https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/0e2b43800d3e1ef40470ac04b3e0140b.jpg'
                    alt=''
                />
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LongBar'
}
</script>

<style scoped lang='scss'>
.long_bar {
    width: 100%;
    height: 120px;
    display: flex;
    justify-content: center;
    margin: 1.5rem 0;
    >.container {
        width: 1226px;
        height: 120px;
        >a{
            >img{
                width: 1226px;
                height: 120px;
            }
        }
    }
}
</style>
