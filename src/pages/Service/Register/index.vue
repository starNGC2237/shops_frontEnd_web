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
        <el-form-item label="账号密码：">
            <el-input v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary">登录</el-button>
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
