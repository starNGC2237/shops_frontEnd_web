// 当前模块，API进行统一管理，即对请求接口统一管理
import request from '@/api/request'
// 首页三级分类接口
export const reqCateGoryList = () => {
    return request({
        url: '/express/category/getAllCategory',
        method: 'GET'
    })
}
