import Cookie from '../../../utils/cookie'
import router from '../../router'
import { socket } from '../../../utils/socket'
import store from '@/store'

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
    async QUIT(state) {
        state.token = ''
        Cookie.setCookie('token', '', '')
        await store.commit('CLEAR_ALL')
        socket.close()
        await router.push({ path: '/home' })
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
