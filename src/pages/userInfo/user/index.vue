<template>
    <div class='user'>
        <div class='user_form'>
            <h2 style='margin: 0;'>用户信息</h2>
            <el-divider></el-divider>
            <el-form
                v-loading='loading'
                ref='user_form'
                :rules='rules'
                label-position="left"
                label-width="80px"
                :model="formUser">
                <el-form-item
                    prop='userName'
                    label="用户名">
                    <el-input
                        v-model="formUser.userName"
                        maxlength="10"
                        disabled
                        show-word-limit>
                    </el-input>
                </el-form-item>
                <el-form-item
                    prop='nickName'
                    label="昵称">
                    <el-input
                        v-model="formUser.nickName"
                        maxlength="10"
                        show-word-limit>
                    </el-input>
                </el-form-item>
                <el-form-item
                    prop='phone'
                    label="手机号">
                    <el-input
                        v-model="formUser.phone"
                        disabled>
                    </el-input>
                </el-form-item>
                <el-form-item
                    prop='createTime'
                    label="创建时间">
                    <el-input
                        v-model="formUser.createTime"
                        disabled>
                    </el-input>
                </el-form-item>
                <el-form-item
                    prop='role'
                    label="权限">
                    <el-input
                        v-model="formUser.role"
                        disabled>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click='submitForm("user_form")'>确认修改</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class='user_headPic'>
            <el-upload
                action=""
                :http-request="()=>{}"
                :on-change="handleChange"
                :multiple="false"
                :show-file-list="false"
            >
                <div class="upload-demo">
                    <el-image
                        v-if="!!formUser.imageUrl"
                        style="width: 100px; height: 100px;box-shadow: 0 0.33rem 0.66rem 0 rgba(0, 0, 0, 0.2), 0 0.5rem 1.66rem 0 rgba(0, 0, 0, 0.19);;"
                        :src="formUser.imageUrl"
                        fit="fill">
                    </el-image>
                    <el-button type="text">{{ !!formUser.imageUrl?"修改图片":"添加图片" }}</el-button>
                </div>

            </el-upload>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import ApiUserInfo from '@/api/userInfo/userInfo'
import _ from 'lodash'
import axios from 'axios'
import Cookie from '../../../../utils/cookie'

export default {
    name: 'user',
    data() {
        return {
            loading: false,
            rules: {
                userName: [
                    { required: true, message: '无用户名！请刷新页面', trigger: 'blur' }
                ],
                role: [
                    { required: true, message: '无权限！请刷新页面', trigger: 'blur' }
                ],
                nickName: [
                    { required: true, message: '请输入昵称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ]
            },
            formUser: {
                userName: '',
                nickName: '',
                role: '',
                imageUrl: '',
                createTime: '',
                phone: 0
            }
        }
    },
    mounted() {
        Object.assign(this.formUser, _.cloneDeep(this.$store.state.user))
    },
    methods: {
        // 将上传图片的原路径赋值给临时路径
        handleChange(file) {
            this.formUser.imageUrl = ''
            // 下面函数执行的效果是一样的，只是需要针对不同的浏览器执行不同的 js 函数而已
            if (window.createObjectURL !== undefined) { // basic
                this.formUser.imageUrl = window.createObjectURL(file.raw)
            } else if (window.URL !== undefined) { // mozilla(firefox)
                this.formUser.imageUrl = window.URL.createObjectURL(file.raw)
            } else if (window.webkitURL !== undefined) { // webkit or chrome
                this.formUser.imageUrl = window.webkitURL.createObjectURL(file.raw)
            }
            const formData = new FormData()
            formData.append('file', file.raw) // 文件列表
            axios({
                url: 'https://shops.starlibrary.online/api/user/reUserImage',
                method: 'post',
                data: formData,
                headers: {
                    'token': Cookie.getCookie('token')
                },
                processData: false, // 告诉axios不要去处理发送的数据(重要参数)
                contentType: false // 告诉axios不要去设置Content-Type请求头
            }).finally(() => {
                this.$store.dispatch('getInfo')
            })
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loading = true
                    ApiUserInfo.reNickName(this.formUser.nickName).then(res => {
                        if (res.code === '200') {
                            this.$message({
                                type: 'success',
                                message: res.msg
                            })
                            this.$store.dispatch('getInfo')
                        } else {
                            this.$message({
                                type: 'error',
                                message: res.msg
                            })
                        }
                    }).catch().finally(() => {
                        this.loading = false
                    })
                } else {
                    return false
                }
            })
        }
    },
    computed: {
        ...mapState({
            // 右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
            // 注入一个参数state，其实即为大仓库中的数据
            token: ($state) => {
                return $state.cookie.token
            }
        })
    }
}
</script>

<style scoped lang='scss'>
    .user{
        display: flex;
        width: 100%;
        >.user_form{
            width: 65%;
            margin-right: 5%;
        }
        >.user_headPic{
            width: 30%;
            display: flex;
            align-items: center;
            flex-direction: column;
            & > :not(:last-child){
                margin-bottom: 1rem;
            }
        }
    }
    .upload-demo{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
