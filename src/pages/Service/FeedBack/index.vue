<template>
    <div class='feedback'>
        <div class='feedback-container'>
            <div class='header'>
                <h1>工单</h1>
                <el-button type='success' size='small' @click="dialogVisible = true">提交工单</el-button>
            </div>
            <el-table
                :data='feedbacks'
                border>
                <el-table-column
                    prop='id'
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
                    prop='someTing'
                    label='联系方式'>
                </el-table-column>
                <el-table-column
                    width='150'
                    align='center'
                    label='操作'>
                    <template slot-scope='scope'>
                        <el-button
                            size='small'
                            type='primary'
                            :disabled='scope.row.isDone'>
                            {{scope.row.isDone?'已完成':'确认完成'}}
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog
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
                            v-model="form.someting">
                        </el-input>
                    </el-form-item>
                    <el-form-item
                        label='内容：'>
                        <el-input
                            type="textarea"
                            :rows="3"
                            placeholder="请输入内容"
                            v-model="form.textarea">
                        </el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import feedBack from '@/api/feedBack/feedBack'

export default {
    name: 'feedback',
    data() {
        return {
            feedbacks: [],
            form: {
                textarea: '',
                someting: ''
            },
            dialogVisible: false
        }
    },
    mounted() {
        feedBack.getFeedBacks().then(res => {
            if (res.code === 200) {
                this.feedbacks = res.data
            } else {
                console.log('错误')
            }
        }).catch(() => {}).finally()
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
