import request from '@/api/request'

function allOrder(orderStatus) {
    return request.get('/order/allOrder', { params: { orderStatus }})
}

function queryOrderName() {
    return request.get('/order/queryOrderName')
}

export default {
    allOrder,
    queryOrderName
}
