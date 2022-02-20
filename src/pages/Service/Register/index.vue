<!--
 * @Author: zhilutianji
 * @Date: 2022-01-02 20:20:17
 * @LastEditors: zhilutianji
 * @LastEditTime: 2022-01-12 14:50:40
 * @Description: file content
 * @FilePath: \shops_frontend_web\src\pages\Register\index.vue
-->
<template>
    <el-form ref="form" :model="form" class='form'>
        <el-form-item label="账号名称：">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号：">
            <el-input v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item label="账号密码：">
            <el-input v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
            <el-checkbox>已阅读并同意 用户协议 和 隐私政策</el-checkbox>
        </el-form-item>
        <el-form-item>
            <el-button style='width: 100%' type="primary">注册</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    name: 'Register',
    data() {
        return {
            form: {}
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
