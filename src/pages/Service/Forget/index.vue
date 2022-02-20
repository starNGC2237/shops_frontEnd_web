<template>
    <el-form ref="form" :model="form" class='form'>
        <el-form-item label="账号名称：">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="账号密码：">
            <el-input v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button style='width: 100%' type="primary">找回密码</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    name: 'forget',
    data() {
        return {
            form: {}
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
