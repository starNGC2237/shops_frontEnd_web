// 当前模块，API进行统一管理，即对请求接口统一管理
import request from '@/api/request'

// 添加入订单（新建）
function addCar(goodId) {
    return request.get('/order/addCar', { params: { goodId }})
}
// 直接购买
function deliver(params) {
    return request.post('/order/directSubmitOrder', params, { type: 'json' })
}
// 查看订单
function allOrder(orderStatus) {
    return request.get('/order/allOrder', { params: { orderStatus }})
}
// 删除小订单
function deleteCar(orderId) {
    return request.get('/order/deleteCar', { params: { orderId }})
}
export default {
    allOrder,
    addCar,
    deliver,
    deleteCar
}
