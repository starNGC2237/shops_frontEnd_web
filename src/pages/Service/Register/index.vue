<!--
 * @Author: zhilutianji
 * @Date: 2022-01-02 20:20:17
 * @LastEditors: zhilutianji
 * @LastEditTime: 2022-01-12 14:50:40
 * @Description: file content
 * @FilePath: \shops_frontend_web\src\pages\Register\index.vue
-->
<template>
    <el-form
        v-loading='formLoading'
        ref="form"
        :model="form"
        :rules='rules'
        class='form'>
        <el-form-item
            prop='userName'
            label="账号名称：">
            <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item
            prop='nickName'
            label="昵称：">
            <el-input v-model="form.nickName"></el-input>
        </el-form-item>
        <el-form-item
            prop='phone'
            label="手机号：">
            <el-input type='number' v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item
            prop='passWord'
            label="账号密码：">
            <el-input v-model="form.passWord"></el-input>
        </el-form-item>
        <el-form-item
            prop='isAgree'>
            <el-checkbox v-model='isAgree'>已阅读并同意 用户协议 和 隐私政策</el-checkbox>
        </el-form-item>
        <el-form-item>
            <el-button style='width: 100%' type="primary" @click='submitForm'>注册</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import ApiUserInfo from '@/api/userInfo/userInfo'

export default {
    name: 'Register',
    data() {
        return {
            formLoading: false,
            isAgree: false,
            rules: {
                userName: [
                    { required: true, message: '请填写用户名！', trigger: 'blur' },
                    { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                ],
                nickName: [
                    { required: true, message: '请填写昵称！', trigger: 'blur' },
                    { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                ],
                phone: [
                    { pattern: /^1[3456789]\d{9}$/, message: '手机号格式不对', trigger: 'blur' },
                    { required: true, message: '请填写手机号！', trigger: 'blur' }
                ],
                passWord: [
                    { required: true, message: '请填写密码！', trigger: 'blur' },
                    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
                ]
            },
            form: {
                userName: '',
                phone: '',
                passWord: '',
                nickName: ''
            }
        }
    },
    methods: {
        submitForm() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    if (this.isAgree) {
                        this.submitToRegister(this.form)
                    } else {
                        this.$message({
                            type: 'error',
                            message: '请阅读并同意 用户协议 和 隐私政策！'
                        })
                    }
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        submitToRegister(form) {
            this.formLoading = true
            const { userName, passWord, phone, nickName } = form
            const params = {
                userName,
                passWord,
                phone,
                nickName,
                score: 90,
                role: '用户'
            }
            ApiUserInfo.register(params).then(res => {
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
                    message: '注册失败，网络错误！'
                })
            }).finally(() => {
                this.formLoading = false
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
