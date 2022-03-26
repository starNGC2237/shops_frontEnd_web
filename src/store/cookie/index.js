import Cookie from '../../../utils/cookie'
import router from '../../router'

const state = {
    token: Cookie.getCookie('token')
}

const mutations = {
    // 写入token
    GETTOKEN(state, token) {
        state.token = token
        Cookie.setCookie('token', token, '')
    },
    // 退出登录（清空state里的token
    QUIT() {
        state.token = ''
        Cookie.setCookie('token', '', '')
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
