<template>
    <div class='shopping_cart'>
        <div class='shopping_cart_container'>
            <el-table
                :data='tableData'
                @selection-change="handleSelectionChange">
                <el-table-column
                    type="selection"
                    width='80'>
                </el-table-column>
                <el-table-column
                    align='center'
                    prop='name'
                    label='商品名称'>
                </el-table-column>
                <el-table-column
                    align='center'
                    width='100'
                    prop='one'
                    label='单价'>
                </el-table-column>
                <el-table-column
                    width='200'
                    align='center'
                    prop='numbers'
                    label='数量'>
                </el-table-column>
                <el-table-column
                    width='150'
                    align='center'
                    label='小计'>
                    <template slot-scope='scope'>
                        {{scope.row.numbers * scope.row.one}}
                    </template>
                </el-table-column>
                <el-table-column
                    align='center'
                    width='100'
                    label='操作'>
                    <el-button type="danger" size='mini' icon="el-icon-delete" circle></el-button>
                </el-table-column>
            </el-table>
            <div class='settle'>
                <div class='settle_selected'>
                    <router-link to='/home'>继续购物</router-link>
                    <el-divider direction="vertical"></el-divider>
                    <span>已选择{{multipleSelection.length}}件</span>
                </div>
                <div class='settle_total'>
                    总计{{multipleSelection.length}}
                    <el-button type='primary' :disabled='multipleSelection.length===0'>去结算</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ShoppingCart',
    data() {
        return {
            checked: false,
            tableData: [
                {
                    one: '2016',
                    name: 'K40',
                    numbers: 1
                }
            ],
            multipleSelection: []
        }
    },
    methods: {
        handleSelectionChange(val) {
            this.multipleSelection = val
        }
    }
}
</script>

<style scoped lang='scss'>
    .shopping_cart{
        display: flex;
        align-items: center;
        flex-direction: column;
        >.shopping_cart_container{
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 1226px;
            padding: 1rem;
            >.settle{
                display: flex;
                width: 100%;
                height: 4.8rem;
                background-color: white;
                margin-top: 1rem;
                box-sizing: border-box;
                justify-content: space-between;
                >.settle_selected{
                    padding: 1rem;
                    box-sizing: border-box;
                    display: flex;
                    align-items: center;
                    font-size: 1.2rem;
                    >a{
                        display: flex;
                        color: #b0b0b0;
                        height: 100%;
                        line-height: 100%;
                        align-items: center;
                        text-decoration: none;
                        &:hover{
                            color: #409EFF;
                        }
                    }
                }
                >.settle_total{
                    display: flex;
                    align-items: center;
                    font-size: 1.5rem;
                    height: 100%;
                    button{
                        margin-left: 5rem;
                        width: 20rem;
                        height: 100%;
                    }
                }
            }
        }
    }
</style>
