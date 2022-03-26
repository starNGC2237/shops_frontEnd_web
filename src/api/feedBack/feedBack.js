// 当前模块，API进行统一管理，即对请求接口统一管理
import mock from '@/api/mock'
// 获取该用户的工单列表接口
function getFeedBacks() {
    return mock.get('/667710/getFeedBackList')
}
export default {
    getFeedBacks
}
