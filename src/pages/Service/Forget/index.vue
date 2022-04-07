<template>
    <el-form
        ref="form"
        v-loading='loading'
        :model="form"
        class='form'>
        <el-form-item label="账号名称：">
            <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="手机号：">
            <el-input type='number' v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="新密码：">
            <el-input v-model="form.newPassWord"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button style='width: 100%' type="primary" @click='fdPassWord'>找回密码</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import ApiUserInfo from '@/api/userInfo/userInfo'
export default {
    name: 'forget',
    data() {
        return {
            loading: false,
            form: {
                userName: '',
                phone: '',
                newPassWord: ''
            }
        }
    },
    methods: {
        fdPassWord() {
            this.loading = true
            const { userName, phone, newPassWord } = this.form
            const params = {
                userName,
                phone: parseInt(phone),
                passWord: newPassWord
            }
            ApiUserInfo.fdPassWord(params).then(res => {
                if (res.code === '200') {
                    this.$message({
                        type: 'success',
                        message: res.msg
                    })
                    this.$router.push({ path: '/service/login' })
                } else {
                    this.$message({
                        type: 'error',
                        message: res.msg
                    })
                }
            }).catch(() => {
                this.$message({
                    type: 'error',
                    message: '忘记密码失败，网络错误！'
                })
            }).finally(() => {
                this.loading = false
            })
        }
    }
}
</script>

<style scoped>
.form{
    width: 100%;
    padding: 2rem;
    box-sizing: border-box;
}
</style>
