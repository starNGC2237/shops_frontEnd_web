<!--
 * @Author: zhilutianji
 * @Date: 2022-01-07 00:28:45
 * @LastEditors: zhilutianji
 * @LastEditTime: 2022-01-12 14:20:42
 * @Description: file content
 * @FilePath: \shops_frontend_web\src\pages\Home\BrickBox\index.vue
-->
<template>
    <div class="brick_box">
        <div class="container">
            <div class="container-top">
                <h2>数据</h2>
                <div>查看更多 ></div>
            </div>
            <div class="container-content">sdasda sdasdads</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BrickBok'
}
</script>

<style scoped>
.brick_box {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 1.5rem 0;
}
.brick_box > .container {
    display: flex;
    flex-direction: column;
}
.brick_box > .container > .container-top {
    width: 1226px;
    display: flex;
    justify-content: space-between;
    text-align: center;
}
.brick_box > .container > .container-top > h2 {
    margin: 0;
    font-size: 22px;
    line-height: 58px;
    color: #333;
    font-weight: 200;
}
.brick_box > .container > .container-top > div {
    display: flex;
    align-items: center;
}
</style>
