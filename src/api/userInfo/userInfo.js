// 当前模块，API进行统一管理，即对请求接口统一管理
import request from '@/api/request'
// 用户登录
function login(params) {
    return request.post('/user/login', params, { type: 'json' })
    // return request.post('/user/login?passWord=' + params.passWord + '&userName=' + params.userName)
}
// 用户注册
function register(params) {
    return request.post('/user/register', params, { type: 'json' })
}
// 更改用户密码
function rePassWord(params) {
    return request.post('/user/rePassWord', params, { type: 'json' })
}
// 获取用户信息
function userInfo() {
    return request.get('/user/userInfo')
}
// 修改nickName
function reNickName(nickName) {
    return request.get('/user/reNickName', { params: { nickName }})
}
export default {
    login,
    register,
    userInfo,
    rePassWord,
    reNickName
}
