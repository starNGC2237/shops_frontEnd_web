import { reqCateGoryList } from '@/api/categorys'
import ApiHome from '@/api/home/home'
const state = {
    categoryList: [],
    categoryRecommends: []
}

const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    CATEGORYRECOMMENDS(state, categoryRecommends) {
        state.categoryRecommends = categoryRecommends
    }
}

const actions = {
    async categoryList({ commit }) {
        const result = await reqCateGoryList()
        if (result.code == 200) {
            commit('CATEGORYLIST', result.data)
        }
    },
    async queryRecommends({ commit }) {
        const res = await ApiHome.queryRecommend()
        if (res.code == 200) {
            commit('CATEGORYRECOMMENDS', res.data)
        }
    }
}

const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}
