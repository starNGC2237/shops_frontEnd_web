// 当前模块，API进行统一管理，即对请求接口统一管理
import request from '@/api/request'

// 全部发货通知
function allNotification() {
    return request.get('/user/allNotification')
}
function readAnnounce(announceId) {
    return request.get('/user/readAnnounce', { params: { announceId }})
}

export default {
    allNotification,
    readAnnounce
}
