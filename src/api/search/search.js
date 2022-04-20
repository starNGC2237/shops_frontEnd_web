import request from '@/api/request'

function searchGood(params) {
    return request.post('/good/search', params, { type: 'json' })
}

export default {
    searchGood
}
