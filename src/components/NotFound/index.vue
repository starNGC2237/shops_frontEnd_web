<template>
    <div  class="notfound">
        <el-result title="404" subTitle="抱歉，所请求的页面不存在">
            <template slot="icon">
                <el-image src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"></el-image>
            </template>
            <template slot="extra">
                <el-button type="primary" size="medium" @click="toHome">返回首页</el-button>
            </template>
        </el-result>
    </div>
</template>

<script>
export default {
    name: 'index',
    methods: {
        toHome() {
            this.$router.push({
                path: '/home'
            })
        }
    }
}
</script>

<style scoped>
.notfound{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}
</style>
