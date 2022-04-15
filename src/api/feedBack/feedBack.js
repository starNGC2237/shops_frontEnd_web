// 当前模块，API进行统一管理，即对请求接口统一管理
import request from '@/api/request'
// 获取该用户的工单列表接口
function getFeedBacks() {
    return request.get('/feedBack/userFeedBack')
}
// 提交工单
function commit(params) {
    return request.post('/feedBack/commit', params, { type: 'json' })
}
// 确认工单
function confirm(feedBackId) {
    return request.get('/feedBack/confirm', { params: { feedBackId }})
}
export default {
    getFeedBacks,
    commit,
    confirm
}
