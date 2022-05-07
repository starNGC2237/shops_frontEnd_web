<template>
    <div class='message'>
        <div class='message-container'>
            <el-page-header class='header' @back="goBack" content="我的通知"></el-page-header>
            <div
                v-if='notifications.length===0&&$store.state.announcement.announcements.length===0'
                style='display: flex;justify-content: center;align-items: center;height: 300px;width: 100%'>
                <span>
                    没有通知
                </span>
            </div>
            <el-card class="box-card" v-for='item in announces' :key='item.announceId'>
                <div slot="header" class="clearfix">
                    <span style='font-size: 1.8rem'>公告消息</span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click='haveReaded(item)'>{{ item.isSee=== 0?'已读':'' }}</el-button>
                </div>
                <div class="text item">
                    {{ item.content }}
                </div>
            </el-card>
            <el-card class="box-card" v-for='(item,index) in notifications' :key='index'>
                <div slot="header" class="clearfix">
                    <span style='font-size: 1.8rem'>通知消息</span>
                    <el-button style="float: right; padding: 3px 0" type="text">已读</el-button>
                </div>
                <div class="text item">
                    列表内容{{item.toString()}}
                </div>
            </el-card>
        </div>
    </div>

</template>

<script>
import ApiMessage from '@/api/message/message'
import { mapState } from 'vuex'
export default {
    name: 'message',
    data() {
        return {
            notifications: []
        }
    },
    mounted() {
        this.allNotifications()
    },
    methods: {
        allNotifications() {
            ApiMessage.allNotification().then(res => {
                if (res.code === '200') {
                    this.notifications = res.data
                } else {
                    this.$message({
                        type: 'error',
                        message: res.msg
                    })
                }
            }).catch(() => {
                this.$message({
                    type: 'error',
                    message: '获取通知失败，网络错误'
                })
            }).finally()
        },
        goBack() {
            this.$router.push({ path: '/home' })
        },
        haveReaded(announce) {
            ApiMessage.readAnnounce(announce.announceId).then(res => {
                if (res.code === '200') {
                    this.$message({
                        type: 'success',
                        message: res.msg
                    })
                    this.$store.commit('READANNOUNCEMENT', announce)
                } else {
                    this.$message({
                        type: 'error',
                        message: res.msg
                    })
                }
            }).catch((error) => {
                console.log(error)
                this.$message({
                    type: 'error',
                    message: '已读公告失败，网络错误'
                })
            })
        }
    },
    computed: {
        ...mapState({
            // 右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
            // 注入一个参数state，其实即为大仓库中的数据
            announces: ($state) => {
                return $state.announcement.announcements
            }
        })
    }
}
</script>

<style scoped lang='scss'>
.message{
    display: flex;
    align-items: center;
    flex-direction: column;
    .message-container{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 1226px;
        padding: 1rem;
        div:not(:last-child){
            margin-bottom: 1.5rem;
        }
        >.header{
            width: 100%;
            height: 5rem;
            background-color: white;
            display: flex;
            align-items: center;
            padding: 1rem;
            box-sizing: border-box;
        }
    }
}
.box-card{
    width: 100%;
}
.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both
}
</style>
