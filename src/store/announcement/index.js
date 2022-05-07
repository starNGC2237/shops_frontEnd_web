const state = {
    announcements: []
}

const mutations = {
    ANNOUNCEMENTS(state, announcements) {
        state.announcements = announcements
    },
    READANNOUNCEMENT(state, announce) {
        state.announcements.forEach((item) => {
            if (item.announceId === announce.announceId) {
                item.isSee = 1
            }
        })
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
