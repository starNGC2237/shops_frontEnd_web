// 当前模块，API进行统一管理，即对请求接口统一管理
import request from '@/api/request'
// 地址辅助接口
function getAllArea() {
    return request.get('/express/area/all')
}
// 地址辅助接口(Map)
function getAllAreaMap() {
    return request.get('/express/area/all/map')
}
// 新增地址
function addAddress(params) {
    return request.post('/user/addAddress', params, { type: 'json' })
}
// 使用地址
function useAddress(addressId) {
    return request.get('/user/useAddress', { params: { addressId }})
}
// 使用地址
function deleteAddress(addressId) {
    return request.get('/user/deleteAddress', { params: { addressId }})
}
export default {
    getAllArea,
    getAllAreaMap,
    addAddress,
    useAddress,
    deleteAddress
}
