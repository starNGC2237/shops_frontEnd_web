<template>
    <el-form ref="form" :model="form" class='form'>
        <el-form-item label="手机号：">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码：">
            <el-input v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button style='width: 100%' type="primary">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    name: 'phoneLogin',
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
