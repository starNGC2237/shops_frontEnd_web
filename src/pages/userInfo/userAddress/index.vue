<template>
    <div class='userAddress'>
        <h1>地址管理</h1>
        <el-button style='width: fit-content;margin-bottom: 1rem;' type='primacy'>新建地址</el-button>
        <el-table
            border
            :data='tableData'>
            <el-table-column
                label='是否正在使用'
                align='center'>
                <template slot-scope='scope'>
                    <el-tag>{{!!scope.row.isUsing?'正在使用':'未使用'}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                label='省'
                prop='provinceName'>
            </el-table-column>
            <el-table-column
                label='市'
                prop='cityName'>
            </el-table-column>
            <el-table-column
                label='区'
                prop='districtName'>
            </el-table-column>
            <el-table-column
                label='详细地址'
                prop='addressInfo'>
            </el-table-column>
            <el-table-column
                label='操作'
                align='center'>
                <template slot-scope='scope'>
                    <el-button type='text' :disabled='!!scope.row.isUsing'>{{!!scope.row.isUsing?'已使用':'使用'}}</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'Address',
    data() {
        return {
            tableData: [
                {
                    'addressId': 1,
                    'userName': '1111',
                    'provinceName': '1',
                    'cityName': '1',
                    'districtName': '1',
                    'addressInfo': '1',
                    'isUsing': 1
                },
                {
                    'addressId': 2,
                    'userName': '1111',
                    'provinceName': '2',
                    'cityName': '2',
                    'districtName': '2',
                    'addressInfo': '2',
                    'isUsing': 0
                }
            ]
        }
    }
}
</script>

<style scoped lang='scss'>
.userAddress{
    display: flex;
    flex-direction: column;
    width: 100%;
}
</style>
