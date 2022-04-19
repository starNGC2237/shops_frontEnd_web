<template>
    <div class='feedback'>
        <div class='feedback-container'>
            <div class='header'>
                <h1>您的工单</h1>
                <el-button type='success' size='small' @click="dialogVisible = true">提交工单</el-button>
            </div>
            <el-table
                v-loading='feedBackLoading'
                :data='feedbacks'
                border>
                <el-table-column
                    prop='feedBackId'
                    label='编号'
                    align='center'
                    width='100'>
                </el-table-column>
                <el-table-column
                    prop='content'
                    label='内容'>
                </el-table-column>
                <el-table-column
                    width='150'
                    align='center'
                    prop='contact'
                    label='联系方式'>
                </el-table-column>
                <el-table-column
                    width='150'
                    align='center'
                    label='操作'>
                    <template slot-scope='scope'>
                        <el-button
                            size='small'
                            type='text'
                            :disabled='!!scope.row.isDone'
                            @click.stop='confirm(scope.row.feedBackId)'>
                            {{scope.row.isDone?'已完成':'确认完成'}}
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog
                v-loading='feedBackDialogLoading'
                title="提交工单"
                :visible.sync="dialogVisible"
                center
                width="60%">
                <el-form
                    :model='form'>
                    <el-form-item
                        label='联系方式'>
                        <el-input
                            type='number'
                            placeholder="请输入手机号"
                            v-model="form.contact">
                        </el-input>
                    </el-form-item>
                    <el-form-item
                        label='内容：'>
                        <el-input
                            type="textarea"
                            :rows="3"
                            placeholder="请输入内容"
                            v-model="form.content">
                        </el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="confirmDialog">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import ApiFeedBack from '@/api/feedBack/feedBack'

export default {
    name: 'feedback',
    data() {
        return {
            feedBackDialogLoading: false,
            feedBackLoading: false,
            feedbacks: [],
            form: {
                contact: '',
                content: ''
            },
            dialogVisible: false
        }
    },
    mounted() {
        this.getData()
    },
    methods: {
        confirmDialog() {
            this.dialogVisible = false
            this.commit()
        },
        getData() {
            this.feedBackLoading = true
            ApiFeedBack.getFeedBacks().then(res => {
                if (res.code === '200') {
                    this.feedbacks = res.data
                } else {
                    this.$message({
                        type: 'error',
                        message: res.msg
                    })
                }
            }).catch(() => {
                this.$message({
                    type: 'error',
                    message: '获取反馈信息失败，网络错误'
                })
            }).finally(() => {
                this.feedBackLoading = false
            })
        },
        commit() {
            this.feedBackDialogLoading = true
            const params = {
                contact: this.form.contact,
                content: this.form.content,
                isDone: 0,
                userName: this.$store.state.user.userName
            }
            ApiFeedBack.commit(params).then(res => {
                if (res.code === '200') {
                    this.feedbacks = res.data
                    this.$message({
                        type: 'success',
                        message: res.msg
                    })
                } else {
                    this.$message({
                        type: 'error',
                        message: res.msg
                    })
                }
            }).catch(() => {
                this.$message({
                    type: 'error',
                    message: '提交反馈信息失败，网络错误'
                })
            }).finally(() => {
                this.feedBackDialogLoading = false
                this.getData()
            })
        },
        confirm(feedBackId) {
            ApiFeedBack.confirm(feedBackId).then(res => {
                if (res.code === '200') {
                    this.$message({
                        type: 'success',
                        message: res.msg
                    })
                } else {
                    this.$message({
                        type: 'error',
                        message: res.msg
                    })
                }
            }).catch(() => {
                this.$message({
                    type: 'error',
                    message: '确认反馈信息失败，网络错误'
                })
            }).finally(() => {
                this.feedBackLoading = false
                this.getData()
            })
        }
    }
}
</script>

<style scoped lang='scss'>
.feedback{
    display: flex;
    width: 100%;
    justify-content: center;
    >.feedback-container{
        display: flex;
        width: 1226px;
        flex-direction: column;
        padding: 1rem 0;
        >.header{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }
}
</style>
