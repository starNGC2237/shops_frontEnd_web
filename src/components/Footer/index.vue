<!--
 * @Author: zhilutianji
 * @Date: 2022-01-02 19:34:12
 * @LastEditors: zhilutianji
 * @LastEditTime: 2022-01-12 14:51:10
 * @Description: file content
 * @FilePath: \shops_frontend_web\src\components\Footer\index.vue
-->
<template>
    <div class='record_bottom'>
        <div class='bottom_content'>
            <div>
                <ul>
                    <li class='bottom_content_logo'>
                        <a href='https://shops.starlibrary.online'>某商城</a>
                    </li>
                    <li>
                        © 2020-至今
                        <a href='https://shops.starlibrary.online'>shops.starlibrary.online</a> 版权所有
                    </li>
                    <li>本网站仅供学习使用</li>
                    <li>
                        <a href='https://beian.miit.gov.cn'
                        >ICP证：津ICP备20000024号</a
                        >
                    </li>
                    <li>
                        <a href='https://www.beian.gov.cn/portal/index.do'>
                            <img src='@/assets/beian.png' alt='' />
                            苏公网安备 32021402001231号
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style scoped lang='scss'>
.record_bottom {
    display: flex;
    background-color: #333;
    width: 100%;
}

.bottom_content {
    display: flex;
    width: 1226px;
    height: 300px;
    margin: 0 auto;
    > div {
        width: 50%;
        height: 100%;
        display: flex;
        align-items: center;
        ul {
            font-size: 14px;
            color: #c0c0c0;
            list-style: none;
            margin: 0;
            padding: 0;
            .bottom_content_logo {
                font-size: 24px;
                margin-bottom: 20px;
            }
            li {
                margin: 15px 0;
                a {
                    color: #c0c0c0;
                    text-decoration: none;
                }
            }
            & li:last-child{
                display: flex;
                align-items: center;
                >a{
                    display: flex;
                    align-items: center;
                    >img{
                        margin-right: 0.5rem;
                    }
                }
            }
        }
    }
}

</style>
