<template>
    <el-form
        ref="form"
        v-loading.fullscreen.lock="loginLoading"
        element-loading-text="登录中......"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :model="form"
        class='form'>
        <el-form-item label="手机号：">
            <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码：">
            <el-input v-model="form.passWord"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click='loginByParams' style='width: 100%' type="primary">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import ApiUserInfo from '@/api/userInfo/userInfo'

export default {
    name: 'phoneLogin',
    data() {
        return {
            form: {
                phone: '',
                passWord: ''
            },
            loginLoading: false
        }
    },
    methods: {
        loginByParams() {
            this.loginLoading = true
            ApiUserInfo.login(this.form).then(res => {
                if (res.code === '200') {
                    this.$message({
                        type: 'success',
                        message: res.msg
                    })
                    try {
                        this.$store.commit('SETTOKEN', res.data)
                        this.$bus.$emit('socketOpen', res.data)
                        this.$router.push({ path: '/home' })
                    } catch (err) {
                        console.log(err)
                    }
                } else {
                    if (res.data.role) {
                        this.$message({
                            type: 'error',
                            message: '权限不正确！'
                        })
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.msg
                        })
                    }
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
