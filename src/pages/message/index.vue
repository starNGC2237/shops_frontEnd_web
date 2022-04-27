<template>
    <div class='message'>
        <div class='message-container'>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span style='font-size: 1.8rem'>公告消息</span>
                    <el-button style="float: right; padding: 3px 0" type="text">已读</el-button>
                </div>
                <div class="text item">
                    列表内容
                </div>
            </el-card>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span style='font-size: 1.8rem'>通知消息</span>
                    <el-button style="float: right; padding: 3px 0" type="text">已读</el-button>
                </div>
                <div class="text item">
                    列表内容
                </div>
            </el-card>
        </div>
    </div>

</template>

<script>
export default {
    name: 'message'
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
            margin-bottom: 2rem;
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
