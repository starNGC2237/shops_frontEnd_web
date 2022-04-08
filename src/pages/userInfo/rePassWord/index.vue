<template>
    <div class='rePassWord'>
        <h2 style='margin: 0;'>修改密码</h2>
        <el-divider></el-divider>
        <el-form
            v-loading='loading'
            ref='user_form'
            :rules='rules'
            label-position="left"
            label-width="80px"
            :model="formReUser">
            <el-form-item
                prop='userName'
                label="用户名">
                <el-input
                    v-model="formReUser.userName"
                    maxlength="10"
                    show-word-limit>
                </el-input>
            </el-form-item>
            <el-form-item
                prop='phone'
                label="手机号">
                <el-input
                    v-model="formReUser.phone">
                </el-input>
            </el-form-item>
            <el-form-item
                prop='passWord'
                label="旧密码">
                <el-input
                    v-model="formReUser.passWord">
                </el-input>
            </el-form-item>
            <el-form-item
                prop='newPassWord'
                label="新密码">
                <el-input
                    v-model="formReUser.newPassWord">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button>确认</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import ApiUserInfo from '@/api/userInfo/userInfo'
export default {
    name: 'rePassWord',
    data() {
        return {
            loading: false,
            rules: {},
            formReUser: {}
        }
    },
    methods: {
        rePassWordByParams() {
            this.loading = true
            ApiUserInfo.rePassWord().then().catch().finally(() => {
                this.loading = false
            })
        }
    }
}
</script>

<style scoped lang='scss'>
.rePassWord{
    display: flex;
    width: 70%;
    flex-direction: column;
}
</style>
