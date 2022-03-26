<!--
 * @Author: zhilutianji
 * @Date: 2022-01-02 20:21:27
 * @LastEditors: zhilutianji
 * @LastEditTime: 2022-01-12 14:50:28
 * @Description: file content
 * @FilePath: \shops_frontend_web\src\pages\Login\index.vue
-->
<template>
    <el-form
        ref="form"
        :model="form"
        v-loading.fullscreen.lock="loginLoading"
        element-loading-text="登录中......"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        class='form'>
        <el-form-item label="账号名称：">
            <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="账号密码：">
            <el-input v-model="form.passWord"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button style='width: 100%' type="primary" @click='loginByParams'>登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import ApiLogin from '@/api/userInfo/login'
export default {
    name: 'Login',
    data() {
        return {
            form: {
                userName: '',
                passWord: ''
            },
            loginLoading: false
        }
    },
    methods: {
        loginByParams() {
            this.loginLoading = true
            ApiLogin.login(this.form).then(res => {
                if (res.code === '200') {
                    this.$message({
                        type: 'success',
                        message: res.msg
                    })
                    this.$store.commit('GETTOKEN', res.data)
                    this.$router.push({ path: '/home' })
                } else {
                    this.$message({
                        type: 'error',
                        message: res.msg
                    })
                }
            }).catch(() => {
                this.$message({
                    type: 'error',
                    message: '网络错误'
                })
            }).finally(() => {
                this.loginLoading = false
            })
        }
    }
}
</script>

<style scoped lang='scss'>
.form{
    width: 100%;
    padding: 2rem;
    box-sizing: border-box;
}
</style>
