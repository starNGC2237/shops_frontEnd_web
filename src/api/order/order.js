import request from '@/api/request'

function allOrder(orderStatus) {
    return request.get('/order/allOrder', { params: { orderStatus }})
}

function queryOrderName(params) {
    return request.post('/express/order/queryOrderName', params, { type: 'json' })
}

export default {
    allOrder,
    queryOrderName
}
