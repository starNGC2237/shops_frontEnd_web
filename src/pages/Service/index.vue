<template>
    <div class='service'>
        <div class='service-container'>
            <div class='service-container-box'>
                <el-menu :default-active="$route.path" mode="horizontal" :router='true'>
                    <el-menu-item  index="/service/login">密码登录</el-menu-item>
                    <el-menu-item  index="/service/phoneLogin">手机登录</el-menu-item>
                    <el-menu-item  index="/service/register">注册账号</el-menu-item>
                    <el-menu-item  index="/service/forget">忘记密码</el-menu-item>
                </el-menu>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Service'
}
</script>

<style scoped lang='scss'>
.service{
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 5rem 0;
    box-sizing: border-box;
    >.service-container{
        width: 1226px;
        display: flex;
        justify-content: center;
        >.service-container-box {
            width: 500px;
            background-color: white;
            display: flex;
            justify-content: center;
            flex-direction: column;
        }
    }
}
</style>
