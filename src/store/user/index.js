import Cookie from '../../../utils/cookie'
import ApiUserInfo from '../../api/userInfo/userInfo'
const state = {
    userName: '',
    imageUrl: '',
    nickName: '',
    createTime: '',
    phone: 0,
    role: ''
}

const mutations = {
    CLEAR_ALL: () => {
        state.userName = ''
        state.imageUrl = ''
        state.nickName = ''
        state.createTime = ''
        state.phone = 0
        state.role = ''
    },
    SET_USERNAME: (state, userName) => {
        state.userName = userName
    },
    SET_IMAGEURL: (state, imageUrl) => {
        state.imageUrl = imageUrl
    },
    SET_NICKNAME: (state, nickName) => {
        state.nickName = nickName
    },
    SET_CREATETIME: (state, createTime) => {
        state.createTime = createTime
    },
    SET_PHONE: (state, phone) => {
        state.phone = phone
    },
    SET_ROLE: (state, role) => {
        state.role = role
    }
}

const actions = {
    // get user info
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            ApiUserInfo.userInfo(Cookie.getCookie('token')).then(response => {
                const { data } = response
                if (!data) {
                    return reject('Verification failed, please Login again.')
                }
                if (data.role === '用户') {
                    const { userName, imageUrl, nickName, createTime, phone, role } = data
                    commit('SET_USERNAME', userName)
                    commit('SET_IMAGEURL', imageUrl)
                    commit('SET_NICKNAME', nickName)
                    commit('SET_CREATETIME', createTime)
                    commit('SET_PHONE', phone)
                    commit('SET_ROLE', role)
                    resolve(data)
                } else {
                    reject('权限错误')
                }
            }).catch(error => {
                reject(error)
            })
        })
    }
}

const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}
