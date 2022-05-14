import request from '@/api/request'

function allOrder(orderStatus) {
    return request.get('/order/allOrder', { params: { orderStatus }})
}

function queryOrderName(params) {
    return request.post('/express/order/queryOrderName', params, { type: 'json' })
}
// 收货
function receive(orderName) {
    return request.get('/order/receive', { params: { orderName }})
}
export default {
    allOrder,
    queryOrderName,
    receive
}
