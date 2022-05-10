import request from '@/api/request'

function allOrder(orderStatus) {
    return request.get('/order/allOrder', { params: { orderStatus }})
}

export default {
    allOrder
}
