import Cookie from '../../../utils/cookie'
import router from '../../router'
import { socket } from '../../../utils/socket'

const state = {
    token: Cookie.getCookie('token') || ''
}

const mutations = {
    // 写入token
    SETTOKEN(state, token) {
        state.token = token
        Cookie.setCookie('token', token, '')
    },
    // 退出登录（清空state里的token
    QUIT() {
        console.log(Cookie.getCookie('token'))
        state.token = ''
        Cookie.setCookie('token', '', '')
        console.log(Cookie.getCookie('token'))
        socket.close()
        router.push({ path: '/home' })
    }
}

const actions = {}

const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}
