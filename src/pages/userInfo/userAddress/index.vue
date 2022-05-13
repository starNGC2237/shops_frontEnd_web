<template>
    <div class='userAddress'>
        <h1>地址管理</h1>
        <el-button
            style='width: fit-content;margin-bottom: 1rem;'
            type='primacy'
            @click='dialogVisible = true'>新建地址</el-button>
        <el-table
            v-loading='loading'
            border
            :data='tableData'>
            <el-table-column
                label='是否正在使用'
                align='center'>
                <template slot-scope='scope'>
                    <el-tag :type="!!scope.row.isUsing?'':'warning'" >{{!!scope.row.isUsing?'正在使用':'未使用'}}</el-tag>
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
                    <el-button
                        type='text'
                        @click='useAddress(scope.row.addressId)'
                        :disabled='!!scope.row.isUsing'>
                        {{!!scope.row.isUsing?'已使用':'使用'}}
                    </el-button>
                    <el-button type='text' @click='deleteAddress(scope.row.addressId)'>删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
            title="添加地址"
            :visible.sync="dialogVisible"
            width="40%"
            @close="dialogVisible = false;"
            @closed="clearForm"
        >
            <el-form label-position="top">
                <el-form-item label="请选择省">
                    <el-select v-model='address.sheng'>
                        <el-option
                            v-for="item in areas['0']"
                            :key="item.area_id"
                            :label="item.name"
                            :value="item.area_id"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="请选择市">
                    <el-select v-model='address.shi'>
                        <el-option
                            v-for="item in (areas[address.sheng] || [])"
                            :key="item.area_id"
                            :label="item.name"
                            :value="item.area_id"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="请选择区">
                    <el-select v-model='address.qu' placeholder='请选择，若无可不填'>
                        <el-option
                            v-for="item in (areas[address.shi] || [])"
                            :key="item.area_id"
                            :label="item.name"
                            :value="item.area_id"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label='请输入详细地址'>
                    <el-input v-model='address.info'></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click='commitAddAddress'>确 定</el-button>
      </span>
        </el-dialog>
    </div>
</template>

<script>
import ApiAddress from '@/api/userInfo/address'
import store from '@/store'
export default {
    name: 'Address',
    data() {
        return {
            tableData: this.$store.state.user.addressList || [],
            dialogVisible: false,
            loading: false,
            address: {
                sheng: '',
                shi: '',
                qu: '',
                info: ''
            },
            areas: {}
        }
    },
    mounted() {
        this.getAreas()
    },
    methods: {
        getAreas() {
            this.loading = true
            ApiAddress.getAllAreaMap().then(res => {
                if (res.code === '200') {
                    this.areas = res.data
                } else {
                    this.$message({
                        type: 'error',
                        message: res.msg
                    })
                }
            }).catch(() => {
                this.$message({
                    type: 'error',
                    message: '获取全国信息失败，网络错误！'
                })
            }).finally(() => {
                this.loading = false
            })
        },
        useAddress(addressId) {
            this.loading = true
            ApiAddress.useAddress(addressId).then(res => {
                this.showMsg(res)
            }).catch(() => {
                this.$message({
                    type: 'error',
                    message: '激活或关闭失败，网络错误！'
                })
            }).finally(() => {
                this.updateInfo()
            })
        },
        commitAddAddress() {
            this.loading = true
            const data = {
                addressInfo: this.address.info,
                provinceName: this.areas['0'].filter((item) => {
                    return item.area_id === this.address.sheng
                })[0].name || '',
                cityName: this.areas[this.address.sheng].filter((item) => {
                    return item.area_id === this.address.shi
                })[0].name || '',
                districtName: typeof this.address.qu === 'string' ? '' : this.areas[this.address.shi].filter((item) => {
                    return item.area_id === this.address.qu
                })[0].name,
                isUsing: 0
            }
            ApiAddress.addAddress(data).then(res => {
                this.showMsg(res)
            }).catch(() => {
                this.$message({
                    type: 'error',
                    message: '添加地址失败，网络错误！'
                })
            }).finally(() => {
                this.updateInfo()
            })
            this.dialogVisible = false
        },
        async updateInfo() {
            await store.dispatch('getInfo')
            this.tableData = this.$store.state.user.addressList
            this.loading = false
        },
        clearForm() {
            this.address = {
                sheng: '',
                shi: '',
                qu: '',
                info: ''
            }
        },
        showMsg(res) {
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
        },
        deleteAddress(addressId) {
            this.loading = true
            ApiAddress.deleteAddress(addressId).then(res => {
                this.showMsg(res)
            }).catch(() => {
                this.$message({
                    type: 'error',
                    message: '删除地址失败，网络错误！'
                })
            }).finally(() => {
                this.updateInfo()
            })
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
