import request from '@/api/request'

function queryRecommend() {
    return request.get('/category/query')
}

export default {
    queryRecommend
}
