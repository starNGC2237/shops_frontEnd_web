import request from '@/api/request'

function allOrder(orderStatus) {
    return request.get('/order/allOrder', { params: { orderStatus }})
}

function queryOrderName() {
    return request.get('/order/queryOrderName')
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
