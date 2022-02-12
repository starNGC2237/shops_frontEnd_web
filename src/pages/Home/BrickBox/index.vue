<!--
 * @Author: zhilutianji
 * @Date: 2022-01-07 00:28:45
 * @LastEditors: zhilutianji
 * @LastEditTime: 2022-01-12 14:20:42
 * @Description: file content
 * @FilePath: \shops_frontend_web\src\pages\Home\BrickBox\index.vue
-->
<template>
    <div class='brick_box'>
        <div class='container'>
            <div class='container-top'>
                <h2>数据</h2>
                <div class='watchMore'>查看更多<i class="el-icon-arrow-right rem_margin"></i></div>
            </div>
            <div class='container-content'>
                <el-card shadow="hover" :body-style='{padding: 0}'>
                    <img src='./1.jpg' alt=''>
                </el-card>
                <RecommendedTwo>
                </RecommendedTwo>
                <RecommendedTwo>
                </RecommendedTwo>
                <RecommendedTwo>
                </RecommendedTwo>
                <RecommendedTwo>
                </RecommendedTwo>
            </div>
        </div>
    </div>
</template>

<script>
import RecommendedTwo from '@/pages/Home/BrickBox/components/RecommendedTwo'
export default {
    name: 'BrickBok',
    components: {
        RecommendedTwo
    },
    data() {
        return {
            currentDate: '1'
        }
    }
}
</script>

<style scoped lang='scss'>
img{
    width: 100%;
    line-height: 0;
    display: block;
}
.rem_margin{
    margin-left: 0.5rem;
}
.brick_box {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 1.5rem 0;
    >.container {
        display: flex;
        flex-direction: column;
        > .container-top {
            width: 1226px;
            display: flex;
            justify-content: space-between;
            text-align: center;
            >.watchMore{
                cursor: pointer;
                &:hover{
                    color: #409EFF;
                }
            }
            > h2 {
                margin: 0;
                font-size: 22px;
                line-height: 58px;
                color: #333;
                font-weight: 200;
            }
            > div {
                display: flex;
                align-items: center;
            }
        }
        >.container-content{
            display: flex;
            justify-content: space-between;
            height: 614px;
            > div{
                display: flex;
                width: 234px;
                &:first-child{
                    background-color: white;
                    cursor: pointer;
                }
            }
        }
    }
}

</style>
