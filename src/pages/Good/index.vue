<template>
    <div class='good'>
        <div class='good_content'>
            <div class='good_image'>
                <el-image
                    style='width: 300px;height: 300px;margin-top: 3rem;'
                    fit="fit"
                    src='https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'>
                </el-image>
            </div>
            <div class='good_info'>
                <h2>商品名：A</h2>
                <p>title：111</p>
                <p>content：Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aperiam asperiores, cumque distinctio dolores eaque, esse, ex id impedit maiores qui quos sequi tempora unde voluptas? Autem eos mollitia optio?</p>
                <p>一级分类：手机</p>
                <p>二级分类：手机通讯</p>
                <p>三级分类：手机</p>
                <p>价格：1999</p>
                <p>商店内数量：1</p>
                <p>仓库内数量：200</p>
                <div style='margin-top: 1rem;'>
                    <el-button type='primary'>立即购买</el-button>
                    <el-button>加入购物车</el-button>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'good'
}
</script>

<style scoped lang='scss'>
.good{
    display: flex;
    align-items: center;
    justify-content: center;
    >.good_content{
        display: flex;
        width: 1226px;
        padding: 1rem;
        >.good_image{
            width: 30%;
            display: flex;
            justify-content: center;
        }
        >.good_info{
            width: 70%;
            display: flex;
            padding: 0.5rem;
            flex-direction: column;
        }
    }
}
</style>
