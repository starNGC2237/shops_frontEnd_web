// 当前模块，API进行统一管理，即对请求接口统一管理
import request from '@/api/request'
// 获取该用户的工单列表接口
function login(params) {
    return request.get(`/user/login?userName=${params.userName}&passWord=${params.passWord}`)
}
export default {
    login
}
